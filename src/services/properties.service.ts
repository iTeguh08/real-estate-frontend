import { enrichPropertyDetail } from '@/data/property-details';
import { BEST_VALUE_PROPERTIES, FEATURED_PROPERTIES } from '@/data/properties';
import {
  mergePropertiesWithFallback,
  mergePropertyDetailWithFallback,
  mergePropertyWithAgentFallback,
  mergePropertyWithFallback,
} from '@/lib/cms-merge';
import { hasSearchIntent, listingFiltersToSearchVariables } from '@/lib/search-intent';
import { graphqlFetch, useMockData } from '@/services/graphql-client';
import type { ListingFilters, Property, PropertyDetail, PropertySearchResult, PropertySearchVariables, PropertySort, PropertyTypeCount, PropertyWithAgent } from '@/types';
import { DEFAULT_LISTINGS_PER_PAGE } from '@/types';

const ALL_PROPERTIES: Property[] = [
  ...FEATURED_PROPERTIES,
  ...BEST_VALUE_PROPERTIES.filter(
    (p) => !FEATURED_PROPERTIES.some((f) => f.slug === p.slug)
  ),
];

const PROPERTY_FIELDS = `
  id slug title location street city countryCode price currency status type
  specs { beds baths sqft garage }
  imageUrl isFeatured isNew customLayout
`;

const PROPERTY_DETAIL_FIELDS = `
  ${PROPERTY_FIELDS}
  description tagline
  gallery { id url alt }
  features amenities
  layout1Media {
    showcaseOneUrl showcaseTwoUrl showcaseThreeUrl
    featureVerticalUrl featureSquareUrl bannerUrl
  }
  layout2Media {
    splitVerticalUrl splitLandscapeUrl bannerUrl
  }
  relatedPropertyIds
`;

export async function getFeaturedProperties(): Promise<Property[]> {
  if (useMockData()) {
    return FEATURED_PROPERTIES;
  }

  const data = await graphqlFetch<{ featuredProperties: Property[] }>(`
    query { featuredProperties { ${PROPERTY_FIELDS} } }
  `);

  return mergePropertiesWithFallback(data.featuredProperties);
}

function compactSearchFilters(
  variables: PropertySearchVariables,
): Record<string, string | number> {
  return Object.fromEntries(
    Object.entries(variables).filter(
      ([key, value]) =>
        value !== undefined &&
        value !== null &&
        value !== '' &&
        !(key === 'page' && value === 1) &&
        !(key === 'perPage' && value === DEFAULT_LISTINGS_PER_PAGE),
    ),
  ) as Record<string, string | number>;
}

function paginateLocally(properties: Property[], page: number, perPage: number): PropertySearchResult {
  const total = properties.length;
  const lastPage = Math.max(1, Math.ceil(total / perPage));
  const safePage = Math.min(Math.max(1, page), lastPage);
  const offset = (safePage - 1) * perPage;

  return {
    items: properties.slice(offset, offset + perPage),
    total,
    page: safePage,
    perPage,
    lastPage,
  };
}

function applyLocalSort(properties: Property[], sort: PropertySort | ''): Property[] {
  const sorted = [...properties];

  switch (sort) {
    case 'PRICE_ASC':
      return sorted.sort((a, b) => a.price - b.price || a.id.localeCompare(b.id));
    case 'PRICE_DESC':
      return sorted.sort((a, b) => b.price - a.price || a.id.localeCompare(b.id));
    case 'NEWEST':
      return sorted.sort(
        (a, b) =>
          Number(b.isNew) - Number(a.isNew) || b.id.localeCompare(a.id),
      );
    case 'FEATURED':
    default:
      return sorted.sort(
        (a, b) =>
          Number(b.isFeatured) - Number(a.isFeatured) || b.id.localeCompare(a.id),
      );
  }
}

function filterPropertiesLocally(properties: Property[], intent: ListingFilters): Property[] {
  const hasFilters = hasSearchIntent(intent);
  const hasSort = Boolean(intent.sort);

  if (!hasFilters && !hasSort) {
    return FEATURED_PROPERTIES;
  }

  const filtered = hasFilters
    ? properties.filter((property) => {
        const vars = listingFiltersToSearchVariables(intent);

        // Mock data has no agentSlug linkage; show featured sample set for agent pages.
        if (vars.agentSlug) {
          return FEATURED_PROPERTIES.some((featured) => featured.id === property.id);
        }

        if (vars.keyword) {
          const keyword = vars.keyword.toLowerCase();
          const haystack = [
            property.title,
            property.location,
            property.street,
            property.city,
            property.countryCode,
          ]
            .filter(Boolean)
            .join(' ')
            .toLowerCase();
          if (!haystack.includes(keyword)) {
            return false;
          }
        }

        if (vars.location) {
          const needle = vars.location.toLowerCase();
          const haystack = [
            property.location,
            property.street,
            property.city,
            property.countryCode,
          ]
            .filter(Boolean)
            .join(' ')
            .toLowerCase();
          if (!haystack.includes(needle)) {
            return false;
          }
        }

        if (vars.type && property.type !== vars.type) {
          return false;
        }

        if (vars.status && property.status !== vars.status) {
          return false;
        }

        if (vars.minBeds !== undefined && property.specs.beds < vars.minBeds) {
          return false;
        }

        if (vars.minPrice !== undefined && property.price < vars.minPrice) {
          return false;
        }

        if (vars.maxPrice !== undefined && property.price > vars.maxPrice) {
          return false;
        }

        return true;
      })
    : [...ALL_PROPERTIES];

  return intent.sort ? applyLocalSort(filtered, intent.sort) : filtered;
}

export async function searchProperties(intent: ListingFilters): Promise<PropertySearchResult> {
  const variables = listingFiltersToSearchVariables(intent);
  const page = variables.page ?? 1;
  const perPage = variables.perPage ?? DEFAULT_LISTINGS_PER_PAGE;

  if (useMockData()) {
    const filtered = filterPropertiesLocally(ALL_PROPERTIES, intent);
    return paginateLocally(filtered, page, perPage);
  }

  const filters = compactSearchFilters(variables);

  const data = await graphqlFetch<{ properties: PropertySearchResult }>(
    `
    query SearchProperties($filters: PropertySearchInput) {
      properties(filters: $filters) {
        total
        page
        perPage
        lastPage
        items { ${PROPERTY_FIELDS} }
      }
    }
  `,
    Object.keys(filters).length > 0 ? { filters } : {},
  );

  return {
    ...data.properties,
    items: mergePropertiesWithFallback(data.properties.items),
  };
}

export async function getPropertyTypeCounts(): Promise<PropertyTypeCount[]> {
  if (useMockData()) {
    const { PROPERTY_TYPE_ITEMS } = await import('@/data/property-types');
    return PROPERTY_TYPE_ITEMS;
  }

  const data = await graphqlFetch<{ propertyTypeCounts: PropertyTypeCount[] }>(`
    query { propertyTypeCounts { type count } }
  `);

  return data.propertyTypeCounts;
}

export async function getBestValueProperties(): Promise<PropertyWithAgent[]> {
  if (useMockData()) {
    return BEST_VALUE_PROPERTIES;
  }

  const data = await graphqlFetch<{ bestValueProperties: PropertyWithAgent[] }>(`
    query {
      bestValueProperties {
        ${PROPERTY_FIELDS}
        agent { id name avatarUrl }
      }
    }
  `);

  return data.bestValueProperties.map(mergePropertyWithAgentFallback);
}

export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  if (useMockData()) {
    return ALL_PROPERTIES.find((p) => p.slug === slug) ?? null;
  }

  const data = await graphqlFetch<{ property: PropertyDetail | null }>(`
    query($slug: String!) {
      property(slug: $slug) { ${PROPERTY_FIELDS} }
    }
  `, { slug });

  return data.property ? mergePropertyWithFallback(data.property) : null;
}

export async function getPropertyById(id: string): Promise<Property | null> {
  if (useMockData()) {
    return ALL_PROPERTIES.find((p) => p.id === id) ?? null;
  }

  const data = await graphqlFetch<{ propertyById: PropertyDetail | null }>(`
    query($id: ID!) {
      propertyById(id: $id) { ${PROPERTY_FIELDS} }
    }
  `, { id });

  return data.propertyById ? mergePropertyWithFallback(data.propertyById) : null;
}

export async function getPropertyDetailBySlug(slug: string): Promise<PropertyDetail | null> {
  if (useMockData()) {
    const property = ALL_PROPERTIES.find((p) => p.slug === slug);
    return property ? enrichPropertyDetail(property) : null;
  }

  const data = await graphqlFetch<{ property: PropertyDetail | null }>(`
    query($slug: String!) {
      property(slug: $slug) { ${PROPERTY_DETAIL_FIELDS} }
    }
  `, { slug });

  return data.property ? mergePropertyDetailWithFallback(data.property) : null;
}

export async function getPropertyDetailById(id: string): Promise<PropertyDetail | null> {
  if (useMockData()) {
    const property = ALL_PROPERTIES.find((p) => p.id === id);
    return property ? enrichPropertyDetail(property) : null;
  }

  const data = await graphqlFetch<{ propertyById: PropertyDetail | null }>(`
    query($id: ID!) {
      propertyById(id: $id) { ${PROPERTY_DETAIL_FIELDS} }
    }
  `, { id });

  return data.propertyById ? mergePropertyDetailWithFallback(data.propertyById) : null;
}

export async function getRelatedProperties(
  property: PropertyDetail,
  limit = 3
): Promise<Property[]> {
  const ids = property.relatedPropertyIds ?? [];

  if (useMockData()) {
    const related = ids
      .map((id) => ALL_PROPERTIES.find((p) => p.id === id))
      .filter((p): p is Property => Boolean(p));
    if (related.length >= limit) {
      return related.slice(0, limit);
    }
    const fallback = ALL_PROPERTIES.filter(
      (p) => p.id !== property.id && p.type === property.type && !related.some((r) => r.id === p.id)
    );
    return [...related, ...fallback].slice(0, limit);
  }

  const related = await Promise.all(
    ids.slice(0, limit).map((id) => getPropertyById(id))
  );

  return related.filter((p): p is Property => Boolean(p));
}

export async function getPropertiesByIds(ids: string[]): Promise<Property[]> {
  if (useMockData()) {
    return ids
      .map((id) => ALL_PROPERTIES.find((p) => p.id === id))
      .filter((p): p is Property => Boolean(p));
  }

  const results = await Promise.all(ids.map((id) => getPropertyById(id)));
  return results.filter((p): p is Property => Boolean(p));
}
