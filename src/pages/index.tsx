import Head from 'next/head';
import { useQueryClient } from '@tanstack/react-query';
import { HomeView, type HomeViewProps } from '@/modules/home/views/HomeView';
import { useHydrateQueryCache } from '@/hooks/useHydrateQueryCache';
import type { HomepageContent } from '@/data/cms-fallbacks';
import { HOMEPAGE_FALLBACK, SITE_FOOTER_FALLBACK } from '@/data/cms-fallbacks';
import { ARTICLES } from '@/data/articles';
import { AGENTS } from '@/data/agents';
import { BEST_VALUE_PROPERTIES, FEATURED_PROPERTIES } from '@/data/properties';
import { PROPERTY_TYPE_ITEMS } from '@/data/property-types';
import { SITE_CONFIG } from '@/data/site-config';
import { queryKeys } from '@/lib/query-keys';
import { listingFiltersQueryVars } from '@/lib/listing-filter-params';
import { absoluteUrl } from '@/lib/runtime-env';
import { routes } from '@/lib/routes';
import { jsonSafe, withSsgFallback } from '@/lib/ssg';
import { getArticles } from '@/services/articles.service';
import { getFeaturedAgents } from '@/services/agents.service';
import { getHomepage } from '@/services/pages.service';
import {
  getBestValueProperties,
  getFeaturedProperties,
  getPropertyTypeCounts,
  searchProperties,
} from '@/services/properties.service';
import { getSiteConfig, type SiteConfig } from '@/services/site.service';
import {
  DEFAULT_LISTING_FILTERS,
  type Agent,
  type Article,
  type Property,
  type PropertySearchResult,
  type PropertyTypeCount,
  type PropertyWithAgent,
} from '@/types';

const REVALIDATE_SECONDS = 60;

// Route files stay export-clean for Fast Refresh: default component + getStaticProps only.
interface HomePageProps {
  homepage: HomepageContent;
  featuredProperties: Property[];
  searchResult: PropertySearchResult;
  propertyTypeCounts: PropertyTypeCount[];
  articles: Article[];
  bestValueProperties: PropertyWithAgent[];
  agents: Agent[];
  siteConfig: SiteConfig;
}

function hydrateHomeQueries(queryClient: ReturnType<typeof useQueryClient>, props: HomePageProps) {
  queryClient.setQueryData(queryKeys.pages.homepage(), props.homepage);
  queryClient.setQueryData(queryKeys.properties.featured(), props.featuredProperties);
  queryClient.setQueryData(
    queryKeys.properties.search(listingFiltersQueryVars(DEFAULT_LISTING_FILTERS)),
    props.searchResult
  );
  queryClient.setQueryData(queryKeys.properties.typeCounts(), props.propertyTypeCounts);
  queryClient.setQueryData(queryKeys.articles.list('news'), props.articles);
  queryClient.setQueryData(queryKeys.properties.bestValue(), props.bestValueProperties);
  queryClient.setQueryData(queryKeys.agents.featured(), props.agents);
  queryClient.setQueryData(['site-config'], props.siteConfig);
}

export default function HomePage({
  homepage,
  featuredProperties,
  searchResult,
  propertyTypeCounts,
  articles,
  bestValueProperties,
  agents,
  siteConfig,
}: HomePageProps) {
  const queryClient = useQueryClient();
  useHydrateQueryCache(() => {
    hydrateHomeQueries(queryClient, {
      homepage,
      featuredProperties,
      searchResult,
      propertyTypeCounts,
      articles,
      bestValueProperties,
      agents,
      siteConfig,
    });
  });

  const title =
    homepage.seo?.metaTitle ||
    `${siteConfig.brand} — ${homepage.hero.headline.replace(/\n/g, ' ')}`;
  const description = homepage.seo?.metaDescription || homepage.hero.subheadline;
  const ogImage = absoluteUrl(homepage.seo?.ogImage || homepage.hero.backgroundImage);
  const canonical =
    homepage.seo?.canonicalUrl || absoluteUrl(routes.home) || routes.home;

  const viewProps: HomeViewProps = {
    homepage,
    featuredProperties,
    searchResult,
    propertyTypeCounts,
    articles,
    bestValueProperties,
    agents,
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {ogImage ? <meta property="og:image" content={ogImage} /> : null}
        <meta property="og:url" content={canonical} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        {ogImage ? <meta name="twitter:image" content={ogImage} /> : null}
      </Head>
      <HomeView {...viewProps} />
    </>
  );
}

export async function getStaticProps() {
  const emptySearch: PropertySearchResult = {
    items: FEATURED_PROPERTIES,
    total: FEATURED_PROPERTIES.length,
    page: 1,
    perPage: DEFAULT_LISTING_FILTERS.perPage,
    lastPage: 1,
  };
  const siteFallback: SiteConfig = {
    brand: SITE_CONFIG.brand,
    tagline: SITE_CONFIG.tagline,
    contact: { ...SITE_CONFIG.contact },
    footer: SITE_FOOTER_FALLBACK,
  };

  const [
    homepage,
    featuredProperties,
    searchResult,
    propertyTypeCounts,
    articles,
    bestValueProperties,
    agents,
    siteConfig,
  ] = await Promise.all([
    withSsgFallback('homepage', getHomepage, HOMEPAGE_FALLBACK),
    withSsgFallback('featuredProperties', getFeaturedProperties, FEATURED_PROPERTIES),
    withSsgFallback('searchProperties', () => searchProperties(DEFAULT_LISTING_FILTERS), emptySearch),
    withSsgFallback('propertyTypeCounts', getPropertyTypeCounts, PROPERTY_TYPE_ITEMS),
    withSsgFallback('articles', () => getArticles('news'), ARTICLES.filter((item) => item.category === 'news')),
    withSsgFallback('bestValueProperties', getBestValueProperties, BEST_VALUE_PROPERTIES),
    withSsgFallback('featuredAgents', getFeaturedAgents, AGENTS),
    withSsgFallback('siteConfig', getSiteConfig, siteFallback),
  ]);

  return {
    props: jsonSafe({
      homepage,
      featuredProperties,
      searchResult,
      propertyTypeCounts,
      articles,
      bestValueProperties,
      agents,
      siteConfig,
    } satisfies HomePageProps),
    revalidate: REVALIDATE_SECONDS,
  };
}
