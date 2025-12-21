'use client';

import { lazy, Suspense, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { MailIcon, ErrorCircleIcon, CheckCircleIcon } from '@/components/icons';

const OverviewDashboard = lazy(() => import('@/components/dashboard/OverviewDashboard'));
const FluidBackground = lazy(() => import('@/components/FluidBackground'));

export default function Hero() {
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

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

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#0F172A]">
      <Suspense fallback={<div className="absolute inset-0 bg-[#060814]" />}>
        <FluidBackground />
      </Suspense>
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-60 bg-[radial-gradient(ellipse_at_center_top,rgba(139,92,246,0.25)_0%,rgba(59,130,246,0.12)_40%,transparent_70%)]" />
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] opacity-45 bg-[radial-gradient(circle,rgba(59,130,246,0.18)_0%,transparent_60%)]" />
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex min-h-screen flex-col items-center px-4 sm:px-6 lg:px-12 pt-24 pb-20 gap-12">
        {/* Text Block */}
        <div className="w-full text-center mx-auto max-w-[960px]">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-sm font-medium text-slate-300 mb-6"
          >
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            Trusted by 15,000+ apps
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40, scale: 0.93 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 text-balance"
          >
            Revenue management for{' '}
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              in-app purchases
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-2xl text-slate-400 mb-10 leading-relaxed text-balance mx-auto w-full max-w-[720px]"
          >
            Save months on integrating subscriptions and double your app revenue with paywall management.
          </motion.p>

          {/* Email Capture Form */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.3, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full px-4 mx-auto mb-4 max-w-[580px]"
          >
            {/* Mobile: Stacked layout */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:hidden">
              <label htmlFor="hero-email-mobile" className="sr-only">
                Enter your email address
              </label>
              <input
                id="hero-email-mobile"
                name="email"
                type="email"
                placeholder="Enter your email"
                className="w-full h-14 px-5 bg-white/10 border border-white/25 rounded-xl text-white placeholder-slate-300 text-base font-medium outline-none ring-0 focus:ring-0 focus:outline-none focus:border-purple-500 transition-colors"
                aria-describedby="trust-indicator"
                maxLength={254}
                pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                required
              />
              <button
                type="submit"
                className="w-full h-14 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-xl font-semibold transition-all shadow-[0_0_20px_rgba(124,58,237,0.5)] flex items-center justify-center gap-2 text-base"
              >
                Start for free
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Desktop: Capsule layout */}
            <form onSubmit={handleSubmit} className="hidden sm:flex items-center p-2 bg-white/10 border border-white/25 rounded-full shadow-2xl backdrop-blur-md focus-within:border-purple-500/60 transition-all duration-300">
              <div className="pl-4 text-slate-400">
                <MailIcon className="h-5 w-5" />
              </div>
              <label htmlFor="hero-email" className="sr-only">
                Enter your email address
              </label>
              <input
                id="hero-email"
                name="email"
                type="email"
                placeholder="Enter your email"
                className="flex-1 min-w-0 bg-transparent border-none outline-none ring-0 focus:ring-0 focus:outline-none text-white placeholder-slate-300 px-4 py-3 text-base font-medium"
                aria-describedby="trust-indicator"
                maxLength={254}
                pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                required
              />
              <button
                type="submit"
                className="shrink-0 bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-6 py-3 rounded-full font-semibold transition-all shadow-[0_0_20px_rgba(124,58,237,0.5)] hover:shadow-[0_0_30px_rgba(124,58,237,0.7)] flex items-center gap-2 text-base"
              >
                Start for free
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 text-red-400 text-sm font-medium flex items-center gap-2"
              >
                <ErrorCircleIcon className="w-4 h-4" />
                {error}
              </motion.div>
            )}

            {/* Success Message */}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 text-emerald-400 text-sm font-medium flex items-center gap-2"
              >
                <CheckCircleIcon className="w-4 h-4" />
                {success}
              </motion.div>
            )}

            {/* Trust Indicator + Book Demo Link */}
            <div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-4 text-sm">
              <span id="trust-indicator" className="flex items-center gap-2 text-slate-400">
                <CheckCircleIcon className="w-4 h-4 text-emerald-500" />
                No credit card required
              </span>
              <a href="#" className="text-slate-300 hover:text-white transition-colors font-medium flex items-center gap-1.5">
                Book a demo
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Dashboard Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-5xl"
        >
          <div className="relative">
            <div className="absolute -inset-x-10 top-1/2 -translate-y-1/2 h-[400px] bg-gradient-to-r from-purple-600/30 via-cyan-500/20 to-blue-600/30 blur-[140px] opacity-80" />
            <div className="relative rounded-[32px] border border-white/15 bg-[#111827]/80 p-4 backdrop-blur-2xl shadow-[0_40px_120px_rgba(3,7,18,0.8)]">
              <div className="rounded-[28px] bg-[#F9FAFB] p-4">
                <Suspense fallback={
                  <div className="h-[400px] animate-pulse rounded-2xl bg-slate-800/50" />
                }>
                  <OverviewDashboard />
                </Suspense>
              </div>
            </div>
          </div>
          <div className="pointer-events-none -mt-6 h-32 w-full bg-gradient-to-t from-[#0F172A] via-[#0F172A]/80 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
