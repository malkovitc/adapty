'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import Image from 'next/image';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { getAssetPath } from '@/lib/utils';

const testimonials = [
  {
    quote: "Migrating off RevenueCat was not an easy decision for us. We've chosen Adapty because we believe they are a better partner as we grow. Looking back it was the right call. Despite some hiccups, the Adapty team was always there to help us during the migration and afterward, and their support is top-notch. I recommend Adapty as a reliable partner.",
    author: "Cem Ortabas",
    role: "Co-founder and CEO",
    company: "HubX",
    photo: "/images/testimonials/cem-ortabas.webp",
    logo: "/images/testimonials/logo-hubx.svg",
  },
  {
    quote: "We've been working with Adapty since 2021 and I couldn't be happier about it. We've tried other subscription management platforms in the past so I can compare. Adapty introduced numerous features over the years and constantly helped us grow. They have the best analytics on the market and all the integrations you can think of. If you looking to boost the revenue of your app, I definitely recommend Adapty.",
    author: "Chris Bick",
    role: "Founder and CEO",
    company: "Bickster",
    photo: "/images/testimonials/chris-bick.webp",
    logo: "/images/testimonials/logo-bickster.png",
  },
  {
    quote: "We chose Adapty for its powerful paywall A/B testing capabilities, which helped us optimize our monetization strategy effectively. The user-friendly platform, flexible pricing, and exceptional customer support make Adapty a superior choice over competitors.",
    author: "Yalçın Özdemir",
    role: "Founder & CEO",
    company: "AppNation",
    photo: "/images/testimonials/yalcin-ozdemir.webp",
    logo: "/images/testimonials/logo-appnation.png",
  },
  {
    quote: "Adapty's platform makes it easy for non-developers to create and manage A/B tests, paywalls, product mix and pricing structure. They have a great external API that makes it easy to pass related events to other analytics tools like Amplitude and Mixpanel.",
    author: "Kyle Smith",
    role: "Head of Data",
    company: "Smitten Dating",
    photo: "/images/testimonials/kyle-smith.webp",
    logo: "/images/testimonials/logo-smitten.webp",
  },
  {
    quote: "We've tested more than three hundred paywalls in the space of four months. Adapty allows testing basically any element of the paywall, and we took advantage of that. We've tested them all: products, title text, CTA buttons, images, videos etc. With Adapty's A/B testing, we managed to double our monthly revenue. I wasn't sure if one instrument could make such an impact, but I witnessed it myself.",
    author: "Roi Mulia",
    role: "Founder & CEO",
    company: "SocialKit",
    photo: "/images/testimonials/roi-mulia.webp",
    logo: "/images/testimonials/logo-socialkit.svg",
  },
];

const stats = [
  {
    numericValue: 15000,
    prefix: '',
    suffix: '+',
    decimals: 0,
    label: 'Apps powered'
  },
  {
    numericValue: 1.9,
    prefix: '$',
    suffix: 'B+',
    decimals: 1,
    label: 'Revenue tracked'
  },
  {
    numericValue: 99.99,
    prefix: '',
    suffix: '%',
    decimals: 2,
    label: 'Uptime SLA'
  },
  {
    numericValue: 4.8,
    prefix: '',
    suffix: '',
    decimals: 1,
    label: 'G2 Rating',
    icon: Star
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  }, []);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <>
      {/* Stats Section - Light background */}
      <section className="relative py-16 sm:py-20 bg-[#F8F9FA]">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-center"
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <AnimatedCounter
                    value={stat.numericValue}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                    useCommas={stat.numericValue >= 1000}
                    className="text-4xl md:text-5xl font-bold text-slate-900"
                  />
                  {stat.icon && (
                    <stat.icon className="w-8 h-8 text-yellow-500 fill-yellow-500" />
                  )}
                </div>
                <p className="text-slate-500 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Slider - Dark background */}
      <section id="testimonials" className="relative py-16 sm:py-20 md:py-24 bg-[#0F172A] overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-16"
          >
            Developers from all kind of apps move to Adapty to grow their revenue
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

                    <div className="mb-4">
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
            <div className="flex justify-center gap-2 mt-12">
              {testimonials.map((_, index) => (
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
        </div>

        {/* Gradient decoration at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-violet-600/20 to-transparent pointer-events-none" />
      </section>
    </>
  );
}
