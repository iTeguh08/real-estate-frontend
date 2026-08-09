import type { FieldValues, Path, UseFormSetError } from 'react-hook-form';
import { ApiError } from '@/services/api-client';

/** Map Laravel / ApiError field bags onto react-hook-form field errors. */
export function applyApiFieldErrors<T extends FieldValues>(
  err: unknown,
  setError: UseFormSetError<T>,
): boolean {
  if (!(err instanceof ApiError)) return false;

  const entries = Object.entries(err.fieldErrors);
  if (entries.length === 0) return false;

  for (const [field, messages] of entries) {
    const message = messages[0];
    if (!message) continue;
    setError(field as Path<T>, { type: 'server', message });
  }

  return true;
}
