'use client';

import { motion } from 'framer-motion';
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
    metric: '+50% in total revenue',
    description: 'How pricing tests unlocked app\'s potential',
    icon: '/images/case-studies/app-icon-productivity-app@4x.webp',
    href: 'https://adapty.io/case-studies/productivity-app-and-autopilot/',
  },
  {
    company: 'Text on Pic',
    category: 'Photo & Video',
    metric: 'Over 30% MRR growth',
    description: 'How to boost revenue with the right experiments',
    icon: '/images/case-studies/app-icon-text-on-pic@3x.webp',
    href: 'https://adapty.io/case-studies/photo-editing-app-and-autopilot/',
  },
  {
    company: 'Trip Planning',
    category: 'Travel',
    metric: '+102% ARPU growth',
    description: 'New onboarding and pricing strategy doubled revenue per user',
    icon: '/images/case-studies/logo-secret-app@3x.webp',
    href: 'https://adapty.io/case-studies/travel-app/',
  },
  {
    company: 'Going Merry',
    category: 'App publisher',
    metric: '5x MRR growth',
    description: 'How to scale subscription revenue with Paywall Builder',
    icon: '/images/case-studies/going-merry-app-logo.webp',
    href: 'https://adapty.io/case-studies/going-merry/',
  },
  {
    company: 'Shmoody',
    category: 'Mental health',
    metric: 'ARR scaled from $0 to $2M',
    description: 'How to grow from a free app to $2M ARR with Adapty',
    icon: '/images/case-studies/app-logo-shmoody.webp',
    href: 'https://adapty.io/case-studies/shmoody/',
  },
  {
    company: 'Lively',
    category: 'Health & Fitness',
    metric: 'Refund rate dropped by 83%',
    description: 'Saved 82% of potentially lost revenue',
    icon: '/images/case-studies/app-logo-lively@2x.png',
    href: 'https://adapty.io/case-studies/lively/',
  },
  {
    company: 'Glam AI',
    category: 'Makeup & Beauty',
    metric: 'ROAS from Adapty – 108%',
    description: 'How to scale to $1.2M ARR in 3 months',
    icon: '/images/case-studies/app-logo-glam-ai.webp',
    href: 'https://adapty.io/case-studies/glam-ai/',
  },
  {
    company: 'Pepapp',
    category: 'Health & Fitness',
    metric: '400% ROI on Adapty',
    description: 'How to make Adapty free with Refund Saver',
    icon: '/images/case-studies/Pepapp-icon@2x.webp',
    href: 'https://adapty.io/case-studies/pepapp/',
  },
  {
    company: 'Fotorama',
    category: 'Photo & Video',
    metric: 'Refund rate dropped 40%',
    description: 'How to decrease the refund rate with Adapty',
    icon: '/images/case-studies/app-icon-fotorama-original.webp',
    href: 'https://adapty.io/case-studies/fotorama/',
  },
];

export default function CaseStudies() {
  return (
    <Section size="lg" background="gray">
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-[var(--spacing-lg)]"
        >
          <h2 className="text-[var(--text-h2)] font-bold text-[var(--text-primary)] mb-[var(--spacing-md)]">
            Read the real cases of our customers
          </h2>
        </motion.div>

        {/* Cases Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[var(--spacing-md)] mb-[var(--spacing-lg)]">
          {caseStudies.slice(0, 6).map((study, index) => (
            <motion.div
              key={study.company}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={study.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full bg-[var(--bg-primary)] rounded-2xl p-[var(--spacing-md)] border border-slate-200 hover:shadow-xl hover:shadow-slate-200/50 hover:border-violet-300 transition-all duration-300"
              >
                {/* Logo and company info */}
                <div className="flex items-center gap-[var(--spacing-sm)] mb-[var(--spacing-md)]">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-[var(--bg-subtle)] flex items-center justify-center">
                    <Image
                      src={getAssetPath(study.icon)}
                      alt={study.company}
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                      unoptimized
                    />
                  </div>
                  <div>
                    <p className="font-medium text-[var(--text-primary)]">{study.company}</p>
                    <p className="text-xs text-[var(--text-secondary)]">{study.category}</p>
                  </div>
                </div>

                {/* Metric */}
                <p className="text-[var(--text-lg)] font-bold text-violet-600 mb-[var(--spacing-xs)]">{study.metric}</p>

                {/* Description */}
                <p className="text-[var(--text-secondary)] text-sm mb-[var(--spacing-md)]">{study.description}</p>

                {/* Read more */}
                <span className="inline-flex items-center gap-[var(--spacing-xs)] text-sm text-[var(--text-secondary)] group-hover:text-violet-600 transition-colors">
                  Read more
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Link
            href="https://adapty.io/case-studies/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-[var(--spacing-xs)] px-[var(--spacing-md)] py-[var(--spacing-sm)] bg-[var(--bg-dark)] hover:bg-slate-800 text-[var(--text-light)] font-medium rounded-lg transition-colors"
          >
            Read all cases
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </Container>
    </Section>
  );
}
