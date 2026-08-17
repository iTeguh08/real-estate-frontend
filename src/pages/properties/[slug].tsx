import Head from 'next/head';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { useQueryClient } from '@tanstack/react-query';
import { PropertyDetailView } from '@/modules/property/views/PropertyDetailView';
import { useHydrateQueryCache } from '@/hooks/useHydrateQueryCache';
import { queryKeys } from '@/lib/query-keys';
import { absoluteUrl } from '@/lib/runtime-env';
import { routes } from '@/lib/routes';
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

function metaDescription(property: PropertyDetail): string {
  const raw = property.tagline || property.description || `${property.title} listed with Homzen.`;
  return raw.replace(/\s+/g, ' ').trim().slice(0, 180);
}

export default function PropertyDetailPage({ property, relatedProperties }: PropertyDetailPageProps) {
  const queryClient = useQueryClient();
  useHydrateQueryCache(() => {
    queryClient.setQueryData(queryKeys.properties.detail(property.slug), property);
    queryClient.setQueryData(queryKeys.properties.related(property.id), relatedProperties);
  });

  const title = `${property.title} | Homzen`;
  const description = metaDescription(property);
  const canonical = absoluteUrl(routes.property(property.slug)) || routes.property(property.slug);
  const ogImage = absoluteUrl(property.imageUrl);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {ogImage ? <meta property="og:image" content={ogImage} /> : null}
        <meta property="og:url" content={canonical} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        {ogImage ? <meta name="twitter:image" content={ogImage} /> : null}
      </Head>
      <PropertyDetailView property={property} relatedProperties={relatedProperties} />
    </>
  );
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
    revalidate: REVALIDATE_SECONDS,
  };
};
