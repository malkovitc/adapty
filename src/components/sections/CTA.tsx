'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Sparkles, ArrowRight } from 'lucide-react';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { Button, BadgeShadcn } from '@/components/ui';
import type { ReactNode } from 'react';

interface CTAButtonProps {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

interface CTAProps {
  id?: string;
  title?: string;
  highlight?: string;
  description?: string;
  primaryCTA?: CTAButtonProps;
  secondaryCTA?: CTAButtonProps;
  benefits?: string[];
  background?: 'white' | 'gray' | 'gradient';
}

const defaultBenefits = [
  'Free plan available',
  'No credit card required',
  '5-minute integration',
  'Cancel anytime',
];

const defaultPrimaryCTA: CTAButtonProps = {
  label: 'Start for free',
  href: '#',
  variant: 'primary',
  icon: <Sparkles className="w-5 h-5" />,
  iconPosition: 'left',
};

const defaultSecondaryCTA: CTAButtonProps = {
  label: 'Book a demo',
  href: 'https://adapty.io/schedule-demo/',
  variant: 'secondary',
  icon: <ArrowRight className="w-5 h-5" />,
};

export default function CTA({
  id = 'cta',
  title = 'Ready to boost your',
  highlight = 'app revenue?',
  description = 'Join 15,000+ apps that use Adapty to manage and grow their subscription business. Get started in minutes.',
  primaryCTA = defaultPrimaryCTA,
  secondaryCTA = defaultSecondaryCTA,
  benefits = defaultBenefits,
  background = 'gradient',
}: CTAProps) {
  return (
    <Section size="lg" background={background} id={id} className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Main gradient orb */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-purple-300/40 via-blue-300/40 to-cyan-300/40 rounded-full blur-[120px]"
        />

        {/* Secondary floating orbs */}
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-indigo-400/20 rounded-full blur-[80px]"
        />
        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
          className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] bg-cyan-400/20 rounded-full blur-[80px]"
        />

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(124, 58, 237) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      <Container size="md" className="relative text-center">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-[var(--text-h2)] sm:text-[var(--text-h1)] font-[var(--font-bold)] text-[var(--text-primary)] mb-[var(--spacing-lg)]"
          >
            {title}{' '}
            {highlight && (
              <span className="bg-gradient-to-r from-indigo-500 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                {highlight}
              </span>
            )}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[var(--text-lg)] text-[var(--text-secondary)] max-w-[42rem] mx-auto mb-[var(--spacing-2xl)]"
          >
            {description}
          </motion.p>
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-[var(--spacing-lg)] justify-center mb-[var(--spacing-2xl)]"
        >
          <Button
            variant={primaryCTA.variant ?? 'primary'}
            size="lg"
            href={primaryCTA.href}
            icon={primaryCTA.icon}
            iconPosition={primaryCTA.iconPosition}
          >
            {primaryCTA.label}
          </Button>
          {secondaryCTA && (
            <Button
              variant={secondaryCTA.variant ?? 'secondary'}
              size="lg"
              href={secondaryCTA.href}
              icon={secondaryCTA.icon}
              iconPosition={secondaryCTA.iconPosition}
            >
              {secondaryCTA.label}
            </Button>
          )}
        </motion.div>

        {/* Benefits */}
        {benefits.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-x-[var(--spacing-xl)] gap-y-[var(--spacing-md)]"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              >
                <BadgeShadcn
                  variant="secondary"
                  className="flex items-center gap-[var(--spacing-xs)] px-[var(--spacing-md)] py-[var(--spacing-xs)] text-[var(--text-secondary)] border-[var(--border-default)] bg-white/80"
                >
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span className="font-[var(--font-medium)] text-[var(--text-sm)]">{benefit}</span>
                </BadgeShadcn>
              </motion.div>
            ))}
          </motion.div>
        )}
      </Container>
    </Section>
  );
}
