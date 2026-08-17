import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: projectRoot,
  // A parallel dev server must not write into the same build dir as the primary
  // one, otherwise both corrupt each other's manifests. See scripts/dev-guard.mjs.
  ...(process.env.NEXT_DIST_DIR ? { distDir: process.env.NEXT_DIST_DIR } : {}),
  eslint: {
    dirs: ['pages'],
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        ...config.watchOptions,
        aggregateTimeout: 300,
        ignored: [
          '**/.git/**',
          '**/node_modules/**',
          '**/.next/**',
          '**/graphify-out/**',
          '**/.cursor/**',
        ],
      };
    }
    return config;
  },
  // Root `pages/` is the Next router. Vite SPA views stay in `src/pages/*Page.tsx`.
  async rewrites() {
    const backend = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:8080';
    return [
      { source: '/graphql', destination: `${backend}/graphql` },
      { source: '/api/:path*', destination: `${backend}/api/:path*` },
      { source: '/newsletter/:path*', destination: `${backend}/newsletter/:path*` },
      { source: '/contact', destination: `${backend}/contact` },
      { source: '/wishlist/:path*', destination: `${backend}/wishlist/:path*` },
      { source: '/compare/:path*', destination: `${backend}/compare/:path*` },
      { source: '/security/:path*', destination: `${backend}/security/:path*` },
    ];
  },
};

export default nextConfig;
