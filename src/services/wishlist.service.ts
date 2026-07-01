import { apiFetch, useMockData } from '@/services/api-client';

const STORAGE_KEY = 'homzen-wishlist';

function readLocalWishlist(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === 'string') : [];
  } catch {
    return [];
  }
}

function writeLocalWishlist(ids: string[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

export async function getWishlistIds(): Promise<string[]> {
  if (useMockData()) {
    return readLocalWishlist();
  }
  return apiFetch<string[]>('/wishlist');
}

export async function toggleWishlistItem(propertyId: string): Promise<string[]> {
  if (useMockData()) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const current = readLocalWishlist();
    const next = current.includes(propertyId)
      ? current.filter((id) => id !== propertyId)
      : [...current, propertyId];
    writeLocalWishlist(next);
    return next;
  }

  return apiFetch<string[]>(`/wishlist/${propertyId}`, { method: 'POST' });
}
