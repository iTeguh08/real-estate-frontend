import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { getAgentBySlug, getAgents, getFeaturedAgents } from '@/services/agents.service';
import { getArticleBySlug, getArticles } from '@/services/articles.service';
import {
  getAboutPage,
  getContactPage,
  getCookiePage,
  getHomepage,
  getPrivacyPage,
  getTermsPage,
} from '@/services/pages.service';
import {
  getFeaturedProperties,
  getBestValueProperties,
  getPropertyBySlug,
  getPropertyDetailById,
  getPropertyDetailBySlug,
  getPropertyTypeCounts,
  getRelatedProperties,
  searchProperties,
} from '@/services/properties.service';
import {
  fetchMyListing,
  fetchMyListings,
} from '@/services/agent-listings.service';
import { fetchMyPropertySubmissions } from '@/services/property-submissions.service';
import { listingFiltersQueryVars } from '@/lib/listing-filter-params';
import type { ArticleCategory, ListingFilters, PropertyDetail } from '@/types';

export function useFeaturedPropertiesQuery() {
  return useQuery({
    queryKey: queryKeys.properties.featured(),
    queryFn: getFeaturedProperties,
  });
}

export function usePropertySearchQuery(intent: ListingFilters) {
  return useQuery({
    queryKey: queryKeys.properties.search(listingFiltersQueryVars(intent)),
    queryFn: () => searchProperties(intent),
    placeholderData: keepPreviousData,
  });
}

export function usePropertyTypeCountsQuery() {
  return useQuery({
    queryKey: queryKeys.properties.typeCounts(),
    queryFn: getPropertyTypeCounts,
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

export function usePropertyDetailQuery(slug: string | undefined) {
  return useQuery({
    queryKey: queryKeys.properties.detail(slug ?? ''),
    queryFn: () => getPropertyDetailBySlug(slug!),
    enabled: Boolean(slug),
  });
}

export function usePropertyDetailByIdQuery(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.properties.detailById(id ?? ''),
    queryFn: () => getPropertyDetailById(id!),
    enabled: Boolean(id),
  });
}

export function useRelatedPropertiesQuery(property: PropertyDetail | undefined) {
  return useQuery({
    queryKey: queryKeys.properties.related(property?.id ?? ''),
    queryFn: () => getRelatedProperties(property!),
    enabled: Boolean(property),
  });
}

export function useAgentsQuery() {
  return useQuery({
    queryKey: queryKeys.agents.featured(),
    queryFn: getFeaturedAgents,
  });
}

export function useAgentsListQuery() {
  return useQuery({
    queryKey: queryKeys.agents.list(),
    queryFn: getAgents,
  });
}

export function useAgentQuery(slug: string | undefined) {
  return useQuery({
    queryKey: queryKeys.agents.detail(slug ?? ''),
    queryFn: () => getAgentBySlug(slug!),
    enabled: Boolean(slug),
  });
}

export function useArticlesQuery(category?: ArticleCategory, tag?: string) {
  return useQuery({
    queryKey: queryKeys.articles.list(category, tag),
    queryFn: () => getArticles(category, tag),
  });
}

export function useArticleQuery(slug: string | undefined) {
  return useQuery({
    queryKey: queryKeys.articles.detail(slug ?? ''),
    queryFn: () => getArticleBySlug(slug!),
    enabled: Boolean(slug),
  });
}

export function useAboutPageQuery() {
  return useQuery({
    queryKey: queryKeys.pages.about(),
    queryFn: getAboutPage,
  });
}

export function useContactPageQuery() {
  return useQuery({
    queryKey: queryKeys.pages.contact(),
    queryFn: getContactPage,
  });
}

export function useHomepageQuery() {
  return useQuery({
    queryKey: queryKeys.pages.homepage(),
    queryFn: getHomepage,
  });
}

export function usePrivacyPageQuery() {
  return useQuery({
    queryKey: queryKeys.pages.privacy(),
    queryFn: getPrivacyPage,
  });
}

export function useTermsPageQuery() {
  return useQuery({
    queryKey: queryKeys.pages.terms(),
    queryFn: getTermsPage,
  });
}

export function useCookiePageQuery() {
  return useQuery({
    queryKey: queryKeys.pages.cookies(),
    queryFn: getCookiePage,
  });
}

export function useMyListingsQuery(enabled = true) {
  return useQuery({
    queryKey: queryKeys.myListings.list(),
    queryFn: fetchMyListings,
    enabled,
  });
}

export function useMyPropertySubmissionsQuery(enabled = true) {
  return useQuery({
    queryKey: queryKeys.mySubmissions.list(),
    queryFn: fetchMyPropertySubmissions,
    enabled,
  });
}

export function useMyListingQuery(id: string | undefined, enabled = true) {
  return useQuery({
    queryKey: queryKeys.myListings.detail(id ?? ''),
    queryFn: () => fetchMyListing(id!),
    enabled: Boolean(id) && enabled,
  });
}
