import Head from 'next/head';
import dynamic from 'next/dynamic';
import { RequireAuth } from '@/components/auth/RequireAuth';
import { DashboardSkeleton, LoadingOverlay } from '@/components/skeletons';
import { absoluteUrl } from '@/lib/runtime-env';
import { routes } from '@/lib/routes';

const MyListingsPage = dynamic(
  () => import('@/pages/MyListingsPage').then((m) => ({ default: m.MyListingsPage })),
  {
    ssr: false,
    loading: () => (
      <LoadingOverlay active minHeight="min-h-[calc(100dvh-var(--header-height,76px))]">
        <DashboardSkeleton />
      </LoadingOverlay>
    ),
  },
);

export default function MyPropertyRoute() {
  const title = 'My Property | Homzen';
  const description = 'Manage your Homzen property submissions and listings.';
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
        <MyListingsPage />
      </RequireAuth>
    </>
  );
}
