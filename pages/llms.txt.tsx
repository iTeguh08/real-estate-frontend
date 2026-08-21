import type { GetServerSideProps } from 'next';
import { buildLlmsTxt } from '@/lib/seo-crawler-files';

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.write(buildLlmsTxt());
  res.end();
  return { props: {} };
};

export default function LlmsTxt() {
  return null;
}
