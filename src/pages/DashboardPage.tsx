import { Link } from 'react-router-dom';
import { DashboardSkeleton } from '@/components/skeletons';
import { useAuth } from '@/hooks/useAuth';
import { isAgentUser } from '@/lib/auth-roles';
import { routes } from '@/lib/routes';

export function DashboardPage() {
  const { user, isLoading, logout } = useAuth();
  const isAgent = isAgentUser(user);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (!user) {
    return null;
  }

  return (
    <main id="main-content" className="section-container py-16 md:py-20">
      <p className="mb-2 font-poppins text-[11px] font-semibold uppercase tracking-[2px] text-hz-primary">
        {isAgent ? 'Agent dashboard' : 'Member dashboard'}
      </p>
      <h1 className="font-poppins text-3xl font-semibold text-hz-dark">Hello, {user.name}</h1>
      <p className="mt-2 max-w-xl font-poppins text-sm text-hz-muted">
        Signed in as <span className="text-hz-dark">{user.email}</span>
        {isAgent
          ? '. Manage drafts after CMS approval under My Property.'
          : '. Wishlist and compare stay on this device for now.'}
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isAgent && (
          <Link
            to={routes.myProperty}
            className="rounded-hz border border-hz-primary/40 bg-hz-elevated p-5 no-underline shadow-sm transition-colors hover:border-hz-primary sm:col-span-2 lg:col-span-1"
          >
            <p className="font-poppins text-sm font-semibold text-hz-dark">My Property</p>
            <p className="mt-1 font-poppins text-xs text-hz-muted">
              Complete drafts and publish to the public site
            </p>
          </Link>
        )}
        <Link
          to={routes.wishlist}
          className="rounded-hz border border-hz-border bg-hz-elevated p-5 no-underline shadow-sm transition-colors hover:border-hz-primary"
        >
          <p className="font-poppins text-sm font-semibold text-hz-dark">Wishlist</p>
          <p className="mt-1 font-poppins text-xs text-hz-muted">Saved listings on this device</p>
        </Link>
        <Link
          to={routes.compare}
          className="rounded-hz border border-hz-border bg-hz-elevated p-5 no-underline shadow-sm transition-colors hover:border-hz-primary"
        >
          <p className="font-poppins text-sm font-semibold text-hz-dark">Compare</p>
          <p className="mt-1 font-poppins text-xs text-hz-muted">Up to 3 properties side by side</p>
        </Link>
        <Link
          to={routes.listings}
          className="rounded-hz border border-hz-border bg-hz-elevated p-5 no-underline shadow-sm transition-colors hover:border-hz-primary"
        >
          <p className="font-poppins text-sm font-semibold text-hz-dark">Browse listings</p>
          <p className="mt-1 font-poppins text-xs text-hz-muted">Find your next home</p>
        </Link>
        {isAgent && (
          <Link
            to={routes.submitProperty}
            className="rounded-hz border border-hz-border bg-hz-elevated p-5 no-underline shadow-sm transition-colors hover:border-hz-primary"
          >
            <p className="font-poppins text-sm font-semibold text-hz-dark">Submit property</p>
            <p className="mt-1 font-poppins text-xs text-hz-muted">Send a new lead for CMS review</p>
          </Link>
        )}
      </div>

      <button
        type="button"
        onClick={() => void logout()}
        className="mt-10 rounded-hz border border-hz-border px-5 py-2.5 font-poppins text-sm font-medium text-hz-dark transition-colors hover:border-hz-primary hover:text-hz-primary"
      >
        Sign out
      </button>
    </main>
  );
}
