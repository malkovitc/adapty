'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Sparkles } from 'lucide-react';

const benefits = [
  'Free plan available',
  'No credit card required',
  '5-minute integration',
  'Cancel anytime',
];

export default function CTA() {
  return (
    <section id="cta" className="relative pt-16 pb-24 sm:pt-20 sm:pb-28 md:pt-24 md:pb-32 bg-gradient-to-b from-[#FAFAFA] via-white to-[#FAFAFA] overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Main gradient orb */}
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

        {/* Secondary floating orbs */}
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-indigo-400/20 rounded-full blur-[80px]"
        />
        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
          className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] bg-cyan-400/20 rounded-full blur-[80px]"
        />

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(124, 58, 237) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 mb-6"
          >
            Ready to boost your{' '}
            <span className="bg-gradient-to-r from-indigo-500 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              app revenue?
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg md:text-xl text-slate-600"
            style={{ maxWidth: '42rem', margin: '0 auto 48px auto' }}
          >
            Join 15,000+ apps that use Adapty to manage and grow their subscription business.
            Get started in minutes.
          </motion.p>
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
        >
          <motion.a
            href="#"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group relative inline-flex items-center justify-center gap-3 h-14 px-10 bg-gradient-to-r from-[#6366F1] to-[#6366F1] hover:from-[#4F46E5] hover:to-[#4338CA] text-white rounded-full font-semibold text-base shadow-[0_4px_24px_rgba(99,102,241,0.4)] hover:shadow-[0_8px_32px_rgba(99,102,241,0.5)] transition-all duration-300 overflow-hidden touch-manipulation"
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <Sparkles className="w-5 h-5 shrink-0" />
            <span>Start for free</span>
            <ArrowRight className="w-5 h-5 shrink-0 group-hover:translate-x-1 transition-transform duration-300" />
          </motion.a>
          <motion.a
            href="#"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group inline-flex items-center justify-center gap-3 h-14 px-10 bg-white hover:bg-slate-50 text-slate-900 rounded-full font-semibold text-base border-2 border-slate-200 hover:border-purple-300 shadow-lg hover:shadow-xl transition-all duration-300 touch-manipulation"
          >
            <span>Book a demo</span>
            <ArrowRight className="w-5 h-5 shrink-0 group-hover:translate-x-1 transition-transform duration-300" />
          </motion.a>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-x-10 gap-y-4"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              className="flex items-center gap-2 text-slate-600"
            >
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              <span className="font-medium">{benefit}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
