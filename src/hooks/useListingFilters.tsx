import { createContext, useContext } from 'react';
import type {
  ListingFilters,
  PropertySort,
  PropertyStatus,
  PropertyType,
} from '@/types';

export interface ListingFiltersContextValue {
  /** URL-synced search preferences — not applied client-side. */
  filters: ListingFilters;
  setKeyword: (keyword: string) => void;
  setLocation: (location: string) => void;
  setPropertyType: (propertyType: PropertyType | '') => void;
  setStatus: (status: PropertyStatus | '') => void;
  setSort: (sort: PropertySort | '') => void;
  setPage: (page: number) => void;
  applySearch: (partial: Partial<ListingFilters>, options?: { resetOthers?: boolean }) => void;
  applyNavFilter: (partial: Partial<ListingFilters>) => void;
  clearFilters: () => void;
  scrollToListings: (intent?: ListingFilters) => void;
}

/** Provided by `@/components/providers/ListingFiltersProvider`. */
export const ListingFiltersContext = createContext<ListingFiltersContextValue | null>(null);

export function useListingFilters(): ListingFiltersContextValue {
  const ctx = useContext(ListingFiltersContext);
  if (!ctx) {
    throw new Error('useListingFilters must be used within ListingFiltersProvider');
  }
  return ctx;
}
