import Head from 'next/head';
import dynamic from 'next/dynamic';
import { PageLoader } from '@/components/skeletons';
import { absoluteUrl } from '@/lib/runtime-env';
import { routes } from '@/lib/routes';

const RegisterPage = dynamic(
  () => import('@/pages/RegisterPage').then((m) => ({ default: m.RegisterPage })),
  { ssr: false, loading: () => <PageLoader variant="route" /> }
);

export default function RegisterRoute() {
  const title = 'Create Account | Homzen';
  const description = 'Join Homzen to save favorites, compare listings, and track your activity.';
  const canonical = absoluteUrl(routes.register) || routes.register;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <RegisterPage />
    </>
  );
}
