import { PropertyIntroduction } from '@/components/property/PropertyIntroduction';
import {
  getPropertyOverviewBackgroundImage,
  PropertyOverviewBackground,
} from '@/components/property/PropertyOverviewBackground';
import { PropertyShowcaseSection } from '@/components/property/PropertyShowcaseSection';
import type { PropertyDetail } from '@/types';

export interface PropertyOverviewCanvasProps {
  property: PropertyDetail;
}

export function PropertyOverviewCanvas({ property }: PropertyOverviewCanvasProps) {
  const backgroundImage = getPropertyOverviewBackgroundImage(property);

  return (
    <div className="relative overflow-hidden bg-hz-elevated">
      {backgroundImage ? <PropertyOverviewBackground imageUrl={backgroundImage} /> : null}
      <PropertyIntroduction property={property} embedded />
      <PropertyShowcaseSection property={property} embedded />
    </div>
  );
}
