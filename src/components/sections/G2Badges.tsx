'use client';

import Image from 'next/image';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { BadgeShadcn } from '@/components/ui';
import { getAssetPath } from '@/lib/utils';

export interface G2Badge {
  id: string;
  name: string;
  image: string;
  href: string;
}

export interface G2BadgesProps {
  title?: string;
  badges?: G2Badge[];
  background?: 'white' | 'gray';
  eyebrow?: string;
}

const defaultBadges: G2Badge[] = [
  {
    id: 'high-performer',
    name: 'High Performer Winter 2025',
    image: '/images/g2/g2-high_performer-winter_2025.svg',
    href: 'https://www.g2.com/products/adapty/reviews',
  },
  {
    id: 'best-results',
    name: 'Best Results Winter 2025',
    image: '/images/g2/g2-best_results-winter_2025.svg',
    href: 'https://www.g2.com/products/adapty/reviews',
  },
  {
    id: 'best-usability',
    name: 'Best Usability Winter 2025',
    image: '/images/g2/g2-best_usability-winter_2025.svg',
    href: 'https://www.g2.com/products/adapty/reviews',
  },
  {
    id: 'best-relationship',
    name: 'Best Relationship Winter 2025',
    image: '/images/g2/g2-best_relationship-winter_2025.svg',
    href: 'https://www.g2.com/products/adapty/reviews',
  },
  {
    id: 'most-implementable',
    name: 'Most Implementable Winter 2025',
    image: '/images/g2/g2-most_implementable-winter_2025.svg',
    href: 'https://www.g2.com/products/adapty/reviews',
  },
];

export default function G2Badges({
  title,
  badges = defaultBadges,
  background = 'white',
  eyebrow = 'G2 Winter 2025 Awards',
}: G2BadgesProps) {
  return (
    <Section background={background}>
      <Container>
        {eyebrow && (
          <div className="flex justify-center mb-4">
            <BadgeShadcn variant="outline" className="px-4 py-1 text-xs font-semibold text-[var(--text-secondary)]">
              {eyebrow}
            </BadgeShadcn>
          </div>
        )}
        {title && (
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">
            {title}
          </h2>
        )}

        {/*
          Responsive grid:
          - Mobile (default): 2 columns
          - sm (640px+): 3 columns
          - lg (1024px+): 5 columns (all in one row)
        */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 justify-items-center">
          {badges.map((badge) => (
            <a
              key={badge.id}
              href={badge.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center transition-transform duration-200 hover:scale-110"
              aria-label={badge.name}
            >
              <Image
                src={getAssetPath(badge.image)}
                alt={badge.name}
                width={120}
                height={160}
                className="h-auto w-full max-w-[100px] sm:max-w-[120px]"
                unoptimized
              />
            </a>
          ))}
        </div>
      </Container>
    </Section>
  );
}
