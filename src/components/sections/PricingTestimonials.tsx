'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  company: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "Adapty has been a game-changer for our subscription business. The analytics alone have helped us increase revenue by 40%.",
    name: "Kyle Smith",
    title: "Head of Data",
    company: "Smitten Dating",
  },
  {
    quote: "The paywall builder saved us months of development time. We can now iterate on our pricing strategy in minutes.",
    name: "Sarah Chen",
    title: "Product Manager",
    company: "FitLife App",
  },
  {
    quote: "Moving to Adapty was the best decision we made. Their A/B testing helped us find the perfect price point.",
    name: "Marcus Johnson",
    title: "CEO",
    company: "MindfulMe",
  },
  {
    quote: "The integration was seamless and the support team is incredibly responsive. Highly recommend.",
    name: "Elena Rodriguez",
    title: "Lead Developer",
    company: "PhotoPro",
  },
];

/**
 * Avatar component showing initials
 */
const Avatar = ({ name }: { name: string }) => {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
      {initials}
    </div>
  );
};

/**
 * Single testimonial card component
 */
const TestimonialCard = ({
  testimonial,
}: {
  testimonial: Testimonial;
}) => (
  <div className="flex flex-col h-full p-[var(--spacing-lg)] bg-slate-800/50 rounded-2xl border border-slate-700/50">
    {/* Quote */}
    <blockquote className="text-[var(--text-lg)] text-white/90 leading-relaxed mb-[var(--spacing-lg)] flex-grow">
      &ldquo;{testimonial.quote}&rdquo;
    </blockquote>

    {/* Author */}
    <div className="flex items-center gap-[var(--spacing-md)]">
      <Avatar name={testimonial.name} />
      <div>
        <p className="font-semibold text-white">{testimonial.name}</p>
        <p className="text-sm text-slate-400">
          {testimonial.title}, {testimonial.company}
        </p>
      </div>
    </div>
  </div>
);

export default function PricingTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  return (
    <Section size="lg" background="dark" className="overflow-hidden">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white"
          >
            People from all kinds of businesses turn to Adapty to grow their revenue
          </motion.h2>
        </div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Desktop: Show 2 cards, Mobile: Show 1 card */}
          <div className="hidden md:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-2 gap-[var(--spacing-lg)]"
              >
                <TestimonialCard testimonial={testimonials[currentIndex]} />
                <TestimonialCard
                  testimonial={testimonials[(currentIndex + 1) % testimonials.length]}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile: Show 1 card */}
          <div className="md:hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <TestimonialCard testimonial={testimonials[currentIndex]} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-[var(--spacing-sm)] mt-[var(--spacing-xl)]">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-white w-8'
                    : 'bg-white/30 hover:bg-white/50 w-2'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
