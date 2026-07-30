import { PROPERTY_TYPES } from '@/data/property-types';
import {
  DEFAULT_LISTING_FILTERS,
  type ListingFilters,
  type PropertySort,
  type PropertyStatus,
  type PropertyType,
} from '@/types';

const PROPERTY_STATUSES: PropertyStatus[] = ['For Sale', 'For Rent', 'Off Plan', 'Sold'];

function isPropertyType(value: string): value is PropertyType {
  return (PROPERTY_TYPES as readonly string[]).includes(value);
}

function isPropertyStatus(value: string): value is PropertyStatus {
  return PROPERTY_STATUSES.includes(value as PropertyStatus);
}

const PROPERTY_SORTS: PropertySort[] = ['FEATURED', 'NEWEST', 'PRICE_ASC', 'PRICE_DESC'];

function isPropertySort(value: string): value is PropertySort {
  return PROPERTY_SORTS.includes(value as PropertySort);
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
  if (filters.agentSlug) params.set('agent', filters.agentSlug);
  if (filters.sort) params.set('sort', filters.sort);
  if (filters.page > 1) params.set('page', String(filters.page));
  if (filters.perPage !== DEFAULT_LISTING_FILTERS.perPage) {
    params.set('perPage', String(filters.perPage));
  }

  return params;
}

export function searchParamsToFilters(params: URLSearchParams): ListingFilters {
  const keyword = params.get('q') ?? '';
  const location = params.get('location') ?? '';
  const typeParam = params.get('type') ?? '';
  const statusParam = params.get('status') ?? '';
  const sortParam = params.get('sort') ?? '';
  const pageParam = Number(params.get('page') ?? '1');
  const perPageParam = Number(params.get('perPage') ?? String(DEFAULT_LISTING_FILTERS.perPage));

  return {
    keyword,
    location,
    propertyType: isPropertyType(typeParam) ? typeParam : '',
    status: isPropertyStatus(statusParam) ? statusParam : '',
    beds: params.get('beds') ?? '',
    minPrice: params.get('min') ?? '',
    maxPrice: params.get('max') ?? '',
    agentSlug: params.get('agent') ?? '',
    sort: isPropertySort(sortParam) ? sortParam : '',
    page: Number.isFinite(pageParam) && pageParam > 0 ? Math.floor(pageParam) : 1,
    perPage: Number.isFinite(perPageParam) && perPageParam > 0
      ? Math.floor(perPageParam)
      : DEFAULT_LISTING_FILTERS.perPage,
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
    a.maxPrice === b.maxPrice &&
    a.agentSlug === b.agentSlug &&
    a.sort === b.sort &&
    a.page === b.page &&
    a.perPage === b.perPage
  );
}

export function hasFilterParams(params: URLSearchParams): boolean {
  return !filtersEqual(searchParamsToFilters(params), DEFAULT_LISTING_FILTERS);
}
