import { describe, expect, it } from 'vitest';
import { queryKeys } from '@/lib/query-keys';

describe('queryKeys', () => {
  it('builds stable property search keys', () => {
    const intent = { type: 'villa', city: 'Bali' };
    expect(queryKeys.properties.search(intent)).toEqual([
      'properties',
      'search',
      intent,
    ]);
  });

  it('builds listing detail keys by slug and id', () => {
    expect(queryKeys.properties.detail('ocean-villa')).toEqual([
      'properties',
      'detail',
      'ocean-villa',
    ]);
    expect(queryKeys.myListings.detail(42)).toEqual([
      'my-listings',
      'detail',
      '42',
    ]);
  });
});
