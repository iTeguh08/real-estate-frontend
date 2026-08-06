import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { AgentCard } from '@/components/cards/AgentCard';
import { CarouselControls } from '@/components/ui/CarouselControls';
import { SectionAtmosphere } from '@/components/decor/SectionAtmosphere';
import { useDotCarousel } from '@/hooks/useDotCarousel';
import { useAgentsQuery } from '@/hooks/queries';
import { useTheme } from '@/hooks/useTheme';
import { routes } from '@/lib/routes';
import { AgentCardSkeleton } from '@/components/skeletons';
import type { Agent } from '@/types';

const AGENTS_PER_SLIDE = 3;

interface MeetOurAgentsSectionProps {
  agents?: Agent[];
}

function buildAgentSlides(agents: Agent[]): Agent[][] {
  if (agents.length === 0) return [];

  const slides: Agent[][] = [];
  for (let index = 0; index < agents.length; index += AGENTS_PER_SLIDE) {
    slides.push(agents.slice(index, index + AGENTS_PER_SLIDE));
  }
  return slides;
}

export function MeetOurAgentsSection({ agents: agentsProp }: MeetOurAgentsSectionProps) {
  const { theme } = useTheme();
  const isNavy = theme === 'navy';
  const { data: fetchedAgents = [], isLoading } = useAgentsQuery();
  const agents = agentsProp ?? fetchedAgents;
  const agentSlides = buildAgentSlides(agents);

  const { activeIndex, setActiveIndex, goPrev, goNext, swipeHandlers } = useDotCarousel(
    agentSlides.length
  );

  const visibleAgents = agentSlides[activeIndex] ?? [];

  return (
    <section
      id="agents"
      className="section-defer relative w-full overflow-hidden bg-hz-sunken pb-16 pt-12 md:pb-20 md:pt-14"
      aria-labelledby="agents-heading"
    >
      {isNavy ? (
        <SectionAtmosphere
          tone="dark"
          surface="sunken"
          intensity="quiet"
          variant="edge"
          side="right"
          image="architecture"
          photoFade="exit-soft"
          photoOpacity={0.1}
          className="max-md:hidden"
        />
      ) : (
        <SectionAtmosphere
          tone="light"
          surface="sunken"
          intensity="strong"
          variant="dual"
          side="left"
          image="agents-plants"
          photoFade="balanced"
          photoOpacity={0.26}
          photoScrimMix={38}
          className="max-md:hidden"
        />
      )}
      <div className="section-container relative z-10">
        <header className="mb-12 text-center">
          <p className="hz-eyebrow mb-2 text-hz-primary">
            Our Team
          </p>
          <h2
            id="agents-heading"
            className="hz-section-title text-hz-dark"
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
          <>
            <div
              className="touch-pan-y"
              role="list"
              aria-label="Real estate agents"
              {...swipeHandlers}
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {visibleAgents.map((agent) => (
                  <div key={agent.id} role="listitem" className="h-full">
                    <AgentCard agent={agent} />
                  </div>
                ))}
              </div>
            </div>

            <CarouselControls
              count={agentSlides.length}
              activeIndex={activeIndex}
              onSelect={setActiveIndex}
              onPrev={goPrev}
              onNext={goNext}
              itemLabel="agent slide"
              tone={isNavy ? 'dark' : 'light'}
              className="mt-8"
            />
          </>
        )}
      </div>
    </section>
  );
}
