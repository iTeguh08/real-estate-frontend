import { describe, expect, it } from 'vitest';
import { routes } from '@/lib/routes';
import {
  agentWorkQueue,
  pickDashboardNextAction,
} from '@/lib/dashboard-next-action';
import type { AgentListing } from '@/services/agent-listings.service';
import type { MyPropertySubmission } from '@/services/property-submissions.service';

function listing(partial: Partial<AgentListing> & Pick<AgentListing, 'id' | 'title'>): AgentListing {
  return {
    slug: 'x',
    street: '1 St',
    city: 'Miami',
    country_code: 'US',
    location: 'Miami',
    price: 1,
    currency: 'USD',
    status: 'For Sale',
    type: 'House',
    beds: 1,
    baths: 1,
    sqft: 100,
    garage: null,
    description: 'A description long enough to pass.',
    tagline: null,
    image_url: '/a.jpg',
    custom_layout: 'layout-1',
    gallery: [],
    features: [],
    amenities: [],
    latitude: 1,
    longitude: 1,
    layout1_showcase_one_url: null,
    layout1_showcase_two_url: null,
    layout1_showcase_three_url: null,
    layout1_feature_vertical_url: null,
    layout1_feature_square_url: null,
    layout1_banner_url: null,
    layout2_split_vertical_url: null,
    layout2_split_landscape_url: null,
    layout2_banner_url: null,
    publish_status: 'draft',
    ready_to_publish: false,
    missing_fields: ['cover image'],
    ...partial,
  };
}

function submission(
  partial: Partial<MyPropertySubmission> & Pick<MyPropertySubmission, 'id' | 'title' | 'review_status'>,
): MyPropertySubmission {
  return {
    type: 'House',
    status: 'For Sale',
    location: null,
    price: 1,
    review_notes: null,
    created_at: null,
    updated_at: null,
    ...partial,
  };
}

const memberBase = {
  isAgent: false,
  listings: [] as AgentListing[],
  submissions: [] as MyPropertySubmission[],
  compareMax: 3,
};

describe('pickDashboardNextAction', () => {
  it('sends rejected submissions before incomplete drafts', () => {
    const action = pickDashboardNextAction({
      isAgent: true,
      wishlistCount: 0,
      compareCount: 0,
      compareMax: 3,
      listings: [listing({ id: 1, title: 'Draft Villa', missing_fields: ['price'] })],
      submissions: [submission({ id: 9, title: 'Bad Condo', review_status: 'rejected' })],
    });
    expect(action.href).toBe(routes.myProperty);
    expect(action.title).toContain('Bad Condo');
  });

  it('opens the draft with the fewest missing fields', () => {
    const action = pickDashboardNextAction({
      isAgent: true,
      wishlistCount: 0,
      compareCount: 0,
      compareMax: 3,
      listings: [
        listing({ id: 2, title: 'Long', missing_fields: ['a', 'b', 'c'] }),
        listing({ id: 3, title: 'Short', missing_fields: ['cover image'] }),
      ],
      submissions: [],
    });
    expect(action.href).toBe(routes.myPropertyDetail(3));
    expect(action.cta).toBe('Continue editing');
  });

  it('points members to compare when two or more are selected', () => {
    const action = pickDashboardNextAction({
      ...memberBase,
      wishlistCount: 4,
      compareCount: 2,
    });
    expect(action.href).toBe(routes.compare);
  });

  it('sends empty-wishlist members to listings', () => {
    const action = pickDashboardNextAction({
      ...memberBase,
      wishlistCount: 0,
      compareCount: 0,
    });
    expect(action.href).toBe(routes.listings);
  });

  it('sends members with one compare slot to add a second listing', () => {
    const fromWishlist = pickDashboardNextAction({
      ...memberBase,
      wishlistCount: 3,
      compareCount: 1,
    });
    expect(fromWishlist.href).toBe(routes.wishlist);
    expect(fromWishlist.cta).toBe('Open wishlist');

    const fromBrowse = pickDashboardNextAction({
      ...memberBase,
      wishlistCount: 0,
      compareCount: 1,
    });
    expect(fromBrowse.href).toBe(routes.listings);
  });
});

describe('agentWorkQueue', () => {
  it('skips published listings and caps length', () => {
    const queue = agentWorkQueue(
      [
        listing({ id: 1, title: 'Live', publish_status: 'published', missing_fields: [], ready_to_publish: true }),
        listing({ id: 2, title: 'A', missing_fields: ['x'] }),
        listing({ id: 3, title: 'B', missing_fields: ['x', 'y'] }),
        listing({ id: 4, title: 'C', missing_fields: ['x'] }),
        listing({ id: 5, title: 'D', missing_fields: ['x'] }),
        listing({ id: 6, title: 'E', missing_fields: ['x'] }),
      ],
      4,
    );
    expect(queue.map((item) => item.id)).toEqual([2, 4, 5, 6]);
  });

  it('omits the listing already used as the primary next action', () => {
    const queue = agentWorkQueue(
      [
        listing({ id: 2, title: 'A', missing_fields: ['x'] }),
        listing({ id: 3, title: 'B', missing_fields: ['x', 'y'] }),
      ],
      4,
      routes.myPropertyDetail(2),
    );
    expect(queue.map((item) => item.id)).toEqual([3]);
  });
});
