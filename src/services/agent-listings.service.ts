import { apiFetch, isMockDataEnabled } from '@/services/api-client';
import type { CustomLayout, MediaSlotField } from '@/data/property-media-slots';
import { PROPERTY_GALLERY_COUNT } from '@/lib/property-gallery';

export type AgentPublishStatus = 'draft' | 'pending_review' | 'published';

export interface AgentMediaSlot {
  label: string;
  help: string;
  layout: CustomLayout | null;
  value: string | null;
  preview_url: string | null;
  is_uploaded: boolean;
}

export interface AgentGallerySlot {
  index: number;
  id: number | null;
  sort_order: number;
  label: string;
  help: string;
  value: string | null;
  preview_url: string | null;
  alt: string | null;
  is_uploaded: boolean;
}

export interface AgentListing {
  id: number;
  slug: string;
  title: string;
  street: string | null;
  city: string | null;
  country_code: string | null;
  location: string | null;
  price: number;
  currency: string | null;
  status: string;
  type: string;
  beds: number;
  baths: number;
  sqft: number;
  garage: number | null;
  description: string | null;
  tagline: string | null;
  image_url: string | null;
  custom_layout: CustomLayout;
  gallery: AgentGallerySlot[];
  features: unknown;
  amenities: unknown;
  latitude: number | null;
  longitude: number | null;
  layout1_showcase_one_url: string | null;
  layout1_showcase_two_url: string | null;
  layout1_showcase_three_url: string | null;
  layout1_feature_vertical_url: string | null;
  layout1_feature_square_url: string | null;
  layout1_banner_url: string | null;
  layout2_split_vertical_url: string | null;
  layout2_split_landscape_url: string | null;
  layout2_banner_url: string | null;
  media?: Partial<Record<MediaSlotField, AgentMediaSlot>>;
  publish_status: AgentPublishStatus;
  ready_to_publish?: boolean;
  missing_fields?: string[];
}

export type AgentListingUpdateInput = Partial<{
  title: string;
  street: string;
  city: string;
  country_code: string;
  price: number;
  currency: string;
  status: string;
  type: string;
  beds: number;
  baths: number;
  sqft: number;
  garage: number | null;
  description: string;
  tagline: string;
  custom_layout: CustomLayout;
  latitude: number | null;
  longitude: number | null;
}>;

interface ListResponse {
  success: boolean;
  data: AgentListing[];
}

interface ItemResponse {
  success: boolean;
  message?: string;
  property: AgentListing;
}

const emptyMedia = (): Partial<Record<MediaSlotField, AgentMediaSlot>> => ({
  image_url: {
    label: 'Cover image',
    help: '',
    layout: null,
    value: null,
    preview_url: null,
    is_uploaded: false,
  },
});

function emptyGallerySlots(): AgentGallerySlot[] {
  return Array.from({ length: PROPERTY_GALLERY_COUNT }, (_, index) => {
    const page = index < PROPERTY_GALLERY_COUNT / 2 ? 1 : 2;
    const tile = (index % 4) + 1;
    return {
      index,
      id: null,
      sort_order: index,
      label: `Gallery ${index + 1}`,
      help: `Explore every angle — page ${page}, tile ${tile}. Ratio 4:3.`,
      value: null,
      preview_url: null,
      alt: null,
      is_uploaded: false,
    };
  });
}

function normalizeGallery(raw: unknown): AgentGallerySlot[] {
  const base = emptyGallerySlots();
  if (!Array.isArray(raw)) return base;

  raw.forEach((item) => {
    if (!item || typeof item !== 'object') return;
    const slot = item as Partial<AgentGallerySlot>;
    const index =
      typeof slot.index === 'number'
        ? slot.index
        : typeof slot.sort_order === 'number'
          ? slot.sort_order
          : -1;
    if (index < 0 || index >= PROPERTY_GALLERY_COUNT) return;
    base[index] = {
      ...base[index],
      ...slot,
      index,
      sort_order: index,
      id: typeof slot.id === 'number' ? slot.id : null,
      label: typeof slot.label === 'string' ? slot.label : base[index].label,
      help: typeof slot.help === 'string' ? slot.help : base[index].help,
      value: typeof slot.value === 'string' ? slot.value : null,
      preview_url: typeof slot.preview_url === 'string' ? slot.preview_url : null,
      alt: typeof slot.alt === 'string' ? slot.alt : null,
      is_uploaded: Boolean(slot.is_uploaded ?? slot.preview_url ?? slot.value),
    };
  });

  return base;
}

function normalizeListing(listing: AgentListing): AgentListing {
  return {
    ...listing,
    gallery: normalizeGallery(listing.gallery),
  };
}

const MOCK_LISTINGS: AgentListing[] = [
  {
    id: 9001,
    slug: 'mock-agent-draft',
    title: 'Mock Draft Villa',
    street: '12 Palm Avenue',
    city: 'Miami',
    country_code: 'US',
    location: '12 Palm Avenue, Miami (US)',
    price: 750_000,
    currency: '$',
    status: 'For Sale',
    type: 'Villa',
    beds: 4,
    baths: 3,
    sqft: 2800,
    garage: 2,
    description: 'Imported from property submission (mock). Complete details, then publish.',
    tagline: null,
    image_url: null,
    custom_layout: 'layout-1',
    gallery: emptyGallerySlots(),
    features: null,
    amenities: null,
    latitude: 25.7617,
    longitude: -80.1918,
    layout1_showcase_one_url: null,
    layout1_showcase_two_url: null,
    layout1_showcase_three_url: null,
    layout1_feature_vertical_url: null,
    layout1_feature_square_url: null,
    layout1_banner_url: null,
    layout2_split_vertical_url: null,
    layout2_split_landscape_url: null,
    layout2_banner_url: null,
    media: emptyMedia(),
    publish_status: 'draft',
    ready_to_publish: false,
    missing_fields: ['cover image', `gallery (exactly ${PROPERTY_GALLERY_COUNT} photos)`],
  },
];

/** Client-side mirror of backend ListingPublishReadiness (fallback if API omits flags). */
export function listingMissingFields(listing: AgentListing): string[] {
  if (Array.isArray(listing.missing_fields)) {
    return listing.missing_fields;
  }

  const missing: string[] = [];
  const filled = (v: unknown) => (typeof v === 'string' ? v.trim() !== '' : v != null && v !== '');

  if (!filled(listing.title)) missing.push('title');
  if (!filled(listing.street)) missing.push('street');
  if (!filled(listing.city)) missing.push('city');
  if (!filled(listing.country_code)) missing.push('country');
  if (listing.latitude == null || listing.longitude == null) missing.push('map location');
  if (listing.price == null || Number(listing.price) < 0) missing.push('price');
  if (!filled(listing.currency)) missing.push('currency');
  if (!filled(listing.status)) missing.push('status');
  if (!filled(listing.type)) missing.push('type');
  if (listing.beds == null) missing.push('beds');
  if (listing.baths == null) missing.push('baths');
  if (listing.sqft == null || Number(listing.sqft) <= 0) missing.push('sqft');
  const coverUploaded = listing.media?.image_url?.is_uploaded ?? Boolean(listing.image_url);
  if (!coverUploaded) missing.push('cover image');

  const gallery = normalizeGallery(listing.gallery);
  const galleryUploaded = gallery.filter((slot) => slot.is_uploaded).length;
  if (galleryUploaded !== PROPERTY_GALLERY_COUNT) {
    missing.push(`gallery (exactly ${PROPERTY_GALLERY_COUNT} photos)`);
  }

  const desc = typeof listing.description === 'string' ? listing.description.trim() : '';
  if (!desc || desc.length < 20) {
    missing.push('description');
  }

  return missing;
}

export function isListingReadyToPublish(listing: AgentListing): boolean {
  if (typeof listing.ready_to_publish === 'boolean') {
    return listing.ready_to_publish;
  }
  return listingMissingFields(listing).length === 0;
}

export function mediaPreview(listing: AgentListing, field: MediaSlotField): string | null {
  return listing.media?.[field]?.preview_url ?? null;
}

export function galleryPreview(listing: AgentListing, index: number): string | null {
  return normalizeGallery(listing.gallery)[index]?.preview_url ?? null;
}

export async function fetchMyListings(): Promise<AgentListing[]> {
  if (isMockDataEnabled()) {
    await new Promise((r) => setTimeout(r, 250));
    return MOCK_LISTINGS.map(normalizeListing);
  }

  const response = await apiFetch<ListResponse>('/api/properties');
  return (response.data ?? []).map(normalizeListing);
}

export async function fetchMyListing(id: number | string): Promise<AgentListing> {
  if (isMockDataEnabled()) {
    await new Promise((r) => setTimeout(r, 200));
    const found = MOCK_LISTINGS.find((item) => String(item.id) === String(id));
    if (!found) {
      throw new Error('Listing not found');
    }
    return normalizeListing(found);
  }

  const response = await apiFetch<ItemResponse>(`/api/properties/${id}`);
  return normalizeListing(response.property);
}

export async function updateMyListing(
  id: number | string,
  input: AgentListingUpdateInput
): Promise<AgentListing> {
  if (isMockDataEnabled()) {
    await new Promise((r) => setTimeout(r, 300));
    const idx = MOCK_LISTINGS.findIndex((item) => String(item.id) === String(id));
    if (idx < 0) throw new Error('Listing not found');
    MOCK_LISTINGS[idx] = { ...MOCK_LISTINGS[idx], ...input };
    return normalizeListing(MOCK_LISTINGS[idx]);
  }

  const response = await apiFetch<ItemResponse>(`/api/properties/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  return normalizeListing(response.property);
}

export async function uploadMyListingMedia(
  id: number | string,
  field: MediaSlotField,
  file: File
): Promise<AgentListing> {
  if (isMockDataEnabled()) {
    await new Promise((r) => setTimeout(r, 300));
    const idx = MOCK_LISTINGS.findIndex((item) => String(item.id) === String(id));
    if (idx < 0) throw new Error('Listing not found');
    const preview = URL.createObjectURL(file);
    const media = { ...(MOCK_LISTINGS[idx].media ?? {}) };
    media[field] = {
      label: field,
      help: '',
      layout: null,
      value: `mock/${field}`,
      preview_url: preview,
      is_uploaded: true,
    };
    MOCK_LISTINGS[idx] = {
      ...MOCK_LISTINGS[idx],
      media,
      ...(field === 'image_url' ? { image_url: `mock/${field}` } : { [field]: `mock/${field}` }),
    };
    return normalizeListing(MOCK_LISTINGS[idx]);
  }

  const formData = new FormData();
  formData.append('field', field);
  formData.append('image', file);

  const response = await apiFetch<ItemResponse>(`/api/properties/${id}/media`, {
    method: 'POST',
    body: formData,
  });
  return normalizeListing(response.property);
}

export async function clearMyListingMedia(
  id: number | string,
  field: MediaSlotField
): Promise<AgentListing> {
  if (isMockDataEnabled()) {
    await new Promise((r) => setTimeout(r, 200));
    const idx = MOCK_LISTINGS.findIndex((item) => String(item.id) === String(id));
    if (idx < 0) throw new Error('Listing not found');
    const media = { ...(MOCK_LISTINGS[idx].media ?? {}) };
    media[field] = {
      label: field,
      help: '',
      layout: null,
      value: null,
      preview_url: null,
      is_uploaded: false,
    };
    MOCK_LISTINGS[idx] = {
      ...MOCK_LISTINGS[idx],
      media,
      ...(field === 'image_url' ? { image_url: null } : { [field]: null }),
    };
    return normalizeListing(MOCK_LISTINGS[idx]);
  }

  const response = await apiFetch<ItemResponse>(`/api/properties/${id}/media`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ field }),
  });
  return normalizeListing(response.property);
}

export async function uploadMyListingGallery(
  id: number | string,
  index: number,
  file: File
): Promise<AgentListing> {
  if (isMockDataEnabled()) {
    await new Promise((r) => setTimeout(r, 300));
    const idx = MOCK_LISTINGS.findIndex((item) => String(item.id) === String(id));
    if (idx < 0) throw new Error('Listing not found');
    if (index < 0 || index >= PROPERTY_GALLERY_COUNT) {
      throw new Error('Invalid gallery slot');
    }
    const preview = URL.createObjectURL(file);
    const gallery = normalizeGallery(MOCK_LISTINGS[idx].gallery);
    gallery[index] = {
      ...gallery[index],
      id: gallery[index].id ?? index + 1,
      value: `mock/gallery_${index}`,
      preview_url: preview,
      is_uploaded: true,
    };
    MOCK_LISTINGS[idx] = { ...MOCK_LISTINGS[idx], gallery };
    return normalizeListing(MOCK_LISTINGS[idx]);
  }

  const formData = new FormData();
  formData.append('index', String(index));
  formData.append('image', file);

  const response = await apiFetch<ItemResponse>(`/api/properties/${id}/gallery`, {
    method: 'POST',
    body: formData,
  });
  return normalizeListing(response.property);
}

export async function clearMyListingGallery(
  id: number | string,
  index: number
): Promise<AgentListing> {
  if (isMockDataEnabled()) {
    await new Promise((r) => setTimeout(r, 200));
    const idx = MOCK_LISTINGS.findIndex((item) => String(item.id) === String(id));
    if (idx < 0) throw new Error('Listing not found');
    if (index < 0 || index >= PROPERTY_GALLERY_COUNT) {
      throw new Error('Invalid gallery slot');
    }
    const gallery = normalizeGallery(MOCK_LISTINGS[idx].gallery);
    gallery[index] = {
      ...emptyGallerySlots()[index],
    };
    MOCK_LISTINGS[idx] = { ...MOCK_LISTINGS[idx], gallery };
    return normalizeListing(MOCK_LISTINGS[idx]);
  }

  const response = await apiFetch<ItemResponse>(`/api/properties/${id}/gallery`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ index }),
  });
  return normalizeListing(response.property);
}

export async function publishMyListing(id: number | string): Promise<AgentListing> {
  if (isMockDataEnabled()) {
    await new Promise((r) => setTimeout(r, 300));
    const idx = MOCK_LISTINGS.findIndex((item) => String(item.id) === String(id));
    if (idx < 0) throw new Error('Listing not found');
    MOCK_LISTINGS[idx] = { ...MOCK_LISTINGS[idx], publish_status: 'published' };
    return normalizeListing(MOCK_LISTINGS[idx]);
  }

  const response = await apiFetch<ItemResponse>(`/api/properties/${id}/publish`, {
    method: 'POST',
  });
  return normalizeListing(response.property);
}

export async function unpublishMyListing(id: number | string): Promise<AgentListing> {
  if (isMockDataEnabled()) {
    await new Promise((r) => setTimeout(r, 300));
    const idx = MOCK_LISTINGS.findIndex((item) => String(item.id) === String(id));
    if (idx < 0) throw new Error('Listing not found');
    MOCK_LISTINGS[idx] = { ...MOCK_LISTINGS[idx], publish_status: 'draft' };
    return normalizeListing(MOCK_LISTINGS[idx]);
  }

  const response = await apiFetch<ItemResponse>(`/api/properties/${id}/unpublish`, {
    method: 'POST',
  });
  return normalizeListing(response.property);
}

export async function deleteMyListing(id: number | string): Promise<void> {
  if (isMockDataEnabled()) {
    await new Promise((r) => setTimeout(r, 300));
    const idx = MOCK_LISTINGS.findIndex((item) => String(item.id) === String(id));
    if (idx < 0) throw new Error('Listing not found');
    MOCK_LISTINGS.splice(idx, 1);
    return;
  }

  await apiFetch<{ success: boolean; message?: string }>(`/api/properties/${id}`, {
    method: 'DELETE',
  });
}

export function publishStatusLabel(status: AgentPublishStatus): string {
  switch (status) {
    case 'published':
      return 'Published';
    case 'pending_review':
      return 'Pending review';
    default:
      return 'Draft';
  }
}
