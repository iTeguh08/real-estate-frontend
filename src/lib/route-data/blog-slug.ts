
import type { GetStaticPaths, GetStaticProps } from 'next';
import { ARTICLES } from '@/data/articles';
import { jsonSafe, withSsgFallback } from '@/lib/ssg';
import { getArticleBySlug, getArticles } from '@/services/articles.service';
import type { Article } from '@/types';

const REVALIDATE_SECONDS = 60;

interface BlogArticlePageProps {
  article: Article;
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
    props: jsonSafe({ article }),
    notFound: false,
    revalidate: REVALIDATE_SECONDS,
  };
};
