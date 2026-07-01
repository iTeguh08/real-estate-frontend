import {
  DEFAULT_LISTING_FILTERS,
  type ListingFilters,
  type PropertyStatus,
  type PropertyType,
} from '@/types';

const PROPERTY_TYPES: PropertyType[] = [
  'Townhouse',
  'Villa',
  'Studio',
  'Apartment',
  'Office',
  'Commercial',
];

const PROPERTY_STATUSES: PropertyStatus[] = ['For Sale', 'For Rent', 'Off Plan', 'Sold'];

function isPropertyType(value: string): value is PropertyType {
  return PROPERTY_TYPES.includes(value as PropertyType);
}

function isPropertyStatus(value: string): value is PropertyStatus {
  return PROPERTY_STATUSES.includes(value as PropertyStatus);
}

export function filtersToSearchParams(filters: ListingFilters): URLSearchParams {
  const params = new URLSearchParams();

  if (filters.keyword) params.set('q', filters.keyword);
  if (filters.location) params.set('location', filters.location);
  if (filters.propertyType) params.set('type', filters.propertyType);
  if (filters.status) params.set('status', filters.status);
  if (filters.beds) params.set('beds', filters.beds);
  if (filters.minPrice) params.set('min', filters.minPrice);
  if (filters.maxPrice) params.set('max', filters.maxPrice);

  return params;
}

export function searchParamsToFilters(params: URLSearchParams): ListingFilters {
  const keyword = params.get('q') ?? '';
  const location = params.get('location') ?? '';
  const typeParam = params.get('type') ?? '';
  const statusParam = params.get('status') ?? '';

  return {
    keyword,
    location,
    propertyType: isPropertyType(typeParam) ? typeParam : '',
    status: isPropertyStatus(statusParam) ? statusParam : '',
    beds: params.get('beds') ?? '',
    minPrice: params.get('min') ?? '',
    maxPrice: params.get('max') ?? '',
  };
}

export function filtersEqual(a: ListingFilters, b: ListingFilters): boolean {
  return (
    a.keyword === b.keyword &&
    a.location === b.location &&
    a.propertyType === b.propertyType &&
    a.status === b.status &&
    a.beds === b.beds &&
    a.minPrice === b.minPrice &&
    a.maxPrice === b.maxPrice
  );
}

export function hasFilterParams(params: URLSearchParams): boolean {
  return !filtersEqual(searchParamsToFilters(params), DEFAULT_LISTING_FILTERS);
}
