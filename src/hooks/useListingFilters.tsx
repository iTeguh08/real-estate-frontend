import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import {
  filtersEqual,
  filtersToSearchParams,
  searchParamsToFilters,
} from '@/lib/listing-filter-params';
import {
  DEFAULT_LISTING_FILTERS,
  type ListingFilters,
  type PropertyStatus,
  type PropertyType,
} from '@/types';

interface ListingFiltersContextValue {
  /** URL-synced search preferences — not applied client-side. */
  filters: ListingFilters;
  advancedSearchOpen: boolean;
  setAdvancedSearchOpen: (open: boolean) => void;
  setKeyword: (keyword: string) => void;
  setLocation: (location: string) => void;
  setPropertyType: (propertyType: PropertyType | '') => void;
  setStatus: (status: PropertyStatus | '') => void;
  applySearch: (partial: Partial<ListingFilters>, options?: { resetOthers?: boolean }) => void;
  applyNavFilter: (partial: Partial<ListingFilters>) => void;
  clearFilters: () => void;
  scrollToListings: (intent?: ListingFilters) => void;
}

const ListingFiltersContext = createContext<ListingFiltersContextValue | null>(null);

function isHomePath(pathname: string): boolean {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (pathname === '/' || pathname === '') return true;
  if (!base) return false;
  return pathname === base || pathname === `${base}/`;
}

export function ListingFiltersProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const onHome = isHomePath(location.pathname);

  const [filters, setFilters] = useState<ListingFilters>(() =>
    onHome ? searchParamsToFilters(searchParams) : DEFAULT_LISTING_FILTERS
  );
  const [advancedSearchOpen, setAdvancedSearchOpen] = useState(false);

  const syncUrl = useCallback(
    (next: ListingFilters) => {
      if (!isHomePath(location.pathname)) return;
      const nextParams = filtersToSearchParams(next);
      if (nextParams.toString() !== searchParams.toString()) {
        setSearchParams(nextParams, { replace: true });
      }
    },
    [location.pathname, searchParams, setSearchParams]
  );

  const commitIntent = useCallback(
    (next: ListingFilters) => {
      setFilters(next);
      syncUrl(next);
      return next;
    },
    [syncUrl]
  );

  useEffect(() => {
    if (!onHome) return;
    const fromUrl = searchParamsToFilters(searchParams);
    setFilters((prev) => (filtersEqual(prev, fromUrl) ? prev : fromUrl));
  }, [onHome, searchParams]);

  const scrollToListings = useCallback(
    (intent: ListingFilters = filters) => {
      if (!isHomePath(location.pathname)) {
        const params = filtersToSearchParams(intent);
        const search = params.toString();
        navigate({
          pathname: '/',
          hash: '#listings',
          ...(search ? { search: `?${search}` } : {}),
        });
        return;
      }
      requestAnimationFrame(() => {
        document.getElementById('listings')?.scrollIntoView({ behavior: 'smooth' });
      });
    },
    [location.pathname, navigate, filters]
  );

  const applySearch = useCallback(
    (partial: Partial<ListingFilters>, options?: { resetOthers?: boolean }) => {
      setFilters((prev) => {
        const next = options?.resetOthers
          ? { ...DEFAULT_LISTING_FILTERS, ...partial }
          : { ...prev, ...partial };
        syncUrl(next);
        scrollToListings(next);
        return next;
      });
    },
    [scrollToListings, syncUrl]
  );

  const applyNavFilter = useCallback(
    (partial: Partial<ListingFilters>) => {
      setFilters((prev) => {
        const next = { ...prev, ...partial };
        syncUrl(next);
        scrollToListings(next);
        return next;
      });
    },
    [scrollToListings, syncUrl]
  );

  const setKeyword = useCallback(
    (keyword: string) => {
      commitIntent({ ...filters, keyword });
    },
    [commitIntent, filters]
  );

  const setLocationFilter = useCallback(
    (locationValue: string) => {
      commitIntent({ ...filters, location: locationValue });
    },
    [commitIntent, filters]
  );

  const setPropertyType = useCallback(
    (propertyType: PropertyType | '') => {
      setFilters((prev) => {
        const next = {
          ...prev,
          propertyType,
          beds: '',
          minPrice: '',
          maxPrice: '',
        };
        syncUrl(next);
        scrollToListings(next);
        return next;
      });
    },
    [scrollToListings, syncUrl]
  );

  const setStatus = useCallback(
    (status: PropertyStatus | '') => {
      commitIntent({ ...filters, status });
    },
    [commitIntent, filters]
  );

  const clearFilters = useCallback(() => {
    const next = DEFAULT_LISTING_FILTERS;
    setFilters(next);
    if (isHomePath(location.pathname)) {
      setSearchParams({}, { replace: true });
    }
  }, [location.pathname, setSearchParams]);

  const value = useMemo(
    () => ({
      filters,
      advancedSearchOpen,
      setAdvancedSearchOpen,
      setKeyword,
      setLocation: setLocationFilter,
      setPropertyType,
      setStatus,
      applySearch,
      applyNavFilter,
      clearFilters,
      scrollToListings,
    }),
    [
      filters,
      advancedSearchOpen,
      setKeyword,
      setLocationFilter,
      setPropertyType,
      setStatus,
      applySearch,
      applyNavFilter,
      clearFilters,
      scrollToListings,
    ]
  );

  return (
    <ListingFiltersContext.Provider value={value}>
      {children}
    </ListingFiltersContext.Provider>
  );
}

export function useListingFilters(): ListingFiltersContextValue {
  const ctx = useContext(ListingFiltersContext);
  if (!ctx) {
    throw new Error('useListingFilters must be used within ListingFiltersProvider');
  }
  return ctx;
}
