import { Header, Footer } from '@/components/layout';
import { BackToTop, SectionErrorBoundary } from '@/components/ui';
import Hero from '@/components/sections/Hero';
import LogosMarquee from '@/components/sections/LogosMarquee';
import RoleCards from '@/components/sections/RoleCards';
import StatsSection from '@/components/sections/StatsSection';
import SDKSection from '@/components/sections/SDKSection';
import FeatureSections from '@/components/sections/FeatureSections';
import FunnelFox from '@/components/sections/FunnelFox';
import Integrations from '@/components/sections/Integrations';
import CaseStudies from '@/components/sections/CaseStudies';
import Testimonials from '@/components/sections/Testimonials';
import EnterpriseSection from '@/components/sections/EnterpriseSection';
import Pricing from '@/components/sections/Pricing';
import FAQ from '@/components/sections/FAQ';
import CTA from '@/components/sections/CTA';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Header />
      <main>
        {/* Hero with email form and dashboard preview */}
        <SectionErrorBoundary sectionName="Hero">
          <Hero />
        </SectionErrorBoundary>

        {/* Trusted by logos */}
        <SectionErrorBoundary sectionName="LogosMarquee">
          <LogosMarquee />
        </SectionErrorBoundary>

        {/* Role-based cards: For developers, app owners, marketers */}
        <SectionErrorBoundary sectionName="RoleCards">
          <RoleCards />
        </SectionErrorBoundary>

        {/* Stats: $3B tracked, 99.99% uptime, etc */}
        <SectionErrorBoundary sectionName="StatsSection">
          <StatsSection />
        </SectionErrorBoundary>

        {/* SDK integration code examples with tabs */}
        <SectionErrorBoundary sectionName="SDKSection">
          <SDKSection />
        </SectionErrorBoundary>

        {/* Feature sections with testimonials */}
        <SectionErrorBoundary sectionName="FeatureSections">
          <FeatureSections />
        </SectionErrorBoundary>

        {/* FunnelFox - Web funnels */}
        <SectionErrorBoundary sectionName="FunnelFox">
          <FunnelFox />
        </SectionErrorBoundary>

        {/* Integrations */}
        <SectionErrorBoundary sectionName="Integrations">
          <Integrations />
        </SectionErrorBoundary>

        {/* Case Studies */}
        <SectionErrorBoundary sectionName="CaseStudies">
          <CaseStudies />
        </SectionErrorBoundary>

        {/* Customer testimonials slider */}
        <SectionErrorBoundary sectionName="Testimonials">
          <Testimonials />
        </SectionErrorBoundary>

        {/* Enterprise + G2 Awards */}
        <SectionErrorBoundary sectionName="EnterpriseSection">
          <EnterpriseSection />
        </SectionErrorBoundary>

        {/* Pricing */}
        <SectionErrorBoundary sectionName="Pricing">
          <Pricing />
        </SectionErrorBoundary>

        {/* FAQ */}
        <SectionErrorBoundary sectionName="FAQ">
          <FAQ />
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
