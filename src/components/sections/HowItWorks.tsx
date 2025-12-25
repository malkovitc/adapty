'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useState } from 'react';

const steps = [
  {
    number: 1,
    title: 'Install SDK',
    description: 'Add Adapty SDK to your iOS, Android, Flutter, React Native or Unity app',
    gradient: 'from-indigo-500 to-indigo-500',
    iconBg: 'from-purple-50 to-purple-100',
    badge: '~5 min',
    badgeColor: 'from-indigo-500 to-indigo-500',
  },
  {
    number: 2,
    title: 'Configure Products',
    description: 'Set up your subscription products and pricing in the dashboard',
    gradient: 'from-blue-500 to-blue-600',
    iconBg: 'from-blue-50 to-blue-100',
    badge: '~10 min',
    badgeColor: 'from-blue-500 to-blue-600',
  },
  {
    number: 3,
    title: 'Build Paywalls',
    description: 'Design beautiful paywalls with our no-code builder',
    gradient: 'from-indigo-500 to-indigo-600',
    iconBg: 'from-indigo-50 to-indigo-100',
    badge: 'No code',
    badge2: '~15 min',
    badgeColor: 'from-indigo-500 to-indigo-600',
  },
  {
    number: 4,
    title: 'Grow Revenue',
    description: 'A/B test, analyze, and optimize your monetization',
    gradient: 'from-violet-500 to-violet-600',
    iconBg: 'from-violet-50 to-violet-100',
    badge: 'Real-time',
    badgeColor: 'from-violet-500 to-violet-600',
  },
];

// Code snippets for different platforms
const codeSnippets = {
  swift: `import Adapty

Adapty.activate("YOUR_API_KEY")`,
  kotlin: `import com.adapty.Adapty

Adapty.activate(applicationContext,
    "YOUR_API_KEY")`,
  flutter: `import 'package:adapty_flutter/adapty_flutter.dart';

await Adapty().activate(
    sdkKey: "YOUR_API_KEY");`,
  reactNative: `import { adapty } from 'react-native-adapty';

await adapty.activate(
    "YOUR_API_KEY");`,
};

// Step 1: SDK Installation Component
function SDKInstallation() {
  const [activeTab, setActiveTab] = useState<'swift' | 'kotlin' | 'flutter' | 'reactNative'>('swift');

  const platforms = [
    { id: 'swift' as const, name: 'Swift', icon: '🍎' },
    { id: 'kotlin' as const, name: 'Kotlin', icon: '🤖' },
    { id: 'flutter' as const, name: 'Flutter', icon: '💙' },
    { id: 'reactNative' as const, name: 'React Native', icon: '⚛️' },
  ];

  return (
    <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
      {/* Tabs */}
      <div className="flex border-b border-slate-800 bg-slate-800/50">
        {platforms.map((platform) => (
          <button
            key={platform.id}
            onClick={() => setActiveTab(platform.id)}
            className={`flex-1 px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium transition-colors relative ${
              activeTab === platform.id
                ? 'text-white bg-slate-900'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            <span className="flex items-center justify-center gap-1.5 sm:gap-2">
              <span className="text-sm sm:text-base">{platform.icon}</span>
              <span className="hidden sm:inline">{platform.name}</span>
            </span>
            {activeTab === platform.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-blue-500"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Code content */}
      <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <pre className="text-slate-300 whitespace-pre-wrap break-words">
            <code>{codeSnippets[activeTab]}</code>
          </pre>
        </motion.div>
      </div>

      {/* Footer with copy button */}
      <div className="px-4 sm:px-6 py-3 bg-slate-800/30 border-t border-slate-800 flex justify-between items-center">
        <span className="text-xs text-slate-500">Installation code</span>
        <button className="text-xs text-indigo-400 hover:text-purple-300 transition-colors">
          Copy
        </button>
      </div>
    </div>
  );
}

// Step 2: Dashboard Configuration Component
function DashboardConfig() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 sm:px-6 py-4 border-b border-slate-200">
        <h4 className="text-sm font-semibold text-slate-900">Product Configuration</h4>
      </div>

      {/* Form fields */}
      <div className="p-4 sm:p-6 space-y-4">
        {/* Product Name */}
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-2">
            Product Name
          </label>
          <div className="bg-slate-50 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 border border-slate-200">
            <span className="text-sm text-slate-900">Premium Monthly</span>
          </div>
        </div>

        {/* Price */}
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-2">
            Price
          </label>
          <div className="bg-slate-50 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 border border-slate-200 flex items-center gap-2">
            <span className="text-sm text-slate-900">$</span>
            <span className="text-sm text-slate-900 font-semibold">9.99</span>
            <span className="text-xs text-slate-500 ml-auto">USD</span>
          </div>
        </div>

        {/* Subscription Period */}
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-2">
            Subscription Period
          </label>
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between">
            <span className="text-sm text-white font-medium">Monthly</span>
            <Check className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Features list */}
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-2">
            Features Included
          </label>
          <div className="space-y-2">
            {['Unlimited access', 'Priority support', 'Advanced analytics'].map((feature, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center">
                  <Check className="w-3 h-3 text-blue-600" />
                </div>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 sm:px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
        <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-medium rounded-lg hover:shadow-lg transition-shadow">
          Save Product
        </button>
      </div>
    </div>
  );
}

// Step 3: Paywall Builder Component
function PaywallBuilder() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
      {/* Toolbar */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-4 sm:px-6 py-3 border-b border-slate-200 flex items-center justify-between">
        <h4 className="text-sm font-semibold text-slate-900">Paywall Builder</h4>
        <div className="flex gap-2">
          <div className="w-6 h-6 rounded bg-white border border-slate-200 flex items-center justify-center">
            <div className="w-3 h-3 border-2 border-slate-400 rounded-sm" />
          </div>
          <div className="w-6 h-6 rounded bg-white border border-slate-200 flex items-center justify-center">
            <div className="w-3 h-0.5 bg-slate-400" />
          </div>
        </div>
      </div>

      {/* Paywall preview */}
      <div className="p-4 sm:p-6 bg-gradient-to-br from-indigo-500 to-indigo-500">
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-xl">
          {/* Title */}
          <div className="text-center mb-4">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">
              Unlock Premium
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Get unlimited access to all features
            </p>
          </div>

          {/* Features */}
          <div className="space-y-2 mb-4">
            {['Ad-free experience', 'Offline mode', 'Premium content'].map((feature, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-500 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-xs sm:text-sm text-slate-700">{feature}</span>
              </div>
            ))}
          </div>

          {/* Price button */}
          <button className="w-full bg-gradient-to-r from-indigo-500 to-indigo-500 text-white font-semibold py-3 sm:py-4 rounded-xl text-sm sm:text-base shadow-lg hover:shadow-xl transition-shadow">
            Start Free Trial
          </button>

          <p className="text-center text-xs text-slate-500 mt-3">
            $9.99/month after trial
          </p>
        </div>
      </div>

      {/* Properties panel */}
      <div className="px-4 sm:px-6 py-3 bg-slate-50 border-t border-slate-200">
        <div className="flex items-center gap-4 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-indigo-500 rounded" />
            <span>Colors</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 border-2 border-slate-400 rounded" />
            <span>Layout</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-slate-300 rounded" />
            <span>Content</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Step 4: Analytics Component
function AnalyticsDashboard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-50 to-purple-50 px-4 sm:px-6 py-4 border-b border-slate-200">
        <h4 className="text-sm font-semibold text-slate-900">Revenue Analytics</h4>
      </div>

      {/* Metrics */}
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
          {/* MRR */}
          <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl p-3 sm:p-4 border border-violet-100">
            <div className="text-xs text-slate-600 mb-1">MRR</div>
            <div className="text-xl sm:text-2xl font-bold text-violet-600">$24.5K</div>
            <div className="flex items-center gap-1 mt-1">
              <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 3l7 7-1.41 1.41L11 6.83V17H9V6.83L4.41 11.41 3 10l7-7z" />
              </svg>
              <span className="text-xs font-medium text-green-600">+12.5%</span>
            </div>
          </div>

          {/* Conversion */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-3 sm:p-4 border border-blue-100">
            <div className="text-xs text-slate-600 mb-1">Conversion</div>
            <div className="text-xl sm:text-2xl font-bold text-blue-600">8.4%</div>
            <div className="flex items-center gap-1 mt-1">
              <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 3l7 7-1.41 1.41L11 6.83V17H9V6.83L4.41 11.41 3 10l7-7z" />
              </svg>
              <span className="text-xs font-medium text-green-600">+2.1%</span>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="relative h-32 sm:h-40">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-slate-500 pr-2">
            <span>30K</span>
            <span>20K</span>
            <span>10K</span>
            <span>0</span>
          </div>

          {/* Chart area */}
          <div className="absolute left-8 right-0 top-0 bottom-6">
            <svg className="w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="none">
              {/* Grid lines */}
              <line x1="0" y1="25" x2="200" y2="25" stroke="#e5e7eb" strokeWidth="0.5" />
              <line x1="0" y1="50" x2="200" y2="50" stroke="#e5e7eb" strokeWidth="0.5" />
              <line x1="0" y1="75" x2="200" y2="75" stroke="#e5e7eb" strokeWidth="0.5" />

              {/* Gradient fill */}
              <defs>
                <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.05" />
                </linearGradient>
              </defs>

              {/* Area under curve */}
              <path
                d="M0,85 L20,78 L40,72 L60,68 L80,58 L100,52 L120,48 L140,42 L160,35 L180,25 L200,20 L200,100 L0,100 Z"
                fill="url(#chartGradient)"
              />

              {/* Line */}
              <path
                d="M0,85 L20,78 L40,72 L60,68 L80,58 L100,52 L120,48 L140,42 L160,35 L180,25 L200,20"
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth="2"
                strokeLinecap="round"
              />

              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
              </defs>

              {/* Data points */}
              {[0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200].map((x, i) => {
                const y = [85, 78, 72, 68, 58, 52, 48, 42, 35, 25, 20][i];
                return (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r="2"
                    fill="#8b5cf6"
                    className="drop-shadow-sm"
                  />
                );
              })}
            </svg>
          </div>

          {/* X-axis labels */}
          <div className="absolute left-8 right-0 bottom-0 flex justify-between text-xs text-slate-500">
            <span>Jan</span>
            <span>Apr</span>
            <span>Jul</span>
            <span>Oct</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 sm:px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
        <span className="text-xs text-slate-600">Last updated: just now</span>
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
      </div>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-16 sm:py-20 md:py-24 bg-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-gradient-to-br from-purple-100/40 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-blue-100/40 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm font-semibold uppercase tracking-wider text-[#6366F1] mb-4"
          >
            How It Works
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6"
          >
            Get started in{' '}
            <span className="bg-gradient-to-r from-indigo-500 to-blue-600 bg-clip-text text-transparent">
              four simple steps
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg md:text-xl text-slate-600"
            style={{ maxWidth: '48rem', margin: '0 auto' }}
          >
            Integrate Adapty into your app and start growing your subscription revenue
          </motion.p>
        </div>

        {/* Steps */}
        <div className="relative max-w-5xl mx-auto">
          {/* Connecting line - desktop only with animated draw effect */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2">
            {/* Static line */}
            <svg
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="none"
              viewBox="0 0 2 100"
            >
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#6366F1" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#6366F1" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              <line
                x1="1"
                y1="5"
                x2="1"
                y2="95"
                stroke="url(#lineGradient)"
                strokeWidth="2"
                strokeDasharray="8 8"
              />
            </svg>

            {/* Animated flowing dots */}
            <motion.div
              className="absolute top-0 left-1/2 w-3 h-3 -translate-x-1/2"
              animate={{
                y: ['0%', '100%'],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
                times: [0, 0.1, 0.9, 1],
              }}
            >
              <div className="w-full h-full rounded-full bg-indigo-500 shadow-lg shadow-indigo-500/50" />
            </motion.div>

            {/* Second animated dot with delay */}
            <motion.div
              className="absolute top-0 left-1/2 w-2 h-2 -translate-x-1/2"
              animate={{
                y: ['0%', '100%'],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
                delay: 1.5,
                times: [0, 0.1, 0.9, 1],
              }}
            >
              <div className="w-full h-full rounded-full bg-blue-500 shadow-lg shadow-blue-500/50" />
            </motion.div>
          </div>

          {/* Steps list */}
          <div className="space-y-16 lg:space-y-24">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`relative grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                  index % 2 === 0 ? '' : 'lg:grid-flow-col-dense'
                }`}
              >
                {/* Number circle - mobile/tablet vertical line */}
                <div className="lg:hidden absolute left-6 top-20 bottom-0 w-0.5 -mb-16 last:hidden">
                  <svg
                    className="absolute inset-0 w-full h-full"
                    preserveAspectRatio="none"
                    viewBox="0 0 2 100"
                  >
                    <line
                      x1="1"
                      y1="0"
                      x2="1"
                      y2="100"
                      stroke="#6366F1"
                      strokeWidth="2"
                      strokeDasharray="8 8"
                      strokeOpacity="0.3"
                    />
                  </svg>
                </div>

                {/* Content */}
                <div
                  className={`relative ${
                    index % 2 === 0 ? 'lg:col-start-1' : 'lg:col-start-2'
                  }`}
                >
                  <div className="flex lg:flex-col items-start gap-6">
                    {/* Number badge */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.6,
                        delay: index * 0.15 + 0.2,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="relative shrink-0 w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-[#6366F1] flex items-center justify-center shadow-lg shadow-indigo-500/30 z-10"
                    >
                      <span className="text-xl lg:text-2xl font-bold text-white">
                        {step.number}
                      </span>

                      {/* Animated ring */}
                      <motion.div
                        initial={{ scale: 1, opacity: 0.5 }}
                        animate={{ scale: 1.3, opacity: 0 }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 1,
                          ease: 'easeOut',
                        }}
                        className="absolute inset-0 rounded-full border-2 border-[#6366F1]"
                      />
                    </motion.div>

                    {/* Text content */}
                    <div className="flex-1 pt-1 lg:pt-0">
                      <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-base lg:text-lg text-slate-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Visual component */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.15 + 0.3,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`relative ${
                    index % 2 === 0 ? 'lg:col-start-2' : 'lg:col-start-1'
                  }`}
                >
                  <div className="relative ml-12 lg:ml-0">
                    {/* Multi-layer glow effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${step.gradient} opacity-20 rounded-3xl blur-2xl transition-all duration-700`} />
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-10 rounded-3xl blur-xl transition-all duration-700`} />

                    {/* Badge(s) */}
                    <div className="absolute -top-3 -right-3 z-20 flex gap-2">
                      <span className={`px-3 py-1.5 bg-gradient-to-r ${step.badgeColor} text-white text-xs font-semibold rounded-full shadow-lg`}>
                        {step.badge}
                      </span>
                      {step.badge2 && (
                        <span className={`px-3 py-1.5 bg-gradient-to-r ${step.badgeColor} text-white text-xs font-semibold rounded-full shadow-lg`}>
                          {step.badge2}
                        </span>
                      )}
                    </div>

                    {/* Component container */}
                    <div className="relative">
                      {step.number === 1 && <SDKInstallation />}
                      {step.number === 2 && <DashboardConfig />}
                      {step.number === 3 && <PaywallBuilder />}
                      {step.number === 4 && <AnalyticsDashboard />}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 min-h-[48px] bg-[#6366F1] hover:bg-[#4F46E5] text-white rounded-xl font-semibold transition-all shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:scale-105 touch-manipulation text-base sm:text-lg"
          >
            Get started for free
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
