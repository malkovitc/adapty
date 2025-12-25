'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { getAssetPath } from '@/lib/utils';

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
      className="relative w-full overflow-hidden bg-[#FAFAFA]"
      aria-label="Hero section"
    >
      {/* Main Content - Centered like Attio */}
      <div className="relative z-20 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Badge with Animated Gradient Border (Attio-style) */}
          <motion.div variants={itemVariants} className="mb-6">
            <Link
              href="https://adapty.io/ebooks/100k-app-playbook/"
              className="group relative inline-flex items-center gap-2 rounded-full text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors animate-border"
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
                padding: '0.5rem 1rem',
              }}
            >
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Ebook $100K playbook — download free
              <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-slate-900 text-center mb-6"
          >
            Revenue management
            <br />
            for in-app purchases.
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-xl text-slate-500 text-center leading-relaxed mb-8"
            style={{ width: '100%', maxWidth: '42rem', display: 'block', whiteSpace: 'normal' }}
          >
            Save months on integrating subscriptions and double your app revenue with paywall management.
          </motion.p>

          {/* Email Input + CTA */}
          <motion.div
            variants={itemVariants}
            className="w-full"
            style={{ maxWidth: '480px' }}
          >
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 justify-center items-center w-full"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 min-w-0 px-4 py-3.5 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all text-base"
                style={{ width: '100%' }}
                required
                aria-invalid={emailError ? 'true' : 'false'}
                aria-describedby={emailError ? 'email-error' : undefined}
              />
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg transition-colors whitespace-nowrap"
              >
                Start for free
              </button>
            </form>
            {emailError && (
              <p
                id="email-error"
                className="mt-2 text-sm text-red-600 text-center"
                role="alert"
              >
                {emailError}
              </p>
            )}
          </motion.div>

          {/* Book a demo link */}
          <motion.div variants={itemVariants} className="mt-4">
            <Link
              href="https://adapty.io/schedule-demo/"
              className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 font-medium transition-colors"
            >
              Book a demo
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Dashboard Image - Centered, Full Width */}
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16"
      >
        <div className="relative">
          {/* Main Dashboard Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-slate-300/50 border border-slate-200">
            <Image
              src={getAssetPath('/images/hero/adapty-overview.webp')}
              alt="Adapty Overview Dashboard"
              width={1400}
              height={900}
              className="w-full h-auto"
              priority
              unoptimized
            />
          </div>

        </div>
      </motion.div>

      {/* Trusted By Section */}
      <div className="relative z-20 py-8 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-slate-500 text-sm">
            Trusted by 15,000+ apps and the world's largest app publishers
          </p>
        </div>
      </div>
    </section>
  );
}
