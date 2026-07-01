import { AGENTS } from '@/data/agents';
import { apiFetch, useMockData } from '@/services/api-client';
import type { Agent } from '@/types';

export async function getFeaturedAgents(): Promise<Agent[]> {
  if (useMockData()) {
    return AGENTS;
  }
  return apiFetch<Agent[]>('/agents?featured=true');
}

export async function getAgentBySlug(slug: string): Promise<Agent | null> {
  if (useMockData()) {
    return AGENTS.find((agent) => agent.slug === slug) ?? null;
  }
  return apiFetch<Agent>(`/agents/${slug}`);
}
