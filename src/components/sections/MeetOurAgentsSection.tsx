import { useEffect, useMemo, useState } from 'react';
import { AppLink } from '@/lib/app-link';
import { ArrowRight } from 'lucide-react';
import { AgentCard } from '@/components/cards/AgentCard';
import { CarouselControls } from '@/components/ui/CarouselControls';
import { SectionAtmosphere } from '@/components/decor/SectionAtmosphere';
import { useDotCarousel } from '@/hooks/useDotCarousel';
import { useAgentsQuery } from '@/hooks/queries';
import { useTheme } from '@/hooks/useTheme';
import { routes } from '@/lib/routes';
import { AgentCardSkeleton, LoadingOverlay } from '@/components/skeletons';
import type { Agent } from '@/types';

interface MeetOurAgentsSectionProps {
  agents?: Agent[];
}

function buildAgentSlides(agents: Agent[], perSlide: number): Agent[][] {
  if (agents.length === 0 || perSlide < 1) return [];

  const slides: Agent[][] = [];
  for (let index = 0; index < agents.length; index += perSlide) {
    slides.push(agents.slice(index, index + perSlide));
  }
  return slides;
}

function useAgentsPerSlide() {
  const [perSlide, setPerSlide] = useState(1);

  useEffect(() => {
    const mqSm = window.matchMedia('(min-width: 640px)');
    const mqLg = window.matchMedia('(min-width: 1024px)');

    const update = () => {
      if (mqLg.matches) setPerSlide(3);
      else if (mqSm.matches) setPerSlide(2);
      else setPerSlide(1);
    };

    update();
    mqSm.addEventListener('change', update);
    mqLg.addEventListener('change', update);

    return () => {
      mqSm.removeEventListener('change', update);
      mqLg.removeEventListener('change', update);
    };
  }, []);

  return perSlide;
}

export function MeetOurAgentsSection({ agents: agentsProp }: MeetOurAgentsSectionProps) {
  const { theme } = useTheme();
  const isNavy = theme === 'navy';
  const { data: fetchedAgents = [], isPending } = useAgentsQuery();
  const agents = agentsProp ?? fetchedAgents;
  const showSkeleton = isPending && !agentsProp;
  const agentsPerSlide = useAgentsPerSlide();
  const agentSlides = useMemo(
    () => buildAgentSlides(agents, agentsPerSlide),
    [agents, agentsPerSlide]
  );

  const { activeIndex, setActiveIndex, goPrev, goNext, swipeHandlers } = useDotCarousel(
    agentSlides.length
  );

  useEffect(() => {
    setActiveIndex(0);
  }, [agentsPerSlide, setActiveIndex]);

  const visibleAgents = agentSlides[activeIndex] ?? [];

  return (
    <section
      id="agents"
      className="section-defer relative w-full overflow-hidden bg-hz-sunken py-16 md:py-20"
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
          photoOpacity={0.2}
          photoScrimMix={38}
          className="max-md:hidden"
        />
      )}
      <div className="section-container relative z-10">
        <header className="mb-8 text-center md:mb-12">
          <p className="mb-2 font-poppins text-[11px] font-semibold uppercase tracking-[2px] text-hz-primary">
            Our Team
          </p>
          <h2
            id="agents-heading"
            className="font-poppins hz-h2 font-semibold leading-[1.2] tracking-[-0.3px] text-hz-dark"
          >
            Meet Our Agents
          </h2>
          <AppLink
            to={routes.agents}
            className="mt-4 inline-flex items-center gap-1.5 font-poppins text-[13px] text-hz-body no-underline transition-all duration-200 hover:text-hz-primary hover:underline hover:underline-offset-4"
          >
            View all agents
            <ArrowRight size={14} strokeWidth={1.6} />
          </AppLink>
        </header>

        {showSkeleton ? (
          <LoadingOverlay active minHeight="min-h-[360px]">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 animate-in fade-in duration-300">
              {Array.from({ length: 3 }).map((_, i) => (
                <AgentCardSkeleton key={i} />
              ))}
            </div>
          </LoadingOverlay>
        ) : (
          <>
            <div
              className="touch-pan-y animate-in fade-in duration-300"
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
