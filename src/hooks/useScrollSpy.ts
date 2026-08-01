import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  HOME_SCROLL_SECTIONS,
  type HomeScrollSection,
} from '@/data/navigation';

/** Sticky header height + small buffer for scroll-spy line. */
const HEADER_OFFSET = 88;

function isHomePath(pathname: string): boolean {
  const path = pathname.replace(/\/$/, '') || '/';
  return path === '/';
}

export function useScrollSpy() {
  const { pathname } = useLocation();
  const onHome = isHomePath(pathname);
  const [activeSection, setActiveSection] = useState<HomeScrollSection>('home');
  const topRef = useRef<Map<HomeScrollSection, number>>(new Map());

  useEffect(() => {
    if (!onHome) return;

    const sections = HOME_SCROLL_SECTIONS
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    // Track each section's document-relative top via a single ResizeObserver
    // pass (and on resize) instead of querying getBoundingClientRect on every
    // scroll frame, which forces synchronous layout in the scroll path.
    const recomputeTops = () => {
      const tops = new Map<HomeScrollSection, number>();
      for (const el of sections) {
        tops.set(el.id as HomeScrollSection, el.offsetTop);
      }
      topRef.current = tops;
    };

    const resolveActive = (): HomeScrollSection => {
      const scrollLine = window.scrollY + HEADER_OFFSET;
      let active: HomeScrollSection = 'home';
      for (const id of HOME_SCROLL_SECTIONS) {
        const top = topRef.current.get(id);
        if (top !== undefined && top <= scrollLine) {
          active = id;
        }
      }
      return active;
    };

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setActiveSection(resolveActive());
      });
    };

    recomputeTops();
    onScroll();

    const resizeObserver = new ResizeObserver(() => {
      recomputeTops();
      onScroll();
    });
    for (const el of sections) resizeObserver.observe(el);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', recomputeTops, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', recomputeTops);
    };
  }, [onHome]);

  return { onHome, activeSection: onHome ? activeSection : null };
}
