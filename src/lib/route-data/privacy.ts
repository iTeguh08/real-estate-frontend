import { PRIVACY_PAGE_FALLBACK } from '@/data/cms-fallbacks';
import { SITE_CONFIG } from '@/data/site-config';
import { jsonSafe, withSsgFallback } from '@/lib/ssg';
import { getPrivacyPage } from '@/services/pages.service';

const REVALIDATE_SECONDS = 60;

export async function getStaticProps() {
  const page = await withSsgFallback(
    'privacyPage',
    () => getPrivacyPage(),
    PRIVACY_PAGE_FALLBACK
  );

  return {
    props: jsonSafe({
      page,
      brand: SITE_CONFIG.brand,
    }),
    revalidate: REVALIDATE_SECONDS,
  };
}
