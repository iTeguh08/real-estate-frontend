import type { ComponentProps } from 'react';
import AboutPageImpl from '../src/pages/about';

export { getStaticProps } from '@/lib/route-data/about';

export default function AboutPage(props: ComponentProps<typeof AboutPageImpl>) {
  return <AboutPageImpl {...props} />;
}
