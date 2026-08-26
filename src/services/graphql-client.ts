import { getGraphqlUrl, isMockDataEnabled } from '@/lib/runtime-env';

export { getGraphqlUrl, isMockDataEnabled };

export class GraphqlError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GraphqlError';
  }
}

function errorText(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

function networkCauseCode(error: unknown): string {
  if (!error || typeof error !== 'object' || !('cause' in error)) return '';
  const cause = (error as { cause?: unknown }).cause;
  if (!cause || typeof cause !== 'object' || !('code' in cause)) return '';
  const code = (cause as { code?: unknown }).code;
  return typeof code === 'string' ? code : '';
}

function isNetworkFailure(error: unknown): boolean {
  const message = errorText(error).toLowerCase();
  const code = networkCauseCode(error).toUpperCase();
  return (
    code === 'ECONNREFUSED' ||
    code === 'ENOTFOUND' ||
    code === 'EHOSTUNREACH' ||
    code === 'ECONNRESET' ||
    message.includes('econnrefused') ||
    message.includes('fetch failed') ||
    message.includes('network') ||
    message.includes('failed to fetch')
  );
}

function isRateLimited(error: unknown): boolean {
  const message = errorText(error);
  return message.includes('429') || /too many requests/i.test(message);
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function graphqlFetchOnce<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T | null> {
  const res = await fetch(getGraphqlUrl(), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    throw new GraphqlError(`GraphQL request failed: ${res.status} ${res.statusText}`);
  }

  const json = (await res.json()) as { data?: T; errors?: { message: string }[] };

  if (json.errors?.length) {
    throw new GraphqlError(json.errors.map((e) => e.message).join(', '));
  }

  if (!json.data) {
    throw new GraphqlError('GraphQL response missing data');
  }

  return json.data;
}

/** SSG builds can burst past Laravel throttle; back off instead of failing the whole build. */
const RATE_LIMIT_RETRIES = 5;

export async function graphqlFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T | null> {
  try {
    for (let attempt = 0; attempt <= RATE_LIMIT_RETRIES; attempt++) {
      try {
        return await graphqlFetchOnce<T>(query, variables);
      } catch (error) {
        if (!isRateLimited(error) || attempt === RATE_LIMIT_RETRIES) {
          throw error;
        }
        const delayMs = 1000 * 2 ** attempt;
        console.warn('[graphql] 429 rate limited; retrying', {
          attempt: attempt + 1,
          delayMs,
          url: getGraphqlUrl(),
        });
        await sleep(delayMs);
      }
    }
    return null;
  } catch (error) {
    if (isNetworkFailure(error)) {
      console.warn('[graphql] network failure; using local fallback', {
        url: getGraphqlUrl(),
        message: errorText(error),
        code: networkCauseCode(error),
      });
      return null;
    }
    throw error;
  }
}
