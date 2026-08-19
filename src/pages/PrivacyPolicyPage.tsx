import { CmsPageSkeleton, LoadingOverlay } from '@/components/skeletons';
import { usePrivacyPageQuery } from '@/hooks/queries';
import { sanitizeHtml } from '@/lib/sanitize-html';
import { cn } from '@/lib/utils';

export function PrivacyPolicyPage() {
  const { data: page, isLoading } = usePrivacyPageQuery();

  if (isLoading || !page) {
    return (
      <LoadingOverlay active minHeight="min-h-[calc(100dvh-var(--header-height,76px))]">
        <CmsPageSkeleton />
      </LoadingOverlay>
    );
  }

  return (
    <main id="main-content">
      <section className="bg-hz-elevated py-16 md:py-20">
        <div className="section-container">
          <header className="mx-auto mb-10 max-w-3xl text-center">
            <h1 className="font-poppins text-[30px] font-semibold leading-[1.2] tracking-[-0.3px] text-hz-dark md:text-[40px]">
              {page.title}
            </h1>
          </header>

          <article
            className={cn(
              'prose prose-neutral mx-auto max-w-3xl font-poppins',
              'prose-headings:font-poppins prose-headings:text-hz-dark',
              'prose-p:text-hz-muted prose-p:leading-relaxed',
              'prose-a:text-hz-primary prose-a:no-underline hover:prose-a:underline'
            )}
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(page.copy) }}
          />
        </div>
      </section>
    </main>
  );
}
