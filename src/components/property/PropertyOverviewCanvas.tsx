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
    <div className="relative -mt-4 overflow-hidden bg-hz-elevated pt-4 md:-mt-6 md:pt-6">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-20 bg-gradient-to-b from-transparent via-hz-elevated/55 to-hz-elevated md:h-28"
        aria-hidden="true"
      />
      {backgroundImage ? <PropertyOverviewBackground imageUrl={backgroundImage} /> : null}
      <div className="relative z-[2]">
        <PropertyIntroduction property={property} embedded />
        <PropertyShowcaseSection property={property} embedded />
      </div>
    </div>
  );
}
