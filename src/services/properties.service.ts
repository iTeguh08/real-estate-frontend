import { enrichPropertyDetail } from '@/data/property-details';
import { BEST_VALUE_PROPERTIES, FEATURED_PROPERTIES } from '@/data/properties';
import { listingFiltersToSearchVariables } from '@/lib/search-intent';
import { apiFetch, useMockData } from '@/services/api-client';
import type { ListingFilters, Property, PropertyDetail, PropertyWithAgent } from '@/types';

const ALL_PROPERTIES: Property[] = [
  ...FEATURED_PROPERTIES,
  ...BEST_VALUE_PROPERTIES.filter(
    (p) => !FEATURED_PROPERTIES.some((f) => f.slug === p.slug)
  ),
];

export async function getFeaturedProperties(): Promise<Property[]> {
  if (useMockData()) {
    return FEATURED_PROPERTIES;
  }
  return apiFetch<Property[]>('/properties?featured=true');
}

/**
 * Property search — mock phase returns the full featured catalog regardless of intent.
 * Intent is preserved in URL; swap this for a GraphQL query when the API is ready.
 */
export async function searchProperties(intent: ListingFilters): Promise<Property[]> {
  if (useMockData()) {
    void intent;
    return FEATURED_PROPERTIES;
  }
  const variables = listingFiltersToSearchVariables(intent);
  return apiFetch<Property[]>('/properties/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(variables),
  });
}

export async function getBestValueProperties(): Promise<PropertyWithAgent[]> {
  if (useMockData()) {
    return BEST_VALUE_PROPERTIES;
  }
  return apiFetch<PropertyWithAgent[]>('/properties?best-value=true');
}

export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  if (useMockData()) {
    return ALL_PROPERTIES.find((p) => p.slug === slug) ?? null;
  }
  return apiFetch<Property>(`/properties/${slug}`);
}

export async function getPropertyById(id: string): Promise<Property | null> {
  if (useMockData()) {
    return ALL_PROPERTIES.find((p) => p.id === id) ?? null;
  }
  return apiFetch<Property>(`/properties/id/${id}`);
}

export async function getPropertyDetailBySlug(slug: string): Promise<PropertyDetail | null> {
  const property = await getPropertyBySlug(slug);
  return property ? enrichPropertyDetail(property) : null;
}

export async function getPropertyDetailById(id: string): Promise<PropertyDetail | null> {
  const property = await getPropertyById(id);
  return property ? enrichPropertyDetail(property) : null;
}

export async function getRelatedProperties(
  property: PropertyDetail,
  limit = 3
): Promise<Property[]> {
  const ids = property.relatedPropertyIds ?? [];
  const related = await getPropertiesByIds(ids);
  if (related.length >= limit) {
    return related.slice(0, limit);
  }
  const fallback = ALL_PROPERTIES.filter(
    (p) => p.id !== property.id && p.type === property.type && !related.some((r) => r.id === p.id)
  );
  return [...related, ...fallback].slice(0, limit);
}

export async function getPropertiesByIds(ids: string[]): Promise<Property[]> {
  if (useMockData()) {
    return ids
      .map((id) => ALL_PROPERTIES.find((p) => p.id === id))
      .filter((p): p is Property => Boolean(p));
  }
  return apiFetch<Property[]>(`/properties?ids=${ids.join(',')}`);
}
