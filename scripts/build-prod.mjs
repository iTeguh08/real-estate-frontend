/**
 * Production Next build with forced NEXT_PUBLIC_* so `.env.local` (localhost)
 * cannot bake into the artifact that gets rsynced to the VPS.
 */
import { spawnSync } from 'node:child_process';

const forced = {
  NEXT_PUBLIC_USE_MOCK: 'false',
  NEXT_PUBLIC_GRAPHQL_URL: '/graphql',
  NEXT_PUBLIC_API_URL: '',
  NEXT_PUBLIC_SITE_URL: 'https://baliestate.web.id',
  // SSG runs on the laptop — must reach the live API, not VPS loopback.
  NEXT_PUBLIC_BACKEND_URL: 'https://baliestate.web.id',
  INTERNAL_BACKEND_ORIGIN:
    process.env.INTERNAL_BACKEND_ORIGIN || 'https://baliestate.web.id',
};

const env = { ...process.env, ...forced };

const result = spawnSync('npm', ['run', 'build'], {
  env,
  stdio: 'inherit',
  shell: true,
});

process.exit(result.status ?? 1);
