'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, FlaskConical, Globe, Target, Palette } from 'lucide-react';
import Image from 'next/image';
import { Header, Footer } from '@/components/layout';
import { BackToTop, SectionErrorBoundary, Button } from '@/components/ui';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import CaseStudies from '@/components/sections/CaseStudies';
import StatsSection from '@/components/sections/StatsSection';
import FeatureWithQuote from '@/components/sections/FeatureWithQuote';
import RelatedFeatures from '@/components/sections/RelatedFeatures';
import CTA from '@/components/sections/CTA';
import { HeroWithBadge } from '@/components/sections/heroes';
import { getAssetPath } from '@/lib/utils';

const heroContent = {
  badge: 'PAYWALL MANAGEMENT',
  title: 'A/B test paywalls without coding',
  subtitle: 'Compare paywalls without leaving Adapty Dashboard and find the winner without data analysis.',
  image: {
    src: '/images/features/paywall-ab-testing@2x.webp',
    alt: 'Adapty A/B Testing Interface showing paywall variants',
  },
};

const abTestingStats = [
  { id: 'events', value: 30, suffix: 'M+', label: 'subscription events/month' },
  { id: 'users', value: 2.5, suffix: 'B', label: 'users', decimals: 1 },
  { id: 'subscribers', value: 6, suffix: 'M+', label: 'subscribers/month' },
  { id: 'api-calls', value: 60, suffix: 'B', label: 'API calls/month' },
];

const inlineTestimonials = [
  {
    quote: "Adapty's platform makes it easy for non-developers to create and manage A/B tests, paywalls, product mix and pricing structure.",
    author: 'Magnus Olafsson',
    role: 'CTO',
    company: 'Smitten',
  },
  {
    quote: 'We migrated all our apps to Adapty for the A/B test, analytics, remote config features among others. Now, testing paywalls is a breeze with Adapty!',
    author: 'Nikolay Chebotarev',
    role: 'Head of UA',
    company: 'Moonly.app',
  },
];

const abTestingFeatures = [
  {
    title: 'A/B/C testing supported',
    description: 'Split your test on as many parts as you want, and test any number of paywall variations at the same time.',
    image: { src: '/images/role-cards/img-card-cover-charts@2x.webp', alt: 'ABC testing interface showing multiple variants' },
    testimonial: {
      quote: inlineTestimonials[0].quote,
      author: {
        name: inlineTestimonials[0].author,
        role: inlineTestimonials[0].role,
        company: inlineTestimonials[0].company,
      },
    },
  },
  {
    title: 'Auto metric calculation',
    description: 'Adapty calculates 20+ metrics in real-time to give you a representative view of your A/B testing result.',
    image: { src: '/images/role-cards/img-card-cover-paywalls@2x.webp', alt: 'Metrics dashboard showing conversion rates' },
    testimonial: {
      quote: inlineTestimonials[1].quote,
      author: {
        name: inlineTestimonials[1].author,
        role: inlineTestimonials[1].role,
        company: inlineTestimonials[1].company,
      },
    },
    reversed: true,
  },
  {
    title: 'Powered by machine learning',
    description: 'Adapty uses Bayesian statistics and AI-powered predictive models to predict a test winner.',
    image: { src: '/images/features/app-monetization-strategies@2x.webp', alt: 'Machine learning prediction interface' },
    link: { text: 'Read the docs', href: 'https://docs.adapty.io/docs/ab-tests' },
  },
  {
    title: 'Start and stop tests at any time',
    description: 'Start a new test or finish an existing one with one click in the Adapty dashboard with Placements.',
    image: { src: '/images/role-cards/img-card-cover-sdk-install@2x.webp', alt: 'Placements interface for test management' },
    link: { text: 'Read the docs', href: 'https://docs.adapty.io/docs/placements' },
    reversed: true,
  },
];

const relatedFeaturesData = [
  {
    title: 'Remote Config',
    description: 'Update paywall configuration without app releases',
    href: '/remote-config',
    icon: <Palette className="w-6 h-6" />,
  },
  {
    title: 'Localization',
    description: 'Adapt paywalls for different languages and regions',
    href: '/paywall-builder',
    icon: <Globe className="w-6 h-6" />,
  },
  {
    title: 'Targeting',
    description: 'Show personalized paywalls to different user segments',
    href: '/paywall-builder',
    icon: <Target className="w-6 h-6" />,
  },
  {
    title: 'Paywall Builder',
    description: 'Create beautiful paywalls without coding',
    href: '/paywall-builder',
    icon: <FlaskConical className="w-6 h-6" />,
  },
];

const ctaBenefits = [
  'Run unlimited experiments',
  'Forecast winners automatically',
  'No engineering required',
  'Hands-on onboarding support',
];

// Testimonials Carousel Section
const carouselTestimonials = [
  {
    quote: "We chose Adapty for its powerful paywall A/B testing capabilities, which helped us optimize our monetization strategy effectively. The user-friendly platform, flexible pricing, and exceptional customer support make Adapty a superior choice over competitors.",
    author: "Yalcin Ozdemir",
    role: "Founder & CEO",
    company: "AppNation",
    photo: "/images/testimonials/yalcin-ozdemir.webp",
    logo: "/images/testimonials/logo-appnation.png",
  },
  {
    quote: "We've tested more than three hundred paywalls in the space of four months. Adapty allows testing basically any element of the paywall, and we took advantage of that. With Adapty's A/B testing, we managed to double our monthly revenue.",
    author: "Roi Mulia",
    role: "Founder & CEO",
    company: "SocialKit",
    photo: "/images/testimonials/roi-mulia.webp",
    logo: "/images/testimonials/logo-socialkit.svg",
  },
  {
    quote: "Adapty's platform makes it easy for non-developers to create and manage A/B tests, paywalls, product mix and pricing structure. They have a great external API that makes it easy to pass related events to other analytics tools.",
    author: "Kyle Smith",
    role: "Head of Data",
    company: "Smitten Dating",
    photo: "/images/testimonials/kyle-smith.webp",
    logo: "/images/testimonials/logo-smitten.webp",
  },
  {
    quote: "Migrating off RevenueCat was not an easy decision for us. We've chosen Adapty because we believe they are a better partner as we grow. Looking back it was the right call. I recommend Adapty as a reliable partner.",
    author: "Cem Ortabas",
    role: "Co-founder and CEO",
    company: "HubX",
    photo: "/images/testimonials/cem-ortabas.webp",
    logo: "/images/testimonials/logo-hubx.svg",
  },
];

function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? carouselTestimonials.length - 1 : prev - 1));
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === carouselTestimonials.length - 1 ? 0 : prev + 1));
  }, []);

  const currentTestimonial = carouselTestimonials[currentIndex];

  return (
    <Section size="lg" background="dark" className="overflow-hidden relative">
      <Container>
        {/* Section Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-12"
        >
          People from all kinds of businesses turn to Adapty to grow their revenue
        </motion.h2>

        {/* Testimonial Slider */}
        <div className="relative">
          {/* Navigation Arrows */}
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 text-white/60 hover:text-white hover:bg-transparent transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-10 h-10 sm:w-12 sm:h-12" strokeWidth={1.5} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 text-white/60 hover:text-white hover:bg-transparent transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-10 h-10 sm:w-12 sm:h-12" strokeWidth={1.5} />
          </Button>

          {/* Testimonial Content */}
          <div className="px-12 sm:px-16 md:px-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="grid md:grid-cols-2 gap-8 md:gap-12 items-center"
              >
                {/* Photo */}
                <div className="relative flex justify-center md:justify-start">
                  <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-2xl overflow-hidden">
                    <Image
                      src={getAssetPath(currentTestimonial.photo)}
                      alt={currentTestimonial.author}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 256px, 288px"
                      unoptimized
                    />
                  </div>
                </div>

                {/* Quote and Author */}
                <div className="flex flex-col">
                  <blockquote className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-8 min-h-[180px] sm:min-h-[200px] md:min-h-[220px]">
                    &ldquo;{currentTestimonial.quote}&rdquo;
                  </blockquote>

                  <div className="mb-6">
                    <p className="text-xl font-semibold text-white">
                      {currentTestimonial.author}
                    </p>
                    <p className="text-slate-400">
                      {currentTestimonial.role}, {currentTestimonial.company}
                    </p>
                  </div>

                  {/* Company Logo */}
                  <div className="h-8 relative">
                    <Image
                      src={getAssetPath(currentTestimonial.logo)}
                      alt={currentTestimonial.company}
                      width={120}
                      height={32}
                      className="h-8 w-auto object-contain brightness-0 invert opacity-80"
                      unoptimized
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-3 mt-12">
            {carouselTestimonials.map((_, index) => (
              <Button
                key={index}
                variant="ghost"
                size="icon"
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 p-0 rounded-full transition-all duration-300 hover:bg-transparent ${
                  index === currentIndex
                    ? 'bg-white w-8'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              >
                <span className="sr-only">Go to testimonial {index + 1}</span>
              </Button>
            ))}
          </div>
        </div>
      </Container>

      {/* Gradient decoration at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-violet-600/20 to-transparent pointer-events-none" />
    </Section>
  );
}

// Main Page Component
export default function PaywallABTestingPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Header />
      <main>
        <SectionErrorBoundary sectionName="Hero">
          <HeroWithBadge
            badge={heroContent.badge}
            title={heroContent.title}
            subtitle={heroContent.subtitle}
            primaryCTA={{ text: 'Schedule a demo', href: 'https://adapty.io/schedule-demo/' }}
            secondaryCTA={{ text: 'Start for free', href: 'https://app.adapty.io/signup' }}
            image={heroContent.image}
          />
        </SectionErrorBoundary>

        <SectionErrorBoundary sectionName="Stats">
          <StatsSection
            stats={abTestingStats}
            size="lg"
            background="gradient"
            title="Enterprise-grade battle-tested solution"
          />
        </SectionErrorBoundary>

        {abTestingFeatures.map((feature, index) => (
          <SectionErrorBoundary key={feature.title} sectionName={`Feature-${index + 1}`}>
            <FeatureWithQuote
              title={feature.title}
              description={feature.description}
              image={feature.image}
              testimonial={feature.testimonial}
              reverse={feature.reversed}
              link={feature.link}
              background="white"
            />
          </SectionErrorBoundary>
        ))}

        {/* Testimonials Carousel */}
        <SectionErrorBoundary sectionName="TestimonialsCarousel">
          <TestimonialsCarousel />
        </SectionErrorBoundary>

        {/* Case Studies */}
        <SectionErrorBoundary sectionName="CaseStudies">
          <CaseStudies />
        </SectionErrorBoundary>

        {/* Related Links */}
        <SectionErrorBoundary sectionName="RelatedFeatures">
          <RelatedFeatures
            features={relatedFeaturesData}
            columns={4}
            title="Learn more about Paywall management"
            background="gray"
          />
        </SectionErrorBoundary>

        {/* Final CTA */}
        <SectionErrorBoundary sectionName="CTA">
          <CTA
            title="Ready to optimize your"
            highlight="paywalls?"
            description="Join thousands of apps using Adapty to A/B test paywalls and grow their subscription revenue."
            benefits={ctaBenefits}
            primaryCTA={{
              label: 'Schedule a demo',
              href: 'https://adapty.io/schedule-demo/',
              variant: 'primary',
              icon: <ArrowRight className="w-5 h-5" />,
            }}
            secondaryCTA={{
              label: 'Start for free',
              href: 'https://app.adapty.io/signup',
              variant: 'secondary',
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
