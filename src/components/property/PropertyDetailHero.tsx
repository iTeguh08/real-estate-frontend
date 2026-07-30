import { Heart, ArrowLeftRight, Loader2, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatPropertyLocation, formatPropertyPrice } from '@/lib/format-property';
import { cn } from '@/lib/utils';
import { useWishlist } from '@/hooks/useWishlist';
import { useCompare } from '@/hooks/useCompare';
import type { PropertyDetail } from '@/types';

export interface PropertyDetailHeroProps {
  property: PropertyDetail;
}

/**
 * Custom Layout 1 hero. Background is the single cover image (`imageUrl`);
 * the 3-thumbnail strip below is a fixed, decorative showcase fed by
 * `layout1Media.showcaseOneUrl/twoUrl/threeUrl` — it no longer drives the
 * hero background (that was tied to the old variable-length `gallery`).
 */
export function PropertyDetailHero({ property }: PropertyDetailHeroProps) {
  const { title, status, type, imageUrl, layout1Media, id } = property;
  const locationLabel = formatPropertyLocation(property);
  const { isWishlisted, toggleWishlist, isTogglingId: wishlistTogglingId } = useWishlist();
  const { isCompared, toggleCompare, isTogglingId: compareTogglingId } = useCompare();

  const saved = isWishlisted(id);
  const compared = isCompared(id);

  const showcaseThumbs = [
    { url: layout1Media.showcaseOneUrl, alt: `${title} — showcase 1` },
    { url: layout1Media.showcaseTwoUrl, alt: `${title} — showcase 2` },
    { url: layout1Media.showcaseThreeUrl, alt: `${title} — showcase 3` },
  ].filter((thumb): thumb is { url: string; alt: string } => Boolean(thumb.url));

  return (
    <section aria-labelledby="property-hero-heading" className="relative w-full">
      <div className="relative min-h-[min(82vh,760px)] w-full bg-hz-elevated md:min-h-[min(88vh,860px)]">
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <img
            src={imageUrl}
            alt=""
            className="h-full w-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-hz-inverse/65 via-hz-inverse/20 via-[42%] to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-[46%] bg-gradient-to-b from-transparent via-hz-elevated/50 to-hz-elevated md:h-[42%] md:via-hz-elevated/45" />
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
                {locationLabel}
              </p>
              <p className="mt-4 inline-flex rounded-hz bg-hz-elevated/10 px-4 py-2 font-poppins text-lg font-semibold text-white backdrop-blur-sm md:text-xl">
                {formatPropertyPrice(property)}
              </p>
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
                  'size-11 rounded-full border border-white/25 bg-black/40 text-white backdrop-blur-sm hover:bg-black/60 hover:text-white',
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
                  'size-11 rounded-full border border-white/25 bg-black/40 text-white backdrop-blur-sm hover:bg-black/60 hover:text-white',
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

      {showcaseThumbs.length > 0 && (
        <div className="section-container relative z-20 -mt-24 md:-mt-28">
          <div className="mx-auto max-w-4xl">
            <div className="overflow-hidden rounded-hz bg-hz-elevated p-[3px] shadow-md ring-1 ring-hz-border/50">
              <div
                className="grid gap-[3px] bg-hz-elevated"
                style={{ gridTemplateColumns: `repeat(${showcaseThumbs.length}, minmax(0, 1fr))` }}
                role="list"
                aria-label="Property showcase preview"
              >
                {showcaseThumbs.map((thumb) => (
                  <div key={thumb.url} role="listitem" className="relative aspect-[5/4] w-full overflow-hidden bg-hz-elevated">
                    <img
                      src={thumb.url}
                      alt={thumb.alt}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
