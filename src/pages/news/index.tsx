import Head from 'next/head';
import { useQueryClient } from '@tanstack/react-query';
import { NewsView } from '@/modules/blog/views/NewsView';
import { useHydrateQueryCache } from '@/hooks/useHydrateQueryCache';
import { absoluteUrl } from '@/lib/runtime-env';
import { queryKeys } from '@/lib/query-keys';
import { routes } from '@/lib/routes';
import type { Article } from '@/types';

interface NewsPageProps {
  articles: Article[];
  brand: string;
}

export default function NewsPage({ articles, brand }: NewsPageProps) {
  const queryClient = useQueryClient();
  useHydrateQueryCache(() => {
    queryClient.setQueryData(queryKeys.articles.list('news'), articles);
  });

  const title = `${brand} Market Updates | Latest News`;
  const description =
    'Breaking news, market shifts, and industry headlines for property buyers and investors.';
  const canonical = absoluteUrl(routes.news) || routes.news;

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
      <NewsView articles={articles} brand={brand} />
    </>
  );
}
