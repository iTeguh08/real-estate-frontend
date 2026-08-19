
import { AGENTS } from '@/data/agents';
import { SITE_CONFIG } from '@/data/site-config';
import { jsonSafe, withSsgFallback } from '@/lib/ssg';
import { getAgents } from '@/services/agents.service';

const REVALIDATE_SECONDS = 60;

export async function getStaticProps() {
  const agents = await withSsgFallback('agentsList', getAgents, AGENTS);

  return {
    props: jsonSafe({
      agents,
      brand: SITE_CONFIG.brand,
    }),
    notFound: false,
    revalidate: REVALIDATE_SECONDS,
  };
}
