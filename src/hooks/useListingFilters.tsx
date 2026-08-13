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
  type PropertySort,
  type PropertyStatus,
  type PropertyType,
} from '@/types';

interface ListingFiltersContextValue {
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

const ListingFiltersContext = createContext<ListingFiltersContextValue | null>(null);

function isHomePath(pathname: string): boolean {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (pathname === '/' || pathname === '') return true;
  if (!base) return false;
  return pathname === base || pathname === `${base}/`;
}

function isListingsPath(pathname: string): boolean {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const listingsPath = `${base}/listings`.replace(/\/+/g, '/');
  return pathname === '/listings' || pathname === listingsPath;
}

export function ListingFiltersProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const onHome = isHomePath(location.pathname);
  const onListings = isListingsPath(location.pathname);
  const isListingsContextPath = onHome || onListings;

  const [filters, setFilters] = useState<ListingFilters>(() =>
    isListingsContextPath ? searchParamsToFilters(searchParams) : DEFAULT_LISTING_FILTERS
  );

  const syncUrl = useCallback(
    (next: ListingFilters) => {
      if (!isHomePath(location.pathname) && !isListingsPath(location.pathname)) return;
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
    if (!isListingsContextPath) return;
    const fromUrl = searchParamsToFilters(searchParams);
    setFilters((prev) => (filtersEqual(prev, fromUrl) ? prev : fromUrl));
  }, [isListingsContextPath, searchParams]);

  const scrollToListings = useCallback(
    (intent: ListingFilters = filters) => {
      if (!isHomePath(location.pathname)) {
        const params = filtersToSearchParams(intent);
        const search = params.toString();
        navigate({
          pathname: '/listings',
          ...(search ? { search: `?${search}` } : {}),
        });
        return;
      }
      requestAnimationFrame(() => {
        const target = document.getElementById('listings');
        if (!target) return;
        const headerOffset = 96;
        const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
      });
    },
    [location.pathname, navigate, filters]
  );

  const applySearch = useCallback(
    (partial: Partial<ListingFilters>, options?: { resetOthers?: boolean }) => {
      setFilters((prev) => {
        const next = options?.resetOthers
          ? { ...DEFAULT_LISTING_FILTERS, ...partial, page: 1 }
          : { ...prev, ...partial, page: partial.page ?? 1 };
        syncUrl(next);
        scrollToListings(next);
        return next;
      });
    },
    [scrollToListings, syncUrl]
  );

  const applyNavFilter = useCallback(
    (partial: Partial<ListingFilters>) => {
      const next: ListingFilters = {
        ...DEFAULT_LISTING_FILTERS,
        propertyType: (partial.propertyType as PropertyType | '') ?? '',
        status: (partial.status as PropertyStatus | '') ?? '',
        page: 1,
      };
      setFilters(next);
      const params = filtersToSearchParams(next);
      const search = params.toString();
      navigate({
        pathname: '/listings',
        ...(search ? { search: `?${search}` } : {}),
      });
    },
    [navigate]
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
          page: 1,
        };
        syncUrl(next);
        if (propertyType) {
          scrollToListings(next);
        }
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

  const setSort = useCallback(
    (sort: PropertySort | '') => {
      setFilters((prev) => {
        const next = { ...prev, sort, page: 1 };
        syncUrl(next);
        return next;
      });
    },
    [syncUrl]
  );

  const setPage = useCallback(
    (page: number) => {
      setFilters((prev) => {
        const next = { ...prev, page: Math.max(1, page) };
        syncUrl(next);
        scrollToListings(next);
        return next;
      });
    },
    [scrollToListings, syncUrl]
  );

  const clearFilters = useCallback(() => {
    const next = DEFAULT_LISTING_FILTERS;
    setFilters(next);
    if (isHomePath(location.pathname) || isListingsPath(location.pathname)) {
      setSearchParams({}, { replace: true });
    }
  }, [location.pathname, setSearchParams]);

  const value = useMemo(
    () => ({
      filters,
      setKeyword,
      setLocation: setLocationFilter,
      setPropertyType,
      setStatus,
      setSort,
      setPage,
      applySearch,
      applyNavFilter,
      clearFilters,
      scrollToListings,
    }),
    [
      filters,
      setKeyword,
      setLocationFilter,
      setPropertyType,
      setStatus,
      setSort,
      setPage,
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
