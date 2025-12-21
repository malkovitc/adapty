'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Check, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';

const pricingTiers = [
  {
    name: 'Free',
    description: 'For indie developers',
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      'Up to $10K MTR',
      'Basic analytics',
      '1 paywall',
      'Email support',
      'iOS & Android SDKs',
    ],
    cta: 'Start for free',
    highlighted: false,
  },
  {
    name: 'Pro',
    description: 'For growing apps',
    monthlyPrice: 99,
    yearlyPrice: 79,
    features: [
      'Up to $100K MTR',
      'Advanced analytics',
      'Unlimited paywalls',
      'A/B testing',
      'Priority support',
      'Custom integrations',
      'Webhooks',
      'Revenue optimization',
    ],
    cta: 'Start free trial',
    highlighted: true,
    badge: 'Most Popular',
  },
  {
    name: 'Enterprise',
    description: 'For large apps',
    monthlyPrice: null,
    yearlyPrice: null,
    customPrice: 'Custom',
    features: [
      'Unlimited MTR',
      'Dedicated support',
      'Custom integrations',
      'SLA guarantee',
      'Custom contracts',
      'Advanced security',
      'Dedicated account manager',
      'Custom onboarding',
    ],
    cta: 'Contact sales',
    highlighted: false,
  },
];

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="relative py-16 sm:py-20 md:py-24 bg-[#F5F5F7] overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-purple-100/60 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-blue-100/60 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm font-semibold uppercase tracking-wider text-[#7C3AED] mb-6"
          >
            Pricing
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight"
          >
            Simple, transparent{' '}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              pricing
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg md:text-xl text-slate-500 mb-12"
            style={{ maxWidth: '48rem', margin: '0 auto 48px auto' }}
          >
            Start for free and scale as you grow. All plans include 14-day free trial.
          </motion.p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center p-1.5 bg-slate-100 rounded-full mb-20">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-8 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 touch-manipulation ${
                !isYearly
                  ? 'bg-[#7C3AED] text-white shadow-[0_4px_14px_rgba(124,58,237,0.4)]'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-8 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 flex items-center gap-3 touch-manipulation ${
                isYearly
                  ? 'bg-[#7C3AED] text-white shadow-[0_4px_14px_rgba(124,58,237,0.4)]'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Yearly
              <span className="px-2.5 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full whitespace-nowrap">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto mb-16 items-stretch">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`relative group cursor-pointer ${tier.highlighted ? 'md:-mt-4 md:pb-4' : ''}`}
            >
              {/* Hover glow effect */}
              <div className={`absolute inset-0 rounded-2xl transition-all duration-500 ${
                tier.highlighted
                  ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-xl group-hover:blur-2xl opacity-50 group-hover:opacity-100'
                  : 'bg-gradient-to-r from-purple-500/0 to-blue-500/0 blur-xl group-hover:blur-2xl group-hover:from-purple-500/10 group-hover:to-blue-500/10 opacity-0 group-hover:opacity-100'
              }`} />

              <motion.div
                whileHover={{ y: -8 }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                }}
                className={`relative p-6 sm:p-8 bg-white rounded-2xl transition-all duration-500 touch-manipulation h-full flex flex-col ${
                  tier.highlighted
                    ? 'border-2 border-purple-500 shadow-2xl shadow-purple-500/20 group-hover:shadow-purple-500/40 group-hover:border-purple-600'
                    : 'border border-slate-200 shadow-lg group-hover:shadow-2xl group-hover:border-purple-200'
                }`}
              >
              {/* Badge for highlighted tier */}
              {tier.highlighted && tier.badge && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="absolute -top-4 left-1/2 -translate-x-1/2"
                >
                  <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full text-xs font-bold shadow-lg">
                    <Sparkles className="w-3.5 h-3.5" />
                    {tier.badge}
                  </div>
                </motion.div>
              )}

              {/* Tier Name */}
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                {tier.name}
              </h3>

              {/* Description */}
              <p className="text-slate-600 mb-6">{tier.description}</p>

              {/* Price */}
              <div className="mb-8 overflow-hidden">
                {tier.customPrice ? (
                  <div className="text-4xl font-bold text-slate-900">
                    {tier.customPrice}
                  </div>
                ) : (
                  <div className="relative h-16">
                    <motion.div
                      key={isYearly ? 'yearly' : 'monthly'}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 25,
                      }}
                      className="absolute inset-0 flex items-baseline gap-1"
                    >
                      <span className="text-5xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                        ${isYearly ? tier.yearlyPrice : tier.monthlyPrice}
                      </span>
                      <span className="text-slate-600 font-medium">/month</span>
                    </motion.div>
                  </div>
                )}
                {!tier.customPrice && isYearly && tier.monthlyPrice && tier.monthlyPrice > 0 && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-sm text-slate-500 mt-2"
                  >
                    Billed annually (${tier.yearlyPrice * 12}/year)
                  </motion.p>
                )}
              </div>

              {/* CTA Button */}
              <Button
                variant={tier.highlighted ? 'primary' : 'secondary'}
                fullWidth
                className="mb-8"
              >
                {tier.cta}
              </Button>

              {/* Features List */}
              <div className="space-y-4 flex-grow">
                <p className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
                  Features
                </p>
                <ul className="space-y-3">
                  {tier.features.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * featureIndex }}
                      className="flex items-start gap-3"
                    >
                      <Check
                        className={`w-5 h-5 shrink-0 mt-0.5 ${
                          tier.highlighted
                            ? 'text-purple-600'
                            : 'text-green-600'
                        }`}
                      />
                      <span className="text-slate-700">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

                {/* Shine effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 overflow-hidden rounded-2xl">
                  <motion.div
                    className="absolute -inset-full"
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  >
                    <div className="w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Feature Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
            <div className="p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">
                Compare plans
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-4 px-4 font-semibold text-slate-900">
                        Feature
                      </th>
                      {pricingTiers.map((tier) => (
                        <th
                          key={tier.name}
                          className="text-center py-4 px-4 font-semibold text-slate-900"
                        >
                          {tier.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="py-4 px-4 text-slate-700">Monthly tracked revenue</td>
                      <td className="py-4 px-4 text-center text-slate-700">Up to $10K</td>
                      <td className="py-4 px-4 text-center text-slate-700">Up to $100K</td>
                      <td className="py-4 px-4 text-center text-slate-700">Unlimited</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 text-slate-700">Paywalls</td>
                      <td className="py-4 px-4 text-center text-slate-700">1</td>
                      <td className="py-4 px-4 text-center text-slate-700">Unlimited</td>
                      <td className="py-4 px-4 text-center text-slate-700">Unlimited</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 text-slate-700">A/B Testing</td>
                      <td className="py-4 px-4 text-center">
                        <span className="text-slate-400">-</span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Check className="w-5 h-5 text-purple-600 mx-auto" />
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Check className="w-5 h-5 text-purple-600 mx-auto" />
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 text-slate-700">Analytics</td>
                      <td className="py-4 px-4 text-center text-slate-700">Basic</td>
                      <td className="py-4 px-4 text-center text-slate-700">Advanced</td>
                      <td className="py-4 px-4 text-center text-slate-700">Advanced</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 text-slate-700">Support</td>
                      <td className="py-4 px-4 text-center text-slate-700">Email</td>
                      <td className="py-4 px-4 text-center text-slate-700">Priority</td>
                      <td className="py-4 px-4 text-center text-slate-700">Dedicated</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 text-slate-700">SLA</td>
                      <td className="py-4 px-4 text-center">
                        <span className="text-slate-400">-</span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="text-slate-400">-</span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Check className="w-5 h-5 text-purple-600 mx-auto" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-slate-600 mb-4">
            Not sure which plan is right for you?
          </p>
          <Button variant="ghost" size="lg">
            Talk to our team
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
