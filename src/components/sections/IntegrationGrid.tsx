'use client';

import { memo, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { getAssetPath } from '@/lib/utils';

export interface Integration {
  id: string;
  name: string;
  logo: string;
  href: string;
  category?: 'analytics' | 'attribution' | 'marketing' | 'storage' | 'other';
  description?: string;
}

export interface IntegrationGridProps {
  title?: string;
  subtitle?: string;
  integrations: Integration[];
  showCategories?: boolean;
  columns?: 4 | 5 | 6;
  background?: 'white' | 'gray';
}

// Category labels for display
const categoryLabels: Record<string, string> = {
  analytics: 'Analytics',
  attribution: 'Attribution',
  marketing: 'Marketing',
  storage: 'Storage',
  other: 'Other',
};

// Memoized Integration Card Component
const IntegrationCard = memo(function IntegrationCard({
  integration,
  index,
  shouldReduceMotion,
}: {
  integration: Integration;
  index: number;
  shouldReduceMotion: boolean;
}) {
  const isExternal = integration.href.startsWith('http');

  const cardContent = (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20, scale: shouldReduceMotion ? 1 : 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: shouldReduceMotion ? 0.3 : 0.4,
        delay: shouldReduceMotion ? 0 : index * 0.03,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group flex flex-col items-center justify-center p-4 sm:p-6 bg-white rounded-xl border border-slate-200 hover:border-violet-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer min-h-[120px] sm:min-h-[140px]"
    >
      {/* Logo container */}
      <div className="w-12 h-12 sm:w-14 sm:h-14 mb-3 flex items-center justify-center">
        <Image
          src={getAssetPath(integration.logo)}
          alt={integration.name}
          width={56}
          height={56}
          className="w-10 h-10 sm:w-12 sm:h-12 object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
          unoptimized
        />
      </div>

      {/* Name */}
      <span className="text-sm font-medium text-slate-700 text-center group-hover:text-violet-600 transition-colors">
        {integration.name}
      </span>

      {/* Optional description */}
      {integration.description && (
        <span className="text-xs text-slate-400 mt-1 text-center line-clamp-2">
          {integration.description}
        </span>
      )}
    </motion.div>
  );

  if (isExternal) {
    return (
      <a
        href={integration.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${integration.name} integration`}
      >
        {cardContent}
      </a>
    );
  }

  return (
    <Link href={integration.href} aria-label={`${integration.name} integration`}>
      {cardContent}
    </Link>
  );
});

// Category Group Component
const CategoryGroup = memo(function CategoryGroup({
  category,
  integrations,
  shouldReduceMotion,
  startIndex,
}: {
  category: string;
  integrations: Integration[];
  shouldReduceMotion: boolean;
  startIndex: number;
}) {
  return (
    <div className="mb-10 last:mb-0">
      <motion.h3
        initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="text-lg font-semibold text-slate-900 mb-4"
      >
        {categoryLabels[category] || category}
      </motion.h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
        {integrations.map((integration, index) => (
          <IntegrationCard
            key={integration.id}
            integration={integration}
            index={startIndex + index}
            shouldReduceMotion={shouldReduceMotion}
          />
        ))}
      </div>
    </div>
  );
});

export default function IntegrationGrid({
  title = 'Connect with your favorite tools',
  subtitle,
  integrations,
  showCategories = false,
  columns = 6,
  background = 'white',
}: IntegrationGridProps) {
  const shouldReduceMotion = useReducedMotion() ?? false;

  // Column class mapping for the grid
  const columnClasses = {
    4: 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
    5: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5',
    6: 'grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6',
  };

  // Group integrations by category if showCategories is true
  const groupedIntegrations = useMemo(() => {
    if (!showCategories) return null;

    const groups: Record<string, Integration[]> = {};
    const categoryOrder = ['analytics', 'attribution', 'marketing', 'storage', 'other'];

    integrations.forEach((integration) => {
      const category = integration.category || 'other';
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(integration);
    });

    // Sort groups by predefined order
    const sortedGroups: Array<{ category: string; integrations: Integration[] }> = [];
    categoryOrder.forEach((cat) => {
      if (groups[cat] && groups[cat].length > 0) {
        sortedGroups.push({ category: cat, integrations: groups[cat] });
      }
    });

    // Add any categories not in the predefined order
    Object.keys(groups).forEach((cat) => {
      if (!categoryOrder.includes(cat)) {
        sortedGroups.push({ category: cat, integrations: groups[cat] });
      }
    });

    return sortedGroups;
  }, [integrations, showCategories]);

  return (
    <Section size="lg" background={background}>
      <Container>
        {/* Header */}
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: shouldReduceMotion ? 0.3 : 0.5 }}
            className="text-center mb-12"
          >
            {title && (
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-slate-500 max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}

        {/* Grid - Grouped by category or flat */}
        {showCategories && groupedIntegrations ? (
          <div>
            {groupedIntegrations.map(({ category, integrations: categoryIntegrations }, groupIndex) => {
              // Calculate start index for stagger animation
              const startIndex = groupedIntegrations
                .slice(0, groupIndex)
                .reduce((acc, g) => acc + g.integrations.length, 0);

              return (
                <CategoryGroup
                  key={category}
                  category={category}
                  integrations={categoryIntegrations}
                  shouldReduceMotion={shouldReduceMotion}
                  startIndex={startIndex}
                />
              );
            })}
          </div>
        ) : (
          <div className={`grid gap-4 sm:gap-6 ${columnClasses[columns]}`}>
            {integrations.map((integration, index) => (
              <IntegrationCard
                key={integration.id}
                integration={integration}
                index={index}
                shouldReduceMotion={shouldReduceMotion}
              />
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
