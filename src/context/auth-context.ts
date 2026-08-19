import { createContext } from 'react';
import type { AuthUser } from '@/services/auth-storage';

export interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<string>;
  register: (
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string
  ) => Promise<string>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

/** Provided by `@/components/providers/AuthProvider`. */
export const AuthContext = createContext<AuthContextValue | null>(null);
