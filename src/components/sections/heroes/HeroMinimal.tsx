'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui';
import Container from '@/components/ui/Container';

export interface HeroMinimalProps {
  /** Main title text */
  title: string;
  /** Part of title to highlight with gradient (must be substring of title) */
  titleHighlight?: string;
  /** Optional subtitle/description text */
  subtitle?: string;
  /** Primary call-to-action button */
  primaryCTA: { text: string; href: string };
  /** Optional secondary call-to-action button */
  secondaryCTA?: { text: string; href: string };
}

/**
 * Minimal Hero - For Integrations page and similar simple layouts
 *
 * Features:
 * - Clean, minimal design without background decorations
 * - Title with optional gradient highlight
 * - Optional subtitle
 * - Primary and secondary CTAs
 * - Compact vertical spacing
 *
 * @example
 * <HeroMinimal
 *   title="Integrations"
 *   primaryCTA={{ text: "Browse all", href: "#integrations" }}
 *   secondaryCTA={{ text: "Request integration", href: "/contact" }}
 * />
 *
 * @example
 * // With subtitle
 * <HeroMinimal
 *   title="Connect your favorite tools"
 *   titleHighlight="favorite tools"
 *   subtitle="Seamlessly integrate with the tools you already use"
 *   primaryCTA={{ text: "Get started", href: "/signup" }}
 * />
 */
export default function HeroMinimal({
  title,
  titleHighlight,
  subtitle,
  primaryCTA,
  secondaryCTA,
}: HeroMinimalProps) {
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
      className="relative w-full bg-[var(--bg-subtle)]"
      aria-label="Hero section"
    >
      {/* Main Content */}
      <Container className="pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-[var(--font-bold)] leading-[var(--leading-tight)] tracking-[var(--tracking-tight)] text-center mb-[var(--spacing-md)]"
          >
            {renderTitle()}
          </motion.h1>

          {/* Optional Subheading */}
          {subtitle && (
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-[var(--text-secondary)] text-center leading-[var(--leading-relaxed)] mb-[var(--spacing-lg)] max-w-[42rem]"
            >
              {subtitle}
            </motion.p>
          )}

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-[var(--spacing-md)] justify-center mt-[var(--spacing-md)]"
          >
            <Button
              variant="primary"
              size="lg"
              href={primaryCTA.href}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              {primaryCTA.text}
            </Button>
            {secondaryCTA && (
              <Button
                variant="secondary"
                size="lg"
                href={secondaryCTA.href}
              >
                {secondaryCTA.text}
              </Button>
            )}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
