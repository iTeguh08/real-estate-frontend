import dynamic from 'next/dynamic';
import { lazy, Suspense, useCallback, useState } from 'react';
import { AppLink } from '@/lib/app-link';
import { ArrowLeft } from 'lucide-react';
import { PropertyContactStrip } from '@/components/property/PropertyContactStrip';
import { PropertyCtaSection } from '@/components/property/PropertyCtaSection';
import { PropertyDetailHero } from '@/components/property/PropertyDetailHero';
import { PropertyFeaturesBlock } from '@/components/property/PropertyFeaturesBlock';
import { PropertyGalleryGrid } from '@/components/property/PropertyGalleryGrid';
import { PropertyOverviewCanvas } from '@/components/property/PropertyOverviewCanvas';
import { PropertyRelatedSection } from '@/components/property/PropertyRelatedSection';
import { PropertySpecsSection } from '@/components/property/PropertySpecsSection';
import { PropertyShowcaseSkeleton } from '@/components/skeletons/PropertyShowcaseSkeleton';
import { useRelatedPropertiesQuery } from '@/hooks/queries';
import { resolvePropertyCustomLayout } from '@/lib/property-layout';
import { routes } from '@/lib/routes';
import type { PropertyDetail } from '@/types';

const PropertyShowcaseVillaView = lazy(() =>
  import('@/components/property/PropertyShowcaseVillaView').then((m) => ({
    default: m.PropertyShowcaseVillaView,
  }))
);

const PropertyInquiryDialogs = dynamic(
  () => import('@/components/property/PropertyInquiryDialogs').then((m) => m.PropertyInquiryDialogs),
  { ssr: false },
);

export interface PropertyShowcaseViewProps {
  property: PropertyDetail;
}

/**
 * Entry point for the property detail page. Picks between the CMS-driven
 * "Custom Layout" templates — see `resolvePropertyCustomLayout`.
 */
export function PropertyShowcaseView({ property }: PropertyShowcaseViewProps) {
  const layout = resolvePropertyCustomLayout(property);

  if (layout === 'layout-2') {
    return (
      <Suspense fallback={<PropertyShowcaseSkeleton />}>
        <PropertyShowcaseVillaView property={property} />
      </Suspense>
    );
  }

  return <PropertyShowcaseClassicView property={property} />;
}

/**
 * Custom Layout 1 — hybrid listing detail:
 * Hero → Overview + visual essay → Features → Gallery → Specs → CTA → Related
 */
function PropertyShowcaseClassicView({ property }: PropertyShowcaseViewProps) {
  const { data: related = [] } = useRelatedPropertiesQuery(property);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const handleScheduleViewing = useCallback(() => setScheduleOpen(true), []);
  const handleContactAgent = useCallback(() => setContactOpen(true), []);

  return (
    <>
      <div className="relative">
        <PropertyDetailHero property={property} onScheduleViewing={handleScheduleViewing} />
      </div>

      <PropertyOverviewCanvas property={property} />

      <PropertyFeaturesBlock property={property} />

      <PropertyContactStrip
        property={property}
        onScheduleViewing={handleScheduleViewing}
        onContactAgent={handleContactAgent}
      />

      <PropertyGalleryGrid images={property.gallery} title={property.title} />

      <PropertySpecsSection property={property} />

      <PropertyCtaSection
        property={property}
        onScheduleViewing={handleScheduleViewing}
        onContactAgent={handleContactAgent}
      />

      <PropertyRelatedSection properties={related} currentPropertyId={property.id} />

      <PropertyInquiryDialogs
        property={property}
        scheduleOpen={scheduleOpen}
        onScheduleOpenChange={setScheduleOpen}
        contactOpen={contactOpen}
        onContactOpenChange={setContactOpen}
      />
    </>
  );
}

export { PropertyShowcaseSkeleton };

export function PropertyShowcaseNotFound() {
  return (
    <main id="main-content" className="section-container py-20 text-center">
      <h1 className="font-poppins text-2xl font-semibold text-hz-dark">Property not found</h1>
      <p className="mt-2 font-poppins text-sm text-hz-muted">
        This listing may have been removed or the link is incorrect.
      </p>
      <AppLink
        to={routes.home}
        className="mt-6 inline-flex items-center gap-2 font-poppins text-sm font-semibold text-hz-primary no-underline hover:underline"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        Back to home
      </AppLink>
    </main>
  );
}
