import { ChevronRight } from 'lucide-react';
import { DashboardSkeleton, LoadingOverlay } from '@/components/skeletons';
import { MediaImage } from '@/components/ui/media-image';
import { COVER_MEDIA_SLOT } from '@/data/property-media-slots';
import { useAuth } from '@/hooks/useAuth';
import { useCompare } from '@/hooks/useCompare';
import {
  useMyListingsQuery,
  useMyPropertySubmissionsQuery,
  usePropertyDetailByIdQuery,
} from '@/hooks/queries';
import { useWishlist } from '@/hooks/useWishlist';
import { AppLink } from '@/lib/app-link';
import { isAgentUser } from '@/lib/auth-roles';
import {
  agentWorkQueue,
  pickDashboardNextAction,
} from '@/lib/dashboard-next-action';
import { productThumbUrl } from '@/lib/image-url';
import { routes } from '@/lib/routes';
import { cn } from '@/lib/utils';
import {
  mediaPreview,
  type AgentListing,
} from '@/services/agent-listings.service';
import { MAX_COMPARE_ITEMS } from '@/services/compare.service';

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hz-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-hz-page';

function firstName(name: string): string {
  const token = name.trim().split(/\s+/)[0];
  return token || name;
}

function listingShortcutMeta(
  agentBusy: boolean,
  agentError: boolean,
  listingsLength: number,
  pendingCount: number,
  publishedCount: number,
): string {
  if (agentBusy) return '…';
  if (agentError) return 'Could not load';
  return `${listingsLength} listing${listingsLength === 1 ? '' : 's'}${
    pendingCount ? ` · ${pendingCount} in review` : ''
  }${publishedCount ? ` · ${publishedCount} live` : ''}`;
}

function listingCover(listing: AgentListing): string | null {
  return mediaPreview(listing, COVER_MEDIA_SLOT.field) ?? listing.image_url;
}

function listingIdFromNextHref(href: string): number | null {
  const prefix = `${routes.myProperty}/`;
  if (!href.startsWith(prefix)) return null;
  const id = Number(href.slice(prefix.length).split(/[/?#]/)[0]);
  return Number.isFinite(id) ? id : null;
}

function pickAgentCover(listings: AgentListing[], nextHref: string): { src: string; alt: string } | null {
  const preferredId = listingIdFromNextHref(nextHref);
  const preferred = preferredId != null ? listings.find((item) => item.id === preferredId) : undefined;
  const withPhoto =
    (preferred && listingCover(preferred) ? preferred : undefined) ??
    listings.find((item) => listingCover(item));
  if (!withPhoto) return null;
  const src = listingCover(withPhoto);
  if (!src) return null;
  return { src, alt: withPhoto.title };
}

export function DashboardPage() {
  const { user, isLoading, logout } = useAuth();
  const isAgent = isAgentUser(user);
  const { wishlistIds } = useWishlist();
  const { compareCount, compareIds } = useCompare();
  const memberPhotoId = isAgent ? undefined : (compareIds[0] ?? wishlistIds[0]);
  const { data: memberProperty } = usePropertyDetailByIdQuery(memberPhotoId);
  const {
    data: listings = [],
    isLoading: listingsLoading,
    isError: listingsError,
    refetch: refetchListings,
  } = useMyListingsQuery(isAgent);
  const {
    data: submissions = [],
    isLoading: submissionsLoading,
    isError: submissionsError,
    refetch: refetchSubmissions,
  } = useMyPropertySubmissionsQuery(isAgent);

  const agentBusy = isAgent && (listingsLoading || submissionsLoading);
  const agentError = isAgent && (listingsError || submissionsError);

  if (isLoading) {
    return (
      <LoadingOverlay active minHeight="min-h-[calc(100dvh-var(--header-height,76px))]">
        <DashboardSkeleton />
      </LoadingOverlay>
    );
  }

  if (!user) {
    return null;
  }

  const next = pickDashboardNextAction({
    isAgent,
    wishlistCount: wishlistIds.length,
    compareCount,
    compareMax: MAX_COMPARE_ITEMS,
    listings,
    submissions,
  });
  const nextReady = !agentBusy && !agentError;
  const queue = isAgent && nextReady ? agentWorkQueue(listings, 4, next.href) : [];
  const publishedCount = listings.filter((item) => item.publish_status === 'published').length;
  const pendingCount = submissions.filter((item) => item.review_status === 'pending').length;
  const agentPhoto = isAgent && nextReady ? pickAgentCover(listings, next.href) : null;
  const memberPhoto =
    !isAgent && memberProperty?.imageUrl
      ? { src: memberProperty.imageUrl, alt: memberProperty.title }
      : null;
  const heroPhoto = agentPhoto ?? memberPhoto;

  return (
    <main id="main-content" className="bg-hz-page py-16 md:py-20">
      <div className="section-container">
        <header className="max-w-2xl">
          <p className="mb-3 font-poppins text-[11px] font-semibold uppercase tracking-[0.12em] text-hz-primary">
            {isAgent ? 'Agent dashboard' : 'Member dashboard'}
          </p>
          <h1 className="font-poppins text-3xl font-semibold tracking-[-0.5px] text-hz-ink md:text-4xl">
            Hello, {firstName(user.name)}
          </h1>
          <p className="mt-3 font-poppins text-[13px] leading-relaxed text-hz-muted">{user.email}</p>
          <p className="mt-1 font-poppins text-sm leading-relaxed text-hz-body">
            {isAgent
              ? agentBusy
                ? 'Loading your listings…'
                : agentError
                  ? 'My Property data failed. Retry below.'
                  : `${listings.length} listing${listings.length === 1 ? '' : 's'}${
                      pendingCount ? ` · ${pendingCount} in review` : ''
                    }. Drafts publish after CMS approval.`
              : 'Wishlist and compare stay on this device.'}
          </p>
        </header>

        {agentBusy ? (
          <div className="mt-12 overflow-hidden rounded-2xl bg-hz-elevated shadow-hz-md md:grid md:grid-cols-2">
            <div className="min-h-[220px] animate-pulse bg-hz-sunken md:min-h-[280px]" />
            <div className="flex h-full flex-col justify-center p-6 md:p-8">
              <div className="h-8 w-56 animate-pulse rounded-hz bg-hz-sunken" />
              <div className="mt-3 h-4 max-w-sm animate-pulse rounded-hz bg-hz-sunken" />
              <div className="mt-8 h-11 w-40 animate-pulse rounded-lg bg-hz-sunken" />
            </div>
          </div>
        ) : agentError ? (
          <div className="mt-12 rounded-2xl bg-hz-elevated p-6 shadow-hz-md md:p-8">
            <h2 className="font-poppins text-2xl font-semibold tracking-[-0.5px] text-hz-ink">
              Could not load properties
            </h2>
            <p className="mt-2 max-w-xl font-poppins text-sm leading-relaxed text-hz-body">
              My Property data failed. Retry, or keep using wishlist and compare.
            </p>
            <button
              type="button"
              onClick={() => {
                void refetchListings();
                void refetchSubmissions();
              }}
              className={cn(
                'mt-8 cursor-pointer rounded-lg bg-hz-primary px-6 py-3 font-poppins text-sm font-semibold text-white',
                'transition-colors duration-200 hover:bg-hz-primary-hover',
                focusRing,
              )}
            >
              Try again
            </button>
          </div>
        ) : (
          <section
            aria-labelledby="dashboard-next-title"
            className={cn(
              'mt-12 overflow-hidden rounded-2xl bg-hz-elevated shadow-hz-md',
              heroPhoto && 'flex flex-col-reverse md:grid md:grid-cols-2',
            )}
          >
            {heroPhoto ? (
              <div className="relative min-h-[200px] bg-hz-sunken md:min-h-[280px]">
                <MediaImage
                  mediaUrl={productThumbUrl(heroPhoto.src)}
                  alt={heroPhoto.alt}
                  fitCover
                  wrapperClassName="absolute inset-0"
                />
              </div>
            ) : null}
            <div className={cn('flex h-full flex-col justify-center p-6 md:p-10', !heroPhoto && 'md:max-w-2xl')}>
              <h2
                id="dashboard-next-title"
                className="font-poppins text-2xl font-semibold tracking-[-0.5px] text-hz-ink md:text-[1.75rem]"
              >
                {next.title}
              </h2>
              <p className="mt-3 max-w-xl font-poppins text-sm leading-relaxed text-hz-body">{next.body}</p>
              <AppLink
                href={next.href}
                className={cn(
                  'mt-8 inline-flex w-fit cursor-pointer rounded-lg bg-hz-primary px-6 py-3 font-poppins text-sm font-semibold text-white no-underline',
                  'transition-colors duration-200 hover:bg-hz-primary-hover',
                  focusRing,
                )}
              >
                {next.cta}
              </AppLink>
            </div>
          </section>
        )}

        {queue.length > 0 ? (
          <section aria-labelledby="dashboard-queue-title" className="mt-14">
            <h2 id="dashboard-queue-title" className="font-poppins text-sm font-semibold text-hz-ink">
              Finish these next
            </h2>
            <p className="mt-1 font-poppins text-xs text-hz-muted">Fewest missing fields first.</p>
            <ul className="mt-4 space-y-2">
              {queue.map((item) => {
                const listing = listings.find((row) => row.id === item.id);
                const thumb = listing ? listingCover(listing) : null;
                return (
                  <li key={item.id}>
                    <AppLink
                      href={item.href}
                      className={cn(
                        'group flex min-h-14 cursor-pointer items-center gap-3 rounded-xl bg-hz-sunken px-3 py-2.5 no-underline',
                        'transition-colors duration-200 hover:bg-hz-elevated hover:text-hz-primary hover:shadow-hz-sm',
                        focusRing,
                      )}
                    >
                      {thumb ? (
                        <span className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-hz-page">
                          <MediaImage
                            mediaUrl={productThumbUrl(thumb)}
                            alt=""
                            fitCover
                            wrapperClassName="absolute inset-0"
                          />
                        </span>
                      ) : null}
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-poppins text-sm font-medium text-hz-ink group-hover:text-hz-primary">
                          {item.title}
                        </span>
                        <span className="mt-0.5 block font-poppins text-xs text-hz-muted">{item.hint}</span>
                      </span>
                      <ChevronRight className="size-4 shrink-0 stroke-[1.5] text-hz-muted" aria-hidden />
                    </AppLink>
                  </li>
                );
              })}
            </ul>
          </section>
        ) : null}

        <nav aria-label="Dashboard shortcuts" className="mt-14">
          <h2 className="font-poppins text-sm font-semibold text-hz-ink">
            {isAgent ? 'Inventory' : 'Shortcuts'}
          </h2>
          <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {isAgent ? (
              <ShortcutTile
                href={routes.myProperty}
                label="My Property"
                meta={listingShortcutMeta(
                  agentBusy,
                  agentError,
                  listings.length,
                  pendingCount,
                  publishedCount,
                )}
                current={nextReady && next.href.startsWith(routes.myProperty)}
              />
            ) : null}
            {isAgent ? (
              <ShortcutTile
                href={routes.submitProperty}
                label="Submit property"
                meta="New CMS lead"
                current={nextReady && next.href === routes.submitProperty}
              />
            ) : null}
            {isAgent ? null : (
              <>
                <ShortcutTile
                  href={routes.wishlist}
                  label="Wishlist"
                  meta={`${wishlistIds.length} saved`}
                  current={nextReady && next.href === routes.wishlist}
                />
                <ShortcutTile
                  href={routes.compare}
                  label="Compare"
                  meta={`${compareCount} of ${MAX_COMPARE_ITEMS}`}
                  current={nextReady && next.href === routes.compare}
                />
                <ShortcutTile
                  href={routes.listings}
                  label="Browse listings"
                  meta="Public catalog"
                  current={nextReady && next.href === routes.listings}
                />
              </>
            )}
          </ul>
          {isAgent ? (
            <p className="mt-6 font-poppins text-sm text-hz-muted">
              <AppLink
                href={routes.wishlist}
                className={cn(
                  'cursor-pointer text-hz-body no-underline hover:text-hz-primary',
                  focusRing,
                  'rounded-sm',
                )}
              >
                Wishlist ({wishlistIds.length})
              </AppLink>
              <span aria-hidden className="mx-2 text-hz-line">
                ·
              </span>
              <AppLink
                href={routes.compare}
                className={cn(
                  'cursor-pointer text-hz-body no-underline hover:text-hz-primary',
                  focusRing,
                  'rounded-sm',
                )}
              >
                Compare ({compareCount}/{MAX_COMPARE_ITEMS})
              </AppLink>
              <span aria-hidden className="mx-2 text-hz-line">
                ·
              </span>
              <AppLink
                href={routes.listings}
                className={cn(
                  'cursor-pointer text-hz-body no-underline hover:text-hz-primary',
                  focusRing,
                  'rounded-sm',
                )}
              >
                Browse listings
              </AppLink>
            </p>
          ) : null}
        </nav>

        <div className="mt-16 border-t border-hz-line pt-8">
          <button
            type="button"
            onClick={() => void logout()}
            className={cn(
              'cursor-pointer font-poppins text-sm font-medium text-hz-muted underline-offset-4',
              'transition-colors duration-200 hover:text-hz-ink hover:underline',
              focusRing,
              'rounded-sm',
            )}
          >
            Sign out
          </button>
        </div>
      </div>
    </main>
  );
}

function ShortcutTile({
  href,
  label,
  meta,
  current,
}: {
  href: string;
  label: string;
  meta: string;
  current?: boolean;
}) {
  return (
    <li>
      <AppLink
        href={href}
        aria-current={current ? 'step' : undefined}
        className={cn(
          'flex min-h-[4.75rem] cursor-pointer flex-col justify-between rounded-xl bg-hz-sunken p-4 no-underline',
          'transition-colors duration-200 hover:bg-hz-elevated hover:shadow-hz-sm',
          current && 'bg-hz-elevated ring-1 ring-hz-primary',
          focusRing,
        )}
      >
        <span className="flex items-start justify-between gap-2">
          <span
            className={cn(
              'font-poppins text-sm font-semibold',
              current ? 'text-hz-primary' : 'text-hz-ink',
            )}
          >
            {label}
          </span>
          {current ? (
            <span className="font-poppins text-[11px] font-semibold uppercase tracking-[0.08em] text-hz-primary">
              Now
            </span>
          ) : (
            <ChevronRight className="size-4 stroke-[1.5] text-hz-muted" aria-hidden />
          )}
        </span>
        <span className="mt-2 font-poppins text-xs text-hz-muted">{meta}</span>
      </AppLink>
    </li>
  );
}
