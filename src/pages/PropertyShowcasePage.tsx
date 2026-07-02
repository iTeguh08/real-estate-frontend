import { useParams } from 'react-router-dom';
import { usePropertyDetailByIdQuery } from '@/hooks/queries';
import {
  PropertyShowcaseNotFound,
  PropertyShowcaseSkeleton,
  PropertyShowcaseView,
} from '@/components/property/PropertyShowcaseView';

export function PropertyShowcasePage() {
  const { id } = useParams<{ id: string }>();
  const { data: property, isLoading, isError } = usePropertyDetailByIdQuery(id);

  if (isLoading) {
    return (
      <main id="main-content">
        <PropertyShowcaseSkeleton />
      </main>
    );
  }

  if (isError || !property) {
    return <PropertyShowcaseNotFound />;
  }

  return (
    <main id="main-content" className="bg-white">
      <PropertyShowcaseView property={property} />
    </main>
  );
}
