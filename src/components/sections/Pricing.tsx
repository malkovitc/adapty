'use client';

import { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';
import { GlowCard } from '@/components/ui/GlowCard';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';

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
            className="relative p-6 sm:p-8 bg-[var(--bg-primary)] rounded-[11px] transition-all duration-500 touch-manipulation h-full flex flex-col"
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
          className="relative p-6 sm:p-8 bg-[var(--bg-primary)] rounded-2xl transition-all duration-500 touch-manipulation h-full flex flex-col border border-[var(--border-default)] shadow-lg group-hover:shadow-2xl group-hover:border-purple-200"
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
      <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
        {tier.name}
      </h3>

      {/* Description */}
      <p className="text-[var(--text-secondary)] mb-6">{tier.description}</p>

      {/* Price */}
      <div className="mb-8">
        {tier.customPrice ? (
          <div className="text-4xl font-bold text-[var(--text-primary)]">
            {tier.customPrice}
          </div>
        ) : tier.priceDisplay ? (
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold bg-gradient-to-r from-[var(--text-primary)] to-[var(--text-secondary)] bg-clip-text text-transparent">
                {tier.priceDisplay}
              </span>
              {tier.priceSubtext && (
                <span className="text-[var(--text-secondary)] font-medium">{tier.priceSubtext}</span>
              )}
            </div>
            {tier.priceNote && (
              <p className="text-sm text-[var(--text-tertiary)] mt-2">
                {tier.priceNote}
              </p>
            )}
          </div>
        ) : (
          <div className="flex items-baseline gap-1">
            <span className="text-5xl font-bold bg-gradient-to-r from-[var(--text-primary)] to-[var(--text-secondary)] bg-clip-text text-transparent">
              ${tier.monthlyPrice}
            </span>
            <span className="text-[var(--text-secondary)] font-medium">/month</span>
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
      <div className="space-y-[var(--spacing-md)] flex-grow">
        <p className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider">
          Features
        </p>
        <ul className="space-y-[var(--spacing-sm)]">
          {tier.features.map((feature, featureIndex) => (
            <motion.li
              key={featureIndex}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * featureIndex }}
              className="flex items-start gap-[var(--spacing-sm)]"
            >
              <Check
                className={`w-5 h-5 shrink-0 mt-0.5 ${
                  tier.highlighted
                    ? 'text-indigo-500'
                    : 'text-green-600'
                }`}
              />
              <span className="text-[var(--text-secondary)]">{feature}</span>
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
    <Section id="pricing" background="gray" className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-purple-100/60 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-blue-100/60 to-transparent rounded-full blur-3xl" />
      </div>

      <Container className="relative">
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
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-[var(--spacing-lg)] leading-tight"
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
            className="text-base sm:text-lg md:text-xl text-[var(--text-tertiary)] mb-[var(--spacing-2xl)]"
            style={{ maxWidth: '48rem', margin: '0 auto var(--spacing-2xl) auto' }}
          >
            Start for free and scale as you grow. All plans include 14-day free trial.
          </motion.p>

        </div>

        {/* Pricing Cards */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[var(--spacing-lg)] sm:gap-[var(--spacing-2xl)] max-w-7xl mx-auto mb-[var(--spacing-3xl)] items-stretch">
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
          <div className="bg-[var(--bg-primary)] rounded-2xl border border-[var(--border-default)] shadow-lg overflow-hidden">
            <div className="p-[var(--spacing-2xl)]">
              <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-[var(--spacing-lg)] text-center">
                Compare plans
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[var(--border-default)]">
                      <th className="text-left py-[var(--spacing-md)] px-[var(--spacing-md)] font-semibold text-[var(--text-primary)]">
                        Feature
                      </th>
                      {pricingTiers.map((tier) => (
                        <th
                          key={tier.name}
                          className="text-center py-[var(--spacing-md)] px-[var(--spacing-md)] font-semibold text-[var(--text-primary)]"
                        >
                          {tier.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--bg-muted)]">
                    <tr>
                      <td className="py-[var(--spacing-md)] px-[var(--spacing-md)] text-[var(--text-secondary)]">Monthly revenue limit</td>
                      <td className="py-[var(--spacing-md)] px-[var(--spacing-md)] text-center text-[var(--text-secondary)]">Up to $10K</td>
                      <td className="py-[var(--spacing-md)] px-[var(--spacing-md)] text-center text-[var(--text-secondary)]">Unlimited</td>
                      <td className="py-[var(--spacing-md)] px-[var(--spacing-md)] text-center text-[var(--text-secondary)]">Unlimited</td>
                      <td className="py-[var(--spacing-md)] px-[var(--spacing-md)] text-center text-[var(--text-secondary)]">Unlimited</td>
                    </tr>
                    <tr>
                      <td className="py-[var(--spacing-md)] px-[var(--spacing-md)] text-[var(--text-secondary)]">Paywall Builder</td>
                      <td className="py-[var(--spacing-md)] px-[var(--spacing-md)] text-center">
                        <Check className="w-5 h-5 text-indigo-500 mx-auto" />
                      </td>
                      <td className="py-[var(--spacing-md)] px-[var(--spacing-md)] text-center">
                        <Check className="w-5 h-5 text-indigo-500 mx-auto" />
                      </td>
                      <td className="py-[var(--spacing-md)] px-[var(--spacing-md)] text-center">
                        <Check className="w-5 h-5 text-indigo-500 mx-auto" />
                      </td>
                      <td className="py-[var(--spacing-md)] px-[var(--spacing-md)] text-center">
                        <Check className="w-5 h-5 text-indigo-500 mx-auto" />
                      </td>
                    </tr>
                    <tr>
                      <td className="py-[var(--spacing-md)] px-[var(--spacing-md)] text-[var(--text-secondary)]">A/B Testing</td>
                      <td className="py-[var(--spacing-md)] px-[var(--spacing-md)] text-center">
                        <span className="text-[var(--text-tertiary)]">-</span>
                      </td>
                      <td className="py-[var(--spacing-md)] px-[var(--spacing-md)] text-center">
                        <Check className="w-5 h-5 text-indigo-500 mx-auto" />
                      </td>
                      <td className="py-[var(--spacing-md)] px-[var(--spacing-md)] text-center">
                        <Check className="w-5 h-5 text-indigo-500 mx-auto" />
                      </td>
                      <td className="py-[var(--spacing-md)] px-[var(--spacing-md)] text-center">
                        <Check className="w-5 h-5 text-indigo-500 mx-auto" />
                      </td>
                    </tr>
                    <tr>
                      <td className="py-[var(--spacing-md)] px-[var(--spacing-md)] text-[var(--text-secondary)]">Analytics</td>
                      <td className="py-[var(--spacing-md)] px-[var(--spacing-md)] text-center text-[var(--text-secondary)]">Basic</td>
                      <td className="py-[var(--spacing-md)] px-[var(--spacing-md)] text-center text-[var(--text-secondary)]">Advanced</td>
                      <td className="py-[var(--spacing-md)] px-[var(--spacing-md)] text-center text-[var(--text-secondary)]">Advanced</td>
                      <td className="py-[var(--spacing-md)] px-[var(--spacing-md)] text-center text-[var(--text-secondary)]">Advanced</td>
                    </tr>
                    <tr>
                      <td className="py-[var(--spacing-md)] px-[var(--spacing-md)] text-[var(--text-secondary)]">Support</td>
                      <td className="py-[var(--spacing-md)] px-[var(--spacing-md)] text-center text-[var(--text-secondary)]">Email</td>
                      <td className="py-[var(--spacing-md)] px-[var(--spacing-md)] text-center text-[var(--text-secondary)]">Priority</td>
                      <td className="py-[var(--spacing-md)] px-[var(--spacing-md)] text-center text-[var(--text-secondary)]">Advanced</td>
                      <td className="py-[var(--spacing-md)] px-[var(--spacing-md)] text-center text-[var(--text-secondary)]">Dedicated</td>
                    </tr>
                    <tr>
                      <td className="py-[var(--spacing-md)] px-[var(--spacing-md)] text-[var(--text-secondary)]">SLA</td>
                      <td className="py-[var(--spacing-md)] px-[var(--spacing-md)] text-center">
                        <span className="text-[var(--text-tertiary)]">-</span>
                      </td>
                      <td className="py-[var(--spacing-md)] px-[var(--spacing-md)] text-center">
                        <span className="text-[var(--text-tertiary)]">-</span>
                      </td>
                      <td className="py-[var(--spacing-md)] px-[var(--spacing-md)] text-center">
                        <span className="text-[var(--text-tertiary)]">-</span>
                      </td>
                      <td className="py-[var(--spacing-md)] px-[var(--spacing-md)] text-center">
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
          className="text-center mt-[var(--spacing-2xl)]"
        >
          <p className="text-[var(--text-secondary)] mb-[var(--spacing-md)]">
            Not sure which plan is right for you?
          </p>
          <Button variant="ghost" size="lg">
            Talk to our team
          </Button>
        </motion.div>
      </Container>
    </Section>
  );
}
