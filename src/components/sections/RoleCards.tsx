'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { getAssetPath } from '@/lib/utils';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import { BadgeShadcn } from '@/components/ui';

const roles = [
  {
    image: '/images/role-cards/img-card-cover-sdk-install@2x.webp',
    title: 'For developers',
    features: ['Subscriptions SDK', 'Refund Saver', 'Remote config', 'Fallback paywalls'],
    href: '/for-developers/',
  },
  {
    image: '/images/role-cards/img-card-cover-charts@2x.webp',
    title: 'For app owners',
    features: ['Revenue analytics', 'LTV analytics', 'AI LTV and revenue predictions'],
    href: '/for-app-owners/',
  },
  {
    image: '/images/role-cards/img-card-cover-paywalls@2x.webp',
    title: 'For marketers',
    features: ['A/B testing', 'No-code Builder', 'Localizations', 'Targeting'],
    href: '/for-marketers/',
  },
];

export default function RoleCards() {
  return (
    <Section size="lg" background="white">
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-[var(--spacing-2xl)]"
        >
          <h2 className="text-[var(--text-4xl)] sm:text-[var(--text-5xl)] lg:text-[var(--text-display)] font-[var(--font-bold)] text-[var(--text-primary)] leading-[1.1] px-4">
            Help your team run the mobile subscription business.
            <br />
            <span className="text-[var(--text-primary)]">
              Faster and cheaper.
            </span>
          </h2>
        </motion.div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-3 gap-[var(--spacing-lg)]">
          {roles.map((role, index) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                href={role.href}
                variant="bordered"
                padding="md"
                rounded="2xl"
                className="h-full bg-[var(--bg-subtle)] group"
              >
                {/* Card Image */}
                <div className="relative w-full aspect-[4/3] rounded-[var(--radius-lg)] overflow-hidden mb-[var(--spacing-lg)] bg-[var(--bg-primary)]">
                  <Image
                    src={getAssetPath(role.image)}
                    alt={role.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                {/* Title with arrow */}
                <div className="flex items-center gap-[var(--spacing-sm)] mb-[var(--spacing-md)]">
                  <h3 className="text-[var(--text-xl)] font-semibold text-[var(--text-primary)]">{role.title}</h3>
                  <ArrowRight className="w-5 h-5 text-[var(--color-accent)] group-hover:translate-x-1 transition-transform" />
                </div>

                {/* Features as pills/tags */}
                <div className="flex flex-wrap gap-[var(--spacing-sm)]">
                  {role.features.map((feature) => (
                    <BadgeShadcn
                      key={feature}
                      variant="outline"
                      className="px-[var(--spacing-sm)] py-[var(--spacing-xs)] text-[var(--text-sm)] text-[var(--text-secondary)] bg-[var(--bg-primary)] border-[var(--border-default)]"
                    >
                      {feature}
                    </BadgeShadcn>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
