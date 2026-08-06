import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MediaImage } from '@/components/ui/media-image';
import { formatPropertyPrice } from '@/lib/format-property';
import { mediaOriginalUrl, propertyOriginalUrl } from '@/lib/image-url';
import { routes } from '@/lib/routes';
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
  const bannerSrc = property.layout1Media.bannerUrl
    ? mediaOriginalUrl(property.layout1Media.bannerUrl, property.layout1Media.bannerUrlOriginal)
    : propertyOriginalUrl(property);

  return (
    <section aria-labelledby="property-cta-heading" className="bg-hz-sunken pt-5 pb-20 md:pt-6 md:pb-24">
      <div className="section-container">
        <div className="grid overflow-hidden rounded-hz bg-hz-elevated lg:grid-cols-2">
          <div className="relative hidden min-h-[280px] lg:block">
            <MediaImage
              src={bannerSrc}
              alt={`${property.title} — schedule a viewing`}
              loading="lazy"
              decoding="async"
              className="object-cover"
              wrapperClassName="absolute inset-0"
            />
            <div className="absolute inset-0 bg-hz-inverse/30" aria-hidden="true" />
          </div>

          <div className="flex flex-col justify-center px-8 py-12 md:px-12 md:py-16">
            <p className="hz-eyebrow mb-2 text-hz-primary">
              Ready to visit?
            </p>
            <h2
              id="property-cta-heading"
              className="hz-section-title text-balance text-hz-dark"
            >
              Schedule a private tour
            </h2>
            <p className="hz-lead mt-5 text-pretty text-hz-body">
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
            <p className="mt-5 font-poppins text-xs text-hz-muted">
              Selling something similar?{' '}
              <Link
                to={`${routes.submitProperty}?property=${encodeURIComponent(property.slug)}`}
                className="font-medium text-hz-primary no-underline hover:underline"
              >
                List your property
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
