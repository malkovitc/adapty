'use client';

import { Settings, Zap, Globe, Target, ArrowRight } from 'lucide-react';
import { Header, Footer } from '@/components/layout';
import { BackToTop, SectionErrorBoundary } from '@/components/ui';
import Testimonials from '@/components/sections/Testimonials';
import EnterpriseSection from '@/components/sections/EnterpriseSection';
import CaseStudies from '@/components/sections/CaseStudies';
import CTA from '@/components/sections/CTA';
import MigrationCTA from '@/components/sections/MigrationCTA';
import { HeroWithBadge } from '@/components/sections/heroes';
import FeatureWithQuote from '@/components/sections/FeatureWithQuote';
import RelatedFeatures from '@/components/sections/RelatedFeatures';
import VideoPreview from '@/components/sections/VideoPreview';

const heroContent = {
  badge: 'REMOTE CONFIG',
  title: 'Update your app without a release',
  subtitle: 'Change paywall content, pricing, and configuration instantly. No app store review, no waiting for users to update.',
  primaryCTA: { text: 'Schedule a demo', href: 'https://adapty.io/schedule-demo/' },
  secondaryCTA: { text: 'Start for free', href: 'https://app.adapty.io/signup' },
  image: { src: '/images/features/no-code-paywall-builder@2x.webp', alt: 'Adapty Remote Config Dashboard' },
};

const videoPreviewContent = {
  title: 'Watch Remote Config in action',
  description: 'See how fast teams ship configuration changes without waiting on app store reviews.',
  caption: 'Remote config demo preview',
};

const remoteConfigFeatures = [
  {
    title: 'Instant paywall updates',
    description: 'Change headlines, images, pricing, and CTAs on your paywalls without submitting a new app version. See changes go live in seconds.',
    image: { src: '/images/role-cards/img-card-cover-paywalls@2x.webp', alt: 'Instant paywall updates' },
    testimonial: {
      quote: 'Remote config changed how we work. We can now iterate on paywalls daily instead of waiting weeks for app store approval.',
      author: { name: 'Cem Ortabas', role: 'Co-founder and CEO', company: 'HubX' },
    },
  },
  {
    title: 'Localization made easy',
    description: 'Update translations and regional content without code changes. Support new languages or fix typos instantly.',
    image: { src: '/images/features/app-monetization-strategies@2x.webp', alt: 'Localization features' },
    reverse: true,
  },
  {
    title: 'JSON custom payloads',
    description: 'Send any custom data to your app. Use JSON payloads to control app behavior, feature flags, and more.',
    image: { src: '/images/role-cards/img-card-cover-sdk-install@2x.webp', alt: 'JSON custom payloads' },
    link: { text: 'View documentation', href: 'https://docs.adapty.io/docs/remote-config' },
  },
  {
    title: 'Version targeting',
    description: 'Target specific app versions with different configurations. Safely roll out changes to newer versions while maintaining compatibility.',
    image: { src: '/images/role-cards/img-card-cover-charts@2x.webp', alt: 'Version targeting' },
    reverse: true,
    testimonial: {
      quote: 'The ability to target specific app versions is a game-changer. We can test new features without breaking older installations.',
      author: { name: 'Yalcin Ozdemir', role: 'Founder & CEO', company: 'AppNation' },
    },
  },
];

const relatedFeaturesData = [
  {
    title: 'Paywall Builder',
    description: 'Create beautiful paywalls without coding',
    href: '/paywall-builder',
    icon: <Settings className="w-6 h-6" />,
  },
  {
    title: 'A/B Testing',
    description: 'Test configurations to find winners',
    href: '/paywall-ab-testing',
    icon: <Zap className="w-6 h-6" />,
  },
  {
    title: 'Targeting',
    description: 'Show different configs to user segments',
    href: '/paywall-builder',
    icon: <Target className="w-6 h-6" />,
  },
  {
    title: 'Localization',
    description: 'Manage translations remotely',
    href: '/paywall-builder',
    icon: <Globe className="w-6 h-6" />,
  },
];

const ctaBenefits = [
  'Instant changes without releases',
  'Target any audience segment',
  'Works across iOS, Android, Unity',
  'Backed by enterprise-grade SLA',
];

const migrationContent = {
  title: 'Using another analytics solution?',
  subtitle: "We'll help you migrate for free.",
  description: 'Migrate to Adapty and get accurate, real-time subscription analytics with historical data import. Our team will help you every step of the way.',
  cta: { text: 'Talk to sales', href: 'https://adapty.io/schedule-demo/' },
  image: {
    src: '/images/features/subscription-analytics@2x.webp',
    alt: 'Migration to Adapty',
  },
  competitors: ['RevenueCat', 'Qonversion', 'Superwall'],
};

export default function RemoteConfigPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Header />
      <main>
        <SectionErrorBoundary sectionName="Hero">
          <HeroWithBadge {...heroContent} />
        </SectionErrorBoundary>

        <SectionErrorBoundary sectionName="Video">
          <VideoPreview
            title={videoPreviewContent.title}
            description={videoPreviewContent.description}
            caption={videoPreviewContent.caption}
          />
        </SectionErrorBoundary>

        {remoteConfigFeatures.map((feature, index) => (
          <SectionErrorBoundary key={feature.title} sectionName={`Feature-${index + 1}`}>
            <FeatureWithQuote
              title={feature.title}
              description={feature.description}
              image={feature.image}
              testimonial={feature.testimonial}
              link={feature.link}
              reverse={feature.reverse}
            />
          </SectionErrorBoundary>
        ))}

        <SectionErrorBoundary sectionName="Testimonials">
          <Testimonials />
        </SectionErrorBoundary>

        <SectionErrorBoundary sectionName="Enterprise">
          <EnterpriseSection />
        </SectionErrorBoundary>

        <SectionErrorBoundary sectionName="CaseStudies">
          <CaseStudies />
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

        <SectionErrorBoundary sectionName="RelatedFeatures">
          <RelatedFeatures
            title="Related features"
            features={relatedFeaturesData}
            columns={4}
            background="gray"
          />
        </SectionErrorBoundary>

        <SectionErrorBoundary sectionName="CTA">
          <CTA
            title="Ready to control every"
            highlight="paywall remotely?"
            description="Join thousands of apps using Adapty to ship configuration updates in minutes."
            benefits={ctaBenefits}
            primaryCTA={{
              label: 'Schedule a demo',
              href: 'https://adapty.io/schedule-demo/',
              icon: <ArrowRight className="w-5 h-5" />,
            }}
            secondaryCTA={{
              label: 'Start for free',
              href: 'https://app.adapty.io/signup',
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
