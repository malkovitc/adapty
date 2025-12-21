'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import AnimatedCounter from '@/components/ui/AnimatedCounter';

const testimonials = [
  {
    quote: "Adapty helped us increase our subscription revenue by 40% in just 3 months. The A/B testing tools are incredibly powerful.",
    author: "Sarah Chen",
    role: "Head of Growth",
    company: "FitLife App",
    avatar: "SC",
    rating: 5,
  },
  {
    quote: "We switched from a homegrown solution and saved our engineering team hundreds of hours. The analytics are best-in-class.",
    author: "Marcus Williams",
    role: "CTO",
    company: "MindfulMe",
    avatar: "MW",
    rating: 5,
  },
  {
    quote: "The no-code paywall builder is a game-changer. We can iterate on pricing and design without waiting for app updates.",
    author: "Elena Rodriguez",
    role: "Product Manager",
    company: "PhotoEditor Pro",
    avatar: "ER",
    rating: 5,
  },
];

const stats = [
  {
    value: '15,000+',
    numericValue: 15000,
    prefix: '',
    suffix: '+',
    decimals: 0,
    label: 'Apps powered'
  },
  {
    value: '$2B+',
    numericValue: 2,
    prefix: '$',
    suffix: 'B+',
    decimals: 0,
    label: 'Revenue tracked'
  },
  {
    value: '99.9%',
    numericValue: 99.9,
    prefix: '',
    suffix: '%',
    decimals: 1,
    label: 'Uptime SLA'
  },
  {
    value: '4.8',
    numericValue: 4.8,
    prefix: '',
    suffix: '',
    decimals: 1,
    label: 'G2 Rating',
    icon: Star
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-16 sm:py-20 md:py-24 bg-[#0F172A] overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px]" />

        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 pb-20 border-b border-white/10"
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
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <AnimatedCounter
                  value={stat.numericValue}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                  useCommas={stat.numericValue >= 1000}
                  className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-white via-white to-purple-200 bg-clip-text text-transparent"
                />
                {stat.icon && (
                  <motion.div
                    initial={{ rotate: 0 }}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <stat.icon className="w-8 h-8 text-yellow-400 fill-yellow-400" />
                  </motion.div>
                )}
              </div>
              <p className="text-slate-400 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm font-semibold uppercase tracking-wider text-purple-400 mb-4"
          >
            Testimonials
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
          >
            Loved by app developers{' '}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              worldwide
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg text-slate-400"
            style={{ maxWidth: '42rem', margin: '0 auto' }}
          >
            Join thousands of successful apps that trust Adapty to power their subscription business
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{
                y: -12,
                scale: 1.02,
                transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
              }}
              className="group relative p-8 rounded-2xl bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-transparent border border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden transition-all duration-500"
            >
              {/* Glassmorphism overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Animated border glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/50 via-cyan-500/50 to-blue-500/50 blur-xl" />
              </div>

              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              {/* Content */}
              <div className="relative z-10">
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.15 + i * 0.1, duration: 0.3 }}
                      whileHover={{ scale: 1.2, rotate: 10 }}
                    >
                      <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    </motion.div>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-white/90 text-lg leading-relaxed mb-8 group-hover:text-white transition-colors duration-300">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold shadow-lg group-hover:shadow-purple-500/50 transition-shadow duration-300"
                  >
                    {testimonial.avatar}
                  </motion.div>
                  <div>
                    <p className="font-semibold text-white group-hover:text-purple-300 transition-colors duration-300">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
