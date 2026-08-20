import Head from 'next/head';
import dynamic from 'next/dynamic';
import { RequireAuth } from '@/components/auth/RequireAuth';
import { CompareTableSkeleton, LoadingOverlay } from '@/components/skeletons';
import { absoluteUrl } from '@/lib/runtime-env';
import { routes } from '@/lib/routes';

const ComparePage = dynamic(
  () => import('@/pages/ComparePage').then((m) => ({ default: m.ComparePage })),
  {
    ssr: false,
    loading: () => (
      <LoadingOverlay active minHeight="min-h-[calc(100dvh-var(--header-height,76px))]">
        <main id="main-content" className="bg-hz-elevated py-10 md:py-16">
          <div className="section-container">
            <CompareTableSkeleton />
          </div>
        </main>
      </LoadingOverlay>
    ),
  },
);

export default function CompareRoute() {
  const title = 'Compare Properties | Homzen';
  const description = 'Compare Homzen listings side by side.';
  const canonical = absoluteUrl(routes.compare) || routes.compare;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <RequireAuth>
        <ComparePage />
      </RequireAuth>
    </>
  );
}
