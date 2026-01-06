'use client';

import { motion } from 'framer-motion';
import { Check, X, Minus } from 'lucide-react';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';

interface Feature {
  name: string;
  adapty: string | boolean;
  diy: string | boolean;
  competitors: string | boolean;
  tooltip?: string;
}

const features: Feature[] = [
  {
    name: 'Setup time',
    adapty: '2-4 hours',
    diy: '2-6 months',
    competitors: '1-2 weeks',
  },
  {
    name: 'Code complexity',
    adapty: '5 SDK methods',
    diy: '1000s of lines',
    competitors: 'Moderate',
  },
  {
    name: 'Cross-platform support',
    adapty: true,
    diy: 'Manual',
    competitors: 'Limited',
  },
  {
    name: 'A/B testing built-in',
    adapty: true,
    diy: false,
    competitors: 'Partial',
  },
  {
    name: 'Analytics included',
    adapty: true,
    diy: false,
    competitors: true,
  },
  {
    name: 'Paywall builder',
    adapty: true,
    diy: false,
    competitors: 'Limited',
  },
  {
    name: 'Server-side validation',
    adapty: true,
    diy: 'DIY',
    competitors: true,
  },
  {
    name: 'Webhook support',
    adapty: true,
    diy: 'DIY',
    competitors: true,
  },
  {
    name: 'Price tracking',
    adapty: true,
    diy: false,
    competitors: 'Partial',
  },
  {
    name: 'Migration support',
    adapty: true,
    diy: false,
    competitors: 'Limited',
  },
];

function CellValue({ value }: { value: string | boolean }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-600">
        <Check className="w-4 h-4" strokeWidth={3} />
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-400">
        <X className="w-4 h-4" strokeWidth={2} />
      </span>
    );
  }
  if (value === 'Partial' || value === 'Limited' || value === 'Manual' || value === 'DIY' || value === 'Moderate') {
    return (
      <span className="inline-flex items-center gap-1.5 text-amber-600 font-medium">
        <Minus className="w-4 h-4" />
        {value}
      </span>
    );
  }
  return <span className="text-slate-700">{value}</span>;
}

function AdaptyCellValue({ value }: { value: string | boolean }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-violet-100 text-violet-600">
        <Check className="w-4 h-4" strokeWidth={3} />
      </span>
    );
  }
  return <span className="text-violet-700 font-semibold">{String(value)}</span>;
}

export default function ComparisonTable() {
  return (
    <Section size="lg" background="gray">
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Why developers choose Adapty
          </h2>
          <p className="text-lg text-slate-500 max-w-3xl mx-auto">
            Compare the development effort and features when building subscriptions with Adapty,
            building your own solution, or using alternatives.
          </p>
        </motion.div>

        {/* Desktop Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hidden md:block"
        >
          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-lg bg-white">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="sticky top-0 z-10 bg-slate-50 text-left text-sm font-semibold text-slate-600 px-6 py-4 border-b border-slate-200 w-[280px]">
                    Feature
                  </th>
                  <th className="sticky top-0 z-10 bg-violet-600 text-center text-sm font-semibold text-white px-6 py-4 border-b border-violet-700 min-w-[160px]">
                    <div className="flex flex-col items-center">
                      <span className="text-violet-200 text-xs uppercase tracking-wider mb-1">Recommended</span>
                      <span className="text-lg">Adapty</span>
                    </div>
                  </th>
                  <th className="sticky top-0 z-10 bg-slate-50 text-center text-sm font-semibold text-slate-600 px-6 py-4 border-b border-slate-200 min-w-[160px]">
                    <div className="flex flex-col items-center">
                      <span className="text-slate-400 text-xs uppercase tracking-wider mb-1">Build it yourself</span>
                      <span>DIY (Custom)</span>
                    </div>
                  </th>
                  <th className="sticky top-0 z-10 bg-slate-50 text-center text-sm font-semibold text-slate-600 px-6 py-4 border-b border-slate-200 min-w-[160px]">
                    <div className="flex flex-col items-center">
                      <span className="text-slate-400 text-xs uppercase tracking-wider mb-1">Other solutions</span>
                      <span>Competitors</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <tr
                    key={feature.name}
                    className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-slate-900 border-b border-slate-100">
                      {feature.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-center bg-violet-50/50 border-b border-violet-100">
                      <div className="flex items-center justify-center">
                        <AdaptyCellValue value={feature.adapty} />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-center border-b border-slate-100">
                      <div className="flex items-center justify-center">
                        <CellValue value={feature.diy} />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-center border-b border-slate-100">
                      <div className="flex items-center justify-center">
                        <CellValue value={feature.competitors} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Mobile Card Layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="md:hidden space-y-4"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
            >
              <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
                <h3 className="font-semibold text-slate-900">{feature.name}</h3>
              </div>
              <div className="divide-y divide-slate-100">
                <div className="flex items-center justify-between px-4 py-3 bg-violet-50">
                  <span className="text-sm font-medium text-violet-700">Adapty</span>
                  <AdaptyCellValue value={feature.adapty} />
                </div>
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm text-slate-600">DIY (Custom)</span>
                  <CellValue value={feature.diy} />
                </div>
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm text-slate-600">Competitors</span>
                  <CellValue value={feature.competitors} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-sm text-slate-500 mt-8"
        >
          Based on typical implementation experiences and feature availability as of 2024
        </motion.p>
      </Container>
    </Section>
  );
}
