import { ArrowRight, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { section, luxuryButton, sectionEyebrow } from '@/lib/cva';
import type { Location } from '@/types';

const TOP_LOCATIONS: Location[] = [
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

const BOTTOM_LOCATIONS: Location[] = [
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

type LocationCardVariant = 'square' | 'wide';

interface LocationCardProps {
  location: Location;
  variant: LocationCardVariant;
}

function LocationCard({ location, variant }: LocationCardProps) {
  const isWide = variant === 'wide';

  return (
    <a
      href="#location"
      className="group relative block cursor-pointer overflow-hidden rounded-xl"
      aria-label={`${location.city}, ${location.country} — ${location.propertiesCount} properties`}
    >
      <div
        className={cn(
          'relative overflow-hidden',
          isWide ? 'aspect-[2/1]' : 'aspect-square'
        )}
      >
        <img
          src={location.imageUrl}
          alt={`${location.city} — ${location.country}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent"
          aria-hidden="true"
        />

        <div
          className={cn(
            'absolute inset-x-0 bottom-0 flex items-end justify-between gap-4',
            isWide ? 'p-5 sm:p-6' : 'p-4'
          )}
        >
          <div className="min-w-0">
            <p
              className={cn(
                'font-sans font-medium leading-tight text-white',
                isWide ? 'text-lg sm:text-xl' : 'text-sm'
              )}
            >
              {location.city}
            </p>
            <p className="mt-1 flex items-center gap-1 font-sans text-[11px] text-white/75 sm:text-xs">
              <MapPin size={11} strokeWidth={1.5} className="shrink-0" />
              {location.country}
            </p>
            {isWide && location.tagline && (
              <p className="mt-2 max-w-md font-sans text-xs leading-relaxed text-white/80 sm:text-sm">
                {location.tagline}
              </p>
            )}
          </div>
          <span className="shrink-0 rounded-full bg-white/15 px-2.5 py-1 font-sans text-[11px] text-white/85 backdrop-blur-sm">
            {location.propertiesCount} listings
          </span>
        </div>
      </div>
    </a>
  );
}

interface LocationSectionProps {
  topLocations?: Location[];
  bottomLocations?: Location[];
}

export function LocationSection({
  topLocations = TOP_LOCATIONS,
  bottomLocations = BOTTOM_LOCATIONS,
}: LocationSectionProps) {
  return (
    <section
      className={cn(section({ spacing: 'md', bg: 'cream' }))}
      aria-labelledby="locations-heading"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">

        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className={cn(sectionEyebrow(), 'mb-2')}>
              Explore Areas
            </p>
            <h2
              id="locations-heading"
              className="text-[clamp(1.8rem,3vw,2.8rem)] font-light leading-tight tracking-[-0.02em] text-luxury-dark"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Our Location For You
            </h2>
          </div>
          <Button
            variant="ghost"
            className={cn(luxuryButton({ variant: 'outline', size: 'md' }), 'shrink-0 gap-1.5')}
            aria-label="View all locations"
          >
            All Locations
            <ArrowRight size={14} strokeWidth={1.5} />
          </Button>
        </div>

        {/* 4-col grid: row 1 = four 1:1 squares · row 2 = two 2:1 wides */}
        <div
          className="grid grid-cols-2 gap-4 lg:grid-cols-4"
          role="list"
          aria-label="Available locations"
        >
          {topLocations.map((location) => (
            <div key={location.id} role="listitem">
              <LocationCard location={location} variant="square" />
            </div>
          ))}
          {bottomLocations.map((location) => (
            <div key={location.id} className="col-span-2" role="listitem">
              <LocationCard location={location} variant="wide" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
