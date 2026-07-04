import { Bed, Bathtub, ArrowsOut } from '@phosphor-icons/react';
import { VILLA_EDITORIAL_GUTTERS } from '@/lib/property-layout';
import type { PropertyDetail } from '@/types';

export interface PropertyVillaOverviewStripProps {
  property: Pick<PropertyDetail, 'title' | 'description' | 'specs' | 'type' | 'showcaseImages' | 'imageUrl'>;
}

/**
 * Section below the villa hero — asymmetric portrait image + overview copy,
 * inset with the same side gutters as the hero and sharp-cornered imagery
 * (reference: "The Eight Projects" row).
 */
export function PropertyVillaOverviewStrip({ property }: PropertyVillaOverviewStripProps) {
  const { title, description, specs, type, showcaseImages, imageUrl } = property;
  const portraitImage = showcaseImages[0]?.url ?? imageUrl;

  return (
    <section aria-labelledby="property-villa-overview-heading" className="bg-white pt-12 pb-8 md:pt-16 md:pb-10">
      <div className={VILLA_EDITORIAL_GUTTERS}>
        <div className="grid items-start gap-10 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-14">
          <div className="relative w-[min(78vw,240px)] shrink-0 sm:w-[260px] md:w-[290px] lg:w-[320px]">
            <div
              className="absolute -top-3 -left-3 hidden h-[48%] w-[70%] bg-[#F8F8F8] lg:block"
              aria-hidden="true"
            />
            <div className="relative aspect-[3/5] overflow-hidden">
              <img
                src={portraitImage}
                alt={`${title} — property overview`}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div>
            <h2
              id="property-villa-overview-heading"
              className="font-poppins text-[11px] font-semibold uppercase tracking-[0.28em] text-hz-primary"
            >
              Property Overview
            </h2>
            <p className="mt-4 font-poppins text-[clamp(1.25rem,2.5vw,1.75rem)] font-semibold uppercase leading-[1.15] tracking-[-0.02em] text-hz-dark text-balance">
              {title}
            </p>
            <p className="mt-4 max-w-lg font-poppins text-sm leading-[1.7] text-hz-body text-pretty md:text-base">
              {description}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden border border-hz-border bg-hz-border sm:grid-cols-4">
              <div className="flex flex-col items-center gap-1 bg-white px-3 py-4 text-center">
                <Bed size={20} weight="fill" className="text-hz-dark" aria-hidden="true" />
                <span className="font-poppins text-base font-semibold text-hz-dark">{specs.beds}</span>
                <span className="font-poppins text-[10px] uppercase tracking-wider text-hz-muted">Beds</span>
              </div>
              <div className="flex flex-col items-center gap-1 bg-white px-3 py-4 text-center">
                <Bathtub size={20} weight="fill" className="text-hz-dark" aria-hidden="true" />
                <span className="font-poppins text-base font-semibold text-hz-dark">{specs.baths}</span>
                <span className="font-poppins text-[10px] uppercase tracking-wider text-hz-muted">Baths</span>
              </div>
              <div className="flex flex-col items-center gap-1 bg-white px-3 py-4 text-center">
                <ArrowsOut size={20} weight="fill" className="text-hz-dark" aria-hidden="true" />
                <span className="font-poppins text-base font-semibold text-hz-dark">
                  {specs.sqft.toLocaleString()}
                </span>
                <span className="font-poppins text-[10px] uppercase tracking-wider text-hz-muted">Sq Ft</span>
              </div>
              <div className="flex flex-col items-center gap-1 bg-white px-3 py-4 text-center">
                <span className="font-poppins text-base font-semibold text-hz-dark">{type}</span>
                <span className="font-poppins text-[10px] uppercase tracking-wider text-hz-muted">Type</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
