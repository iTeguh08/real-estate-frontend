import { getPublicBasePath } from '@/lib/runtime-env';

/** Public-folder asset URL that respects Vite `base` / Next `basePath`. */
export function publicAsset(filename: string): string {
  const base = getPublicBasePath();
  const normalized = filename.replace(/^\//, '');
  return `${base}${normalized}`;
}
