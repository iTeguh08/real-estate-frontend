import Head from 'next/head';
import { useQueryClient } from '@tanstack/react-query';
import { LegalDocumentPage } from '@/pages/LegalDocumentPage';
import { useHydrateQueryCache } from '@/hooks/useHydrateQueryCache';
import type { PrivacyPageContent } from '@/data/cms-fallbacks';
import { absoluteUrl } from '@/lib/runtime-env';
import { queryKeys } from '@/lib/query-keys';
import { routes } from '@/lib/routes';

interface TermsPageProps {
  page: PrivacyPageContent;
  brand: string;
}

export default function TermsRoute({ page, brand }: TermsPageProps) {
  const queryClient = useQueryClient();
  useHydrateQueryCache(() => {
    queryClient.setQueryData(queryKeys.pages.terms(), page);
  });

  const title = `${page.title} | ${brand}`;
  const description = page.copy.replace(/<[^>]+>/g, '').slice(0, 160);
  const canonical = absoluteUrl(routes.terms) || routes.terms;

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
      <LegalDocumentPage kind="terms" />
    </>
  );
}
