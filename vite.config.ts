import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  // GitHub Pages project sites live at /repo-name/; local dev stays at /
  base: process.env.GITHUB_ACTIONS === 'true' ? '/real-estate-frontend/' : '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  server: {
    proxy: {
      '/graphql': 'http://localhost:8080',
      '/newsletter': 'http://localhost:8080',
      '/contact': 'http://localhost:8080',
      '/property-submissions': 'http://localhost:8080',
      '/wishlist': 'http://localhost:8080',
      '/compare': 'http://localhost:8080',
      '/security': 'http://localhost:8080',
      '/api': 'http://localhost:8080',
    },
  },
})
