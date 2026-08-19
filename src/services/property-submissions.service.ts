import { apiFetch, isMockDataEnabled } from '@/services/api-client';
import { withGuestSpamFields } from '@/services/security.service';
import type { PropertyStatus, PropertyType } from '@/types';

export type SubmissionReviewStatus = 'pending' | 'approved' | 'rejected';

export interface PropertySubmissionData {
  title: string;
  type: PropertyType;
  status: PropertyStatus;
  street: string;
  city: string;
  country_code: string;
  location?: string;
  latitude: number | null;
  longitude: number | null;
  price: number;
  /** Optional S16 link to an existing listing. */
  property_slug?: string;
  property_id?: number;
  /** Optional PDF/image attachment (S11). Max 2MB. */
  attachment?: File | null;
  turnstileToken?: string;
}

export interface MyPropertySubmission {
  id: number;
  title: string;
  type: string;
  status: string;
  location: string | null;
  street?: string | null;
  city?: string | null;
  country_code?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  price: number;
  review_status: SubmissionReviewStatus;
  review_notes: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface PropertySubmissionResult {
  message: string;
  submission: MyPropertySubmission | null;
}

interface PropertySubmissionResponse {
  success: boolean;
  message: string;
  submission?: MyPropertySubmission | null;
}

interface SubmissionListResponse {
  success: boolean;
  data: MyPropertySubmission[];
}

const MOCK_SUBMISSIONS: MyPropertySubmission[] = [
  {
    id: 8001,
    title: 'Mock Pending Condo',
    type: 'Apartment',
    status: 'For Sale',
    location: 'Downtown Miami',
    price: 480_000,
    review_status: 'pending',
    review_notes: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

function submitPath(): string {
  // Property submissions require Sanctum auth (members + agents).
  return '/api/property-submissions';
}

export async function fetchMyPropertySubmissions(): Promise<MyPropertySubmission[]> {
  if (isMockDataEnabled()) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return [...MOCK_SUBMISSIONS];
  }

  const response = await apiFetch<SubmissionListResponse>('/api/property-submissions');
  return response.data ?? [];
}

export async function cancelMyPropertySubmission(id: number | string): Promise<void> {
  if (isMockDataEnabled()) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const idx = MOCK_SUBMISSIONS.findIndex((item) => String(item.id) === String(id));
    if (idx >= 0) {
      MOCK_SUBMISSIONS.splice(idx, 1);
    }
    return;
  }

  await apiFetch<{ success: boolean; message?: string }>(`/api/property-submissions/${id}`, {
    method: 'DELETE',
  });
}

export function reviewStatusLabel(status: SubmissionReviewStatus): string {
  switch (status) {
    case 'rejected':
      return 'Needs changes';
    case 'approved':
      return 'Approved';
    default:
      return 'Waiting for approval';
  }
}

export async function resubmitPropertyListing(
  id: number | string,
  data: PropertySubmissionData
): Promise<PropertySubmissionResult> {
  if (isMockDataEnabled()) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const idx = MOCK_SUBMISSIONS.findIndex((item) => String(item.id) === String(id));
    const existing = idx >= 0 ? MOCK_SUBMISSIONS[idx] : null;
    const submission: MyPropertySubmission = {
      id: Number(id),
      title: data.title,
      type: data.type,
      status: data.status,
      location:
        [data.street, data.city].filter(Boolean).join(', ') +
        (data.country_code ? ` (${data.country_code})` : ''),
      street: data.street,
      city: data.city,
      country_code: data.country_code,
      latitude: data.latitude,
      longitude: data.longitude,
      price: data.price,
      review_status: 'pending',
      review_notes: null,
      created_at: existing?.created_at ?? new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    if (idx >= 0) {
      MOCK_SUBMISSIONS[idx] = submission;
    } else {
      MOCK_SUBMISSIONS.unshift(submission);
    }
    return {
      message: `Thanks! "${data.title || 'Your property'}" has been resubmitted for review.`,
      submission,
    };
  }

  const { turnstileToken, attachment, ...fields } = data;
  const spamSafe = await withGuestSpamFields(
    Object.fromEntries(
      Object.entries(fields).filter(([, value]) => {
        if (value === undefined || value === null || value === '') return false;
        if (typeof value === 'number' && Number.isNaN(value)) return false;
        return true;
      })
    ),
    turnstileToken ?? ''
  );

  const path = `${submitPath()}/${id}`;

  if (attachment) {
    const formData = new FormData();
    for (const [key, value] of Object.entries(spamSafe)) {
      formData.append(key, String(value));
    }
    formData.append('attachment', attachment);

    const response = await apiFetch<PropertySubmissionResponse>(path, {
      method: 'PUT',
      body: formData,
    });

    return {
      message: response.message,
      submission: response.submission ?? null,
    };
  }

  const response = await apiFetch<PropertySubmissionResponse>(path, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(spamSafe),
  });

  return {
    message: response.message,
    submission: response.submission ?? null,
  };
}

export async function submitPropertyListing(
  data: PropertySubmissionData
): Promise<PropertySubmissionResult> {
  if (isMockDataEnabled()) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const submission: MyPropertySubmission = {
      id: Date.now(),
      title: data.title,
      type: data.type,
      status: data.status,
      location:
        data.location ||
        [data.street, data.city].filter(Boolean).join(', ') +
          (data.country_code ? ` (${data.country_code})` : ''),
      street: data.street,
      city: data.city,
      country_code: data.country_code,
      latitude: data.latitude,
      longitude: data.longitude,
      price: data.price,
      review_status: 'pending',
      review_notes: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    MOCK_SUBMISSIONS.unshift(submission);
    return {
      message: `Thanks! "${data.title || 'Your property'}" has been submitted. Our team will review your listing and contact you shortly.`,
      submission,
    };
  }

  const { turnstileToken, attachment, ...fields } = data;
  const spamSafe = await withGuestSpamFields(
    Object.fromEntries(
      Object.entries(fields).filter(([, value]) => {
        if (value === undefined || value === null || value === '') return false;
        if (typeof value === 'number' && Number.isNaN(value)) return false;
        return true;
      })
    ),
    turnstileToken ?? ''
  );

  const path = submitPath();

  // Multipart when an attachment is present (backend expects `attachment` file).
  if (attachment) {
    const formData = new FormData();
    for (const [key, value] of Object.entries(spamSafe)) {
      formData.append(key, String(value));
    }
    formData.append('attachment', attachment);

    const response = await apiFetch<PropertySubmissionResponse>(path, {
      method: 'POST',
      body: formData,
    });

    return {
      message: response.message,
      submission: response.submission ?? null,
    };
  }

  const response = await apiFetch<PropertySubmissionResponse>(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(spamSafe),
  });

  return {
    message: response.message,
    submission: response.submission ?? null,
  };
}
