import { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { Header, Footer } from '@/components/layout';
import { BackToTop, SectionErrorBoundary } from '@/components/ui';
import LogosMarquee from '@/components/sections/LogosMarquee';
import Testimonials from '@/components/sections/Testimonials';
import CaseStudies from '@/components/sections/CaseStudies';
import EnterpriseSection from '@/components/sections/EnterpriseSection';
import CTA from '@/components/sections/CTA';
import { HeroWithBadge } from '@/components/sections/heroes';
import FeatureWithQuote from '@/components/sections/FeatureWithQuote';
import RelatedFeatures from '@/components/sections/RelatedFeatures';
import MigrationCTA from '@/components/sections/MigrationCTA';

// Local components
import SDKMethods from './SDKMethods';
import ComparisonTable from './ComparisonTable';
import { SDKsGrid } from './FeatureSections';
import { TeamLinks } from './AdditionalSections';

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

const heroContent = {
  badge: 'FOR DEVELOPERS',
  title: 'Integrate in-app purchases in minutes',
  subtitle: 'Save hours of coding with quick IAP integration and just a few SDK methods. Focus on product while Adapty handles monetization plumbing.',
  primaryCTA: { text: 'Book a demo', href: 'https://adapty.io/schedule-demo/' },
  secondaryCTA: { text: 'Start for free', href: 'https://adapty.io/signup/' },
  image: {
    src: '/images/features/no-code-paywall-builder@2x.webp',
    alt: 'Adapty integration workflow',
  },
};

const developerFeatures = [
  {
    title: 'Quick integration in just a couple of hours',
    description:
      'Add products from App Store Connect, Google Play, or Stripe. Then integrate the SDK and start selling subscriptions without building backend infrastructure.',
    image: { src: '/images/features/app-monetization-strategies@2x.webp', alt: 'Quick integration' },
    link: { text: 'Read the quick start guide', href: 'https://docs.adapty.io/docs/quickstart' },
  },
  {
    title: 'Cross-platform subscriber sync',
    description:
      'Sync subscription status across iOS, Android, and web instantly. Adapty keeps receipts validated and profiles up to date in real time.',
    image: { src: '/images/features/subscription-analytics@2x.webp', alt: 'Cross platform sync' },
    reverse: true,
  },
  {
    title: 'Highest SLA in the industry',
    description:
      'Adapty handles validation, sync, and analytics with 99.99% uptime. You get webhook retries, fallbacks, and observability built in.',
    image: { src: '/images/features/subscription-analytics@2x.webp', alt: 'Reliability dashboard' },
  },
  {
    title: 'Simple 3rd-party integrations',
    description:
      'Forward subscription events to Amplitude, Mixpanel, AppsFlyer, Adjust, Segment, and more without writing backend code.',
    image: { src: '/images/features/app-monetization-strategies@2x.webp', alt: 'Integrations' },
    reverse: true,
    link: { text: 'Explore all integrations', href: 'https://adapty.io/integrations/' },
  },
  {
    title: 'Flexible paywall management architecture',
    description:
      'Remote config, fallback paywalls, and experiment controls are built into the SDK. Update pricing, layouts, and experiments instantly.',
    image: { src: '/images/features/no-code-paywall-builder@2x.webp', alt: 'Paywall architecture' },
  },
  {
    title: 'Raw data export & webhooks',
    description:
      'Export subscription events via webhooks or S3 to power your own dashboards and ML pipelines. Full API access included.',
    image: { src: '/images/features/subscription-analytics@2x.webp', alt: 'Raw data export' },
    reverse: true,
    link: { text: 'View webhook docs', href: 'https://docs.adapty.io/docs/webhooks' },
  },
];

const relatedFeaturesData = [
  {
    title: 'SDK Documentation',
    description: 'Get started with Swift, Kotlin, React Native, Flutter, and more.',
    href: 'https://docs.adapty.io',
  },
  {
    title: 'Quickstart guide',
    description: 'Follow the integration checklist and ship in hours.',
    href: 'https://docs.adapty.io/docs/quickstart',
  },
];

const migrationContent = {
  title: 'Using another or in-house solution?',
  subtitle: 'We migrate existing subscriptions, imports, and infrastructure for free.',
  description: 'Switching SDKs is painless with dedicated support, historical data import, and production readiness reviews.',
  cta: { text: 'Talk to sales', href: 'https://adapty.io/schedule-demo/' },
  image: { src: '/images/features/subscription-analytics@2x.webp', alt: 'Migration support' },
  competitors: ['RevenueCat', 'Qonversion', 'Superwall'],
};

const ctaBenefits = [
  'SDKs for every platform',
  'Receipt validation included',
  'Webhooks and analytics baked in',
  'Developer-first documentation',
];

export default function ForDevelopersPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Header />
      <main>
        {/* 1. Hero Section with integration steps visualization */}
        <SectionErrorBoundary sectionName="Hero">
          <HeroWithBadge {...heroContent} />
        </SectionErrorBoundary>

        {/* 2. SDK Methods Section - "Just 5 SDK methods to integrate monetization" */}
        <SectionErrorBoundary sectionName="SDKMethods">
          <SDKMethods />
        </SectionErrorBoundary>

        {/* 2.5. Comparison Table - "Why developers choose Adapty" */}
        <SectionErrorBoundary sectionName="ComparisonTable">
          <ComparisonTable />
        </SectionErrorBoundary>

        {developerFeatures.map((feature, index) => (
          <SectionErrorBoundary key={feature.title} sectionName={`Feature-${index + 1}`}>
            <FeatureWithQuote
              title={feature.title}
              description={feature.description}
              image={feature.image}
              testimonial={'testimonial' in feature ? (feature as { testimonial?: { quote: string; author: { name: string; role: string; company: string; companyLogo?: string } } }).testimonial : undefined}
              link={'link' in feature ? feature.link : undefined}
              reverse={feature.reverse}
            />
          </SectionErrorBoundary>
        ))}

        <SectionErrorBoundary sectionName="SDKsGrid">
          <SDKsGrid />
        </SectionErrorBoundary>

        <SectionErrorBoundary sectionName="MigrationCTA">
          <MigrationCTA
            title={migrationContent.title}
            subtitle={migrationContent.subtitle}
            description={migrationContent.description}
            cta={migrationContent.cta}
            image={migrationContent.image}
            competitors={migrationContent.competitors}
            background="gradient"
          />
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

        <SectionErrorBoundary sectionName="CaseStudies">
          <CaseStudies />
        </SectionErrorBoundary>

        <SectionErrorBoundary sectionName="RelatedFeatures">
          <RelatedFeatures features={relatedFeaturesData} columns={2} background="white" />
        </SectionErrorBoundary>

        <SectionErrorBoundary sectionName="CTA">
          <CTA
            title="Ready to ship in-app subscriptions faster?"
            highlight="Developers love Adapty SDK"
            description="Join thousands of companies trusting Adapty for StoreKit, Google Play Billing, and Stripe integrations."
            benefits={ctaBenefits}
            primaryCTA={{
              label: 'Book a demo',
              href: 'https://adapty.io/schedule-demo/',
              icon: <ArrowRight className="w-5 h-5" />,
            }}
            secondaryCTA={{
              label: 'Start for free',
              href: 'https://adapty.io/signup/',
              icon: <ArrowRight className="w-5 h-5" />,
            }}
          />
        </SectionErrorBoundary>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
