import '../src/index.css';
import type { AppProps } from 'next/app';
import AppProviders from '../src/pages/_app';

/**
 * Custom App must live in root `pages/` so Next.js treats the Tailwind import as
 * global CSS and injects it into the SSR `<head>`.
 *
 * Do not `export default` a re-export of another module: webpack/Turbopack then
 * drop this file's CSS side-effect from the `_app` entry, so a hard reload
 * ships HTML without styles (nested routes also 404 `/properties/_next/...`).
 */
export default function App(props: AppProps) {
  return <AppProviders {...props} />;
}
