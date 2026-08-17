import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import {
  DEFAULT_HEADER_HEIGHT,
  HEADER_SCROLL_BUFFER,
  SiteHeaderContext,
  useSiteHeader,
} from '@/hooks/useSiteHeader';
import { useAppLocation } from '@/lib/app-router';

const SCROLL_DELTA_PX = 12;

export function SiteHeaderProvider({ children }: { children: ReactNode }) {
  const headerRef = useRef<HTMLElement | null>(null);
  const [height, setHeight] = useState(DEFAULT_HEADER_HEIGHT);
  const [isVisible, setIsVisible] = useState(true);
  const [locked, setLockedState] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const lastScrollY = useRef(0);

  const { pathname } = useAppLocation();

  const setLocked = useCallback((value: boolean) => {
    setLockedState(value);
  }, []);

  const showHeader = useCallback(() => {
    setIsVisible(true);
  }, []);

  // A route change reveals the header again, and locking (open sheet/dialog) pins it.
  // Both are prop-style transitions, so they adjust state during render rather than
  // in an effect that would commit a hidden header first.
  const [seenPathname, setSeenPathname] = useState(pathname);
  if (seenPathname !== pathname) {
    setSeenPathname(pathname);
    setIsVisible(true);
  }

  const [seenLocked, setSeenLocked] = useState(locked);
  if (seenLocked !== locked) {
    setSeenLocked(locked);
    if (locked) setIsVisible(true);
  }

  useEffect(() => {
    lastScrollY.current = window.scrollY;
  }, [pathname]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useLayoutEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const update = () => setHeight(el.offsetHeight);
    update();

    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(el);
    window.addEventListener('resize', update);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  const scrollOffset = isVisible ? height + HEADER_SCROLL_BUFFER : 0;
  const anchorOffset = height + HEADER_SCROLL_BUFFER;

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--header-height', `${height}px`);
    root.style.setProperty('--header-scroll-offset', `${scrollOffset}px`);
    root.style.setProperty('--header-anchor-offset', `${anchorOffset}px`);
  }, [height, scrollOffset, anchorOffset]);

  useEffect(() => {
    if (reducedMotion || locked) return;

    const topLock = height || DEFAULT_HEADER_HEIGHT;
    let raf = 0;

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastScrollY.current;

        // Repeat values bail out inside React, so no visibility ref is needed here.
        if (y <= topLock) {
          setIsVisible(true);
          lastScrollY.current = y;
          return;
        }

        if (Math.abs(delta) < SCROLL_DELTA_PX) return;

        setIsVisible(delta < 0);
        lastScrollY.current = y;
      });
    };

    lastScrollY.current = window.scrollY;
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, [reducedMotion, locked, height]);

  const value = useMemo(
    () => ({
      headerRef,
      height,
      isVisible: reducedMotion ? true : isVisible,
      reducedMotion,
      scrollOffset: reducedMotion ? anchorOffset : scrollOffset,
      anchorOffset,
      setLocked,
      showHeader,
    }),
    [height, isVisible, reducedMotion, scrollOffset, anchorOffset, setLocked, showHeader]
  );

  return <SiteHeaderContext.Provider value={value}>{children}</SiteHeaderContext.Provider>;
}

/** Reserves document flow space for the fixed site header. */
export function SiteHeaderSpacer() {
  const { height } = useSiteHeader();
  return <div aria-hidden="true" className="shrink-0" style={{ height }} />;
}
