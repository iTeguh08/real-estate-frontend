import Head from 'next/head';
import { useQueryClient } from '@tanstack/react-query';
import { HomeView, type HomeViewProps } from '@/modules/home/views/HomeView';
import { useHydrateQueryCache } from '@/hooks/useHydrateQueryCache';
import type { HomepageContent } from '@/data/cms-fallbacks';
import { queryKeys } from '@/lib/query-keys';
import { listingFiltersQueryVars } from '@/lib/listing-filter-params';
import {
  productLargeUrl,
  productMediumUrl,
  PRODUCT_HERO_LARGE_MEDIA,
  PRODUCT_HERO_NARROW_MEDIA,
} from '@/lib/image-url';
import { absoluteUrl } from '@/lib/runtime-env';
import { routes } from '@/lib/routes';
import type { SiteConfig } from '@/services/site.service';
import {
  DEFAULT_LISTING_FILTERS,
  type Agent,
  type Article,
  type Property,
  type PropertySearchResult,
  type PropertyTypeCount,
  type PropertyWithAgent,
} from '@/types';

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
  const siteCanonical = absoluteUrl(routes.home) || routes.home;
  const cmsCanonical = homepage.seo?.canonicalUrl?.trim() || '';
  const canonical =
    cmsCanonical && !/localhost|127\.0\.0\.1/i.test(cmsCanonical) ? cmsCanonical : siteCanonical;
  const lcpMedium =
    productMediumUrl(homepage.hero.backgroundImage) || homepage.hero.backgroundImage || '';
  const lcpLarge = productLargeUrl(homepage.hero.backgroundImage) || lcpMedium;

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
        {lcpMedium && lcpLarge !== lcpMedium ? (
          <>
            <link
              rel="preload"
              as="image"
              href={lcpMedium}
              media={PRODUCT_HERO_NARROW_MEDIA}
              fetchPriority="high"
            />
            <link
              rel="preload"
              as="image"
              href={lcpLarge}
              media={PRODUCT_HERO_LARGE_MEDIA}
              fetchPriority="high"
            />
          </>
        ) : lcpMedium || lcpLarge ? (
          <link
            rel="preload"
            as="image"
            href={lcpMedium || lcpLarge}
            fetchPriority="high"
          />
        ) : null}
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
