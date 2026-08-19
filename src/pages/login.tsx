import Head from 'next/head';
import dynamic from 'next/dynamic';
import { AuthFormSkeleton, LoadingOverlay } from '@/components/skeletons';
import { absoluteUrl } from '@/lib/runtime-env';
import { routes } from '@/lib/routes';

const LoginPage = dynamic(
  () => import('@/pages/LoginPage').then((m) => ({ default: m.LoginPage })),
  {
    ssr: false,
    loading: () => (
      <LoadingOverlay active minHeight="min-h-[calc(100dvh-var(--header-height,76px))]">
        <AuthFormSkeleton />
      </LoadingOverlay>
    ),
  },
);

export default function LoginRoute() {
  const title = 'Sign In | Homzen';
  const description = 'Sign in to manage your Homzen member profile, wishlist, and saved searches.';
  const canonical = absoluteUrl(routes.login) || routes.login;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <LoginPage />
    </>
  );
}
