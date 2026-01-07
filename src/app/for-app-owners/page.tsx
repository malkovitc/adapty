import { Metadata } from 'next';
import { TrendingUp, Target } from 'lucide-react';
import { Header, Footer } from '@/components/layout';
import { BackToTop, SectionErrorBoundary } from '@/components/ui';
import Testimonials from '@/components/sections/Testimonials';
import CTA from '@/components/sections/CTA';
import FunnelFox from '@/components/sections/FunnelFox';
import CaseStudies from '@/components/sections/CaseStudies';
import LogosMarquee from '@/components/sections/LogosMarquee';
import TeamLinks from './TeamLinks';
import EnterpriseStats from './EnterpriseStats';
import { HeroWithBadge } from '@/components/sections/heroes';
import FeatureWithQuote from '@/components/sections/FeatureWithQuote';
import RelatedFeatures from '@/components/sections/RelatedFeatures';

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

const heroContent = {
  badge: 'FOR APP OWNERS',
  title: 'A springboard for running a successful subscription app business',
  subtitle:
    'Running a subscription business is hard, we know it. Adapty makes it easy for you and your team to get things done quickly and cheaply while allowing you to focus on what you do best — building new products and acquiring customers.',
  primaryCTA: { text: 'Schedule a demo', href: 'https://adapty.io/schedule-demo/' },
  secondaryCTA: { text: 'Start for free', href: 'https://app.adapty.io/registration' },
  image: {
    src: '/images/for-app-owners/img-successful-subscription-app@2x.webp',
    alt: 'Real case: +3x revenue with Adapty SDK',
  },
};

const ownerFeatures = [
  {
    title: 'Increase your marketing speed',
    description:
      "Iterate over paywalls and subscription pricing fast. Get the most out of your app with Paywall A/B testing, Paywall Targeting, and more. You can't avoid mistakes, but with Adapty you can make mistakes faster and move forward to maximize your profit.",
    image: { src: '/images/for-app-owners/img-speed-marketing@2x.webp', alt: 'Marketing speed dashboard' },
  },
  {
    title: 'Save your dev team efforts',
    description:
      'Focus your development team on building products and features, not infrastructure and operation. Adapty helps you delegate your revenue ops and forget about it.',
    image: { src: '/images/for-app-owners/img-save-dev-forts@2x.webp', alt: 'Developer collaboration' },
    reverse: true,
  },
  {
    title: 'Clear and transparent subscription reporting',
    description:
      'Track both high- and low-level revenue metrics in the Adapty dashboard easily right from your mobile phone. Analyze revenue growth, retention, and cohorts. Segment by traffic sources and control LTV. Receive daily, weekly, and monthly email reports.',
    image: { src: '/images/for-app-owners/img-clear-transparent-subscription@2x.webp', alt: 'Subscription reporting dashboard' },
  },
  {
    title: 'Predict revenue for the next 4 quarters',
    description:
      "With Adapty's machine learning technology, we accurately predict your app revenue and LTV for the next 4 quarters. Never run out of cash again and plan your earnings well ahead.",
    image: { src: '/images/for-app-owners/img-predict-revenue-4quartes@2x.webp', alt: 'Revenue prediction charts' },
    reverse: true,
    testimonial: {
      quote:
        "Adapty's analytics platform has become an invaluable asset for optimizing our app's monetization strategy. The detailed subscription metrics and LTV prediction tools provide us with real insights to drive our revenue growth.",
      author: {
        name: 'Burak Berber',
        role: 'Marketing Team Lead',
        company: 'Appnation',
        companyLogo: '/images/for-app-owners/appnation-black.svg',
      },
    },
  },
  {
    title: 'Access rights',
    description:
      'Control user permission in one or many of your apps. Keep your app secure from data leaks and 3rd party access.',
    image: { src: '/images/for-app-owners/img-access-rights@2x.png', alt: 'Access rights management' },
  },
];

const relatedFeaturesData = [
  {
    title: 'For marketers',
    description: 'Manage paywalls remotely, find profitability and maximize LTV.',
    href: '/for-marketers/',
    icon: <TrendingUp className="w-6 h-6" />,
  },
  {
    title: 'For developers',
    description: 'Focus on building product while Adapty handles subscription infrastructure.',
    href: '/for-developers/',
    icon: <Target className="w-6 h-6" />,
  },
];

export default function ForAppOwnersPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Header />
      <main>
        <SectionErrorBoundary sectionName="Hero">
          <HeroWithBadge {...heroContent} />
        </SectionErrorBoundary>

        {ownerFeatures.map((feature, index) => (
          <SectionErrorBoundary key={feature.title} sectionName={`Feature-${index + 1}`}>
            <FeatureWithQuote
              title={feature.title}
              description={feature.description}
              image={feature.image}
              testimonial={feature.testimonial}
              reverse={feature.reverse}
            />
          </SectionErrorBoundary>
        ))}

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

        {/* Related Features */}
        <SectionErrorBoundary sectionName="RelatedFeatures">
          <RelatedFeatures features={relatedFeaturesData} />
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
