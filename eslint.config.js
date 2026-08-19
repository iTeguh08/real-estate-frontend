import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  // `next-env.d.ts` is generated and rewritten by `next dev`/`next build`.
  globalIgnores(['dist', '.next', '.next-alt', '.next-css-fix', '.next-*', 'next-env.d.ts']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
  // Root Next route files export data-fetching alongside the page wrapper. Imported
  // view modules under `src/pages/` must stay component-only for Fast Refresh.
  // Server loaders live in `src/lib/route-data/` and are dynamically imported from
  // thin wrappers in root `pages/`.
  {
    files: ['pages/**/*.{ts,tsx}'],
    rules: {
      'react-refresh/only-export-components': [
        'error',
        {
          allowExportNames: [
            'getStaticProps',
            'getStaticPaths',
            'getServerSideProps',
            'getInitialProps',
            'config',
            'reportWebVitals',
          ],
        },
      ],
      // Root `pages/` must define the default export inline — `export default Imported`
      // breaks Fast Refresh (see pages/_app.tsx comment).
      'no-restricted-syntax': [
        'error',
        {
          selector: 'ExportDefaultDeclaration[declaration.type="Identifier"]',
          message:
            'Do not re-export a default binding. Wrap the imported page in a local function component.',
        },
      ],
    },
  },
])
