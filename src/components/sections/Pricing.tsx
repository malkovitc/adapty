'use client';

import { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import {
  BadgeShadcn,
  Button,
  Switch,
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui';
import { GlowCard } from '@/components/ui/GlowCard';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { pricingTiers as defaultPricingTiers, type PricingTier } from '@/data/pricing';

// Memoized Pricing Card Component
const PricingCard = memo(function PricingCard({
  tier,
  index,
  isYearly,
}: {
  tier: PricingTier;
  index: number;
  isYearly: boolean;
}) {
  const isEnterprise = tier.id === 'enterprise';

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
      {/* Hover glow effect - only for non-highlighted and non-enterprise tiers */}
      {!tier.highlighted && !isEnterprise && (
        <div className="absolute inset-0 rounded-2xl transition-all duration-500 bg-gradient-to-r from-indigo-500/0 to-blue-500/0 blur-xl group-hover:blur-2xl group-hover:from-indigo-500/10 group-hover:to-blue-500/10 opacity-0 group-hover:opacity-100" />
      )}

      {/* Purple glow effect for Enterprise */}
      {isEnterprise && (
        <div className="absolute inset-0 rounded-2xl transition-all duration-500 bg-gradient-to-r from-violet-600/0 to-purple-600/0 blur-xl group-hover:blur-2xl group-hover:from-violet-600/20 group-hover:to-purple-600/20 opacity-0 group-hover:opacity-100" />
      )}

      {isEnterprise ? (
        <motion.div
          whileHover={{ y: -8 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 20,
          }}
          className="relative p-6 sm:p-8 bg-gradient-to-br from-violet-900 to-purple-900 rounded-2xl transition-all duration-500 touch-manipulation h-full flex flex-col border border-violet-700/50 shadow-lg group-hover:shadow-2xl group-hover:shadow-violet-500/20"
        >
          <PricingCardContent tier={tier} isYearly={isYearly} isEnterprise />

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
      ) : tier.highlighted ? (
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
  isEnterprise = false,
}: {
  tier: PricingTier;
  isYearly: boolean;
  isEnterprise?: boolean;
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
          <BadgeShadcn className="gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white text-xs font-bold shadow-lg border-none">
            <Sparkles className="w-3.5 h-3.5" />
            {tier.badge}
          </BadgeShadcn>
        </motion.div>
      )}

      {/* Tier Name */}
      <h3 className={`text-2xl font-bold mb-2 ${isEnterprise ? 'text-white' : 'text-[var(--text-primary)]'}`}>
        {tier.name}
      </h3>

      {/* Description */}
      <p className={`mb-6 ${isEnterprise ? 'text-violet-200' : 'text-[var(--text-secondary)]'}`}>{tier.description}</p>

      {/* Price */}
      <div className="mb-8">
        {tier.price.display ? (
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold bg-gradient-to-r from-[var(--text-primary)] to-[var(--text-secondary)] bg-clip-text text-transparent">
                {tier.price.display}
              </span>
              {tier.price.note && (
                <span className="text-[var(--text-secondary)] font-medium">
                  {tier.price.note.includes('per month') ? 'per month' : tier.price.note.includes('of monthly revenue') ? 'of monthly revenue' : ''}
                </span>
              )}
            </div>
            {tier.price.note && !tier.price.note.includes('per month') && !tier.price.note.includes('of monthly revenue') && (
              <p className="text-sm text-[var(--text-tertiary)] mt-2">
                {tier.price.note}
              </p>
            )}
          </div>
        ) : tier.price.monthly !== null ? (
          <div className="flex items-baseline gap-1">
            <span className="text-5xl font-bold bg-gradient-to-r from-[var(--text-primary)] to-[var(--text-secondary)] bg-clip-text text-transparent">
              ${tier.price.monthly}
            </span>
            <span className="text-[var(--text-secondary)] font-medium">/month</span>
          </div>
        ) : (
          <div className={`text-4xl font-bold ${isEnterprise ? 'text-white' : 'text-[var(--text-primary)]'}`}>
            Custom
          </div>
        )}
      </div>

      {/* CTA Button */}
      <Button
        variant={isEnterprise ? 'secondary' : tier.highlighted ? 'primary' : 'secondary'}
        fullWidth
        className={`mb-8 ${isEnterprise ? 'bg-white text-violet-900 hover:bg-violet-100 border-white' : ''}`}
      >
        {tier.cta.text}
      </Button>

      {/* Features List */}
      <div className="space-y-[var(--spacing-md)] flex-grow">
        <p className={`text-sm font-semibold uppercase tracking-wider ${isEnterprise ? 'text-violet-200' : 'text-[var(--text-primary)]'}`}>
          Features
        </p>
        <ul className="space-y-[var(--spacing-sm)]">
          {tier.features.map((feature: string, featureIndex: number) => (
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
                  isEnterprise
                    ? 'text-violet-300'
                    : tier.highlighted
                    ? 'text-indigo-500'
                    : 'text-green-600'
                }`}
              />
              <span className={isEnterprise ? 'text-violet-100' : 'text-[var(--text-secondary)]'}>{feature}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </>
  );
});

interface PricingProps {
  tiers?: PricingTier[];
}

export default function Pricing({ tiers = defaultPricingTiers }: PricingProps = {}) {
  const [isYearly, setIsYearly] = useState(false);

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
            Choose a plan that{' '}
            <span className="bg-gradient-to-r from-indigo-500 to-blue-600 bg-clip-text text-transparent">
              works for you
            </span>
          </motion.h2>

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center gap-4 mb-[var(--spacing-2xl)]"
          >
            <span
              className={`text-sm font-medium transition-colors ${
                !isYearly ? 'text-[var(--text-primary)]' : 'text-[var(--text-tertiary)]'
              }`}
            >
              Monthly
            </span>
            <Switch
              checked={isYearly}
              onCheckedChange={setIsYearly}
              aria-label="Toggle yearly billing"
            />
            <span
              className={`text-sm font-medium transition-colors ${
                isYearly ? 'text-[var(--text-primary)]' : 'text-[var(--text-tertiary)]'
              }`}
            >
              Yearly
            </span>
            {isYearly && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <BadgeShadcn
                  variant="success"
                  className="px-3 py-1 text-xs font-semibold bg-green-100 text-green-700 border-none"
                >
                  Save 20%
                </BadgeShadcn>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[var(--spacing-lg)] sm:gap-[var(--spacing-2xl)] max-w-7xl mx-auto mb-[var(--spacing-3xl)] items-stretch">
          {tiers.map((tier: PricingTier, index: number) => (
            <PricingCard key={tier.id} tier={tier} index={index} isYearly={isYearly} />
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

              <Table className="min-w-[640px]">
                <TableHeader>
                  <TableRow>
                    <TableHead className="px-[var(--spacing-md)] py-[var(--spacing-md)] text-left text-base font-semibold">
                      Feature
                    </TableHead>
                    {tiers.map((tier: PricingTier) => (
                      <TableHead
                        key={tier.id}
                        className="px-[var(--spacing-md)] py-[var(--spacing-md)] text-center text-base font-semibold"
                      >
                        {tier.name}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="px-[var(--spacing-md)] py-[var(--spacing-md)] text-[var(--text-secondary)]">
                      Monthly revenue limit
                    </TableCell>
                    <TableCell className="px-[var(--spacing-md)] py-[var(--spacing-md)] text-center text-[var(--text-secondary)]">
                      Up to $10K
                    </TableCell>
                    <TableCell className="px-[var(--spacing-md)] py-[var(--spacing-md)] text-center text-[var(--text-secondary)]">
                      Unlimited
                    </TableCell>
                    <TableCell className="px-[var(--spacing-md)] py-[var(--spacing-md)] text-center text-[var(--text-secondary)]">
                      Unlimited
                    </TableCell>
                    <TableCell className="px-[var(--spacing-md)] py-[var(--spacing-md)] text-center text-[var(--text-secondary)]">
                      Unlimited
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="px-[var(--spacing-md)] py-[var(--spacing-md)] text-[var(--text-secondary)]">
                      Paywall Builder
                    </TableCell>
                    {[0, 1, 2, 3].map((index) => (
                      <TableCell key={index} className="px-[var(--spacing-md)] py-[var(--spacing-md)] text-center">
                        <Check className="w-5 h-5 text-indigo-500 mx-auto" />
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="px-[var(--spacing-md)] py-[var(--spacing-md)] text-[var(--text-secondary)]">
                      A/B Testing
                    </TableCell>
                    <TableCell className="px-[var(--spacing-md)] py-[var(--spacing-md)] text-center">
                      <span className="text-[var(--text-tertiary)]">-</span>
                    </TableCell>
                    {[0, 1, 2].map((index) => (
                      <TableCell key={index} className="px-[var(--spacing-md)] py-[var(--spacing-md)] text-center">
                        <Check className="w-5 h-5 text-indigo-500 mx-auto" />
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="px-[var(--spacing-md)] py-[var(--spacing-md)] text-[var(--text-secondary)]">
                      Analytics
                    </TableCell>
                    <TableCell className="px-[var(--spacing-md)] py-[var(--spacing-md)] text-center text-[var(--text-secondary)]">
                      Basic
                    </TableCell>
                    {[0, 1, 2].map((index) => (
                      <TableCell key={index} className="px-[var(--spacing-md)] py-[var(--spacing-md)] text-center text-[var(--text-secondary)]">
                        Advanced
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="px-[var(--spacing-md)] py-[var(--spacing-md)] text-[var(--text-secondary)]">
                      Support
                    </TableCell>
                    <TableCell className="px-[var(--spacing-md)] py-[var(--spacing-md)] text-center text-[var(--text-secondary)]">
                      Email
                    </TableCell>
                    <TableCell className="px-[var(--spacing-md)] py-[var(--spacing-md)] text-center text-[var(--text-secondary)]">
                      Priority
                    </TableCell>
                    <TableCell className="px-[var(--spacing-md)] py-[var(--spacing-md)] text-center text-[var(--text-secondary)]">
                      Advanced
                    </TableCell>
                    <TableCell className="px-[var(--spacing-md)] py-[var(--spacing-md)] text-center text-[var(--text-secondary)]">
                      Dedicated
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="px-[var(--spacing-md)] py-[var(--spacing-md)] text-[var(--text-secondary)]">
                      SLA
                    </TableCell>
                    {[0, 1, 2].map((index) => (
                      <TableCell key={index} className="px-[var(--spacing-md)] py-[var(--spacing-md)] text-center">
                        <span className="text-[var(--text-tertiary)]">-</span>
                      </TableCell>
                    ))}
                    <TableCell className="px-[var(--spacing-md)] py-[var(--spacing-md)] text-center">
                      <Check className="w-5 h-5 text-indigo-500 mx-auto" />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
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
