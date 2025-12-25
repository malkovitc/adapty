'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { getAssetPath } from '@/lib/utils';

const integrations = [
  { name: 'Stripe', icon: '/logos/icon-stripe-logo.svg', href: 'https://adapty.io/integrations/stripe/' },
  { name: 'Apple Ads', icon: '/logos/icon-apple-ads-text.svg', href: 'https://adapty.io/integrations/apple-search-ads/' },
  { name: 'PostHog', icon: '/logos/posthog-logo-colorfull.svg', href: 'https://adapty.io/integrations/posthog/' },
  { name: 'Branch', icon: '/logos/logo-branch.svg', href: 'https://adapty.io/integrations/branch/' },
  { name: 'Braze', icon: '/logos/logo-braze.svg', href: 'https://adapty.io/integrations/braze/' },
  { name: 'Amazon S3', icon: '/logos/logo-amazon-s3.svg', href: 'https://adapty.io/integrations/amazon-s3/' },
  { name: 'Firebase', icon: '/logos/logo-firebase-and-ga.svg', href: 'https://adapty.io/integrations/google-analytics-firebase/' },
  { name: 'Mixpanel', icon: '/logos/logo-mixpanel.svg', href: 'https://adapty.io/integrations/mixpanel/' },
  { name: 'Airbridge', icon: '/logos/logo-airbridge.svg', href: 'https://adapty.io/integrations/airbridge/' },
  { name: 'Facebook', icon: '/logos/logo-facebook-blue-text.svg', href: 'https://adapty.io/integrations/facebook-ads/' },
  { name: 'AppsFlyer', icon: '/logos/logo-appsflyer.svg', href: 'https://adapty.io/integrations/appsflyer/' },
  { name: 'Adjust', icon: '/logos/logo-adjust.svg', href: 'https://adapty.io/integrations/adjust/' },
];

// Memoized Integration Card Component
const IntegrationCard = memo(function IntegrationCard({
  integration,
  index,
}: {
  integration: typeof integrations[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link
        href={integration.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col items-center justify-center p-6 sm:p-8 bg-white rounded-2xl border border-neutral-200 hover:shadow-xl hover:border-violet-300 hover:-translate-y-1 transition-all duration-300 cursor-pointer touch-manipulation min-h-[120px] sm:min-h-[140px]"
      >
        <div className="h-12 sm:h-14 flex items-center justify-center w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={getAssetPath(integration.icon)}
            alt={integration.name}
            className="object-contain max-h-12 sm:max-h-14 max-w-[140px] sm:max-w-[160px] w-auto"
          />
        </div>
      </Link>
    </motion.div>
  );
});

export default function Integrations() {
  return (
    <section id="integrations" className="relative py-12 sm:py-16 md:py-20 bg-[#FAFAFA] overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4"
          >
            Integrations
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4"
          >
            Sync purchase data with other services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg text-slate-600"
            style={{ maxWidth: '42rem', margin: '0 auto' }}
          >
            Forward subscription events to analytics and attribution services without coding.
          </motion.p>
        </div>

        {/* Logo Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6"
        >
          {integrations.map((integration, index) => (
            <IntegrationCard key={integration.name} integration={integration} index={index} />
          ))}
        </motion.div>

        {/* See all integrations link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-10"
        >
          <Link
            href="https://adapty.io/integrations/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 font-semibold transition-colors group min-h-[44px] py-2 touch-manipulation"
          >
            Explore integrations
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
