import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { BackToTop, SectionErrorBoundary } from '@/components/ui';
import PricingHero from '@/components/sections/PricingHero';
import Pricing from '@/components/sections/Pricing';
import PricingFAQ from '@/components/sections/PricingFAQ';
import CTA from '@/components/sections/CTA';

export const metadata: Metadata = {
  title: 'Pricing - Adapty | Simple, Transparent Pricing for In-App Subscriptions',
  description: 'Start for free and scale as you grow. Adapty offers flexible pricing plans for apps of all sizes. Free plan available up to $10K monthly revenue.',
  keywords: ['pricing', 'subscription management', 'in-app purchases', 'mobile app monetization', 'free plan'],
  openGraph: {
    title: 'Pricing - Adapty',
    description: 'Simple, transparent pricing for in-app subscription management. Start free and scale as you grow.',
    type: 'website',
    url: 'https://adapty.io/pricing',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing - Adapty',
    description: 'Simple, transparent pricing for in-app subscription management. Start free and scale as you grow.',
  },
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Header />
      <main>
        {/* Pricing Hero Section */}
        <SectionErrorBoundary sectionName="PricingHero">
          <PricingHero />
        </SectionErrorBoundary>

        {/* Pricing Tiers & Comparison Table */}
        <SectionErrorBoundary sectionName="Pricing">
          <Pricing />
        </SectionErrorBoundary>

        {/* Pricing FAQ */}
        <SectionErrorBoundary sectionName="PricingFAQ">
          <PricingFAQ />
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
