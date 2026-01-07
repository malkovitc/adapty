'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Header, Footer } from '@/components/layout';
import { BackToTop, SectionErrorBoundary } from '@/components/ui';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import EnterpriseSection from '@/components/sections/EnterpriseSection';
import CTA from '@/components/sections/CTA';
import { getAssetPath } from '@/lib/utils';
import EventTypesSection from '@/components/sections/EventTypesSection';
import SDKPlatformGrid from '@/components/sections/SDKPlatformGrid';

// Hero Section - Minimal (no subtitle, just title and CTAs)
function HeroSection() {
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

  return (
    <section className="relative w-full overflow-hidden bg-[#FAFAFA]">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-purple-100/60 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-bl from-blue-100/60 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-20 mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center"
        >
          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-8"
          >
            <span className="text-slate-900">Sync </span>
            <span className="bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">
              in-app subscriptions
            </span>
            <br />
            <span className="text-slate-900">with external services</span>
          </motion.h1>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="https://adapty.io/schedule-demo/"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-violet-600 to-pink-500 hover:from-violet-700 hover:to-pink-600 text-white font-semibold rounded-lg transition-all shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/30"
            >
              Book a demo
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="https://app.adapty.io/signup"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-900 font-medium rounded-lg border-2 border-slate-200 hover:border-slate-300 transition-all"
            >
              Start for free
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Integration Partners Grid
const integrationPartners = [
  { name: 'Amplitude', logo: '/logos/logo-amplitude.svg', category: 'Analytics' },
  { name: 'Mixpanel', logo: '/logos/logo-mixpanel.svg', category: 'Analytics' },
  { name: 'Firebase', logo: '/logos/logo-firebase.svg', category: 'Analytics' },
  { name: 'AppsFlyer', logo: '/logos/logo-appsflyer.svg', category: 'Attribution' },
  { name: 'Adjust', logo: '/logos/logo-adjust.svg', category: 'Attribution' },
  { name: 'Branch', logo: '/logos/logo-branch.svg', category: 'Attribution' },
  { name: 'Segment', logo: '/logos/logo-segment.svg', category: 'CDP' },
  { name: 'OneSignal', logo: '/logos/logo-onesignal.svg', category: 'Push' },
  { name: 'Braze', logo: '/logos/logo-braze.svg', category: 'Engagement' },
  { name: 'Airbridge', logo: '/logos/logo-airbridge.svg', category: 'Attribution' },
  { name: 'AppMetrica', logo: '/logos/logo-appmetrica.svg', category: 'Analytics' },
  { name: 'Asapty', logo: '/logos/logo-asapty.svg', category: 'ASO' },
  { name: 'Singular', logo: '/logos/logo-singular.svg', category: 'Attribution' },
  { name: 'Tenjin', logo: '/logos/logo-tenjin.svg', category: 'Attribution' },
  { name: 'PostHog', logo: '/logos/logo-posthog.svg', category: 'Analytics' },
  { name: 'Pushwoosh', logo: '/logos/logo-pushwoosh.svg', category: 'Push' },
  { name: 'SplitMetrics', logo: '/logos/logo-splitmetrics.svg', category: 'ASO' },
  { name: 'Amazon S3', logo: '/logos/logo-amazon-s3.svg', category: 'Storage' },
  { name: 'Google Cloud', logo: '/logos/logo-google-cloud.svg', category: 'Cloud' },
  { name: 'Stripe', logo: '/logos/logo-stripe.svg', category: 'Payments' },
  { name: 'Facebook', logo: '/logos/logo-facebook.svg', category: 'Ads' },
  { name: 'Webhooks', logo: '/logos/logo-webhooks.svg', category: 'Custom' },
];

function IntegrationGrid() {
  return (
    <Section size="lg" background="white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Connect with your favorite tools
          </h2>
          <p className="text-lg text-slate-500 max-w-3xl mx-auto">
            Adapty integrates with 20+ analytics, attribution, and marketing platforms to sync your subscription data automatically.
          </p>
        </motion.div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6">
          {integrationPartners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.03 }}
              className="group flex flex-col items-center p-4 bg-white rounded-xl border border-slate-200 hover:border-violet-300 hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 mb-3 flex items-center justify-center">
                <Image
                  src={getAssetPath(partner.logo)}
                  alt={partner.name}
                  width={48}
                  height={48}
                  className="w-10 h-10 object-contain grayscale group-hover:grayscale-0 transition-all"
                  unoptimized
                />
              </div>
              <span className="text-sm font-medium text-slate-700 text-center">{partner.name}</span>
              <span className="text-xs text-slate-400 mt-1">{partner.category}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-10"
        >
          <Link
            href="https://docs.adapty.io/docs/integrations"
            className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 font-medium transition-colors"
          >
            View all integrations
            <ExternalLink className="w-4 h-4" />
          </Link>
        </motion.div>
      </Container>
    </Section>
  );
}

// Event Types Section
const eventTypes = [
  'Subscription started',
  'Subscription renewed',
  'Trial started',
  'Trial converted',
  'Trial cancelled',
  'Subscription cancelled',
  'Subscription expired',
  'Billing issue detected',
  'Billing issue resolved',
  'Grace period started',
  'Refund requested',
  'Offer redeemed',
];

const sdkPlatforms = [
  { id: 'swift', name: 'Swift', logo: '/logos/logo-swift.svg', description: 'iOS native' },
  { id: 'kotlin', name: 'Kotlin', logo: '/logos/logo-kotlin.svg', description: 'Android native' },
  { id: 'react-native', name: 'React Native', logo: '/logos/logo-react-native.svg', description: 'Cross-platform' },
  { id: 'flutter', name: 'Flutter', logo: '/logos/logo-flutter.svg', description: 'Cross-platform' },
  { id: 'unity', name: 'Unity', logo: '/logos/logo-unity.svg', description: 'Game engine' },
  { id: 'capacitor', name: 'Capacitor', logo: '/logos/logo-capacitor.svg', description: 'Web apps' },
  { id: 'kmp', name: 'KMP', logo: '/logos/logo-kotlin.svg', description: 'Kotlin Multiplatform' },
  { id: 'flutterflow', name: 'FlutterFlow', logo: '/logos/logo-flutterflow.svg', description: 'No-code' },
  { id: 'web-api', name: 'Web API', logo: '/logos/logo-api.svg', description: 'REST API' },
  { id: 'stripe', name: 'Stripe', logo: '/logos/logo-stripe.svg', description: 'Web payments' },
];

// Main Page Component
export default function IntegrationsPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Header />
      <main>
        {/* Hero Section - Minimal */}
        <SectionErrorBoundary sectionName="Hero">
          <HeroSection />
        </SectionErrorBoundary>

        {/* Integration Partners Grid */}
        <SectionErrorBoundary sectionName="IntegrationGrid">
          <IntegrationGrid />
        </SectionErrorBoundary>

        {/* Event Types Section */}
        <SectionErrorBoundary sectionName="EventTypes">
          <EventTypesSection
            events={eventTypes}
            image={{
              src: '/images/features/subscription-analytics@2x.webp',
              alt: 'Subscription events dashboard',
            }}
            title="Send any subscription event"
            description="Adapty tracks all subscription lifecycle events and sends them to your integrations in real-time. Use this data to trigger automations, personalize campaigns, and optimize your monetization strategy."
          />
        </SectionErrorBoundary>

        {/* SDK Platform Grid */}
        <SectionErrorBoundary sectionName="SDKPlatformGrid">
          <SDKPlatformGrid
            platforms={sdkPlatforms}
          />
        </SectionErrorBoundary>

        {/* G2 Badges (from EnterpriseSection) */}
        <SectionErrorBoundary sectionName="Enterprise">
          <EnterpriseSection />
        </SectionErrorBoundary>

        {/* Final CTA */}
        <SectionErrorBoundary sectionName="CTA">
          <CTA />
        </SectionErrorBoundary>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
