import { Blueprint, ChatsCircle, MapPin } from '@phosphor-icons/react';
import { Check } from 'lucide-react';
import { VILLA_EDITORIAL_GUTTERS } from '@/lib/property-layout';
import type { PropertyDetail } from '@/types';

export type PropertyVillaUtilityAction = 'plan' | 'inquire' | 'location';

export interface PropertyVillaHighlightsProps {
  property: Pick<
    PropertyDetail,
    'title' | 'tagline' | 'features' | 'showcaseImages' | 'featureImageUrl' | 'imageUrl'
  >;
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
      className="inline-flex items-center gap-2 rounded-hz border border-hz-border bg-white px-5 py-2.5 font-poppins text-sm font-medium text-hz-dark transition-colors duration-200 hover:border-hz-primary hover:text-hz-primary"
    >
      {icon}
      {label}
    </button>
  );
}

/**
 * Second villa editorial row — text left, wide landscape image right, then
 * inverted row below. Same inset width as hero, sharp-cornered imagery.
 */
export function PropertyVillaHighlights({ property, onUtilityAction }: PropertyVillaHighlightsProps) {
  const { title, tagline, features, showcaseImages, featureImageUrl, imageUrl } = property;
  const wideImage = showcaseImages[1]?.url ?? showcaseImages[0]?.url ?? imageUrl;
  const bottomImage = featureImageUrl ?? imageUrl;

  return (
    <section aria-labelledby="property-villa-highlights-heading" className="bg-white pb-12 md:pb-16">
      <div className={VILLA_EDITORIAL_GUTTERS}>
        {/* Row 1 — text left, horizontal image right (pulled up like reference) */}
        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,0.76fr)_minmax(0,1.24fr)] lg:gap-12">
          <div className="flex flex-col justify-center pb-2 lg:pb-6">
            <p className="font-poppins text-[11px] font-semibold uppercase tracking-[0.28em] text-hz-primary">
              Interior &amp; Lifestyle
            </p>
            <h2
              id="property-villa-highlights-heading"
              className="mt-3 font-poppins text-[clamp(1.5rem,3vw,2.25rem)] font-semibold uppercase leading-[1.1] tracking-[-0.02em] text-hz-dark text-balance"
            >
              Designed for everyday luxury
            </h2>
            <p className="mt-4 max-w-lg font-poppins text-sm leading-[1.7] text-hz-body text-pretty md:text-base">
              {tagline}. Every room is arranged to maximize light, flow, and comfort.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <UtilityPillButton
                icon={<Blueprint size={16} weight="fill" aria-hidden="true" />}
                label="Floor Plan"
                onClick={() => onUtilityAction?.('plan')}
              />
              <UtilityPillButton
                icon={<MapPin size={16} weight="fill" aria-hidden="true" />}
                label="View Location"
                onClick={() => onUtilityAction?.('location')}
              />
            </div>
          </div>

          <div className="-mt-10 aspect-[16/10] w-full overflow-hidden sm:-mt-14 md:-mt-20 md:aspect-[3/2] lg:-mt-28 lg:min-h-[300px] xl:-mt-32 xl:min-h-[440px]">
            <img
              src={wideImage}
              alt={`${title} — landscape view`}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Row 2 — image left, text right */}
        <div className="mt-12 grid items-center gap-10 lg:mt-16 lg:grid-cols-2 lg:gap-14">
          <div className="aspect-[16/10] overflow-hidden md:aspect-[16/11] lg:order-1">
            <img
              src={bottomImage}
              alt={`${title} — featured exterior`}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center lg:order-2">
            <p className="font-poppins text-[11px] font-semibold uppercase tracking-[0.28em] text-hz-primary">
              Key Highlights
            </p>
            <p className="mt-3 max-w-lg font-poppins text-sm leading-[1.7] text-hz-body text-pretty md:text-base">
              Curated finishes and practical upgrades across {title} — refined from the first
              walk-through.
            </p>
            <ul className="mt-5 space-y-3" role="list">
              {features.slice(0, 3).map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-hz bg-hz-primary/10 text-hz-primary"
                    aria-hidden="true"
                  >
                    <Check size={12} strokeWidth={2.5} />
                  </span>
                  <span className="font-poppins text-sm leading-relaxed text-hz-body">{feature}</span>
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
