import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { BackToTop, SectionErrorBoundary } from '@/components/ui';
import { FeatureHero, FeatureGrid } from '@/components/sections/feature-pages';
import Testimonials from '@/components/sections/Testimonials';
import CTA from '@/components/sections/CTA';
import {
  Paintbrush,
  LayoutTemplate,
  Smartphone,
  FlaskConical,
  RefreshCw,
  Globe,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Paywall Builder - Adapty | No-Code Paywall Design for Mobile Apps',
  description: 'Design, customize, and deploy beautiful paywalls without writing code. Convert more users with A/B tested designs and remote updates.',
  keywords: ['paywall builder', 'no-code paywall', 'in-app purchases', 'mobile app monetization', 'paywall design', 'subscription paywall'],
  openGraph: {
    title: 'Paywall Builder - Adapty',
    description: 'Create stunning paywalls for your app without writing code. Convert more users with A/B tested designs.',
    type: 'website',
    url: 'https://adapty.io/paywall-builder',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paywall Builder - Adapty',
    description: 'Create stunning paywalls for your app without writing code. Convert more users with A/B tested designs.',
  },
};

const features = [
  {
    icon: <Paintbrush className="w-6 h-6" />,
    title: 'No-code builder',
    description: 'Design paywalls visually without engineering resources. Drag, drop, and customize every element.',
  },
  {
    icon: <LayoutTemplate className="w-6 h-6" />,
    title: 'Template library',
    description: 'Start from proven high-converting templates designed by monetization experts.',
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: 'Real-time preview',
    description: 'See exactly how your paywall looks on iOS and Android before publishing.',
  },
  {
    icon: <FlaskConical className="w-6 h-6" />,
    title: 'A/B testing built-in',
    description: 'Test different designs to maximize conversions with statistical significance.',
  },
  {
    icon: <RefreshCw className="w-6 h-6" />,
    title: 'Remote updates',
    description: 'Change paywalls instantly without app updates or App Store review.',
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: 'Localization',
    description: 'Support multiple languages and currencies to reach global audiences.',
  },
];

export default function PaywallBuilderPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Header />
      <main>
        {/* Hero Section */}
        <SectionErrorBoundary sectionName="FeatureHero">
          <FeatureHero
            badge="PAYWALL BUILDER"
            title="Create stunning paywalls for your app"
            titleHighlight="paywalls"
            description="Design, customize, and deploy beautiful paywalls without writing code. Convert more users with A/B tested designs."
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

        {/* Features Grid */}
        <SectionErrorBoundary sectionName="FeatureGrid">
          <FeatureGrid
            features={features}
            columns={3}
            title="Everything you need to build high-converting paywalls"
            subtitle="From design to deployment, Adapty gives you all the tools to maximize your subscription revenue."
          />
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
