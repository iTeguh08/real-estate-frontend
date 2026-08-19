import type { ComponentProps } from 'react';
import ListingsPageImpl from '../../src/pages/listings/index';

export { getServerSideProps } from '@/lib/route-data/listings';

export default function ListingsPage(props: ComponentProps<typeof ListingsPageImpl>) {
  return <ListingsPageImpl {...props} />;
}
