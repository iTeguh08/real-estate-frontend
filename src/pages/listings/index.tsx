import Head from 'next/head';
import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { ListingsView } from '@/modules/listings/views/ListingsView';
import {
  normalizeListingsFilters,
} from '@/lib/listing-filter-params';
import { buildListingsSeo } from '@/lib/listings-seo';
import { parseAppLocation } from '@/lib/app-router';
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
