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

export async function graphqlFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T | null> {
  try {
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
