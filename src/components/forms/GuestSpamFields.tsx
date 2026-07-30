import { useEffect, useId, useRef, useState } from 'react';
import { getSecurityConfig, type SecurityConfig } from '@/services/security.service';
import { useMockData } from '@/services/api-client';
import { useTheme } from '@/hooks/useTheme';

/**
 * Invisible honeypot field — bots fill it; humans never see it.
 */
export function HoneypotInput({ fieldName = 'website' }: { fieldName?: string }) {
  const id = useId();

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: '-10000px',
        top: 'auto',
        width: '1px',
        height: '1px',
        overflow: 'hidden',
      }}
    >
      <label htmlFor={id}>Website</label>
      <input
        id={id}
        type="text"
        name={fieldName}
        tabIndex={-1}
        autoComplete="off"
        defaultValue=""
      />
    </div>
  );
}

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        options: {
          sitekey: string;
          callback?: (token: string) => void;
          'expired-callback'?: () => void;
          'error-callback'?: () => void;
          theme?: 'light' | 'dark' | 'auto';
        }
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
  }
}

let turnstileScriptPromise: Promise<void> | null = null;

function loadTurnstileScript(): Promise<void> {
  if (typeof window === 'undefined') {
    return Promise.resolve();
  }

  if (window.turnstile) {
    return Promise.resolve();
  }

  if (!turnstileScriptPromise) {
    turnstileScriptPromise = new Promise((resolve, reject) => {
      const existing = document.querySelector<HTMLScriptElement>('script[data-turnstile]');
      if (existing) {
        existing.addEventListener('load', () => resolve());
        existing.addEventListener('error', () => reject(new Error('Turnstile failed to load')));
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.dataset.turnstile = 'true';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Turnstile failed to load'));
      document.head.appendChild(script);
    });
  }

  return turnstileScriptPromise;
}

export function useSecurityConfig() {
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

interface TurnstileWidgetProps {
  onTokenChange: (token: string) => void;
}

/**
 * Renders Cloudflare Turnstile when backend has keys configured.
 */
export function TurnstileWidget({ onTokenChange }: TurnstileWidgetProps) {
  const config = useSecurityConfig();
  const mock = useMockData();
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const turnstileTheme = theme === 'navy' ? 'dark' : 'light';

  useEffect(() => {
    if (mock || !config?.turnstile.enabled || !config.turnstile.siteKey) {
      onTokenChange('');
      return;
    }

    let widgetId: string | undefined;
    let cancelled = false;

    void (async () => {
      try {
        await loadTurnstileScript();
        if (cancelled || !window.turnstile || !containerRef.current) return;

        containerRef.current.replaceChildren();
        widgetId = window.turnstile.render(containerRef.current, {
          sitekey: config.turnstile.siteKey!,
          callback: (token) => onTokenChange(token),
          'expired-callback': () => onTokenChange(''),
          'error-callback': () => onTokenChange(''),
          theme: turnstileTheme,
        });
      } catch {
        onTokenChange('');
      }
    })();

    return () => {
      cancelled = true;
      if (widgetId && window.turnstile) {
        try {
          window.turnstile.remove(widgetId);
        } catch {
          // ignore
        }
      }
    };
  }, [config, mock, onTokenChange, turnstileTheme]);

  if (mock || !config?.turnstile.enabled) {
    return null;
  }

  return <div ref={containerRef} className="min-h-[65px]" />;
}
