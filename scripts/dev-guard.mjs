/**
 * Two `next dev` processes in the same project share one `.next` directory.
 * The second one rewrites the manifests/chunks the first one is still serving,
 * so requests start failing with `ENOENT .next/server/...` and the browser
 * falls back to "Fast Refresh had to perform a full reload".
 *
 * This guard runs as `predev` and refuses to start a duplicate. Detection is
 * best-effort: if the process table cannot be inspected, `next dev` proceeds.
 */
import { readFileSync, readdirSync, realpathSync } from 'node:fs';
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

/** Own process plus its ancestors (npm run dev -> predev -> node) are never duplicates. */
function selfChain() {
  const chain = new Set([process.pid]);
  let pid = process.pid;
  for (let depth = 0; depth < 20; depth += 1) {
    const stat = readProc(pid, 'stat');
    if (!stat) break;
    // `comm` may contain spaces/parens, so parse the fields after the last ')'.
    const ppid = Number(stat.slice(stat.lastIndexOf(')') + 2).split(' ')[1]);
    if (!Number.isInteger(ppid) || ppid <= 1 || chain.has(ppid)) break;
    chain.add(ppid);
    pid = ppid;
  }
  return chain;
}

function findRunningDevServers() {
  let pids;
  try {
    pids = readdirSync('/proc').filter((entry) => /^\d+$/.test(entry));
  } catch {
    return [];
  }

  const skip = selfChain();
  const found = [];

  for (const pid of pids) {
    if (skip.has(Number(pid))) continue;

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
      continue; // Another user's process — not ours to worry about.
    }
    if (cwd !== projectRoot) continue;

    found.push({ pid: Number(pid), command });
  }

  return found;
}

const running = findRunningDevServers();

if (running.length > 0) {
  const list = running.map((p) => `  pid ${p.pid}  ${p.command}`).join('\n');
  console.error(
    [
      '',
      'A Next.js dev server is already running for this project:',
      list,
      '',
      'Two dev servers share the same .next directory and corrupt each other',
      "(ENOENT .next/server/... and endless \"Fast Refresh had to perform a full reload\").",
      '',
      'Use the existing server, or stop it first:',
      `  kill ${running.map((p) => p.pid).join(' ')}`,
      '',
      'To run a second instance on purpose, give it its own build directory:',
      '  NEXT_DIST_DIR=.next-alt npm run dev -- -p 3001',
      '',
    ].join('\n')
  );
  process.exit(1);
}
