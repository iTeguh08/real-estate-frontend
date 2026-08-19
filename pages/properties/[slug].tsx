import type { ComponentProps } from 'react';
import PropertyDetailPageImpl from '../../src/pages/properties/[slug]';

export { getStaticPaths, getStaticProps } from '@/lib/route-data/properties-slug';

export default function PropertyDetailPage(props: ComponentProps<typeof PropertyDetailPageImpl>) {
  return <PropertyDetailPageImpl {...props} />;
}
