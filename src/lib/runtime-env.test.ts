/** @vitest-environment node */
import { describe, expect, it } from 'vitest';
import { getGraphqlUrl } from '@/lib/runtime-env';

describe('getGraphqlUrl server relative resolve', () => {
  it('prefixes relative /graphql with INTERNAL_BACKEND_ORIGIN on server', () => {
    const prevPublic = process.env.NEXT_PUBLIC_GRAPHQL_URL;
    const prevInternal = process.env.INTERNAL_BACKEND_ORIGIN;
    process.env.NEXT_PUBLIC_GRAPHQL_URL = '/graphql';
    process.env.INTERNAL_BACKEND_ORIGIN = 'http://127.0.0.1';
    try {
      expect(getGraphqlUrl()).toBe('http://127.0.0.1/graphql');
    } finally {
      if (prevPublic === undefined) delete process.env.NEXT_PUBLIC_GRAPHQL_URL;
      else process.env.NEXT_PUBLIC_GRAPHQL_URL = prevPublic;
      if (prevInternal === undefined) delete process.env.INTERNAL_BACKEND_ORIGIN;
      else process.env.INTERNAL_BACKEND_ORIGIN = prevInternal;
    }
  });
});
