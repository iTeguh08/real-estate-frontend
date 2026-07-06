import { useCallback, useState } from 'react';
import { PropertyGalleryGrid } from '@/components/property/PropertyGalleryGrid';
import { PropertyInquiryDialogs } from '@/components/property/PropertyInquiryDialogs';
import { PropertyRelatedSection } from '@/components/property/PropertyRelatedSection';
import { PropertySpecsSection } from '@/components/property/PropertySpecsSection';
import { PropertyVillaCtaBanner } from '@/components/property/PropertyVillaCtaBanner';
import { PropertyVillaHero } from '@/components/property/PropertyVillaHero';
import { PropertyVillaEditorialSection } from '@/components/property/PropertyVillaEditorialSection';
import {
  PropertyVillaHighlights,
  type PropertyVillaUtilityAction,
} from '@/components/property/PropertyVillaHighlights';
import { useRelatedPropertiesQuery } from '@/hooks/queries';
import type { PropertyDetail } from '@/types';

export interface PropertyShowcaseVillaViewProps {
  property: PropertyDetail;
}

/**
 * Custom Layout 2 — the editorial "villa" template. Every section reuses the
 * exact copy, icons, colors, fonts and button actions from Custom Layout 1
 * (see `PropertyShowcaseView`'s classic view); only the position, grouping,
 * and shape of those pieces changes to match the reference layout. The
 * Specs/Amenities, Gallery, and Related sections are reused verbatim since
 * the reference doesn't call for a different shape there.
 */
export function PropertyShowcaseVillaView({ property }: PropertyShowcaseVillaViewProps) {
  const { data: related = [] } = useRelatedPropertiesQuery(property);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const handleScheduleViewing = useCallback(() => setScheduleOpen(true), []);
  const handleContactAgent = useCallback(() => setContactOpen(true), []);

  const handleUtilityAction = useCallback((actionId: PropertyVillaUtilityAction) => {
    if (actionId === 'inquire') {
      setContactOpen(true);
      return;
    }
    if (actionId === 'plan') {
      setScheduleOpen(true);
    }
  }, []);

  return (
    <>
      <PropertyVillaHero property={property} onScheduleViewing={handleScheduleViewing} />
      <PropertyVillaEditorialSection property={property} onUtilityAction={handleUtilityAction} />
      <PropertyVillaHighlights property={property} onUtilityAction={handleUtilityAction} />
      <PropertySpecsSection property={property} reserveFloatingBarSpace={false} />
      <PropertyGalleryGrid images={property.gallery} title={property.title} />
      <PropertyVillaCtaBanner
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
