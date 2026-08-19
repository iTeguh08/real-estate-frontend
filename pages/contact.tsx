import type { ComponentProps } from 'react';
import ContactPageImpl from '../src/pages/contact';

export { getStaticProps } from '@/lib/route-data/contact';

export default function ContactPage(props: ComponentProps<typeof ContactPageImpl>) {
  return <ContactPageImpl {...props} />;
}
