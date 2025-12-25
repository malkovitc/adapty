'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const roles = [
  {
    image: '/images/role-cards/img-card-cover-sdk-install@2x.webp',
    title: 'For developers',
    features: ['Subscriptions SDK', 'Refund Saver', 'Remote config', 'Fallback paywalls'],
    href: 'https://adapty.io/for-developers/',
  },
  {
    image: '/images/role-cards/img-card-cover-charts@2x.webp',
    title: 'For app owners',
    features: ['Revenue analytics', 'LTV analytics', 'AI LTV and revenue predictions'],
    href: 'https://adapty.io/for-app-owners/',
  },
  {
    image: '/images/role-cards/img-card-cover-paywalls@2x.webp',
    title: 'For marketers',
    features: ['A/B testing', 'No-code Builder', 'Localizations', 'Targeting'],
    href: 'https://adapty.io/for-marketers/',
  },
];

export default function RoleCards() {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
            Help your team run the mobile subscription business.
            <br />
            <span className="text-slate-900">
              Faster and cheaper.
            </span>
          </h2>
        </motion.div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {roles.map((role, index) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={role.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full rounded-2xl bg-[#F8F9FA] p-6 border border-slate-200 hover:shadow-xl hover:border-slate-300 transition-all duration-300"
              >
                {/* Card Image */}
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-6 bg-white">
                  <Image
                    src={role.image}
                    alt={role.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Title with arrow */}
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-xl font-semibold text-slate-900">{role.title}</h3>
                  <ArrowRight className="w-5 h-5 text-pink-500 group-hover:translate-x-1 transition-transform" />
                </div>

                {/* Features as pills/tags */}
                <div className="flex flex-wrap gap-2">
                  {role.features.map((feature) => (
                    <span
                      key={feature}
                      className="inline-block px-3 py-1.5 text-sm text-slate-600 bg-white rounded-full border border-slate-200"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
