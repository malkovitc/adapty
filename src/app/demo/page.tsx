import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { BackToTop, SectionErrorBoundary } from '@/components/ui';
import DemoContent from './DemoContent';

export const metadata: Metadata = {
  title: 'Schedule a Demo - Adapty | See How to Boost Your App Revenue',
  description: 'Book a personalized demo with Adapty. Learn how to increase your app revenue with smart paywall management and in-app subscription analytics.',
  keywords: ['demo', 'schedule demo', 'in-app subscriptions', 'paywall management', 'app revenue', 'mobile monetization'],
  openGraph: {
    title: 'Schedule a Demo - Adapty',
    description: 'Book a personalized demo to learn how Adapty can boost your app revenue with smart paywall management.',
    type: 'website',
    url: 'https://adapty.io/demo',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Schedule a Demo - Adapty',
    description: 'Book a personalized demo to learn how Adapty can boost your app revenue with smart paywall management.',
  },
};

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Header />
      <main>
        <SectionErrorBoundary sectionName="DemoContent">
          <DemoContent />
        </SectionErrorBoundary>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
