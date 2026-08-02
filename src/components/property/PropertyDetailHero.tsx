import { useState } from 'react';
import { CalendarBlank } from '@phosphor-icons/react';
import { Heart, ArrowLeftRight, Loader2, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatPropertyLocation, formatPropertyPrice, statusLabel } from '@/lib/format-property';
import { sizedImage } from '@/lib/image-url';
import { cn } from '@/lib/utils';
import { useWishlist } from '@/hooks/useWishlist';
import { useCompare } from '@/hooks/useCompare';
import type { PropertyDetail } from '@/types';

export interface PropertyDetailHeroProps {
  property: PropertyDetail;
  onScheduleViewing?: () => void;
}

/**
 * Custom Layout 1 hero. Cover starts from `imageUrl`; showcase thumbs swap the
 * active cover when present (interactive — not decorative dead chrome).
 */
export function PropertyDetailHero({ property, onScheduleViewing }: PropertyDetailHeroProps) {
  const { title, status, type, imageUrl, layout1Media, id } = property;
  const locationLabel = formatPropertyLocation(property);
  const { isWishlisted, toggleWishlist, isTogglingId: wishlistTogglingId } = useWishlist();
  const { isCompared, toggleCompare, isTogglingId: compareTogglingId } = useCompare();

  const saved = isWishlisted(id);
  const compared = isCompared(id);

  const showcaseThumbs = [
    { url: imageUrl, alt: `${title} — cover` },
    { url: layout1Media.showcaseOneUrl, alt: `${title} — showcase 1` },
    { url: layout1Media.showcaseTwoUrl, alt: `${title} — showcase 2` },
    { url: layout1Media.showcaseThreeUrl, alt: `${title} — showcase 3` },
  ].filter(
    (thumb, index, list): thumb is { url: string; alt: string } =>
      Boolean(thumb.url) && list.findIndex((t) => t.url === thumb.url) === index
  );

  const [activeUrl, setActiveUrl] = useState(imageUrl);

  return (
    <section aria-labelledby="property-hero-heading" className="relative w-full">
      <div className="relative min-h-[min(72vh,680px)] w-full bg-hz-elevated md:min-h-[min(80vh,780px)]">
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <img
            key={activeUrl}
            src={sizedImage(activeUrl, 1280)}
            alt=""
            className="h-full w-full object-cover"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-hz-inverse/65 via-hz-inverse/20 via-[42%] to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-[46%] bg-gradient-to-b from-transparent via-hz-elevated/50 to-hz-elevated md:h-[42%] md:via-hz-elevated/45" />
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
        <div className="section-container relative z-20 -mt-20 md:-mt-24">
          <div className="mx-auto max-w-4xl">
            <div
              className="grid gap-2.5 sm:gap-3"
              style={{ gridTemplateColumns: `repeat(${Math.min(showcaseThumbs.length, 4)}, minmax(0, 1fr))` }}
              role="list"
              aria-label="Property showcase photos"
            >
              {showcaseThumbs.map((thumb) => {
                const isActive = thumb.url === activeUrl;
                return (
                  <button
                    key={thumb.url}
                    type="button"
                    role="listitem"
                    onClick={() => setActiveUrl(thumb.url)}
                    aria-label={`Show ${thumb.alt}`}
                    aria-pressed={isActive}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'group relative w-full',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hz-primary focus-visible:ring-offset-2'
                    )}
                  >
                    <span className="relative block aspect-[5/4]">
                      <img
                        src={sizedImage(thumb.url, 360)}
                        alt={thumb.alt}
                        loading="lazy"
                        decoding="async"
                        className={cn(
                          'h-full w-full rounded-hz object-cover transition-opacity duration-300',
                          isActive ? 'opacity-100' : 'opacity-45 hover:opacity-70'
                        )}
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
