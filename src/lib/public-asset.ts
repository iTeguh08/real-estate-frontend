/** Public-folder asset URL that respects Vite `base` (e.g. GitHub Pages subpaths). */
export function publicAsset(filename: string): string {
  const base = import.meta.env.BASE_URL;
  const normalized = filename.replace(/^\//, '');
  return `${base}${normalized}`;
}
