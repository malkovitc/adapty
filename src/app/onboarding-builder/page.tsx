import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { BackToTop, SectionErrorBoundary } from '@/components/ui';
import { FeatureHero, FeatureGrid } from '@/components/sections/feature-pages';
import Testimonials from '@/components/sections/Testimonials';
import CTA from '@/components/sections/CTA';
import {
  MousePointerClick,
  UserCog,
  FlaskConical,
  LineChart,
  RefreshCw,
  Languages,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Onboarding Builder - Adapty | Build User Onboarding Flows That Convert',
  description: 'Create personalized onboarding experiences with drag-and-drop. A/B test user flows to maximize activation and conversion rates.',
  keywords: ['onboarding builder', 'user onboarding', 'onboarding flow', 'mobile app onboarding', 'user activation', 'conversion optimization'],
  openGraph: {
    title: 'Onboarding Builder - Adapty',
    description: 'Build user onboarding flows that convert. Create personalized experiences with drag-and-drop.',
    type: 'website',
    url: 'https://adapty.io/onboarding-builder',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Onboarding Builder - Adapty',
    description: 'Build user onboarding flows that convert. Create personalized experiences with drag-and-drop.',
  },
};

const features = [
  {
    icon: <MousePointerClick className="w-6 h-6" />,
    title: 'Drag-and-drop builder',
    description: 'Create onboarding flows visually without writing code. Build multi-step experiences in minutes.',
  },
  {
    icon: <UserCog className="w-6 h-6" />,
    title: 'Personalization',
    description: 'Tailor experiences based on user attributes, behavior, and acquisition source.',
  },
  {
    icon: <FlaskConical className="w-6 h-6" />,
    title: 'A/B testing',
    description: 'Test different flows to find what works best for different user segments.',
  },
  {
    icon: <LineChart className="w-6 h-6" />,
    title: 'Analytics',
    description: 'Track completion rates and drop-off points to optimize every step of your flow.',
  },
  {
    icon: <RefreshCw className="w-6 h-6" />,
    title: 'Remote updates',
    description: 'Update flows without app releases. Iterate quickly based on user feedback.',
  },
  {
    icon: <Languages className="w-6 h-6" />,
    title: 'Multi-language',
    description: 'Support localized onboarding experiences for users around the world.',
  },
];

export default function OnboardingBuilderPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Header />
      <main>
        {/* Hero Section */}
        <SectionErrorBoundary sectionName="FeatureHero">
          <FeatureHero
            badge="ONBOARDING BUILDER"
            title="Build user onboarding flows that convert"
            titleHighlight="onboarding flows"
            description="Create personalized onboarding experiences with drag-and-drop. A/B test user flows to maximize activation and conversion."
            primaryCTA={{
              text: 'Start building',
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
            title="Everything you need to create great first impressions"
            subtitle="From design to analytics, build onboarding experiences that activate and convert users."
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
