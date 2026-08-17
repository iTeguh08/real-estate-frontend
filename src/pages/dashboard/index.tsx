import Head from 'next/head';
import dynamic from 'next/dynamic';
import { RequireAuth } from '@/components/auth/RequireAuth';
import { PageLoader } from '@/components/skeletons';
import { absoluteUrl } from '@/lib/runtime-env';
import { routes } from '@/lib/routes';

const DashboardPage = dynamic(
  () => import('@/pages/DashboardPage').then((m) => ({ default: m.DashboardPage })),
  { ssr: false, loading: () => <PageLoader variant="route" /> }
);

export default function DashboardRoute() {
  const title = 'Dashboard | Homzen';
  const description = 'Your Homzen member dashboard.';
  const canonical = absoluteUrl(routes.dashboard) || routes.dashboard;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <RequireAuth>
        <DashboardPage />
      </RequireAuth>
    </>
  );
}
