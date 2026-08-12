import { defineConfig, type Plugin } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { rmSync } from 'node:fs'

/** Drop optimize-bg backups so they never ship with `public/`. */
function excludeBgOriginals(): Plugin {
  return {
    name: 'exclude-bg-originals',
    closeBundle() {
      try {
        rmSync(path.resolve(__dirname, 'dist/bg/_original'), { recursive: true, force: true })
      } catch {
        /* ignore */
      }
    },
  }
}

export default defineConfig({
  // GitHub Pages project sites live at /repo-name/; local dev stays at /
  base: process.env.GITHUB_ACTIONS === 'true' ? '/real-estate-frontend/' : '/',
  plugins: [react(), tailwindcss(), excludeBgOriginals()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  server: {
    proxy: {
      '/graphql': 'http://localhost:8080',
      '/newsletter/subscribe': {
        target: 'http://localhost:8080',
        bypass(req) {
          if (req.method !== 'POST') return '/index.html'
        },
      },
      '/contact': {
        target: 'http://localhost:8080',
        bypass(req) {
          if (req.method !== 'POST') return '/index.html'
        },
      },
      '/property-submissions': {
        target: 'http://localhost:8080',
        bypass(req) {
          if (req.method !== 'POST') return '/index.html'
        },
      },
      '/wishlist': 'http://localhost:8080',
      '/compare': 'http://localhost:8080',
      '/security': 'http://localhost:8080',
      '/api': 'http://localhost:8080',
    },
  },
  test: {
    environment: 'jsdom',
    globals: false,
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
  },
})
