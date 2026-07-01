import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { SQUARE_LOCATIONS, WIDE_LOCATIONS } from '@/data/locations';
import { routes } from '@/lib/routes';
import type { Location } from '@/types';

type LocationCardVariant = 'square' | 'wide';

const LOCATION_IMAGE_HEIGHT =
  'h-[calc((100cqw-0.75rem)/2)] lg:h-[calc((100cqw-2.25rem)/4)]';

interface LocationCardProps {
  location: Location;
  variant: LocationCardVariant;
}

function LocationCard({ location }: LocationCardProps) {
  const label = `${location.city}, ${location.country}`;

  return (
    <Link
      to={{ pathname: routes.home, hash: '#listings' }}
      className="group block cursor-pointer no-underline"
      aria-label={`${label} — explore listings`}
    >
      <div
        className={cn(
          'relative overflow-hidden rounded-hz bg-hz-bg-soft',
          LOCATION_IMAGE_HEIGHT
        )}
      >
        <img
          src={location.imageUrl}
          alt={label}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
        />
      </div>

      <div className="mt-4 space-y-1.5">
        <p className="font-poppins text-lg font-semibold leading-snug text-hz-dark transition-colors duration-200 group-hover:text-hz-primary md:text-xl">
          {label}
        </p>
        <p className="font-poppins text-[13px] text-hz-muted">
          {location.propertiesCount.toLocaleString()} listings
        </p>
      </div>
    </Link>
  );
}

interface LocationSectionProps {
  wideLocations?: Location[];
  squareLocations?: Location[];
}

function buildLocationRows(wideLocations: Location[], squareLocations: Location[]) {
  const squaresPerRow = 2;

  return wideLocations.map((wide, index) => ({
    wide,
    squares: squareLocations.slice(index * squaresPerRow, index * squaresPerRow + squaresPerRow),
  }));
}

const ROWS_PER_SLIDE = 2;

function buildLocationSlides(wideLocations: Location[], squareLocations: Location[]) {
  const rows = buildLocationRows(wideLocations, squareLocations);
  const slides: ReturnType<typeof buildLocationRows>[] = [];

  for (let index = 0; index < rows.length; index += ROWS_PER_SLIDE) {
    slides.push(rows.slice(index, index + ROWS_PER_SLIDE));
  }

  return slides;
}

function LocationRow({ row }: { row: ReturnType<typeof buildLocationRows>[number] }) {
  return (
    <div className="@container grid grid-cols-2 gap-3 lg:grid-cols-4" role="presentation">
      <div className="col-span-2" role="listitem">
        <LocationCard location={row.wide} variant="wide" />
      </div>
      {row.squares.map((location) => (
        <div key={location.id} role="listitem">
          <LocationCard location={location} variant="square" />
        </div>
      ))}
    </div>
  );
}

export function LocationSection({
  wideLocations = WIDE_LOCATIONS,
  squareLocations = SQUARE_LOCATIONS,
}: LocationSectionProps) {
  const locationSlides = buildLocationSlides(wideLocations, squareLocations);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = locationSlides[activeIndex];

  if (!activeSlide) {
    return null;
  }

  return (
    <section
      id="location"
      className="w-full bg-white py-16 md:py-20"
      aria-labelledby="locations-heading"
    >
      <div className="section-container">
        <div className="mb-12 flex flex-col items-center text-center">
          <p className="mb-2 font-poppins text-[11px] font-semibold uppercase tracking-[2px] text-hz-primary">
            Explore Areas
          </p>
          <h2
            id="locations-heading"
            className="font-poppins text-[30px] font-semibold leading-[1.2] tracking-[-0.3px] text-hz-dark md:text-[36px]"
          >
            Our Location For You
          </h2>
        </div>

        <div role="list" aria-label="Available locations">
          <div className="flex flex-col gap-9">
            {activeSlide.map((row) => (
              <LocationRow key={row.wide.id} row={row} />
            ))}
          </div>
        </div>

        {locationSlides.length > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            {locationSlides.map((slide, index) => (
              <button
                key={slide[0]?.wide.id ?? index}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to location slide ${index + 1}`}
                aria-current={activeIndex === index ? 'true' : undefined}
                className={cn(
                  'h-2 w-2 rounded-full transition-colors duration-200',
                  activeIndex === index
                    ? 'bg-hz-primary'
                    : 'bg-hz-border hover:bg-hz-muted'
                )}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
