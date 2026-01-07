'use client';

import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import type { ReactNode } from 'react';

export interface FeatureChecklistItem {
  icon?: ReactNode;
  title: string;
  description: string;
}

export interface FeatureChecklistProps {
  title?: string;
  description?: string;
  features: FeatureChecklistItem[];
  columns?: 1 | 2 | 3;
  background?: 'white' | 'gray';
}

export default function FeatureChecklist({
  title = 'Feature highlights',
  description,
  features,
  columns = 3,
  background = 'gray',
}: FeatureChecklistProps) {
  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  };

  return (
    <Section size="lg" background={background}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">{title}</h2>
          {description && <p className="text-lg text-slate-500 max-w-3xl mx-auto">{description}</p>}
        </motion.div>

        <div className={`grid ${columnClasses[columns]} gap-6`}>
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group p-6 bg-white rounded-2xl border border-slate-200 hover:border-violet-300 shadow-sm hover:shadow-lg transition-all"
            >
              {feature.icon && (
                <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-xl bg-gradient-to-br from-violet-50 to-pink-50 text-violet-600 group-hover:from-violet-100 group-hover:to-pink-100 transition-colors">
                  {feature.icon}
                </div>
              )}
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
