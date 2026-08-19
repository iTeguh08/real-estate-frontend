
import type { GetStaticPaths, GetStaticProps } from 'next';
import { jsonSafe, withSsgFallback } from '@/lib/ssg';
import {
  getBestValueProperties,
  getFeaturedProperties,
  getPropertyDetailBySlug,
  getRelatedProperties,
} from '@/services/properties.service';
import type { Property, PropertyDetail } from '@/types';

const REVALIDATE_SECONDS = 60;

interface PropertyDetailPageProps {
  property: PropertyDetail;
  relatedProperties: Property[];
}

export const getStaticPaths: GetStaticPaths = async () => {
  const [featured, bestValue] = await Promise.all([
    withSsgFallback('featuredProperties', getFeaturedProperties, []),
    withSsgFallback('bestValueProperties', getBestValueProperties, []),
  ]);
  const slugs = [...new Set([...featured, ...bestValue].map((item) => item.slug).filter(Boolean))];

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<PropertyDetailPageProps> = async (context) => {
  const slug = typeof context.params?.slug === 'string' ? context.params.slug : '';
  if (!slug) {
    return { notFound: true, revalidate: REVALIDATE_SECONDS };
  }

  const property = await getPropertyDetailBySlug(slug);
  if (!property) {
    return { notFound: true, revalidate: REVALIDATE_SECONDS };
  }

  const relatedProperties = await getRelatedProperties(property);

  return {
    props: jsonSafe({ property, relatedProperties }),
    notFound: false,
    revalidate: REVALIDATE_SECONDS,
  };
};
