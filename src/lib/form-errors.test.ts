import { describe, expect, it } from 'vitest';
import { ApiError } from '@/services/api-client';
import {
  apiErrorMessage,
  clearFieldError,
  firstApiFieldError,
  getApiFieldErrors,
} from '@/lib/form-errors';

describe('form-errors', () => {
  it('reads field errors from ApiError', () => {
    const err = new ApiError('Invalid', 422, {
      password: ['Too short.', 'Needs a number.'],
    });

    expect(getApiFieldErrors(err)).toEqual({
      password: ['Too short.', 'Needs a number.'],
    });
    expect(firstApiFieldError(err, 'password')).toBe('Too short.');
    expect(apiErrorMessage(err, 'fallback')).toBe('Too short.');
  });

  it('falls back for non-ApiError', () => {
    expect(getApiFieldErrors(new Error('boom'))).toEqual({});
    expect(apiErrorMessage(new Error('boom'), 'fallback')).toBe('boom');
    expect(apiErrorMessage('nope', 'fallback')).toBe('fallback');
  });

  it('clears one field without mutating others', () => {
    const next = clearFieldError(
      { email: ['Required'], name: ['Required'] },
      'email',
    );

    expect(next).toEqual({ name: ['Required'] });
  });
});
