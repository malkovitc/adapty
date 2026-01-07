'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Layers, Type, Palette, Sparkles, Package, Globe, FlaskConical, Settings, Target } from 'lucide-react';
import { Header, Footer } from '@/components/layout';
import { BackToTop, SectionErrorBoundary } from '@/components/ui';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import CaseStudies from '@/components/sections/CaseStudies';
import EnterpriseSection from '@/components/sections/EnterpriseSection';
import TemplatesCarousel from '@/components/sections/TemplatesCarousel';
import StickyBenefits from '@/components/sections/StickyBenefits';
import PhoneMockup from '@/components/ui/PhoneMockup';
import StatsSection from '@/components/sections/StatsSection';
import RelatedFeatures from '@/components/sections/RelatedFeatures';
import VideoPreview from '@/components/sections/VideoPreview';
import FeatureChecklist from '@/components/sections/FeatureChecklist';
import CTA from '@/components/sections/CTA';
import { HeroWithBadge } from '@/components/sections/heroes';
import { getAssetPath } from '@/lib/utils';

const paywallStats = [
  { id: 'revenue', value: 13, prefix: '$', suffix: 'M+', label: 'Revenue generated' },
  { id: 'paywalls', value: 5000, suffix: '+', label: 'Paywalls created' },
  { id: 'apps', value: 500, suffix: '+', label: 'Apps' },
  { id: 'clients', value: 200, suffix: '+', label: 'Clients' },
];

const paywallRelatedFeatures = [
  {
    title: 'A/B Testing',
    description: 'Run experiments to optimize your paywall performance',
    href: '/paywall-ab-testing',
    icon: <FlaskConical className="w-6 h-6" />,
  },
  {
    title: 'Localization',
    description: 'Adapt paywalls for different languages and regions',
    href: '/localization',
    icon: <Globe className="w-6 h-6" />,
  },
  {
    title: 'Targeting',
    description: 'Show personalized paywalls to different user segments',
    href: '/targeting',
    icon: <Target className="w-6 h-6" />,
  },
  {
    title: 'Adapty SDK',
    description: 'Easy integration with comprehensive documentation',
    href: '/sdk',
    icon: <Package className="w-6 h-6" />,
  },
];

const paywallVideoContent = {
  title: 'Paywall building made simple',
  description: 'See how easy it is to create professional paywalls in minutes',
  caption: 'Watch the demo video',
};

const paywallFeatureHighlights = [
  {
    icon: <Layers className="w-6 h-6" />,
    title: 'Hard/Soft paywall',
    description: 'Choose between blocking or dismissible paywalls to match your monetization strategy.',
  },
  {
    icon: <Type className="w-6 h-6" />,
    title: 'Headline and benefits',
    description: 'Customize your messaging with compelling headlines and value propositions.',
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: 'CTA-button text',
    description: 'Test different call-to-action text to maximize conversion rates.',
  },
  {
    icon: <Palette className="w-6 h-6" />,
    title: 'Background and color scheme',
    description: 'Match your brand with customizable colors, gradients, and backgrounds.',
  },
  {
    icon: <Settings className="w-6 h-6" />,
    title: 'Extra elements',
    description: 'Add badges, timers, reviews, and other elements to boost conversions.',
  },
  {
    icon: <Package className="w-6 h-6" />,
    title: 'Product combinations and prices',
    description: 'Display multiple subscription options with flexible pricing layouts.',
  },
];

// Phone Mockup Section
function PhoneMockupSection() {
  const phoneBenefits = [
    'Unlimited access',
    'No ads',
    'Priority support',
  ];

  const phoneTestimonials = [
    {
      id: 1,
      name: 'Sarah M.',
      quote: 'This app changed my daily routine completely. Worth every penny!',
      rating: 5,
    },
    {
      id: 2,
      name: 'James K.',
      quote: 'Finally an app that delivers on its promises. Premium is a must-have.',
      rating: 5,
    },
    {
      id: 3,
      name: 'Emily R.',
      quote: 'Best investment I made this year. The features are incredible.',
      rating: 5,
    },
    {
      id: 4,
      name: 'Michael T.',
      quote: 'Upgraded to yearly and never looked back. Highly recommend!',
      rating: 5,
    },
  ];

  const planOptions = [
    { id: 'yearly', label: 'Yearly', price: '$4.99', period: 'mo', popular: true },
    { id: 'monthly', label: 'Monthly', price: '$6.99', period: 'mo' },
  ];

  return (
    <Section size="lg" background="white">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
              See your paywall come to life
            </h2>
            <p className="text-lg text-slate-500 mb-8">
              Preview exactly how your paywall will look on real devices. Our interactive mockup shows testimonial carousels, pricing options, and CTAs - all customizable in real-time.
            </p>
            <ul className="space-y-4">
              {[
                'Interactive testimonial carousel with ratings',
                'Flexible pricing options (yearly/monthly)',
                'Customizable CTA buttons',
                'Real-time preview on device mockup',
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center gap-3 text-slate-700"
                >
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <PhoneMockup
              appName="Unlock Premium"
              tagline="Get access to all features"
              benefits={phoneBenefits}
              testimonials={phoneTestimonials}
              planOptions={planOptions}
              note="Cancel anytime. Billed annually at $59.99/year."
            />
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}

// Main Page Component
export default function PaywallBuilderPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Header />
      <main>
        {/* Hero Section */}
        <SectionErrorBoundary sectionName="Hero">
          <HeroWithBadge
            badge="PAYWALL MANAGEMENT"
            title="Build money-making paywalls without coding"
            titleHighlight="money-making paywalls"
            subtitle="Create, edit, and release payment screens in minutes. No designer or developer needed."
            primaryCTA={{ text: 'Schedule a demo', href: 'https://adapty.io/schedule-demo/' }}
            secondaryCTA={{ text: 'Start for free', href: 'https://app.adapty.io/signup' }}
            image={{
              src: getAssetPath('/images/features/no-code-paywall-builder@2x.webp'),
              alt: 'Adapty Paywall Builder interface preview',
            }}
          />
        </SectionErrorBoundary>

        {/* Video Section */}
        <SectionErrorBoundary sectionName="Video">
          <VideoPreview
            title={paywallVideoContent.title}
            description={paywallVideoContent.description}
            caption={paywallVideoContent.caption}
          />
        </SectionErrorBoundary>

        {/* Stats Section */}
        <SectionErrorBoundary sectionName="Stats">
          <StatsSection
            stats={paywallStats}
            size="lg"
            background="gradient"
            title={
              <>
                Paywalls created with Adapty&apos;s Paywall Builder generated{' '}
                <span className="bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">
                  $13M in subscription revenue
                </span>
              </>
            }
          />
        </SectionErrorBoundary>

        {/* Phone Mockup Section */}
        <SectionErrorBoundary sectionName="PhoneMockup">
          <PhoneMockupSection />
        </SectionErrorBoundary>

        {/* Features Section */}
        <SectionErrorBoundary sectionName="Features">
          <FeatureChecklist
            title="Endless customization possibilities"
            description="Each paywall is composed of separate widget elements that can be placed to your liking."
            features={paywallFeatureHighlights}
            columns={3}
            background="gray"
          />
        </SectionErrorBoundary>

        {/* Sticky Benefits Section */}
        <SectionErrorBoundary sectionName="StickyBenefits">
          <StickyBenefits />
        </SectionErrorBoundary>

        {/* Templates Carousel */}
        <SectionErrorBoundary sectionName="Templates">
          <TemplatesCarousel />
        </SectionErrorBoundary>

        {/* Enterprise Section (includes G2 badges) */}
        <SectionErrorBoundary sectionName="Enterprise">
          <EnterpriseSection />
        </SectionErrorBoundary>

        {/* Case Studies */}
        <SectionErrorBoundary sectionName="CaseStudies">
          <CaseStudies />
        </SectionErrorBoundary>

        {/* Related Features */}
        <SectionErrorBoundary sectionName="RelatedFeatures">
          <RelatedFeatures
            features={paywallRelatedFeatures}
            columns={4}
            title="Explore related features"
            background="gray"
          />
        </SectionErrorBoundary>

        {/* Final CTA */}
        <SectionErrorBoundary sectionName="FinalCTA">
          <CTA
            title="Ready to build your"
            highlight="perfect paywall?"
            description="Join thousands of apps using Adapty to create high-converting paywalls and grow their subscription revenue."
            primaryCTA={{
              label: 'Schedule a demo',
              href: 'https://adapty.io/schedule-demo/',
              variant: 'primary',
              icon: <ArrowRight className="w-5 h-5" />,
              iconPosition: 'right',
            }}
            secondaryCTA={{
              label: 'Start for free',
              href: 'https://app.adapty.io/signup',
              variant: 'secondary',
              icon: <ArrowRight className="w-5 h-5" />,
              iconPosition: 'right',
            }}
            benefits={[
              'No-code builder for marketers',
              'Native paywalls for every platform',
              'Instant publishing without releases',
              'Dedicated customer success team',
            ]}
          />
        </SectionErrorBoundary>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
