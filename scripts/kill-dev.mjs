/**
 * Stop orphaned Next.js dev processes for this project before a clean restart.
 * Used by `npm run dev:fresh` so `.next` is not rebuilt while stale HMR clients
 * are still connected (those clients trigger "Fast Refresh had to perform a full reload").
 */
import { readFileSync, readdirSync, realpathSync } from 'node:fs';
import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function readProc(pid, file) {
  try {
    return readFileSync(`/proc/${pid}/${file}`, 'utf8');
  } catch {
    return null;
  }
}

function findRunningDevServers() {
  let pids;
  try {
    pids = readdirSync('/proc').filter((entry) => /^\d+$/.test(entry));
  } catch {
    return [];
  }

  const found = [];

  for (const pid of pids) {
    const cmdline = readProc(pid, 'cmdline');
    if (!cmdline) continue;
    const argv = cmdline.split('\0').filter(Boolean);
    const command = argv.join(' ');

    const isNextServer = command.includes('next-server');
    const isNextDev = /(^|[/\s])next(\.js)?\s+dev(\s|$)/.test(command);
    if (!isNextServer && !isNextDev) continue;

    let cwd;
    try {
      cwd = realpathSync(`/proc/${pid}/cwd`);
    } catch {
      continue;
    }
    if (cwd !== projectRoot) continue;

    found.push(Number(pid));
  }

  return found;
}

const pids = findRunningDevServers();
if (pids.length === 0) {
  process.exit(0);
}

try {
  execSync(`kill ${pids.join(' ')}`, { stdio: 'ignore' });
} catch {
  // Process may have exited between discovery and kill.
}
