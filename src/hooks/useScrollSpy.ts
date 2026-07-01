import { useEffect, useState } from 'react';
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

function resolveSectionFromScroll(): HomeScrollSection {
  const scrollLine = window.scrollY + HEADER_OFFSET;
  let active: HomeScrollSection = 'home';

  for (const id of HOME_SCROLL_SECTIONS) {
    const el = document.getElementById(id);
    if (!el) continue;
    const top = el.getBoundingClientRect().top + window.scrollY;
    if (top <= scrollLine) {
      active = id;
    }
  }

  return active;
}

export function useScrollSpy() {
  const { pathname } = useLocation();
  const onHome = isHomePath(pathname);
  const [activeSection, setActiveSection] = useState<HomeScrollSection>('home');

  useEffect(() => {
    if (!onHome) return;

    let raf = 0;

    const update = () => {
      setActiveSection(resolveSectionFromScroll());
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [onHome]);

  return { onHome, activeSection: onHome ? activeSection : null };
}
