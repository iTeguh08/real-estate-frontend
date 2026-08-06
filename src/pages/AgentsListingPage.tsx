import { Link } from 'react-router-dom';
import { AgentCard } from '@/components/cards/AgentCard';
import { SectionAtmosphere } from '@/components/decor/SectionAtmosphere';
import { AgentCardSkeleton } from '@/components/skeletons';
import { useAgentsListQuery } from '@/hooks/queries';
import { useSiteConfig } from '@/hooks/useSiteConfig';
import { routes } from '@/lib/routes';

export function AgentsListingPage() {
  const { data: agents = [], isLoading, isError } = useAgentsListQuery();
  const { data: siteConfig } = useSiteConfig();
  const brand = siteConfig?.brand ?? 'Homzen';

  return (
    <main id="main-content" className="relative overflow-hidden bg-hz-elevated py-16 md:py-20">
      <SectionAtmosphere tone="soft" intensity="quiet" variant="dual" side="left" image="interior-light" className="max-md:hidden" />
      <div className="section-container relative z-10">
        <header className="mb-12 max-w-2xl">
          <p className="hz-eyebrow mb-2 text-hz-primary">
            Our Team
          </p>
          <h1 className="hz-section-title text-hz-dark">
            Meet {brand} Agents
          </h1>
          <p className="hz-lead mt-4 text-hz-muted">
            Browse our network of property advisors. Each agent brings local expertise to help you
            buy, rent, or sell with confidence.
          </p>
        </header>

        {isError && (
          <p className="font-poppins text-sm text-hz-primary" role="alert">
            Unable to load agents. Please try again later.
          </p>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 gap-x-5 gap-y-15 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <AgentCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div
            className="grid grid-cols-1 gap-x-5 gap-y-15 sm:grid-cols-2 lg:grid-cols-3"
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

        <p className="mt-12 text-center">
          <Link
            to={routes.home}
            className="font-poppins text-sm font-medium text-hz-body no-underline transition-colors hover:text-hz-primary"
          >
            ← Back to home
          </Link>
        </p>
      </div>
    </main>
  );
}
