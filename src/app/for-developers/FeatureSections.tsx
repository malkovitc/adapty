'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Github, Star, RefreshCw, Shield, Zap, Smartphone, Code2, Cloud, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getAssetPath } from '@/lib/utils';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';

// Integration Workflow Visualization Component
function IntegrationWorkflow() {
  // Animation variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const nodeVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0, 0, 0.2, 1] as const },
    },
  };

  const labelVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay: 0.3 },
    },
  };

  return (
    <motion.div
      className="relative w-full h-full min-h-[320px] flex items-center justify-center p-4"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* SVG for connection lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Gradient for animated line */}
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="1" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.2" />
          </linearGradient>

          {/* Animated dash pattern */}
          <pattern id="movingDots" patternUnits="userSpaceOnUse" width="12" height="4">
            <circle cx="2" cy="2" r="1.5" fill="#8b5cf6" opacity="0.6">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" />
            </circle>
          </pattern>
        </defs>

        {/* Horizontal connections - Top row */}
        {/* App to SDK */}
        <g>
          <line x1="95" y1="80" x2="165" y2="80" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4 4" />
          <line x1="95" y1="80" x2="165" y2="80" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="4 4" className="animate-dash" style={{ strokeDashoffset: 0 }} />
        </g>

        {/* SDK to Server */}
        <g>
          <line x1="235" y1="80" x2="305" y2="80" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4 4" />
          <line x1="235" y1="80" x2="305" y2="80" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="4 4" className="animate-dash" style={{ strokeDashoffset: 0 }} />
        </g>

        {/* Vertical connections */}
        {/* App down */}
        <g>
          <line x1="60" y1="110" x2="60" y2="160" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4 4" />
          <line x1="60" y1="110" x2="60" y2="160" stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" className="animate-dash" />
        </g>

        {/* SDK down */}
        <g>
          <line x1="200" y1="110" x2="200" y2="160" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4 4" />
          <line x1="200" y1="110" x2="200" y2="160" stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" className="animate-dash" />
        </g>

        {/* Server down */}
        <g>
          <line x1="340" y1="110" x2="340" y2="160" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4 4" />
          <line x1="340" y1="110" x2="340" y2="160" stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" className="animate-dash" />
        </g>

        {/* Bottom connection to stores */}
        <g>
          <path d="M 60 220 Q 60 250, 140 250 L 260 250 Q 340 250, 340 220" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M 60 220 Q 60 250, 140 250 L 260 250 Q 340 250, 340 220" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" className="animate-dash" />
        </g>

        {/* Store icons connection line */}
        <g>
          <line x1="200" y1="250" x2="200" y2="275" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4 4" />
          <line x1="200" y1="250" x2="200" y2="275" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" className="animate-dash" />
        </g>
      </svg>

      {/* Nodes container */}
      <div className="relative w-full max-w-[400px] mx-auto">
        {/* Top row - Main flow */}
        <div className="flex justify-between items-start mb-4">
          {/* Your App Node */}
          <motion.div variants={nodeVariants} className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Smartphone className="w-7 h-7 text-white" />
            </div>
            <span className="mt-2 text-xs font-medium text-slate-700">Your App</span>
          </motion.div>

          {/* Adapty SDK Node */}
          <motion.div variants={nodeVariants} className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/30 animate-pulse-glow">
              <Code2 className="w-7 h-7 text-white" />
            </div>
            <span className="mt-2 text-xs font-medium text-slate-700">Adapty SDK</span>
          </motion.div>

          {/* Adapty Server Node */}
          <motion.div variants={nodeVariants} className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <Cloud className="w-7 h-7 text-white" />
            </div>
            <span className="mt-2 text-xs font-medium text-slate-700">Adapty Server</span>
          </motion.div>
        </div>

        {/* Middle row - Actions */}
        <div className="flex justify-between items-center my-6 px-1">
          <motion.div variants={labelVariants} className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center">
              <Zap className="w-5 h-5 text-blue-600" />
            </div>
            <span className="mt-1.5 text-[10px] text-slate-500 text-center leading-tight">User<br />Action</span>
          </motion.div>

          <motion.div variants={labelVariants} className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-lg bg-violet-50 border border-violet-200 flex items-center justify-center">
              <Shield className="w-5 h-5 text-violet-600" />
            </div>
            <span className="mt-1.5 text-[10px] text-slate-500 text-center leading-tight">Validation</span>
          </motion.div>

          <motion.div variants={labelVariants} className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center">
              <RefreshCw className="w-5 h-5 text-emerald-600" />
            </div>
            <span className="mt-1.5 text-[10px] text-slate-500 text-center leading-tight">Store<br />Sync</span>
          </motion.div>
        </div>

        {/* Bottom row - Stores */}
        <motion.div
          variants={nodeVariants}
          className="flex justify-center items-center gap-3 mt-8"
        >
          <div className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl border border-slate-200 shadow-sm">
            <Image
              src={getAssetPath('/logos/apple.svg')}
              alt="App Store"
              width={20}
              height={20}
              className="w-5 h-5"
              unoptimized
            />
            <Image
              src={getAssetPath('/logos/google-play.svg')}
              alt="Google Play"
              width={20}
              height={20}
              className="w-5 h-5"
              unoptimized
            />
            <span className="text-xs font-medium text-slate-600 ml-1">App Stores</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-2 bg-amber-50 rounded-lg border border-amber-200">
            <CheckCircle2 className="w-4 h-4 text-amber-600" />
            <span className="text-[10px] font-medium text-amber-700">Receipt Validated</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// SDK Platform data with GitHub stars (approximate)
const sdkPlatforms = [
  { name: 'Swift SDK', href: 'https://github.com/adaptyteam/AdaptySDK-iOS', icon: '/logos/icon-swift-64x64-1.svg', stars: '450', framework: 'StoreKit 2' },
  { name: 'Kotlin SDK', href: 'https://github.com/adaptyteam/AdaptySDK-Android', icon: '/logos/icon-kotlin-64x64-1.svg', stars: '380', framework: 'Google Play Billing Library 7+' },
  { name: 'React Native SDK', href: 'https://github.com/adaptyteam/AdaptySDK-React-Native', icon: '/logos/icon-react-native-64x64-1.svg', stars: '320' },
  { name: 'Unity SDK', href: 'https://github.com/adaptyteam/AdaptySDK-Unity', icon: '/logos/icon-unity-64x64-1.svg', stars: '180' },
  { name: 'Flutter SDK', href: 'https://github.com/adaptyteam/AdaptySDK-Flutter', icon: '/logos/icon-flutter-64x64-1.svg', stars: '290' },
  { name: 'FlutterFlow', href: 'https://adapty.io/sdk/flutterflow/', icon: '/logos/icon-flutterflow-64x64-1.svg' },
  { name: 'Capacitor SDK', href: 'https://adapty.io/sdk/capacitor/', icon: '/logos/capacitor-logo.svg' },
  { name: 'KMP SDK', href: 'https://adapty.io/sdk/kmp/', icon: '/logos/icon-kotlin-64x64-1.svg' },
  { name: 'Stripe SDK', href: 'https://adapty.io/integrations/stripe/', icon: '/logos/icon-stripe-64x64-1.svg' },
];

export function QuickIntegration() {
  return (
    <Section size="lg" background="gray">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
              Quick integration in just a couple of hours
            </h2>
            <p className="text-lg text-slate-500 mb-8 leading-relaxed">
              Add products from AppStore Connect, Google Play, or Stripe. Then, create Adapty paywalls,
              integrate our SDK, and start selling subscriptions - all without complex backend setup.
            </p>
            <ul className="space-y-4 mb-8">
              {[
                'Connect your app stores in minutes',
                'Pre-built UI components for paywalls',
                'Automatic receipt validation',
                'Real-time subscription status sync',
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-3 text-slate-700"
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Zap className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  {item}
                </motion.li>
              ))}
            </ul>
            <Link
              href="https://docs.adapty.io/docs/quickstart"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 font-medium transition-colors group"
            >
              Read the quick start guide
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-4">
              <div className="bg-gradient-to-br from-violet-50 to-blue-50 rounded-xl overflow-hidden">
                <IntegrationWorkflow />
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}

export function CrossPlatformSync() {
  return (
    <Section size="lg" background="white">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="order-2 lg:order-1"
          >
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center justify-center gap-8 py-8">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                    <Image
                      src={getAssetPath('/logos/apple.svg')}
                      alt="Apple"
                      width={32}
                      height={32}
                      className="w-8 h-8"
                      unoptimized
                    />
                  </div>
                  <p className="text-sm text-slate-600">iOS</p>
                </div>
                <RefreshCw className="w-8 h-8 text-violet-500" />
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                    <Image
                      src={getAssetPath('/logos/google-play.svg')}
                      alt="Android"
                      width={32}
                      height={32}
                      className="w-8 h-8"
                      unoptimized
                    />
                  </div>
                  <p className="text-sm text-slate-600">Android</p>
                </div>
                <RefreshCw className="w-8 h-8 text-violet-500" />
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                    <Image
                      src={getAssetPath('/logos/icon-stripe-64x64-1.svg')}
                      alt="Stripe"
                      width={32}
                      height={32}
                      className="w-8 h-8"
                      unoptimized
                    />
                  </div>
                  <p className="text-sm text-slate-600">Web</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
              Cross-platform subscriber sync
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed">
              Adapty SDKs automatically sync subscribers across all platforms - iOS, Android, and Web.
              Users can start a subscription on one device and seamlessly continue on another without
              any additional implementation.
            </p>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}

export function SLASection() {
  return (
    <Section size="lg" background="dark">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Highest SLA in the industry: 99.99% and growing
            </h2>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Adapty SDK and servers are battle-tested by some of the largest apps in the world.
              Our infrastructure handles billions of API calls monthly with enterprise-grade reliability.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                <div className="text-3xl font-bold text-white mb-1">99.99%</div>
                <p className="text-sm text-slate-400">Uptime SLA</p>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                <div className="text-3xl font-bold text-white mb-1">60B+</div>
                <p className="text-sm text-slate-400">API calls/month</p>
              </div>
            </div>
            <Link
              href="https://status.adapty.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 text-violet-400 hover:text-violet-300 font-medium transition-colors group"
            >
              View status page
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-slate-800 rounded-2xl border border-slate-700 p-8">
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center">
                    <Shield className="w-12 h-12 text-white" />
                  </div>
                  <p className="text-2xl font-bold text-white mb-2">100% Uptime</p>
                  <p className="text-slate-400">Last 90 days</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}

export function SDKsGrid() {
  return (
    <Section size="lg" background="gray">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Well-maintained SDK for each platform
          </h2>
          <p className="text-lg text-slate-500 max-w-3xl mx-auto">
            Our SDKs are open-source, actively maintained, and built with modern frameworks like StoreKit 2 and Google Play Billing Library 7+.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {sdkPlatforms.map((sdk, index) => (
            <motion.div
              key={sdk.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Link
                href={sdk.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center justify-center p-6 bg-white hover:bg-slate-50 rounded-xl border border-slate-200 hover:border-violet-300 transition-all duration-300 min-h-[160px] hover:shadow-lg"
              >
                <div className="mb-3 h-12 flex items-center justify-center">
                  <Image
                    src={getAssetPath(sdk.icon)}
                    alt={sdk.name}
                    width={48}
                    height={48}
                    className="object-contain"
                    unoptimized
                  />
                </div>
                <h3 className="text-sm font-medium text-slate-900 group-hover:text-violet-600 transition-colors text-center mb-2">
                  {sdk.name}
                </h3>
                {sdk.stars && (
                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span>{sdk.stars}</span>
                  </div>
                )}
                {sdk.framework && (
                  <p className="text-xs text-slate-400 mt-1 text-center">{sdk.framework}</p>
                )}
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-8"
        >
          <Link
            href="https://github.com/adaptyteam"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-slate-700 hover:text-slate-900 font-medium transition-colors group"
          >
            <Github className="w-5 h-5" />
            View all on GitHub
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </Container>
    </Section>
  );
}
