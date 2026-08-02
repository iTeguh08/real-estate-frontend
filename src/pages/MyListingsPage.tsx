import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Eye, Trash2, X } from 'lucide-react';
import { MyListingRowSkeleton } from '@/components/skeletons';
import { useAuth } from '@/hooks/useAuth';
import {
  useCancelPropertySubmissionMutation,
  useDeleteMyListingMutation,
} from '@/hooks/mutations';
import { useMyListingsQuery, useMyPropertySubmissionsQuery } from '@/hooks/queries';
import { isAgentUser } from '@/lib/auth-roles';
import { routes } from '@/lib/routes';
import { cn } from '@/lib/utils';
import {
  isListingReadyToPublish,
  listingMissingFields,
  publishStatusLabel,
  type AgentListing,
  type AgentPublishStatus,
} from '@/services/agent-listings.service';
import {
  reviewStatusLabel,
  type MyPropertySubmission,
  type SubmissionReviewStatus,
} from '@/services/property-submissions.service';

function statusBadgeClass(status: AgentPublishStatus): string {
  switch (status) {
    case 'published':
      return 'bg-emerald-50 text-emerald-700 ring-emerald-200';
    case 'pending_review':
      return 'bg-amber-50 text-amber-800 ring-amber-200';
    default:
      return 'bg-hz-bg-soft text-hz-muted ring-hz-border';
  }
}

function submissionBadgeClass(status: SubmissionReviewStatus): string {
  switch (status) {
    case 'rejected':
      return 'bg-red-50 text-red-700 ring-red-200';
    default:
      return 'bg-amber-50 text-amber-800 ring-amber-200';
  }
}

function formatPrice(amount: number, currency?: string | null): string {
  const symbol = currency?.trim() || '$';
  return `${symbol}${Number(amount || 0).toLocaleString()}`;
}

function formatListingPrice(listing: AgentListing): string {
  return formatPrice(listing.price, listing.currency);
}

export function MyListingsPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const isAgent = isAgentUser(user);
  const enabled = isAuthenticated && isAgent;
  const {
    data: listings = [],
    isLoading: listingsLoading,
    isError: listingsError,
    error: listingsErr,
    refetch: refetchListings,
  } = useMyListingsQuery(enabled);
  const {
    data: submissions = [],
    isLoading: submissionsLoading,
    isError: submissionsError,
    error: submissionsErr,
    refetch: refetchSubmissions,
  } = useMyPropertySubmissionsQuery(enabled);
  const deleteMutation = useDeleteMyListingMutation();
  const cancelMutation = useCancelPropertySubmissionMutation();

  const isLoading = listingsLoading || submissionsLoading;
  const isError = listingsError || submissionsError;
  const error = listingsErr || submissionsErr;
  const isEmpty = listings.length === 0 && submissions.length === 0;

  function handleDelete(listing: AgentListing) {
    const ok = window.confirm(
      `Delete “${listing.title}”? This removes it from your properties${
        listing.publish_status === 'published' ? ' and the public site' : ''
      }.`
    );
    if (!ok) return;
    void deleteMutation.mutateAsync(listing.id);
  }

  function handleCancelSubmission(submission: MyPropertySubmission) {
    const ok = window.confirm(
      `Cancel “${submission.title}”? It will be removed and will not be reviewed.`
    );
    if (!ok) return;
    void cancelMutation.mutateAsync(submission.id);
  }

  function refetchAll() {
    void refetchListings();
    void refetchSubmissions();
  }

  if (authLoading) {
    return (
      <main id="main-content" className="section-container py-20 text-center">
        <p className="font-poppins text-sm text-hz-muted">Loading your account…</p>
      </main>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <main id="main-content" className="section-container py-20 text-center">
        <p className="mb-2 font-poppins text-[11px] font-semibold uppercase tracking-[2px] text-hz-primary">
          My Property
        </p>
        <h1 className="font-poppins text-3xl font-semibold text-hz-dark">Sign in required</h1>
        <p className="mx-auto mt-4 max-w-md font-poppins text-sm text-hz-muted">
          Agent accounts can manage drafts after CMS approval.
        </p>
        <Link
          to={routes.login}
          className="mt-8 inline-block rounded-hz bg-hz-primary px-6 py-2.5 font-poppins text-sm font-semibold text-white no-underline hover:bg-hz-primary-hover"
        >
          Sign In
        </Link>
      </main>
    );
  }

  if (!isAgent) {
    return (
      <main id="main-content" className="section-container py-20 text-center">
        <p className="mb-2 font-poppins text-[11px] font-semibold uppercase tracking-[2px] text-hz-primary">
          My Property
        </p>
        <h1 className="font-poppins text-3xl font-semibold text-hz-dark">Agents only</h1>
        <p className="mx-auto mt-4 max-w-md font-poppins text-sm text-hz-muted">
          This area is for agent accounts. Member accounts can still use wishlist and compare.
        </p>
        <Link
          to={routes.dashboard}
          className="mt-8 inline-block rounded-hz border border-hz-border px-6 py-2.5 font-poppins text-sm font-medium text-hz-dark no-underline hover:border-hz-primary hover:text-hz-primary"
        >
          Back to dashboard
        </Link>
      </main>
    );
  }

  return (
    <main id="main-content" className="bg-hz-elevated py-10 md:py-16">
      <div className="section-container">
        <Link
          to={routes.dashboard}
          className="mb-6 inline-flex items-center gap-2 font-poppins text-sm text-hz-body no-underline transition-colors hover:text-hz-primary"
        >
          <ArrowLeft size={16} />
          Back to dashboard
        </Link>

        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 font-poppins text-[11px] font-semibold uppercase tracking-[2px] text-hz-primary">
              Agent workspace
            </p>
            <h1 className="font-poppins text-2xl font-semibold text-hz-dark md:text-3xl">
              My Property
            </h1>
            <p className="mt-1 max-w-xl font-poppins text-sm text-hz-muted">
              Track submissions awaiting approval, then edit and publish approved drafts.
            </p>
          </div>
          <Link
            to={routes.submitProperty}
            className="rounded-hz bg-hz-primary px-5 py-2.5 font-poppins text-sm font-semibold text-white no-underline hover:bg-hz-primary-hover"
          >
            Submit property
          </Link>
        </div>

        {isLoading ? (
          <div className="mt-10 space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <MyListingRowSkeleton key={i} />
            ))}
          </div>
        ) : isError ? (
          <div className="mt-10 rounded-hz border border-red-200 bg-red-50 p-6">
            <p className="font-poppins text-sm font-medium text-red-700">
              {(error as Error)?.message || 'Could not load your properties.'}
            </p>
            <button
              type="button"
              onClick={refetchAll}
              className="mt-4 rounded-hz border border-red-300 px-4 py-2 font-poppins text-sm text-red-700"
            >
              Try again
            </button>
          </div>
        ) : isEmpty ? (
          <div className="mt-10 rounded-hz border border-hz-border bg-hz-bg-soft p-8 text-center">
            <h2 className="font-poppins text-lg font-semibold text-hz-dark">No properties yet</h2>
            <p className="mx-auto mt-2 max-w-md font-poppins text-sm text-hz-muted">
              Submit a property while logged in — it will show here as waiting for approval until an
              admin reviews it.
            </p>
            <Link
              to={routes.submitProperty}
              className="mt-6 inline-block rounded-hz bg-hz-primary px-5 py-2.5 font-poppins text-sm font-semibold text-white no-underline hover:bg-hz-primary-hover"
            >
              Submit a property
            </Link>
          </div>
        ) : (
          <ul className="mt-10 space-y-3">
            {submissions.map((submission) => (
              <SubmissionRow
                key={`submission-${submission.id}`}
                submission={submission}
                cancelling={
                  cancelMutation.isPending && cancelMutation.variables === submission.id
                }
                onCancel={() => handleCancelSubmission(submission)}
              />
            ))}
            {listings.map((listing) => {
              const busy = deleteMutation.isPending && deleteMutation.variables === listing.id;
              const canPublish = isListingReadyToPublish(listing);
              const missing = listingMissingFields(listing);

              return (
                <li
                  key={`listing-${listing.id}`}
                  className="rounded-hz border border-hz-border bg-hz-elevated p-4 shadow-sm md:p-5"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="truncate font-poppins text-base font-semibold text-hz-dark">
                          {listing.title}
                        </h2>
                        <span
                          className={cn(
                            'inline-flex rounded-full px-2.5 py-0.5 font-poppins text-[11px] font-medium ring-1 ring-inset',
                            statusBadgeClass(listing.publish_status)
                          )}
                        >
                          {publishStatusLabel(listing.publish_status)}
                        </span>
                      </div>
                      <p className="mt-1 font-poppins text-sm text-hz-muted">
                        {listing.location ||
                          [listing.street, listing.city].filter(Boolean).join(', ') ||
                          '—'}
                        {' · '}
                        {listing.type} · {formatListingPrice(listing)}
                      </p>
                      <p className="mt-1 font-poppins text-xs text-hz-muted">
                        {listing.beds} bed · {listing.baths} bath · {listing.sqft} sqft
                      </p>
                      {listing.publish_status !== 'published' && !canPublish && missing.length > 0 ? (
                        <p className="mt-2 font-poppins text-xs text-amber-700">
                          Incomplete: {missing.join(', ')}
                        </p>
                      ) : null}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {listing.publish_status === 'published' ? (
                        <Link
                          to={routes.property(listing.slug)}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-hz border border-hz-border px-3 py-2 font-poppins text-xs font-semibold text-hz-dark no-underline hover:bg-hz-bg-soft"
                        >
                          <ExternalLink size={14} />
                          See in public
                        </Link>
                      ) : null}

                      <Link
                        to={routes.myPropertyDetail(listing.id)}
                        className="inline-flex items-center gap-1.5 rounded-hz bg-hz-primary px-3 py-2 font-poppins text-xs font-semibold text-white no-underline hover:bg-hz-primary-hover"
                      >
                        <Eye size={14} />
                        View
                      </Link>

                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => handleDelete(listing)}
                        className="inline-flex items-center gap-1.5 rounded-hz border border-red-200 px-3 py-2 font-poppins text-xs font-semibold text-red-700 hover:bg-red-50 disabled:opacity-50"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </main>
  );
}

function SubmissionRow({
  submission,
  cancelling,
  onCancel,
}: {
  submission: MyPropertySubmission;
  cancelling: boolean;
  onCancel: () => void;
}) {
  const waiting = submission.review_status === 'pending';

  return (
    <li className="rounded-hz border border-amber-200 bg-amber-50/40 p-4 shadow-sm md:p-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="truncate font-poppins text-base font-semibold text-hz-dark">
              {submission.title}
            </h2>
            <span
              className={cn(
                'inline-flex rounded-full px-2.5 py-0.5 font-poppins text-[11px] font-medium ring-1 ring-inset',
                submissionBadgeClass(submission.review_status)
              )}
            >
              {reviewStatusLabel(submission.review_status)}
            </span>
          </div>
          <p className="mt-1 font-poppins text-sm text-hz-muted">
            {submission.location || '—'} · {submission.type} · {formatPrice(submission.price)}
          </p>
          {waiting ? (
            <p className="mt-2 font-poppins text-xs text-amber-800">
              Submitted and waiting for admin approval. You can cancel while it is still pending.
            </p>
          ) : (
            <p className="mt-2 font-poppins text-xs text-red-700">
              {submission.review_notes?.trim()
                ? `Not approved: ${submission.review_notes.trim()}`
                : 'Not approved. Please submit again with updated details.'}
            </p>
          )}
        </div>

        {waiting ? (
          <button
            type="button"
            disabled={cancelling}
            onClick={onCancel}
            className="inline-flex items-center gap-1.5 rounded-hz border border-red-200 px-3 py-2 font-poppins text-xs font-semibold text-red-700 hover:bg-red-50 disabled:opacity-50"
          >
            <X size={14} />
            {cancelling ? 'Cancelling…' : 'Cancel'}
          </button>
        ) : null}
      </div>
    </li>
  );
}
