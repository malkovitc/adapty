import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { BackToTop, SectionErrorBoundary } from '@/components/ui';
import Testimonials from '@/components/sections/Testimonials';
import CTA from '@/components/sections/CTA';
import FunnelFox from '@/components/sections/FunnelFox';
import LogosMarquee from '@/components/sections/LogosMarquee';
import EnterpriseSection from '@/components/sections/EnterpriseSection';
import CaseStudies from '@/components/sections/CaseStudies';

// Local components
import MarketerHero from './MarketerHero';
import { FeatureSectionsMarketer } from './FeatureSections';
import TeamLinks from './TeamLinks';
import RelatedLinks from './RelatedLinks';

export const metadata: Metadata = {
  title: 'For Marketers - Adapty | Build, Manage and Target Paywalls',
  description: 'Create and deploy beautiful native paywalls with Adapty Paywall Builder. A/B test paywalls and target them using one dashboard. Track metrics with 99% accuracy.',
  keywords: ['marketing paywalls', 'A/B testing', 'paywall builder', 'no-code paywalls', 'paywall targeting', 'subscription marketing', 'mobile app marketing'],
  openGraph: {
    title: 'For Marketers - Adapty',
    description: 'Build, manage, and target paywalls without leaving the dashboard.',
    type: 'website',
    url: 'https://adapty.io/for-marketers',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'For Marketers - Adapty',
    description: 'Build, manage, and target paywalls without leaving the dashboard.',
  },
};

export default function ForMarketersPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Header />
      <main>
        {/* 1. Hero Section */}
        <SectionErrorBoundary sectionName="MarketerHero">
          <MarketerHero />
        </SectionErrorBoundary>

        {/* 2. Feature Sections (alternating layout) */}
        <SectionErrorBoundary sectionName="FeatureSections">
          <FeatureSectionsMarketer />
        </SectionErrorBoundary>

        {/* 3. FunnelFox Section */}
        <SectionErrorBoundary sectionName="FunnelFox">
          <FunnelFox />
        </SectionErrorBoundary>

        {/* 4. Team Links Section */}
        <SectionErrorBoundary sectionName="TeamLinks">
          <TeamLinks />
        </SectionErrorBoundary>

        {/* 5. Logos Section */}
        <SectionErrorBoundary sectionName="LogosMarquee">
          <LogosMarquee />
        </SectionErrorBoundary>

        {/* 6. Testimonials carousel */}
        <SectionErrorBoundary sectionName="Testimonials">
          <Testimonials />
        </SectionErrorBoundary>

        {/* 7. Enterprise stats section */}
        <SectionErrorBoundary sectionName="EnterpriseSection">
          <EnterpriseSection />
        </SectionErrorBoundary>

        {/* 8. Case Studies section */}
        <SectionErrorBoundary sectionName="CaseStudies">
          <CaseStudies />
        </SectionErrorBoundary>

        {/* 9. Related links */}
        <SectionErrorBoundary sectionName="RelatedLinks">
          <RelatedLinks />
        </SectionErrorBoundary>

        {/* 10. Final CTA Section */}
        <SectionErrorBoundary sectionName="CTA">
          <CTA />
        </SectionErrorBoundary>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
