'use client';

import { motion, useReducedMotion, useInView } from 'framer-motion';
import { useRef, useEffect, useState, useCallback, memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Header, Footer } from '@/components/layout';
import { BackToTop, SectionErrorBoundary, Button } from '@/components/ui';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { getAssetPath } from '@/lib/utils';
import {
  ArrowRight,
  Play,
  MousePointerClick,
  Users,
  FlaskConical,
  BarChart3,
  Globe,
  Plus,
  Minus,
  Layers,
  Target,
} from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import VideoGateForm from '@/components/sections/VideoGateForm';
import TabNavigation from '@/components/ui/TabNavigation';

// Metadata is handled server-side, so we export it from a separate file or use generateMetadata
// For client component, metadata should be in layout or a server component wrapper

// ============================================================================
// Animated Counter Component
// ============================================================================
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

// ============================================================================
// Hero Section
// ============================================================================
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

  // Feature labels for the hero image
  const featureLabels = [
    { text: 'A/B testing', position: 'top-[15%] left-[5%]' },
    { text: 'Localization', position: 'top-[10%] right-[10%]' },
    { text: 'Personalization', position: 'top-[35%] left-[2%]' },
    { text: 'Media & Display', position: 'bottom-[35%] left-[5%]' },
    { text: 'Quiz', position: 'bottom-[15%] left-[15%]' },
    { text: 'Analytics', position: 'bottom-[20%] right-[10%]' },
  ];

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
              ONBOARDING BUILDER
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-center mb-6"
          >
            <span className="text-slate-900">Build and publish </span>
            <span className="bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">
              onboardings
            </span>
            <br />
            <span className="text-slate-900">that are proven to convert</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-slate-500 text-center leading-relaxed mb-8"
            style={{ width: '100%', maxWidth: '48rem' }}
          >
            Adapty&apos;s Onboarding Builder lets you update flows, run A/B tests, and optimize conversion - all without an app update, a design ticket, or a single line of code.
          </motion.p>

          {/* CTA Button */}
          <motion.div variants={itemVariants}>
            <Button
              variant="primary"
              size="lg"
              href="#demo"
              icon={<Play className="w-5 h-5" fill="currentColor" />}
              iconPosition="left"
            >
              Watch the demo
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Hero Image with Feature Labels */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8 pb-16"
      >
        <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-slate-300/50 border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100">
          {/* Placeholder for hero image - in production, use actual onboarding builder screenshot */}
          <div className="aspect-[16/10] relative bg-gradient-to-br from-violet-50 via-white to-pink-50">
            {/* Simulated UI elements */}
            <div className="absolute inset-8 rounded-xl bg-white shadow-lg border border-slate-200 flex">
              {/* Left panel - screens list */}
              <div className="w-64 border-r border-slate-200 p-4">
                <div className="space-y-3">
                  {['Welcome', 'Goals', 'Experience', 'Paywall'].map((screen, i) => (
                    <div key={screen} className={`p-3 rounded-lg ${i === 0 ? 'bg-violet-50 border border-violet-200' : 'bg-slate-50'}`}>
                      <div className="text-sm font-medium text-slate-700">{screen}</div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Center - phone preview */}
              <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-48 h-80 bg-slate-900 rounded-3xl p-2 shadow-xl">
                  <div className="w-full h-full bg-gradient-to-b from-violet-500 to-pink-500 rounded-2xl flex items-center justify-center">
                    <span className="text-white font-medium">Preview</span>
                  </div>
                </div>
              </div>
              {/* Right panel - properties */}
              <div className="w-72 border-l border-slate-200 p-4">
                <div className="text-xs font-semibold text-slate-400 uppercase mb-3">Properties</div>
                <div className="space-y-3">
                  {['Background', 'Typography', 'Buttons', 'Images'].map((prop) => (
                    <div key={prop} className="p-3 rounded-lg bg-slate-50">
                      <div className="text-sm font-medium text-slate-700">{prop}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating feature labels */}
            {featureLabels.map((label, index) => (
              <motion.div
                key={label.text}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className={`absolute ${label.position} hidden lg:block`}
              >
                <span className="px-3 py-1.5 bg-white rounded-full text-sm font-medium text-slate-700 shadow-lg border border-slate-200">
                  {label.text}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// Feature Navigation Tabs
// ============================================================================
const featureNavItems = [
  { id: 'drag-drop', label: 'Drag-and-drop', icon: MousePointerClick },
  { id: 'personalization', label: 'Personalization', icon: Users },
  { id: 'ab-testing', label: 'A/B testing', icon: FlaskConical },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'localization', label: 'Localization', icon: Globe },
];

function FeatureNavigation() {
  const [activeFeature, setActiveFeature] = useState('drag-drop');

  const handleSelect = (id: string) => {
    setActiveFeature(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Section size="sm" background="gray">
      <Container>
        <TabNavigation
          items={featureNavItems}
          activeId={activeFeature}
          onSelect={handleSelect}
        />
      </Container>
    </Section>
  );
}

// ============================================================================
// Logos Section
// ============================================================================
const trustLogos = [
  { name: 'Feeld', src: '/logos/logo-feeld-gray.svg' },
  { name: 'Bumble', src: '/logos/logo-bumble-gray.svg' },
  { name: 'WeeWoo', src: '/logos/weewoo.svg' },
  { name: 'Almus', src: '/logos/almus.svg' },
  { name: 'Impala Studios', src: '/logos/logo-text-impala-studios-gray.svg' },
  { name: 'HUBX', src: '/logos/logo-hubx-gray.svg' },
];

function LogosSection() {
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
          <p className="text-lg text-slate-500 max-w-3xl mx-auto">
            <span className="font-semibold text-slate-900">15K companies</span> trust Adapty to test onboarding flows, improve first-session UX, and ship updates in minutes without a release.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {trustLogos.map((logo, index) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            >
              <Image
                src={getAssetPath(logo.src)}
                alt={logo.name}
                width={120}
                height={40}
                className="h-8 w-auto object-contain"
                unoptimized
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

// ============================================================================
// Feature Sections
// ============================================================================
interface FeatureSectionProps {
  id: string;
  label: string;
  title: string;
  description: string;
  features: string[];
  image?: string;
  reverse?: boolean;
}

const featureSections: FeatureSectionProps[] = [
  {
    id: 'drag-drop',
    label: 'DRAG-AND-DROP',
    title: 'If you can picture it, you can build it',
    description: 'Create stunning onboarding flows with our intuitive drag-and-drop builder. No design or development skills required - just drag components, customize, and publish.',
    features: [
      'Pre-built templates and components',
      'Real-time preview on device',
      'Instant publishing without app update',
      'Rich media support (images, video, animations)',
    ],
  },
  {
    id: 'personalization',
    label: 'PERSONALIZATION',
    title: 'Relevance is how you convert',
    description: 'Show the right message to the right user at the right time. Personalize onboarding based on user attributes, behavior, and acquisition source.',
    features: [
      'Segment users by any attribute',
      'Dynamic content based on user data',
      'Conditional logic and branching',
      'Integration with your analytics stack',
    ],
  },
  {
    id: 'ab-testing',
    label: 'A/B TESTING',
    title: 'Testing turns hypotheses into revenue',
    description: 'Run experiments to find what works. Test different flows, messages, and designs to maximize conversion and revenue.',
    features: [
      'Visual experiment builder',
      'Statistical significance tracking',
      'Multi-variant testing',
      'Automatic winner selection',
    ],
  },
  {
    id: 'analytics',
    label: 'ANALYTICS',
    title: 'What gets measured, gets maximized',
    description: 'Track every step of your onboarding funnel. Understand where users drop off and optimize for better conversion.',
    features: [
      'Step-by-step funnel analytics',
      'Cohort analysis and retention',
      'Revenue attribution',
      'Export to your BI tools',
    ],
  },
  {
    id: 'localization',
    label: 'LOCALIZATION',
    title: 'Talk to users in their language',
    description: 'Reach global audiences with localized onboarding. Support multiple languages and regional content variations.',
    features: [
      'Multi-language support',
      'Regional content variations',
      'RTL language support',
      'Currency and format localization',
    ],
  },
];

function FeatureSection({ id, label, title, description, features, reverse = false }: FeatureSectionProps) {
  return (
    <Section id={id} size="lg" background="white">
      <Container>
        <div className={`grid lg:grid-cols-2 gap-12 items-center ${reverse ? 'lg:flex-row-reverse' : ''}`}>
          <motion.div
            initial={{ opacity: 0, x: reverse ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={reverse ? 'lg:order-2' : ''}
          >
            <span className="text-sm font-semibold uppercase tracking-wider text-violet-600 mb-4 block">
              {label}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
              {title}
            </h2>
            <p className="text-lg text-slate-500 mb-8">
              {description}
            </p>
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center gap-3 text-slate-700"
                >
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  {feature}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: reverse ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={reverse ? 'lg:order-1' : ''}
          >
            {/* Feature illustration placeholder */}
            <div className="aspect-square max-w-md mx-auto rounded-2xl bg-gradient-to-br from-violet-50 via-white to-pink-50 border border-slate-200 shadow-xl p-8 flex items-center justify-center">
              <div className="w-full h-full rounded-xl bg-white shadow-lg border border-slate-100 flex items-center justify-center">
                <span className="text-4xl">
                  {id === 'drag-drop' && <MousePointerClick className="w-16 h-16 text-violet-500" />}
                  {id === 'personalization' && <Users className="w-16 h-16 text-violet-500" />}
                  {id === 'ab-testing' && <FlaskConical className="w-16 h-16 text-violet-500" />}
                  {id === 'analytics' && <BarChart3 className="w-16 h-16 text-violet-500" />}
                  {id === 'localization' && <Globe className="w-16 h-16 text-violet-500" />}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}

// ============================================================================
// Platform Section
// ============================================================================
function PlatformSection() {
  const platformFeatures = [
    { icon: Layers, title: 'Onboarding Builder', description: 'Visual drag-and-drop editor' },
    { icon: Target, title: 'Paywall Builder', description: 'Monetization screens that convert' },
    { icon: FlaskConical, title: 'A/B Testing', description: 'Test and optimize everything' },
    { icon: BarChart3, title: 'Analytics', description: 'Full-funnel insights' },
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
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
            From install to revenue in one platform
          </h2>
          <p className="text-lg text-slate-500 max-w-3xl mx-auto">
            Adapty handles everything between first open and first payment - onboarding, paywalls, A/B testing, analytics, and more.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {platformFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 bg-white rounded-2xl border border-slate-200 shadow-sm"
              >
                <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-xl bg-gradient-to-br from-violet-50 to-pink-50">
                  <Icon className="w-7 h-7 text-violet-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-500">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

// ============================================================================
// Case Study Highlight Section
// ============================================================================
function CaseStudySection() {
  const stats = [
    { value: 102, suffix: '%', label: 'ARPU increase' },
    { value: 30, suffix: '%', label: 'Purchase conversion' },
    { value: 50, suffix: '%', label: 'Revenue growth' },
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
            <span className="text-sm font-semibold uppercase tracking-wider text-violet-600 mb-4 block">
              CASE STUDY
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
              How a new onboarding drove{' '}
              <span className="bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">
                50% revenue growth
              </span>
            </h2>
            <p className="text-lg text-slate-500 mb-8">
              A travel app redesigned their onboarding with Adapty and saw dramatic improvements across all key metrics.
            </p>

            <div className="grid grid-cols-3 gap-6 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl sm:text-4xl font-bold text-slate-900 mb-1">
                    +<AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            <Link
              href="https://adapty.io/case-studies/travel-app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-violet-600 font-medium hover:text-violet-700 transition-colors"
            >
              Read the full story
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
              <Image
                src={getAssetPath('/images/case-studies/logo-secret-app@3x.webp')}
                alt="Travel App Case Study"
                width={600}
                height={400}
                className="w-full h-auto bg-gradient-to-br from-violet-100 to-pink-50 p-12"
                unoptimized
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}

// ============================================================================
// CTA Section
// ============================================================================
function CTASection() {
  return (
    <Section size="lg" background="gray">
      <Container size="md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
            Ready to ship a better onboarding?
          </h2>
          <p className="text-lg text-slate-500 mb-8 max-w-2xl mx-auto">
            See how Adapty can help you build onboarding flows that convert more users into paying customers.
          </p>
          <Button
            variant="primary"
            size="lg"
            href="#demo"
            icon={<Play className="w-5 h-5" fill="currentColor" />}
            iconPosition="left"
          >
            Watch the demo
          </Button>
        </motion.div>
      </Container>
    </Section>
  );
}

// ============================================================================
// FAQ Section
// ============================================================================
const faqItems = [
  {
    id: 'faq-1',
    question: 'How do I improve my app\'s onboarding conversion rate?',
    answer: 'Focus on clarity, value proposition, and progressive disclosure. Show users the core value of your app quickly, ask for permissions at contextually appropriate moments, and use A/B testing to optimize each step. Adapty\'s onboarding builder lets you test different flows without code changes.',
  },
  {
    id: 'faq-2',
    question: 'How many steps should an onboarding flow have?',
    answer: 'There\'s no one-size-fits-all answer, but generally 3-5 steps works well. The key is to balance gathering necessary information with user patience. Use analytics to identify where users drop off and optimize those steps first.',
  },
  {
    id: 'faq-3',
    question: 'Should I include tutorials in onboarding?',
    answer: 'It depends on your app complexity. For simple apps, let users explore naturally. For complex apps, brief contextual tutorials can help. Consider offering tutorials as optional or triggered when users seem stuck rather than forcing everyone through them.',
  },
  {
    id: 'faq-4',
    question: 'How do I reduce friction in onboarding?',
    answer: 'Minimize required inputs, delay sign-up until necessary, use social login options, pre-fill data when possible, and break complex forms into smaller steps. Also ensure fast load times and smooth animations to keep users engaged.',
  },
  {
    id: 'faq-5',
    question: 'How do I A/B test onboarding flows?',
    answer: 'With Adapty, you can create multiple variants of your onboarding flow and split traffic between them. The platform tracks conversion rates, completion rates, and revenue per variant, automatically identifying winners with statistical significance.',
  },
  {
    id: 'faq-6',
    question: 'What is a good onboarding activation rate?',
    answer: 'Activation rates vary by app category, but generally 20-30% is average, while top apps achieve 40-60%. The key is to define your activation event clearly (e.g., completed profile, first action, subscription started) and track it consistently.',
  },
  {
    id: 'faq-7',
    question: 'Can I change my onboarding without releasing a new app version?',
    answer: 'Yes! This is one of Adapty\'s core features. Once you integrate the SDK, you can modify onboarding flows, run tests, and publish changes instantly - no app store review required. This enables rapid iteration and optimization.',
  },
  {
    id: 'faq-8',
    question: 'When should I show the paywall during onboarding?',
    answer: 'This depends on your app and audience. Some apps benefit from showing the paywall early to qualify users, while others see better conversion after demonstrating value. A/B test different paywall placements to find what works best for your specific audience.',
  },
];

// Memoized FAQ Item Component
const FAQItemComponent = memo(function FAQItemComponent({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: typeof faqItems[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay: (index % 4) * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative"
    >
      {/* Animated gradient border on hover */}
      <div className={`absolute inset-0 rounded-xl transition-all duration-500 ${
        isOpen
          ? 'bg-gradient-to-r from-indigo-500 to-blue-500 p-[2px]'
          : 'bg-slate-200 group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:to-blue-500 p-[1px] group-hover:p-[2px]'
      }`}>
        <div className="w-full h-full bg-white rounded-xl" />
      </div>

      <div className="relative bg-white rounded-xl">
        <motion.button
          onClick={onToggle}
          className="w-full px-5 sm:px-6 py-4 sm:py-5 min-h-[60px] flex items-start justify-between gap-4 text-left touch-manipulation"
          aria-expanded={isOpen}
          whileHover={{ x: 4 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          <span className={`font-semibold text-lg transition-colors duration-300 ${
            isOpen
              ? 'text-transparent bg-gradient-to-r from-indigo-500 to-blue-600 bg-clip-text'
              : 'text-slate-900 group-hover:text-indigo-500'
          }`}>
            {faq.question}
          </span>

          {/* Icon with morphing animation */}
          <div className="relative flex-shrink-0 mt-1">
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="minus"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-blue-600 flex items-center justify-center">
                    <Minus className="w-4 h-4 text-white" />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="plus"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="w-6 h-6 rounded-full border-2 border-slate-300 group-hover:border-indigo-500 flex items-center justify-center transition-colors duration-300">
                    <Plus className="w-4 h-4 text-slate-500 group-hover:text-indigo-500 transition-colors duration-300" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: 'auto',
                opacity: 1,
                transition: {
                  height: {
                    duration: 0.4,
                    ease: [0.16, 1, 0.3, 1],
                  },
                  opacity: {
                    duration: 0.3,
                    delay: 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  },
                },
              }}
              exit={{
                height: 0,
                opacity: 0,
                transition: {
                  height: {
                    duration: 0.3,
                    ease: [0.16, 1, 0.3, 1],
                  },
                  opacity: {
                    duration: 0.2,
                    ease: [0.16, 1, 0.3, 1],
                  },
                },
              }}
              className="overflow-hidden"
            >
              <motion.div
                initial={{ y: -10 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="px-6 pb-6 pt-0"
              >
                {/* Decorative line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="h-px bg-gradient-to-r from-indigo-500 to-blue-500 mb-4 origin-left"
                />
                <p className="text-slate-600 leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
});

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = useCallback((index: number) => {
    setOpenIndex(prev => prev === index ? null : index);
  }, []);

  // Split FAQs into two columns
  const midPoint = Math.ceil(faqItems.length / 2);
  const leftColumn = faqItems.slice(0, midPoint);
  const rightColumn = faqItems.slice(midPoint);

  return (
    <Section id="faq" size="lg" background="white" className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-purple-100/50 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-blue-100/50 to-transparent rounded-full blur-3xl" />
      </div>

      <Container size="full" className="relative">
        {/* Section Header */}
        <div className="text-center mb-[var(--spacing-lg)] md:mb-[calc(var(--spacing-lg)*2)]">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm font-[var(--font-medium)] uppercase tracking-wider text-[#6366F1] mb-[var(--spacing-md)]"
          >
            FAQ
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[var(--text-h2)] sm:text-3xl md:text-4xl lg:text-5xl font-[var(--font-bold)] text-[var(--text-primary)] mb-[var(--spacing-lg)]"
          >
            Frequently asked{' '}
            <span className="bg-gradient-to-r from-indigo-500 to-blue-600 bg-clip-text text-transparent">
              questions
            </span>
          </motion.h2>
        </div>

        {/* FAQ Grid - Single column on mobile, two columns on desktop */}
        <div className="grid md:grid-cols-2 gap-[var(--spacing-lg)] md:gap-[var(--spacing-lg)]">
          {/* Left Column */}
          <div className="space-y-[var(--spacing-md)]">
            {leftColumn.map((faq, index) => (
              <FAQItemComponent
                key={faq.id}
                faq={faq}
                index={index}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
              />
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-[var(--spacing-md)]">
            {rightColumn.map((faq, index) => {
              const actualIndex = index + midPoint;
              return (
                <FAQItemComponent
                  key={faq.id}
                  faq={faq}
                  index={actualIndex}
                  isOpen={openIndex === actualIndex}
                  onToggle={() => handleToggle(actualIndex)}
                />
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}

// ============================================================================
// Final CTA Section
// ============================================================================
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
          Start building{' '}
          <span className="bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">
            better onboardings
          </span>
          {' '}today
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-lg text-slate-500 max-w-2xl mx-auto mb-10"
        >
          Join thousands of apps using Adapty to create high-converting onboarding flows and grow their subscription revenue.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            variant="primary"
            size="lg"
            href="https://adapty.io/schedule-demo/"
            icon={<ArrowRight className="w-5 h-5" />}
          >
            Schedule a demo
          </Button>
          <Button
            variant="secondary"
            size="lg"
            href="https://app.adapty.io/signup"
            icon={<ArrowRight className="w-5 h-5" />}
          >
            Start for free
          </Button>
        </motion.div>
      </Container>
    </Section>
  );
}

// ============================================================================
// Main Page Component
// ============================================================================
export default function OnboardingBuilderPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Header />
      <main>
        {/* Hero Section */}
        <SectionErrorBoundary sectionName="Hero">
          <HeroSection />
        </SectionErrorBoundary>

        {/* Video Demo Section with Form */}
        <SectionErrorBoundary sectionName="VideoDemo">
          <VideoGateForm
            id="demo"
            title="Watch what you can build in two minutes"
            subtitle="(or less)"
            ctaLabel="Watch the demo"
          />
        </SectionErrorBoundary>

        {/* Feature Navigation Tabs */}
        <SectionErrorBoundary sectionName="FeatureNavigation">
          <FeatureNavigation />
        </SectionErrorBoundary>

        {/* Logos Section */}
        <SectionErrorBoundary sectionName="Logos">
          <LogosSection />
        </SectionErrorBoundary>

        {/* Feature Sections */}
        {featureSections.map((section, index) => (
          <SectionErrorBoundary key={section.id} sectionName={`Feature-${section.id}`}>
            <FeatureSection {...section} reverse={index % 2 === 1} />
          </SectionErrorBoundary>
        ))}

        {/* Platform Section */}
        <SectionErrorBoundary sectionName="Platform">
          <PlatformSection />
        </SectionErrorBoundary>

        {/* Case Study Section */}
        <SectionErrorBoundary sectionName="CaseStudy">
          <CaseStudySection />
        </SectionErrorBoundary>

        {/* CTA Section */}
        <SectionErrorBoundary sectionName="CTA">
          <CTASection />
        </SectionErrorBoundary>

        {/* FAQ Section */}
        <SectionErrorBoundary sectionName="FAQ">
          <FAQSection />
        </SectionErrorBoundary>

        {/* Final CTA Section */}
        <SectionErrorBoundary sectionName="FinalCTA">
          <FinalCTASection />
        </SectionErrorBoundary>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
