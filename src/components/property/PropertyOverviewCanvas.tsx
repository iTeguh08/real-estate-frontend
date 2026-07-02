import { PropertyIntroduction } from '@/components/property/PropertyIntroduction';
import {
  getPropertyOverviewBackgroundImage,
  PropertyOverviewBackground,
} from '@/components/property/PropertyOverviewBackground';
import { PropertyShowcaseSection } from '@/components/property/PropertyShowcaseSection';
import type { PropertyDetail } from '@/types';

export interface PropertyOverviewCanvasProps {
  property: PropertyDetail;
  onScheduleViewing?: () => void;
}

export function PropertyOverviewCanvas({
  property,
  onScheduleViewing,
}: PropertyOverviewCanvasProps) {
  const backgroundImage = getPropertyOverviewBackgroundImage(property);

  return (
    <div className="relative overflow-hidden bg-white">
      <PropertyOverviewBackground imageUrl={backgroundImage} />
      <PropertyIntroduction property={property} embedded />
      <PropertyShowcaseSection
        property={property}
        onScheduleViewing={onScheduleViewing}
        embedded
      />
    </div>
  );
}
