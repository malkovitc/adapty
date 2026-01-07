'use client';

import { Target, TrendingUp, PieChart, Activity, ArrowRight } from 'lucide-react';
import { Header, Footer } from '@/components/layout';
import { BackToTop, SectionErrorBoundary } from '@/components/ui';
import Testimonials from '@/components/sections/Testimonials';
import CTA from '@/components/sections/CTA';
import MigrationCTA from '@/components/sections/MigrationCTA';
import { HeroWithBadge } from '@/components/sections/heroes';
import FeatureWithQuote from '@/components/sections/FeatureWithQuote';
import RelatedFeatures from '@/components/sections/RelatedFeatures';

const heroContent = {
  badge: 'REVENUE ANALYTICS',
  title: 'Accurate app subscription analytics you can rely on',
  subtitle: 'Easily navigate the financial field of mobile subscriptions and control your monetization strategy with real-time, accurate data.',
  primaryCTA: { text: 'Schedule a demo', href: 'https://adapty.io/schedule-demo/' },
  secondaryCTA: { text: 'Start for free', href: 'https://app.adapty.io/signup' },
  image: {
    src: '/images/features/subscription-analytics@2x.webp',
    alt: 'Adapty Revenue Analytics Dashboard',
  },
};

const revenueFeatures = [
  {
    title: 'Real-time revenue tracking',
    description:
      'Monitor your subscription revenue as it happens. See MRR, ARR, and revenue trends update in real-time across all your apps and products.',
    image: { src: '/images/role-cards/img-card-cover-charts@2x.webp', alt: 'Real-time revenue dashboard' },
    testimonial: {
      quote:
        "Adapty's analytics gave us the visibility we needed to make data-driven decisions. We now know exactly where our revenue comes from.",
      author: {
        name: 'Chris Bick',
        role: 'Founder & CEO',
        company: 'Bickster',
      },
    },
  },
  {
    title: 'Cohort analysis & retention',
    description:
      'Understand how different user cohorts behave over time. Track retention rates, lifetime value, and identify patterns that drive long-term revenue.',
    image: { src: '/images/features/cohort-analysis@2x.webp', alt: 'Cohort analysis charts' },
    reverse: true,
  },
  {
    title: '20+ subscription metrics',
    description:
      'Track all the metrics that matter: MRR, ARR, ARPU, LTV, churn rate, conversion rate, trial-to-paid rate, and more. All calculated automatically.',
    image: { src: '/images/role-cards/img-card-cover-paywalls@2x.webp', alt: 'Subscription metrics dashboard' },
    testimonial: {
      quote:
        'Having all subscription metrics in one place saves us hours every week. The accuracy is much better than what we had before.',
      author: {
        name: 'Kyle Smith',
        role: 'Head of Data',
        company: 'Smitten Dating',
      },
    },
  },
  {
    title: 'Revenue attribution',
    description:
      'Know which campaigns, channels, and user segments drive the most revenue. Connect marketing spend to actual subscription revenue.',
    image: { src: '/images/features/app-monetization-strategies@2x.webp', alt: 'Revenue attribution interface' },
    reverse: true,
    link: { text: 'Learn about attribution', href: 'https://docs.adapty.io/docs/analytics-attribution' },
  },
  {
    title: 'Customizable dashboards',
    description:
      'Build dashboards that match your workflow. Filter by product, country, platform, or any custom attribute. Export data to your BI tools.',
    image: { src: '/images/features/subscription-analytics@2x.webp', alt: 'Custom dashboards' },
    link: { text: 'View documentation', href: 'https://docs.adapty.io/docs/analytics-charts' },
  },
];

const relatedFeaturesData = [
  {
    title: 'A/B Testing',
    description: 'Test paywalls and pricing to maximize revenue',
    href: '/paywall-ab-testing',
    icon: <Target className="w-6 h-6" />,
  },
  {
    title: 'LTV Prediction',
    description: 'Predict user lifetime value with machine learning',
    href: '/ltv-analytics',
    icon: <TrendingUp className="w-6 h-6" />,
  },
  {
    title: 'Cohort Analysis',
    description: 'Track user behavior over time',
    href: '/revenue-analytics',
    icon: <PieChart className="w-6 h-6" />,
  },
  {
    title: 'Integrations',
    description: 'Connect with your analytics stack',
    href: '/integrations',
    icon: <Activity className="w-6 h-6" />,
  },
];

const migrationContent = {
  title: 'Using another analytics solution?',
  subtitle: "We'll help you migrate for free.",
  description:
    'Migrate to Adapty and get accurate, real-time subscription analytics with historical data import. Our team will help you every step of the way.',
  cta: { text: 'Talk to sales', href: 'https://adapty.io/schedule-demo/' },
  image: {
    src: '/images/features/subscription-analytics@2x.webp',
    alt: 'Migration to Adapty',
  },
  competitors: ['RevenueCat', 'Qonversion', 'Superwall'],
};

const ctaBenefits = [
  'Single source of truth for revenue',
  'Automatic cohort and retention insights',
  '20+ subscription metrics included',
  'Export-ready for BI and finance teams',
];

export default function RevenueAnalyticsPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Header />
      <main>
        <SectionErrorBoundary sectionName="Hero">
          <HeroWithBadge {...heroContent} />
        </SectionErrorBoundary>

        {revenueFeatures.map((feature, index) => (
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
            title="Ready to unlock data-driven"
            highlight="revenue insights?"
            description="Join thousands of apps using Adapty to understand and grow their subscription business."
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
