
import type { GetServerSideProps } from 'next';
import type { ParsedUrlQuery } from 'querystring';
import { BEST_VALUE_PROPERTIES, FEATURED_PROPERTIES } from '@/data/properties';
import {
  listingFiltersQueryVars,
  normalizeListingsFilters,
} from '@/lib/listing-filter-params';
import { buildListingsSeo } from '@/lib/listings-seo';
import { jsonSafe, withSsgFallback } from '@/lib/ssg';
import {
  getBestValueProperties,
  getFeaturedProperties,
  searchProperties,
} from '@/services/properties.service';
import type {
  ListingFilters,
  Property,
  PropertySearchResult,
  PropertyWithAgent,
} from '@/types';

interface ListingsPageProps {
  filters: ListingFilters;
  searchResult: PropertySearchResult;
  featuredProperties: Property[];
  bestValueProperties: PropertyWithAgent[];
  seo: {
    title: string;
    description: string;
    canonical: string;
  };
}

function queryToSearchParams(query: ParsedUrlQuery): URLSearchParams {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value == null) continue;
    const raw = Array.isArray(value) ? value[0] : value;
    if (raw) params.set(key, raw);
  }
  return params;
}

export const getServerSideProps: GetServerSideProps<ListingsPageProps> = async (context) => {
  const filters = normalizeListingsFilters(queryToSearchParams(context.query));

  const emptySearch: PropertySearchResult = {
    items: [],
    total: 0,
    page: filters.page,
    perPage: filters.perPage,
    lastPage: 1,
  };

  const [searchResult, featuredProperties, bestValueProperties] = await Promise.all([
    withSsgFallback('listingsSearch', () => searchProperties(filters), emptySearch),
    withSsgFallback('featuredProperties', getFeaturedProperties, FEATURED_PROPERTIES),
    withSsgFallback('bestValueProperties', getBestValueProperties, BEST_VALUE_PROPERTIES),
  ]);

  void listingFiltersQueryVars(filters);

  return {
    props: jsonSafe({
      filters,
      searchResult,
      featuredProperties,
      bestValueProperties,
      seo: buildListingsSeo(filters),
    }),
  };
};
