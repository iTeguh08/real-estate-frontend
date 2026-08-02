import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { AgentCard } from '@/components/cards/AgentCard';
import { SectionAtmosphere } from '@/components/decor/SectionAtmosphere';
import { useAgentsQuery } from '@/hooks/queries';
import { routes } from '@/lib/routes';
import { AgentCardSkeleton } from '@/components/skeletons';
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
      className="section-defer relative w-full overflow-hidden bg-hz-sunken pb-16 pt-12 md:pb-20 md:pt-14"
      aria-labelledby="agents-heading"
    >
      <SectionAtmosphere
        tone="light"
        surface="sunken"
        intensity="quiet"
        variant="dual"
        side="right"
        image="none"
      />
      <div className="section-container relative z-10">
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
          <Link
            to={routes.agents}
            className="mt-4 inline-flex items-center gap-1.5 font-poppins text-[13px] text-hz-body no-underline transition-all duration-200 hover:text-hz-primary hover:underline hover:underline-offset-4"
          >
            View all agents
            <ArrowRight size={14} strokeWidth={1.6} />
          </Link>
        </header>

        {isLoading && !agentsProp ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <AgentCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
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
