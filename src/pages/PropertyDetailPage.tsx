import { useParams } from 'react-router-dom';
import { usePropertyDetailQuery } from '@/hooks/queries';
import { LoadingOverlay, PropertyDetailSkeleton } from '@/components/skeletons';
import {
  PropertyShowcaseNotFound,
  PropertyShowcaseView,
} from '@/components/property/PropertyShowcaseView';

export function PropertyDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: property, isPending, isError } = usePropertyDetailQuery(slug);

  if (isPending) {
    return (
      <LoadingOverlay active minHeight="min-h-[calc(100dvh-var(--header-height,76px))]">
        <main id="main-content">
          <PropertyDetailSkeleton />
        </main>
      </LoadingOverlay>
    );
  }

  if (isError || !property) {
    return <PropertyShowcaseNotFound />;
  }

  return (
    <main id="main-content" className="overflow-x-clip bg-hz-elevated">
      <PropertyShowcaseView property={property} />
    </main>
  );
}
