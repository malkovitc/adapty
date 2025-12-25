'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const FunnelFox = memo(function FunnelFox() {
  return (
    <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 bg-white overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-gradient-to-r from-violet-50/50 to-transparent rounded-full blur-3xl -translate-y-1/2" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              Boost app revenue fast{' '}
              <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                with web funnels
              </span>
            </h2>

            <p className="text-lg sm:text-xl text-slate-600 mb-8 leading-relaxed">
              Build and launch web-to-app funnels, integrate payments, optimize with A/B testing and scale globally — all in one platform, no coding needed.
            </p>

            <Link
              href="https://funnelfox.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-lg font-semibold text-violet-600 hover:text-violet-700 transition-colors group"
            >
              Explore FunnelFox
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Right side - Product mockup image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <Image
              src="/images/funnelfox/funnelfox-feature.webp"
              alt="FunnelFox - web-to-app funnels platform"
              width={768}
              height={631}
              className="w-full h-auto"
              priority={false}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
});

export default FunnelFox;
