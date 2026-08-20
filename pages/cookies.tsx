import type { ComponentProps } from 'react';
import CookiesPageImpl from '../src/pages/cookies';

export { getStaticProps } from '@/lib/route-data/cookies';

export default function CookiesPage(props: ComponentProps<typeof CookiesPageImpl>) {
  return <CookiesPageImpl {...props} />;
}
