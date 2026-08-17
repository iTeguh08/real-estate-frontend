export async function withSsgFallback<T>(
  label: string,
  load: () => Promise<T>,
  fallback: T,
): Promise<T> {
  try {
    return await load();
  } catch (error) {
    console.error(`[ssg] ${label} failed; using fallback`, error);
    return fallback;
  }
}

/** Next `getStaticProps` cannot serialize `undefined` fields. */
export function jsonSafe<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}
