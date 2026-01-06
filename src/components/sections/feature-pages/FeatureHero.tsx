'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getAssetPath } from '@/lib/utils';

interface FeatureHeroProps {
  badge: string;
  title: string;
  titleHighlight?: string;
  description: string;
  primaryCTA?: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
  image?: {
    src: string;
    alt: string;
  };
}

export default function FeatureHero({
  badge,
  title,
  titleHighlight,
  description,
  primaryCTA,
  secondaryCTA,
  image,
}: FeatureHeroProps) {
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
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.3 : 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  // Split title around the highlight text
  const renderTitle = () => {
    if (!titleHighlight) {
      return <span className="text-slate-900">{title}</span>;
    }

    const parts = title.split(titleHighlight);
    return (
      <>
        {parts[0] && <span className="text-slate-900">{parts[0]}</span>}
        <span className="bg-gradient-to-r from-indigo-500 to-blue-600 bg-clip-text text-transparent">
          {titleHighlight}
        </span>
        {parts[1] && <span className="text-slate-900">{parts[1]}</span>}
      </>
    );
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-[#FAFAFA]"
      aria-label={`${badge} hero section`}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-purple-100/60 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-bl from-blue-100/60 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-20 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Badge with Animated Border */}
          <motion.div variants={itemVariants} className="mb-6">
            <span
              className="group relative inline-flex items-center gap-2 rounded-full text-sm font-semibold uppercase tracking-wider text-slate-600 animate-border"
              style={{
                background: `
                  linear-gradient(white, white) padding-box,
                  conic-gradient(
                    from var(--border-angle),
                    rgba(99, 102, 241, 0.15) 0%,
                    rgba(59, 130, 246, 0.5) 25%,
                    rgba(6, 182, 212, 0.5) 50%,
                    rgba(59, 130, 246, 0.5) 75%,
                    rgba(99, 102, 241, 0.15) 100%
                  ) border-box
                `,
                border: '1.5px solid transparent',
                padding: '0.5rem 1rem',
              }}
            >
              {badge}
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-center mb-6"
          >
            {renderTitle()}
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-slate-500 text-center leading-relaxed mb-8"
            style={{ width: '100%', maxWidth: '42rem' }}
          >
            {description}
          </motion.p>

          {/* CTA Buttons */}
          {(primaryCTA || secondaryCTA) && (
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              {primaryCTA && (
                <Link
                  href={primaryCTA.href}
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg transition-colors"
                >
                  {primaryCTA.text}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              )}
              {secondaryCTA && (
                <Link
                  href={secondaryCTA.href}
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-900 font-medium rounded-lg border border-slate-200 transition-colors"
                >
                  {secondaryCTA.text}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Hero Image */}
      {image && (
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-slate-300/50 border border-slate-200">
            <Image
              src={getAssetPath(image.src)}
              alt={image.alt}
              width={1400}
              height={900}
              className="w-full h-auto"
              priority
              unoptimized
            />
          </div>
        </motion.div>
      )}
    </section>
  );
}
