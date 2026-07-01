import { AgentCard } from '@/components/cards/AgentCard';
import { useAgentsQuery } from '@/hooks/queries';
import type { Agent } from '@/types';

interface MeetOurAgentsSectionProps {
  agents?: Agent[];
}

export function MeetOurAgentsSection({ agents: agentsProp }: MeetOurAgentsSectionProps) {
  const { data: fetchedAgents = [], isLoading } = useAgentsQuery();
  const agents = agentsProp ?? fetchedAgents;

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

        {isLoading && !agentsProp ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[16/10] rounded-hz bg-hz-bg-soft" />
                <div className="mt-4 h-5 w-1/2 rounded-hz bg-hz-bg-soft" />
              </div>
            ))}
          </div>
        ) : (
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
        )}
      </div>
    </section>
  );
}
