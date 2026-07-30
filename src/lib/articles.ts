import { routes } from '@/lib/routes';
import type { Article, ArticleCategory } from '@/types';

export const ARTICLE_CATEGORY_LABELS: Record<ArticleCategory, string> = {
  news: 'News',
  blog: 'Blog',
};

export function getArticleCategoryLabel(category: ArticleCategory): string {
  return ARTICLE_CATEGORY_LABELS[category];
}

export function getArticlePath(article: Pick<Article, 'slug' | 'category'>): string {
  return article.category === 'news'
    ? routes.newsArticle(article.slug)
    : routes.blogArticle(article.slug);
}

export function getArticlesListPath(category: ArticleCategory): string {
  return category === 'news' ? routes.news : routes.blog;
}

export function getArticleTagPath(category: ArticleCategory, tag: string): string {
  const params = new URLSearchParams({ tag });
  return `${getArticlesListPath(category)}?${params.toString()}`;
}
