import type { ListingFilters, PropertySearchVariables } from '@/types';

/** True when the user has expressed search preferences (URL-synced UI intent). */
export function hasSearchIntent(filters: ListingFilters): boolean {
  return Boolean(
    filters.keyword ||
      filters.location ||
      filters.propertyType ||
      filters.status ||
      filters.beds ||
      filters.minPrice ||
      filters.maxPrice
  );
}

/** Human-readable summary for empathetic UI copy — not used for filtering. */
export function describeSearchIntent(filters: ListingFilters): string {
  const parts: string[] = [];

  if (filters.keyword) parts.push(`“${filters.keyword}”`);
  if (filters.location) parts.push(`in ${filters.location}`);
  if (filters.propertyType) parts.push(filters.propertyType);
  if (filters.status) parts.push(filters.status);
  if (filters.beds) parts.push(`${filters.beds === '5+' ? '5+' : filters.beds}+ beds`);
  if (filters.minPrice || filters.maxPrice) {
    const min = filters.minPrice ? `$${Number(filters.minPrice).toLocaleString()}` : 'any';
    const max = filters.maxPrice ? `$${Number(filters.maxPrice).toLocaleString()}` : 'any';
    parts.push(`${min} – ${max}`);
  }

  return parts.length > 0 ? parts.join(' · ') : 'all listings';
}

/**
 * Maps URL/UI intent to GraphQL variables for the future Laravel API.
 * The frontend does not apply these filters locally.
 */
export function listingFiltersToSearchVariables(
  filters: ListingFilters
): PropertySearchVariables {
  const minBeds = filters.beds
    ? filters.beds === '5+'
      ? 5
      : Number(filters.beds)
    : undefined;

  return {
    keyword: filters.keyword || undefined,
    location: filters.location || undefined,
    type: filters.propertyType || undefined,
    status: filters.status || undefined,
    minBeds: Number.isFinite(minBeds) ? minBeds : undefined,
    minPrice: filters.minPrice ? Number(filters.minPrice) : undefined,
    maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
    page: 1,
    perPage: 12,
  };
}
