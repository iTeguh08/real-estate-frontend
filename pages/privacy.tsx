import type { ComponentProps } from 'react';
import PrivacyPageImpl from '../src/pages/privacy';

export { getStaticProps } from '@/lib/route-data/privacy';

export default function PrivacyPage(props: ComponentProps<typeof PrivacyPageImpl>) {
  return <PrivacyPageImpl {...props} />;
}
