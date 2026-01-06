import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { BackToTop, SectionErrorBoundary } from '@/components/ui';
import { FeatureHero } from '@/components/sections/feature-pages';
import { RoleFeatures } from '@/components/sections/roles';
import Testimonials from '@/components/sections/Testimonials';
import CTA from '@/components/sections/CTA';
import {
  TrendingUp,
  Zap,
  Server,
  DollarSign,
  AlertCircle,
} from 'lucide-react';
import PainPoints from './PainPoints';
import StatsSection from './StatsSection';

export const metadata: Metadata = {
  title: 'For App Owners - Adapty | Accelerate Your Subscription Revenue',
  description: 'Focus on growing your app while Adapty handles the subscription complexity. Get enterprise-grade infrastructure without the enterprise price tag.',
  keywords: ['subscription revenue', 'app monetization', 'subscription management', 'in-app subscriptions', 'mobile app revenue', 'subscription analytics'],
  openGraph: {
    title: 'For App Owners - Adapty',
    description: 'Accelerate your subscription revenue with enterprise-grade infrastructure.',
    type: 'website',
    url: 'https://adapty.io/for-app-owners',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'For App Owners - Adapty',
    description: 'Accelerate your subscription revenue with enterprise-grade infrastructure.',
  },
};

const painPoints = [
  {
    icon: <AlertCircle className="w-6 h-6" />,
    question: 'Leaving money on the table with suboptimal pricing?',
  },
  {
    icon: <AlertCircle className="w-6 h-6" />,
    question: 'No time to build and maintain subscription infrastructure?',
  },
  {
    icon: <AlertCircle className="w-6 h-6" />,
    question: 'Need enterprise features but not enterprise budgets?',
  },
];

const features = [
  {
    icon: <TrendingUp className="w-7 h-7" />,
    title: 'Revenue optimization',
    description: 'A/B test pricing, offers, and paywalls to find optimal configurations. Data-driven decisions to maximize revenue.',
  },
  {
    icon: <Zap className="w-7 h-7" />,
    title: 'Quick integration',
    description: 'Go live in 30 minutes, not months. Well-documented SDKs and dedicated support to get you started fast.',
  },
  {
    icon: <Server className="w-7 h-7" />,
    title: 'Scalable infrastructure',
    description: '99.99% uptime, handles billions of events. Enterprise-grade reliability without the enterprise complexity.',
  },
  {
    icon: <DollarSign className="w-7 h-7" />,
    title: 'Transparent pricing',
    description: 'Pay based on revenue, not usage. Aligned incentives mean we succeed when you succeed.',
  },
];

export default function ForAppOwnersPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Header />
      <main>
        {/* Hero Section */}
        <SectionErrorBoundary sectionName="FeatureHero">
          <FeatureHero
            badge="FOR APP OWNERS"
            title="Accelerate your subscription revenue"
            titleHighlight="subscription revenue"
            description="Focus on growing your app while Adapty handles the subscription complexity. Get enterprise-grade infrastructure without the enterprise price tag."
            primaryCTA={{
              text: 'Start for free',
              href: 'https://adapty.io/signup/',
            }}
            secondaryCTA={{
              text: 'Schedule demo',
              href: '/demo',
            }}
          />
        </SectionErrorBoundary>

        {/* Pain Points */}
        <SectionErrorBoundary sectionName="PainPoints">
          <PainPoints painPoints={painPoints} />
        </SectionErrorBoundary>

        {/* Role Features */}
        <SectionErrorBoundary sectionName="RoleFeatures">
          <RoleFeatures
            title="Everything you need to grow revenue"
            subtitle="Focus on your product while we handle subscription infrastructure."
            features={features}
          />
        </SectionErrorBoundary>

        {/* Stats Section */}
        <SectionErrorBoundary sectionName="StatsSection">
          <StatsSection />
        </SectionErrorBoundary>

        {/* Testimonials */}
        <SectionErrorBoundary sectionName="Testimonials">
          <Testimonials />
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
