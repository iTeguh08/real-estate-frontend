import { useCallback, useState } from 'react';
import { ChevronLeft, ChevronRight, Heart, ArrowLeftRight, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatPropertyPrice } from '@/lib/format-property';
import { cn } from '@/lib/utils';
import { useWishlist } from '@/hooks/useWishlist';
import { useCompare } from '@/hooks/useCompare';
import type { PropertyDetail } from '@/types';

export interface PropertyDetailHeroProps {
  property: PropertyDetail;
  onGallerySelect?: (index: number) => void;
}

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

export function PropertyDetailHero({ property, onGallerySelect }: PropertyDetailHeroProps) {
  const { title, location, status, type, imageUrl, gallery, id } = property;
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { isCompared, toggleCompare } = useCompare();
  const [activeThumb, setActiveThumb] = useState(0);

  const saved = isWishlisted(id);
  const compared = isCompared(id);
  const heroImage = gallery[activeThumb]?.url ?? imageUrl;

  const visibleThumbs =
    gallery.length >= 3
      ? [0, 1, 2].map((offset) => gallery[mod(activeThumb + offset, gallery.length)]!)
      : gallery;

  const setThumb = useCallback(
    (index: number) => {
      setActiveThumb(index);
      onGallerySelect?.(index);
    },
    [onGallerySelect]
  );

  const goPrev = () => setThumb(mod(activeThumb - 1, gallery.length));
  const goNext = () => setThumb(mod(activeThumb + 1, gallery.length));

  return (
    <section aria-labelledby="property-hero-heading" className="relative w-full">
      <div className="relative min-h-[min(82vh,760px)] w-full bg-white md:min-h-[min(88vh,860px)]">
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <img
            src={heroImage}
            alt=""
            className="h-full w-full object-cover transition-opacity duration-500"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-hz-dark/65 via-hz-dark/20 via-[42%] to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-[46%] bg-gradient-to-b from-transparent via-white/50 to-white md:h-[42%] md:via-white/45" />
        </div>

        <div className="section-container relative z-10 flex min-h-[inherit] flex-col justify-between pt-10 pb-28 md:pt-14 md:pb-32">
          <div className="flex items-start justify-between gap-4">
            <div className="max-w-3xl pt-[clamp(1rem,8vh,5rem)]">
              <p className="font-poppins text-[11px] font-semibold uppercase tracking-[0.28em] text-white/75">
                {type} · {status}
              </p>
              <h1
                id="property-hero-heading"
                className="mt-3 font-poppins text-[clamp(2.25rem,6vw,4.5rem)] font-semibold uppercase leading-[1.05] tracking-[-0.03em] text-white text-balance"
              >
                {title}
              </h1>
              <p className="mt-5 flex items-start gap-2 font-poppins text-sm text-white/85 md:text-base">
                <MapPin size={16} className="mt-0.5 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                {location}
              </p>
              <p className="mt-4 inline-flex rounded-hz bg-white/10 px-4 py-2 font-poppins text-lg font-semibold text-white backdrop-blur-sm md:text-xl">
                {formatPropertyPrice(property)}
              </p>
            </div>

            <div className="flex shrink-0 gap-2 pt-[clamp(1rem,8vh,5rem)]">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => toggleCompare(id)}
                aria-label={compared ? `Remove ${title} from compare` : `Add ${title} to compare`}
                aria-pressed={compared}
                className={cn(
                  'size-11 rounded-full border border-white/25 bg-black/40 text-white backdrop-blur-sm hover:bg-black/60 hover:text-white',
                  compared && 'border-hz-primary bg-hz-primary/90 hover:bg-hz-primary'
                )}
              >
                <ArrowLeftRight size={18} strokeWidth={1.75} />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => toggleWishlist(id)}
                aria-label={saved ? `Remove ${title} from wishlist` : `Save ${title} to wishlist`}
                aria-pressed={saved}
                className="size-11 rounded-full border border-white/25 bg-black/40 text-white backdrop-blur-sm hover:bg-black/60 hover:text-white"
              >
                <Heart
                  size={18}
                  strokeWidth={1.75}
                  className={cn(saved && 'fill-hz-primary text-hz-primary')}
                />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {visibleThumbs.length > 0 && (
        <div className="section-container relative z-20 -mt-24 md:-mt-28">
          <div className="relative mx-auto max-w-4xl">
            {gallery.length > 3 && (
              <>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={goPrev}
                  aria-label="Previous gallery image"
                  className="absolute top-1/2 -left-2 z-10 size-10 -translate-y-1/2 rounded-full border border-hz-border bg-white text-hz-dark shadow-md hover:bg-[#F8F8F8] md:-left-5 md:size-11"
                >
                  <ChevronLeft size={20} strokeWidth={1.75} />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={goNext}
                  aria-label="Next gallery image"
                  className="absolute top-1/2 -right-2 z-10 size-10 -translate-y-1/2 rounded-full border border-hz-border bg-white text-hz-dark shadow-md hover:bg-[#F8F8F8] md:-right-5 md:size-11"
                >
                  <ChevronRight size={20} strokeWidth={1.75} />
                </Button>
              </>
            )}

            <div className="overflow-hidden rounded-hz bg-white p-[3px] shadow-md ring-1 ring-hz-border/50">
              <div
                className="grid grid-cols-3 gap-[3px] bg-white"
                role="list"
                aria-label="Property gallery preview"
              >
                {visibleThumbs.map((image, index) => {
                  const globalIndex = gallery.findIndex((g) => g.id === image.id);
                  const isActive = globalIndex === activeThumb;

                  return (
                    <div key={`${image.id}-${index}`} role="listitem">
                      <button
                        type="button"
                        onClick={() => setThumb(globalIndex >= 0 ? globalIndex : index)}
                        aria-label={`View gallery image: ${image.alt}`}
                        aria-current={isActive ? 'true' : undefined}
                        className={cn(
                          'group relative block aspect-[5/4] w-full overflow-hidden bg-white transition-all duration-300',
                          isActive && 'ring-2 ring-inset ring-hz-primary'
                        )}
                      >
                        <img
                          src={image.url}
                          alt={image.alt}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                        {isActive && (
                          <Badge className="absolute top-2 left-2 rounded-hz border-none bg-hz-primary px-2 py-0.5 font-poppins text-[9px] font-semibold uppercase tracking-wider text-white hover:bg-hz-primary">
                            Active
                          </Badge>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            {visibleThumbs.some((img) => gallery.findIndex((g) => g.id === img.id) === activeThumb) && (
              <p className="mt-3 text-center font-poppins text-[11px] leading-snug text-hz-muted">
                {gallery[activeThumb]?.alt}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
