'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const teamLinks = [
  {
    title: 'For developers',
    description: 'Integrate in-app purchases in minutes.',
    href: '/for-developers/',
  },
  {
    title: 'For marketers',
    description: 'Double subscription revenue with A/B testing paywalls and 3rd party integrations.',
    href: '/for-marketers/',
  },
];

export default function TeamLinks() {
  return (
    <section className="py-16 sm:py-20 bg-[#FAFAFA]">
      <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">
            We&apos;re here for your team
          </h2>
        </motion.div>

        {/* Team Links Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {teamLinks.map((link, index) => (
            <motion.div
              key={link.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={link.href}
                className="group block p-6 sm:p-8 bg-white rounded-2xl border border-slate-200 hover:border-violet-300 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300"
              >
                <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-3">
                  {link.title}
                </h3>
                <p className="text-slate-600 mb-4">
                  {link.description}
                </p>
                <span className="inline-flex items-center gap-2 text-violet-600 font-medium group-hover:gap-3 transition-all">
                  Read more
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
