import { TERMS_PAGE_FALLBACK } from '@/data/cms-fallbacks';
import { SITE_CONFIG } from '@/data/site-config';
import { jsonSafe, withSsgFallback } from '@/lib/ssg';
import { getTermsPage } from '@/services/pages.service';

const REVALIDATE_SECONDS = 60;

export async function getStaticProps() {
  const page = await withSsgFallback('termsPage', () => getTermsPage(), TERMS_PAGE_FALLBACK);

  return {
    props: jsonSafe({
      page,
      brand: SITE_CONFIG.brand,
    }),
    revalidate: REVALIDATE_SECONDS,
  };
}
