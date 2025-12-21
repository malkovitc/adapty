'use client';

import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  decimals?: number;
  useCommas?: boolean;
  className?: string;
}

const AnimatedCounter = ({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  useCommas = true,
  className = '',
}: AnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 80,
    stiffness: 50,
    mass: 1.5,
  });
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (ref.current) {
        let formattedValue: string;

        if (decimals > 0) {
          formattedValue = latest.toFixed(decimals);
        } else {
          formattedValue = Math.floor(latest).toString();
        }

        if (useCommas && decimals === 0) {
          formattedValue = Math.floor(latest).toLocaleString();
        }

        ref.current.textContent = `${prefix}${formattedValue}${suffix}`;
      }
    });

    return () => unsubscribe();
  }, [springValue, prefix, suffix, decimals, useCommas]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.8 }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {prefix}0{suffix}
    </motion.span>
  );
};

export default AnimatedCounter;
