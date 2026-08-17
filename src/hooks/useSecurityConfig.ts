import { useEffect, useState } from 'react';
import { getSecurityConfig, type SecurityConfig } from '@/services/security.service';

/**
 * Backend spam-protection settings (Turnstile site key, toggles). `null` while the
 * config request is still in flight.
 */
export function useSecurityConfig(): SecurityConfig | null {
  const [config, setConfig] = useState<SecurityConfig | null>(null);

  useEffect(() => {
    let cancelled = false;
    void getSecurityConfig().then((next) => {
      if (!cancelled) setConfig(next);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return config;
}
