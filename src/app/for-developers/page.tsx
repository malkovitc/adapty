import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { BackToTop, SectionErrorBoundary } from '@/components/ui';
import LogosMarquee from '@/components/sections/LogosMarquee';
import Testimonials from '@/components/sections/Testimonials';
import CaseStudies from '@/components/sections/CaseStudies';
import EnterpriseSection from '@/components/sections/EnterpriseSection';
import CTA from '@/components/sections/CTA';

// Local components
import DeveloperHero from './DeveloperHero';
import SDKMethods from './SDKMethods';
import ComparisonTable from './ComparisonTable';
import {
  QuickIntegration,
  CrossPlatformSync,
  SLASection,
  SDKsGrid,
} from './FeatureSections';
import {
  IntegrationsSection,
  PaywallArchitecture,
  RawDataExport,
  MigrationSection,
  TeamLinks,
} from './AdditionalSections';

export const metadata: Metadata = {
  title: 'For Developers - Adapty | Integrate In-App Purchases in Minutes',
  description: 'Integrate and deploy in-app purchases in minutes with a single line of code. Well-maintained SDKs for iOS, Android, React Native, Flutter, Unity and more.',
  keywords: ['subscription SDK', 'in-app purchase SDK', 'iOS subscriptions', 'Android subscriptions', 'React Native subscriptions', 'Flutter subscriptions', 'StoreKit 2', 'Google Play Billing'],
  openGraph: {
    title: 'For Developers - Adapty',
    description: 'Integrate in-app purchases in minutes with a single line of code.',
    type: 'website',
    url: 'https://adapty.io/for-developers',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'For Developers - Adapty',
    description: 'Integrate in-app purchases in minutes with a single line of code.',
  },
};

export default function ForDevelopersPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Header />
      <main>
        {/* 1. Hero Section with integration steps visualization */}
        <SectionErrorBoundary sectionName="DeveloperHero">
          <DeveloperHero />
        </SectionErrorBoundary>

        {/* 2. SDK Methods Section - "Just 5 SDK methods to integrate monetization" */}
        <SectionErrorBoundary sectionName="SDKMethods">
          <SDKMethods />
        </SectionErrorBoundary>

        {/* 2.5. Comparison Table - "Why developers choose Adapty" */}
        <SectionErrorBoundary sectionName="ComparisonTable">
          <ComparisonTable />
        </SectionErrorBoundary>

        {/* 3. Quick Integration - "Quick integration in just a couple of hours" */}
        <SectionErrorBoundary sectionName="QuickIntegration">
          <QuickIntegration />
        </SectionErrorBoundary>

        {/* 4. Cross-platform Section - "Cross-platform subscriber sync" */}
        <SectionErrorBoundary sectionName="CrossPlatformSync">
          <CrossPlatformSync />
        </SectionErrorBoundary>

        {/* 5. SLA Section - "Highest SLA in the industry: 99.99%" */}
        <SectionErrorBoundary sectionName="SLASection">
          <SLASection />
        </SectionErrorBoundary>

        {/* 6. SDKs Grid - "Well-maintained SDK for each platform" */}
        <SectionErrorBoundary sectionName="SDKsGrid">
          <SDKsGrid />
        </SectionErrorBoundary>

        {/* 7. Integrations Section - "Simple 3rd-party integrations" */}
        <SectionErrorBoundary sectionName="IntegrationsSection">
          <IntegrationsSection />
        </SectionErrorBoundary>

        {/* 8. Paywall Architecture - "Flexible paywall management architecture" */}
        <SectionErrorBoundary sectionName="PaywallArchitecture">
          <PaywallArchitecture />
        </SectionErrorBoundary>

        {/* 9. Raw Data Export - "Raw data export" with webhooks */}
        <SectionErrorBoundary sectionName="RawDataExport">
          <RawDataExport />
        </SectionErrorBoundary>

        {/* 10. Migration Section - "Using another or in-house solution?" */}
        <SectionErrorBoundary sectionName="MigrationSection">
          <MigrationSection />
        </SectionErrorBoundary>

        {/* 11. Team Links - "We're here for your team" */}
        <SectionErrorBoundary sectionName="TeamLinks">
          <TeamLinks />
        </SectionErrorBoundary>

        {/* 12. Logos Section - "Join the world's largest apps" */}
        <SectionErrorBoundary sectionName="LogosMarquee">
          <LogosMarquee />
        </SectionErrorBoundary>

        {/* 13. Testimonials carousel */}
        <SectionErrorBoundary sectionName="Testimonials">
          <Testimonials />
        </SectionErrorBoundary>

        {/* 14. Enterprise stats and G2 Awards */}
        <SectionErrorBoundary sectionName="EnterpriseSection">
          <EnterpriseSection />
        </SectionErrorBoundary>

        {/* 15. Case Studies */}
        <SectionErrorBoundary sectionName="CaseStudies">
          <CaseStudies />
        </SectionErrorBoundary>

        {/* 16. Final CTA Section */}
        <SectionErrorBoundary sectionName="CTA">
          <CTA />
        </SectionErrorBoundary>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
