'use client';

import { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface PainPoint {
  icon: ReactNode;
  question: string;
}

interface PainPointsProps {
  painPoints: PainPoint[];
}

export default function PainPoints({ painPoints }: PainPointsProps) {
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
        duration: shouldReduceMotion ? 0.3 : 0.5,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section className="relative py-12 sm:py-16 bg-[#FAFAFA]">
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-4 sm:gap-6 md:grid-cols-3"
        >
          {painPoints.map((painPoint, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex items-center gap-4 p-5 sm:p-6 bg-white rounded-xl border border-slate-200 shadow-sm"
            >
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                {painPoint.icon}
              </div>
              <p className="text-slate-700 font-medium text-sm sm:text-base">
                {painPoint.question}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
