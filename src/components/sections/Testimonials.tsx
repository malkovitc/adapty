'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import Image from 'next/image';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
} from '@/components/ui';
import { getAssetPath } from '@/lib/utils';
import { testimonials as defaultTestimonials, type Testimonial } from '@/data/testimonials';

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

interface TestimonialsProps {
  testimonials?: Testimonial[];
}

export default function Testimonials({ testimonials = defaultTestimonials }: TestimonialsProps = {}) {
  return (
    <>
      {/* Stats Section - Light background */}
      <Section size="lg" background="gray">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 md:grid-cols-4 gap-[var(--spacing-lg)]"
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
                <div className="flex items-center justify-center gap-[var(--spacing-sm)] mb-[var(--spacing-sm)]">
                  <AnimatedCounter
                    value={stat.numericValue}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                    useCommas={stat.numericValue >= 1000}
                    className="text-4xl md:text-5xl font-bold text-[var(--text-primary)]"
                  />
                  {stat.icon && (
                    <stat.icon className="w-8 h-8 text-yellow-500 fill-yellow-500" />
                  )}
                </div>
                <p className="text-[var(--text-secondary)] font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* Testimonials Slider - Dark background */}
      <Section size="lg" background="dark" id="testimonials" className="overflow-hidden relative">
        <Container>
          {/* Section Header */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-[var(--text-h2)] sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-light)] text-center mb-[var(--spacing-lg)]"
          >
            Developers from all kind of apps move to Adapty to grow their revenue
          </motion.h2>

          {/* Testimonial Slider */}
          <div className="relative">
            <Carousel opts={{ loop: true }}>
              <CarouselContent className="px-6 sm:px-12 md:px-20">
                {testimonials.map((testimonial) => (
                  <CarouselItem
                    key={`${testimonial.author.name}-${testimonial.author.company}`}
                    className="pt-4"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="grid md:grid-cols-2 gap-[var(--spacing-lg)] md:gap-[var(--spacing-xl)] items-center"
                    >
                      <div className="relative flex justify-center md:justify-start">
                        <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-2xl overflow-hidden">
                          <Image
                            src={getAssetPath(testimonial.author.avatar || '')}
                            alt={testimonial.author.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 256px, 288px"
                            unoptimized
                          />
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <blockquote className="text-[var(--text-lg)] sm:text-xl text-[var(--text-secondary)] leading-relaxed mb-[var(--spacing-lg)] min-h-[180px] sm:min-h-[200px] md:min-h-[220px]">
                          &ldquo;{testimonial.quote}&rdquo;
                        </blockquote>

                        <div className="mb-[var(--spacing-md)]">
                          <p className="text-xl font-semibold text-[var(--text-light)]">
                            {testimonial.author.name}
                          </p>
                          <p className="text-[var(--text-tertiary)]">
                            {testimonial.author.role}, {testimonial.author.company}
                          </p>
                        </div>

                        <div className="h-8 relative">
                          <Image
                            src={getAssetPath(testimonial.author.companyLogo || '')}
                            alt={testimonial.author.company}
                            width={120}
                            height={32}
                            className="h-8 w-auto object-contain brightness-0 invert opacity-80"
                            unoptimized
                          />
                        </div>
                      </div>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious
                variant="glass"
                className="hidden sm:flex -left-6 md:-left-12"
              />
              <CarouselNext
                variant="glass"
                className="hidden sm:flex -right-6 md:-right-12"
              />
              <CarouselDots className="mt-[var(--spacing-xl)]" />
            </Carousel>
          </div>
        </Container>

        {/* Gradient decoration at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-violet-600/20 to-transparent pointer-events-none" />
      </Section>
    </>
  );
}
