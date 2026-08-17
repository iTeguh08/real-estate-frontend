import Head from 'next/head';
import { useQueryClient } from '@tanstack/react-query';
import { BlogView } from '@/modules/blog/views/BlogView';
import { useHydrateQueryCache } from '@/hooks/useHydrateQueryCache';
import { ARTICLES } from '@/data/articles';
import { SITE_CONFIG } from '@/data/site-config';
import { absoluteUrl } from '@/lib/runtime-env';
import { queryKeys } from '@/lib/query-keys';
import { routes } from '@/lib/routes';
import { jsonSafe, withSsgFallback } from '@/lib/ssg';
import { getArticles } from '@/services/articles.service';
import type { Article } from '@/types';

const REVALIDATE_SECONDS = 60;

interface BlogPageProps {
  articles: Article[];
  brand: string;
}

export default function BlogPage({ articles, brand }: BlogPageProps) {
  const queryClient = useQueryClient();
  useHydrateQueryCache(() => {
    queryClient.setQueryData(queryKeys.articles.list('blog'), articles);
  });

  const title = `${brand} Guides & Insights | Blog`;
  const description =
    'Buyer guides, expert tips, and practical advice for your real estate journey.';
  const canonical = absoluteUrl(routes.blog) || routes.blog;

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
      <BlogView articles={articles} brand={brand} />
    </>
  );
}

export async function getStaticProps() {
  const articles = await withSsgFallback(
    'blogArticles',
    () => getArticles('blog'),
    ARTICLES.filter((item) => item.category === 'blog')
  );

  return {
    props: jsonSafe({
      articles,
      brand: SITE_CONFIG.brand,
    } satisfies BlogPageProps),
    revalidate: REVALIDATE_SECONDS,
  };
}
