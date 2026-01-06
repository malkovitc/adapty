import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { BackToTop, SectionErrorBoundary } from '@/components/ui';
import { FeatureHero, FeatureGrid } from '@/components/sections/feature-pages';
import Testimonials from '@/components/sections/Testimonials';
import CTA from '@/components/sections/CTA';
import {
  Code2,
  SlidersHorizontal,
  BarChart3,
  Trophy,
  Users,
  TrendingUp,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Paywall A/B Testing - Adapty | Double Your Revenue with Data-Driven Testing',
  description: 'Test prices, designs, and offers without code changes. Make data-driven decisions to maximize your subscription revenue with statistical significance.',
  keywords: ['A/B testing', 'paywall testing', 'price testing', 'subscription optimization', 'mobile app monetization', 'conversion optimization'],
  openGraph: {
    title: 'Paywall A/B Testing - Adapty',
    description: 'Double your revenue with paywall A/B testing. Test prices, designs, and offers without code changes.',
    type: 'website',
    url: 'https://adapty.io/paywall-ab-testing',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paywall A/B Testing - Adapty',
    description: 'Double your revenue with paywall A/B testing. Test prices, designs, and offers without code changes.',
  },
};

const features = [
  {
    icon: <Code2 className="w-6 h-6" />,
    title: 'No-code experiments',
    description: 'Launch A/B tests without app releases. Change prices, designs, and offers instantly.',
  },
  {
    icon: <SlidersHorizontal className="w-6 h-6" />,
    title: 'Test anything',
    description: 'Prices, trial lengths, designs, copy, and offers. Test every element that impacts conversion.',
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: 'Statistical significance',
    description: 'Know when you have enough data to decide. Clear metrics show when results are conclusive.',
  },
  {
    icon: <Trophy className="w-6 h-6" />,
    title: 'Automatic winner selection',
    description: 'Automatically roll out winning variants to 100% of users once significance is reached.',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Segment targeting',
    description: 'Test different variants for different user segments based on attributes and behavior.',
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: 'Revenue analytics',
    description: 'Track revenue impact of each variant with real-time analytics and attribution.',
  },
];

export default function PaywallABTestingPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Header />
      <main>
        {/* Hero Section */}
        <SectionErrorBoundary sectionName="FeatureHero">
          <FeatureHero
            badge="A/B TESTING"
            title="Double your revenue with paywall A/B testing"
            titleHighlight="A/B testing"
            description="Test prices, designs, and offers without code changes. Make data-driven decisions to maximize your subscription revenue."
            primaryCTA={{
              text: 'Start testing free',
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
            title="Run experiments that drive revenue growth"
            subtitle="From hypothesis to results, get the tools you need to optimize every aspect of your paywall."
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
