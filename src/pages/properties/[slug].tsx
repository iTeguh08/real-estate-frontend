import Head from 'next/head';
import { useQueryClient } from '@tanstack/react-query';
import { PropertyDetailView } from '@/modules/property/views/PropertyDetailView';
import { useHydrateQueryCache } from '@/hooks/useHydrateQueryCache';
import { queryKeys } from '@/lib/query-keys';
import { absoluteUrl } from '@/lib/runtime-env';
import { routes } from '@/lib/routes';
import { jsonLdScriptContent, propertyListingJsonLd } from '@/lib/seo-json-ld';
import type { Property, PropertyDetail } from '@/types';

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLdScriptContent(propertyListingJsonLd(property)),
          }}
        />
      </Head>
      <PropertyDetailView property={property} relatedProperties={relatedProperties} />
    </>
  );
}
