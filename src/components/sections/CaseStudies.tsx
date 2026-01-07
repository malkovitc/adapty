'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getAssetPath } from '@/lib/utils';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { caseStudies as defaultCaseStudies, type CaseStudy } from '@/data/case-studies';

interface CaseStudiesProps {
  caseStudies?: CaseStudy[];
}

export default function CaseStudies({ caseStudies = defaultCaseStudies }: CaseStudiesProps) {
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
                      src={getAssetPath(study.logo)}
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
