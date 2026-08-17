import Head from 'next/head';
import { useQueryClient } from '@tanstack/react-query';
import { AgentsView } from '@/modules/agents/views/AgentsView';
import { useHydrateQueryCache } from '@/hooks/useHydrateQueryCache';
import { AGENTS } from '@/data/agents';
import { SITE_CONFIG } from '@/data/site-config';
import { absoluteUrl } from '@/lib/runtime-env';
import { queryKeys } from '@/lib/query-keys';
import { routes } from '@/lib/routes';
import { jsonSafe, withSsgFallback } from '@/lib/ssg';
import { getAgents } from '@/services/agents.service';
import type { Agent } from '@/types';

const REVALIDATE_SECONDS = 60;

interface AgentsPageProps {
  agents: Agent[];
  brand: string;
}

export default function AgentsPage({ agents, brand }: AgentsPageProps) {
  const queryClient = useQueryClient();
  useHydrateQueryCache(() => {
    queryClient.setQueryData(queryKeys.agents.list(), agents);
  });

  const title = `Meet ${brand} Agents | Homzen`;
  const description =
    'Browse our network of property advisors. Local expertise to help you buy, rent, or sell with confidence.';
  const canonical = absoluteUrl(routes.agents) || routes.agents;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Head>
      <AgentsView agents={agents} brand={brand} />
    </>
  );
}

export async function getStaticProps() {
  const agents = await withSsgFallback('agentsList', getAgents, AGENTS);

  return {
    props: jsonSafe({
      agents,
      brand: SITE_CONFIG.brand,
    } satisfies AgentsPageProps),
    revalidate: REVALIDATE_SECONDS,
  };
}
