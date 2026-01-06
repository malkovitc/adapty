import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { BackToTop, SectionErrorBoundary } from '@/components/ui';
import PricingHero from '@/components/sections/PricingHero';
import PricingLogos from '@/components/sections/PricingLogos';
import Pricing from '@/components/sections/Pricing';
import StartupBanner from '@/components/sections/StartupBanner';
import PricingCaseStudies from '@/components/sections/PricingCaseStudies';
import PricingTestimonials from '@/components/sections/PricingTestimonials';
import PricingFAQ from '@/components/sections/PricingFAQ';
import PricingTable from '@/components/sections/PricingTable';
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

        {/* Startup Banner */}
        <SectionErrorBoundary sectionName="StartupBanner">
          <StartupBanner />
        </SectionErrorBoundary>

        {/* Logos Social Proof */}
        <SectionErrorBoundary sectionName="PricingLogos">
          <PricingLogos />
        </SectionErrorBoundary>

        {/* Pricing Tiers */}
        <SectionErrorBoundary sectionName="Pricing">
          <Pricing />
        </SectionErrorBoundary>

        {/* Full Feature Comparison Table */}
        <SectionErrorBoundary sectionName="PricingTable">
          <PricingTable />
        </SectionErrorBoundary>

        {/* Case Studies */}
        <SectionErrorBoundary sectionName="PricingCaseStudies">
          <PricingCaseStudies />
        </SectionErrorBoundary>

        {/* Testimonials Carousel */}
        <SectionErrorBoundary sectionName="PricingTestimonials">
          <PricingTestimonials />
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
