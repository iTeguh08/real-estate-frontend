import { PropertyShowcaseView } from '@/components/property/PropertyShowcaseView';
import type { Property, PropertyDetail } from '@/types';

export interface PropertyDetailViewProps {
  property: PropertyDetail;
  relatedProperties?: Property[];
}

export function PropertyDetailView({ property }: PropertyDetailViewProps) {
  return (
    <main id="main-content" className="overflow-x-clip bg-hz-elevated">
      <PropertyShowcaseView property={property} />
    </main>
  );
}
