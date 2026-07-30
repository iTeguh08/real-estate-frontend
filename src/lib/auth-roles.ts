import type { AuthUser } from '@/services/auth-storage';

/** Frontend roles that may manage owned listings via /api/properties. */
export function isAgentUser(user: AuthUser | null | undefined): boolean {
  return user?.role === 'agent';
}
