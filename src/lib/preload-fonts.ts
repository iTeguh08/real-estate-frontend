import poppins400 from '@fontsource/poppins/files/poppins-latin-400-normal.woff2?url';
import poppins600 from '@fontsource/poppins/files/poppins-latin-600-normal.woff2?url';

/** Kick off critical weight files before React paints (latin only). */
export function preloadCriticalFonts() {
  for (const href of [poppins400, poppins600]) {
    const existing = document.head.querySelector(`link[rel="preload"][href="${href}"]`);
    if (existing) continue;
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    link.href = href;
    document.head.appendChild(link);
  }
}
