import { useState } from 'react';
import { PropertyCard } from '@/components/cards/PropertyCard';
import { PropertyDetailDialog } from '@/components/cards/PropertyDetailDialog';
import { SearchIntentBanner } from '@/components/search/SearchIntentBanner';
import { cn } from '@/lib/utils';
import { SITE_CONFIG } from '@/data/site-config';
import { usePropertySearchQuery } from '@/hooks/queries';
import { useListingFilters } from '@/hooks/useListingFilters';
import { hasSearchIntent } from '@/lib/search-intent';
import type { Property } from '@/types';

function PropertyCardSkeleton() {
  return (
    <div className="h-full animate-pulse rounded-hz border border-hz-border bg-white">
      <div className="aspect-[16/10] bg-hz-bg-soft" />
      <div className="space-y-3 p-4">
        <div className="h-4 w-3/4 rounded-hz bg-hz-bg-soft" />
        <div className="h-3 w-1/2 rounded-hz bg-hz-bg-soft" />
        <div className="h-3 w-full rounded-hz bg-hz-bg-soft" />
      </div>
    </div>
  );
}

interface FeaturedPropertiesProps {
  properties?: Property[];
}

export function FeaturedProperties({ properties: propertiesProp }: FeaturedPropertiesProps) {
  const { filters, clearFilters } = useListingFilters();
  const { data: fetchedProperties = [], isLoading, error: queryError } = usePropertySearchQuery(
    filters
  );
  const properties = propertiesProp ?? fetchedProperties;
  const searchActive = hasSearchIntent(filters);

  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  return (
    <section
      id="listings"
      className="w-full bg-white py-16 md:py-20"
      aria-labelledby="featured-properties-heading"
    >
      <div className="section-container">
        <div className="mb-12 flex flex-col items-center justify-center text-center">
          <div className="max-w-3xl">
            <p className="mb-2 font-poppins text-[11px] font-semibold uppercase tracking-[2px] text-hz-primary">
              Featured Listings
            </p>
            <h2
              id="featured-properties-heading"
              className="font-poppins text-[30px] font-semibold leading-[1.2] tracking-[-0.3px] text-hz-dark md:text-[36px]"
            >
              Discover {SITE_CONFIG.brand}&apos;s Finest Properties
              <br className="hidden sm:inline" />
              For Your Dream Home
            </h2>
          </div>
        </div>

        <SearchIntentBanner intent={filters} onClear={clearFilters} />

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
          <div className="flex flex-col items-center justify-center rounded-hz border border-hz-border bg-[#F8F8F8] px-6 py-16 text-center">
            <p className="font-poppins text-lg font-semibold text-hz-dark">
              No listings available right now
            </p>
            <p className="mt-2 max-w-md font-poppins text-sm text-hz-muted">
              Check back soon — new properties are added regularly.
            </p>
          </div>
        ) : (
          <div
            className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4"
            role="list"
            aria-label="Featured property listings"
          >
            {properties.map((property) => (
              <div key={property.id} role="listitem" className="h-full">
                <PropertyCard
                  property={property}
                  variant="grid"
                  size="full"
                  uniformHeight
                  onSelect={setSelectedProperty}
                  className="rounded-hz"
                />
              </div>
            ))}
          </div>
        )}

        <PropertyDetailDialog
          property={selectedProperty}
          open={selectedProperty !== null}
          onOpenChange={(open) => {
            if (!open) setSelectedProperty(null);
          }}
        />

        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={clearFilters}
            className={cn(
              'inline-flex items-center justify-center gap-2',
              'rounded-hz border-none bg-hz-primary px-8 py-3',
              'font-poppins text-sm font-semibold text-white outline-none',
              'transition-colors duration-200 hover:bg-hz-primary-hover'
            )}
            aria-label={
              searchActive ? 'Clear search and browse all properties' : 'Browse all properties'
            }
          >
            {searchActive ? 'Clear Search' : 'Browse All Listings'}
          </button>
        </div>
      </div>
    </section>
  );
}
