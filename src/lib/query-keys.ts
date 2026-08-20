import type { ArticleCategory } from '@/types';

export const queryKeys = {
  properties: {
    all: ['properties'] as const,
    featured: () => [...queryKeys.properties.all, 'featured'] as const,
    search: (intent: Record<string, string>) =>
      [...queryKeys.properties.all, 'search', intent] as const,
    bestValue: () => [...queryKeys.properties.all, 'best-value'] as const,
    detail: (slug: string) => [...queryKeys.properties.all, 'detail', slug] as const,
    detailById: (id: string) => [...queryKeys.properties.all, 'detail-by-id', id] as const,
    related: (id: string) => [...queryKeys.properties.all, 'related', id] as const,
    typeCounts: () => [...queryKeys.properties.all, 'type-counts'] as const,
  },
  agents: {
    all: ['agents'] as const,
    featured: () => [...queryKeys.agents.all, 'featured'] as const,
    list: () => [...queryKeys.agents.all, 'list'] as const,
    detail: (slug: string) => [...queryKeys.agents.all, 'detail', slug] as const,
  },
  articles: {
    all: ['articles'] as const,
    list: (category?: ArticleCategory, tag?: string) =>
      category || tag
        ? ([...queryKeys.articles.all, 'list', category ?? 'all', tag ?? 'all'] as const)
        : ([...queryKeys.articles.all, 'list'] as const),
    detail: (slug: string) => [...queryKeys.articles.all, 'detail', slug] as const,
  },
  pages: {
    all: ['pages'] as const,
    about: () => [...queryKeys.pages.all, 'about'] as const,
    contact: () => [...queryKeys.pages.all, 'contact'] as const,
    homepage: () => [...queryKeys.pages.all, 'homepage'] as const,
    privacy: () => [...queryKeys.pages.all, 'privacy'] as const,
    terms: () => [...queryKeys.pages.all, 'terms'] as const,
    cookies: () => [...queryKeys.pages.all, 'cookies'] as const,
  },
  wishlist: {
    all: () => ['wishlist'] as const,
    properties: (ids: string[]) => [...queryKeys.wishlist.all(), 'properties', ...ids] as const,
  },
  compare: {
    all: () => ['compare'] as const,
    properties: (ids: string[]) => [...queryKeys.compare.all(), 'properties', ...ids] as const,
    limitNotice: () => [...queryKeys.compare.all(), 'limit-notice'] as const,
  },
  myListings: {
    all: ['my-listings'] as const,
    list: () => [...queryKeys.myListings.all, 'list'] as const,
    detail: (id: string | number) => [...queryKeys.myListings.all, 'detail', String(id)] as const,
  },
  mySubmissions: {
    all: ['my-submissions'] as const,
    list: () => [...queryKeys.mySubmissions.all, 'list'] as const,
  },
} as const;
