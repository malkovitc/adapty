import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { BackToTop, SectionErrorBoundary } from '@/components/ui';
import Testimonials from '@/components/sections/Testimonials';
import CTA from '@/components/sections/CTA';
import FunnelFox from '@/components/sections/FunnelFox';
import CaseStudies from '@/components/sections/CaseStudies';
import LogosMarquee from '@/components/sections/LogosMarquee';
import AppOwnersHero from './AppOwnersHero';
import FeatureSections from './FeatureSections';
import TeamLinks from './TeamLinks';
import EnterpriseStats from './EnterpriseStats';
import RelatedLinks from './RelatedLinks';

export const metadata: Metadata = {
  title: 'For App Owners - Adapty | Subscription Analytics & Insights',
  description: 'A springboard for running a successful subscription app business. Track revenue, predict LTV, analyze cohorts and control access rights - all from one platform.',
  keywords: ['subscription analytics', 'revenue analytics', 'LTV prediction', 'cohort analysis', 'app business', 'subscription reporting', 'revenue metrics'],
  openGraph: {
    title: 'For App Owners - Adapty',
    description: 'A springboard for running a successful subscription app business.',
    type: 'website',
    url: 'https://adapty.io/for-app-owners',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'For App Owners - Adapty',
    description: 'A springboard for running a successful subscription app business.',
  },
};

export default function ForAppOwnersPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Header />
      <main>
        {/* Hero Section */}
        <SectionErrorBoundary sectionName="AppOwnersHero">
          <AppOwnersHero />
        </SectionErrorBoundary>

        {/* Feature Sections */}
        <SectionErrorBoundary sectionName="FeatureSections">
          <FeatureSections />
        </SectionErrorBoundary>

        {/* FunnelFox Section */}
        <SectionErrorBoundary sectionName="FunnelFox">
          <FunnelFox />
        </SectionErrorBoundary>

        {/* Team Links Section */}
        <SectionErrorBoundary sectionName="TeamLinks">
          <TeamLinks />
        </SectionErrorBoundary>

        {/* Logos Marquee */}
        <SectionErrorBoundary sectionName="LogosMarquee">
          <LogosMarquee />
        </SectionErrorBoundary>

        {/* Testimonials */}
        <SectionErrorBoundary sectionName="Testimonials">
          <Testimonials />
        </SectionErrorBoundary>

        {/* Enterprise Stats Section */}
        <SectionErrorBoundary sectionName="EnterpriseStats">
          <EnterpriseStats />
        </SectionErrorBoundary>

        {/* Case Studies */}
        <SectionErrorBoundary sectionName="CaseStudies">
          <CaseStudies />
        </SectionErrorBoundary>

        {/* Related Links */}
        <SectionErrorBoundary sectionName="RelatedLinks">
          <RelatedLinks />
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
