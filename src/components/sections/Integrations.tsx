'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const basePath = process.env.NODE_ENV === 'production' ? '/adapty' : '';

const integrations = [
  { name: 'Stripe', logo: `${basePath}/logos/stripe.svg` },
  { name: 'Apple', logo: `${basePath}/logos/apple.svg` },
  { name: 'Google Play', logo: `${basePath}/logos/google-play.svg` },
  { name: 'Firebase', logo: `${basePath}/logos/firebase.svg` },
  { name: 'Mixpanel', logo: `${basePath}/logos/mixpanel.svg` },
  { name: 'Amplitude', logo: `${basePath}/logos/amplitude.svg` },
  { name: 'Branch', logo: `${basePath}/logos/branch.svg` },
  { name: 'AppsFlyer', logo: `${basePath}/logos/appsflyer.svg` },
  { name: 'Braze', logo: `${basePath}/logos/braze.svg` },
  { name: 'Adjust', logo: `${basePath}/logos/adjust.svg` },
  { name: 'Slack', logo: `${basePath}/logos/slack.svg` },
  { name: 'Segment', logo: `${basePath}/logos/segment.svg` },
];

export default function Integrations() {
  return (
    <section className="relative py-12 sm:py-16 md:py-20 bg-[#F5F5F7] overflow-hidden">
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
            Works with your favorite tools
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg text-slate-600"
            style={{ maxWidth: '42rem', margin: '0 auto' }}
          >
            Connect Adapty with the tools you already use for analytics, attribution, and marketing
          </motion.p>
        </div>

        {/* Logo Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 md:gap-8"
        >
          {integrations.map((integration, index) => (
            <motion.div
              key={integration.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ scale: 1.05, y: -4 }}
              className="flex flex-col items-center justify-center gap-2 p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:border-slate-200 transition-all duration-300 cursor-pointer group touch-manipulation min-h-[80px] sm:min-h-[100px]"
            >
              <div className="w-10 h-10 flex items-center justify-center">
                <Image
                  src={integration.logo}
                  alt={integration.name}
                  width={40}
                  height={40}
                  className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <span className="text-xs font-medium text-slate-500 group-hover:text-slate-900 transition-colors">
                {integration.name}
              </span>
            </motion.div>
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
          <a
            href="#"
            className="inline-flex items-center gap-2 text-[#7C3AED] hover:text-[#6D28D9] font-semibold transition-colors group min-h-[44px] py-2 touch-manipulation"
          >
            See all 30+ integrations
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
