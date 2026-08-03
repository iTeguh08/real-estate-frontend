import { getStoredToken } from '@/services/auth-storage';

const DEFAULT_API_URL = '';

export function getApiBaseUrl(): string {
  return import.meta.env.VITE_API_URL ?? DEFAULT_API_URL;
}

export function isMockDataEnabled(): boolean {
  return import.meta.env.VITE_USE_MOCK !== 'false';
}

export type FieldErrors = Record<string, string[]>;

export class ApiError extends Error {
  status?: number;
  fieldErrors: FieldErrors;

  constructor(message: string, status?: number, fieldErrors: FieldErrors = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

interface LaravelErrorBody {
  message?: string;
  errors?: Record<string, string[] | string>;
}

function normalizeFieldErrors(errors: LaravelErrorBody['errors']): FieldErrors {
  if (!errors || typeof errors !== 'object') {
    return {};
  }

  const normalized: FieldErrors = {};
  for (const [field, value] of Object.entries(errors)) {
    if (Array.isArray(value)) {
      const messages = value.filter((item): item is string => typeof item === 'string' && item.length > 0);
      if (messages.length > 0) {
        normalized[field] = messages;
      }
    } else if (typeof value === 'string' && value.length > 0) {
      normalized[field] = [value];
    }
  }
  return normalized;
}

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const base = getApiBaseUrl();
  const { headers: initHeaders, body, ...rest } = init ?? {};
  const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;

  const headers = new Headers({ Accept: 'application/json' });
  if (initHeaders) {
    new Headers(initHeaders).forEach((value, key) => {
      headers.set(key, value);
    });
  }
  // Browser must set multipart boundary for FormData.
  if (isFormData) {
    headers.delete('Content-Type');
  }

  const token = getStoredToken();
  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const res = await fetch(`${base}${path}`, {
    credentials: 'include',
    ...rest,
    body,
    headers,
  });

  if (!res.ok) {
    let message = `Request failed: ${res.statusText}`;
    let fieldErrors: FieldErrors = {};

    try {
      const errorBody = (await res.json()) as LaravelErrorBody;
      fieldErrors = normalizeFieldErrors(errorBody.errors);
      if (errorBody.message) {
        message = errorBody.message;
      } else {
        const firstFieldMessage = Object.values(fieldErrors).flat()[0];
        if (firstFieldMessage) {
          message = firstFieldMessage;
        }
      }
    } catch {
      // ignore JSON parse errors
    }

    throw new ApiError(message, res.status, fieldErrors);
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return res.json() as Promise<T>;
}
