import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  outputFileTracingRoot: projectRoot,
  // Tree-shake barrel icon packages so dev page chunks stay small enough for Fast Refresh.
  experimental: {
    optimizePackageImports: ['@phosphor-icons/react', 'lucide-react'],
  },
  // Do not set `basePath` or a relative `assetPrefix` ('.' / './'): nested routes
  // would request `/properties/_next/static/css` instead of `/_next/static/css`.
  // A parallel dev server must not write into the same build dir as the primary
  // one, otherwise both corrupt each other's manifests. See scripts/dev-guard.mjs.
  ...(process.env.NEXT_DIST_DIR ? { distDir: process.env.NEXT_DIST_DIR } : {}),
  eslint: {
    dirs: ['pages'],
  },
  webpack: (config, { dev }) => {
    const publicPath = config.output?.publicPath;
    if (publicPath === 'auto' || publicPath === '' || publicPath === '.' || publicPath === './') {
      config.output.publicPath = '/_next/';
    }
    if (dev) {
      config.watchOptions = {
        ...config.watchOptions,
        aggregateTimeout: 300,
        ignored: [
          '**/.git/**',
          '**/node_modules/**',
          '**/.next/**',
          '**/.next-*/**',
          '**/dist/**',
          '**/coverage/**',
          '**/graphify-out/**',
          '**/.cursor/**',
          'next-env.d.ts',
        ],
      };
    }
    return config;
  },
  // Root `pages/` is the Next router. Vite SPA views stay in `src/pages/*Page.tsx`.
  async rewrites() {
    const backend = (
      process.env.INTERNAL_BACKEND_ORIGIN ??
      process.env.NEXT_PUBLIC_BACKEND_URL ??
      'http://localhost:8080'
    ).replace(/\/$/, '');
    return [
      { source: '/graphql', destination: `${backend}/graphql` },
      // Map SPA-facing API paths onto Laravel (must not collide with Next pages).
      { source: '/api/compare', destination: `${backend}/compare` },
      { source: '/api/compare/:path*', destination: `${backend}/compare/:path*` },
      { source: '/api/wishlist', destination: `${backend}/wishlist` },
      { source: '/api/wishlist/:path*', destination: `${backend}/wishlist/:path*` },
      { source: '/api/:path*', destination: `${backend}/api/:path*` },
      { source: '/newsletter/:path*', destination: `${backend}/newsletter/:path*` },
      { source: '/security/:path*', destination: `${backend}/security/:path*` },
    ];
  },
};

export default nextConfig;
