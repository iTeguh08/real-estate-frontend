import { apiFetch, useMockData } from '@/services/api-client';
import { getPropertiesByIds } from '@/services/properties.service';
import type { Property } from '@/types';

const STORAGE_KEY = 'homzen-compare';
export const MAX_COMPARE_ITEMS = 3;

function readLocalCompare(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === 'string') : [];
  } catch {
    return [];
  }
}

function writeLocalCompare(ids: string[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

export async function getCompareIds(): Promise<string[]> {
  if (useMockData()) {
    return readLocalCompare();
  }
  return apiFetch<string[]>('/compare');
}

export async function toggleCompareItem(
  propertyId: string
): Promise<{ ids: string[]; limited: boolean }> {
  if (useMockData()) {
    await new Promise((resolve) => setTimeout(resolve, 150));
    const current = readLocalCompare();

    if (current.includes(propertyId)) {
      const next = current.filter((id) => id !== propertyId);
      writeLocalCompare(next);
      return { ids: next, limited: false };
    }

    if (current.length >= MAX_COMPARE_ITEMS) {
      return { ids: current, limited: true };
    }

    const next = [...current, propertyId];
    writeLocalCompare(next);
    return { ids: next, limited: false };
  }

  const result = await apiFetch<{ ids: string[]; limited: boolean }>(
    `/compare/${propertyId}`,
    { method: 'POST' }
  );
  return result;
}

export async function getCompareProperties(ids: string[]): Promise<Property[]> {
  if (useMockData()) {
    return getPropertiesByIds(ids);
  }
  return apiFetch<Property[]>(`/compare/properties?ids=${ids.join(',')}`);
}

export async function clearCompare(): Promise<string[]> {
  if (useMockData()) {
    writeLocalCompare([]);
    return [];
  }
  return apiFetch<string[]>('/compare', { method: 'DELETE' });
}
