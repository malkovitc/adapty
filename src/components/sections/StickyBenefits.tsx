'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import {
  FlaskConical,
  Globe,
  Palette,
  RefreshCw,
  Settings,
  Smartphone,
  Target,
  Zap,
} from 'lucide-react';

export interface StickyBenefitItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  imageAlt?: string;
}

export interface StickyBenefitsProps {
  title?: string;
  highlight?: string;
  subtitle?: string;
  benefits?: StickyBenefitItem[];
  background?: 'white' | 'gray';
}

const defaultBenefits: StickyBenefitItem[] = [
  {
    id: 'scale',
    title: 'Scale your current paywall',
    description:
      'Start with your existing design and iterate quickly. Run multiple variants simultaneously to find what converts best, with up to +20% revenue increase.',
    icon: <Zap className="w-6 h-6" />,
    imageAlt: 'A/B/C paywalls showing +20% revenue increase',
  },
  {
    id: 'realtime',
    title: 'Apply changes in real-time',
    description:
      'Update paywalls instantly without app store reviews or new releases. Change buttons, text, and pricing live.',
    icon: <RefreshCw className="w-6 h-6" />,
    imageAlt: 'Paywall buttons being edited in real-time',
  },
  {
    id: 'abtesting',
    title: 'Seamless integration with A/B testing',
    description:
      'Run experiments to find the highest-converting paywall design with statistical confidence and predicted winner indicators.',
    icon: <FlaskConical className="w-6 h-6" />,
    imageAlt: 'A/B testing with predicted winner',
  },
  {
    id: 'structure',
    title: 'Deeply customizable paywall structure',
    description:
      'Control every aspect of your paywall from layout to individual elements. Choose from multiple layout templates.',
    icon: <Settings className="w-6 h-6" />,
    imageAlt: 'Multiple paywall layout options',
  },
  {
    id: 'elements',
    title: 'Flexible adjustments for every element',
    description:
      'Fine-tune colors, spacing, fonts, and positioning with precision controls in our visual UI builder.',
    icon: <Palette className="w-6 h-6" />,
    imageAlt: 'UI builder with element controls',
  },
  {
    id: 'localization',
    title: 'Convenient localization and personalization',
    description:
      'Adapt your paywalls for different languages, regions, and user segments with easy locale management.',
    icon: <Globe className="w-6 h-6" />,
    imageAlt: 'Paywalls in different locales',
  },
  {
    id: 'responsive',
    title: 'Responsive layout with multi-screen support',
    description:
      'Paywalls look great on any device size, from phones to tablets. Preview all screen sizes instantly.',
    icon: <Smartphone className="w-6 h-6" />,
    imageAlt: 'Paywalls on different screen sizes',
  },
  {
    id: 'native',
    title: 'Truly native experience',
    description:
      'Paywalls render natively for smooth performance and platform consistency. No webviews, no lag.',
    icon: <Target className="w-6 h-6" />,
    imageAlt: 'Native UI rendering',
  },
];

function BenefitCard({
  benefit,
  isActive,
  index,
  onInView,
}: {
  benefit: StickyBenefitItem;
  isActive: boolean;
  index: number;
  onInView: (id: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onInView(benefit.id);
          }
        });
      },
      {
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0,
      },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [benefit.id, onInView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className={`relative p-6 rounded-2xl transition-all duration-300 ${
        isActive
          ? 'bg-white shadow-lg shadow-slate-200/50 border-2 border-violet-200'
          : 'bg-transparent hover:bg-slate-50 border-2 border-transparent'
      }`}
    >
      <div
        className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 rounded-full transition-all duration-300 ${
          isActive ? 'bg-gradient-to-b from-violet-500 to-pink-500' : 'bg-transparent'
        }`}
      />

      <div className="flex items-start gap-4">
        <div
          className={`shrink-0 w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300 ${
            isActive
              ? 'bg-gradient-to-br from-violet-500 to-pink-500 text-white shadow-lg shadow-violet-500/25'
              : 'bg-gradient-to-br from-violet-50 to-pink-50 text-violet-600'
          }`}
        >
          {benefit.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
              isActive ? 'text-slate-900' : 'text-slate-700'
            }`}
          >
            {benefit.title}
          </h3>
          <p
            className={`text-sm leading-relaxed transition-colors duration-300 ${
              isActive ? 'text-slate-600' : 'text-slate-500'
            }`}
          >
            {benefit.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function StickyImage({ activeBenefit }: { activeBenefit: StickyBenefitItem }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative w-full h-full min-h-[400px] lg:min-h-[600px] rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-50 border border-slate-200">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeBenefit.id}
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 1.05 }}
          transition={{ duration: shouldReduceMotion ? 0.15 : 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 flex items-center justify-center p-8"
        >
          <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="w-full max-w-md aspect-[4/3] bg-white rounded-xl shadow-xl shadow-slate-200/50 border border-slate-200 flex flex-col items-center justify-center p-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white mb-6 shadow-lg shadow-violet-500/30">
                {activeBenefit.icon}
              </div>
              <h4 className="text-lg font-semibold text-slate-900 text-center mb-2">
                {activeBenefit.title}
              </h4>
              <div className="w-full max-w-xs space-y-2 mt-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 rounded-full bg-gradient-to-r from-violet-500 to-violet-400 flex-1" />
                  <span className="text-xs text-slate-500 font-medium">Feature A</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 rounded-full bg-gradient-to-r from-pink-500 to-pink-400 w-3/4" />
                  <span className="text-xs text-slate-500 font-medium">Feature B</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 w-1/2" />
                  <span className="text-xs text-slate-500 font-medium">Feature C</span>
                </div>
              </div>
            </div>
            <p className="mt-6 text-sm text-slate-500 text-center max-w-sm">
              {activeBenefit.imageAlt}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute top-4 right-4 w-24 h-24 bg-gradient-to-br from-violet-200/50 to-transparent rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-32 h-32 bg-gradient-to-br from-pink-200/50 to-transparent rounded-full blur-2xl pointer-events-none" />
    </div>
  );
}

export default function StickyBenefits({
  title = 'Everything you need to',
  highlight = 'maximize revenue',
  subtitle = 'Our paywall builder gives you complete control over your monetization experience',
  benefits = defaultBenefits,
  background = 'gray',
}: StickyBenefitsProps) {
  const initialId = benefits[0]?.id ?? '';
  const [activeId, setActiveId] = useState(initialId);
  const activeBenefit = useMemo(
    () => benefits.find((benefit) => benefit.id === activeId) ?? benefits[0],
    [activeId, benefits],
  );
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!benefits.find((benefit) => benefit.id === activeId)) {
      setActiveId(benefits[0]?.id ?? '');
    }
  }, [activeId, benefits]);

  if (!activeBenefit) {
    return null;
  }

  return (
    <Section size="lg" background={background}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0.3 : 0.5 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            {title}{' '}
            {highlight && (
              <span className="bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">
                {highlight}
              </span>
            )}
          </h2>
          {subtitle && <p className="text-lg text-slate-500 max-w-2xl mx-auto">{subtitle}</p>}
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-5 space-y-4">
            {benefits.map((benefit, index) => (
              <BenefitCard
                key={benefit.id}
                benefit={benefit}
                isActive={activeId === benefit.id}
                index={index}
                onInView={setActiveId}
              />
            ))}
          </div>

          <div className="lg:col-span-7">
            <div className="lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)]">
              <StickyImage activeBenefit={activeBenefit} />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
