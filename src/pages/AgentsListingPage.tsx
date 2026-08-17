import { useAgentsListQuery } from '@/hooks/queries';
import { useSiteConfig } from '@/hooks/useSiteConfig';
import { AgentsView } from '@/modules/agents/views/AgentsView';

/** Vite SPA entry — Next uses `src/pages/agents/index.tsx`. */
export function AgentsListingPage() {
  const { data: agents = [], isLoading, isError } = useAgentsListQuery();
  const { data: siteConfig } = useSiteConfig();
  return (
    <AgentsView
      agents={agents}
      brand={siteConfig?.brand ?? 'Homzen'}
      isLoading={isLoading}
      isError={isError}
    />
  );
}
