'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { Button } from '@/components/ui';
import { ArrowRight, ChevronLeft, ChevronRight, Crown, Gift, Layers, MessageSquare, Sparkles } from 'lucide-react';

export interface TemplateCardData {
  id: string;
  name: string;
  description: string;
  features: string[];
  gradient: string;
  accentColor: string;
  icon: React.ReactNode;
  cta?: { label: string; href: string };
}

export interface TemplatesCarouselProps {
  title?: string;
  subtitle?: string;
  templates?: TemplateCardData[];
  featureHighlights?: string[];
  background?: 'white' | 'gray';
  autoPlay?: boolean;
  className?: string;
}

const defaultTemplates: TemplateCardData[] = [
  {
    id: 'starter',
    name: 'Starter',
    description:
      'Simple single-plan paywall perfect for apps just beginning their monetization journey.',
    features: ['Single subscription option', 'Clean, minimal design', 'High conversion rate'],
    icon: <Sparkles className="w-6 h-6" />,
    gradient: 'from-blue-500 to-cyan-400',
    accentColor: 'bg-blue-500',
    cta: { label: 'Use Template', href: 'https://app.adapty.io/signup' },
  },
  {
    id: 'pro',
    name: 'Pro',
    description:
      'Two-tier pricing with monthly and yearly options to maximize subscriber value.',
    features: ['Monthly & yearly plans', 'Savings highlight badge', 'Toggle switcher'],
    icon: <Crown className="w-6 h-6" />,
    gradient: 'from-violet-600 to-purple-500',
    accentColor: 'bg-violet-600',
    cta: { label: 'Use Template', href: 'https://app.adapty.io/signup' },
  },
  {
    id: 'premium',
    name: 'Premium',
    description:
      'Three-tier comparison layout showing features across different subscription levels.',
    features: ['Feature comparison table', 'Best value indicator', 'Multiple CTAs'],
    icon: <Layers className="w-6 h-6" />,
    gradient: 'from-amber-500 to-orange-500',
    accentColor: 'bg-amber-500',
    cta: { label: 'Use Template', href: 'https://app.adapty.io/signup' },
  },
  {
    id: 'trial',
    name: 'Trial',
    description:
      'Free trial focused design that emphasizes risk-free exploration of premium features.',
    features: ['Trial period highlight', 'Cancel anytime messaging', 'Trust indicators'],
    icon: <Gift className="w-6 h-6" />,
    gradient: 'from-emerald-500 to-teal-500',
    accentColor: 'bg-emerald-500',
    cta: { label: 'Use Template', href: 'https://app.adapty.io/signup' },
  },
  {
    id: 'social-proof',
    name: 'Social Proof',
    description:
      'Testimonials-heavy design leveraging user reviews and ratings to drive conversions.',
    features: ['User testimonials', 'Star ratings', 'Download counter'],
    icon: <MessageSquare className="w-6 h-6" />,
    gradient: 'from-pink-500 to-rose-500',
    accentColor: 'bg-pink-500',
    cta: { label: 'Use Template', href: 'https://app.adapty.io/signup' },
  },
];

const defaultFeatureHighlights = [
  'Pre-built templates for different industries',
  'Proven designs optimized for conversions',
  'Full customization flexibility',
  'Regular updates with new templates',
];

interface TemplateCardProps {
  template: TemplateCardData;
  isActive: boolean;
}

function TemplateCard({ template, isActive }: TemplateCardProps) {
  return (
    <motion.div
      layout
      className={`relative flex flex-col h-full bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
        isActive ? 'border-slate-300 shadow-xl scale-100' : 'border-slate-200 shadow-md scale-95 opacity-80'
      }`}
    >
      <div className={`relative h-32 bg-gradient-to-br ${template.gradient} p-6`}>
        <div className="absolute top-4 right-4 w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
          {template.icon}
        </div>
        <div className="absolute bottom-4 left-6">
          <span className="text-white/80 text-sm font-medium uppercase tracking-wider">
            Template
          </span>
          <h3 className="text-2xl font-bold text-white">{template.name}</h3>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-6">
        <p className="text-slate-600 mb-4 leading-relaxed">{template.description}</p>
        <ul className="space-y-2 mb-6 flex-1">
          {template.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-sm text-slate-700">
              <div className={`w-1.5 h-1.5 rounded-full ${template.accentColor}`} />
              {feature}
            </li>
          ))}
        </ul>

        {template.cta && (
          <Link
            href={template.cta.href}
            className={`group inline-flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r ${template.gradient} hover:opacity-90 text-white font-semibold rounded-lg transition-all shadow-lg`}
          >
            {template.cta.label}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>
    </motion.div>
  );
}

export default function TemplatesCarousel({
  title = 'Start with a template or from scratch',
  subtitle = 'Choose from our library of high-converting paywall templates designed by monetization experts, or build your own from a blank canvas.',
  templates = defaultTemplates,
  featureHighlights = defaultFeatureHighlights,
  background = 'gray',
  autoPlay = true,
  className,
}: TemplatesCarouselProps) {
  const shouldReduceMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);
  const [visibleCards, setVisibleCards] = useState(3);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };

    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);
    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying || shouldReduceMotion) {
      return;
    }

    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % templates.length);
    }, 4000);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, shouldReduceMotion, templates.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? templates.length - 1 : prev - 1));
  }, [templates.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === templates.length - 1 ? 0 : prev + 1));
  }, [templates.length]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => autoPlay && setIsAutoPlaying(true);

  const visibleIndices = useMemo(() => {
    const indices: number[] = [];
    for (let i = 0; i < visibleCards; i += 1) {
      indices.push((currentIndex + i) % templates.length);
    }
    return indices;
  }, [currentIndex, templates.length, visibleCards]);

  return (
    <Section size="lg" background={background} className={className}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">{title}</h2>
          {subtitle && <p className="text-lg text-slate-500 max-w-3xl mx-auto">{subtitle}</p>}
        </motion.div>

        <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 p-2 rounded-full bg-white shadow-lg border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-white hover:shadow-xl transition-all hidden sm:flex items-center justify-center"
            aria-label="Previous template"
          >
            <ChevronLeft className="w-6 h-6" strokeWidth={2} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 p-2 rounded-full bg-white shadow-lg border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-white hover:shadow-xl transition-all hidden sm:flex items-center justify-center"
            aria-label="Next template"
          >
            <ChevronRight className="w-6 h-6" strokeWidth={2} />
          </Button>

          <div className="overflow-hidden px-4 sm:px-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: shouldReduceMotion ? 0 : -50 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={`grid gap-6 ${
                  visibleCards === 1 ? 'grid-cols-1' : visibleCards === 2 ? 'grid-cols-2' : 'grid-cols-3'
                }`}
              >
                {visibleIndices.map((index, position) => (
                  <div key={templates[index].id} className="h-[420px]">
                    <TemplateCard
                      template={templates[index]}
                      isActive={position === Math.floor(visibleCards / 2) || visibleCards === 1}
                    />
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex sm:hidden justify-center gap-4 mt-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={goToPrevious}
              className="p-2 rounded-full bg-white shadow-lg border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-white transition-all"
              aria-label="Previous template"
            >
              <ChevronLeft className="w-6 h-6" strokeWidth={2} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={goToNext}
              className="p-2 rounded-full bg-white shadow-lg border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-white transition-all"
              aria-label="Next template"
            >
              <ChevronRight className="w-6 h-6" strokeWidth={2} />
            </Button>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {templates.map((template, index) => (
              <Button
                key={template.id}
                variant="ghost"
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 p-0 min-w-0 ${
                  index === currentIndex ? 'bg-violet-600 w-8 hover:bg-violet-600' : 'bg-slate-300 hover:bg-slate-400 w-2'
                }`}
                aria-label={`Go to template ${index + 1}`}
              >
                <span className="sr-only">Go to template {index + 1}</span>
              </Button>
            ))}
          </div>
        </div>

        {featureHighlights.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {featureHighlights.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center gap-3 text-slate-700 bg-white/60 rounded-lg px-4 py-3"
              >
                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium">{item}</span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </Container>
    </Section>
  );
}
