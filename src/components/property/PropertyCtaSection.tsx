import { Button } from '@/components/ui/button';
import { formatPropertyPrice } from '@/lib/format-property';
import type { PropertyDetail } from '@/types';

export interface PropertyCtaSectionProps {
  property: PropertyDetail;
  onScheduleViewing?: () => void;
  onContactAgent?: () => void;
}

export function PropertyCtaSection({
  property,
  onScheduleViewing,
  onContactAgent,
}: PropertyCtaSectionProps) {
  return (
    <section aria-labelledby="property-cta-heading" className="bg-[#F8F8F8] py-20 md:py-28">
      <div className="section-container">
        <div className="grid overflow-hidden rounded-hz border border-hz-border bg-white shadow-sm lg:grid-cols-2">
          <div className="relative hidden min-h-[280px] lg:block">
            <img
              src={property.featureImageUrl}
              alt={`${property.title} — schedule a viewing`}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-hz-dark/30" aria-hidden="true" />
          </div>

          <div className="flex flex-col justify-center px-8 py-12 md:px-12 md:py-16">
            <p className="font-poppins text-[11px] font-semibold uppercase tracking-[0.28em] text-hz-primary">
              Ready to visit?
            </p>
            <h2
              id="property-cta-heading"
              className="mt-4 font-poppins text-[clamp(1.5rem,3vw,2.25rem)] font-semibold uppercase leading-[1.1] tracking-[-0.02em] text-hz-dark text-balance"
            >
              Schedule a private tour
            </h2>
            <p className="mt-5 font-poppins text-sm leading-[1.7] text-hz-body text-pretty md:text-base">
              Listed at {formatPropertyPrice(property)} — our team can arrange an in-person or virtual
              viewing of {property.title} at your convenience.
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
                className="h-auto rounded-hz border-hz-border px-8 py-3 font-poppins text-sm font-medium text-hz-dark hover:border-hz-primary hover:text-hz-primary"
              >
                Contact an Agent
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
