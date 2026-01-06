import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { BackToTop, SectionErrorBoundary } from '@/components/ui';
import { FeatureHero } from '@/components/sections/feature-pages';
import { RoleFeatures } from '@/components/sections/roles';
import Testimonials from '@/components/sections/Testimonials';
import CTA from '@/components/sections/CTA';
import {
  Code2,
  Layers,
  ShieldCheck,
  Webhook,
  AlertCircle,
} from 'lucide-react';
import PainPoints from './PainPoints';
import CodeExample from './CodeExample';

export const metadata: Metadata = {
  title: 'For Developers - Adapty | Integrate Subscriptions in 30 Minutes',
  description: 'Stop building subscription infrastructure from scratch. Our well-maintained SDKs handle the complexity so you can focus on your product.',
  keywords: ['subscription SDK', 'in-app purchase SDK', 'iOS subscriptions', 'Android subscriptions', 'React Native subscriptions', 'Flutter subscriptions'],
  openGraph: {
    title: 'For Developers - Adapty',
    description: 'Integrate subscriptions in 30 minutes with our open-source SDKs.',
    type: 'website',
    url: 'https://adapty.io/for-developers',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'For Developers - Adapty',
    description: 'Integrate subscriptions in 30 minutes with our open-source SDKs.',
  },
};

const painPoints = [
  {
    icon: <AlertCircle className="w-6 h-6" />,
    question: 'Tired of App Store receipt validation headaches?',
  },
  {
    icon: <AlertCircle className="w-6 h-6" />,
    question: 'Spending weeks on subscription infrastructure?',
  },
  {
    icon: <AlertCircle className="w-6 h-6" />,
    question: 'Dealing with cross-platform sync issues?',
  },
];

const features = [
  {
    icon: <Code2 className="w-7 h-7" />,
    title: 'Simple SDK',
    description: 'Just 3 methods: configure, identify, purchase. No complex setup or boilerplate code required.',
  },
  {
    icon: <Layers className="w-7 h-7" />,
    title: 'Cross-platform',
    description: 'iOS, Android, React Native, Flutter, Unity. One consistent API across all platforms.',
  },
  {
    icon: <ShieldCheck className="w-7 h-7" />,
    title: 'Server-side validation',
    description: 'We handle receipt validation securely. No more dealing with App Store and Google Play APIs.',
  },
  {
    icon: <Webhook className="w-7 h-7" />,
    title: 'Webhooks',
    description: 'Real-time events for your backend. Know immediately when subscriptions change.',
  },
];

export default function ForDevelopersPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Header />
      <main>
        {/* Hero Section */}
        <SectionErrorBoundary sectionName="FeatureHero">
          <FeatureHero
            badge="FOR DEVELOPERS"
            title="Integrate subscriptions in 30 minutes"
            titleHighlight="30 minutes"
            description="Stop building subscription infrastructure from scratch. Our well-maintained SDKs handle the complexity so you can focus on your product."
            primaryCTA={{
              text: 'View documentation',
              href: 'https://docs.adapty.io/',
            }}
            secondaryCTA={{
              text: 'Start for free',
              href: 'https://adapty.io/signup/',
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
            title="Built for developers, by developers"
            subtitle="Everything you need to implement subscriptions without the headaches."
            features={features}
          />
        </SectionErrorBoundary>

        {/* Code Example */}
        <SectionErrorBoundary sectionName="CodeExample">
          <CodeExample />
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
