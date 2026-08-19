import type { ComponentProps } from 'react';
import HomePageImpl from '../src/pages/index';

export { getStaticProps } from '@/lib/route-data/home';

export default function HomePage(props: ComponentProps<typeof HomePageImpl>) {
  return <HomePageImpl {...props} />;
}
