import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowLeftRight, Heart, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCompare } from '@/hooks/useCompare';
import { useWishlist } from '@/hooks/useWishlist';
import { formatPropertyPrice } from '@/lib/format-property';
import { routes } from '@/lib/routes';
import { cn } from '@/lib/utils';
import { VILLA_SECTION_GUTTERS } from '@/lib/property-layout';
import type { PropertyDetail } from '@/types';

export interface PropertyVillaHeroProps {
  property: Pick<
    PropertyDetail,
    'id' | 'title' | 'location' | 'status' | 'type' | 'tagline' | 'imageUrl' | 'price' | 'currency'
  >;
  onScheduleViewing?: () => void;
}

/**
 * Custom Layout 2 hero — inset background image with side gutters, plus a
 * sharp-cornered ~90% white overlay anchored top-left (reference: The Eight).
 */
export function PropertyVillaHero({ property, onScheduleViewing }: PropertyVillaHeroProps) {
  const { id, title, location, status, type, tagline, imageUrl } = property;
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { isCompared, toggleCompare } = useCompare();
  const saved = isWishlisted(id);
  const compared = isCompared(id);

  return (
    <section aria-labelledby="property-villa-hero-heading" className="bg-white">
      {/* Side gutters — image sits inside, not edge-to-edge */}
      <div className={VILLA_SECTION_GUTTERS}>
        <div className="relative min-h-[min(78vh,720px)] overflow-hidden bg-hz-dark md:min-h-[min78vh,800px)]">
          {/* Background image */}
          <div className="absolute inset-0" aria-hidden="true">
            <img
              src={imageUrl}
              alt=""
              className="h-full w-full object-cover object-center"
              fetchPriority="high"
            />
          </div>

          {/* Wishlist / compare */}
          <div className="absolute top-5 right-5 z-20 flex gap-2 md:top-8 md:right-8">
            <button
              type="button"
              onClick={() => toggleCompare(id)}
              aria-label={compared ? `Remove ${title} from compare` : `Add ${title} to compare`}
              aria-pressed={compared}
              className={cn(
                'flex size-10 items-center justify-center rounded-full border border-white/30 bg-black/35 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-black/55 md:size-11',
                compared && 'border-hz-primary bg-hz-primary/90 hover:bg-hz-primary'
              )}
            >
              <ArrowLeftRight size={17} strokeWidth={1.75} />
            </button>
            <button
              type="button"
              onClick={() => toggleWishlist(id)}
              aria-label={saved ? `Remove ${title} from wishlist` : `Save ${title} to wishlist`}
              aria-pressed={saved}
              className="flex size-10 items-center justify-center rounded-full border border-white/30 bg-black/35 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-black/55 md:size-11"
            >
              <Heart
                size={17}
                strokeWidth={1.75}
                className={cn(saved && 'fill-hz-primary text-hz-primary')}
              />
            </button>
          </div>

          {/* Sharp-cornered overlay — ~90% white opacity */}
          <div className="relative z-10 flex flex-col">
            <div className="flex w-full max-w-[min(100%,500px)] flex-col items-center bg-white/90 px-6 py-7 text-center backdrop-blur-[2px] sm:max-w-[min(100%,520px)] sm:px-8 sm:py-8 md:max-w-[min(44%,560px)] md:px-10 md:py-9 lg:max-w-[min(42%,580px)]">
              <Link
                to={{ pathname: routes.home, hash: 'listings' }}
                className="mb-5 inline-flex items-center justify-center gap-2 font-poppins text-sm text-hz-body no-underline transition-colors duration-200 hover:text-hz-primary md:mb-6"
              >
                <ArrowLeft size={16} aria-hidden="true" />
                Back to listings
              </Link>

              <p className="font-poppins text-[11px] font-semibold uppercase tracking-[0.28em] text-hz-primary">
                {type} · {status}
              </p>
              <h1
                id="property-villa-hero-heading"
                className="mt-2 font-poppins text-[clamp(1.5rem,3.5vw,2.5rem)] font-semibold uppercase leading-[1.12] tracking-[-0.02em] text-hz-dark text-balance"
              >
                {title}
              </h1>
              <p className="mt-3 flex items-center justify-center gap-2 font-poppins text-sm text-hz-muted">
                <MapPin size={15} className="shrink-0 text-hz-primary" strokeWidth={1.5} aria-hidden="true" />
                {location}
              </p>
              <p className="mt-3 max-w-md font-poppins text-sm leading-[1.65] text-hz-body text-pretty">
                {tagline}
              </p>

              <p className="mt-5 font-poppins text-xl font-semibold text-hz-dark md:text-2xl">
                {formatPropertyPrice(property)}
              </p>

              <Button
                type="button"
                onClick={onScheduleViewing}
                className="mt-5 h-auto w-fit rounded-hz bg-hz-primary px-5 py-2.5 font-poppins text-sm font-semibold text-white hover:bg-hz-primary-hover"
              >
                Schedule a Viewing
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
