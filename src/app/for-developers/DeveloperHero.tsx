'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';

const integrationSteps = [
  {
    number: 1,
    title: 'Configuring platforms',
    description: 'Add products from AppStore Connect, Google Play, or Stripe',
    active: true,
  },
  {
    number: 2,
    title: 'Installing Adapty SDK',
    description: 'Just a single line of code to get started',
    code: `Adapty.activate("PUBLIC_SDK_KEY")`,
    active: true,
  },
  {
    number: 3,
    title: 'Processing purchasing events',
    description: 'Adapty handles validation, sync, and analytics',
    active: true,
  },
];

export default function DeveloperHero() {
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
      aria-label="For Developers hero section"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-purple-100/60 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-bl from-blue-100/60 to-transparent rounded-full blur-3xl" />
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
                FOR DEVELOPERS
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight mb-6"
            >
              <span className="text-slate-900">Integrate In-App Purchases: </span>
              <span className="bg-gradient-to-r from-indigo-500 to-blue-600 bg-clip-text text-transparent">
                Simplified Monetization for Developers
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-slate-500 leading-relaxed mb-8"
            >
              Save hours of coding with quick IAPs integration and just three SDK methods
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
                Book a demo
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

          {/* Right Side - Integration Steps */}
          <motion.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
              {/* Header */}
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="ml-4 text-sm text-slate-500 font-mono">Integration Steps</span>
                </div>
              </div>

              {/* Steps */}
              <div className="p-6 space-y-4">
                {integrationSteps.map((step, index) => (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.15 }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100"
                  >
                    {/* Step Number */}
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center">
                      {step.active ? (
                        <Check className="w-4 h-4 text-white" />
                      ) : (
                        <span className="text-white font-medium text-sm">{step.number}</span>
                      )}
                    </div>

                    {/* Step Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-slate-900 mb-1">{step.title}</h3>
                      <p className="text-sm text-slate-500 mb-2">{step.description}</p>
                      {step.code && (
                        <div className="bg-slate-900 rounded-lg px-3 py-2 overflow-x-auto">
                          <code className="text-sm text-emerald-400 font-mono">{step.code}</code>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
