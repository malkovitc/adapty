'use client';

import { motion, useReducedMotion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { ArrowRight, Play, Layers, Type, Palette, Sparkles, Package, Globe, FlaskConical, Settings, Target } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Header, Footer } from '@/components/layout';
import { BackToTop, SectionErrorBoundary } from '@/components/ui';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import CaseStudies from '@/components/sections/CaseStudies';
import EnterpriseSection from '@/components/sections/EnterpriseSection';
import TemplatesCarousel from './TemplatesCarousel';
import StickyBenefits from './StickyBenefits';
import PhoneMockup from './PhoneMockup';
import { getAssetPath } from '@/lib/utils';

// Animated Counter Component
interface CounterProps {
  end: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
}

function AnimatedCounter({ end, prefix = '', suffix = '', decimals = 0, duration = 2 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = easeOutQuart * end;

      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isInView, end, duration]);

  const displayValue = decimals > 0 ? count.toFixed(decimals) : Math.round(count);

  return (
    <span ref={ref}>
      {prefix}{displayValue}{suffix}
    </span>
  );
}

// Hero Section
function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.3 : 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#FAFAFA]">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-purple-100/60 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-bl from-blue-100/60 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-20 mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <span
              className="group relative inline-flex items-center gap-2 rounded-full text-sm font-semibold uppercase tracking-wider text-slate-600 animate-border"
              style={{
                background: `
                  linear-gradient(white, white) padding-box,
                  conic-gradient(
                    from var(--border-angle),
                    rgba(99, 102, 241, 0.15) 0%,
                    rgba(59, 130, 246, 0.5) 25%,
                    rgba(6, 182, 212, 0.5) 50%,
                    rgba(59, 130, 246, 0.5) 75%,
                    rgba(99, 102, 241, 0.15) 100%
                  ) border-box
                `,
                border: '1.5px solid transparent',
                padding: '0.5rem 1rem',
              }}
            >
              PAYWALL MANAGEMENT
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-center mb-6"
          >
            <span className="text-slate-900">Build </span>
            <span className="bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">
              money-making paywalls
            </span>
            <span className="text-slate-900"> without coding</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-slate-500 text-center leading-relaxed mb-8"
            style={{ width: '100%', maxWidth: '42rem' }}
          >
            Create, edit, and release payment screens in minutes. No designer or developer needed.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="https://adapty.io/schedule-demo/"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-violet-600 to-pink-500 hover:from-violet-700 hover:to-pink-600 text-white font-semibold rounded-lg transition-all shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/30"
            >
              Schedule a demo
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="https://app.adapty.io/signup"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-900 font-medium rounded-lg border-2 border-slate-200 hover:border-slate-300 transition-all"
            >
              Start for free
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8 pb-16"
      >
        <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-slate-300/50 border border-slate-200">
          <Image
            src={getAssetPath('/images/features/no-code-paywall-builder@2x.webp')}
            alt="Adapty Paywall Builder Interface"
            width={1400}
            height={900}
            className="w-full h-auto"
            priority
            unoptimized
          />
        </div>
      </motion.div>
    </section>
  );
}

// Video Section
function VideoSection() {
  return (
    <Section size="lg" background="white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Paywall building made simple
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            See how easy it is to create professional paywalls in minutes
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 shadow-2xl"
        >
          {/* Video placeholder - replace with actual video embed */}
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-violet-900 to-slate-900">
            <button className="group flex items-center justify-center w-20 h-20 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all hover:scale-110">
              <Play className="w-8 h-8 text-white ml-1" fill="white" />
            </button>
          </div>
          <div className="absolute bottom-4 left-4 text-white/60 text-sm">
            Watch the demo video
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}

// Stats Section
function StatsSection() {
  const stats = [
    { value: 13, prefix: '$', suffix: 'M+', label: 'Revenue generated' },
    { value: 5000, suffix: '+', label: 'Paywalls created' },
    { value: 500, suffix: '+', label: 'Apps' },
    { value: 200, suffix: '+', label: 'Clients' },
  ];

  return (
    <Section size="lg" background="gradient">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 max-w-4xl mx-auto">
            Paywalls created with Adapty&apos;s Paywall Builder generated{' '}
            <span className="bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">
              $13M in subscription revenue
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-2">
                <AnimatedCounter
                  end={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </div>
              <p className="text-slate-500 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

// Features Section
function FeaturesSection() {
  const features = [
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

  return (
    <Section size="lg" background="gray">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Endless customization possibilities
          </h2>
          <p className="text-lg text-slate-500 max-w-3xl mx-auto">
            Each paywall is composed of separate widget elements that can be placed to your liking.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-6 bg-white rounded-2xl border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-xl bg-gradient-to-br from-violet-50 to-pink-50 text-violet-600 group-hover:from-violet-100 group-hover:to-pink-100 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-slate-500">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

// Phone Mockup Section
function PhoneMockupSection() {
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
            <PhoneMockup />
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}

// Related Links Section
function RelatedLinksSection() {
  const links = [
    {
      title: 'A/B Testing',
      description: 'Run experiments to optimize your paywall performance',
      href: '/ab-testing',
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

  return (
    <Section size="lg" background="gray">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Explore related features
          </h2>
          <p className="text-lg text-slate-500">
            Maximize your paywall performance with these powerful tools
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {links.map((link, index) => (
            <motion.div
              key={link.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={link.href}
                className="group block h-full p-6 bg-white rounded-2xl border border-slate-200 hover:border-violet-300 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-xl bg-gradient-to-br from-violet-50 to-pink-50 text-violet-600 group-hover:from-violet-100 group-hover:to-pink-100 transition-colors">
                  {link.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-violet-600 transition-colors">
                  {link.title}
                </h3>
                <p className="text-slate-500 text-sm mb-4">{link.description}</p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-violet-600 group-hover:gap-2 transition-all">
                  Learn more
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

// Final CTA Section
function FinalCTASection() {
  return (
    <Section size="lg" background="gradient" className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-purple-300/40 via-blue-300/40 to-cyan-300/40 rounded-full blur-[120px]"
        />
      </div>

      <Container size="md" className="relative text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6"
        >
          Ready to build your{' '}
          <span className="bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">
            perfect paywall?
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-lg text-slate-500 max-w-2xl mx-auto mb-10"
        >
          Join thousands of apps using Adapty to create high-converting paywalls and grow their subscription revenue.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="https://adapty.io/schedule-demo/"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-pink-500 hover:from-violet-700 hover:to-pink-600 text-white font-semibold rounded-lg transition-all shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/30 text-lg"
          >
            Schedule a demo
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="https://app.adapty.io/signup"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-slate-50 text-slate-900 font-semibold rounded-lg border-2 border-slate-200 hover:border-slate-300 transition-all text-lg"
          >
            Start for free
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
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
          <HeroSection />
        </SectionErrorBoundary>

        {/* Video Section */}
        <SectionErrorBoundary sectionName="Video">
          <VideoSection />
        </SectionErrorBoundary>

        {/* Stats Section */}
        <SectionErrorBoundary sectionName="Stats">
          <StatsSection />
        </SectionErrorBoundary>

        {/* Phone Mockup Section */}
        <SectionErrorBoundary sectionName="PhoneMockup">
          <PhoneMockupSection />
        </SectionErrorBoundary>

        {/* Features Section */}
        <SectionErrorBoundary sectionName="Features">
          <FeaturesSection />
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

        {/* Related Links */}
        <SectionErrorBoundary sectionName="RelatedLinks">
          <RelatedLinksSection />
        </SectionErrorBoundary>

        {/* Final CTA */}
        <SectionErrorBoundary sectionName="FinalCTA">
          <FinalCTASection />
        </SectionErrorBoundary>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
