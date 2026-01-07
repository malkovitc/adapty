'use client';

import { ArrowRight, TrendingUp, BarChart3, Target, Brain } from 'lucide-react';
import { Header, Footer } from '@/components/layout';
import { BackToTop, SectionErrorBoundary } from '@/components/ui';
import Testimonials from '@/components/sections/Testimonials';
import CaseStudies from '@/components/sections/CaseStudies';
import CTA from '@/components/sections/CTA';
import MigrationCTA from '@/components/sections/MigrationCTA';
import { HeroWithBadge } from '@/components/sections/heroes';
import FeatureWithQuote from '@/components/sections/FeatureWithQuote';
import RelatedFeatures from '@/components/sections/RelatedFeatures';

const heroContent = {
  badge: 'LTV ANALYTICS',
  title: 'Know your customer lifetime value from day one',
  subtitle: 'Predict how much revenue each user will generate over their lifetime. Make smarter decisions about acquisition and retention.',
  primaryCTA: { text: 'Schedule a demo', href: 'https://adapty.io/schedule-demo/' },
  secondaryCTA: { text: 'Start for free', href: 'https://app.adapty.io/signup' },
  image: { src: '/images/features/cohort-analysis@2x.webp', alt: 'Adapty LTV Analytics Dashboard' },
};

const ltvFeatures = [
  {
    title: 'Predict LTV from first purchase',
    description:
      'Use machine learning to forecast user lifetime value based on early behavior patterns. Know which users will be most valuable before they churn.',
    image: { src: '/images/role-cards/img-card-cover-charts@2x.webp', alt: 'LTV prediction dashboard' },
    testimonial: {
      quote: 'Understanding predicted LTV lets us invest more in acquiring high-value users. Our ROAS improved by 40%.',
      author: { name: 'Chris Bick', role: 'Founder & CEO', company: 'Bickster' },
    },
  },
  {
    title: 'Segment users by predicted value',
    description:
      'Create audiences based on forecasted LTV, retention probability, and product preferences. Target each segment with the right messaging.',
    image: { src: '/images/role-cards/img-card-cover-paywalls@2x.webp', alt: 'User segments' },
    reverse: true,
  },
  {
    title: 'Optimize acquisition bids',
    description:
      'Feed predicted LTV back into your ad platforms to bid more aggressively on high-value cohorts and cut spend on low-value traffic.',
    image: { src: '/images/features/app-monetization-strategies@2x.webp', alt: 'Campaign optimization' },
    testimonial: {
      quote: 'Once we connected predicted LTV to our ad campaigns, we stopped guessing. UA spend is finally tied to real value.',
      author: { name: 'Kyle Smith', role: 'Head of Data', company: 'Smitten Dating' },
    },
  },
  {
    title: 'Custom dashboards for finance teams',
    description:
      'Share LTV cohorts with finance, exec, and investor stakeholders. Export data to BI tools or schedule recurring email reports.',
    image: { src: '/images/features/subscription-analytics@2x.webp', alt: 'Finance dashboards' },
    reverse: true,
    link: { text: 'View documentation', href: 'https://docs.adapty.io/docs/analytics-charts' },
  },
];

const relatedFeaturesData = [
  {
    title: 'Revenue Analytics',
    description: 'Track all subscription metrics in real time',
    href: '/revenue-analytics',
    icon: <BarChart3 className="w-6 h-6" />,
  },
  {
    title: 'Predictive Analytics',
    description: 'Forecast churn and revenue automatically',
    href: '/predictive-analytics',
    icon: <Brain className="w-6 h-6" />,
  },
  {
    title: 'A/B Testing',
    description: 'Experiment with pricing and paywalls',
    href: '/paywall-ab-testing',
    icon: <Target className="w-6 h-6" />,
  },
  {
    title: 'Paywall Builder',
    description: 'Ship paywalls that maximize LTV',
    href: '/paywall-builder',
    icon: <TrendingUp className="w-6 h-6" />,
  },
];

const migrationContent = {
  title: 'Migrate from spreadsheets to AI-powered LTV',
  subtitle: 'Adapty imports your historical data and surfaces new cohorts automatically.',
  description: 'Our team will migrate historical subscription events so you get instant LTV forecasting without rebuilding everything from scratch.',
  cta: { text: 'Talk to sales', href: 'https://adapty.io/schedule-demo/' },
  image: { src: '/images/features/subscription-analytics@2x.webp', alt: 'LTV migration' },
  competitors: ['RevenueCat', 'Apphud', 'Superwall'],
};

const ctaBenefits = [
  'Predictive LTV for every cohort',
  'Automated exports for finance teams',
  'No-code segmentation and targeting',
  'Works across iOS, Android, and web',
];

export default function LTVAnalyticsPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Header />
      <main>
        <SectionErrorBoundary sectionName="Hero">
          <HeroWithBadge {...heroContent} />
        </SectionErrorBoundary>

        {ltvFeatures.map((feature, index) => (
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

        <SectionErrorBoundary sectionName="CaseStudies">
          <CaseStudies />
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
            title="Ready to predict lifetime value?"
            highlight="Put Adapty’s LTV models to work"
            description="Join thousands of apps using Adapty to forecast lifetime value and scale customer acquisition profitably."
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
