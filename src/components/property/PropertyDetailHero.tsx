import { useState } from 'react';
import { CalendarBlank } from '@phosphor-icons/react';
import { Heart, ArrowLeftRight, Loader2, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MediaImage } from '@/components/ui/media-image';
import { formatPropertyLocation, formatPropertyPrice, statusLabel } from '@/lib/format-property';
import { mediaOriginalUrl, propertyOriginalUrl, sizedImage } from '@/lib/image-url';
import { cn } from '@/lib/utils';
import { useWishlist } from '@/hooks/useWishlist';
import { useCompare } from '@/hooks/useCompare';
import type { PropertyDetail } from '@/types';

export interface PropertyDetailHeroProps {
  property: PropertyDetail;
  onScheduleViewing?: () => void;
}

type ShowcaseThumb = {
  preview: string;
  original: string;
  alt: string;
};

/**
 * Custom Layout 1 hero. Cover starts from original `imageUrlOriginal`;
 * showcase thumbs use soft preview; swapping loads the matching original.
 */
export function PropertyDetailHero({ property, onScheduleViewing }: PropertyDetailHeroProps) {
  const { title, status, type, imageUrl, layout1Media, id } = property;
  const locationLabel = formatPropertyLocation(property);
  const { isWishlisted, toggleWishlist, isTogglingId: wishlistTogglingId } = useWishlist();
  const { isCompared, toggleCompare, isTogglingId: compareTogglingId } = useCompare();

  const saved = isWishlisted(id);
  const compared = isCompared(id);

  const coverOriginal = propertyOriginalUrl(property);

  const showcaseThumbs: ShowcaseThumb[] = [
    {
      preview: imageUrl,
      original: coverOriginal,
      alt: `${title} — cover`,
    },
    {
      preview: layout1Media.showcaseOneUrl ?? '',
      original: mediaOriginalUrl(layout1Media.showcaseOneUrl, layout1Media.showcaseOneUrlOriginal),
      alt: `${title} — showcase 1`,
    },
    {
      preview: layout1Media.showcaseTwoUrl ?? '',
      original: mediaOriginalUrl(layout1Media.showcaseTwoUrl, layout1Media.showcaseTwoUrlOriginal),
      alt: `${title} — showcase 2`,
    },
    {
      preview: layout1Media.showcaseThreeUrl ?? '',
      original: mediaOriginalUrl(layout1Media.showcaseThreeUrl, layout1Media.showcaseThreeUrlOriginal),
      alt: `${title} — showcase 3`,
    },
  ].filter(
    (thumb, index, list) =>
      Boolean(thumb.preview) &&
      list.findIndex((t) => t.preview === thumb.preview) === index
  );

  const [activeOriginal, setActiveOriginal] = useState(coverOriginal);

  return (
    <section aria-labelledby="property-hero-heading" className="relative w-full">
      <div className="relative min-h-[min(72vh,680px)] w-full bg-hz-elevated md:min-h-[min(80vh,780px)]">
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <MediaImage
            key={activeOriginal}
            src={activeOriginal}
            alt=""
            fetchPriority="high"
            decoding="async"
            className="object-cover"
            wrapperClassName="absolute inset-0 z-0"
          />
          <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-hz-inverse/65 via-hz-inverse/20 via-[42%] to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-[52%] bg-gradient-to-b from-transparent via-hz-elevated/40 via-[40%] to-hz-elevated md:h-[48%]" />
        </div>

        <div className="section-container relative z-10 flex min-h-[inherit] flex-col justify-between pt-10 pb-28 md:pt-14 md:pb-32">
          <div className="flex items-start justify-between gap-4">
            <div className="max-w-3xl pt-[clamp(1rem,8vh,5rem)]">
              <p className="font-poppins text-[11px] font-semibold uppercase tracking-[2px] text-white/75">
                {type} · {statusLabel(status)}
              </p>
              <h1
                id="property-hero-heading"
                className="mt-3 font-poppins text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-white text-balance"
              >
                {title}
              </h1>
              <p className="mt-5 flex items-start gap-2 font-poppins text-sm text-white/85 md:text-base">
                <MapPin size={16} className="mt-0.5 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                {locationLabel}
              </p>
              <p className="mt-4 inline-flex rounded-hz bg-black/35 px-4 py-2 font-poppins text-lg font-semibold text-white md:text-xl">
                {formatPropertyPrice(property)}
              </p>

              {onScheduleViewing ? (
                <div className="mt-6">
                  <Button
                    type="button"
                    onClick={onScheduleViewing}
                    className="h-auto gap-2 rounded-hz bg-hz-primary px-6 py-3 font-poppins text-sm font-semibold text-white hover:bg-hz-primary-hover"
                  >
                    <CalendarBlank size={17} weight="fill" aria-hidden="true" />
                    Schedule a Viewing
                  </Button>
                </div>
              ) : null}
            </div>

            <div className="flex shrink-0 gap-2 pt-[clamp(1rem,8vh,5rem)]">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                disabled={compareTogglingId === id}
                onClick={() => toggleCompare(id)}
                aria-label={compared ? `Remove ${title} from compare` : `Add ${title} to compare`}
                aria-pressed={compared}
                aria-busy={compareTogglingId === id}
                className={cn(
                  'size-11 rounded-full border border-white/25 bg-black/40 text-white hover:bg-black/60 hover:text-white',
                  compared && 'border-hz-primary bg-hz-primary/90 hover:bg-hz-primary',
                  compareTogglingId === id && 'cursor-wait opacity-90'
                )}
              >
                {compareTogglingId === id ? (
                  <Loader2 size={18} strokeWidth={1.75} className="animate-spin" aria-hidden="true" />
                ) : (
                  <ArrowLeftRight size={18} strokeWidth={1.75} />
                )}
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                disabled={wishlistTogglingId === id}
                onClick={() => toggleWishlist(id)}
                aria-label={saved ? `Remove ${title} from wishlist` : `Save ${title} to wishlist`}
                aria-pressed={saved}
                aria-busy={wishlistTogglingId === id}
                className={cn(
                  'size-11 rounded-full border border-white/25 bg-black/40 text-white hover:bg-black/60 hover:text-white',
                  wishlistTogglingId === id && 'cursor-wait opacity-90'
                )}
              >
                {wishlistTogglingId === id ? (
                  <Loader2 size={18} strokeWidth={1.75} className="animate-spin" aria-hidden="true" />
                ) : (
                  <Heart
                    size={18}
                    strokeWidth={1.75}
                    className={cn(saved && 'fill-hz-primary text-hz-primary')}
                  />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {showcaseThumbs.length > 1 && (
        <div className="section-container relative z-20 -mt-20 pb-6 md:-mt-24 md:pb-8">
          <div className="mx-auto max-w-4xl">
            <div
              className="grid gap-2.5 sm:gap-3"
              style={{ gridTemplateColumns: `repeat(${Math.min(showcaseThumbs.length, 4)}, minmax(0, 1fr))` }}
              role="list"
              aria-label="Property showcase photos"
            >
              {showcaseThumbs.map((thumb, index) => {
                const isActive = thumb.original === activeOriginal;
                return (
                  <button
                    key={thumb.preview}
                    type="button"
                    role="listitem"
                    onClick={() => setActiveOriginal(thumb.original)}
                    aria-label={`Show ${thumb.alt}`}
                    aria-pressed={isActive}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'group relative w-full',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hz-primary focus-visible:ring-offset-2'
                    )}
                  >
                    <span className="relative block aspect-[5/4] overflow-hidden rounded-hz">
                      <MediaImage
                        src={sizedImage(thumb.preview, 360)}
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
        </div>
      )}
    </section>
  );
}
