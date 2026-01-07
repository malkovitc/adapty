'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { getAssetPath } from '@/lib/utils';
import { Button, Input, EmailIcon, BadgeShadcn } from '@/components/ui';
import Container from '@/components/ui/Container';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email is required');
      return;
    }
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    // Email is valid - redirect to signup or show success
    console.log('Form submitted with email:', email);
    // Redirect to signup page
    window.location.href = `https://adapty.io/signup/?email=${encodeURIComponent(email)}`;
  };

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden bg-[var(--bg-subtle)]"
      aria-label="Hero section"
    >
      <ContainerScroll
        titleComponent={
          <Container size="md" className="relative z-20">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center"
            >
              {/* Badge with Animated Gradient Border */}
              <motion.div variants={itemVariants} className="mb-[var(--spacing-lg)]">
                <Link
                  href="https://adapty.io/ebooks/100k-app-playbook/"
                  className="group inline-flex"
                >
              <BadgeShadcn
                className="gap-2 rounded-full border-none text-[var(--text-sm)] font-[var(--font-medium)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors animate-border px-[var(--spacing-md)] py-[var(--spacing-sm)]"
                style={{
                  border: '1.5px solid transparent',
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
                    }}
                  >
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Ebook $100K playbook — download free
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                  </BadgeShadcn>
                </Link>
              </motion.div>

              {/* Main Heading - Using typography tokens */}
              <motion.h1
                variants={itemVariants}
                className="text-5xl sm:text-6xl lg:text-7xl font-[var(--font-bold)] leading-[var(--leading-tight)] tracking-[var(--tracking-tight)] text-[var(--text-primary)] text-center mb-[var(--spacing-lg)]"
              >
                Revenue management
                <br />
                for in-app purchases.
              </motion.h1>

              {/* Subheading */}
              <motion.p
                variants={itemVariants}
                className="text-xl text-[var(--text-secondary)] text-center leading-[var(--leading-relaxed)] mb-[var(--spacing-xl)] max-w-[42rem]"
              >
                Save months on integrating subscriptions and double your app revenue with paywall management.
              </motion.p>

              {/* Email Input + CTA - Using new components */}
              <motion.div
                variants={itemVariants}
                className="w-full max-w-[480px]"
              >
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-[var(--spacing-sm)] justify-center items-stretch w-full"
                >
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    size="lg"
                    icon={<EmailIcon />}
                    error={emailError}
                    fullWidth
                    id="hero-email"
                    containerClassName="flex-1"
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto whitespace-nowrap"
                  >
                    Start for free
                  </Button>
                </form>
              </motion.div>

              {/* Book a demo link */}
              <motion.div variants={itemVariants} className="mt-[var(--spacing-md)]">
                <Button
                  variant="ghost"
                  href="https://adapty.io/schedule-demo/"
                >
                  Book a demo
                </Button>
              </motion.div>
            </motion.div>
          </Container>
        }
      >
        <Image
          src={getAssetPath('/images/hero/adapty-overview.webp')}
          alt="Adapty Overview Dashboard"
          width={1400}
          height={900}
          className="mx-auto w-full h-full object-cover object-left-top"
          priority
          unoptimized
          draggable={false}
        />
      </ContainerScroll>
    </section>
  );
}
