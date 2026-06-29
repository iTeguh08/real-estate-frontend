import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ArticleCard } from '@/components/cards/ArticleCard';
import type { Article } from '@/types';

const STUB_ARTICLES: Article[] = [
  {
    id: 'a1',
    title: 'Building Gains Into Housing Stocks And How To Trade The Sector',
    excerpt:
      'The average family office might be worth $1 billion, but that doesn\'t mean they\'re all buying $20 million homes.',
    category: 'News',
    publishedAt: '12 Jan 2022',
    imageUrl:
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'a2',
    title: '92% Of Millennial Homeowners Say Inflation Has Impacted Their Plans',
    excerpt:
      'The average family office might be worth $1 billion, but that doesn\'t mean they\'re all buying $20 million homes.',
    category: 'News',
    publishedAt: '12 Jan 2022',
    imageUrl:
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'a3',
    title: "We're Hiring 'Moderatist's' New Content CEO",
    excerpt:
      'The average family office might be worth $1 billion, but that doesn\'t mean they\'re all buying $20 million homes.',
    category: 'News',
    publishedAt: '12 Jan 2022',
    imageUrl:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'a4',
    title: 'How To Choose The Right Neighborhood For Your First Home',
    excerpt:
      'Location shapes daily life more than floor plans. Here is what to evaluate before you make an offer.',
    category: 'Guides',
    publishedAt: '08 Feb 2022',
    imageUrl:
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'a5',
    title: 'Mortgage Rates In 2026: What Buyers Should Know Now',
    excerpt:
      'Understanding rate trends can help you time your purchase and negotiate with more confidence.',
    category: 'Finance',
    publishedAt: '19 Mar 2022',
    imageUrl:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'a6',
    title: 'Staging Secrets That Help Homes Sell Faster',
    excerpt:
      'Small visual upgrades often create a stronger first impression than major renovations.',
    category: 'Tips',
    publishedAt: '02 Apr 2022',
    imageUrl:
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'a7',
    title: 'Luxury Rentals Are Rising In Global Gateway Cities',
    excerpt:
      'High-end tenants are prioritizing amenities, security, and walkable urban convenience.',
    category: 'Market',
    publishedAt: '15 May 2022',
    imageUrl:
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'a8',
    title: 'A Practical Checklist For First-Time Property Investors',
    excerpt:
      'From cap rates to maintenance reserves, these fundamentals reduce costly surprises.',
    category: 'Guides',
    publishedAt: '27 Jun 2022',
    imageUrl:
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'a9',
    title: 'Why Energy-Efficient Homes Command Higher Resale Value',
    excerpt:
      'Buyers increasingly factor utility costs and sustainability into long-term ownership math.',
    category: 'Sustainability',
    publishedAt: '10 Jul 2022',
    imageUrl:
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'a10',
    title: 'Remote Work Continues To Reshape Suburban Demand',
    excerpt:
      'Extra office space and larger lots remain top priorities for relocating professionals.',
    category: 'Trends',
    publishedAt: '22 Aug 2022',
    imageUrl:
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'a11',
    title: 'The Complete Guide To Open House Etiquette',
    excerpt:
      'Ask better questions, compare listings efficiently, and leave a positive impression on agents.',
    category: 'Guides',
    publishedAt: '05 Sep 2022',
    imageUrl:
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'a12',
    title: 'Smart Home Features Buyers Actually Use Every Day',
    excerpt:
      'Not every gadget adds value. Focus on security, climate, and lighting integrations that last.',
    category: 'Tech',
    publishedAt: '18 Oct 2022',
    imageUrl:
      'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&auto=format&fit=crop&q=80',
  },
];

const ARTICLES_PER_PAGE = 3;
const PAGE_COUNT = 4;

interface HelpfulGuidesSectionProps {
  articles?: Article[];
}

export function HelpfulGuidesSection({
  articles = STUB_ARTICLES,
}: HelpfulGuidesSectionProps) {
  const [activePage, setActivePage] = useState(0);

  const visibleArticles = articles.slice(
    activePage * ARTICLES_PER_PAGE,
    activePage * ARTICLES_PER_PAGE + ARTICLES_PER_PAGE
  );

  return (
    <section
      id="guides"
      className="w-full bg-white py-16 md:py-20"
      aria-labelledby="guides-heading"
    >
      <div className="section-container">

        <div className="mb-8 flex items-center justify-center gap-2">
          {Array.from({ length: PAGE_COUNT }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActivePage(index)}
              aria-label={`Go to article page ${index + 1}`}
              aria-current={activePage === index ? 'true' : undefined}
              className={cn(
                'h-2 w-2 rounded-full transition-colors duration-200',
                activePage === index
                  ? 'bg-hz-primary'
                  : 'bg-hz-border hover:bg-hz-muted'
              )}
            />
          ))}
        </div>

        <header className="mb-12 text-center">
          <p className="mb-2 font-poppins text-[11px] font-semibold uppercase tracking-[2px] text-hz-primary">
            Latest News
          </p>
          <h2
            id="guides-heading"
            className="font-poppins text-[30px] font-semibold leading-[1.2] tracking-[-0.3px] text-hz-dark md:text-[36px]"
          >
            Helpful Homeya Guides
          </h2>
        </header>

        <div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-3"
          role="list"
          aria-label="Helpful guides and articles"
        >
          {visibleArticles.map((article) => (
            <div key={article.id} role="listitem">
              <ArticleCard article={article} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
