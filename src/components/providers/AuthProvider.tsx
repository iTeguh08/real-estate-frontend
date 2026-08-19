import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { AuthContext, type AuthContextValue } from '@/context/auth-context';
import {
  fetchCurrentUser,
  loginMember,
  logoutMember,
  registerMember,
} from '@/services/auth.service';
import { getStoredToken, type AuthUser } from '@/services/auth-storage';

export function AuthProvider({ children }: { children: ReactNode }) {
  // Keep the first client render identical to SSR. Reading localStorage here
  // (token/user) mismatches the server tree and forces a Fast Refresh full reload.
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /** Resolves the stored session; `null` when there is no token to exchange. */
  const loadStoredUser = useCallback(async () => {
    if (!getStoredToken()) return null;
    return fetchCurrentUser();
  }, []);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    try {
      setUser(await loadStoredUser());
    } finally {
      setIsLoading(false);
    }
  }, [loadStoredUser]);

  useEffect(() => {
    let active = true;

    loadStoredUser()
      .then((next) => {
        if (active) setUser(next);
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [loadStoredUser]);

  const login = useCallback(async (email: string, password: string) => {
    const response = await loginMember({ email, password });
    setUser(response.user);
    return response.message;
  }, []);

  const register = useCallback(
    async (name: string, email: string, password: string, passwordConfirmation: string) => {
      const response = await registerMember({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });
      setUser(response.user);
      return response.message;
    },
    []
  );

  const logout = useCallback(async () => {
    await logoutMember();
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoading,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
      refresh,
    }),
    [user, isLoading, login, register, logout, refresh]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
