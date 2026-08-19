import type { ComponentProps } from 'react';
import AgentsPageImpl from '../../src/pages/agents/index';

export { getStaticProps } from '@/lib/route-data/agents-index';

export default function AgentsPage(props: ComponentProps<typeof AgentsPageImpl>) {
  return <AgentsPageImpl {...props} />;
}
