'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getAssetPath } from '@/lib/utils';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';

const caseStudies = [
  {
    company: 'Productivity App',
    category: 'Productivity',
    stat: '+50%',
    statLabel: 'in total revenue',
    description:
      'How a productivity app increased their revenue by optimizing their paywall strategy with Adapty.',
    icon: '/images/case-studies/app-icon-productivity-app@4x.webp',
    href: 'https://adapty.io/case-studies/productivity-app-and-autopilot/',
  },
  {
    company: 'Text on Pic',
    category: 'Photo & Video',
    stat: '+30%',
    statLabel: 'MRR growth',
    description:
      'Text on Pic achieved significant MRR growth by A/B testing their subscription offerings.',
    icon: '/images/case-studies/app-icon-text-on-pic@3x.webp',
    href: 'https://adapty.io/case-studies/photo-editing-app-and-autopilot/',
  },
  {
    company: 'Trip Planning',
    category: 'Travel',
    stat: '+102%',
    statLabel: 'ARPU growth',
    description:
      "A trip planning app doubled their ARPU using Adapty's targeting and analytics features.",
    icon: '/images/case-studies/logo-secret-app@3x.webp',
    href: 'https://adapty.io/case-studies/travel-app/',
  },
];

export default function PricingCaseStudies() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.3 : 0.5,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <Section size="lg" background="gray">
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0.3 : 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Read the real cases of our customers
          </h2>
          <p className="text-lg text-slate-500">
            See how companies like yours have grown their subscription revenue with Adapty
          </p>
        </motion.div>

        {/* Cases Grid - 3 cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[var(--spacing-md)] mb-[var(--spacing-lg)]"
        >
          {caseStudies.map((study) => (
            <motion.div key={study.company} variants={itemVariants}>
              <Link
                href={study.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full bg-[var(--bg-primary)] rounded-2xl p-[var(--spacing-md)] border border-slate-200 hover:shadow-xl hover:shadow-slate-200/50 hover:border-violet-300 hover:-translate-y-1 transition-all duration-300"
              >
                {/* Logo and company info */}
                <div className="flex items-center gap-[var(--spacing-sm)] mb-[var(--spacing-md)]">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-gradient-to-br from-violet-100 to-indigo-100 flex items-center justify-center shadow-sm">
                    <Image
                      src={getAssetPath(study.icon)}
                      alt={study.company}
                      width={56}
                      height={56}
                      className="object-cover w-full h-full"
                      unoptimized
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--text-primary)]">{study.company}</p>
                    <span className="inline-block px-2 py-0.5 text-xs font-medium text-violet-600 bg-violet-50 rounded-full">
                      {study.category}
                    </span>
                  </div>
                </div>

                {/* Stat - big and gradient */}
                <div className="mb-[var(--spacing-sm)]">
                  <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent">
                    {study.stat}
                  </span>
                  <span className="ml-2 text-lg font-medium text-[var(--text-secondary)]">
                    {study.statLabel}
                  </span>
                </div>

                {/* Description */}
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-[var(--spacing-md)]">
                  {study.description}
                </p>

                {/* Read more */}
                <span className="inline-flex items-center gap-[var(--spacing-xs)] text-sm font-medium text-violet-600 group-hover:text-violet-700 transition-colors">
                  Read more
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0.3 : 0.5, delay: 0.2 }}
          className="text-center"
        >
          <Link
            href="https://adapty.io/case-studies/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-[var(--spacing-xs)] px-[var(--spacing-md)] py-[var(--spacing-sm)] bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg transition-colors"
          >
            Read all cases
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </Container>
    </Section>
  );
}
