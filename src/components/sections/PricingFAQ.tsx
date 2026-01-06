'use client';

import { memo, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const pricingFaqs = [
  {
    question: 'How does the pricing work?',
    answer: 'Adapty uses a revenue-based pricing model. Our Free plan covers apps with up to $10K monthly revenue. For Pro plans, you pay a percentage of your monthly tracked revenue (1% for Pro, 1.2% for Pro+) with minimum monthly fees. This ensures you only pay more as you earn more.',
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes! All paid plans come with a 14-day free trial with full access to all features. Additionally, our Free plan is completely free forever for apps with up to $10K monthly revenue. No credit card required to get started.',
  },
  {
    question: 'Can I change plans later?',
    answer: 'Absolutely. You can upgrade or downgrade your plan at any time. When upgrading, you\'ll get immediate access to new features. When downgrading, the change takes effect at the start of your next billing cycle. There are no long-term contracts or cancellation fees.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, Mastercard, American Express, Discover) and can also process payments via wire transfer for Enterprise customers. All payments are processed securely through Stripe.',
  },
  {
    question: 'Do you offer custom enterprise pricing?',
    answer: 'Yes, our Enterprise plan offers custom pricing tailored to your specific needs. This includes volume discounts, custom SLAs, dedicated support, and flexible payment terms. Contact our sales team to discuss your requirements and get a custom quote.',
  },
  {
    question: 'What\'s included in the free plan?',
    answer: 'The Free plan includes everything you need to get started: up to $10K monthly revenue tracking, basic analytics, Paywall Builder, cross-platform SDK support (iOS, Android, React Native, Flutter, Unity), and email support. It\'s perfect for indie developers and small apps.',
  },
  {
    question: 'How is monthly revenue calculated?',
    answer: 'Monthly revenue is calculated based on the total subscription revenue tracked through Adapty\'s SDK. This includes new subscriptions, renewals, and one-time purchases. Refunds and chargebacks are automatically deducted from your tracked revenue.',
  },
  {
    question: 'What happens if I exceed my plan limits?',
    answer: 'If you exceed $10K monthly revenue on the Free plan, we\'ll notify you and help you upgrade to a paid plan. We won\'t cut off your service immediately - you\'ll have time to review your options and choose the best plan for your needs.',
  },
];

// Memoized FAQ Item Component
const FAQItem = memo(function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: typeof pricingFaqs[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay: (index % 4) * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative"
    >
      {/* Animated gradient border on hover */}
      <div className={`absolute inset-0 rounded-xl transition-all duration-500 ${
        isOpen
          ? 'bg-gradient-to-r from-indigo-500 to-blue-500 p-[2px]'
          : 'bg-slate-200 group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:to-blue-500 p-[1px] group-hover:p-[2px]'
      }`}>
        <div className="w-full h-full bg-white rounded-xl" />
      </div>

      <div className="relative bg-white rounded-xl">
        <motion.button
          onClick={onToggle}
          className="w-full px-5 sm:px-6 py-4 sm:py-5 min-h-[60px] flex items-start justify-between gap-4 text-left touch-manipulation"
          aria-expanded={isOpen}
          whileHover={{ x: 4 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          <span className={`font-semibold text-lg transition-colors duration-300 ${
            isOpen
              ? 'text-transparent bg-gradient-to-r from-indigo-500 to-blue-600 bg-clip-text'
              : 'text-slate-900 group-hover:text-indigo-500'
          }`}>
            {faq.question}
          </span>

          {/* Icon with morphing animation */}
          <div className="relative flex-shrink-0 mt-1">
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="minus"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-blue-600 flex items-center justify-center">
                    <Minus className="w-4 h-4 text-white" />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="plus"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="w-6 h-6 rounded-full border-2 border-slate-300 group-hover:border-indigo-500 flex items-center justify-center transition-colors duration-300">
                    <Plus className="w-4 h-4 text-slate-500 group-hover:text-indigo-500 transition-colors duration-300" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: 'auto',
                opacity: 1,
                transition: {
                  height: {
                    duration: 0.4,
                    ease: [0.16, 1, 0.3, 1],
                  },
                  opacity: {
                    duration: 0.3,
                    delay: 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  },
                },
              }}
              exit={{
                height: 0,
                opacity: 0,
                transition: {
                  height: {
                    duration: 0.3,
                    ease: [0.16, 1, 0.3, 1],
                  },
                  opacity: {
                    duration: 0.2,
                    ease: [0.16, 1, 0.3, 1],
                  },
                },
              }}
              className="overflow-hidden"
            >
              <motion.div
                initial={{ y: -10 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="px-6 pb-6 pt-0"
              >
                {/* Decorative line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="h-px bg-gradient-to-r from-indigo-500 to-blue-500 mb-4 origin-left"
                />
                <p className="text-slate-600 leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
});

export default function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = useCallback((index: number) => {
    setOpenIndex(prev => prev === index ? null : index);
  }, []);

  // Split FAQs into two columns
  const midPoint = Math.ceil(pricingFaqs.length / 2);
  const leftColumn = pricingFaqs.slice(0, midPoint);
  const rightColumn = pricingFaqs.slice(midPoint);

  return (
    <section id="pricing-faq" className="relative py-16 sm:py-20 md:py-24 bg-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-purple-100/50 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-blue-100/50 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm font-semibold uppercase tracking-wider text-[#6366F1] mb-4"
          >
            Pricing FAQ
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6"
          >
            Questions about{' '}
            <span className="bg-gradient-to-r from-indigo-500 to-blue-600 bg-clip-text text-transparent">
              pricing?
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg md:text-xl text-slate-600"
            style={{ maxWidth: '48rem', margin: '0 auto' }}
          >
            Everything you need to know about our pricing and billing.{' '}
            <a href="mailto:support@adapty.io" className="text-[#6366F1] hover:text-[#4F46E5] font-semibold transition-colors touch-manipulation inline-block min-h-[24px] py-1">
              Contact our team
            </a>{' '}
            for any other questions.
          </motion.p>
        </div>

        {/* FAQ Grid - Single column on mobile, two columns on desktop */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Left Column */}
          <div className="space-y-4">
            {leftColumn.map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                index={index}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
              />
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {rightColumn.map((faq, index) => {
              const actualIndex = index + midPoint;
              return (
                <FAQItem
                  key={actualIndex}
                  faq={faq}
                  index={actualIndex}
                  isOpen={openIndex === actualIndex}
                  onToggle={() => handleToggle(actualIndex)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
