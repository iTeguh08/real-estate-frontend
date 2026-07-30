import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SectionAtmosphere } from '@/components/decor/SectionAtmosphere';
import { formatPropertyPrice } from '@/lib/format-property';
import { routes } from '@/lib/routes';
import type { PropertyDetail } from '@/types';

export interface PropertyVillaCtaBannerProps {
  property: Pick<
    PropertyDetail,
    'slug' | 'title' | 'layout2Media' | 'imageUrl' | 'price' | 'currency' | 'status'
  >;
  onScheduleViewing?: () => void;
  onContactAgent?: () => void;
}

/**
 * Bold color-block CTA banner — mirrors the reference image's dark full-bleed
 * banner shape, using `hz-dark` (already the accent color for Layout 1's
 * "Key Highlights" block) instead of introducing a new palette. Copy and the
 * two buttons are identical to Layout 1's `PropertyCtaSection`.
 */
export function PropertyVillaCtaBanner({
  property,
  onScheduleViewing,
  onContactAgent,
}: PropertyVillaCtaBannerProps) {
  return (
    <section aria-labelledby="property-villa-cta-heading" className="bg-hz-sunken py-16 md:py-24">
      <div className="section-container">
        <div className="grid overflow-hidden rounded-[1.75rem] shadow-xl lg:grid-cols-2">
          <div className="relative hidden min-h-[320px] lg:block">
            <img
              src={property.layout2Media.bannerUrl ?? property.imageUrl}
              alt={`${property.title} — schedule a viewing`}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <div className="relative flex flex-col justify-center overflow-hidden bg-hz-footer px-8 py-14 md:px-14 md:py-16">
            <SectionAtmosphere tone="dark" intensity="default" variant="edge" side="right" image="interior-dark" />
            <div className="relative z-10">
            <p className="font-poppins text-[11px] font-semibold uppercase tracking-[0.28em] text-hz-footer-fg/65">
              Ready to visit?
            </p>
            <h2
              id="property-villa-cta-heading"
              className="mt-4 font-poppins text-[clamp(1.5rem,3vw,2.25rem)] font-semibold uppercase leading-[1.1] tracking-[-0.02em] text-hz-footer-fg text-balance"
            >
              Schedule a private tour
            </h2>
            <p className="mt-5 font-poppins text-sm leading-[1.7] text-hz-footer-fg/75 text-pretty md:text-base">
              Listed at {formatPropertyPrice(property)} — our team can arrange an in-person or
              virtual viewing of {property.title} at your convenience.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                type="button"
                onClick={onScheduleViewing}
                className="h-auto rounded-hz bg-hz-primary px-8 py-3 font-poppins text-sm font-semibold text-white hover:bg-hz-primary-hover"
              >
                Schedule a Viewing
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onContactAgent}
                className="h-auto rounded-hz border-hz-footer-fg/30 bg-transparent px-8 py-3 font-poppins text-sm font-medium text-hz-footer-fg hover:border-hz-footer-fg hover:bg-hz-elevated/10 hover:text-hz-footer-fg"
              >
                Contact an Agent
              </Button>
            </div>
            <p className="mt-5 font-poppins text-xs text-hz-footer-fg/55">
              Selling something similar?{' '}
              <Link
                to={`${routes.submitProperty}?property=${encodeURIComponent(property.slug)}`}
                className="font-medium text-hz-footer-fg no-underline hover:underline"
              >
                List your property
              </Link>
            </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
