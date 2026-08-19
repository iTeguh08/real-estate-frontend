import { ARTICLES } from '@/data/articles';
import { mergeArticleWithFallback, mergeArticlesWithFallback } from '@/lib/cms-merge';
import { graphqlFetch, isMockDataEnabled } from '@/services/graphql-client';
import type { Article, ArticleCategory } from '@/types';

const ARTICLES_LIST_FIELDS = `
  id
  slug
  title
  excerpt
  category
  publishedAt
  imageUrl
  tags
`;

const ARTICLE_DETAIL_FIELDS = `
  ${ARTICLES_LIST_FIELDS}
  body
`;

export async function getArticles(category?: ArticleCategory, tag?: string): Promise<Article[]> {
  if (isMockDataEnabled()) {
    return ARTICLES.filter((article) => {
      if (category && article.category !== category) return false;
      if (tag && !article.tags.includes(tag)) return false;
      return true;
    });
  }

  const data = await graphqlFetch<{ articles: { items: Article[] } }>(
    `query GetArticles($category: ArticleCategory, $tag: String) {
      articles(category: $category, tag: $tag) {
        items {
          ${ARTICLES_LIST_FIELDS}
        }
      }
    }`,
    {
      ...(category ? { category } : {}),
      ...(tag ? { tag } : {}),
    },
  );

  if (!data) {
    return ARTICLES.filter((article) => {
      if (category && article.category !== category) return false;
      if (tag && !article.tags.includes(tag)) return false;
      return true;
    });
  }

  return mergeArticlesWithFallback(data.articles.items);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  if (isMockDataEnabled()) {
    return ARTICLES.find((article) => article.slug === slug) ?? null;
  }

  const data = await graphqlFetch<{ article: Article | null }>(
    `query GetArticle($slug: String!) {
      article(slug: $slug) {
        ${ARTICLE_DETAIL_FIELDS}
      }
    }`,
    { slug },
  );

  if (!data) {
    return ARTICLES.find((article) => article.slug === slug) ?? null;
  }

  return data.article ? mergeArticleWithFallback(data.article) : null;
}
