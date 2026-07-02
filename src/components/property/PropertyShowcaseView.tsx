import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PropertyCtaSection } from '@/components/property/PropertyCtaSection';
import { PropertyDetailHero } from '@/components/property/PropertyDetailHero';
import { PropertyFeaturesBlock } from '@/components/property/PropertyFeaturesBlock';
import { PropertyGalleryGrid } from '@/components/property/PropertyGalleryGrid';
import { PropertyOverviewCanvas } from '@/components/property/PropertyOverviewCanvas';
import { PropertyRelatedSection } from '@/components/property/PropertyRelatedSection';
import { PropertySpecsSection } from '@/components/property/PropertySpecsSection';
import { PropertyUtilityBar } from '@/components/property/PropertyUtilityBar';
import { useRelatedPropertiesQuery } from '@/hooks/queries';
import { routes } from '@/lib/routes';
import type { PropertyDetail } from '@/types';

export interface PropertyShowcaseViewProps {
  property: PropertyDetail;
}

export function PropertyShowcaseView({ property }: PropertyShowcaseViewProps) {
  const { data: related = [] } = useRelatedPropertiesQuery(property);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const handleScheduleViewing = useCallback(() => setScheduleOpen(true), []);
  const handleContactAgent = useCallback(() => setContactOpen(true), []);

  const handleUtilityAction = useCallback(
    (actionId: 'plan' | 'inquire' | 'location') => {
      if (actionId === 'inquire') {
        setContactOpen(true);
        return;
      }
      if (actionId === 'plan') {
        setScheduleOpen(true);
      }
    },
    []
  );

  return (
    <>
      <div className="relative">
        <Link
          to={{ pathname: routes.home, hash: 'listings' }}
          className="absolute top-4 left-5 z-30 inline-flex items-center gap-2 rounded-hz bg-black/40 px-3 py-2 font-poppins text-sm text-white no-underline backdrop-blur-sm transition-colors hover:bg-black/60 md:left-10 md:top-6"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to listings
        </Link>

        <PropertyDetailHero property={property} />
      </div>

      <PropertyOverviewCanvas
        property={property}
        onScheduleViewing={handleScheduleViewing}
      />

      <div className="relative mb-6 md:mb-8">
        <PropertyFeaturesBlock property={property}>
          <PropertyUtilityBar
            property={property}
            onUtilityAction={handleUtilityAction}
            variant="floating"
          />
        </PropertyFeaturesBlock>
      </div>

      <PropertySpecsSection property={property} />
      <PropertyGalleryGrid images={property.gallery} title={property.title} />
      <PropertyCtaSection
        property={property}
        onScheduleViewing={handleScheduleViewing}
        onContactAgent={handleContactAgent}
      />
      <PropertyRelatedSection properties={related} currentPropertyId={property.id} />

      <Dialog open={scheduleOpen} onOpenChange={setScheduleOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-poppins text-hz-dark">Schedule a Viewing</DialogTitle>
            <DialogDescription className="font-poppins text-hz-muted">
              Request a private tour for {property.title}. Our team will confirm your preferred date
              and time.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              onClick={() => setScheduleOpen(false)}
              className="h-auto rounded-hz bg-hz-primary px-6 py-2.5 font-poppins text-sm font-semibold text-white hover:bg-hz-primary-hover"
            >
              Submit Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={contactOpen} onOpenChange={setContactOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-poppins text-hz-dark">Contact an Agent</DialogTitle>
            <DialogDescription className="font-poppins text-hz-muted">
              Get in touch about {property.title} at {property.location}.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              onClick={() => setContactOpen(false)}
              className="h-auto rounded-hz bg-hz-primary px-6 py-2.5 font-poppins text-sm font-semibold text-white hover:bg-hz-primary-hover"
            >
              Send Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function PropertyShowcaseSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="min-h-[70vh] bg-hz-bg-soft" />
      <div className="section-container space-y-4 py-24">
        <div className="mx-auto h-8 w-64 rounded-hz bg-hz-bg-soft" />
        <div className="mx-auto h-4 w-full max-w-lg rounded-hz bg-hz-bg-soft" />
        <div className="mx-auto h-4 w-full max-w-md rounded-hz bg-hz-bg-soft" />
      </div>
    </div>
  );
}

export function PropertyShowcaseNotFound() {
  return (
    <main id="main-content" className="section-container py-20 text-center">
      <h1 className="font-poppins text-2xl font-semibold text-hz-dark">Property not found</h1>
      <p className="mt-2 font-poppins text-sm text-hz-muted">
        This listing may have been removed or the link is incorrect.
      </p>
      <Link
        to={routes.home}
        className="mt-6 inline-flex items-center gap-2 font-poppins text-sm font-semibold text-hz-primary no-underline hover:underline"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        Back to home
      </Link>
    </main>
  );
}
