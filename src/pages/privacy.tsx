import Head from 'next/head';
import { useQueryClient } from '@tanstack/react-query';
import { LegalDocumentPage } from '@/pages/LegalDocumentPage';
import { useHydrateQueryCache } from '@/hooks/useHydrateQueryCache';
import type { PrivacyPageContent } from '@/data/cms-fallbacks';
import { absoluteUrl } from '@/lib/runtime-env';
import { queryKeys } from '@/lib/query-keys';
import { routes } from '@/lib/routes';

interface PrivacyPageProps {
  page: PrivacyPageContent;
  brand: string;
}

export default function PrivacyRoute({ page, brand }: PrivacyPageProps) {
  const queryClient = useQueryClient();
  useHydrateQueryCache(() => {
    queryClient.setQueryData(queryKeys.pages.privacy(), page);
  });

  const title = `${page.title} | ${brand}`;
  // ponytail: plain-text meta from CMS HTML; richer excerpt if SEO fields land
  const description = page.copy.replace(/<[^>]+>/g, '').slice(0, 160);
  const canonical = absoluteUrl(routes.privacy) || routes.privacy;

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
      <LegalDocumentPage kind="privacy" />
    </>
  );
}
