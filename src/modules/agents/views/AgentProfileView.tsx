import { useState } from 'react';
import { Building2, Mail, Phone, ArrowLeft, UserRound } from 'lucide-react';
import { PropertyCard } from '@/components/cards/PropertyCard';
import { InquiryDialog } from '@/components/forms/InquiryDialog';
import { MediaImage } from '@/components/ui/media-image';
import { AppLink } from '@/lib/app-link';
import { routes } from '@/lib/routes';
import { cn } from '@/lib/utils';
import type { Agent, Property } from '@/types';

export interface AgentProfileViewProps {
  agent: Agent;
  listings?: Property[];
  listingsTotal?: number;
}

export function AgentProfileView({
  agent,
  listings = [],
  listingsTotal,
}: AgentProfileViewProps) {
  const [contactOpen, setContactOpen] = useState(false);
  const {
    name,
    role,
    avatarUrl,
    avatarObjectPosition = 'center 30%',
    listingsCount,
    phone,
    email,
    bio,
  } = agent;
  const total = listingsTotal ?? (listings.length || listingsCount);

  return (
    <main id="main-content" className="bg-hz-elevated py-10 md:py-16">
      <div className="section-container max-w-5xl">
        <AppLink
          href={routes.agents}
          className="mb-6 inline-flex items-center gap-2 font-poppins text-sm text-hz-body no-underline transition-colors hover:text-hz-primary"
        >
          <ArrowLeft size={16} />
          Back to agents
        </AppLink>

        <div className="overflow-hidden rounded-hz border border-hz-border bg-hz-elevated shadow-sm">
          <div className="grid gap-0 md:grid-cols-[minmax(0,320px)_1fr]">
            <div className="relative aspect-[16/10] w-full bg-hz-bg-soft md:aspect-auto md:min-h-[320px]">
              <MediaImage
                mediaUrl={avatarUrl}
                fitCover
                coverEstimate={{ width: 420, height: 262 }}
                coverMaxWidth={840}
                alt={name}
                decoding="async"
                className="object-cover"
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
                  {total} active listings
                </p>
              </div>

              {bio && <p className="font-poppins text-sm leading-relaxed text-hz-body">{bio}</p>}

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

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <button
                  type="button"
                  onClick={() => setContactOpen(true)}
                  className={cn(
                    'inline-flex w-full items-center justify-center rounded-hz bg-hz-primary px-6 py-3 sm:w-auto',
                    'font-poppins text-sm font-semibold text-white',
                    'transition-colors duration-200 hover:bg-hz-primary-hover'
                  )}
                >
                  Contact {name.split(' ')[0]}
                </button>
                <AppLink
                  href={`/listings?agent=${encodeURIComponent(agent.slug)}`}
                  className={cn(
                    'inline-flex w-full items-center justify-center rounded-hz border border-hz-border bg-transparent px-6 py-3 sm:w-auto',
                    'font-poppins text-sm font-medium text-hz-ink no-underline',
                    'transition-colors duration-200 hover:border-hz-primary hover:text-hz-primary'
                  )}
                >
                  View all listings
                </AppLink>
              </div>
            </div>
          </div>
        </div>

        <InquiryDialog
          open={contactOpen}
          onOpenChange={setContactOpen}
          mode="contact"
          inquiryType="General Inquiry"
          title={`Contact ${name}`}
          description="Send a message to this advisor — our team will connect you shortly."
          messagePlaceholder={`What would you like to discuss with ${name}?`}
          submitLabel="Send Message"
          successFallback="Your message has been sent. We’ll reply within 24 hours."
          contextTitle={name}
          contextSubtitle={role}
          contextMeta={[`Agent: ${name}`, `Slug: ${agent.slug}`, role ? `Role: ${role}` : ''].filter(
            Boolean
          )}
          idPrefix="agent-contact"
          ContextIcon={UserRound}
        />

        <section className="mt-12" aria-labelledby="agent-listings-heading">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="font-poppins text-[11px] font-semibold uppercase tracking-[2px] text-hz-primary">
                Portfolio
              </p>
              <h2
                id="agent-listings-heading"
                className="mt-1 font-poppins text-xl font-semibold text-hz-dark md:text-2xl"
              >
                Listings by {name}
              </h2>
            </div>
          </div>

          {listings.length === 0 ? (
            <p className="rounded-hz border border-hz-border bg-hz-sunken px-5 py-8 text-center font-poppins text-sm text-hz-muted">
              No published listings are linked to this agent yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {listings.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
