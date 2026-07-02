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
  },
  agents: {
    all: ['agents'] as const,
    featured: () => [...queryKeys.agents.all, 'featured'] as const,
    detail: (slug: string) => [...queryKeys.agents.all, 'detail', slug] as const,
  },
  articles: {
    all: ['articles'] as const,
    list: () => [...queryKeys.articles.all, 'list'] as const,
    detail: (slug: string) => [...queryKeys.articles.all, 'detail', slug] as const,
  },
  wishlist: {
    all: () => ['wishlist'] as const,
    properties: (ids: string[]) => [...queryKeys.wishlist.all(), 'properties', ...ids] as const,
  },
  compare: {
    all: () => ['compare'] as const,
    properties: (ids: string[]) => [...queryKeys.compare.all(), 'properties', ...ids] as const,
  },
} as const;
