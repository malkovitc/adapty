'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';

const relatedLinks = [
  {
    title: 'For app owners',
    description: 'Revenue analytics, LTV predictions, and business insights',
    href: '/for-app-owners',
  },
  {
    title: 'For developers',
    description: 'Quick SDK integration, cross-platform support, and developer-friendly APIs',
    href: '/for-developers',
  },
];

export default function RelatedLinks() {
  return (
    <Section size="lg" background="gray">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Learn more
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {relatedLinks.map((link, index) => (
            <motion.div
              key={link.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link
                href={link.href}
                className="group block p-6 bg-white hover:bg-slate-50 rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-violet-600 transition-colors">
                  {link.title}
                </h3>
                <p className="text-slate-500 mb-4">{link.description}</p>
                <span className="inline-flex items-center gap-2 text-violet-600 font-medium">
                  Learn more
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
