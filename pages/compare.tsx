import type { ComponentProps } from 'react';
import CompareRouteImpl from '../src/pages/compare';

export default function CompareRoute(props: ComponentProps<typeof CompareRouteImpl>) {
  return <CompareRouteImpl {...props} />;
}
