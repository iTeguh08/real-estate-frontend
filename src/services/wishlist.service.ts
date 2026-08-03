import { apiFetch, isMockDataEnabled } from '@/services/api-client';
import { getPropertiesByIds } from '@/services/properties.service';
import type { Property } from '@/types';

const STORAGE_KEY = 'homzen-wishlist';

function readLocalWishlist(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed)
      ? parsed
          .filter((id): id is string | number => typeof id === 'string' || typeof id === 'number')
          .map(String)
      : [];
  } catch {
    return [];
  }
}

function writeLocalWishlist(ids: string[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids.map(String)));
}

function normalizeIds(ids: unknown): string[] {
  if (!Array.isArray(ids)) return [];
  return ids
    .filter((id): id is string | number => typeof id === 'string' || typeof id === 'number')
    .map(String);
}

export async function getWishlistIds(): Promise<string[]> {
  if (isMockDataEnabled()) {
    return readLocalWishlist();
  }
  return normalizeIds(await apiFetch<unknown[]>('/wishlist'));
}

export async function toggleWishlistItem(propertyId: string): Promise<string[]> {
  const id = String(propertyId);

  if (isMockDataEnabled()) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const current = readLocalWishlist();
    const next = current.includes(id)
      ? current.filter((item) => item !== id)
      : [...current, id];
    writeLocalWishlist(next);
    return next;
  }

  return normalizeIds(await apiFetch<unknown[]>(`/wishlist/${id}`, { method: 'POST' }));
}

export async function getWishlistProperties(ids: string[]): Promise<Property[]> {
  const normalized = normalizeIds(ids);
  if (normalized.length === 0) return [];

  if (isMockDataEnabled()) {
    return getPropertiesByIds(normalized);
  }

  return apiFetch<Property[]>(
    `/wishlist/properties?ids=${encodeURIComponent(normalized.join(','))}`
  );
}
