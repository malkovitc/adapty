'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { Button } from '@/components/ui';
import { getAssetPath } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

export interface MigrationCTAProps {
  /** Main headline - defaults to "Using another solution?" */
  title?: string;
  /** Subtitle text - defaults to "We'll help you migrate for free." */
  subtitle?: string;
  /** Additional text about migration benefits */
  description?: string;
  /** Call-to-action button configuration */
  cta: { text: string; href: string };
  /** Optional image for the visual side */
  image?: { src: string; alt: string };
  /** List of competitor names to display as logos */
  competitors?: string[];
  /** Background style variant */
  background?: 'white' | 'gray' | 'gradient';
}

/** Mapping competitor names to display initials/styling */
const competitorStyles: Record<string, { initials: string; color: string }> = {
  RevenueCat: { initials: 'RC', color: 'from-yellow-500 to-orange-600' },
  Qonversion: { initials: 'Q', color: 'from-blue-500 to-indigo-600' },
  Purchasely: { initials: 'P', color: 'from-emerald-500 to-teal-600' },
  Superwall: { initials: 'SW', color: 'from-purple-500 to-pink-600' },
  Glassfy: { initials: 'G', color: 'from-cyan-500 to-blue-600' },
  Apphud: { initials: 'AH', color: 'from-red-500 to-rose-600' },
};

/**
 * MigrationCTA Section
 *
 * A section component targeting users migrating from competitors.
 * Features a 2-column layout with content on left and image on right,
 * reversed on mobile for optimal viewing.
 *
 * @example
 * <MigrationCTA
 *   cta={{ text: "Schedule migration call", href: "/contact" }}
 *   competitors={['RevenueCat', 'Qonversion']}
 * />
 */
export default function MigrationCTA({
  title = 'Using another solution?',
  subtitle = "We'll help you migrate for free.",
  description,
  cta,
  image,
  competitors = [],
  background = 'gray',
}: MigrationCTAProps) {
  return (
    <Section size="lg" background={background} className="overflow-hidden">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="order-2 lg:order-1"
          >
            {/* Competitor logos */}
            {competitors.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-wrap gap-3 mb-6"
              >
                {competitors.map((competitor, index) => {
                  const style = competitorStyles[competitor] || {
                    initials: competitor.slice(0, 2).toUpperCase(),
                    color: 'from-gray-500 to-slate-600',
                  };
                  return (
                    <motion.div
                      key={competitor}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                      className={`
                        w-10 h-10 rounded-lg bg-gradient-to-br ${style.color}
                        flex items-center justify-center text-white font-bold text-sm
                        shadow-md
                      `}
                      title={competitor}
                    >
                      {style.initials}
                    </motion.div>
                  );
                })}
              </motion.div>
            )}

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[var(--text-h2)] sm:text-[var(--text-h1)] font-[var(--font-bold)] text-[var(--text-primary)] mb-4"
            >
              {title}
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-[var(--text-xl)] font-[var(--font-semibold)] text-[var(--text-primary)] mb-4"
            >
              {subtitle}
            </motion.p>

            {/* Description */}
            {description && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-[var(--text-lg)] text-[var(--text-secondary)] mb-8"
              >
                {description}
              </motion.p>
            )}

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: description ? 0.5 : 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <Button
                variant="primary"
                size="lg"
                href={cta.href}
                icon={<ArrowRight className="w-5 h-5" />}
              >
                {cta.text}
              </Button>
            </motion.div>

            {/* Trust indicator */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-6 text-[var(--text-sm)] text-[var(--text-tertiary)]"
            >
              No commitment required. Our team will handle the entire process.
            </motion.p>
          </motion.div>

          {/* Visual Side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 lg:order-2"
          >
            {image ? (
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={getAssetPath(image.src)}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            ) : (
              /* Default migration illustration */
              <div className="relative aspect-[4/3] rounded-2xl bg-gradient-to-br from-violet-100 to-indigo-100 overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Migration arrow animation */}
                  <motion.div
                    animate={{
                      x: [0, 20, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="flex items-center gap-6"
                  >
                    {/* Source box */}
                    <div className="w-24 h-24 rounded-xl bg-white shadow-lg flex items-center justify-center border border-gray-200">
                      <span className="text-2xl font-bold text-gray-400">?</span>
                    </div>

                    {/* Arrow */}
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      <ArrowRight className="w-8 h-8 text-violet-500" />
                    </motion.div>

                    {/* Target box (Adapty) */}
                    <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-violet-600 to-pink-500 shadow-lg flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">A</span>
                    </div>
                  </motion.div>
                </div>

                {/* Background decoration */}
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.3, 0.4, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-r from-violet-300/30 to-pink-300/30 rounded-full blur-[60px]"
                />

                {/* Grid pattern */}
                <div
                  className="absolute inset-0 opacity-[0.05]"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle at 1px 1px, rgb(124, 58, 237) 1px, transparent 0)',
                    backgroundSize: '20px 20px',
                  }}
                />
              </div>
            )}
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
