
import type { GetStaticPaths, GetStaticProps } from 'next';
import { AGENTS } from '@/data/agents';
import { listingFiltersQueryVars } from '@/lib/listing-filter-params';
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

  void listingFiltersQueryVars(listingFilters);

  return {
    props: jsonSafe({
      agent,
      listings: searchResult.items,
      listingsTotal: searchResult.total,
    }),
    notFound: false,
    revalidate: REVALIDATE_SECONDS,
  };
};
