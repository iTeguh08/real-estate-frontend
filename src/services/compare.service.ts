import { apiFetch, isMockDataEnabled } from '@/services/api-client';
import { getPropertiesByIds } from '@/services/properties.service';
import type { Property } from '@/types';

const STORAGE_KEY = 'homzen-compare';
/** Must match backend CompareController::MAX_ITEMS. */
export const MAX_COMPARE_ITEMS = 3;

function readLocalCompare(): string[] {
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

function writeLocalCompare(ids: string[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids.map(String)));
}

function normalizeIds(ids: unknown): string[] {
  if (!Array.isArray(ids)) return [];
  return ids
    .filter((id): id is string | number => typeof id === 'string' || typeof id === 'number')
    .map(String);
}

export async function getCompareIds(signal?: AbortSignal): Promise<string[]> {
  if (isMockDataEnabled()) {
    return readLocalCompare();
  }
  return normalizeIds(await apiFetch<unknown[]>('/api/compare', { signal }));
}

export async function toggleCompareItem(
  propertyId: string
): Promise<{ ids: string[]; limited: boolean }> {
  const id = String(propertyId);

  if (isMockDataEnabled()) {
    await new Promise((resolve) => setTimeout(resolve, 150));
    const current = readLocalCompare();

    if (current.includes(id)) {
      const next = current.filter((item) => item !== id);
      writeLocalCompare(next);
      return { ids: next, limited: false };
    }

    if (current.length >= MAX_COMPARE_ITEMS) {
      return { ids: current, limited: true };
    }

    const next = [...current, id];
    writeLocalCompare(next);
    return { ids: next, limited: false };
  }

  const result = await apiFetch<{ ids: unknown[]; limited: boolean }>(`/api/compare/${id}`, {
    method: 'POST',
  });

  return {
    ids: normalizeIds(result.ids),
    limited: Boolean(result.limited),
  };
}

export async function getCompareProperties(ids: string[]): Promise<Property[]> {
  const normalized = normalizeIds(ids);
  if (normalized.length === 0) return [];

  if (isMockDataEnabled()) {
    return getPropertiesByIds(normalized);
  }

  return apiFetch<Property[]>(
    `/api/compare/properties?ids=${encodeURIComponent(normalized.join(','))}`
  );
}

export async function clearCompare(): Promise<string[]> {
  if (isMockDataEnabled()) {
    writeLocalCompare([]);
    return [];
  }
  return normalizeIds(await apiFetch<unknown[]>('/api/compare', { method: 'DELETE' }));
}
