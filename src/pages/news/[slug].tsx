import Head from 'next/head';
import { useQueryClient } from '@tanstack/react-query';
import { ArticleDetailView } from '@/modules/blog/views/ArticleDetailView';
import { useHydrateQueryCache } from '@/hooks/useHydrateQueryCache';
import { absoluteUrl } from '@/lib/runtime-env';
import { queryKeys } from '@/lib/query-keys';
import { routes } from '@/lib/routes';
import type { Article } from '@/types';

interface NewsArticlePageProps {
  article: Article;
}

function metaDescription(article: Article): string {
  return (article.excerpt || article.body || article.title)
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 180);
}

export default function NewsArticlePage({ article }: NewsArticlePageProps) {
  const queryClient = useQueryClient();
  useHydrateQueryCache(() => {
    queryClient.setQueryData(queryKeys.articles.detail(article.slug), article);
  });

  const title = `${article.title} | Homzen News`;
  const description = metaDescription(article);
  const canonical = absoluteUrl(routes.newsArticle(article.slug)) || routes.newsArticle(article.slug);
  const ogImage = absoluteUrl(article.imageUrl);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {ogImage ? <meta property="og:image" content={ogImage} /> : null}
        <meta property="og:url" content={canonical} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        {ogImage ? <meta name="twitter:image" content={ogImage} /> : null}
      </Head>
      <ArticleDetailView article={article} />
    </>
  );
}
