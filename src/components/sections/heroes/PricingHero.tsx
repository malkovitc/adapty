'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Container from '@/components/ui/Container';
import { Switch } from '@/components/ui';

export interface PricingHeroProps {
  /** Main title text */
  title: string;
  /** Part of title to highlight with gradient (must be substring of title) */
  titleHighlight?: string;
  /** Subtitle/description text */
  subtitle: string;
  /** Whether to show the Monthly/Yearly billing toggle */
  billingToggle?: boolean;
  /** Current billing state (true = yearly) */
  isYearly?: boolean;
  /** Callback when billing toggle changes */
  onBillingChange?: (yearly: boolean) => void;
  /** Savings percentage to show on yearly badge */
  yearlySavings?: number;
}

/**
 * Pricing Hero - For Pricing page
 *
 * Features:
 * - Title with optional gradient highlight
 * - Subtitle with description
 * - Optional billing toggle (Monthly/Yearly)
 * - Background decorative gradients
 * - Savings badge on yearly option
 *
 * @example
 * // Without billing toggle
 * <PricingHero
 *   title="Simple, transparent pricing"
 *   titleHighlight="pricing"
 *   subtitle="Start for free and scale as you grow."
 * />
 *
 * @example
 * // With billing toggle
 * <PricingHero
 *   title="Simple, transparent pricing"
 *   titleHighlight="pricing"
 *   subtitle="Start for free and scale as you grow."
 *   billingToggle={true}
 *   isYearly={false}
 *   onBillingChange={(yearly) => setIsYearly(yearly)}
 *   yearlySavings={20}
 * />
 */
export default function PricingHero({
  title,
  titleHighlight,
  subtitle,
  billingToggle = false,
  isYearly = false,
  onBillingChange,
  yearlySavings = 20,
}: PricingHeroProps) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.3 : 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  // Split title around the highlight text
  const renderTitle = () => {
    if (!titleHighlight) {
      return <span className="text-[var(--text-primary)]">{title}</span>;
    }

    const parts = title.split(titleHighlight);
    return (
      <>
        {parts[0] && <span className="text-[var(--text-primary)]">{parts[0]}</span>}
        <span className="bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">
          {titleHighlight}
        </span>
        {parts[1] && <span className="text-[var(--text-primary)]">{parts[1]}</span>}
      </>
    );
  };

  return (
    <section
      id="pricing-hero"
      className="relative w-full overflow-hidden bg-[var(--bg-subtle)]"
      aria-label="Pricing hero section"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-purple-100/60 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-bl from-blue-100/60 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <Container className="relative z-20 pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-[var(--spacing-lg)]">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[var(--text-sm)] font-[var(--font-semibold)] uppercase tracking-wider text-violet-600 bg-violet-50 border border-violet-100">
              Pricing
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-[var(--font-bold)] leading-[var(--leading-tight)] tracking-[var(--tracking-tight)] text-center mb-[var(--spacing-lg)]"
          >
            {renderTitle()}
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-[var(--text-secondary)] text-center leading-[var(--leading-relaxed)] max-w-[42rem]"
          >
            {subtitle}
          </motion.p>

          {/* Billing Toggle */}
          {billingToggle && (
            <motion.div
              variants={itemVariants}
              className="mt-[var(--spacing-xl)] flex items-center gap-[var(--spacing-md)]"
            >
              <span
                className={`text-base font-[var(--font-medium)] transition-colors ${
                  !isYearly ? 'text-[var(--text-primary)]' : 'text-[var(--text-tertiary)]'
                }`}
              >
                Monthly
              </span>

              <Switch
                checked={isYearly}
                onCheckedChange={(checked) => onBillingChange?.(checked)}
                aria-label="Toggle yearly billing"
              />

              <span
                className={`text-base font-[var(--font-medium)] transition-colors ${
                  isYearly ? 'text-[var(--text-primary)]' : 'text-[var(--text-tertiary)]'
                }`}
              >
                Yearly
              </span>

              {yearlySavings > 0 && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-[var(--font-semibold)] text-green-700 bg-green-100">
                  Save {yearlySavings}%
                </span>
              )}
            </motion.div>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
