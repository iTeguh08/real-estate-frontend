import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { ListingFiltersContext } from '@/hooks/useListingFilters';
import { useAppLocation, useAppNavigate, useAppSearchParams } from '@/lib/app-router';
import { getPublicBasePath } from '@/lib/runtime-env';
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

function isHomePath(pathname: string): boolean {
  const base = getPublicBasePath().replace(/\/$/, '');
  if (pathname === '/' || pathname === '') return true;
  if (!base) return false;
  return pathname === base || pathname === `${base}/`;
}

function isListingsPath(pathname: string): boolean {
  const base = getPublicBasePath().replace(/\/$/, '');
  const listingsPath = `${base}/listings`.replace(/\/+/g, '/');
  return pathname === '/listings' || pathname === listingsPath;
}

export function ListingFiltersProvider({ children }: { children: ReactNode }) {
  const navigate = useAppNavigate();
  const location = useAppLocation();
  const [searchParams, setSearchParams] = useAppSearchParams();
  const searchKey = location.search;
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

  // The URL owns the filters on home/listings, so adopt it during render: an effect
  // would render one frame with the previous filters and refetch twice.
  const urlSyncKey = isListingsContextPath ? searchKey : null;
  const [syncedUrlKey, setSyncedUrlKey] = useState(urlSyncKey);
  if (urlSyncKey !== null && syncedUrlKey !== urlSyncKey) {
    setSyncedUrlKey(urlSyncKey);
    const fromUrl = searchParamsToFilters(
      new URLSearchParams(urlSyncKey.startsWith('?') ? urlSyncKey.slice(1) : urlSyncKey)
    );
    setFilters((prev) => (filtersEqual(prev, fromUrl) ? prev : fromUrl));
  }

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

        // Hero / advanced search always lands on the dedicated listings route.
        if (isListingsPath(location.pathname)) {
          syncUrl(next);
        } else {
          const params = filtersToSearchParams(next);
          const search = params.toString();
          navigate({
            pathname: '/listings',
            ...(search ? { search: `?${search}` } : {}),
          });
        }
        return next;
      });
    },
    [location.pathname, navigate, syncUrl]
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
      setSearchParams(new URLSearchParams(), { replace: true });
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
    <ListingFiltersContext.Provider value={value}>{children}</ListingFiltersContext.Provider>
  );
}
