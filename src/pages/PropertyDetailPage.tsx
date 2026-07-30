import { useParams } from 'react-router-dom';
import { usePropertyDetailQuery } from '@/hooks/queries';
import {
  PropertyShowcaseNotFound,
  PropertyShowcaseSkeleton,
  PropertyShowcaseView,
} from '@/components/property/PropertyShowcaseView';

export function PropertyDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: property, isLoading, isError } = usePropertyDetailQuery(slug);

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
    <main id="main-content" className="bg-hz-elevated">
      <PropertyShowcaseView property={property} />
    </main>
  );
}
