'use client';

import { useRef, useEffect, useState, memo } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getAssetPath } from '@/lib/utils';

// Logos for trust bar
const logos = [
  { name: 'Feeld', src: '/logos/logo-feeld-gray.svg' },
  { name: 'Bumble', src: '/logos/logo-bumble-gray.svg' },
  { name: 'Weewoo', src: '/logos/weewoo.svg' },
  { name: 'AppNation', src: '/logos/appnation.webp' },
  { name: 'Almus', src: '/logos/almus.svg' },
  { name: 'Impala Studios', src: '/logos/logo-text-impala-studios-gray.svg' },
  { name: 'HUBX', src: '/logos/logo-hubx-gray.svg' },
];

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Scroll-based transforms for the image
  const rotate = useTransform(scrollYProgress, [0, 0.5], [12, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], isMobile ? [0.9, 1] : [1.02, 1]);
  const translateY = useTransform(scrollYProgress, [0, 0.5], [0, -30]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      window.location.href = `https://adapty.io/signup/?email=${encodeURIComponent(email)}`;
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full overflow-hidden bg-white"
      aria-label="Hero section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Content - Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center pt-28 lg:pt-36 pb-16 lg:pb-20">
          {/* Left Side - Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col w-full lg:w-1/2 lg:flex-shrink-0"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <Link
                href="https://adapty.io/ebooks/100k-app-playbook/"
                className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 hover:border-gray-300 bg-white text-sm text-gray-600 hover:text-gray-900 transition-all"
              >
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                $100K playbook — download free
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.div>

            {/* Main Heading with Gradient */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4.25rem] font-bold leading-[1.1] tracking-[-0.02em] mb-6"
              style={{ textWrap: 'balance' } as React.CSSProperties}
            >
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-500 bg-clip-text text-transparent">
                Revenue management
              </span>
              <br />
              <span className="text-gray-900">
                for in-app purchases
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-8"
            >
              Save months on integrating subscriptions and double your app revenue with paywall management.
            </motion.p>

            {/* Email Form + Demo Link */}
            <motion.div variants={itemVariants} className="space-y-3">
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full sm:w-56 lg:w-64 h-14 px-4 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                  required
                />
                <button
                  type="submit"
                  className="h-14 px-6 rounded-xl bg-[#6720FF] text-white font-semibold hover:bg-[#5B1FD9] transition-all shadow-md hover:shadow-lg whitespace-nowrap"
                >
                  Start for free
                </button>
              </form>

              <Link
                href="https://adapty.io/schedule-demo/"
                className="group inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Book a demo
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Side - Dashboard Image with Tilt Effect */}
          <div
            className="relative w-full lg:w-1/2 lg:flex-shrink-0"
            style={{ perspective: '1200px' }}
          >
            {/* Glow effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-violet-500/15 via-purple-500/10 to-blue-500/10 rounded-full blur-[100px] -z-10" />

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{
                rotateX: rotate,
                scale,
                translateY,
                boxShadow: '0 24px 48px -12px rgba(16, 24, 40, 0.18)',
              }}
              className="relative rounded-2xl overflow-hidden border border-gray-200/50 bg-white"
            >
              <Image
                src={getAssetPath('/images/hero/adapty-overview.webp')}
                alt="Adapty Overview Dashboard"
                width={1200}
                height={900}
                className="w-full h-auto"
                priority
                unoptimized
              />
            </motion.div>
          </div>
        </div>

        {/* Trust Strip - Full Width Logo Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="border-t border-gray-100 py-12 lg:py-16"
        >
          <p className="text-sm text-gray-500 text-center mb-8">
            Trusted by 15,000+ apps and the world's largest app publishers
          </p>
          <div className="flex flex-wrap justify-center gap-8 lg:gap-16 items-center">
            {logos.map((logo) => (
              <LogoItem key={logo.name} name={logo.name} src={logo.src} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const LogoItem = memo(function LogoItem({ name, src }: { name: string; src: string }) {
  return (
    <div className="h-10 flex items-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
      <Image
        src={getAssetPath(src)}
        alt={name}
        width={120}
        height={40}
        className="h-7 w-auto object-contain"
        unoptimized
        onError={(e) => { e.currentTarget.style.display = 'none'; }}
      />
    </div>
  );
});
