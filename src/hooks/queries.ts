import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { getAgentBySlug, getFeaturedAgents } from '@/services/agents.service';
import { getArticleBySlug, getArticles } from '@/services/articles.service';
import {
  getFeaturedProperties,
  getBestValueProperties,
  getPropertyBySlug,
  searchProperties,
} from '@/services/properties.service';
import type { ListingFilters } from '@/types';

function intentQueryKey(intent: ListingFilters): Record<string, string> {
  return {
    keyword: intent.keyword,
    location: intent.location,
    propertyType: intent.propertyType,
    status: intent.status,
    beds: intent.beds,
    minPrice: intent.minPrice,
    maxPrice: intent.maxPrice,
  };
}

export function useFeaturedPropertiesQuery() {
  return useQuery({
    queryKey: queryKeys.properties.featured(),
    queryFn: getFeaturedProperties,
  });
}

export function usePropertySearchQuery(intent: ListingFilters) {
  return useQuery({
    queryKey: queryKeys.properties.search(intentQueryKey(intent)),
    queryFn: () => searchProperties(intent),
  });
}

export function useBestValuePropertiesQuery() {
  return useQuery({
    queryKey: queryKeys.properties.bestValue(),
    queryFn: getBestValueProperties,
  });
}

export function usePropertyQuery(slug: string | undefined) {
  return useQuery({
    queryKey: queryKeys.properties.detail(slug ?? ''),
    queryFn: () => getPropertyBySlug(slug!),
    enabled: Boolean(slug),
  });
}

export function useAgentsQuery() {
  return useQuery({
    queryKey: queryKeys.agents.featured(),
    queryFn: getFeaturedAgents,
  });
}

export function useAgentQuery(slug: string | undefined) {
  return useQuery({
    queryKey: queryKeys.agents.detail(slug ?? ''),
    queryFn: () => getAgentBySlug(slug!),
    enabled: Boolean(slug),
  });
}

export function useArticlesQuery() {
  return useQuery({
    queryKey: queryKeys.articles.list(),
    queryFn: getArticles,
  });
}

export function useArticleQuery(slug: string | undefined) {
  return useQuery({
    queryKey: queryKeys.articles.detail(slug ?? ''),
    queryFn: () => getArticleBySlug(slug!),
    enabled: Boolean(slug),
  });
}
