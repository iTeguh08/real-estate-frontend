import { useEffect } from 'react';
import { useAppLocation } from '@/lib/app-router';
import { useSiteHeader } from '@/hooks/useSiteHeader';

const HASH_SCROLL_RETRY_MS = 50;
const HASH_SCROLL_MAX_ATTEMPTS = 40;

function scrollToElement(id: string, anchorOffset: number) {
  const el = document.getElementById(id);
  if (!el) return false;
  const top = el.getBoundingClientRect().top + window.scrollY - anchorOffset;
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  return true;
}

/** Scroll to top on route change, or smoothly to a hash target once it exists in the DOM. */
export function ScrollToHash() {
  const { pathname, hash } = useAppLocation();
  const { anchorOffset, showHeader } = useSiteHeader();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      showHeader();

      let attempts = 0;
      let timeoutId = 0;

      const tryScroll = () => {
        if (scrollToElement(id, anchorOffset)) return;
        attempts += 1;
        if (attempts < HASH_SCROLL_MAX_ATTEMPTS) {
          timeoutId = window.setTimeout(tryScroll, HASH_SCROLL_RETRY_MS);
        }
      };

      requestAnimationFrame(tryScroll);

      return () => {
        window.clearTimeout(timeoutId);
      };
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname, hash, anchorOffset, showHeader]);

  return null;
}
