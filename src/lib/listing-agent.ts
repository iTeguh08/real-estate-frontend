import { AGENTS } from '@/data/agents';
import { BEST_VALUE_PROPERTIES } from '@/data/properties';
import type { ListingAgent, Property } from '@/types';

export function agentFirstName(name: string): string {
  return name.trim().split(/\s+/)[0] ?? name;
}

export function contactAgentLabel(agent?: Pick<ListingAgent, 'name'> | null): string {
  if (!agent?.name) return 'Contact an Agent';
  return `Contact ${agentFirstName(agent.name)}`;
}

export function askAgentLabel(agent?: Pick<ListingAgent, 'name'> | null): string {
  if (!agent?.name) return 'Ask an Agent';
  return `Ask ${agentFirstName(agent.name)}`;
}

function seedFromId(id: string): number {
  return id.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
}

/** Resolves the single listing agent for a property (mock fallback when CMS omits it). */
export function resolveListingAgent(property: Pick<Property, 'id' | 'slug'>): ListingAgent {
  const fromBestValue = BEST_VALUE_PROPERTIES.find(
    (p) => p.slug === property.slug || p.id === property.id,
  );

  if (fromBestValue?.agent) {
    const fullAgent = AGENTS.find((a) => a.name === fromBestValue.agent.name);
    return {
      id: fromBestValue.agent.id,
      slug: fullAgent?.slug ?? '',
      name: fromBestValue.agent.name,
      role: fullAgent?.role ?? 'Listing Agent',
      avatarUrl: fromBestValue.agent.avatarUrl,
    };
  }

  const agent = AGENTS[seedFromId(property.id) % AGENTS.length]!;
  return {
    id: agent.id,
    slug: agent.slug,
    name: agent.name,
    role: agent.role,
    avatarUrl: agent.avatarUrl,
  };
}
