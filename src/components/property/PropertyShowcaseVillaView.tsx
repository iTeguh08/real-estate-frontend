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
import { formatPropertyLocation } from '@/lib/format-property';
import type { PropertyDetail } from '@/types';

export interface PropertyShowcaseVillaViewProps {
  property: PropertyDetail;
}

/**
 * Custom Layout 2 — the editorial "villa" template. Gallery, Specs, and Related
 * match Layout 1 order (Gallery → Property Details → Schedule CTA); only hero /
 * editorial / highlights / CTA shell change shape.
 */
export function PropertyShowcaseVillaView({ property }: PropertyShowcaseVillaViewProps) {
  const { data: related = [] } = useRelatedPropertiesQuery(property);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const handleScheduleViewing = useCallback(() => setScheduleOpen(true), []);
  const handleContactAgent = useCallback(() => setContactOpen(true), []);

  const handleUtilityAction = useCallback(
    (actionId: PropertyVillaUtilityAction) => {
      if (actionId === 'inquire') {
        setContactOpen(true);
        return;
      }
      if (actionId === 'schedule') {
        setScheduleOpen(true);
        return;
      }
      if (actionId === 'location') {
        const query = formatPropertyLocation(property);
        if (!query) return;
        window.open(
          `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`,
          '_blank',
          'noopener,noreferrer'
        );
      }
    },
    [property]
  );

  return (
    <>
      <PropertyVillaHero property={property} onScheduleViewing={handleScheduleViewing} />
      <PropertyVillaEditorialSection property={property} onUtilityAction={handleUtilityAction} />
      <PropertyVillaHighlights property={property} onUtilityAction={handleUtilityAction} />
      <PropertyGalleryGrid images={property.gallery} title={property.title} />
      <PropertySpecsSection property={property} />
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
