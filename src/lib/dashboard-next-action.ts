import { routes } from '@/lib/routes';
import {
  listingMissingFields,
  type AgentListing,
} from '@/services/agent-listings.service';
import type { MyPropertySubmission } from '@/services/property-submissions.service';

export type DashboardNextAction = {
  title: string;
  body: string;
  href: string;
  cta: string;
};

export type DashboardWorkItem = {
  id: number;
  title: string;
  href: string;
  hint: string;
};

export type DashboardNextActionInput = {
  isAgent: boolean;
  wishlistCount: number;
  compareCount: number;
  compareMax: number;
  listings: AgentListing[];
  submissions: MyPropertySubmission[];
};

type RankedDraft = { listing: AgentListing; missing: string[] };

function rankedIncomplete(listings: AgentListing[]): RankedDraft[] {
  return listings
    .map((listing) => ({ listing, missing: listingMissingFields(listing) }))
    .filter(({ listing, missing }) => listing.publish_status !== 'published' && missing.length > 0)
    .sort((a, b) => a.missing.length - b.missing.length || a.listing.id - b.listing.id);
}

/** Rank one primary next step. Agents: rejected → shortest incomplete draft → wait CMS → submit. Members: compare-ready → one slot left → empty wishlist → shortlist. */
export function pickDashboardNextAction(input: DashboardNextActionInput): DashboardNextAction {
  const { isAgent, wishlistCount, compareCount, compareMax, listings, submissions } = input;

  if (isAgent) {
    const rejected = submissions.find((item) => item.review_status === 'rejected');
    if (rejected) {
      return {
        title: `“${rejected.title}” was rejected`,
        body: 'Open My Property for review notes, then submit a corrected listing.',
        href: routes.myProperty,
        cta: 'Open My Property',
      };
    }

    const nextDraft = rankedIncomplete(listings)[0];
    if (nextDraft) {
      const { listing, missing } = nextDraft;
      return {
        title: `Finish “${listing.title}”`,
        body:
          missing.length === 1
            ? `Still needs ${missing[0]}.`
            : `${missing.length} fields left. Shortest path to publish first.`,
        href: routes.myPropertyDetail(listing.id),
        cta: 'Continue editing',
      };
    }

    const pendingSub = submissions.find((item) => item.review_status === 'pending');
    if (pendingSub) {
      return {
        title: 'Waiting on CMS approval',
        body: `“${pendingSub.title}” is in review. You can still browse listings or submit another lead.`,
        href: routes.myProperty,
        cta: 'View status',
      };
    }

    const pendingListing = listings.find((item) => item.publish_status === 'pending_review');
    if (pendingListing) {
      return {
        title: 'Listing in review',
        body: `“${pendingListing.title}” is locked until CMS finishes review.`,
        href: routes.myProperty,
        cta: 'View status',
      };
    }

    if (listings.length === 0 && submissions.length === 0) {
      return {
        title: 'Submit your first property',
        body: 'CMS reviews the lead, then you complete media and publish from My Property.',
        href: routes.submitProperty,
        cta: 'Submit property',
      };
    }

    return {
      title: 'Listings are up to date',
      body: 'Published properties stay on the public site. Submit another lead when you have one.',
      href: routes.myProperty,
      cta: 'Manage properties',
    };
  }

  if (compareCount >= 2) {
    return {
      title: 'Compare is ready',
      body: `${compareCount} of ${compareMax} listings selected. Open the table before adding more.`,
      href: routes.compare,
      cta: 'Open compare',
    };
  }

  if (compareCount === 1) {
    return {
      title: 'Add one more to compare',
      body: `1 of ${compareMax} selected. Compare needs two listings.`,
      href: wishlistCount > 0 ? routes.wishlist : routes.listings,
      cta: wishlistCount > 0 ? 'Open wishlist' : 'Browse listings',
    };
  }

  if (wishlistCount === 0) {
    return {
      title: 'Save homes as you browse',
      body: 'Heart a listing to keep it on this device. Add two or more to compare side by side.',
      href: routes.listings,
      cta: 'Browse listings',
    };
  }

  return {
    title: 'Build a shortlist',
    body: `${wishlistCount} saved. Add a second listing to compare (max ${compareMax}).`,
    href: routes.wishlist,
    cta: 'Open wishlist',
  };
}

export function agentWorkQueue(
  listings: AgentListing[],
  limit = 4,
  skipHref?: string,
): DashboardWorkItem[] {
  return rankedIncomplete(listings)
    .filter(({ listing }) => routes.myPropertyDetail(listing.id) !== skipHref)
    .slice(0, limit)
    .map(({ listing, missing }) => ({
      id: listing.id,
      title: listing.title,
      href: routes.myPropertyDetail(listing.id),
      hint: missing.length === 1 ? missing[0] : `${missing.length} fields left`,
    }));
}
