'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getAssetPath } from '@/lib/utils';

export default function AppOwnersHero() {
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
      aria-label="For App Owners hero section"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-purple-100/60 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-bl from-blue-100/60 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Main Content - Side by Side Layout */}
      <div className="relative z-20 mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20">
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
              <span className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                FOR APP OWNERS
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-[42px] font-bold leading-[1.15] tracking-tight text-slate-900 mb-6"
            >
              A springboard for running a successful subscription app business
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-lg text-slate-500 leading-relaxed mb-8"
            >
              Running a subscription business is hard, we know it. Adapty makes it easy for you and your team to get things done quickly and cheaply while allowing you to focus on what you do best — building new products and acquiring customers.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="https://adapty.io/schedule-demo/"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-lg transition-colors"
              >
                Schedule a demo
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="https://app.adapty.io/registration"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-50 text-violet-600 font-medium rounded-lg border border-violet-200 transition-colors"
              >
                Start for free
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Side - Real Case Chart Image */}
          <motion.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100 bg-white">
              <Image
                src={getAssetPath('/images/for-app-owners/img-successful-subscription-app@2x.webp')}
                alt="Real case: +3x revenue with Adapty SDK"
                width={550}
                height={400}
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
