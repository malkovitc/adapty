'use client';

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
import { useState } from 'react';

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

// Feature Card Component with advanced hover effects
function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      {/* Animated glow background on hover */}
      <motion.div
        className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700"
        style={{
          background: `linear-gradient(135deg, ${feature.iconGradient.start}, ${feature.iconGradient.end})`,
        }}
        animate={{
          opacity: isHovered ? 0.6 : 0,
        }}
        transition={{ duration: 0.7 }}
      />

      {/* Card content */}
      <motion.div
        className="relative h-full p-8 bg-white rounded-2xl border border-slate-200/80 backdrop-blur-sm overflow-hidden"
        whileHover={{
          y: -8,
          transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
        }}
      >
        {/* Gradient overlay on hover */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
        />

        {/* Animated border gradient */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: `linear-gradient(135deg, ${feature.iconGradient.start}, ${feature.iconGradient.end})`,
            opacity: 0,
          }}
          animate={{
            opacity: isHovered ? 0.15 : 0,
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Icon with gradient and glow */}
        <div className="relative mb-6">
          <motion.div
            className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/50 backdrop-blur-sm relative overflow-hidden"
            whileHover={{
              scale: 1.05,
              rotate: [0, -5, 5, 0],
              transition: { duration: 0.5 }
            }}
          >
            {/* Icon glow effect */}
            <motion.div
              className="absolute inset-0 rounded-2xl blur-lg"
              style={{
                background: `linear-gradient(135deg, ${feature.iconGradient.start}, ${feature.iconGradient.end})`,
              }}
              animate={{
                opacity: isHovered ? 0.4 : 0,
                scale: isHovered ? 1.2 : 1,
              }}
              transition={{ duration: 0.5 }}
            />

            {/* Gradient icon */}
            <div className="relative">
              <svg width="0" height="0" className="absolute">
                <defs>
                  <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: feature.iconGradient.start }} />
                    <stop offset="100%" style={{ stopColor: feature.iconGradient.end }} />
                  </linearGradient>
                </defs>
              </svg>
              <feature.icon
                className="w-7 h-7 relative z-10"
                style={{
                  stroke: `url(#gradient-${index})`,
                  strokeWidth: 2,
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Content with improved hierarchy */}
        <div className="relative z-10">
          <motion.h3
            className="text-xl font-bold text-slate-900 mb-3 group-hover:bg-gradient-to-r group-hover:from-slate-900 group-hover:to-slate-700 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300"
            animate={{
              y: isHovered ? -2 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            {feature.title}
          </motion.h3>
          <p className="text-slate-600 text-[15px] leading-relaxed mb-4">
            {feature.description}
          </p>

          {/* Animated "Learn more" link */}
          <motion.div
            className="flex items-center gap-2 text-sm font-semibold"
            initial={{ opacity: 0, x: -10 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              x: isHovered ? 0 : -10,
            }}
            transition={{ duration: 0.3 }}
          >
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${feature.iconGradient.start}, ${feature.iconGradient.end})`,
              }}
            >
              Learn more
            </span>
            <motion.svg
              className="w-4 h-4"
              style={{ stroke: feature.iconGradient.end }}
              fill="none"
              viewBox="0 0 24 24"
              animate={{
                x: isHovered ? 4 : 0,
              }}
              transition={{ duration: 0.3, repeat: Infinity, repeatType: 'reverse', repeatDelay: 0.5 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </motion.svg>
          </motion.div>
        </div>

        {/* Corner accent */}
        <motion.div
          className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at top right, ${feature.glowColor}, transparent 70%)`,
          }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function Features() {
  return (
    <section className="relative py-24 sm:py-28 md:py-32 bg-gradient-to-b from-white via-slate-50/30 to-white overflow-hidden">
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
