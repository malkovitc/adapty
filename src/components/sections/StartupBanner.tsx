'use client';

import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';
import { Button } from '@/components/ui';
import Container from '@/components/ui/Container';

/**
 * Startup Discount Banner Component
 *
 * Horizontal banner promoting startup discount program.
 * Used on the Pricing page after the pricing cards section.
 */
export default function StartupBanner() {
  return (
    <section className="py-[var(--spacing-2xl)]">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-50 to-indigo-50 border border-violet-100"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-violet-200/30 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-indigo-200/30 rounded-full blur-3xl" />
          </div>

          <div className="relative px-6 py-6 sm:px-8 sm:py-8 lg:px-12">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
              {/* Left side: Icon and Text */}
              <div className="flex items-center gap-4 text-center sm:text-left">
                <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-200">
                  <Rocket className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)]">
                    Startup with less than $5K MTR?
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] mt-0.5 hidden sm:block">
                    Get special pricing for early-stage startups
                  </p>
                </div>
              </div>

              {/* Right side: CTA Button */}
              <Button
                variant="outline"
                href="https://adapty.io/startup-discount/"
                external
                className="flex-shrink-0 uppercase tracking-wider text-sm font-bold"
              >
                Apply for Discount
              </Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
