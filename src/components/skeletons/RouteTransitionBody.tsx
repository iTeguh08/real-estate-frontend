import { AgentsPageSkeleton } from '@/components/skeletons/AgentsPageSkeleton';
import { AuthFormSkeleton } from '@/components/skeletons/AuthFormSkeleton';
import { BlogPageSkeleton } from '@/components/skeletons/BlogPageSkeleton';
import { CompareTableSkeleton } from '@/components/skeletons/CompareTableSkeleton';
import { DashboardSkeleton } from '@/components/skeletons/DashboardSkeleton';
import { EditListingSkeleton } from '@/components/skeletons/EditListingSkeleton';
import { HomePageSkeleton } from '@/components/skeletons/HomePageSkeleton';
import { ListingsPageSkeleton } from '@/components/skeletons/ListingsPageSkeleton';
import { PropertyDetailSkeleton } from '@/components/skeletons/PropertyDetailSkeleton';
import { AgentProfileSkeleton } from '@/components/skeletons/AgentProfileSkeleton';
import { AboutPageSkeleton } from '@/components/skeletons/AboutPageSkeleton';
import { ContactPageSkeleton } from '@/components/skeletons/ContactPageSkeleton';
import { CmsPageSkeleton } from '@/components/skeletons/CmsPageSkeleton';
import { LoaderOrbit } from '@/components/skeletons/LoaderOrbit';
import { WishlistPageSkeleton } from '@/components/skeletons/WishlistPageSkeleton';
import type { TransitionKind } from '@/lib/route-transition-kind';

export function TransitionBody({ kind }: { kind: TransitionKind }) {
  switch (kind) {
    case 'home':
      return <HomePageSkeleton />;
    case 'listings':
      return <ListingsPageSkeleton gridColumns={3} count={12} />;
    case 'property':
      return <PropertyDetailSkeleton />;
    case 'agents':
      return <AgentsPageSkeleton />;
    case 'agent-profile':
      return <AgentProfileSkeleton />;
    case 'blog':
    case 'news':
      return <BlogPageSkeleton />;
    case 'blog-article':
    case 'news-article':
      return <CmsPageSkeleton variant="article" className="section-container py-16 md:py-20" />;
    case 'about':
      return <AboutPageSkeleton />;
    case 'contact':
      return <ContactPageSkeleton />;
    case 'privacy':
    case 'terms':
    case 'cookies':
      return <CmsPageSkeleton className="section-container py-16 md:py-20" />;
    case 'auth':
      return <AuthFormSkeleton />;
    case 'dashboard':
    case 'my-property':
      return <DashboardSkeleton />;
    case 'submit-property':
    case 'edit-listing':
      return <EditListingSkeleton />;
    case 'compare':
      return (
        <main id="main-content" className="bg-hz-elevated py-10 md:py-16">
          <div className="section-container">
            <CompareTableSkeleton />
          </div>
        </main>
      );
    case 'wishlist':
      return <WishlistPageSkeleton />;
    default:
      return (
        <div className="flex min-h-[40vh] items-center justify-center bg-hz-page">
          <LoaderOrbit />
        </div>
      );
  }
}
