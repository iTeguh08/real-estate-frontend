import Head from 'next/head';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { useQueryClient } from '@tanstack/react-query';
import { AgentProfileView } from '@/modules/agents/views/AgentProfileView';
import { useHydrateQueryCache } from '@/hooks/useHydrateQueryCache';
import { AGENTS } from '@/data/agents';
import { listingFiltersQueryVars } from '@/lib/listing-filter-params';
import { absoluteUrl } from '@/lib/runtime-env';
import { queryKeys } from '@/lib/query-keys';
import { routes } from '@/lib/routes';
import { jsonSafe, withSsgFallback } from '@/lib/ssg';
import { getAgentBySlug, getAgents } from '@/services/agents.service';
import { searchProperties } from '@/services/properties.service';
import { DEFAULT_LISTING_FILTERS, type Agent, type Property } from '@/types';

const REVALIDATE_SECONDS = 60;

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

export const getStaticPaths: GetStaticPaths = async () => {
  const agents = await withSsgFallback('agentPaths', getAgents, AGENTS);

  return {
    paths: agents.map((agent) => ({ params: { slug: agent.slug } })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<AgentProfilePageProps> = async (context) => {
  const slug = typeof context.params?.slug === 'string' ? context.params.slug : '';
  if (!slug) {
    return { notFound: true };
  }

  const agent = await withSsgFallback(
    `agent:${slug}`,
    () => getAgentBySlug(slug),
    AGENTS.find((item) => item.slug === slug) ?? null
  );

  if (!agent) {
    return { notFound: true };
  }

  const listingFilters = {
    ...DEFAULT_LISTING_FILTERS,
    agentSlug: slug,
    status: '' as const,
    perPage: 9,
    page: 1,
  };

  const searchResult = await withSsgFallback(
    `agentListings:${slug}`,
    () => searchProperties(listingFilters),
    { items: [], total: 0, page: 1, perPage: 9, lastPage: 1 }
  );

  return {
    props: jsonSafe({
      agent,
      listings: searchResult.items,
      listingsTotal: searchResult.total,
    } satisfies AgentProfilePageProps),
    revalidate: REVALIDATE_SECONDS,
  };
};
