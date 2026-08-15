import { apiFetch, ApiError, isMockDataEnabled } from '@/services/api-client';
import {
  clearAuth,
  getStoredToken,
  getStoredUser,
  persistAuth,
  type AuthResponse,
  type AuthUser,
} from '@/services/auth-storage';

interface UserResponse {
  success: boolean;
  user: AuthUser;
}

export async function checkEmailAvailable(
  email: string,
): Promise<{ available: boolean; message?: string }> {
  if (isMockDataEnabled()) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const taken = email.trim().toLowerCase() === 'taken@example.com';
    return taken
      ? {
          available: false,
          message: 'That email is already registered. Try signing in.',
        }
      : { available: true };
  }

  try {
    const response = await apiFetch<{
      success: boolean;
      available: boolean;
      message?: string;
    }>('/api/auth/check-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.trim() }),
    });
    return { available: response.available, message: response.message };
  } catch (err) {
    if (err instanceof ApiError && err.status === 422) {
      return {
        available: false,
        message: err.fieldErrors.email?.[0] || err.message,
      };
    }
    throw err;
  }
}

export async function registerMember(input: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}): Promise<AuthResponse> {
  if (isMockDataEnabled()) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const user: AuthUser = {
      id: 1,
      name: input.name,
      email: input.email,
      role: 'member',
    };
    const response: AuthResponse = {
      success: true,
      message: 'Account created (mock). Set VITE_USE_MOCK=false to use the live API.',
      token: 'mock-token',
      token_type: 'Bearer',
      user,
    };
    persistAuth(response.token, response.user);
    return response;
  }

  const response = await apiFetch<AuthResponse>('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });

  persistAuth(response.token, response.user);
  return response;
}

export async function loginMember(input: {
  email: string;
  password: string;
}): Promise<AuthResponse> {
  if (isMockDataEnabled()) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const user: AuthUser = {
      id: 1,
      name: 'Mock Member',
      email: input.email,
      role: 'member',
    };
    const response: AuthResponse = {
      success: true,
      message: 'Signed in (mock). Set VITE_USE_MOCK=false to use the live API.',
      token: 'mock-token',
      token_type: 'Bearer',
      user,
    };
    persistAuth(response.token, response.user);
    return response;
  }

  const response = await apiFetch<AuthResponse>('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });

  persistAuth(response.token, response.user);
  return response;
}

export async function logoutMember(): Promise<void> {
  if (isMockDataEnabled()) {
    clearAuth();
    return;
  }

  try {
    await apiFetch<{ success: boolean }>('/api/auth/logout', {
      method: 'POST',
    });
  } finally {
    clearAuth();
  }
}

export async function fetchCurrentUser(): Promise<AuthUser | null> {
  const token = getStoredToken();
  if (!token) {
    return null;
  }

  if (isMockDataEnabled()) {
    return getStoredUser();
  }

  try {
    const response = await apiFetch<UserResponse>('/api/auth/user');
    persistAuth(token, response.user);
    return response.user;
  } catch {
    clearAuth();
    return null;
  }
}
