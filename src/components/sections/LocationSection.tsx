import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { CarouselControls } from '@/components/ui/CarouselControls';
import { MediaImage } from '@/components/ui/media-image';
import { SectionAtmosphere } from '@/components/decor/SectionAtmosphere';
import { useDotCarousel } from '@/hooks/useDotCarousel';
import { useTheme } from '@/hooks/useTheme';
import { SQUARE_LOCATIONS, WIDE_LOCATIONS } from '@/data/locations';
import { useHomepageQuery } from '@/hooks/queries';
import { sizedImage } from '@/lib/image-url';
import { publicAsset } from '@/lib/public-asset';
import type { Location } from '@/types';

const LOCATION_PLANTS_BG = publicAsset('bg/bg-light-related-plants.webp');

/** Full-height plants photo — scoped to Location section only. */
function LocationSectionPlantsBg() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 max-md:hidden" aria-hidden="true">
      <MediaImage
        src={LOCATION_PLANTS_BG}
        alt=""
        loading="lazy"
        decoding="async"
        wrapperClassName="absolute inset-0"
        className="object-cover"
        style={{
          objectPosition: 'left bottom',
          opacity: 0.2,
          transform: 'scale(1.04)',
          transformOrigin: 'left bottom',
          WebkitMaskImage:
            'linear-gradient(to right, black 0%, black 64%, transparent 100%)',
          maskImage: 'linear-gradient(to right, black 0%, black 64%, transparent 100%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'color-mix(in srgb, var(--hz-page) 52%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, black 0%, black 46%, transparent 98%)',
          maskImage: 'linear-gradient(to right, black 0%, black 46%, transparent 98%)',
        }}
      />
    </div>
  );
}

type LocationCardVariant = 'square' | 'wide';

const LOCATION_IMAGE_HEIGHT =
  'h-[calc((100cqw-1.25rem)/2)] lg:h-[calc((100cqw-3.75rem)/4)]';

interface LocationCardProps {
  location: Location;
  variant: LocationCardVariant;
  lightSurface?: boolean;
}

function LocationCard({ location, variant, lightSurface = false }: LocationCardProps) {
  const label = `${location.city}, ${location.country}`;
  const locationQuery = location.city.trim();
  const displayWidth = variant === 'wide' ? 790 : 340;

  return (
    <Link
      to={`/listings?location=${encodeURIComponent(locationQuery)}`}
      className="group block cursor-pointer no-underline"
      aria-label={`${label} — explore listings`}
    >
      <div
        className={cn(
          'relative overflow-hidden rounded-hz',
          lightSurface
            ? 'bg-hz-elevated shadow-hz-sm ring-hz-border'
            : 'bg-hz-footer-fg/5 ring-hz-footer-fg/10',
          LOCATION_IMAGE_HEIGHT
        )}
      >
        <MediaImage
          src={sizedImage(location.imageUrl, displayWidth)}
          alt={label}
          loading="lazy"
          decoding="async"
          className="object-cover transition-transform duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
        />
        <div
          className={cn(
            'pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-80',
            lightSurface ? 'from-black/20' : 'from-hz-footer/35'
          )}
          aria-hidden="true"
        />
      </div>

      <div className="mt-4 space-y-1.5">
        <p
          className={cn(
            'font-poppins text-lg font-semibold leading-snug transition-colors duration-200 group-hover:text-hz-primary md:text-xl',
            lightSurface ? 'text-hz-ink' : 'text-hz-footer-fg'
          )}
        >
          {label}
        </p>
        <p
          className={cn(
            'font-poppins text-[13px]',
            lightSurface ? 'text-hz-muted' : 'text-hz-footer-fg/55'
          )}
        >
          {location.propertiesCount.toLocaleString()} listings
        </p>
      </div>
    </Link>
  );
}

interface LocationSectionProps {
  wideLocations?: Location[];
  squareLocations?: Location[];
  eyebrow?: string;
  title?: string;
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

function LocationRow({
  row,
  reverseOrder = false,
  lightSurface = false,
}: {
  row: ReturnType<typeof buildLocationRows>[number];
  reverseOrder?: boolean;
  lightSurface?: boolean;
}) {
  const wideCard = (
    <div className="col-span-2" role="listitem">
      <LocationCard location={row.wide} variant="wide" lightSurface={lightSurface} />
    </div>
  );

  const squareCards = row.squares.map((location) => (
    <div key={location.id} role="listitem">
      <LocationCard location={location} variant="square" lightSurface={lightSurface} />
    </div>
  ));

  return (
    <div className="@container grid grid-cols-2 gap-5 lg:grid-cols-4" role="presentation">
      {reverseOrder ? (
        <>
          {squareCards}
          {wideCard}
        </>
      ) : (
        <>
          {wideCard}
          {squareCards}
        </>
      )}
    </div>
  );
}

export function LocationSection({
  wideLocations: wideLocationsProp,
  squareLocations: squareLocationsProp,
  eyebrow: eyebrowProp,
  title: titleProp,
}: LocationSectionProps) {
  const { theme } = useTheme();
  const isNavy = theme === 'navy';
  const { data: homepage } = useHomepageQuery();
  const cmsLocations = homepage?.locations;

  const wideLocations: Location[] =
    wideLocationsProp ??
    cmsLocations?.wide.map((item) => ({
      id: item.id,
      city: item.city,
      country: item.country,
      propertiesCount: item.propertiesCount,
      imageUrl: item.imageUrl,
    })) ??
    WIDE_LOCATIONS;

  const squareLocations: Location[] =
    squareLocationsProp ??
    cmsLocations?.square.map((item) => ({
      id: item.id,
      city: item.city,
      country: item.country,
      propertiesCount: item.propertiesCount,
      imageUrl: item.imageUrl,
    })) ??
    SQUARE_LOCATIONS;

  const eyebrow = eyebrowProp ?? cmsLocations?.eyebrow ?? 'Explore Areas';
  const title = titleProp ?? cmsLocations?.title ?? 'Our Location For You';

  const locationSlides = buildLocationSlides(wideLocations, squareLocations);
  const { activeIndex, setActiveIndex, goPrev, goNext, swipeHandlers } = useDotCarousel(
    locationSlides.length
  );
  const activeSlide = locationSlides[activeIndex];

  if (!activeSlide) {
    return null;
  }

  return (
    <section
      id="location"
      className={cn(
        'section-defer relative w-full overflow-hidden py-16 md:py-20',
        isNavy ? 'bg-hz-footer' : 'bg-hz-page'
      )}
      aria-labelledby="locations-heading"
    >
      {isNavy ? (
        <SectionAtmosphere
          tone="dark"
          surface="footer"
          intensity="quiet"
          variant="dual"
          side="right"
          image="location-edge-dark"
          photoOpacity={0.42}
          photoFade="exit-soft"
          lightGlow="white"
          className="max-md:hidden"
        />
      ) : (
        <>
          <LocationSectionPlantsBg />
          <SectionAtmosphere
            tone="light"
            surface="page"
            intensity="quiet"
            variant="dual"
            side="left"
            image="none"
            lightGlow="white"
            photoFade="exit-soft"
            className="max-md:hidden"
          />
        </>
      )}
      <div className="section-container relative z-10">
        <div className="mb-12 flex flex-col items-center text-center">
          <p className="mb-2 font-poppins text-[11px] font-semibold uppercase tracking-[2px] text-hz-primary">
            {eyebrow}
          </p>
          <h2
            id="locations-heading"
            className={cn(
              'font-poppins text-[30px] font-semibold leading-[1.2] tracking-[-0.3px] md:text-[36px]',
              isNavy ? 'text-hz-footer-fg' : 'text-hz-ink'
            )}
          >
            {title}
          </h2>
        </div>

        <div
          role="list"
          aria-label="Available locations"
          className="touch-pan-y"
          {...swipeHandlers}
        >
          <div className="flex flex-col gap-9">
            {activeSlide.map((row, index) => (
              <LocationRow
                key={row.wide.id}
                row={row}
                reverseOrder={index === 1}
                lightSurface={!isNavy}
              />
            ))}
          </div>
        </div>

        <CarouselControls
          count={locationSlides.length}
          activeIndex={activeIndex}
          onSelect={setActiveIndex}
          onPrev={goPrev}
          onNext={goNext}
          itemLabel="location slide"
          tone={isNavy ? 'dark' : 'light'}
          className="mt-8"
        />
      </div>
    </section>
  );
}
