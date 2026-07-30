import { ApiError, type FieldErrors } from '@/services/api-client';

export function getApiFieldErrors(err: unknown): FieldErrors {
  if (err instanceof ApiError) {
    return err.fieldErrors;
  }
  return {};
}

export function firstApiFieldError(err: unknown, field: string): string | undefined {
  return getApiFieldErrors(err)[field]?.[0];
}

/** Prefer a specific field message; otherwise the top-level API message. */
export function apiErrorMessage(err: unknown, fallback: string): string {
  if (err instanceof ApiError) {
    const first = Object.values(err.fieldErrors).flat()[0];
    return first || err.message || fallback;
  }
  if (err instanceof Error && err.message) {
    return err.message;
  }
  return fallback;
}

export function clearFieldError(
  errors: FieldErrors,
  field: string
): FieldErrors {
  if (!(field in errors)) return errors;
  const next = { ...errors };
  delete next[field];
  return next;
}
