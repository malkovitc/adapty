'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import {
  AccordionRoot,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui';
import { type FAQ, faqs as defaultFaqs } from '@/data/faqs';

interface FAQProps {
  faqs?: FAQ[];
}

export default function FAQ({ faqs = defaultFaqs }: FAQProps = {}) {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const faqItems = useMemo(
    () => faqs.map((faq, index) => ({ ...faq, value: `${index}-${faq.question}` })),
    [faqs]
  );

  return (
    <Section id="faq" size="lg" background="white" className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-purple-100/50 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-blue-100/50 to-transparent rounded-full blur-3xl" />
      </div>

      <Container size="full" className="relative">
        {/* Section Header */}
        <div className="text-center mb-[var(--spacing-lg)] md:mb-[calc(var(--spacing-lg)*2)]">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm font-[var(--font-medium)] uppercase tracking-wider text-[#6366F1] mb-[var(--spacing-md)]"
          >
            FAQ
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[var(--text-h2)] sm:text-3xl md:text-4xl lg:text-5xl font-[var(--font-bold)] text-[var(--text-primary)] mb-[var(--spacing-lg)]"
          >
            Frequently asked{' '}
            <span className="bg-gradient-to-r from-indigo-500 to-blue-600 bg-clip-text text-transparent">
              questions
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[var(--text-lg)] md:text-xl text-[var(--text-secondary)]"
            style={{ maxWidth: '48rem', margin: '0 auto' }}
          >
            Everything you need to know about Adapty. Can't find what you're looking for?{' '}
            <a href="mailto:support@adapty.io" className="text-[#6366F1] hover:text-[#4F46E5] font-[var(--font-medium)] transition-colors touch-manipulation inline-block min-h-[24px] py-1">
              Contact our team
            </a>
            .
          </motion.p>
        </div>

        <AccordionRoot
          type="single"
          collapsible
          value={activeItem ?? undefined}
          onValueChange={(value) => setActiveItem(value ?? null)}
          className="grid gap-[var(--spacing-md)] md:grid-cols-2"
        >
          {faqItems.map((faq) => (
            <AccordionItem
              key={faq.value}
              value={faq.value}
              className="group relative border-none"
            >
              <div
                className="absolute inset-0 rounded-xl bg-slate-200 transition-all duration-500 group-data-[state=open]:bg-gradient-to-r group-data-[state=open]:from-indigo-500 group-data-[state=open]:to-blue-500 group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:to-blue-500 group-hover:p-[2px] p-[1px]"
              >
                <div className="w-full h-full bg-white rounded-xl" />
              </div>

              <div className="relative bg-white rounded-xl">
                <AccordionTrigger
                  className="group flex w-full items-start justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left text-lg font-semibold text-slate-900 transition-all duration-300 touch-manipulation data-[state=open]:bg-clip-text data-[state=open]:text-transparent data-[state=open]:bg-gradient-to-r data-[state=open]:from-indigo-500 data-[state=open]:to-blue-600 hover:text-indigo-500 [&>svg:last-child]:hidden"
                >
                  <span>{faq.question}</span>
                  <div className="relative mt-1 flex-shrink-0">
                    <div className="flex items-center justify-center rounded-full border-2 border-slate-300 text-slate-500 transition-colors duration-300 group-data-[state=open]:hidden group-hover:border-indigo-500 group-hover:text-indigo-500 size-6">
                      <Plus className="w-4 h-4" />
                    </div>
                    <div className="hidden items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white group-data-[state=open]:flex size-6">
                      <Minus className="w-4 h-4" />
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-0">
                  <div className="h-px bg-gradient-to-r from-indigo-500 to-blue-500 mb-4" />
                  <p className="text-slate-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </div>
            </AccordionItem>
          ))}
        </AccordionRoot>
      </Container>
    </Section>
  );
}
