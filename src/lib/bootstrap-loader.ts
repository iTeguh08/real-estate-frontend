const BOOTSTRAP_ID = 'hz-bootstrap-loader';
const OUT_CLASS = 'hz-bootstrap-loader--out';

let handoffDone = false;

/** Fade out the inline HTML preloader once React has painted a loader or page shell. */
export function handoffBootstrapLoader(): void {
  if (handoffDone) return;
  const el = document.getElementById(BOOTSTRAP_ID);
  if (!el) {
    handoffDone = true;
    return;
  }

  handoffDone = true;
  el.classList.add(OUT_CLASS);

  const remove = () => el.remove();
  el.addEventListener('transitionend', remove, { once: true });
  window.setTimeout(remove, 220);
}

/**
 * Wait for first meaningful paint helpers (fonts + 2× rAF), then hand off to React.
 * No artificial minimum — only real readiness signals.
 */
export async function completeBootstrapLoader(): Promise<void> {
  try {
    await document.fonts.ready;
  } catch {
    /* ignore */
  }

  await new Promise<void>((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  });

  handoffBootstrapLoader();
}
