import { Link, useParams } from 'react-router-dom';
import { Mail, Phone, ArrowLeft, Building2 } from 'lucide-react';
import { useAgentQuery } from '@/hooks/queries';
import { cn } from '@/lib/utils';
import { routes } from '@/lib/routes';

export function AgentProfilePage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: agent, isLoading, isError } = useAgentQuery(slug);

  if (isLoading) {
    return (
      <main id="main-content" className="section-container py-16">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-48 rounded-hz bg-hz-bg-soft" />
          <div className="aspect-[16/10] max-w-md rounded-hz bg-hz-bg-soft" />
          <div className="h-6 w-2/3 rounded-hz bg-hz-bg-soft" />
        </div>
      </main>
    );
  }

  if (isError || !agent) {
    return (
      <main id="main-content" className="section-container py-20 text-center">
        <h1 className="font-poppins text-2xl font-semibold text-hz-dark">Agent not found</h1>
        <p className="mt-2 font-poppins text-sm text-hz-muted">
          This profile may have been removed or the link is incorrect.
        </p>
        <Link
          to={{ pathname: routes.home, hash: 'agents' }}
          className="mt-6 inline-flex items-center gap-2 font-poppins text-sm font-semibold text-hz-primary no-underline hover:underline"
        >
          <ArrowLeft size={16} />
          Back to agents
        </Link>
      </main>
    );
  }

  const { name, role, avatarUrl, avatarObjectPosition = 'center 30%', listingsCount, phone, email, bio } =
    agent;

  return (
    <main id="main-content" className="bg-white py-10 md:py-16">
      <div className="section-container max-w-3xl">
        <Link
          to={{ pathname: routes.home, hash: 'agents' }}
          className="mb-6 inline-flex items-center gap-2 font-poppins text-sm text-hz-body no-underline transition-colors hover:text-hz-primary"
        >
          <ArrowLeft size={16} />
          Back to agents
        </Link>

        <div className="overflow-hidden rounded-hz border border-hz-border bg-white shadow-sm">
          <div className="relative aspect-[16/10] w-full max-w-md bg-hz-bg-soft">
            <img
              src={avatarUrl}
              alt={name}
              className="h-full w-full object-cover"
              style={{ objectPosition: avatarObjectPosition }}
            />
          </div>

          <div className="space-y-6 p-6 md:p-8">
            <div>
              <p className="font-poppins text-xs font-semibold uppercase tracking-[0.18em] text-hz-primary">
                {role}
              </p>
              <h1 className="mt-2 font-poppins text-2xl font-semibold leading-snug text-hz-dark md:text-3xl">
                {name}
              </h1>
              <p className="mt-2 flex items-center gap-1.5 font-poppins text-sm text-hz-muted">
                <Building2 size={14} className="shrink-0" />
                {listingsCount} active listings
              </p>
            </div>

            {bio && (
              <p className="font-poppins text-sm leading-relaxed text-hz-body">{bio}</p>
            )}

            <div className="flex flex-wrap gap-3">
              {phone && (
                <a
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-hz border border-hz-border px-4 py-2.5',
                    'font-poppins text-sm font-medium text-hz-dark no-underline',
                    'transition-colors duration-200 hover:border-hz-primary hover:text-hz-primary'
                  )}
                >
                  <Phone size={16} strokeWidth={1.75} />
                  {phone}
                </a>
              )}
              {email && (
                <a
                  href={`mailto:${email}`}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-hz border border-hz-border px-4 py-2.5',
                    'font-poppins text-sm font-medium text-hz-dark no-underline',
                    'transition-colors duration-200 hover:border-hz-primary hover:text-hz-primary'
                  )}
                >
                  <Mail size={16} strokeWidth={1.75} />
                  {email}
                </a>
              )}
            </div>

            <Link
              to={{ pathname: routes.home, hash: 'listings' }}
              className={cn(
                'inline-flex w-full items-center justify-center rounded-hz bg-hz-primary px-6 py-3',
                'font-poppins text-sm font-semibold text-white no-underline',
                'transition-colors duration-200 hover:bg-hz-primary-hover'
              )}
            >
              View Listings
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
