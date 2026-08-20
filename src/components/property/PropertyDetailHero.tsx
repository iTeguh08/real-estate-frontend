import { useState } from 'react';
import { CalendarBlank } from '@phosphor-icons/react';
import { AppLink } from '@/lib/app-link';
import { ArrowLeft, ArrowLeftRight, Heart, Loader2, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MediaImage } from '@/components/ui/media-image';
import { formatPropertyLocation, formatPropertyPrice, statusLabel } from '@/lib/format-property';
import { routes } from '@/lib/routes';
import { cn } from '@/lib/utils';
import { VILLA_SECTION_GUTTERS } from '@/lib/property-layout';
import { productLargeUrl, productThumbUrl } from '@/lib/image-url';
import { useWishlist } from '@/hooks/useWishlist';
import { useCompare } from '@/hooks/useCompare';
import type { PropertyDetail } from '@/types';

export interface PropertyDetailHeroProps {
  property: PropertyDetail;
  onScheduleViewing?: () => void;
}

type ShowcaseThumb = {
  /** Canonical media URL — variants derived at render (thumb strip / large hero). */
  base: string;
  alt: string;
};

interface HeroContentPanelProps {
  property: PropertyDetail;
  onScheduleViewing?: () => void;
  headingId: string;
  className?: string;
}

function HeroContentPanel({
  property,
  onScheduleViewing,
  headingId,
  className,
}: HeroContentPanelProps) {
  const { title, status, type, tagline } = property;
  const locationLabel = formatPropertyLocation(property);

  return (
    <div className={cn('flex w-full flex-col items-center text-center', className)}>
      <AppLink
        to={{ pathname: routes.home, hash: 'listings' }}
        className="mb-4 inline-flex items-center justify-center gap-2 font-poppins text-sm text-hz-body no-underline transition-colors duration-200 hover:text-hz-primary md:mb-6"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        Back to listings
      </AppLink>

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

      {onScheduleViewing ? (
        <Button
          type="button"
          onClick={onScheduleViewing}
          className="mt-5 h-auto w-fit gap-2 rounded-hz bg-hz-primary px-5 py-2.5 font-poppins text-sm font-semibold text-white hover:bg-hz-primary-hover"
        >
          <CalendarBlank size={17} weight="fill" aria-hidden="true" />
          Schedule a Viewing
        </Button>
      ) : null}
    </div>
  );
}

interface HeroActionButtonsProps {
  propertyId: string;
  title: string;
  saved: boolean;
  compared: boolean;
  wishlistTogglingId: string | undefined;
  compareTogglingId: string | undefined;
  onToggleWishlist: () => void;
  onToggleCompare: () => void;
}

function HeroActionButtons({
  propertyId,
  title,
  saved,
  compared,
  wishlistTogglingId,
  compareTogglingId,
  onToggleWishlist,
  onToggleCompare,
}: HeroActionButtonsProps) {
  return (
    <div className="absolute top-4 right-4 z-20 flex gap-2 md:top-8 md:right-8">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        disabled={compareTogglingId === propertyId}
        onClick={onToggleCompare}
        aria-label={compared ? `Remove ${title} from compare` : `Add ${title} to compare`}
        aria-pressed={compared}
        aria-busy={compareTogglingId === propertyId}
        className={cn(
          'size-11 rounded-full border border-white/30 bg-black/35 text-white backdrop-blur-sm hover:bg-black/55 hover:text-white',
          compared && 'border-hz-primary bg-hz-primary/90 hover:bg-hz-primary',
          compareTogglingId === propertyId && 'cursor-wait opacity-90'
        )}
      >
        {compareTogglingId === propertyId ? (
          <Loader2 size={17} strokeWidth={1.75} className="animate-spin" aria-hidden="true" />
        ) : (
          <ArrowLeftRight size={17} strokeWidth={1.75} />
        )}
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        disabled={wishlistTogglingId === propertyId}
        onClick={onToggleWishlist}
        aria-label={saved ? `Remove ${title} from wishlist` : `Save ${title} to wishlist`}
        aria-pressed={saved}
        aria-busy={wishlistTogglingId === propertyId}
        className={cn(
          'size-11 rounded-full border border-white/30 bg-black/35 text-white backdrop-blur-sm hover:bg-black/55 hover:text-white',
          wishlistTogglingId === propertyId && 'cursor-wait opacity-90'
        )}
      >
        {wishlistTogglingId === propertyId ? (
          <Loader2 size={17} strokeWidth={1.75} className="animate-spin" aria-hidden="true" />
        ) : (
          <Heart
            size={17}
            strokeWidth={1.75}
            className={cn(saved && 'fill-hz-primary text-hz-primary')}
          />
        )}
      </Button>
    </div>
  );
}

interface ShowcaseThumbGridProps {
  thumbs: ShowcaseThumb[];
  activeBase: string;
  onSelect: (base: string) => void;
}

function ShowcaseThumbGrid({ thumbs, activeBase, onSelect }: ShowcaseThumbGridProps) {
  return (
    <div className="mx-auto max-w-4xl">
      <div
        className="grid gap-2.5 sm:gap-3"
        style={{
          gridTemplateColumns: `repeat(${Math.min(thumbs.length, 4)}, minmax(0, 1fr))`,
        }}
        role="list"
        aria-label="Property showcase photos"
      >
        {thumbs.map((thumb, index) => {
          const isActive = thumb.base === activeBase;
          return (
            <button
              key={thumb.base}
              type="button"
              role="listitem"
              onClick={() => onSelect(thumb.base)}
              aria-label={`Show ${thumb.alt}`}
              aria-pressed={isActive}
              aria-current={isActive ? 'true' : undefined}
              className={cn(
                'group relative w-full',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hz-primary focus-visible:ring-offset-2'
              )}
            >
              <span className="relative block aspect-[5/4] overflow-hidden rounded-hz max-md:rounded-xl">
                <MediaImage
                  mediaUrl={productThumbUrl(thumb.base)}
                  fitCover
                  coverEstimate={{ width: 220, height: 176 }}
                  coverMaxWidth={480}
                  alt={thumb.alt}
                  loading="lazy"
                  decoding="async"
                  className={cn(
                    'object-cover transition-opacity duration-300',
                    isActive ? 'opacity-100' : 'opacity-45 group-hover:opacity-70'
                  )}
                  skeletonDelayMs={index * 80}
                />
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Custom Layout 1 hero. Mobile: unobstructed showcase image, then thumb strip, then
 * solid metadata panel. Desktop: inset overlay panel on full-bleed background (unchanged).
 */
export function PropertyDetailHero({ property, onScheduleViewing }: PropertyDetailHeroProps) {
  const { title, imageUrl, layout1Media, id } = property;
  const { isWishlisted, toggleWishlist, isTogglingId: wishlistTogglingId } = useWishlist();
  const { isCompared, toggleCompare, isTogglingId: compareTogglingId } = useCompare();

  const saved = isWishlisted(id);
  const compared = isCompared(id);

  const showcaseThumbs: ShowcaseThumb[] = [
    { base: imageUrl, alt: `${title} — cover` },
    { base: layout1Media.showcaseOneUrl ?? '', alt: `${title} — showcase 1` },
    { base: layout1Media.showcaseTwoUrl ?? '', alt: `${title} — showcase 2` },
    { base: layout1Media.showcaseThreeUrl ?? '', alt: `${title} — showcase 3` },
  ].filter(
    (thumb, index, list) =>
      Boolean(thumb.base) && list.findIndex((t) => t.base === thumb.base) === index
  );

  const [activeBase, setActiveBase] = useState(imageUrl);

  const actionButtons = (
    <HeroActionButtons
      propertyId={id}
      title={title}
      saved={saved}
      compared={compared}
      wishlistTogglingId={wishlistTogglingId}
      compareTogglingId={compareTogglingId}
      onToggleWishlist={() => toggleWishlist(id)}
      onToggleCompare={() => toggleCompare(id)}
    />
  );

  const heroImage = (
    <MediaImage
      key={activeBase}
      mediaUrl={productLargeUrl(activeBase)}
      fitCover
      coverEstimate={{ width: 1280, height: 720 }}
      coverMaxWidth={1600}
      alt=""
      fetchPriority="high"
      decoding="async"
      className="object-cover"
      wrapperClassName="absolute inset-0 z-0"
    />
  );

  return (
    <section aria-labelledby="property-hero-heading" className="bg-hz-elevated">
      <div className={VILLA_SECTION_GUTTERS}>
        {/* Mobile — image visible first; metadata in solid panel below thumbs */}
        <div className="md:hidden">
          <div className="relative h-[min(52vh,420px)] overflow-hidden bg-hz-inverse">
            <div className="absolute inset-0" aria-hidden="true">
              {heroImage}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-16 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
            {actionButtons}
          </div>

          {showcaseThumbs.length > 1 ? (
            <div className="relative z-20 -mt-10 pb-4">
              <ShowcaseThumbGrid
                thumbs={showcaseThumbs}
                activeBase={activeBase}
                onSelect={setActiveBase}
              />
            </div>
          ) : null}

          <HeroContentPanel
            property={property}
            onScheduleViewing={onScheduleViewing}
            headingId="property-hero-heading"
            className="border-t border-hz-border bg-hz-elevated px-5 py-6"
          />
        </div>

        {/* Desktop — original overlay-on-background composition */}
        <div className="hidden md:block">
          <div className="relative min-h-[min(80vh,780px)] overflow-hidden bg-hz-inverse">
            <div className="absolute inset-0" aria-hidden="true">
              {heroImage}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-[48%] bg-gradient-to-b from-transparent via-hz-elevated/40 via-[40%] to-hz-elevated" />
            </div>

            {actionButtons}

            <div className="relative z-10 flex flex-col">
              <HeroContentPanel
                property={property}
                onScheduleViewing={onScheduleViewing}
                headingId="property-hero-heading"
                className="max-w-[min(44%,560px)] bg-hz-elevated/90 px-10 py-9 backdrop-blur-[2px] lg:max-w-[min(42%,580px)]"
              />
            </div>
          </div>

          {showcaseThumbs.length > 1 ? (
            <div className="relative z-20 -mt-24 pb-8">
              <ShowcaseThumbGrid
                thumbs={showcaseThumbs}
                activeBase={activeBase}
                onSelect={setActiveBase}
              />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
