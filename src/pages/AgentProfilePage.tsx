import { useRouter } from 'next/router';
import { ArrowLeft } from 'lucide-react';
import { AgentProfileSkeleton, PropertyCardSkeleton } from '@/components/skeletons';
import { useAgentQuery, usePropertySearchQuery } from '@/hooks/queries';
import { AppLink } from '@/lib/app-link';
import { routes } from '@/lib/routes';
import { AgentProfileView } from '@/modules/agents/views/AgentProfileView';
import { DEFAULT_LISTING_FILTERS } from '@/types';

/** Vite SPA entry — Next uses `src/pages/agents/[slug].tsx`. */
export function AgentProfilePage() {
  const router = useRouter();
  const slug = typeof router.query.slug === 'string' ? router.query.slug : undefined;
  const { data: agent, isLoading, isError } = useAgentQuery(slug);
  const { data: listingsResult, isLoading: listingsLoading } = usePropertySearchQuery({
    ...DEFAULT_LISTING_FILTERS,
    agentSlug: slug ?? '',
    status: '',
    perPage: 9,
    page: 1,
  });

  if (isLoading || !router.isReady) {
    return <AgentProfileSkeleton />;
  }

  if (isError || !agent) {
    return (
      <main id="main-content" className="section-container py-20 text-center">
        <h1 className="font-poppins text-2xl font-semibold text-hz-dark">Agent not found</h1>
        <p className="mt-2 font-poppins text-sm text-hz-muted">
          This profile may have been removed or the link is incorrect.
        </p>
        <AppLink
          href={routes.agents}
          className="mt-6 inline-flex items-center gap-2 font-poppins text-sm font-semibold text-hz-primary no-underline hover:underline"
        >
          <ArrowLeft size={16} />
          Back to agents
        </AppLink>
      </main>
    );
  }

  if (listingsLoading) {
    return (
      <>
        <AgentProfileView agent={agent} listings={[]} listingsTotal={0} />
        <div className="section-container max-w-5xl pb-16">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <PropertyCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <AgentProfileView
      agent={agent}
      listings={listingsResult?.items ?? []}
      listingsTotal={listingsResult?.total ?? 0}
    />
  );
}
