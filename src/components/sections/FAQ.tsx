'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: 'How long does integration take?',
    answer: 'Most apps integrate Adapty SDK in under an hour. Our comprehensive documentation and quick-start guides make it easy to get up and running. You can have your first paywall live in production the same day. Plus, our support team is always available to help if you need it.',
  },
  {
    question: 'What platforms do you support?',
    answer: 'iOS, Android, React Native, Flutter, Unity, and Web. Our SDK provides a consistent API across all platforms, making it easy to implement subscriptions once and deploy everywhere. We support both native and cross-platform frameworks.',
  },
  {
    question: 'How does pricing work?',
    answer: 'We offer a free tier for indie developers. Paid plans start at $99/month and scale based on your monthly tracked revenue. All features are included in every plan - no feature gates. Volume discounts are available for high-growth apps.',
  },
  {
    question: 'Can I migrate from RevenueCat?',
    answer: 'Yes, we provide a seamless migration path from RevenueCat and other platforms. Our team will help you migrate your existing subscribers, historical data, and configurations. Most migrations complete in less than a week with zero downtime.',
  },
  {
    question: 'Do you support subscription analytics?',
    answer: 'Yes, we track 50+ metrics including MRR, ARR, churn, LTV, conversion rates, trial performance, and more. Our real-time dashboards give you instant insights into your subscription business. Export data to your own analytics tools via our API.',
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes, all features are available free up to $10K monthly revenue. This means you can use Adapty completely free while you\'re growing. No credit card required to get started. When you exceed the free tier, you\'ll be notified before any charges.',
  },
  {
    question: 'What payment processors do you support?',
    answer: 'App Store, Google Play, Stripe, and more. We handle receipt validation, server-side verification, and subscription status updates automatically. Support for additional payment processors like Paddle and PayPal is coming soon.',
  },
  {
    question: 'Do you offer technical support?',
    answer: 'Yes, all plans include email support with response times under 24 hours. Premium plans include dedicated Slack channels and priority support. We also have extensive documentation, video tutorials, and an active community forum.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Split FAQs into two columns
  const midPoint = Math.ceil(faqs.length / 2);
  const leftColumn = faqs.slice(0, midPoint);
  const rightColumn = faqs.slice(midPoint);

  return (
    <section className="relative py-16 sm:py-20 md:py-24 bg-white overflow-hidden">
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
            className="text-sm font-semibold uppercase tracking-wider text-[#7C3AED] mb-4"
          >
            FAQ
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6"
          >
            Frequently asked{' '}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              questions
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
            Everything you need to know about Adapty. Can't find what you're looking for?{' '}
            <a href="#" className="text-[#7C3AED] hover:text-[#6D28D9] font-semibold transition-colors touch-manipulation inline-block min-h-[24px] py-1">
              Contact our team
            </a>
            .
          </motion.p>
        </div>

        {/* FAQ Grid - Single column on mobile, two columns on desktop */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Left Column */}
          <div className="space-y-4">
            {leftColumn.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group relative"
                >
                  {/* Animated gradient border on hover */}
                  <div className={`absolute inset-0 rounded-xl transition-all duration-500 ${
                    isOpen
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 p-[2px]'
                      : 'bg-slate-200 group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-blue-500 p-[1px] group-hover:p-[2px]'
                  }`}>
                    <div className="w-full h-full bg-white rounded-xl" />
                  </div>

                  <div className="relative bg-white rounded-xl">
                    <motion.button
                      onClick={() => toggleQuestion(index)}
                      className="w-full px-5 sm:px-6 py-4 sm:py-5 min-h-[60px] flex items-start justify-between gap-4 text-left touch-manipulation"
                      aria-expanded={isOpen}
                      whileHover={{ x: 4 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    >
                      <span className={`font-semibold text-lg transition-colors duration-300 ${
                        isOpen
                          ? 'text-transparent bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text'
                          : 'text-slate-900 group-hover:text-purple-600'
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
                              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
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
                              <div className="w-6 h-6 rounded-full border-2 border-slate-300 group-hover:border-purple-500 flex items-center justify-center transition-colors duration-300">
                                <Plus className="w-4 h-4 text-slate-500 group-hover:text-purple-600 transition-colors duration-300" />
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
                              className="h-px bg-gradient-to-r from-purple-500 to-blue-500 mb-4 origin-left"
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
            })}
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {rightColumn.map((faq, index) => {
              const actualIndex = index + midPoint;
              const isOpen = openIndex === actualIndex;
              return (
                <motion.div
                  key={actualIndex}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group relative"
                >
                  {/* Animated gradient border on hover */}
                  <div className={`absolute inset-0 rounded-xl transition-all duration-500 ${
                    isOpen
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 p-[2px]'
                      : 'bg-slate-200 group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-blue-500 p-[1px] group-hover:p-[2px]'
                  }`}>
                    <div className="w-full h-full bg-white rounded-xl" />
                  </div>

                  <div className="relative bg-white rounded-xl">
                    <motion.button
                      onClick={() => toggleQuestion(actualIndex)}
                      className="w-full px-6 py-5 flex items-start justify-between gap-4 text-left"
                      aria-expanded={isOpen}
                      whileHover={{ x: 4 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    >
                      <span className={`font-semibold text-lg transition-colors duration-300 ${
                        isOpen
                          ? 'text-transparent bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text'
                          : 'text-slate-900 group-hover:text-purple-600'
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
                              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
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
                              <div className="w-6 h-6 rounded-full border-2 border-slate-300 group-hover:border-purple-500 flex items-center justify-center transition-colors duration-300">
                                <Plus className="w-4 h-4 text-slate-500 group-hover:text-purple-600 transition-colors duration-300" />
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
                              className="h-px bg-gradient-to-r from-purple-500 to-blue-500 mb-4 origin-left"
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
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
