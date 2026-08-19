import type { ComponentProps } from 'react';
import AgentProfilePageImpl from '../../src/pages/agents/[slug]';

export { getStaticPaths, getStaticProps } from '@/lib/route-data/agents-slug';

export default function AgentProfilePage(props: ComponentProps<typeof AgentProfilePageImpl>) {
  return <AgentProfilePageImpl {...props} />;
}
