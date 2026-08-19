import { useContext } from 'react';
import { AuthContext, type AuthContextValue } from '@/context/auth-context';

export type { AuthContextValue };

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
