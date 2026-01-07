import { Metadata } from 'next';
import { TrendingUp, Target, ArrowRight } from 'lucide-react';
import { Header, Footer } from '@/components/layout';
import { BackToTop, SectionErrorBoundary } from '@/components/ui';
import Testimonials from '@/components/sections/Testimonials';
import CTA from '@/components/sections/CTA';
import FunnelFox from '@/components/sections/FunnelFox';
import LogosMarquee from '@/components/sections/LogosMarquee';
import EnterpriseSection from '@/components/sections/EnterpriseSection';
import CaseStudies from '@/components/sections/CaseStudies';
import TeamLinks from './TeamLinks';
import { HeroWithBadge } from '@/components/sections/heroes';
import FeatureWithQuote from '@/components/sections/FeatureWithQuote';
import RelatedFeatures from '@/components/sections/RelatedFeatures';

export const metadata: Metadata = {
  title: 'For Marketers - Adapty | Build, Manage and Target Paywalls',
  description: 'Create and deploy beautiful native paywalls with Adapty Paywall Builder. A/B test paywalls and target them using one dashboard. Track metrics with 99% accuracy.',
  keywords: [
    'marketing paywalls',
    'A/B testing',
    'paywall builder',
    'no-code paywalls',
    'paywall targeting',
    'subscription marketing',
    'mobile app marketing',
  ],
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

const heroContent = {
  badge: 'FOR MARKETERS',
  title: 'Customize and target paywalls to maximize conversions',
  subtitle:
    'Create and deploy native paywalls, run experiments, and personalize offers without waiting on engineering or app releases.',
  primaryCTA: { text: 'Schedule a demo', href: 'https://adapty.io/schedule-demo/' },
  secondaryCTA: { text: 'Start for free', href: 'https://adapty.io/signup/' },
  image: {
    src: '/images/features/no-code-paywall-builder@2x.webp',
    alt: 'Adapty Paywall Builder - Build and manage paywalls without coding',
  },
};

const marketerFeatures = [
  {
    title: 'Easy paywall testing without the dev team',
    description:
      'Run A/B tests on pricing, designs, and offers without writing code or waiting for app releases. Get statistically significant results to make data-driven decisions.',
    image: { src: '/images/features/paywall-ab-testing@2x.webp', alt: 'Paywall A/B testing dashboard' },
    link: { text: 'Paywall A/B testing', href: 'https://adapty.io/ab-test/' },
  },
  {
    title: 'Build and deploy high-quality paywalls with no coding',
    description:
      'Use the drag-and-drop Paywall Builder to create beautiful, native paywalls for iOS, Android, Flutter, and React Native. Deploy changes instantly without app updates.',
    image: { src: '/images/features/no-code-paywall-builder@2x.webp', alt: 'No-code paywall builder' },
    link: { text: 'Explore Paywall Builder', href: 'https://adapty.io/paywall-builder/' },
    reverse: true,
  },
  {
    title: 'Target paywalls to user segments',
    description:
      'Show different paywalls to different users based on behavior, geography, device, or custom attributes. Personalize the experience to maximize conversions.',
    image: { src: '/images/role-cards/img-card-cover-paywalls@2x.webp', alt: 'Paywall targeting' },
    link: { text: 'Learn about targeting', href: 'https://adapty.io/targeting/' },
  },
  {
    title: 'Stop the guesswork, get accurate LTV prediction',
    description:
      'Predict customer lifetime value early in the user journey. Make informed decisions about acquisition spending and optimize your monetization strategy.',
    image: { src: '/images/features/app-monetization-strategies@2x.webp', alt: 'LTV prediction charts' },
    testimonial: {
      quote:
        'The LTV prediction feature helped us understand user value much earlier in the funnel, allowing us to optimize our acquisition strategy significantly.',
      author: { name: 'Sergey Lagutyonok', role: 'Product Manager', company: 'Impala Studios' },
    },
    reverse: true,
  },
  {
    title: 'Revenue analytics you can trust',
    description:
      'Get real-time subscription analytics with unmatched accuracy. Track MRR, ARPU, churn, and more with a ready-to-use BI dashboard.',
    image: { src: '/images/role-cards/img-card-cover-charts@2x.webp', alt: 'Revenue analytics charts' },
  },
  {
    title: 'Send revenue events to MMP and analytics',
    description:
      'Forward subscription events to your favorite analytics and attribution tools. Connect with Amplitude, Mixpanel, AppsFlyer, Adjust, and more without writing backend code.',
    image: { src: '/images/features/app-monetization-strategies@2x.webp', alt: 'Revenue integrations' },
    reverse: true,
  },
  {
    title: 'Built-in Apple Search Ads analytics',
    description:
      'Track the performance of your Apple Search Ads campaigns with built-in attribution. Understand which keywords and campaigns drive the most valuable subscribers.',
    image: { src: '/images/features/paywall-ab-testing@2x.webp', alt: 'Apple Search Ads analytics' },
  },
  {
    title: 'Convenient paywall localization',
    description:
      'Easily localize your paywalls for different markets. Manage translations directly in the dashboard and deploy localized versions without code changes.',
    image: { src: '/images/features/no-code-paywall-builder@2x.webp', alt: 'Localization workflows' },
    link: { text: 'Localize paywalls', href: 'https://adapty.io/paywall-builder/' },
    reverse: true,
  },
];

const relatedFeaturesData = [
  {
    title: 'For developers',
    description: 'Focus on building product while Adapty handles subscription infrastructure.',
    href: '/for-developers/',
    icon: <Target className="w-6 h-6" />,
  },
  {
    title: 'For app owners',
    description: 'Track revenue, predict LTV, and analyze cohorts with ready-made dashboards.',
    href: '/for-app-owners/',
    icon: <TrendingUp className="w-6 h-6" />,
  },
];

const ctaBenefits = [
  'Deploy paywalls without app releases',
  'Target offers by segment and behavior',
  'Predict LTV to guide UA spend',
  'Sync subscription data to your stack',
];

export default function ForMarketersPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Header />
      <main>
        <SectionErrorBoundary sectionName="Hero">
          <HeroWithBadge {...heroContent} />
        </SectionErrorBoundary>

        {marketerFeatures.map((feature, index) => (
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

        <SectionErrorBoundary sectionName="FunnelFox">
          <FunnelFox />
        </SectionErrorBoundary>

        <SectionErrorBoundary sectionName="TeamLinks">
          <TeamLinks />
        </SectionErrorBoundary>

        <SectionErrorBoundary sectionName="LogosMarquee">
          <LogosMarquee />
        </SectionErrorBoundary>

        <SectionErrorBoundary sectionName="Testimonials">
          <Testimonials />
        </SectionErrorBoundary>

        <SectionErrorBoundary sectionName="EnterpriseSection">
          <EnterpriseSection />
        </SectionErrorBoundary>

        <SectionErrorBoundary sectionName="CaseStudies">
          <CaseStudies />
        </SectionErrorBoundary>

        <SectionErrorBoundary sectionName="RelatedFeatures">
          <RelatedFeatures
            title="Learn more"
            features={relatedFeaturesData}
            columns={2}
            background="white"
          />
        </SectionErrorBoundary>

        <SectionErrorBoundary sectionName="CTA">
          <CTA
            title="Ready to ship high-performing paywalls?"
            highlight="Marketing teams choose Adapty"
            description="Join thousands of marketers using Adapty to build, test, and personalize subscription funnels."
            benefits={ctaBenefits}
            primaryCTA={{
              label: 'Schedule a demo',
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
