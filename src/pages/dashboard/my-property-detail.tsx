import Head from 'next/head';
import dynamic from 'next/dynamic';
import { RequireAuth } from '@/components/auth/RequireAuth';
import { EditListingSkeleton, LoadingOverlay } from '@/components/skeletons';
import { absoluteUrl } from '@/lib/runtime-env';
import { routes } from '@/lib/routes';

const EditMyListingPage = dynamic(
  () => import('@/pages/EditMyListingPage').then((m) => ({ default: m.EditMyListingPage })),
  {
    ssr: false,
    loading: () => (
      <LoadingOverlay active minHeight="min-h-[calc(100dvh-var(--header-height,76px))]">
        <EditListingSkeleton />
      </LoadingOverlay>
    ),
  },
);

export default function MyPropertyDetailRoute() {
  const title = 'Property detail | Homzen';
  const description = 'View or edit a listing you own.';
  const canonical = absoluteUrl(routes.myProperty) || routes.myProperty;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <RequireAuth>
        <EditMyListingPage />
      </RequireAuth>
    </>
  );
}
