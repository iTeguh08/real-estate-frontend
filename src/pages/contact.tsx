import Head from 'next/head';
import { useQueryClient } from '@tanstack/react-query';
import { ContactUsPage } from '@/pages/ContactUsPage';
import { useHydrateQueryCache } from '@/hooks/useHydrateQueryCache';
import type { ContactPageContent } from '@/data/cms-fallbacks';
import { absoluteUrl } from '@/lib/runtime-env';
import { queryKeys } from '@/lib/query-keys';
import { routes } from '@/lib/routes';

interface ContactPageProps {
  page: ContactPageContent;
  brand: string;
}

export default function ContactRoute({ page, brand }: ContactPageProps) {
  const queryClient = useQueryClient();
  useHydrateQueryCache(() => {
    queryClient.setQueryData(queryKeys.pages.contact(), page);
  });

  const title = `${page.headline} | ${brand}`;
  const description = page.tagline;
  const canonical = absoluteUrl(routes.contact) || routes.contact;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Head>
      <ContactUsPage />
    </>
  );
}
