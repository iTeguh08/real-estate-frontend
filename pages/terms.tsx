import type { ComponentProps } from 'react';
import TermsPageImpl from '../src/pages/terms';

export { getStaticProps } from '@/lib/route-data/terms';

export default function TermsPage(props: ComponentProps<typeof TermsPageImpl>) {
  return <TermsPageImpl {...props} />;
}
