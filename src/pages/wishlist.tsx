import Head from 'next/head';
import dynamic from 'next/dynamic';
import { RequireAuth } from '@/components/auth/RequireAuth';
import { LoadingOverlay, WishlistPageSkeleton } from '@/components/skeletons';
import { absoluteUrl } from '@/lib/runtime-env';
import { routes } from '@/lib/routes';

const WishlistPage = dynamic(
  () => import('@/pages/WishlistPage').then((m) => ({ default: m.WishlistPage })),
  {
    ssr: false,
    loading: () => (
      <LoadingOverlay active minHeight="min-h-[calc(100dvh-var(--header-height,76px))]">
        <WishlistPageSkeleton />
      </LoadingOverlay>
    ),
  },
);

export default function WishlistRoute() {
  const title = 'Wishlist | Homzen';
  const description = 'Your saved Homzen listings.';
  const canonical = absoluteUrl(routes.wishlist) || routes.wishlist;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <RequireAuth>
        <WishlistPage />
      </RequireAuth>
    </>
  );
}
