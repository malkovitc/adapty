'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Code2, Building2 } from 'lucide-react';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';

const links = [
  {
    title: 'For developers',
    description: 'Quick SDK integration, cross-platform support, and developer-friendly APIs',
    href: '/for-developers',
    icon: Code2,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'For app owners',
    description: 'Revenue analytics, LTV predictions, and business insights',
    href: '/for-app-owners',
    icon: Building2,
    gradient: 'from-violet-500 to-purple-500',
  },
];

export default function TeamLinks() {
  return (
    <Section size="lg" background="white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            We&apos;re here for your team
          </h2>
          <p className="text-lg text-slate-500">
            Explore how Adapty helps different roles in your organization.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {links.map((link, index) => (
            <motion.div
              key={link.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link
                href={link.href}
                className="group block p-6 bg-slate-50 hover:bg-white rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${link.gradient} flex items-center justify-center mb-4`}>
                  <link.icon className="w-6 h-6 text-white" />
                </div>
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
