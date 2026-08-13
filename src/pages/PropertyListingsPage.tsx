import { useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ChevronDown, ChevronLeft, ChevronRight, Grid2X2, List, MapPin, SlidersHorizontal } from 'lucide-react';
import { BestValuePropertyCard } from '@/components/cards/BestValuePropertyCard';
import { PropertyCard } from '@/components/cards/PropertyCard';
import { PropertyDetailDialog } from '@/components/cards/PropertyDetailDialog';
import { SectionAtmosphere } from '@/components/decor/SectionAtmosphere';
import { BestValueCardSkeleton, PropertyCardSkeleton } from '@/components/skeletons';
import { MediaImage } from '@/components/ui/media-image';
import { Slider } from '@/components/ui/slider';
import { useAdvancedSearch } from '@/hooks/useAdvancedSearch';
import { useListingsAsideStickyTop } from '@/hooks/useListingsAsideStickyTop';
import { useTheme } from '@/hooks/useTheme';
import {
  useBestValuePropertiesQuery,
  useFeaturedPropertiesQuery,
  usePropertySearchQuery,
} from '@/hooks/queries';
import { TYPE_SELECT_OPTIONS } from '@/data/property-types';
import { formatPerSqftPrice } from '@/lib/format-property';
import { productThumbUrl } from '@/lib/image-url';
import { filtersToSearchParams, searchParamsToFilters } from '@/lib/listing-filter-params';
import { routes } from '@/lib/routes';
import { cn } from '@/lib/utils';
import type { ListingFilters, Property, PropertySort, PropertyStatus, PropertyType, PropertyWithAgent } from '@/types';

const PER_PAGE_OPTIONS = [10, 12, 16] as const;
const SORT_OPTIONS: Array<{ value: PropertySort | ''; label: string }> = [
  { value: '', label: 'Sort by (Default)' },
  { value: 'FEATURED', label: 'Featured first' },
  { value: 'NEWEST', label: 'Newest' },
  { value: 'PRICE_ASC', label: 'Price: Low to High' },
  { value: 'PRICE_DESC', label: 'Price: High to Low' },
];

const TYPE_OPTIONS = TYPE_SELECT_OPTIONS;

const BED_OPTIONS = ['', '1', '2', '3', '4', '5+'] as const;
const LISTINGS_PRICE_MIN = 0;
const LISTINGS_PRICE_MAX = 24000;

function parseListingPrice(value: string, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function formatListingPrice(value: number) {
  return `${value}$`;
}

function clampListingPrice(value: number) {
  return Math.min(LISTINGS_PRICE_MAX, Math.max(LISTINGS_PRICE_MIN, value));
}

/** Sidebar reset target — plain /listings defaults to For Rent; preserve agent scope. */
function getListingsResetFilters(filters: ListingFilters): ListingFilters {
  return {
    keyword: '',
    location: '',
    propertyType: '',
    status: 'For Rent',
    beds: '',
    minPrice: '',
    maxPrice: '',
    agentSlug: filters.agentSlug,
    sort: '',
    page: 1,
    perPage: filters.perPage,
  };
}

function hasSidebarFiltersActive(filters: ListingFilters): boolean {
  if (
    filters.keyword ||
    filters.location ||
    filters.propertyType ||
    filters.beds ||
    filters.minPrice ||
    filters.maxPrice ||
    filters.sort
  ) {
    return true;
  }
  return filters.status !== 'For Rent' || filters.page > 1;
}

/** Mobile Filters badge — ignore default For Rent on plain /listings. */
function hasListingsMobileFiltersActive(filters: ListingFilters): boolean {
  if (
    filters.keyword ||
    filters.location ||
    filters.propertyType ||
    filters.beds ||
    filters.minPrice ||
    filters.maxPrice
  ) {
    return true;
  }
  return Boolean(filters.status && filters.status !== 'For Rent');
}

function SidebarRecentProperty({ property }: { property: Property }) {
  return (
    <Link
      to={routes.property(property.slug)}
      className="flex items-center gap-3 rounded-hz p-2 no-underline transition-colors hover:bg-hz-sunken"
    >
      <div className="relative h-[74px] w-[74px] shrink-0 overflow-hidden rounded-hz">
        <MediaImage
          mediaUrl={productThumbUrl(property.imageUrl)}
          fitCover
          coverEstimate={{ width: 74, height: 74 }}
          coverMaxWidth={192}
          alt={property.title}
          decoding="async"
          loading="lazy"
          className="object-cover"
        />
      </div>
      <div className="min-w-0">
        <p className="line-clamp-2 font-poppins text-[14px] font-semibold leading-snug text-hz-ink">
          {property.title}
        </p>
        <p className="mt-1 font-poppins text-[12px] text-hz-muted">
          Bed {property.specs.beds} &nbsp; Bath {property.specs.baths} &nbsp; {property.specs.sqft} SqFT
        </p>
        <p className="mt-1 font-poppins text-[13px] font-semibold text-hz-ink">{formatPerSqftPrice(property)}</p>
      </div>
    </Link>
  );
}

function SelectField({
  className,
  wrapperClassName,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { wrapperClassName?: string }) {
  return (
    <div className={cn('relative min-w-0', wrapperClassName)}>
      <select
        {...props}
        className={cn(
          'h-11 w-full cursor-pointer appearance-none rounded-hz border border-hz-border bg-hz-elevated px-3 pr-12 font-poppins text-[13px] text-hz-dark outline-none focus:border-hz-primary/50',
          className
        )}
      >
        {children}
      </select>
      <ChevronDown
        size={18}
        strokeWidth={2}
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-hz-ink"
        aria-hidden="true"
      />
    </div>
  );
}

export function PropertyListingsPage() {
  const { theme } = useTheme();
  const isNavy = theme === 'navy';
  const asideRef = useRef<HTMLElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [gridColumns, setGridColumns] = useState<1 | 2 | 3>(3);
  const { setOpen: setAdvancedSearchOpen } = useAdvancedSearch();

  const filters = useMemo(
    () => {
      const parsed = searchParamsToFilters(searchParams);
      // Location browse (e.g. Explore Areas) keeps all statuses; plain /listings defaults to For Rent.
      const status = parsed.status
        || (parsed.location ? '' : 'For Rent');
      return {
        ...parsed,
        status: status as PropertyStatus | '',
        perPage: searchParams.get('perPage') ? parsed.perPage : 10,
      };
    },
    [searchParams],
  );

  const { data: searchResult, isLoading, isFetching, error } = usePropertySearchQuery(filters);
  const { data: featuredSidebar = [] } = useFeaturedPropertiesQuery();
  const { data: bestValue = [] } = useBestValuePropertiesQuery();
  const properties = searchResult?.items ?? [];
  const page = searchResult?.page ?? filters.page;
  const lastPage = searchResult?.lastPage ?? 1;
  const total = searchResult?.total ?? 0;
  const asideStickyTop = useListingsAsideStickyTop(
    asideRef,
    `${properties.length}-${featuredSidebar.length}-${isLoading}`,
  );
  const activeStatus = filters.status;
  const minPriceValue = parseListingPrice(filters.minPrice, LISTINGS_PRICE_MIN);
  const maxPriceValue = parseListingPrice(filters.maxPrice, LISTINGS_PRICE_MAX);
  const sliderMin = Math.min(minPriceValue, maxPriceValue);
  const sliderMax = Math.max(minPriceValue, maxPriceValue);
  const filtersActive = hasListingsMobileFiltersActive(filters);
  const sidebarFiltersActive = hasSidebarFiltersActive(filters);
  const listingGridClass =
    gridColumns === 1
      ? 'grid grid-cols-1 gap-5'
      : gridColumns === 2
        ? 'grid grid-cols-1 gap-5 md:grid-cols-2'
        : 'grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3';

  const recentProperties = featuredSidebar.slice(0, 4);
  const agentFallbacks = bestValue.map((property) => property.agent);
  const oneColumnProperties = useMemo<PropertyWithAgent[]>(
    () =>
      properties.map((property, index) => ({
        ...property,
        agent:
          agentFallbacks[index % Math.max(agentFallbacks.length, 1)] ??
          bestValue[0]?.agent ?? {
            id: 'agent-fallback',
            name: 'Homzen Agent',
            avatarUrl: property.imageUrl,
          },
      })),
    [agentFallbacks, bestValue, properties]
  );

  const updateFilters = (partial: Partial<ListingFilters>) => {
    const next: ListingFilters = {
      ...filters,
      ...partial,
    };

    if (partial.page === undefined && (
      partial.keyword !== undefined ||
      partial.location !== undefined ||
      partial.propertyType !== undefined ||
      partial.status !== undefined ||
      partial.beds !== undefined ||
      partial.minPrice !== undefined ||
      partial.maxPrice !== undefined ||
      partial.sort !== undefined ||
      partial.perPage !== undefined
    )) {
      next.page = 1;
    }

    setSearchParams(filtersToSearchParams(next), { replace: true });
  };

  const resetFilters = () => {
    setSearchParams(filtersToSearchParams(getListingsResetFilters(filters)), { replace: true });
  };

  return (
    <main
      id="main-content"
      className="relative z-[1] grid grid-cols-1 bg-hz-elevated"
    >
      <SectionAtmosphere
        tone={isNavy ? 'dark' : 'light'}
        lightGlow="white"
        washStyle={isNavy ? 'pattern' : 'gradient'}
        surface="elevated"
        intensity="quiet"
        variant="dual"
        side="left"
        image={isNavy ? 'none' : 'location-edge'}
        photoOpacity={0.4}
        photoScrimMix={62}
        photoFade="exit-soft"
        stickyViewport
        className="max-md:hidden"
      />
      <div className="section-container relative z-10 col-start-1 row-start-1 py-8 md:py-12 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[290px_minmax(0,1fr)] xl:grid-cols-[320px_minmax(0,1fr)]">
          <aside
            ref={asideRef}
            className="hidden flex-col gap-6 lg:flex lg:sticky lg:z-20 lg:self-start"
            style={asideStickyTop !== undefined ? { top: asideStickyTop } : undefined}
          >
            <section
              className={cn(
                'rounded-hz p-5 shadow-hz-sm',
                isNavy
                  ? 'bg-hz-listings-sidebar ring-1 ring-hz-line/45'
                  : 'bg-hz-listings-sidebar/75 ring-1 ring-hz-listings-sidebar/30'
              )}
            >
              <h2 className="mb-5 font-poppins text-[18px] font-semibold text-hz-ink">Search</h2>

              <div className="mb-4 grid grid-cols-2 overflow-hidden rounded-hz border border-hz-border bg-hz-elevated">
                {(['For Rent', 'For Sale'] as const).map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => updateFilters({ status, page: 1 })}
                    className={cn(
                      'cursor-pointer px-4 py-3 font-poppins text-[12px] font-semibold uppercase tracking-[0.04em] transition-colors',
                      activeStatus === status
                        ? 'bg-hz-primary text-white'
                        : 'bg-hz-elevated text-hz-body hover:bg-hz-sunken'
                    )}
                  >
                    {status}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block font-poppins text-[12px] font-medium text-hz-ink">
                    Keyword
                  </label>
                  <input
                    value={filters.keyword}
                    onChange={(event) => updateFilters({ keyword: event.target.value })}
                    placeholder="Search Keyword"
                    className="h-11 w-full rounded-hz border border-hz-border bg-hz-elevated px-3 font-poppins text-[13px] outline-none placeholder:text-hz-muted focus:border-hz-primary/50"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block font-poppins text-[12px] font-medium text-hz-ink">
                    Location
                  </label>
                  <div className="relative">
                    <input
                      value={filters.location}
                      onChange={(event) => updateFilters({ location: event.target.value })}
                      placeholder="Search Location"
                      className="h-11 w-full rounded-hz border border-hz-border bg-hz-elevated px-3 pr-10 font-poppins text-[13px] outline-none placeholder:text-hz-muted focus:border-hz-primary/50"
                    />
                    <MapPin size={15} strokeWidth={1.7} className="absolute right-3 top-1/2 -translate-y-1/2 text-hz-muted" />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block font-poppins text-[12px] font-medium text-hz-ink">
                    Type
                  </label>
                  <SelectField
                    value={filters.propertyType}
                    onChange={(event) => updateFilters({ propertyType: event.target.value as PropertyType | '' })}
                  >
                    {TYPE_OPTIONS.map((option) => (
                      <option key={option.label} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </SelectField>
                </div>

                <div>
                  <label className="mb-1.5 block font-poppins text-[12px] font-medium text-hz-ink">
                    Rooms
                  </label>
                  <SelectField
                    value={filters.beds}
                    onChange={(event) => updateFilters({ beds: event.target.value })}
                  >
                    {BED_OPTIONS.map((option) => (
                      <option key={option || 'all'} value={option}>
                        {option === '' ? 'All' : option}
                      </option>
                    ))}
                  </SelectField>
                </div>

                <div>
                  <label className="mb-1.5 block font-poppins text-[12px] font-medium text-hz-ink">
                    Bathrooms
                  </label>
                  <SelectField
                    disabled
                    className="text-hz-muted"
                  >
                    <option>All</option>
                  </SelectField>
                </div>

                <div>
                  <label className="mb-1.5 block font-poppins text-[12px] font-medium text-hz-ink">
                    Bedrooms
                  </label>
                  <SelectField
                    value={filters.beds}
                    onChange={(event) => updateFilters({ beds: event.target.value })}
                  >
                    {BED_OPTIONS.map((option) => (
                      <option key={option || 'all-beds'} value={option}>
                        {option === '' ? 'All' : option}
                      </option>
                    ))}
                  </SelectField>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between font-poppins text-[12px] font-medium text-hz-primary">
                    <span>{formatListingPrice(sliderMin)}</span>
                    <span>{formatListingPrice(sliderMax)}</span>
                  </div>
                  <div className="px-1 py-2">
                    <Slider
                      min={LISTINGS_PRICE_MIN}
                      max={LISTINGS_PRICE_MAX}
                      step={500}
                      value={[sliderMin, sliderMax]}
                      onValueChange={([nextMin, nextMax]) => {
                        updateFilters({
                          minPrice: String(clampListingPrice(nextMin)),
                          maxPrice: String(clampListingPrice(nextMax)),
                        });
                      }}
                      className="w-full"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Min"
                      inputMode="numeric"
                      value={sliderMin}
                      onChange={(event) => {
                        const digits = event.target.value.replace(/[^\d]/g, '');
                        const nextMin = digits === ''
                          ? LISTINGS_PRICE_MIN
                          : clampListingPrice(Math.min(Number(digits), sliderMax));
                        updateFilters({ minPrice: String(nextMin) });
                      }}
                      className="h-10 min-w-0 w-full rounded-hz border border-hz-border bg-hz-elevated px-3 font-poppins text-[13px] outline-none placeholder:text-hz-muted focus:border-hz-primary/50"
                    />
                    <input
                      type="text"
                      placeholder="Max"
                      inputMode="numeric"
                      value={sliderMax}
                      onChange={(event) => {
                        const digits = event.target.value.replace(/[^\d]/g, '');
                        const nextMax = digits === ''
                          ? LISTINGS_PRICE_MAX
                          : clampListingPrice(Math.max(Number(digits), sliderMin));
                        updateFilters({ maxPrice: String(nextMax) });
                      }}
                      className="h-10 min-w-0 w-full rounded-hz border border-hz-border bg-hz-elevated px-3 font-poppins text-[13px] outline-none placeholder:text-hz-muted focus:border-hz-primary/50"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setAdvancedSearchOpen(true)}
                  className="inline-flex cursor-pointer items-center gap-2 font-poppins text-[13px] font-medium text-hz-body transition-colors hover:text-hz-primary"
                >
                  <SlidersHorizontal size={16} strokeWidth={1.8} aria-hidden="true" />
                  Advanced
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={resetFilters}
                    disabled={!sidebarFiltersActive}
                    className={cn(
                      'h-11 cursor-pointer rounded-hz border border-hz-border bg-hz-elevated font-poppins text-[13px] font-semibold uppercase tracking-[0.04em] text-hz-ink transition-colors',
                      'hover:border-hz-primary hover:text-hz-primary disabled:cursor-not-allowed disabled:opacity-40'
                    )}
                  >
                    Reset
                  </button>
                  <button
                    type="button"
                    onClick={() => updateFilters({ page: 1 })}
                    className="h-11 cursor-pointer rounded-hz bg-hz-primary font-poppins text-[14px] font-semibold text-white transition-colors hover:bg-hz-primary-hover"
                  >
                    Find Properties
                  </button>
                </div>
              </div>
            </section>

            <section className="hidden rounded-hz bg-hz-sunken p-5 shadow-hz-sm lg:block">
              <h2 className="mb-4 font-poppins text-[17px] font-semibold text-hz-ink">Latest Properties</h2>
              <div className="space-y-2">
                {recentProperties.map((property) => (
                  <SidebarRecentProperty key={property.id} property={property} />
                ))}
              </div>
            </section>
          </aside>

          <section>
            {/* Mobile — stacked title, rent/sale toggle, filters + sort toolbar */}
            <div className="mb-6 space-y-4 lg:hidden">
              <div>
                <h1 className="font-poppins text-[26px] font-semibold leading-[1.15] tracking-[-0.3px] text-hz-ink">
                  Property listing
                </h1>
                {!isLoading && total > 0 ? (
                  <p className="mt-1.5 font-poppins text-sm text-hz-muted">
                    {total.toLocaleString()} {total === 1 ? 'listing' : 'listings'}
                  </p>
                ) : null}
              </div>

              <div className="grid grid-cols-2 overflow-hidden rounded-hz border border-hz-border bg-hz-elevated">
                {(['For Rent', 'For Sale'] as const).map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => updateFilters({ status, page: 1 })}
                    className={cn(
                      'cursor-pointer px-3 py-2.5 font-poppins text-[12px] font-semibold uppercase tracking-[0.04em] transition-colors',
                      activeStatus === status
                        ? 'bg-hz-primary text-white'
                        : 'bg-hz-elevated text-hz-body hover:bg-hz-sunken'
                    )}
                  >
                    {status}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAdvancedSearchOpen(true)}
                  className={cn(
                    'inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-hz border px-3 font-poppins text-[13px] font-semibold transition-colors',
                    filtersActive
                      ? 'border-hz-primary bg-hz-primary/10 text-hz-primary'
                      : 'border-hz-border bg-hz-elevated text-hz-ink hover:border-hz-primary/40 hover:text-hz-primary'
                  )}
                  aria-label="Open search filters"
                >
                  <SlidersHorizontal size={16} strokeWidth={1.85} aria-hidden="true" />
                  Filters
                </button>
                <SelectField
                  value={filters.sort}
                  onChange={(event) => updateFilters({ sort: event.target.value as PropertySort | '' })}
                  className="border-hz-border text-hz-body"
                  aria-label="Sort listings"
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.label} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </SelectField>
              </div>
            </div>

            {/* Desktop — title + grid/per-page/sort controls */}
            <div className="mb-6 hidden flex-col gap-4 lg:flex lg:flex-row lg:items-center lg:justify-between">
              <h1 className="font-poppins text-[32px] font-semibold text-hz-ink">
                Property listing
              </h1>
              <div className="ml-auto flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setGridColumns(1)}
                  className={cn(
                    'flex h-11 w-11 cursor-pointer items-center justify-center rounded-hz border bg-hz-elevated transition-colors',
                    gridColumns === 1
                      ? 'border-hz-primary text-hz-primary'
                      : 'border-hz-border text-hz-muted hover:border-hz-primary/40 hover:text-hz-primary'
                  )}
                  aria-label="Single column layout"
                  aria-pressed={gridColumns === 1}
                >
                  <List size={17} strokeWidth={1.85} />
                </button>

                <button
                  type="button"
                  onClick={() => setGridColumns(2)}
                  className={cn(
                    'flex h-11 w-11 cursor-pointer items-center justify-center rounded-hz border bg-hz-elevated transition-colors',
                    gridColumns === 2
                      ? 'border-hz-primary text-hz-primary'
                      : 'border-hz-border text-hz-muted hover:border-hz-primary/40 hover:text-hz-primary'
                  )}
                  aria-label="Two column grid layout"
                  aria-pressed={gridColumns === 2}
                >
                  <Grid2X2 size={17} strokeWidth={1.85} />
                </button>

                <button
                  type="button"
                  onClick={() => setGridColumns(3)}
                  className={cn(
                    'flex h-11 w-11 cursor-pointer items-center justify-center rounded-hz border bg-hz-elevated transition-colors',
                    gridColumns === 3
                      ? 'border-hz-primary text-hz-primary'
                      : 'border-hz-border text-hz-muted hover:border-hz-primary/40 hover:text-hz-primary'
                  )}
                  aria-label="Three column grid layout"
                  aria-pressed={gridColumns === 3}
                >
                  <div className="grid grid-cols-3 gap-[2px]">
                    {Array.from({ length: 9 }).map((_, index) => (
                      <span key={index} className="block h-[3px] w-[3px] rounded-[1px] bg-current" />
                    ))}
                  </div>
                </button>
                </div>

                <SelectField
                  value={String(filters.perPage)}
                  onChange={(event) => updateFilters({ perPage: Number(event.target.value), page: 1 })}
                  wrapperClassName="min-w-[130px]"
                  className="border-hz-border text-hz-body"
                >
                  {PER_PAGE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option} Per Page
                    </option>
                  ))}
                </SelectField>

                <SelectField
                  value={filters.sort}
                  onChange={(event) => updateFilters({ sort: event.target.value as PropertySort | '' })}
                  wrapperClassName="min-w-[170px]"
                  className="border-hz-border text-hz-body"
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.label} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </SelectField>
              </div>
            </div>

            {error && (
              <p className="mb-4 font-poppins text-sm text-hz-primary">{error.message}</p>
            )}

            {isLoading ? (
              <div className={listingGridClass}>
                {Array.from({ length: filters.perPage }).map((_, index) =>
                  gridColumns === 1 ? (
                    <BestValueCardSkeleton key={index} />
                  ) : (
                    <PropertyCardSkeleton key={index} />
                  )
                )}
              </div>
            ) : properties.length === 0 ? (
              <div className="rounded-hz border border-hz-border bg-hz-sunken px-6 py-20 text-center">
                <p className="font-poppins text-[22px] font-semibold text-hz-ink">No listings available right now</p>
                <p className="mt-2 font-poppins text-[14px] text-hz-muted">
                  Try adjusting your search filters and browse again.
                </p>
              </div>
            ) : (
              <>
                <div className={listingGridClass}>
                  {gridColumns === 1
                    ? oneColumnProperties.map((property) => (
                        <div key={property.id} className="h-full" role="listitem">
                          <BestValuePropertyCard
                            property={property}
                            outerBorderClassName="border-hz-border"
                            onSelect={setSelectedProperty}
                          />
                        </div>
                      ))
                    : properties.map((property) => (
                        <PropertyCard
                          key={property.id}
                          property={property}
                          variant="grid"
                          size="full"
                          uniformHeight
                          onSelect={setSelectedProperty}
                          className="rounded-hz"
                        />
                      ))}
                </div>

                <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
                  <p className="font-poppins text-[13px] text-hz-muted">
                    Showing {properties.length} of {total} listings{isFetching ? ' · updating...' : ''}
                  </p>

                  <nav className="flex items-center gap-2" aria-label="Listings pagination">
                    <button
                      type="button"
                      disabled={page <= 1}
                      onClick={() => updateFilters({ page: page - 1 })}
                      className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-hz border border-hz-border bg-hz-elevated text-hz-muted disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    {Array.from({ length: Math.min(lastPage, 3) }, (_, index) => {
                      const value = index + 1;
                      return (
                        <button
                          key={value}
                          type="button"
                          onClick={() => updateFilters({ page: value })}
                          className={cn(
                            'flex h-9 w-9 cursor-pointer items-center justify-center rounded-hz border font-poppins text-[13px] font-medium',
                            value === page
                              ? 'border-hz-primary bg-hz-primary text-white'
                              : 'border-hz-border bg-hz-elevated text-hz-muted'
                          )}
                        >
                          {value}
                        </button>
                      );
                    })}
                    <button
                      type="button"
                      disabled={page >= lastPage}
                      onClick={() => updateFilters({ page: page + 1 })}
                      className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-hz border border-hz-border bg-hz-elevated text-hz-muted disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </nav>
                </div>
              </>
            )}
          </section>
        </div>
      </div>

      <PropertyDetailDialog
        property={selectedProperty}
        open={selectedProperty !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedProperty(null);
        }}
      />
    </main>
  );
}
