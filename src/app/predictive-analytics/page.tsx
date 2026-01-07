'use client';

import { ArrowRight, TrendingUp, Target, AlertTriangle } from 'lucide-react';
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
  badge: 'PREDICTIVE ANALYTICS',
  title: 'Predict churn before it happens',
  subtitle: 'Use AI-powered predictions to identify at-risk subscribers and take action before they cancel. Reduce churn and maximize retention.',
  primaryCTA: { text: 'Schedule a demo', href: 'https://adapty.io/schedule-demo/' },
  secondaryCTA: { text: 'Start for free', href: 'https://app.adapty.io/signup' },
  image: { src: '/images/features/subscription-analytics@2x.webp', alt: 'Adapty Predictive Analytics Dashboard' },
};

const predictiveFeatures = [
  {
    title: 'AI-powered churn prediction',
    description:
      'Our machine learning models analyze user behavior patterns to identify subscribers at risk of churning. Get alerts before cancellations happen.',
    image: { src: '/images/role-cards/img-card-cover-charts@2x.webp', alt: 'Churn prediction dashboard' },
    testimonial: {
      quote: "Adapty's predictive analytics helped us reduce churn by 25%. We can now intervene with at-risk users before they cancel.",
      author: { name: 'Cem Ortabas', role: 'Co-founder and CEO', company: 'HubX' },
    },
  },
  {
    title: 'Renewal probability scoring',
    description: 'Know the likelihood of each subscriber renewing. Prioritize retention efforts on users who need the most attention.',
    image: { src: '/images/features/cohort-analysis@2x.webp', alt: 'Renewal probability scores' },
    reverse: true,
  },
  {
    title: 'A/B test winner prediction',
    description:
      'Our Bayesian statistics models predict test winners before reaching statistical significance. Make faster, data-driven decisions.',
    image: { src: '/images/features/paywall-ab-testing@2x.webp', alt: 'A/B test predictions' },
    testimonial: {
      quote: 'The predicted winner feature saves us weeks of testing time. We can iterate much faster now.',
      author: { name: 'Roi Mulia', role: 'Founder & CEO', company: 'SocialKit' },
    },
  },
  {
    title: 'Revenue forecasting',
    description:
      'Project future revenue based on current trends, churn predictions, and growth patterns. Plan your business with confidence.',
    image: { src: '/images/role-cards/img-card-cover-paywalls@2x.webp', alt: 'Revenue forecasts' },
    reverse: true,
    link: { text: 'Learn about forecasting', href: 'https://docs.adapty.io/docs/analytics-charts' },
  },
];

const relatedFeaturesData = [
  {
    title: 'LTV Analytics',
    description: 'Predict customer lifetime value',
    href: '/ltv-analytics',
    icon: <TrendingUp className="w-6 h-6" />,
  },
  {
    title: 'Revenue Analytics',
    description: 'Track all subscription metrics',
    href: '/revenue-analytics',
    icon: <Target className="w-6 h-6" />,
  },
  {
    title: 'A/B Testing',
    description: 'Test with predicted winners',
    href: '/paywall-ab-testing',
    icon: <Target className="w-6 h-6" />,
  },
  {
    title: 'Churn Prevention',
    description: 'Identify at-risk subscribers',
    href: '/predictive-analytics',
    icon: <AlertTriangle className="w-6 h-6" />,
  },
];

const ctaBenefits = [
  'Predict churn and revenue with AI',
  'Get alerts before cancellations happen',
  'Prioritize retention efforts automatically',
  'Act on insights across platforms',
];

const migrationContent = {
  title: 'Stop reacting to churn. Start predicting it.',
  subtitle: 'Most analytics tools only tell you what happened. Adapty tells you what will happen next.',
  description:
    "See predictive analytics in action and learn how Adapty's models can reduce churn with proactive retention workflows.",
  cta: { text: 'See predictive analytics in action', href: 'https://adapty.io/schedule-demo/' },
  image: {
    src: '/images/features/subscription-analytics@2x.webp',
    alt: 'Predictive analytics migration',
  },
};

export default function PredictiveAnalyticsPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Header />
      <main>
        <SectionErrorBoundary sectionName="Hero">
          <HeroWithBadge {...heroContent} />
        </SectionErrorBoundary>

        {predictiveFeatures.map((feature, index) => (
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
            title="Ready to predict churn and revenue?"
            highlight="Let AI guide your monetization"
            description="Join thousands of apps using Adapty to predict churn, forecast revenue, and grow their subscription business."
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
