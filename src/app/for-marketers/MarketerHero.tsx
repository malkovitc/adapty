'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getAssetPath } from '@/lib/utils';

export default function MarketerHero() {
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

  return (
    <section
      className="relative w-full overflow-hidden bg-[#FAFAFA]"
      aria-label="For Marketers hero section"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-purple-100/60 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-bl from-pink-100/60 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-20 mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <span
                className="group relative inline-flex items-center gap-2 rounded-full text-sm font-semibold uppercase tracking-wider text-slate-600 animate-border"
                style={{
                  background: `
                    linear-gradient(white, white) padding-box,
                    conic-gradient(
                      from var(--border-angle),
                      rgba(236, 72, 153, 0.15) 0%,
                      rgba(168, 85, 247, 0.5) 25%,
                      rgba(99, 102, 241, 0.5) 50%,
                      rgba(168, 85, 247, 0.5) 75%,
                      rgba(236, 72, 153, 0.15) 100%
                    ) border-box
                  `,
                  border: '1.5px solid transparent',
                  padding: '0.5rem 1rem',
                }}
              >
                FOR MARKETERS
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight mb-6"
            >
              <span className="text-slate-900">Customize and Target Paywalls: </span>
              <span className="bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">
                Maximize App's Conversions
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-slate-500 leading-relaxed mb-8"
            >
              Create and deploy beautiful native paywalls with Adapty Paywall Builder.
              A/B test paywalls and target them using one dashboard. Track metrics with 99% accuracy with stores.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="https://adapty.io/schedule-demo/"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg transition-colors"
              >
                Schedule a demo
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="https://adapty.io/signup/"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-900 font-medium rounded-lg border border-slate-200 transition-colors"
              >
                Start for free
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Side - Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-slate-300/50 border border-slate-200">
              <Image
                src={getAssetPath('/images/features/no-code-paywall-builder@2x.webp')}
                alt="Adapty Paywall Builder - Build and manage paywalls without coding"
                width={800}
                height={600}
                className="w-full h-auto"
                priority
                unoptimized
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
