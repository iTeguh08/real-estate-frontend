import { cn } from '@/lib/utils';
import type { Location } from '@/types';

const WIDE_LOCATIONS: Location[] = [
  {
    id: 'l5',
    city: 'Maldives',
    country: 'South Asia',
    propertiesCount: 94,
    imageUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&auto=format&fit=crop&q=80',
    tagline: 'Overwater villas and private island residences along crystal lagoons.',
  },
  {
    id: 'l6',
    city: 'Swiss Alps',
    country: 'Switzerland',
    propertiesCount: 131,
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&auto=format&fit=crop&q=80',
    tagline: 'Alpine chalets with panoramic peaks — ski-in retreats and year-round luxury.',
  },
];

const SQUARE_LOCATIONS: Location[] = [
  {
    id: 'l1',
    city: 'Cape Town',
    country: 'South Africa',
    propertiesCount: 324,
    imageUrl: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'l2',
    city: 'Bali',
    country: 'Indonesia',
    propertiesCount: 218,
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'l3',
    city: 'Lisbon',
    country: 'Portugal',
    propertiesCount: 156,
    imageUrl: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'l4',
    city: 'Dubai',
    country: 'United Arab Emirates',
    propertiesCount: 287,
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop&q=80',
  },
];

type LocationCardVariant = 'square' | 'wide';

interface LocationCardProps {
  location: Location;
  variant: LocationCardVariant;
}

function LocationCard({ location, variant }: LocationCardProps) {
  const isWide = variant === 'wide';
  const label = `${location.city}, ${location.country}`;

  return (
    <a
      href="#location"
      className="group block cursor-pointer"
      aria-label={`${label} — ${location.propertiesCount} listings`}
    >
      <div
        className={cn(
          'relative overflow-hidden rounded-[3px] bg-hz-bg-soft',
          isWide ? 'aspect-[2/1]' : 'aspect-square'
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
    </a>
  );
}

interface LocationSectionProps {
  wideLocations?: Location[];
  squareLocations?: Location[];
}

export function LocationSection({
  wideLocations = WIDE_LOCATIONS,
  squareLocations = SQUARE_LOCATIONS,
}: LocationSectionProps) {
  return (
    <section
      id="location"
      className="w-full bg-white py-16 md:py-20"
      aria-labelledby="locations-heading"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-10">

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

        <div
          className="grid grid-cols-2 gap-3 lg:grid-cols-4"
          role="list"
          aria-label="Available locations"
        >
          {wideLocations.map((location) => (
            <div key={location.id} className="col-span-2" role="listitem">
              <LocationCard location={location} variant="wide" />
            </div>
          ))}
          {squareLocations.map((location) => (
            <div key={location.id} role="listitem">
              <LocationCard location={location} variant="square" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
