import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  resolveTransitionKind,
  transitionKindHasSpinner,
} from '@/lib/route-transition-kind';
import { TransitionBody } from '@/components/skeletons/RouteTransitionBody';
import { RouteLoadingSpinner } from '@/components/skeletons/LoadingOverlay';
import { cn } from '@/lib/utils';

/**
 * Route-level loading shell — page-shaped skeletons that mirror final layout (homepage, listings, etc.).
 */
export function RouteTransitionOverlay() {
  const router = useRouter();
  const [pendingUrl, setPendingUrl] = useState<string | null>(null);

  useEffect(() => {
    const onStart = (url: string) => setPendingUrl(url);
    const onEnd = () => setPendingUrl(null);

    router.events.on('routeChangeStart', onStart);
    router.events.on('routeChangeComplete', onEnd);
    router.events.on('routeChangeError', onEnd);
    return () => {
      router.events.off('routeChangeStart', onStart);
      router.events.off('routeChangeComplete', onEnd);
      router.events.off('routeChangeError', onEnd);
    };
  }, [router.events]);

  if (!pendingUrl) return null;

  const kind = resolveTransitionKind(pendingUrl);
  const showRouteSpinner = transitionKindHasSpinner(kind);

  return (
    <>
      {showRouteSpinner ? <RouteLoadingSpinner /> : null}
      <div
        className={cn(
          'pointer-events-none fixed inset-x-0 bottom-0 z-overlay overflow-y-auto bg-hz-page',
          'animate-in fade-in duration-200',
        )}
        style={{ top: 'var(--header-height, 76px)' }}
        aria-hidden="true"
      >
        <TransitionBody kind={kind} />
      </div>
    </>
  );
}
