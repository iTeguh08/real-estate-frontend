import { AgentCard } from '@/components/cards/AgentCard';
import type { Agent } from '@/types';

const STUB_AGENTS: Agent[] = [
  {
    id: 'agent-1',
    name: 'Sarah Mitchell',
    role: 'Senior Property Advisor',
    avatarUrl:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80',
    avatarObjectPosition: 'center 13%',
    listingsCount: 42,
    phone: '+1 555 012 3401',
  },
  {
    id: 'agent-2',
    name: 'James Whitfield',
    role: 'Project Manager',
    avatarUrl:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    avatarObjectPosition: 'center 12%',
    listingsCount: 38,
    phone: '+1 555 012 3402',
  },
  {
    id: 'agent-3',
    name: 'Marcus Chen',
    role: 'Luxury Homes Specialist',
    avatarUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&auto=format&fit=crop&q=80',
    avatarObjectPosition: 'center 67%',
    listingsCount: 51,
    phone: '+1 555 012 3403',
  },
];

interface MeetOurAgentsSectionProps {
  agents?: Agent[];
}

export function MeetOurAgentsSection({ agents = STUB_AGENTS }: MeetOurAgentsSectionProps) {
  return (
    <section
      id="agents"
      className="w-full bg-white py-16 md:py-20"
      aria-labelledby="agents-heading"
    >
      <div className="section-container">
        <header className="mb-12 text-center">
          <p className="mb-2 font-poppins text-[11px] font-semibold uppercase tracking-[2px] text-hz-primary">
            Our Team
          </p>
          <h2
            id="agents-heading"
            className="font-poppins text-[30px] font-semibold leading-[1.2] tracking-[-0.3px] text-hz-dark md:text-[36px]"
          >
            Meet Our Agents
          </h2>
        </header>

        <div
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
          aria-label="Real estate agents"
        >
          {agents.map((agent) => (
            <div key={agent.id} role="listitem">
              <AgentCard agent={agent} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
