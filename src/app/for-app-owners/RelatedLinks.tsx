'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const relatedLinks = [
  {
    title: 'For marketers',
    description: 'Manage paywalls remotely, find profitability and maximize LTV.',
    href: '/for-marketers/',
  },
  {
    title: 'For developers',
    description: 'Focus on interesting development - your product. Delegate the boring infrastructure to us.',
    href: '/for-developers/',
  },
];

export default function RelatedLinks() {
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
            Learn more
          </h2>
        </motion.div>

        {/* Related Links Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {relatedLinks.map((link, index) => (
            <motion.div
              key={link.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={link.href}
                className="group flex items-center justify-between p-6 sm:p-8 bg-white rounded-2xl border border-slate-200 hover:border-violet-300 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300"
              >
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-2">
                    {link.title}
                  </h3>
                  <p className="text-slate-600">
                    {link.description}
                  </p>
                </div>
                <ArrowRight className="w-6 h-6 text-violet-600 flex-shrink-0 ml-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
