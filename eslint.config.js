import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  // `next-env.d.ts` is generated and rewritten by `next dev`/`next build`.
  globalIgnores(['dist', '.next', '.next-alt', 'next-env.d.ts']),
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
  // shadcn-generated primitives export CVA helpers alongside components — suppress fast-refresh
  // rule for the ui/ folder since these files are not hand-authored.
  {
    files: ['src/components/ui/**/*.{ts,tsx}'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
  // Next route files legitimately export data-fetching functions next to the page
  // component; Fast Refresh handles those. Keep the rule on so any *other* extra
  // export (helper/const) still fails lint — mixed exports force a full reload.
  {
    files: [
      'pages/**/*.{ts,tsx}',
      'src/pages/_app.tsx',
      'src/pages/index.tsx',
      'src/pages/login.tsx',
      'src/pages/register.tsx',
      'src/pages/submit-property.tsx',
      'src/pages/{agents,blog,dashboard,listings,properties}/**/*.{ts,tsx}',
    ],
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
    },
  },
])
