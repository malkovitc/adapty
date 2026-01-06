import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { BackToTop, SectionErrorBoundary } from '@/components/ui';
import { FeatureHero } from '@/components/sections/feature-pages';
import { RoleFeatures } from '@/components/sections/roles';
import Testimonials from '@/components/sections/Testimonials';
import CTA from '@/components/sections/CTA';
import {
  LayoutDashboard,
  FlaskConical,
  Users,
  BarChart3,
  AlertCircle,
} from 'lucide-react';
import PainPoints from './PainPoints';

export const metadata: Metadata = {
  title: 'For Marketers - Adapty | Maximize Conversions with Targeted Paywalls',
  description: 'Customize, A/B test, and personalize paywalls without engineering resources. Make data-driven decisions to boost your subscription revenue.',
  keywords: ['marketing paywalls', 'A/B testing', 'conversion optimization', 'paywall personalization', 'subscription marketing', 'mobile app marketing'],
  openGraph: {
    title: 'For Marketers - Adapty',
    description: 'Maximize conversions with targeted paywalls. No engineering resources required.',
    type: 'website',
    url: 'https://adapty.io/for-marketers',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'For Marketers - Adapty',
    description: 'Maximize conversions with targeted paywalls. No engineering resources required.',
  },
};

const painPoints = [
  {
    icon: <AlertCircle className="w-6 h-6" />,
    question: "Can't update paywalls without developers?",
  },
  {
    icon: <AlertCircle className="w-6 h-6" />,
    question: 'No visibility into what converts?',
  },
  {
    icon: <AlertCircle className="w-6 h-6" />,
    question: 'One-size-fits-all pricing not working?',
  },
];

const features = [
  {
    icon: <LayoutDashboard className="w-7 h-7" />,
    title: 'Dashboard control',
    description: 'Full control over paywalls without coding. Update pricing, designs, and offers instantly from a visual interface.',
  },
  {
    icon: <FlaskConical className="w-7 h-7" />,
    title: 'A/B testing',
    description: 'Test pricing, designs, and offers with statistical significance. Know exactly what converts best for your audience.',
  },
  {
    icon: <Users className="w-7 h-7" />,
    title: 'Audience segmentation',
    description: 'Target different users with different offers based on behavior, geography, or custom attributes.',
  },
  {
    icon: <BarChart3 className="w-7 h-7" />,
    title: 'Real-time analytics',
    description: 'Track conversions and revenue in real-time. See exactly how your experiments perform.',
  },
];

export default function ForMarketersPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Header />
      <main>
        {/* Hero Section */}
        <SectionErrorBoundary sectionName="FeatureHero">
          <FeatureHero
            badge="FOR MARKETERS"
            title="Maximize conversions with targeted paywalls"
            titleHighlight="targeted paywalls"
            description="Customize, A/B test, and personalize paywalls without engineering resources. Make data-driven decisions to boost your subscription revenue."
            primaryCTA={{
              text: 'Start for free',
              href: 'https://adapty.io/signup/',
            }}
            secondaryCTA={{
              text: 'Schedule demo',
              href: '/demo',
            }}
          />
        </SectionErrorBoundary>

        {/* Pain Points */}
        <SectionErrorBoundary sectionName="PainPoints">
          <PainPoints painPoints={painPoints} />
        </SectionErrorBoundary>

        {/* Role Features */}
        <SectionErrorBoundary sectionName="RoleFeatures">
          <RoleFeatures
            title="Tools built for marketers"
            subtitle="Everything you need to optimize conversions without waiting on engineering."
            features={features}
          />
        </SectionErrorBoundary>

        {/* Testimonials */}
        <SectionErrorBoundary sectionName="Testimonials">
          <Testimonials />
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
