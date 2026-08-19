import { describe, expect, it } from 'vitest';
import {
  filtersToSearchParams,
  LISTINGS_PAGE_DEFAULT_PER_PAGE,
  normalizeListingsFilters,
} from '@/lib/listing-filter-params';
import { DEFAULT_LISTING_FILTERS } from '@/types';

describe('listing-filter-params perPage', () => {
  it('persists 12 per page in the URL and round-trips through normalizeListingsFilters', () => {
    const params = filtersToSearchParams({
      ...DEFAULT_LISTING_FILTERS,
      status: 'For Rent',
      perPage: 12,
    });

    expect(params.get('perPage')).toBe('12');

    const filters = normalizeListingsFilters(params);
    expect(filters.perPage).toBe(12);
  });

  it('omits default listings page size from the URL', () => {
    const params = filtersToSearchParams({
      ...DEFAULT_LISTING_FILTERS,
      status: 'For Rent',
      perPage: LISTINGS_PAGE_DEFAULT_PER_PAGE,
    });

    expect(params.get('perPage')).toBeNull();
    expect(normalizeListingsFilters(params).perPage).toBe(LISTINGS_PAGE_DEFAULT_PER_PAGE);
  });
});
