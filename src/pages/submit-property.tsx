import Head from 'next/head';
import dynamic from 'next/dynamic';
import { RequireAuth } from '@/components/auth/RequireAuth';
import { PageLoader } from '@/components/skeletons';
import { absoluteUrl } from '@/lib/runtime-env';
import { routes } from '@/lib/routes';

const SubmitPropertyPage = dynamic(
  () =>
    import('@/pages/SubmitPropertyPage').then((m) => ({ default: m.SubmitPropertyPage })),
  { ssr: false, loading: () => <PageLoader variant="route" /> }
);

export default function SubmitPropertyRoute() {
  const title = 'Submit Property | Homzen';
  const description = 'Submit a property listing for Homzen CMS review.';
  const canonical = absoluteUrl(routes.submitProperty) || routes.submitProperty;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <RequireAuth>
        <SubmitPropertyPage />
      </RequireAuth>
    </>
  );
}
