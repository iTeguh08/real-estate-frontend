import type { GetServerSideProps } from 'next';
import { buildSitemapXml } from '@/lib/seo-crawler-files';

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const body = await buildSitemapXml();
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.write(body);
  res.end();
  return { props: {} };
};

export default function SitemapXml() {
  return null;
}
