import Head from 'next/head';
import { useQueryClient } from '@tanstack/react-query';
import { AgentProfileView } from '@/modules/agents/views/AgentProfileView';
import { useHydrateQueryCache } from '@/hooks/useHydrateQueryCache';
import { listingFiltersQueryVars } from '@/lib/listing-filter-params';
import { absoluteUrl } from '@/lib/runtime-env';
import { queryKeys } from '@/lib/query-keys';
import { routes } from '@/lib/routes';
import { DEFAULT_LISTING_FILTERS, type Agent, type Property } from '@/types';

interface AgentProfilePageProps {
  agent: Agent;
  listings: Property[];
  listingsTotal: number;
}

export default function AgentProfilePage({
  agent,
  listings,
  listingsTotal,
}: AgentProfilePageProps) {
  const queryClient = useQueryClient();
  useHydrateQueryCache(() => {
    queryClient.setQueryData(queryKeys.agents.detail(agent.slug), agent);
    const listingFilters = {
      ...DEFAULT_LISTING_FILTERS,
      agentSlug: agent.slug,
      status: '' as const,
      perPage: 9,
      page: 1,
    };
    queryClient.setQueryData(queryKeys.properties.search(listingFiltersQueryVars(listingFilters)), {
      items: listings,
      total: listingsTotal,
      page: 1,
      perPage: 9,
      lastPage: Math.max(1, Math.ceil(listingsTotal / 9)),
    });
  });

  const title = `${agent.name} — ${agent.role} | Homzen`;
  const description = (agent.bio || `${agent.name} is a ${agent.role} at Homzen.`)
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 180);
  const canonical = absoluteUrl(routes.agent(agent.slug)) || routes.agent(agent.slug);
  const ogImage = absoluteUrl(agent.avatarUrl);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="profile" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {ogImage ? <meta property="og:image" content={ogImage} /> : null}
        <meta property="og:url" content={canonical} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        {ogImage ? <meta name="twitter:image" content={ogImage} /> : null}
      </Head>
      <AgentProfileView agent={agent} listings={listings} listingsTotal={listingsTotal} />
    </>
  );
}
