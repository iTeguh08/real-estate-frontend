import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowLeftRight, Heart, Loader2, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MediaImage } from '@/components/ui/media-image';
import { useCompare } from '@/hooks/useCompare';
import { useWishlist } from '@/hooks/useWishlist';
import { formatPropertyLocation, formatPropertyPrice, statusLabel } from '@/lib/format-property';
import { routes } from '@/lib/routes';
import { cn } from '@/lib/utils';
import { VILLA_SECTION_GUTTERS } from '@/lib/property-layout';
import type { PropertyDetail } from '@/types';

export interface PropertyVillaHeroProps {
  property: Pick<
    PropertyDetail,
    | 'id'
    | 'title'
    | 'location'
    | 'street'
    | 'city'
    | 'countryCode'
    | 'status'
    | 'type'
    | 'tagline'
    | 'imageUrl'
    | 'imageUrlOriginal'
    | 'price'
    | 'currency'
  >;
  onScheduleViewing?: () => void;
}

interface VillaHeroContentPanelProps {
  property: PropertyVillaHeroProps['property'];
  onScheduleViewing?: () => void;
  headingId: string;
  className?: string;
}

function VillaHeroContentPanel({
  property,
  onScheduleViewing,
  headingId,
  className,
}: VillaHeroContentPanelProps) {
  const { title, status, type, tagline } = property;
  const locationLabel = formatPropertyLocation(property);

  return (
    <div className={cn('flex w-full flex-col items-center text-center', className)}>
      <Link
        to={{ pathname: routes.home, hash: 'listings' }}
        className="mb-4 inline-flex items-center justify-center gap-2 font-poppins text-sm text-hz-body no-underline transition-colors duration-200 hover:text-hz-primary md:mb-6"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        Back to listings
      </Link>

      <p className="font-poppins text-[11px] font-semibold uppercase tracking-[0.28em] text-hz-primary">
        {type} · {statusLabel(status)}
      </p>
      <h1
        id={headingId}
        className="mt-2 font-poppins text-[clamp(1.375rem,4.5vw,2.5rem)] font-semibold uppercase leading-[1.12] tracking-[-0.02em] text-hz-dark text-balance"
      >
        {title}
      </h1>
      <p className="mt-3 flex items-center justify-center gap-2 font-poppins text-sm text-hz-muted">
        <MapPin size={15} className="shrink-0 text-hz-primary" strokeWidth={1.5} aria-hidden="true" />
        {locationLabel}
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
  );
}

/**
 * Custom Layout 2 hero — mobile: full showcase image then solid metadata panel;
 * desktop: inset background with sharp-cornered ~90% white overlay (unchanged).
 */
export function PropertyVillaHero({ property, onScheduleViewing }: PropertyVillaHeroProps) {
  const { id, title } = property;
  const { isWishlisted, toggleWishlist, isTogglingId: wishlistTogglingId } = useWishlist();
  const { isCompared, toggleCompare, isTogglingId: compareTogglingId } = useCompare();
  const saved = isWishlisted(id);
  const compared = isCompared(id);

  const actionButtons = (
    <div className="absolute top-4 right-4 z-20 flex gap-2 md:top-8 md:right-8">
      <button
        type="button"
        disabled={compareTogglingId === id}
        onClick={() => toggleCompare(id)}
        aria-label={compared ? `Remove ${title} from compare` : `Add ${title} to compare`}
        aria-pressed={compared}
        aria-busy={compareTogglingId === id}
        className={cn(
          'flex size-11 items-center justify-center rounded-full border border-white/30 bg-black/35 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-black/55',
          compared && 'border-hz-primary bg-hz-primary/90 hover:bg-hz-primary',
          compareTogglingId === id && 'cursor-wait opacity-90'
        )}
      >
        {compareTogglingId === id ? (
          <Loader2 size={17} strokeWidth={1.75} className="animate-spin" aria-hidden="true" />
        ) : (
          <ArrowLeftRight size={17} strokeWidth={1.75} />
        )}
      </button>
      <button
        type="button"
        disabled={wishlistTogglingId === id}
        onClick={() => toggleWishlist(id)}
        aria-label={saved ? `Remove ${title} from wishlist` : `Save ${title} to wishlist`}
        aria-pressed={saved}
        aria-busy={wishlistTogglingId === id}
        className={cn(
          'flex size-11 items-center justify-center rounded-full border border-white/30 bg-black/35 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-black/55',
          wishlistTogglingId === id && 'cursor-wait opacity-90'
        )}
      >
        {wishlistTogglingId === id ? (
          <Loader2 size={17} strokeWidth={1.75} className="animate-spin" aria-hidden="true" />
        ) : (
          <Heart
            size={17}
            strokeWidth={1.75}
            className={cn(saved && 'fill-hz-primary text-hz-primary')}
          />
        )}
      </button>
    </div>
  );

  const heroImage = (
    <MediaImage
      mediaUrl={property.imageUrl}
      fitCover
      coverEstimate={{ width: 1280, height: 720 }}
      coverMaxWidth={1600}
      alt=""
      fetchPriority="high"
      decoding="async"
      className="object-cover object-center"
      wrapperClassName="absolute inset-0"
    />
  );

  return (
    <section aria-labelledby="property-villa-hero-heading" className="overflow-x-clip bg-hz-elevated">
      <div className={VILLA_SECTION_GUTTERS}>
        {/* Mobile — unobstructed showcase image, metadata below */}
        <div className="md:hidden">
          <div className="relative h-[min(52vh,420px)] overflow-hidden bg-hz-inverse">
            <div className="absolute inset-0" aria-hidden="true">
              {heroImage}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-16 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
            {actionButtons}
          </div>

          <VillaHeroContentPanel
            property={property}
            onScheduleViewing={onScheduleViewing}
            headingId="property-villa-hero-heading"
            className="border-t border-hz-border bg-hz-elevated px-5 py-6"
          />
        </div>

        {/* Desktop — original overlay composition */}
        <div className="hidden md:block">
          <div className="relative min-h-[min(78vh,800px)] overflow-hidden bg-hz-inverse">
            <div className="absolute inset-0" aria-hidden="true">
              {heroImage}
            </div>

            {actionButtons}

            <div className="relative z-10 flex flex-col">
              <VillaHeroContentPanel
                property={property}
                onScheduleViewing={onScheduleViewing}
                headingId="property-villa-hero-heading"
                className="max-w-[min(44%,560px)] bg-hz-elevated/90 px-10 py-9 backdrop-blur-[2px] lg:max-w-[min(42%,580px)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
