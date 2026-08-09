import { afterEach, describe, expect, it } from 'vitest';
import {
  clearAuth,
  getStoredToken,
  getStoredUser,
  persistAuth,
  type AuthUser,
} from '@/services/auth-storage';

const user: AuthUser = {
  id: 7,
  name: 'Ayu Agent',
  email: 'ayu@homzen.test',
  role: 'agent',
};

afterEach(() => {
  clearAuth();
});

describe('auth-storage', () => {
  it('persists and reads token + user', () => {
    persistAuth('tok-123', user);

    expect(getStoredToken()).toBe('tok-123');
    expect(getStoredUser()).toEqual(user);
  });

  it('clears auth data', () => {
    persistAuth('tok-123', user);
    clearAuth();

    expect(getStoredToken()).toBeNull();
    expect(getStoredUser()).toBeNull();
  });

  it('returns null for corrupt user JSON', () => {
    localStorage.setItem('homzen_auth_user', '{not-json');
    expect(getStoredUser()).toBeNull();
  });
});
