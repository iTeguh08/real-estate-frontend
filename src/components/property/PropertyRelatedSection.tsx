import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PropertyCard } from '@/components/cards/PropertyCard';
import { PropertyDetailDialog } from '@/components/cards/PropertyDetailDialog';
import { SectionAtmosphere } from '@/components/decor/SectionAtmosphere';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';
import { routes } from '@/lib/routes';
import type { Property } from '@/types';

export interface PropertyRelatedSectionProps {
  properties: Property[];
  currentPropertyId: string;
}

export function PropertyRelatedSection({
  properties,
  currentPropertyId,
}: PropertyRelatedSectionProps) {
  const { theme } = useTheme();
  const isNavy = theme === 'navy';
  const related = properties.filter((p) => p.id !== currentPropertyId).slice(0, 3);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  if (related.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="related-properties-heading"
      className="relative grid grid-cols-1 bg-hz-elevated"
    >
      <SectionAtmosphere
        tone={isNavy ? 'dark' : 'light'}
        lightGlow="white"
        washStyle="gradient"
        surface="elevated"
        intensity="quiet"
        variant="dual"
        side="left"
        image={isNavy ? 'interior-dark' : 'related-plants'}
        photoOpacity={isNavy ? 0.36 : 0.2}
        photoScrimMix={isNavy ? 58 : 62}
        photoFade="exit-soft"
        className="max-md:hidden"
      />
      <div className="section-container relative z-10 col-start-1 row-start-1 pt-20 pb-16 md:pt-24 md:pb-20">
        <div className="mb-12 flex flex-col items-center justify-center text-center">
          <div className="max-w-3xl">
            <p className="mb-2 font-poppins text-[11px] font-semibold uppercase tracking-[2px] text-hz-primary">
              You May Also Like
            </p>
            <h2
              id="related-properties-heading"
              className="font-poppins text-[30px] font-semibold leading-[1.2] tracking-[-0.3px] text-hz-dark md:text-[36px]"
            >
              Related Properties
            </h2>
          </div>
        </div>

        <div
          className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
          aria-label="Related property listings"
        >
          {related.map((property) => (
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
