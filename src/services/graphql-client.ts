import { getGraphqlUrl, isMockDataEnabled } from '@/lib/runtime-env';

export { getGraphqlUrl, isMockDataEnabled };

export class GraphqlError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GraphqlError';
  }
}

export async function graphqlFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const res = await fetch(getGraphqlUrl(), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    throw new GraphqlError(`GraphQL request failed: ${res.statusText}`);
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
