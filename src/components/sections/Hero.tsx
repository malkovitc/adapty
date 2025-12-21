'use client';

import { lazy, Suspense, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { MailIcon, ErrorCircleIcon, CheckCircleIcon } from '@/components/icons';
import { ScrollIndicator } from '@/components/ui';

const OverviewDashboard = lazy(() => import('@/components/dashboard/OverviewDashboard'));
const FluidBackground = lazy(() => import('@/components/FluidBackground'));

export default function Hero() {
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [isHoveringButton, setIsHoveringButton] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError('');
    setSuccess('');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setSuccess(`Thank you! We'll contact you at ${email}`);

    // Clear form after successful submission
    e.currentTarget.reset();
  };

  // Premium animation variants with reduced motion support
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 40, scale: shouldReduceMotion ? 1 : 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0.3 : 1.2,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section
      className="relative min-h-screen w-full overflow-hidden bg-[#0F172A]"
      aria-label="Hero section"
    >
      <Suspense fallback={<div className="absolute inset-0 bg-[#060814]" />}>
        <FluidBackground />
      </Suspense>
      {/* Enhanced gradient backgrounds with multiple layers */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        {/* Primary gradient - top center */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-60 bg-[radial-gradient(ellipse_at_center_top,rgba(139,92,246,0.25)_0%,rgba(59,130,246,0.12)_40%,transparent_70%)] animate-pulse-slow" />

        {/* Secondary gradient - top right */}
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] opacity-45 bg-[radial-gradient(circle,rgba(59,130,246,0.18)_0%,transparent_60%)]" />

        {/* Tertiary gradient - left side for depth */}
        <div className="absolute top-1/3 left-0 w-[350px] h-[350px] opacity-30 bg-[radial-gradient(circle,rgba(168,85,247,0.15)_0%,transparent_65%)] animate-pulse-slower" />
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex min-h-screen flex-col items-center px-4 sm:px-6 lg:px-12 pt-24 pb-20 gap-12">
        {/* Text Block */}
        <motion.div
          className="w-full text-center mx-auto max-w-[960px]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Trust Badge with enhanced effects */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-sm font-medium text-slate-300 mb-6 shadow-[0_0_24px_rgba(139,92,246,0.15)] hover:shadow-[0_0_32px_rgba(139,92,246,0.25)] hover:border-white/20 transition-all duration-300"
            whileHover={{ scale: shouldReduceMotion ? 1 : 1.02 }}
            role="status"
            aria-label="Trusted by 15,000+ apps"
          >
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]" aria-hidden="true" />
            Trusted by 15,000+ apps
          </motion.div>

          {/* Main Heading with animated gradient */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 text-balance"
            style={{
              letterSpacing: '-0.026em',
              lineHeight: '1.1',
              fontFeatureSettings: '"ss01", "cv01", "cv02"',
            }}
          >
            Revenue management for{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient-x">
                in-app purchases
              </span>
              {/* Subtle glow effect under gradient text */}
              <span
                className="absolute inset-0 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 blur-xl opacity-20 animate-gradient-x"
                aria-hidden="true"
              />
            </span>
          </motion.h1>

          {/* Subheading with improved typography */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-300 mb-10 leading-relaxed text-balance mx-auto w-full max-w-[720px]"
            style={{
              letterSpacing: '-0.01em',
              fontFeatureSettings: '"kern"',
            }}
          >
            Save months on integrating subscriptions and double your app revenue with paywall management.
          </motion.p>

          {/* Email Capture Form with enhanced interactions */}
          <motion.div
            variants={itemVariants}
            className="w-full px-4 mx-auto mb-4 max-w-[580px]"
          >
            {/* Mobile: Stacked layout */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-3 sm:hidden"
              noValidate
            >
              <label htmlFor="hero-email-mobile" className="sr-only">
                Enter your email address
              </label>
              <input
                id="hero-email-mobile"
                name="email"
                type="email"
                placeholder="Enter your email"
                className="w-full h-14 px-5 bg-white/10 border border-white/25 rounded-xl text-white placeholder-slate-400 text-base font-medium outline-none transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F172A] focus-visible:border-purple-400 hover:border-white/35 backdrop-blur-sm shadow-[0_2px_12px_rgba(0,0,0,0.3)]"
                aria-describedby="trust-indicator"
                aria-invalid={error ? 'true' : 'false'}
                aria-errormessage={error ? 'email-error' : undefined}
                maxLength={254}
              />
              <button
                type="submit"
                className="group w-full min-h-[56px] h-14 bg-[#7C3AED] hover:bg-[#6D28D9] active:bg-[#5B21B6] text-white rounded-xl font-semibold transition-all duration-300 shadow-[0_0_20px_rgba(124,58,237,0.5),0_4px_12px_rgba(0,0,0,0.4)] hover:shadow-[0_0_32px_rgba(124,58,237,0.7),0_8px_24px_rgba(0,0,0,0.5)] active:shadow-[0_0_16px_rgba(124,58,237,0.4)] flex items-center justify-center gap-2 text-base touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F172A] transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Start for free
                <ArrowRight
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-active:translate-x-1.5"
                  aria-hidden="true"
                />
              </button>
            </form>

            {/* Desktop: Capsule layout */}
            <form
              onSubmit={handleSubmit}
              className="hidden sm:flex items-center p-2 bg-white/10 border border-white/25 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-md focus-within:border-purple-400/70 focus-within:shadow-[0_0_32px_rgba(124,58,237,0.3)] hover:border-white/35 transition-all duration-300"
              noValidate
            >
              <div className="pl-4 text-slate-400 transition-colors duration-300 group-focus-within:text-purple-400">
                <MailIcon className="h-5 w-5" aria-hidden="true" />
              </div>
              <label htmlFor="hero-email" className="sr-only">
                Enter your email address
              </label>
              <input
                id="hero-email"
                name="email"
                type="email"
                placeholder="Enter your email"
                className="flex-1 min-w-0 bg-transparent border-none outline-none text-white placeholder-slate-400 px-4 py-3 text-base font-medium focus-visible:outline-none"
                aria-describedby="trust-indicator"
                aria-invalid={error ? 'true' : 'false'}
                aria-errormessage={error ? 'email-error' : undefined}
                maxLength={254}
              />
              <button
                type="submit"
                onMouseEnter={() => setIsHoveringButton(true)}
                onMouseLeave={() => setIsHoveringButton(false)}
                className="group shrink-0 bg-[#7C3AED] hover:bg-[#6D28D9] active:bg-[#5B21B6] text-white px-6 py-3 min-h-[48px] rounded-full font-semibold transition-all duration-300 shadow-[0_0_20px_rgba(124,58,237,0.5),0_4px_12px_rgba(124,58,237,0.25)] hover:shadow-[0_0_32px_rgba(124,58,237,0.7),0_6px_20px_rgba(124,58,237,0.35)] active:shadow-[0_0_16px_rgba(124,58,237,0.4)] flex items-center gap-2 text-base touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent transform hover:scale-105 active:scale-95"
              >
                Start for free
                <ArrowRight
                  className={`w-4 h-4 transition-transform duration-300 ${isHoveringButton ? 'translate-x-1' : ''}`}
                  aria-hidden="true"
                />
              </button>
            </form>

            {/* Error Message with improved accessibility */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                id="email-error"
                role="alert"
                aria-live="assertive"
                className="mt-3 text-red-400 text-sm font-medium flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 backdrop-blur-sm"
              >
                <ErrorCircleIcon className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                <span>{error}</span>
              </motion.div>
            )}

            {/* Success Message with improved accessibility */}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                role="status"
                aria-live="polite"
                className="mt-3 text-emerald-400 text-sm font-medium flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2 backdrop-blur-sm"
              >
                <CheckCircleIcon className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                <span>{success}</span>
              </motion.div>
            )}

            {/* Trust Indicator + Book Demo Link with enhanced hover states */}
            <div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-4 text-sm">
              <span
                id="trust-indicator"
                className="flex items-center gap-2 text-slate-400"
              >
                <CheckCircleIcon
                  className="w-4 h-4 text-emerald-500 drop-shadow-[0_0_6px_rgba(16,185,129,0.5)]"
                  aria-hidden="true"
                />
                No credit card required
              </span>
              <a
                href="#"
                className="group text-slate-300 hover:text-white transition-all duration-300 font-medium flex items-center gap-1.5 min-h-[44px] py-2 touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F172A] rounded-md px-2 -mx-2 -my-1"
              >
                Book a demo
                <ArrowRight
                  className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Dashboard Showcase with enhanced visual effects */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 60, scale: shouldReduceMotion ? 1 : 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: shouldReduceMotion ? 0.5 : 1.4, delay: shouldReduceMotion ? 0 : 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-5xl"
        >
          <div className="relative">
            {/* Multi-layered glow effect */}
            <div
              className="absolute -inset-x-10 top-1/2 -translate-y-1/2 h-[400px] bg-gradient-to-r from-purple-600/30 via-cyan-500/20 to-blue-600/30 blur-[140px] opacity-80"
              aria-hidden="true"
            />
            <div
              className="absolute -inset-x-20 top-1/2 -translate-y-1/2 h-[300px] bg-gradient-to-r from-violet-500/20 via-blue-500/15 to-purple-500/20 blur-[100px] opacity-60 animate-pulse-slower"
              aria-hidden="true"
            />

            {/* Dashboard container with enhanced premium styling */}
            <div className="relative rounded-[32px] border border-white/15 bg-[#111827]/80 p-4 backdrop-blur-2xl shadow-[0_40px_120px_rgba(3,7,18,0.8),0_20px_60px_rgba(139,92,246,0.15)] hover:shadow-[0_50px_140px_rgba(3,7,18,0.9),0_25px_70px_rgba(139,92,246,0.2)] transition-shadow duration-500">
              <div className="rounded-[28px] bg-[#F9FAFB] p-4 shadow-[inset_0_2px_8px_rgba(0,0,0,0.05)]">
                <Suspense fallback={
                  <div className="h-[400px] animate-pulse rounded-2xl bg-slate-200/50" />
                }>
                  <OverviewDashboard />
                </Suspense>
              </div>
            </div>
          </div>

          {/* Gradient fade at bottom */}
          <div
            className="pointer-events-none -mt-6 h-32 w-full bg-gradient-to-t from-[#0F172A] via-[#0F172A]/80 to-transparent"
            aria-hidden="true"
          />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <ScrollIndicator />
    </section>
  );
}
