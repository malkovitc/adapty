'use client';

import { useRef, useEffect, useState, memo } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getAssetPath } from '@/lib/utils';
import { Button } from '@/components/ui';

// Logos for trust bar
const logos = [
  { name: 'Feeld', src: '/logos/logo-feeld-gray.svg' },
  { name: 'Bumble', src: '/logos/logo-bumble-gray.svg' },
  { name: 'HUBX', src: '/logos/logo-hubx-gray.svg' },
  { name: 'Impala Studios', src: '/logos/logo-text-impala-studios-gray.svg' },
];

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

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

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full overflow-hidden bg-white"
      aria-label="Hero section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-center min-h-[calc(100vh-80px)] py-16 lg:py-24">
          {/* Left Side - Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col"
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

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.15] tracking-[-0.02em] bg-gradient-to-b from-gray-900 via-gray-800 to-gray-500 bg-clip-text text-transparent mb-6"
            >
              The scalable IAP
              <br />
              infrastructure
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-8 max-w-lg"
            >
              Save months on integrating subscriptions. Double your app revenue with intelligent paywall management.
            </motion.p>

            {/* Two Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 mb-10"
            >
              <Button
                variant="primary"
                size="lg"
                href="https://adapty.io/signup/"
                className="sm:w-auto"
              >
                Start Building
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                href="https://adapty.io/schedule-demo/"
                className="sm:w-auto"
              >
                Book a Demo
              </Button>
            </motion.div>

            {/* Trust Logos */}
            <motion.div variants={itemVariants}>
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-4">
                Trusted by leading apps
              </p>
              <div className="flex flex-wrap gap-6 items-center">
                {logos.map((logo) => (
                  <LogoItem key={logo.name} name={logo.name} src={logo.src} />
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Dashboard Image with Tilt Effect */}
          <div
            className="relative"
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
              }}
              className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200/50 bg-white"
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
      </div>
    </section>
  );
}

const LogoItem = memo(function LogoItem({ name, src }: { name: string; src: string }) {
  return (
    <div className="h-8 flex items-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
      <Image
        src={getAssetPath(src)}
        alt={name}
        width={100}
        height={32}
        className="h-6 w-auto object-contain"
        unoptimized
        onError={(e) => { e.currentTarget.style.display = 'none'; }}
      />
    </div>
  );
});
