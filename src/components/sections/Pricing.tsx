'use client';

import { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';
import { GlowCard } from '@/components/ui/GlowCard';

const pricingTiers = [
  {
    name: 'Free',
    description: 'Free plan for apps with revenue up to $10K/month',
    monthlyPrice: 0,
    yearlyPrice: 0,
    priceDisplay: '$0',
    priceSubtext: 'per month',
    features: [
      'Up to $10K monthly revenue',
      'Basic analytics',
      'Paywall Builder',
      'Cross-platform SDK',
      'Email support',
    ],
    cta: 'Start for free',
    highlighted: false,
  },
  {
    name: 'Pro',
    description: '1% of monthly revenue, minimum $99/month',
    monthlyPrice: 99,
    yearlyPrice: 99,
    priceDisplay: '1%',
    priceSubtext: 'of monthly revenue',
    priceNote: 'minimum $99/month',
    features: [
      'Everything in Free',
      'Unlimited revenue',
      'A/B testing',
      'Advanced analytics',
      'Unlimited paywalls',
      'Priority support',
      'Webhooks & integrations',
    ],
    cta: 'Start free trial',
    highlighted: true,
    badge: 'Most Popular',
  },
  {
    name: 'Pro+',
    description: '1.2% of monthly revenue, minimum $499/month',
    monthlyPrice: 499,
    yearlyPrice: 499,
    priceDisplay: '1.2%',
    priceSubtext: 'of monthly revenue',
    priceNote: 'minimum $499/month',
    features: [
      'Everything in Pro',
      'Revenue optimization',
      'Custom integrations',
      'Advanced support',
      'Dedicated CSM',
      'Custom onboarding',
      'Priority features',
    ],
    cta: 'Start free trial',
    highlighted: false,
  },
  {
    name: 'Enterprise',
    description: 'Custom pricing for enterprise needs',
    monthlyPrice: null,
    yearlyPrice: null,
    customPrice: 'Custom',
    features: [
      'Everything in Pro+',
      'Unlimited revenue',
      'Dedicated support',
      'SLA guarantee',
      'Custom contracts',
      'Dedicated account manager',
      'Custom onboarding',
    ],
    cta: 'Contact sales',
    highlighted: false,
  },
];

// Memoized Pricing Card Component
const PricingCard = memo(function PricingCard({
  tier,
  index,
  isYearly,
}: {
  tier: typeof pricingTiers[0];
  index: number;
  isYearly: boolean;
}) {
  return (
    <motion.div
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
      {/* Hover glow effect - only for non-highlighted tiers */}
      {!tier.highlighted && (
        <div className="absolute inset-0 rounded-2xl transition-all duration-500 bg-gradient-to-r from-indigo-500/0 to-blue-500/0 blur-xl group-hover:blur-2xl group-hover:from-indigo-500/10 group-hover:to-blue-500/10 opacity-0 group-hover:opacity-100" />
      )}

      {tier.highlighted ? (
        <GlowCard glowColor="rgba(99, 102, 241, 0.9)">
          <motion.div
            whileHover={{ y: -8 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 20,
            }}
            className="relative p-6 sm:p-8 bg-white rounded-[11px] transition-all duration-500 touch-manipulation h-full flex flex-col"
          >
            <PricingCardContent tier={tier} isYearly={isYearly} />

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
        </GlowCard>
      ) : (
        <motion.div
          whileHover={{ y: -8 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 20,
          }}
          className="relative p-6 sm:p-8 bg-white rounded-2xl transition-all duration-500 touch-manipulation h-full flex flex-col border border-slate-200 shadow-lg group-hover:shadow-2xl group-hover:border-purple-200"
        >
          <PricingCardContent tier={tier} isYearly={isYearly} />

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
      )}
    </motion.div>
  );
});

// Shared card content to avoid duplication
const PricingCardContent = memo(function PricingCardContent({
  tier,
  isYearly: _isYearly,
}: {
  tier: typeof pricingTiers[0];
  isYearly: boolean;
}) {
  return (
    <>
      {/* Badge for highlighted tier */}
      {tier.highlighted && tier.badge && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute -top-4 left-1/2 -translate-x-1/2"
        >
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-full text-xs font-bold shadow-lg">
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
      <div className="mb-8">
        {tier.customPrice ? (
          <div className="text-4xl font-bold text-slate-900">
            {tier.customPrice}
          </div>
        ) : tier.priceDisplay ? (
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                {tier.priceDisplay}
              </span>
              {tier.priceSubtext && (
                <span className="text-slate-600 font-medium">{tier.priceSubtext}</span>
              )}
            </div>
            {tier.priceNote && (
              <p className="text-sm text-slate-500 mt-2">
                {tier.priceNote}
              </p>
            )}
          </div>
        ) : (
          <div className="flex items-baseline gap-1">
            <span className="text-5xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              ${tier.monthlyPrice}
            </span>
            <span className="text-slate-600 font-medium">/month</span>
          </div>
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
                    ? 'text-indigo-500'
                    : 'text-green-600'
                }`}
              />
              <span className="text-slate-700">{feature}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </>
  );
});

export default function Pricing() {
  const [isYearly] = useState(false);

  return (
    <section id="pricing" className="relative py-16 sm:py-20 md:py-24 bg-[#FAFAFA] overflow-hidden">
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
            className="text-sm font-semibold uppercase tracking-wider text-[#6366F1] mb-6"
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
            <span className="bg-gradient-to-r from-indigo-500 to-blue-600 bg-clip-text text-transparent">
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

        </div>

        {/* Pricing Cards */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-7xl mx-auto mb-16 items-stretch">
          {pricingTiers.map((tier, index) => (
            <PricingCard key={tier.name} tier={tier} index={index} isYearly={isYearly} />
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
                      <td className="py-4 px-4 text-slate-700">Monthly revenue limit</td>
                      <td className="py-4 px-4 text-center text-slate-700">Up to $10K</td>
                      <td className="py-4 px-4 text-center text-slate-700">Unlimited</td>
                      <td className="py-4 px-4 text-center text-slate-700">Unlimited</td>
                      <td className="py-4 px-4 text-center text-slate-700">Unlimited</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 text-slate-700">Paywall Builder</td>
                      <td className="py-4 px-4 text-center">
                        <Check className="w-5 h-5 text-indigo-500 mx-auto" />
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Check className="w-5 h-5 text-indigo-500 mx-auto" />
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Check className="w-5 h-5 text-indigo-500 mx-auto" />
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Check className="w-5 h-5 text-indigo-500 mx-auto" />
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 text-slate-700">A/B Testing</td>
                      <td className="py-4 px-4 text-center">
                        <span className="text-slate-400">-</span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Check className="w-5 h-5 text-indigo-500 mx-auto" />
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Check className="w-5 h-5 text-indigo-500 mx-auto" />
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Check className="w-5 h-5 text-indigo-500 mx-auto" />
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 text-slate-700">Analytics</td>
                      <td className="py-4 px-4 text-center text-slate-700">Basic</td>
                      <td className="py-4 px-4 text-center text-slate-700">Advanced</td>
                      <td className="py-4 px-4 text-center text-slate-700">Advanced</td>
                      <td className="py-4 px-4 text-center text-slate-700">Advanced</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 text-slate-700">Support</td>
                      <td className="py-4 px-4 text-center text-slate-700">Email</td>
                      <td className="py-4 px-4 text-center text-slate-700">Priority</td>
                      <td className="py-4 px-4 text-center text-slate-700">Advanced</td>
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
                        <span className="text-slate-400">-</span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Check className="w-5 h-5 text-indigo-500 mx-auto" />
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
