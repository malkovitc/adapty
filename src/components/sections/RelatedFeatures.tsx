'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';

export interface RelatedFeature {
  title: string;
  description: string;
  href: string;
  icon?: ReactNode;
}

export interface RelatedFeaturesProps {
  title?: string;
  features: RelatedFeature[];
  columns?: 2 | 3 | 4;
  background?: 'white' | 'gray';
}

/**
 * RelatedFeatures Section Component
 *
 * Displays 2-4 links to related feature pages at the bottom of feature pages.
 * Uses Card component with hover elevation effect and stagger animation.
 *
 * @example
 * <RelatedFeatures
 *   features={[
 *     { title: 'A/B Testing', description: 'Test different...', href: '/ab-testing', icon: <FlaskConical /> },
 *     { title: 'Analytics', description: 'Track revenue...', href: '/analytics', icon: <BarChart3 /> },
 *   ]}
 *   columns={2}
 * />
 */
export default function RelatedFeatures({
  title = 'Explore more features',
  features,
  columns = 4,
  background = 'gray',
}: RelatedFeaturesProps) {
  // Determine grid columns based on prop
  const gridClasses = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  // Stagger animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <Section background={background}>
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-[var(--spacing-2xl)]"
        >
          <h2 className="text-[var(--text-3xl)] sm:text-[var(--text-4xl)] font-bold text-[var(--text-primary)] leading-tight">
            {title}
          </h2>
        </motion.div>

        {/* Feature Cards Grid */}
        <motion.div
          className={`grid ${gridClasses[columns]} gap-[var(--spacing-lg)]`}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {features.map((feature) => (
            <motion.div key={feature.href} variants={itemVariants}>
              <Card
                href={feature.href}
                variant="elevated"
                padding="lg"
                rounded="xl"
                className="h-full bg-white group flex flex-col"
              >
                {/* Icon */}
                {feature.icon && (
                  <div className="w-12 h-12 rounded-[var(--radius-lg)] bg-[var(--bg-muted)] grid place-items-center mb-[var(--spacing-md)] group-hover:bg-[var(--color-accent)] transition-colors duration-200">
                    <span className="text-[var(--text-secondary)] group-hover:text-white transition-colors duration-200 [&>svg]:w-6 [&>svg]:h-6">
                      {feature.icon}
                    </span>
                  </div>
                )}

                {/* Title */}
                <h4 className="text-[var(--text-lg)] font-semibold text-[var(--text-primary)] mb-[var(--spacing-sm)]">
                  {feature.title}
                </h4>

                {/* Description */}
                <p className="text-[var(--text-sm)] text-[var(--text-secondary)] leading-[var(--leading-relaxed)] mb-[var(--spacing-md)] flex-grow">
                  {feature.description}
                </p>

                {/* Arrow Link */}
                <div className="flex items-center text-[var(--color-accent)] text-[var(--text-sm)] font-medium">
                  <span className="mr-[var(--spacing-xs)]">Learn more</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
