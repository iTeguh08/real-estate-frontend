import { ARTICLES } from '@/data/articles';
import { apiFetch, useMockData } from '@/services/api-client';
import type { Article } from '@/types';

export async function getArticles(): Promise<Article[]> {
  if (useMockData()) {
    return ARTICLES;
  }
  return apiFetch<Article[]>('/articles');
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  if (useMockData()) {
    return ARTICLES.find((a) => a.slug === slug) ?? null;
  }
  return apiFetch<Article>(`/articles/${slug}`);
}
