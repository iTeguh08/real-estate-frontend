import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from 'react';
import { useLocation } from 'react-router-dom';

export const HEADER_SCROLL_BUFFER = 12;
export const DEFAULT_HEADER_HEIGHT = 76;
const SCROLL_DELTA_PX = 12;

interface SiteHeaderContextValue {
  headerRef: RefObject<HTMLElement | null>;
  height: number;
  isVisible: boolean;
  reducedMotion: boolean;
  /** Sticky / scroll-spy offset — 0 when header is hidden. */
  scrollOffset: number;
  /** Anchor navigation offset — always accounts for full header height. */
  anchorOffset: number;
  setLocked: (locked: boolean) => void;
  showHeader: () => void;
}

const SiteHeaderContext = createContext<SiteHeaderContextValue | null>(null);

export function SiteHeaderProvider({ children }: { children: ReactNode }) {
  const headerRef = useRef<HTMLElement | null>(null);
  const [height, setHeight] = useState(DEFAULT_HEADER_HEIGHT);
  const [isVisible, setIsVisible] = useState(true);
  const [locked, setLockedState] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const isVisibleRef = useRef(true);
  const lastScrollY = useRef(0);

  const { pathname } = useLocation();

  const setLocked = useCallback((value: boolean) => {
    setLockedState(value);
  }, []);

  const showHeader = useCallback(() => {
    isVisibleRef.current = true;
    setIsVisible(true);
  }, []);

  useEffect(() => {
    isVisibleRef.current = true;
    setIsVisible(true);
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
    if (locked) {
      isVisibleRef.current = true;
      setIsVisible(true);
    }
  }, [locked]);

  useEffect(() => {
    if (reducedMotion || locked) return;

    const topLock = height || DEFAULT_HEADER_HEIGHT;
    let raf = 0;

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastScrollY.current;

        if (y <= topLock) {
          if (!isVisibleRef.current) {
            isVisibleRef.current = true;
            setIsVisible(true);
          }
          lastScrollY.current = y;
          return;
        }

        if (Math.abs(delta) < SCROLL_DELTA_PX) return;

        const nextVisible = delta < 0;
        if (nextVisible !== isVisibleRef.current) {
          isVisibleRef.current = nextVisible;
          setIsVisible(nextVisible);
        }
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
    [
      height,
      isVisible,
      reducedMotion,
      scrollOffset,
      anchorOffset,
      setLocked,
      showHeader,
    ]
  );

  return (
    <SiteHeaderContext.Provider value={value}>{children}</SiteHeaderContext.Provider>
  );
}

export function useSiteHeader() {
  const ctx = useContext(SiteHeaderContext);
  if (!ctx) {
    throw new Error('useSiteHeader must be used within SiteHeaderProvider');
  }
  return ctx;
}

/** Reserves document flow space for the fixed site header. */
export function SiteHeaderSpacer() {
  const { height } = useSiteHeader();
  return <div aria-hidden="true" className="shrink-0" style={{ height }} />;
}
