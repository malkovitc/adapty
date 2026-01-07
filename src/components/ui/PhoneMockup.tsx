'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Check, Star } from 'lucide-react';

export interface PhoneMockupTestimonial {
  id: string | number;
  name: string;
  quote: string;
  rating?: number;
  avatar?: string;
}

export interface PhoneMockupPlan {
  id: string;
  label: string;
  price: string;
  period: string;
  popular?: boolean;
}

export interface PhoneMockupProps {
  appName?: string;
  tagline?: string;
  benefits?: string[];
  testimonials?: PhoneMockupTestimonial[];
  planOptions?: PhoneMockupPlan[];
  ctaLabel?: string;
  note?: string;
  autoRotate?: boolean;
}

const defaultTestimonials: PhoneMockupTestimonial[] = [
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

const defaultPlanOptions: PhoneMockupPlan[] = [
  { id: 'yearly', label: 'Yearly', price: '$4.99', period: 'mo', popular: true },
  { id: 'monthly', label: 'Monthly', price: '$6.99', period: 'mo' },
];

const defaultBenefits = ['Unlimited access', 'No ads', 'Priority support'];

function StarRating({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`w-3.5 h-3.5 ${
            index < rating ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'
          }`}
        />
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: PhoneMockupTestimonial }) {
  return (
    <div className="flex flex-col items-center text-center px-4">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-100 to-pink-100 flex items-center justify-center mb-3 overflow-hidden border-2 border-white shadow-sm">
        {testimonial.avatar ? (
          <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-lg font-semibold text-violet-600">{testimonial.name.charAt(0)}</span>
        )}
      </div>
      <p className="text-sm font-semibold text-slate-800 mb-1">{testimonial.name}</p>
      <div className="mb-2">
        <StarRating rating={testimonial.rating} />
      </div>
      <p className="text-xs text-slate-500 leading-relaxed italic">&quot;{testimonial.quote}&quot;</p>
    </div>
  );
}

function CarouselDots({
  total,
  current,
  onDotClick,
}: {
  total: number;
  current: number;
  onDotClick: (index: number) => void;
}) {
  return (
    <div className="flex justify-center gap-1.5 mt-4">
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          onClick={() => onDotClick(index)}
          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
            index === current ? 'bg-violet-500 w-4' : 'bg-slate-300 hover:bg-slate-400'
          }`}
          aria-label={`Go to testimonial ${index + 1}`}
        />
      ))}
    </div>
  );
}

function PricingOption({
  label,
  price,
  period,
  selected,
  popular,
  onClick,
}: PhoneMockupPlan & { selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`relative w-full p-3 rounded-xl border-2 transition-all duration-200 text-left ${
        selected ? 'border-violet-500 bg-violet-50' : 'border-slate-200 bg-white hover:border-slate-300'
      }`}
    >
      {popular && (
        <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-gradient-to-r from-violet-500 to-pink-500 text-white text-[10px] font-semibold rounded-full uppercase tracking-wide">
          Most Popular
        </span>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
              selected ? 'border-violet-500 bg-violet-500' : 'border-slate-300'
            }`}
          >
            {selected && <Check className="w-2.5 h-2.5 text-white" />}
          </div>
          <span className="font-medium text-sm text-slate-800">{label}</span>
        </div>
        <div className="text-right">
          <span className="font-bold text-slate-900">{price}</span>
          <span className="text-xs text-slate-500">/{period}</span>
        </div>
      </div>
    </button>
  );
}

export default function PhoneMockup({
  appName = 'Unlock Premium',
  tagline = 'Get access to all features',
  benefits = defaultBenefits,
  testimonials = defaultTestimonials,
  planOptions = defaultPlanOptions,
  ctaLabel = 'Continue',
  note = 'Cancel anytime. Billed annually at $59.99/year.',
  autoRotate = true,
}: PhoneMockupProps) {
  const shouldReduceMotion = useReducedMotion();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState(planOptions[0]?.id ?? '');

  useEffect(() => {
    if (!autoRotate || shouldReduceMotion) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [autoRotate, shouldReduceMotion, testimonials.length]);

  useEffect(() => {
    if (!planOptions.find((plan) => plan.id === selectedPlan)) {
      setSelectedPlan(planOptions[0]?.id ?? '');
    }
  }, [planOptions, selectedPlan]);

  const activePlan = useMemo(
    () => planOptions.find((plan) => plan.id === selectedPlan) ?? planOptions[0],
    [planOptions, selectedPlan],
  );

  const handleDotClick = useCallback((index: number) => {
    setCurrentTestimonial(index);
  }, []);

  if (!activePlan) {
    return null;
  }

  return (
    <div className="relative flex items-center justify-center">
      <div className="relative w-[280px] sm:w-[320px]">
        <div className="relative bg-slate-900 rounded-[3rem] p-2 shadow-2xl shadow-slate-900/30">
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-10" />

          <div className="relative bg-white rounded-[2.5rem] overflow-hidden">
            <div className="flex justify-between items-center px-8 pt-4 pb-2">
              <span className="text-xs font-semibold text-slate-800">9:41</span>
              <div className="flex items-center gap-1">
                <div className="flex gap-0.5">
                  <div className="w-1 h-2.5 bg-slate-800 rounded-sm" />
                  <div className="w-1 h-2 bg-slate-800 rounded-sm" />
                  <div className="w-1 h-1.5 bg-slate-800 rounded-sm" />
                  <div className="w-1 h-1.5 bg-slate-800 rounded-sm" />
                  <div className="w-1 h-1 bg-slate-300 rounded-sm" />
                </div>
                <div className="w-4 h-2 border border-slate-800 rounded-sm ml-1 relative">
                  <div className="absolute inset-0.5 bg-slate-800 rounded-[1px]" style={{ width: '70%' }} />
                  <div className="absolute -right-0.5 top-1/2 -translate-y-1/2 w-0.5 h-1 bg-slate-800 rounded-r-sm" />
                </div>
              </div>
            </div>

            <div className="px-5 pt-2 pb-6">
              <div className="flex flex-col items-center mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center mb-2 shadow-lg shadow-violet-500/30">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900">{appName}</h3>
                <p className="text-xs text-slate-500 text-center">{tagline}</p>
              </div>

              <div className="space-y-2 mb-4">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 text-green-600" />
                    </div>
                    <span className="text-xs text-slate-600">{benefit}</span>
                  </div>
                ))}
              </div>

              {testimonials.length > 0 && (
                <div className="bg-slate-50 rounded-2xl py-4 mb-4 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentTestimonial}
                      initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: shouldReduceMotion ? 0 : -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <TestimonialCard testimonial={testimonials[currentTestimonial]} />
                    </motion.div>
                  </AnimatePresence>
                  <CarouselDots total={testimonials.length} current={currentTestimonial} onDotClick={handleDotClick} />
                </div>
              )}

              <div className="space-y-2 mb-4">
                {planOptions.map((plan) => (
                  <PricingOption
                    key={plan.id}
                    {...plan}
                    selected={plan.id === activePlan.id}
                    onClick={() => setSelectedPlan(plan.id)}
                  />
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 bg-gradient-to-r from-violet-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg shadow-violet-500/30 text-sm"
              >
                {ctaLabel}
              </motion.button>

              {note && <p className="text-[10px] text-slate-400 text-center mt-3 leading-tight">{note}</p>}
            </div>

            <div className="flex justify-center pb-2">
              <div className="w-32 h-1 bg-slate-200 rounded-full" />
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="absolute -left-4 sm:-left-20 top-32 hidden md:block"
        >
          <div className="bg-white rounded-lg shadow-lg px-3 py-2 text-xs font-medium text-slate-700 border border-slate-100">
            <span className="text-violet-500">Testimonials</span> carousel
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="absolute -right-4 sm:-right-20 top-[55%] hidden md:block"
        >
          <div className="bg-white rounded-lg shadow-lg px-3 py-2 text-xs font-medium text-slate-700 border border-slate-100">
            <span className="text-violet-500">Flexible</span> pricing
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="absolute -right-4 sm:-right-16 bottom-24 hidden md:block"
        >
          <div className="bg-white rounded-lg shadow-lg px-3 py-2 text-xs font-medium text-slate-700 border border-slate-100">
            <span className="text-pink-500">Custom</span> CTA
          </div>
        </motion.div>
      </div>
    </div>
  );
}
