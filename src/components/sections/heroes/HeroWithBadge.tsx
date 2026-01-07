'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { getAssetPath } from '@/lib/utils';
import { Button } from '@/components/ui';
import Container from '@/components/ui/Container';

export interface HeroWithBadgeProps {
  /** Category label like "PAYWALL MANAGEMENT" */
  badge: string;
  /** Main title text */
  title: string;
  /** Part of title to highlight with gradient (must be substring of title) */
  titleHighlight?: string;
  /** Subtitle/description text */
  subtitle: string;
  /** Primary call-to-action button */
  primaryCTA: { text: string; href: string };
  /** Optional secondary call-to-action button */
  secondaryCTA?: { text: string; href: string };
  /** Optional hero image */
  image?: { src: string; alt: string };
}

/**
 * Hero with Badge - For feature pages
 *
 * Features:
 * - Animated gradient border badge for category label
 * - Title with optional gradient highlight
 * - Primary and secondary CTAs
 * - Optional hero image with shadow and border
 * - Background decorative gradients
 *
 * @example
 * <HeroWithBadge
 *   badge="PAYWALL MANAGEMENT"
 *   title="Build paywalls without code"
 *   titleHighlight="without code"
 *   subtitle="Design, test, and optimize paywalls..."
 *   primaryCTA={{ text: "Start free trial", href: "/signup" }}
 *   secondaryCTA={{ text: "Book a demo", href: "/demo" }}
 *   image={{ src: "/images/paywall-hero.webp", alt: "Paywall dashboard" }}
 * />
 */
export default function HeroWithBadge({
  badge,
  title,
  titleHighlight,
  subtitle,
  primaryCTA,
  secondaryCTA,
  image,
}: HeroWithBadgeProps) {
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
      className="relative w-full overflow-hidden bg-[var(--bg-subtle)]"
      aria-label={`${badge} hero section`}
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
          {/* Badge with Animated Border */}
          <motion.div variants={itemVariants} className="mb-[var(--spacing-lg)]">
            <span
              className="group relative inline-flex items-center gap-2 rounded-full text-[var(--text-sm)] font-[var(--font-semibold)] uppercase tracking-wider text-[var(--text-secondary)] animate-border"
              style={{
                background: `
                  linear-gradient(white, white) padding-box,
                  conic-gradient(
                    from var(--border-angle),
                    rgba(99, 102, 241, 0.15) 0%,
                    rgba(59, 130, 246, 0.5) 25%,
                    rgba(6, 182, 212, 0.5) 50%,
                    rgba(59, 130, 246, 0.5) 75%,
                    rgba(99, 102, 241, 0.15) 100%
                  ) border-box
                `,
                border: '1.5px solid transparent',
                padding: 'var(--spacing-sm) var(--spacing-md)',
              }}
            >
              {badge}
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
            className="text-lg sm:text-xl text-[var(--text-secondary)] text-center leading-[var(--leading-relaxed)] mb-[var(--spacing-xl)] max-w-[42rem]"
          >
            {subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-[var(--spacing-md)] justify-center"
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

      {/* Hero Image */}
      {image && (
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 pb-[var(--spacing-2xl)]"
        >
          <Container size="full">
            <div className="relative rounded-[var(--radius-2xl)] overflow-hidden shadow-[var(--shadow-2xl)] border border-[var(--border-default)]">
              <Image
                src={getAssetPath(image.src)}
                alt={image.alt}
                width={1400}
                height={900}
                className="w-full h-auto"
                priority
                unoptimized
              />
            </div>
          </Container>
        </motion.div>
      )}
    </section>
  );
}
