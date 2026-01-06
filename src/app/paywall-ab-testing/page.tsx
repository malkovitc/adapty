'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useReducedMotion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, ExternalLink, FlaskConical, Globe, Target, Palette, Quote } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Header, Footer } from '@/components/layout';
import { BackToTop, SectionErrorBoundary } from '@/components/ui';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import CaseStudies from '@/components/sections/CaseStudies';
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
            <span className="bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">
              A/B test paywalls
            </span>
            <span className="text-slate-900"> without coding</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-slate-500 text-center leading-relaxed mb-8"
            style={{ width: '100%', maxWidth: '42rem' }}
          >
            Compare paywalls without leaving Adapty Dashboard and find the winner without data analysis.
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
            src={getAssetPath('/images/features/paywall-ab-testing@2x.webp')}
            alt="Adapty A/B Testing Interface showing two paywall variants with predicted winner"
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

// Testimonial data for inline testimonials
const inlineTestimonials = [
  {
    quote: "Adapty's platform makes it easy for non-developers to create and manage A/B tests, paywalls, product mix and pricing structure.",
    author: "Magnus Olafsson",
    role: "CTO",
    company: "Smitten",
  },
  {
    quote: "We migrated all our apps to Adapty for the A/B test, analytics, remote config features among others. Now, testing paywalls is a breeze with Adapty!",
    author: "Nikolay Chebotarev",
    role: "Head of UA",
    company: "Moonly.app",
  },
];

// Feature Section with alternating layout
interface FeatureSectionProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  reversed?: boolean;
  testimonial?: typeof inlineTestimonials[0];
  link?: {
    text: string;
    href: string;
  };
}

function FeatureSection({
  title,
  description,
  imageSrc,
  imageAlt,
  reversed = false,
  testimonial,
  link,
}: FeatureSectionProps) {
  return (
    <Section size="lg" background="white">
      <Container>
        <div className={`grid lg:grid-cols-2 gap-12 items-center ${reversed ? 'lg:flex-row-reverse' : ''}`}>
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: reversed ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={reversed ? 'lg:order-2' : ''}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
              {title}
            </h2>
            <p className="text-lg text-slate-500 mb-6 leading-relaxed">
              {description}
            </p>

            {link && (
              <Link
                href={link.href}
                className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 font-medium transition-colors mb-8"
              >
                {link.text}
                <ExternalLink className="w-4 h-4" />
              </Link>
            )}

            {/* Inline Testimonial */}
            {testimonial && (
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                <Quote className="w-8 h-8 text-violet-200 mb-3" />
                <p className="text-slate-600 italic mb-4">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div>
                  <p className="font-semibold text-slate-900">{testimonial.author}</p>
                  <p className="text-sm text-slate-500">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            )}
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: reversed ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={reversed ? 'lg:order-1' : ''}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200">
              <Image
                src={getAssetPath(imageSrc)}
                alt={imageAlt}
                width={600}
                height={400}
                className="w-full h-auto"
                unoptimized
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}

// Features Grid Section
function FeaturesGrid() {
  const features = [
    {
      title: 'A/B/C testing supported',
      description: 'Split your test on as many parts as you want, and test any number of paywall variations at the same time.',
      imageSrc: '/images/role-cards/img-card-cover-charts@2x.webp',
      imageAlt: 'ABC testing interface showing multiple variants',
      testimonial: inlineTestimonials[0],
    },
    {
      title: 'Auto metric calculation',
      description: 'Adapty calculates 20+ metrics in real-time to give you a representative view of your A/B testing result.',
      imageSrc: '/images/role-cards/img-card-cover-paywalls@2x.webp',
      imageAlt: 'Metrics dashboard showing conversion rates',
      testimonial: inlineTestimonials[1],
      reversed: true,
    },
    {
      title: 'Powered by machine learning',
      description: 'Adapty uses Bayesian statistics and AI-powered predictive models to predict a test winner.',
      imageSrc: '/images/features/app-monetization-strategies@2x.webp',
      imageAlt: 'Machine learning prediction interface',
      link: {
        text: 'Read the docs',
        href: 'https://docs.adapty.io/docs/ab-tests',
      },
    },
    {
      title: 'Start and stop test at any time',
      description: 'Start a new test or finish an existing one with one click in the Adapty dashboard with Placements.',
      imageSrc: '/images/role-cards/img-card-cover-sdk-install@2x.webp',
      imageAlt: 'Placements interface for test management',
      reversed: true,
      link: {
        text: 'Read the docs',
        href: 'https://docs.adapty.io/docs/placements',
      },
    },
  ];

  return (
    <>
      {features.map((feature, index) => (
        <FeatureSection
          key={feature.title}
          {...feature}
          reversed={index % 2 === 1}
        />
      ))}
    </>
  );
}

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
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 text-white/60 hover:text-white transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-10 h-10 sm:w-12 sm:h-12" strokeWidth={1.5} />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 text-white/60 hover:text-white transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-10 h-10 sm:w-12 sm:h-12" strokeWidth={1.5} />
          </button>

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
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-white w-8'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </Container>

      {/* Gradient decoration at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-violet-600/20 to-transparent pointer-events-none" />
    </Section>
  );
}

// Enterprise Stats Section
function EnterpriseStats() {
  const stats = [
    { value: 30, suffix: 'M+', label: 'subscription events/month' },
    { value: 2.5, suffix: 'B', label: 'users', decimals: 1 },
    { value: 6, suffix: 'M+', label: 'subscribers/month' },
    { value: 60, suffix: 'B', label: 'API calls/month' },
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
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Enterprise-grade battle-tested solution
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
                  suffix={stat.suffix}
                  decimals={stat.decimals}
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

// Related Links Section
function RelatedLinksSection() {
  const links = [
    {
      title: 'Remote Config',
      description: 'Update paywall configuration without app releases',
      href: '/paywall-builder',
      icon: <Palette className="w-6 h-6" />,
    },
    {
      title: 'Localize',
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
            Learn more about Paywall management
          </h2>
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
          Ready to optimize your{' '}
          <span className="bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">
            paywalls?
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-lg text-slate-500 max-w-2xl mx-auto mb-10"
        >
          Join thousands of apps using Adapty to A/B test paywalls and grow their subscription revenue.
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
export default function PaywallABTestingPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Header />
      <main>
        {/* Hero Section */}
        <SectionErrorBoundary sectionName="Hero">
          <HeroSection />
        </SectionErrorBoundary>

        {/* Feature Sections with Testimonials */}
        <SectionErrorBoundary sectionName="Features">
          <FeaturesGrid />
        </SectionErrorBoundary>

        {/* Testimonials Carousel */}
        <SectionErrorBoundary sectionName="TestimonialsCarousel">
          <TestimonialsCarousel />
        </SectionErrorBoundary>

        {/* Enterprise Stats */}
        <SectionErrorBoundary sectionName="EnterpriseStats">
          <EnterpriseStats />
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
