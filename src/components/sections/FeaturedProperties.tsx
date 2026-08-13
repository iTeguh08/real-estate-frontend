import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PropertyCard } from '@/components/cards/PropertyCard';
import { PropertyDetailDialog } from '@/components/cards/PropertyDetailDialog';
import { ListingSortSelect } from '@/components/search/ListingSortSelect';
import { SearchIntentBanner } from '@/components/search/SearchIntentBanner';
import { SectionAtmosphere } from '@/components/decor/SectionAtmosphere';
import { cn } from '@/lib/utils';
import { hasSearchIntent } from '@/lib/search-intent';
import { routes } from '@/lib/routes';
import { useSiteConfig } from '@/hooks/useSiteConfig';
import { useTheme } from '@/hooks/useTheme';
import { usePropertySearchQuery } from '@/hooks/queries';
import { useListingFilters } from '@/hooks/useListingFilters';
import { PropertyCardSkeleton } from '@/components/skeletons';
import type { Property } from '@/types';

interface FeaturedPropertiesProps {
  properties?: Property[];
}

export function FeaturedProperties({ properties: propertiesProp }: FeaturedPropertiesProps) {
  const { filters, clearFilters, setSort, setPage } = useListingFilters();
  const { data: siteConfig } = useSiteConfig();
  const { theme } = useTheme();
  const isNavy = theme === 'navy';
  const brand = siteConfig?.brand ?? 'Homzen';
  const {
    data: searchResult,
    isLoading,
    isFetching,
    error: queryError,
  } = usePropertySearchQuery(filters);
  const properties = propertiesProp ?? searchResult?.items ?? [];
  const total = searchResult?.total ?? properties.length;
  const page = searchResult?.page ?? filters.page;
  const lastPage = searchResult?.lastPage ?? 1;
  const showResultCount = !isLoading && total > 0;
  const isRefining = isFetching && !isLoading;

  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  return (
    <section
      id="listings"
      className="relative grid scroll-mt-[var(--header-anchor-offset,5.5rem)] grid-cols-1 bg-hz-elevated"
      aria-labelledby="featured-properties-heading"
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
      <div className="section-container relative z-10 col-start-1 row-start-1 py-16 md:py-20">
        <div className="mb-8 flex flex-col items-center justify-center text-center md:mb-12">
          <div className="max-w-3xl">
            <p className="mb-2 font-poppins text-[11px] font-semibold uppercase tracking-[2px] text-hz-primary">
              Featured Listings
            </p>
            <h2
              id="featured-properties-heading"
              className="font-poppins hz-h2 font-semibold leading-[1.2] tracking-[-0.3px] text-hz-dark"
            >
              Discover {brand}&apos;s Finest Properties
              <br className="hidden sm:inline" />
              For Your Dream Home
            </h2>
          </div>
        </div>

        <SearchIntentBanner intent={filters} onClear={clearFilters} />

        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          {showResultCount ? (
            <p className="font-poppins text-sm text-hz-muted" aria-live="polite">
              {total} {total === 1 ? 'listing' : 'listings'}
              {lastPage > 1 ? ` · page ${page} of ${lastPage}` : ''}
              {isRefining ? ' · updating…' : ''}
            </p>
          ) : (
            <span aria-hidden="true" />
          )}
          <ListingSortSelect value={filters.sort} onChange={setSort} />
        </div>

        {queryError && (
          <p className="mb-6 text-center font-poppins text-sm text-hz-primary" role="alert">
            {queryError.message}
          </p>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <PropertyCardSkeleton key={i} />
            ))}
          </div>
        ) : properties.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-hz border border-hz-border bg-hz-sunken px-6 py-16 text-center">
            <p className="font-poppins text-lg font-semibold text-hz-dark">
              {hasSearchIntent(filters) ? 'No listings match your search' : 'No listings available right now'}
            </p>
            <p className="mt-2 max-w-md font-poppins hz-paragraph-sm text-hz-muted">
              {hasSearchIntent(filters)
                ? 'Try adjusting your filters or clearing the search to see more properties.'
                : 'Check back soon — new properties are added regularly.'}
            </p>
            {hasSearchIntent(filters) && (
              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 rounded-hz border border-hz-border bg-hz-elevated px-5 py-2 font-poppins text-sm font-medium text-hz-dark transition-colors duration-200 hover:border-hz-primary hover:text-hz-primary"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div
            className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4"
            role="list"
            aria-label="Featured property listings"
          >
            {properties.map((property, index) => (
              <div key={property.id} role="listitem" className="h-full">
                <PropertyCard
                  property={property}
                  variant="grid"
                  size="full"
                  uniformHeight
                  onSelect={setSelectedProperty}
                  className="rounded-hz"
                  imageLoadPriority={
                    index === 0 ? 'high' : index < 8 ? 'low' : 'auto'
                  }
                />
              </div>
            ))}
          </div>
        )}

        {lastPage > 1 && !isLoading && properties.length > 0 && (
          <nav
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
            aria-label="Listings pagination"
          >
            <button
              type="button"
              disabled={page <= 1 || isRefining}
              onClick={() => setPage(page - 1)}
              className="rounded-hz border border-hz-border bg-hz-elevated px-4 py-2 font-poppins text-sm font-medium text-hz-dark transition-colors duration-200 hover:border-hz-primary hover:text-hz-primary disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>
            <span className="font-poppins text-sm text-hz-muted">
              Page {page} of {lastPage}
            </span>
            <button
              type="button"
              disabled={page >= lastPage || isRefining}
              onClick={() => setPage(page + 1)}
              className="rounded-hz border border-hz-border bg-hz-elevated px-4 py-2 font-poppins text-sm font-medium text-hz-dark transition-colors duration-200 hover:border-hz-primary hover:text-hz-primary disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </nav>
        )}

        <PropertyDetailDialog
          property={selectedProperty}
          open={selectedProperty !== null}
          onOpenChange={(open) => {
            if (!open) setSelectedProperty(null);
          }}
        />

        <div className="mt-12 flex justify-center">
          <Link
            to={routes.listings}
            className={cn(
              'inline-flex items-center justify-center gap-2',
              'rounded-hz border-none bg-hz-primary px-8 py-3',
              'font-poppins text-sm font-semibold text-white no-underline outline-none',
              'transition-colors duration-200 hover:bg-hz-primary-hover'
            )}
            aria-label="Browse all listings"
          >
            Browse All Listings
          </Link>
        </div>
      </div>
    </section>
  );
}
