import Head from 'next/head';
import type { GetServerSideProps } from 'next';
import type { ParsedUrlQuery } from 'querystring';
import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { ListingsView } from '@/modules/listings/views/ListingsView';
import { BEST_VALUE_PROPERTIES, FEATURED_PROPERTIES } from '@/data/properties';
import {
  listingFiltersQueryVars,
  normalizeListingsFilters,
} from '@/lib/listing-filter-params';
import { buildListingsSeo } from '@/lib/listings-seo';
import { parseAppLocation } from '@/lib/app-router';
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

export default function ListingsPage({
  filters: initialFilters,
  searchResult,
  featuredProperties,
  bestValueProperties,
  seo: initialSeo,
}: ListingsPageProps) {
  const router = useRouter();
  const liveFilters = useMemo(() => {
    const { search } = parseAppLocation(router.asPath || '/listings');
    return normalizeListingsFilters(
      new URLSearchParams(search.startsWith('?') ? search.slice(1) : search)
    );
  }, [router.asPath]);
  const seo = useMemo(() => buildListingsSeo(liveFilters), [liveFilters]);

  return (
    <>
      <Head>
        <title>{seo.title || initialSeo.title}</title>
        <meta name="description" content={seo.description || initialSeo.description} />
        <link rel="canonical" href={seo.canonical || initialSeo.canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={seo.title || initialSeo.title} />
        <meta property="og:description" content={seo.description || initialSeo.description} />
        <meta property="og:url" content={seo.canonical || initialSeo.canonical} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title || initialSeo.title} />
        <meta name="twitter:description" content={seo.description || initialSeo.description} />
      </Head>
      <ListingsView
        filters={initialFilters}
        searchResult={searchResult}
        featuredProperties={featuredProperties}
        bestValueProperties={bestValueProperties}
      />
    </>
  );
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
    withSsgFallback(
      'listingsSearch',
      () => searchProperties(filters),
      emptySearch,
    ),
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
    } satisfies ListingsPageProps),
  };
};
