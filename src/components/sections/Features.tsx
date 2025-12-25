'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  Layers,
  Zap,
  Shield,
  Smartphone,
  TrendingUp,
  FlaskConical,
  Globe
} from 'lucide-react';

const features = [
  {
    icon: Layers,
    title: 'No-code Paywalls',
    description: 'Design and deploy beautiful paywalls without writing a single line of code. Update them instantly over-the-air.',
    gradient: 'from-purple-500 via-indigo-500 to-purple-600',
    glowColor: 'rgba(139, 92, 246, 0.3)',
    iconGradient: { start: '#a855f7', end: '#6366f1' },
  },
  {
    icon: FlaskConical,
    title: 'A/B Testing',
    description: 'Test different pricing, designs, and offers. Find the winning combination that maximizes your revenue.',
    gradient: 'from-blue-500 via-cyan-500 to-blue-600',
    glowColor: 'rgba(59, 130, 246, 0.3)',
    iconGradient: { start: '#3b82f6', end: '#06b6d4' },
  },
  {
    icon: BarChart3,
    title: 'Real-time Analytics',
    description: 'Track MRR, ARR, churn, LTV, and 50+ subscription metrics. Get instant insights into your revenue.',
    gradient: 'from-emerald-500 via-teal-500 to-emerald-600',
    glowColor: 'rgba(16, 185, 129, 0.3)',
    iconGradient: { start: '#10b981', end: '#14b8a6' },
  },
  {
    icon: TrendingUp,
    title: 'Revenue Optimization',
    description: 'Smart pricing, targeted offers, and win-back campaigns. Double your revenue with data-driven decisions.',
    gradient: 'from-orange-500 via-amber-500 to-orange-600',
    glowColor: 'rgba(249, 115, 22, 0.3)',
    iconGradient: { start: '#f97316', end: '#f59e0b' },
  },
  {
    icon: Smartphone,
    title: 'Cross-platform SDK',
    description: 'iOS, Android, React Native, Flutter, Unity, and Web. One SDK for all platforms with consistent API.',
    gradient: 'from-pink-500 via-rose-500 to-pink-600',
    glowColor: 'rgba(236, 72, 153, 0.3)',
    iconGradient: { start: '#ec4899', end: '#f43f5e' },
  },
  {
    icon: Zap,
    title: 'Server-side Webhooks',
    description: 'Real-time subscription events delivered to your server. Build custom logic and automations.',
    gradient: 'from-yellow-500 via-orange-500 to-yellow-600',
    glowColor: 'rgba(234, 179, 8, 0.3)',
    iconGradient: { start: '#eab308', end: '#f97316' },
  },
  {
    icon: Shield,
    title: 'Receipt Validation',
    description: 'Secure server-side validation for App Store and Google Play. Prevent fraud and ensure data accuracy.',
    gradient: 'from-slate-600 via-slate-700 to-slate-800',
    glowColor: 'rgba(71, 85, 105, 0.3)',
    iconGradient: { start: '#475569', end: '#1e293b' },
  },
  {
    icon: Globe,
    title: 'Price Localization',
    description: 'Optimize prices for each country automatically. Increase conversions with local currency pricing.',
    gradient: 'from-violet-500 via-purple-600 to-violet-600',
    glowColor: 'rgba(139, 92, 246, 0.3)',
    iconGradient: { start: '#8b5cf6', end: '#7c3aed' },
  },
];

// Feature Card Component with premium Attio/Linear style hover effects
const FeatureCard = memo(function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative h-full p-6 rounded-xl border border-neutral-200 bg-white hover:shadow-lg hover:border-neutral-300 hover:-translate-y-1 transition-all duration-200"
    >
      {/* Icon with background color change on hover */}
      <div className="w-10 h-10 rounded-lg bg-neutral-100 grid place-items-center group-hover:bg-neutral-900 transition-colors duration-200 mb-4">
        <feature.icon className="w-5 h-5 text-neutral-600 group-hover:text-white transition-colors duration-200" />
      </div>

      {/* Content */}
      <div>
        <h3 className="text-lg font-medium text-slate-900 mb-2">
          {feature.title}
        </h3>
        <p className="text-neutral-600 text-[15px] leading-relaxed">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
});

export default function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-28 md:py-32 bg-gradient-to-b from-white via-slate-50/30 to-white overflow-hidden">
      {/* Enhanced background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-purple-100/40 via-indigo-50/30 to-transparent rounded-full blur-3xl animate-pulse"
             style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-gradient-to-tr from-blue-100/40 via-cyan-50/30 to-transparent rounded-full blur-3xl animate-pulse"
             style={{ animationDuration: '10s', animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-violet-50/20 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header with stagger animation */}
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-block text-sm font-semibold uppercase tracking-wider text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text mb-4 px-4 py-2 rounded-full border border-purple-200/50 bg-purple-50/50"
          >
            Features
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight"
          >
            Everything you need to grow{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
                subscription revenue
              </span>
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-600/30 via-indigo-600/30 to-blue-600/30 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed"
            style={{ maxWidth: '48rem', margin: '0 auto' }}
          >
            From paywall builder to advanced analytics, Adapty gives you all the tools to monetize your app effectively
          </motion.p>
        </div>

        {/* Features Grid with stagger animation */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
