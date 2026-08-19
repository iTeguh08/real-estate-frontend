import Head from 'next/head';
import { useQueryClient } from '@tanstack/react-query';
import { AboutUsPage } from '@/pages/AboutUsPage';
import { useHydrateQueryCache } from '@/hooks/useHydrateQueryCache';
import type { AboutPageContent } from '@/data/cms-fallbacks';
import { absoluteUrl } from '@/lib/runtime-env';
import { queryKeys } from '@/lib/query-keys';
import { routes } from '@/lib/routes';

interface AboutPageProps {
  page: AboutPageContent;
  brand: string;
}

export default function AboutRoute({ page, brand }: AboutPageProps) {
  const queryClient = useQueryClient();
  useHydrateQueryCache(() => {
    queryClient.setQueryData(queryKeys.pages.about(), page);
  });

  const title = `${page.hero.headline} | ${brand}`;
  const description = page.hero.description;
  const canonical = absoluteUrl(routes.about) || routes.about;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Head>
      <AboutUsPage />
    </>
  );
}
