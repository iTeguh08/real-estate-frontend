import { AGENTS } from '@/data/agents';
import { mergeAgentWithFallback, mergeAgentsWithFallback } from '@/lib/cms-merge';
import { graphqlFetch, useMockData } from '@/services/graphql-client';
import type { Agent } from '@/types';

const AGENT_FIELDS = `
  id slug name role avatarUrl avatarObjectPosition
  listingsCount phone email bio
`;

export async function getFeaturedAgents(): Promise<Agent[]> {
  if (useMockData()) {
    return AGENTS;
  }

  const data = await graphqlFetch<{ agents: Agent[] }>(`
    query { agents(featured: true) { ${AGENT_FIELDS} } }
  `);

  return mergeAgentsWithFallback(data.agents);
}

export async function getAgents(): Promise<Agent[]> {
  if (useMockData()) {
    return AGENTS;
  }

  const data = await graphqlFetch<{ agents: Agent[] }>(`
    query { agents { ${AGENT_FIELDS} } }
  `);

  return mergeAgentsWithFallback(data.agents);
}

export async function getAgentBySlug(slug: string): Promise<Agent | null> {
  if (useMockData()) {
    return AGENTS.find((agent) => agent.slug === slug) ?? null;
  }

  const data = await graphqlFetch<{ agent: Agent | null }>(`
    query($slug: String!) {
      agent(slug: $slug) { ${AGENT_FIELDS} }
    }
  `, { slug });

  return data.agent ? mergeAgentWithFallback(data.agent) : null;
}
