'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import CalendlyEmbed from '@/components/sections/CalendlyEmbed';

const benefits = [
  'Learn how Adapty can boost your revenue',
  'Get a personalized product walkthrough',
  'Discuss your integration needs',
  'Plan a migration if needed',
];

const g2Awards = [
  { name: 'Best Results', season: 'Winter 2025' },
  { name: 'High Performer', season: 'Winter 2025' },
  { name: 'Best Usability', season: 'Winter 2025' },
  { name: 'Best Relationship', season: 'Winter 2025' },
  { name: 'Most Implementable', season: 'Winter 2025' },
];

export default function DemoContent() {
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
    <section className="relative w-full bg-[#FAFAFA] pt-24 pb-16 lg:pt-32 lg:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column - Value Propositions */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col"
          >
            {/* Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-slate-900 mb-4"
            >
              Schedule a Demo
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={itemVariants}
              className="text-xl text-slate-500 leading-relaxed mb-8"
            >
              Learn how to increase your app revenue with Adapty's smart paywall management and subscription analytics.
            </motion.p>

            {/* Benefits List */}
            <motion.ul variants={itemVariants} className="space-y-4 mb-10">
              {benefits.map((benefit, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  className="flex items-start gap-3"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center mt-0.5">
                    <Check className="w-4 h-4 text-emerald-600" />
                  </span>
                  <span className="text-slate-700 text-lg">{benefit}</span>
                </motion.li>
              ))}
            </motion.ul>

            {/* G2 Awards Section */}
            <motion.div variants={itemVariants} className="mb-6">
              <div className="flex flex-wrap gap-3 mb-6">
                {g2Awards.map((award, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex flex-col items-center justify-center w-20 h-24 bg-white rounded-xl border border-slate-200 shadow-sm p-2 hover:shadow-md transition-shadow"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center mb-1">
                      <span className="text-white font-bold text-sm">G2</span>
                    </div>
                    <span className="text-[10px] font-medium text-slate-700 text-center leading-tight">
                      {award.name}
                    </span>
                    <span className="text-[8px] text-slate-400">{award.season}</span>
                  </motion.div>
                ))}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>
                <span className="text-lg font-semibold text-slate-900">4.9</span>
                <span className="text-slate-500">out of 5 stars</span>
              </div>

              {/* Trust text */}
              <p className="text-slate-500">
                Trusted by <span className="font-semibold text-slate-700">15,000+</span> apps
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column - Calendly Embed */}
          <motion.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0.3 : 0.8,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="lg:sticky lg:top-24"
          >
            <CalendlyEmbed
              url="https://calendly.com/adapty/demo"
              height="700px"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
