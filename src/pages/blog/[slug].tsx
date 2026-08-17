import Head from 'next/head';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { useQueryClient } from '@tanstack/react-query';
import { ArticleDetailView } from '@/modules/blog/views/ArticleDetailView';
import { useHydrateQueryCache } from '@/hooks/useHydrateQueryCache';
import { ARTICLES } from '@/data/articles';
import { absoluteUrl } from '@/lib/runtime-env';
import { queryKeys } from '@/lib/query-keys';
import { routes } from '@/lib/routes';
import { jsonSafe, withSsgFallback } from '@/lib/ssg';
import { getArticleBySlug, getArticles } from '@/services/articles.service';
import type { Article } from '@/types';

const REVALIDATE_SECONDS = 60;

interface BlogArticlePageProps {
  article: Article;
}

function metaDescription(article: Article): string {
  return (article.excerpt || article.body || article.title)
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 180);
}

export default function BlogArticlePage({ article }: BlogArticlePageProps) {
  const queryClient = useQueryClient();
  useHydrateQueryCache(() => {
    queryClient.setQueryData(queryKeys.articles.detail(article.slug), article);
  });

  const title = `${article.title} | Homzen Blog`;
  const description = metaDescription(article);
  const canonical = absoluteUrl(routes.blogArticle(article.slug)) || routes.blogArticle(article.slug);
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

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await withSsgFallback(
    'blogArticlePaths',
    () => getArticles('blog'),
    ARTICLES.filter((item) => item.category === 'blog')
  );

  return {
    paths: articles.map((article) => ({ params: { slug: article.slug } })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<BlogArticlePageProps> = async (context) => {
  const slug = typeof context.params?.slug === 'string' ? context.params.slug : '';
  if (!slug) {
    return { notFound: true };
  }

  const article = await withSsgFallback(
    `blogArticle:${slug}`,
    () => getArticleBySlug(slug),
    ARTICLES.find((item) => item.slug === slug && item.category === 'blog') ?? null
  );

  if (!article || article.category !== 'blog') {
    return { notFound: true };
  }

  return {
    props: jsonSafe({ article } satisfies BlogArticlePageProps),
    revalidate: REVALIDATE_SECONDS,
  };
};
