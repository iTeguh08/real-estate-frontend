import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BestValuePropertyCard } from '@/components/cards/BestValuePropertyCard';
import { PropertyDetailDialog } from '@/components/cards/PropertyDetailDialog';
import { SectionAtmosphere } from '@/components/decor/SectionAtmosphere';
import { cn } from '@/lib/utils';
import { routes } from '@/lib/routes';
import { useBestValuePropertiesQuery } from '@/hooks/queries';
import { useTheme } from '@/hooks/useTheme';
import type { PropertyWithAgent } from '@/types';

function BestValueCardSkeleton() {
  return (
    <div className="flex h-full animate-pulse overflow-hidden rounded-hz border border-hz-border bg-hz-elevated shadow-hz-sm">
      <div className="aspect-square w-[168px] shrink-0 bg-hz-bg-soft sm:w-[200px]" />
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="h-4 w-3/4 rounded-hz bg-hz-bg-soft" />
        <div className="h-3 w-1/2 rounded-hz bg-hz-bg-soft" />
        <div className="mt-auto h-4 w-1/3 rounded-hz bg-hz-bg-soft" />
      </div>
    </div>
  );
}

interface BestPropertyValueSectionProps {
  properties?: PropertyWithAgent[];
}

export function BestPropertyValueSection({
  properties: propertiesProp,
}: BestPropertyValueSectionProps) {
  const { theme } = useTheme();
  const isNavy = theme === 'navy';
  const { data: fetchedProperties = [], isLoading, error } = useBestValuePropertiesQuery();
  const properties = propertiesProp ?? fetchedProperties;
  const [selectedProperty, setSelectedProperty] = useState<PropertyWithAgent | null>(null);

  return (
    <section
      id="best-value"
      className="section-defer relative w-full overflow-hidden bg-hz-sunken pb-16 pt-16 md:pb-20 md:pt-20"
      aria-labelledby="best-value-heading"
    >
      {isNavy ? (
        <SectionAtmosphere
          tone="dark"
          surface="sunken"
          intensity="quiet"
          variant="edge"
          side="right"
          image="architecture"
          photoFade="exit-soft"
          photoOpacity={0.4}
        />
      ) : (
        <SectionAtmosphere
          tone="light"
          surface="sunken"
          intensity="strong"
          variant="dual"
          side="left"
          image="best-value"
          photoFade="balanced"
          photoOpacity={0.5}
          photoScrimMix={30}
        />
      )}
      <div className="section-container relative z-10">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 font-poppins text-[11px] font-semibold uppercase tracking-[2px] text-hz-primary">
              Top Picks
            </p>
            <h2
              id="best-value-heading"
              className="font-poppins text-[30px] font-semibold leading-[1.2] tracking-[-0.3px] text-hz-dark md:text-[36px]"
            >
              Best Property Value
            </h2>
          </div>

          <Link
            to={routes.listings}
            className={cn(
              'inline-flex shrink-0 items-center justify-center self-start sm:self-auto',
              'rounded-hz border-none bg-hz-primary px-6 py-2.5',
              'font-poppins text-[13px] font-semibold text-white no-underline outline-none',
              'transition-colors duration-200 hover:bg-hz-primary-hover'
            )}
            aria-label="View all best value properties"
          >
            View All
          </Link>
        </div>

        {error && (
          <p className="mb-6 font-poppins text-sm text-hz-primary" role="alert">
            {error.message}
          </p>
        )}

        {isLoading && !propertiesProp ? (
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <BestValueCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div
            className="grid grid-cols-1 items-stretch gap-3 lg:grid-cols-2"
            role="list"
            aria-label="Best property value listings"
          >
            {properties.map((property) => (
              <div key={property.id} className="h-full" role="listitem">
                <BestValuePropertyCard property={property} onSelect={setSelectedProperty} />
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
      </div>
    </section>
  );
}
