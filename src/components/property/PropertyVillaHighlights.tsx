import { ChatsCircle } from '@phosphor-icons/react';
import { Check } from 'lucide-react';
import { MediaImage } from '@/components/ui/media-image';
import { mediaOriginalUrl, propertyOriginalUrl } from '@/lib/image-url';
import { VILLA_EDITORIAL_GUTTERS } from '@/lib/property-layout';
import type { PropertyDetail } from '@/types';

export type PropertyVillaUtilityAction = 'schedule' | 'inquire' | 'location';

export interface PropertyVillaHighlightsProps {
  property: Pick<PropertyDetail, 'title' | 'features' | 'layout2Media' | 'imageUrl' | 'imageUrlOriginal'>;
  onUtilityAction?: (actionId: PropertyVillaUtilityAction) => void;
}

function UtilityPillButton({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex w-full items-center justify-center gap-2 rounded-hz border border-hz-border bg-hz-page px-5 py-2.5 font-poppins text-sm font-medium text-hz-ink transition-colors duration-200 hover:border-hz-primary hover:text-hz-primary sm:w-auto"
    >
      {icon}
      {label}
    </button>
  );
}

/**
 * Layout 2 key highlights — soft recessed band (sunken) with elevated media.
 * Uses Homzen semantic surfaces so light/dark contrast stays intentional.
 */
export function PropertyVillaHighlights({ property, onUtilityAction }: PropertyVillaHighlightsProps) {
  const { title, features, layout2Media } = property;
  const bottomImage = layout2Media.bannerUrl
    ? mediaOriginalUrl(layout2Media.bannerUrl, layout2Media.bannerUrlOriginal)
    : propertyOriginalUrl(property);

  return (
    <section
      aria-labelledby="property-villa-key-highlights-heading"
      className="bg-hz-sunken py-12 md:py-16"
    >
      <div className={VILLA_EDITORIAL_GUTTERS}>
        <div className="grid items-center gap-10 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-x-16 lg:gap-y-10 xl:gap-x-20">
          <div className="relative aspect-video overflow-hidden rounded-hz border border-hz-border bg-hz-elevated shadow-hz-sm">
            <MediaImage
              src={bottomImage}
              alt={`${title} — featured exterior`}
              loading="lazy"
              decoding="async"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <p className="font-poppins text-[11px] font-semibold uppercase tracking-[0.28em] text-hz-primary">
              Key Highlights
            </p>
            <h2
              id="property-villa-key-highlights-heading"
              className="mt-3 font-poppins text-[clamp(1.5rem,3vw,2.25rem)] font-semibold uppercase leading-[1.1] tracking-[-0.02em] text-hz-ink text-balance"
            >
              What makes this home stand out
            </h2>
            <p className="mt-3 max-w-lg font-poppins text-sm leading-[1.7] text-hz-body text-pretty md:text-base">
              Curated finishes and practical upgrades across {title} — refined from the first
              walk-through.
            </p>
            <ul className="mt-5 space-y-3" role="list">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-hz-primary text-white"
                    aria-hidden="true"
                  >
                    <Check size={12} strokeWidth={2.5} />
                  </span>
                  <span className="font-poppins text-sm leading-relaxed text-hz-ink">{feature}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <UtilityPillButton
                icon={<ChatsCircle size={16} weight="fill" aria-hidden="true" />}
                label="Ask an Agent"
                onClick={() => onUtilityAction?.('inquire')}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
