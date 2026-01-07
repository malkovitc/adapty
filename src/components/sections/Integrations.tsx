'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { getAssetPath } from '@/lib/utils';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { integrations as defaultIntegrations, type Integration } from '@/data/integrations';

// Memoized Integration Card Component
const IntegrationCard = memo(function IntegrationCard({
  integration,
  index,
}: {
  integration: Integration;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link
        href={integration.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col items-center justify-center p-6 sm:p-8 bg-white rounded-2xl border border-neutral-200 hover:shadow-xl hover:border-violet-300 hover:-translate-y-1 transition-all duration-300 cursor-pointer touch-manipulation min-h-[120px] sm:min-h-[140px]"
      >
        <div className="h-12 sm:h-14 flex items-center justify-center w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={getAssetPath(integration.logo)}
            alt={integration.name}
            className="object-contain max-h-12 sm:max-h-14 max-w-[140px] sm:max-w-[160px] w-auto"
          />
        </div>
      </Link>
    </motion.div>
  );
});

interface IntegrationsProps {
  integrations?: Integration[];
}

export default function Integrations({ integrations = defaultIntegrations }: IntegrationsProps = {}) {
  return (
    <Section id="integrations" size="lg" background="gray" className="overflow-hidden">
      <Container>
        <div className="text-center mb-[var(--spacing-lg)]">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-4"
          >
            Integrations
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[var(--text-h2)] font-bold text-[var(--text-primary)] mb-4"
          >
            Sync purchase data with other services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[var(--text-lg)] text-[var(--text-secondary)]"
            style={{ maxWidth: '42rem', margin: '0 auto' }}
          >
            Forward subscription events to analytics and attribution services without coding.
          </motion.p>
        </div>

        {/* Logo Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-[var(--spacing-md)]"
        >
          {integrations.map((integration, index) => (
            <IntegrationCard key={integration.id} integration={integration} index={index} />
          ))}
        </motion.div>

        {/* See all integrations link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-[var(--spacing-lg)]"
        >
          <Link
            href="https://adapty.io/integrations/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 font-semibold transition-colors group min-h-[44px] py-2 touch-manipulation"
          >
            Explore integrations
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </Container>
    </Section>
  );
}
