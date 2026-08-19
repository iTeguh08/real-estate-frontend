import { HOMEPAGE_FALLBACK, SITE_FOOTER_FALLBACK } from '@/data/cms-fallbacks';
import { ARTICLES } from '@/data/articles';
import { AGENTS } from '@/data/agents';
import { BEST_VALUE_PROPERTIES, FEATURED_PROPERTIES } from '@/data/properties';
import { PROPERTY_TYPE_ITEMS } from '@/data/property-types';
import { SITE_CONFIG } from '@/data/site-config';
import { listingFiltersQueryVars } from '@/lib/listing-filter-params';
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

interface HomePageProps {
  homepage: import('@/data/cms-fallbacks').HomepageContent;
  featuredProperties: Property[];
  searchResult: PropertySearchResult;
  propertyTypeCounts: PropertyTypeCount[];
  articles: Article[];
  bestValueProperties: PropertyWithAgent[];
  agents: Agent[];
  siteConfig: SiteConfig;
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

  void listingFiltersQueryVars(DEFAULT_LISTING_FILTERS);

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
    notFound: false,
    revalidate: REVALIDATE_SECONDS,
  };
}
