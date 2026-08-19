import { AGENTS } from '@/data/agents';
import { mergeAgentWithFallback, mergeAgentsWithFallback } from '@/lib/cms-merge';
import { graphqlFetch, isMockDataEnabled } from '@/services/graphql-client';
import type { Agent } from '@/types';

const AGENT_FIELDS = `
  id slug name role avatarUrl avatarObjectPosition
  listingsCount phone email bio
`;

export async function getFeaturedAgents(): Promise<Agent[]> {
  if (isMockDataEnabled()) {
    return AGENTS;
  }

  const data = await graphqlFetch<{ agents: Agent[] }>(`
    query { agents(featured: true) { ${AGENT_FIELDS} } }
  `);

  if (!data) {
    return AGENTS;
  }

  return mergeAgentsWithFallback(data.agents);
}

export async function getAgents(): Promise<Agent[]> {
  if (isMockDataEnabled()) {
    return AGENTS;
  }

  const data = await graphqlFetch<{ agents: Agent[] }>(`
    query { agents { ${AGENT_FIELDS} } }
  `);

  if (!data) {
    return AGENTS;
  }

  return mergeAgentsWithFallback(data.agents);
}

export async function getAgentBySlug(slug: string): Promise<Agent | null> {
  if (isMockDataEnabled()) {
    return AGENTS.find((agent) => agent.slug === slug) ?? null;
  }

  const data = await graphqlFetch<{ agent: Agent | null }>(`
    query($slug: String!) {
      agent(slug: $slug) { ${AGENT_FIELDS} }
    }
  `, { slug });

  if (!data) {
    return AGENTS.find((agent) => agent.slug === slug) ?? null;
  }

  return data.agent ? mergeAgentWithFallback(data.agent) : null;
}
