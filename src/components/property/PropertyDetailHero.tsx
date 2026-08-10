import { useState } from 'react';
import { CalendarBlank } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowLeftRight, Heart, Loader2, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MediaImage } from '@/components/ui/media-image';
import { formatPropertyLocation, formatPropertyPrice, statusLabel } from '@/lib/format-property';
import { routes } from '@/lib/routes';
import { cn } from '@/lib/utils';
import { VILLA_SECTION_GUTTERS } from '@/lib/property-layout';
import { useWishlist } from '@/hooks/useWishlist';
import { useCompare } from '@/hooks/useCompare';
import type { PropertyDetail } from '@/types';

export interface PropertyDetailHeroProps {
  property: PropertyDetail;
  onScheduleViewing?: () => void;
}

type ShowcaseThumb = {
  preview: string;
  alt: string;
};

/**
 * Custom Layout 1 hero. Background uses fitCover (measured w×h + crop);
 * showcase thumbs stay soft width-only previews.
 */
export function PropertyDetailHero({ property, onScheduleViewing }: PropertyDetailHeroProps) {
  const { title, status, type, imageUrl, layout1Media, id, tagline } = property;
  const locationLabel = formatPropertyLocation(property);
  const { isWishlisted, toggleWishlist, isTogglingId: wishlistTogglingId } = useWishlist();
  const { isCompared, toggleCompare, isTogglingId: compareTogglingId } = useCompare();

  const saved = isWishlisted(id);
  const compared = isCompared(id);

  const showcaseThumbs: ShowcaseThumb[] = [
    {
      preview: imageUrl,
      alt: `${title} — cover`,
    },
    {
      preview: layout1Media.showcaseOneUrl ?? '',
      alt: `${title} — showcase 1`,
    },
    {
      preview: layout1Media.showcaseTwoUrl ?? '',
      alt: `${title} — showcase 2`,
    },
    {
      preview: layout1Media.showcaseThreeUrl ?? '',
      alt: `${title} — showcase 3`,
    },
  ].filter(
    (thumb, index, list) =>
      Boolean(thumb.preview) &&
      list.findIndex((t) => t.preview === thumb.preview) === index
  );

  const [activePreview, setActivePreview] = useState(imageUrl);

  return (
    <section aria-labelledby="property-hero-heading" className="bg-hz-elevated">
      <div className={VILLA_SECTION_GUTTERS}>
        <div className="relative min-h-[min(72vh,680px)] overflow-hidden bg-hz-inverse md:min-h-[min(80vh,780px)]">
          <div className="absolute inset-0" aria-hidden="true">
            <MediaImage
              key={activePreview}
              mediaUrl={activePreview}
              fitCover
              coverEstimate={{ width: 1280, height: 720 }}
              coverMaxWidth={1600}
              alt=""
              fetchPriority="high"
              decoding="async"
              className="object-cover"
              wrapperClassName="absolute inset-0 z-0"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-[52%] bg-gradient-to-b from-transparent via-hz-elevated/40 via-[40%] to-hz-elevated md:h-[48%]" />
          </div>

          <div className="absolute top-5 right-5 z-20 flex gap-2 md:top-8 md:right-8">
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
                'size-10 rounded-full border border-white/30 bg-black/35 text-white backdrop-blur-sm hover:bg-black/55 hover:text-white md:size-11',
                compared && 'border-hz-primary bg-hz-primary/90 hover:bg-hz-primary',
                compareTogglingId === id && 'cursor-wait opacity-90'
              )}
            >
              {compareTogglingId === id ? (
                <Loader2 size={17} strokeWidth={1.75} className="animate-spin" aria-hidden="true" />
              ) : (
                <ArrowLeftRight size={17} strokeWidth={1.75} />
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
                'size-10 rounded-full border border-white/30 bg-black/35 text-white backdrop-blur-sm hover:bg-black/55 hover:text-white md:size-11',
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
            </Button>
          </div>

          <div className="relative z-10 flex flex-col">
            <div className="flex w-full max-w-[min(100%,500px)] flex-col items-center bg-hz-elevated/90 px-6 py-7 text-center backdrop-blur-[2px] sm:max-w-[min(100%,520px)] sm:px-8 sm:py-8 md:max-w-[min(44%,560px)] md:px-10 md:py-9 lg:max-w-[min(42%,580px)]">
              <Link
                to={{ pathname: routes.home, hash: 'listings' }}
                className="mb-5 inline-flex items-center justify-center gap-2 font-poppins text-sm text-hz-body no-underline transition-colors duration-200 hover:text-hz-primary md:mb-6"
              >
                <ArrowLeft size={16} aria-hidden="true" />
                Back to listings
              </Link>

              <p className="font-poppins text-[11px] font-semibold uppercase tracking-[0.28em] text-hz-primary">
                {type} · {statusLabel(status)}
              </p>
              <h1
                id="property-hero-heading"
                className="mt-2 font-poppins text-[clamp(1.5rem,3.5vw,2.5rem)] font-semibold uppercase leading-[1.12] tracking-[-0.02em] text-hz-dark text-balance"
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
          </div>
        </div>

        {showcaseThumbs.length > 1 && (
          <div className="relative z-20 -mt-20 pb-6 md:-mt-24 md:pb-8">
            <div className="mx-auto max-w-4xl">
              <div
                className="grid gap-2.5 sm:gap-3"
                style={{
                  gridTemplateColumns: `repeat(${Math.min(showcaseThumbs.length, 4)}, minmax(0, 1fr))`,
                }}
                role="list"
                aria-label="Property showcase photos"
              >
                {showcaseThumbs.map((thumb, index) => {
                  const isActive = thumb.preview === activePreview;
                  return (
                    <button
                      key={thumb.preview}
                      type="button"
                      role="listitem"
                      onClick={() => setActivePreview(thumb.preview)}
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
                          mediaUrl={thumb.preview}
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
          </div>
        )}
      </div>
    </section>
  );
}
