'use client';

import { useEffect, useState, useRef, type ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { enterpriseStats, type Stat } from '@/data/stats';

interface CounterProps {
  end: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
}

function AnimatedCounter({ end, prefix = '', suffix = '', decimals = 0, duration = 2 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = easeOutQuart * end;

      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isInView, end, duration]);

  const displayValue = decimals > 0 ? count.toFixed(decimals) : Math.round(count);

  return (
    <span ref={ref}>
      {prefix}{displayValue}{suffix}
    </span>
  );
}

interface StatsSectionProps {
  stats?: Stat[];
  title?: ReactNode;
  subtitle?: ReactNode;
  size?: 'sm' | 'default' | 'lg';
  background?: 'white' | 'gray' | 'dark' | 'gradient';
}

export default function StatsSection({
  stats = enterpriseStats,
  title = 'Infrastructure at scale',
  background = 'white',
}: StatsSectionProps = {}) {
  return (
    <Section size="sm" background={background} className="py-10 sm:py-12">
      <Container>
        {/* Section Header - Left aligned, technical style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-2"
        >
          {title && (
            <h2 className="text-xs font-medium text-gray-400 uppercase tracking-[0.1em]">
              {title}
            </h2>
          )}
        </motion.div>

        {/* Stats Grid - Dashboard style with borders, more breathing room */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="border-y border-gray-200/80 py-10 sm:py-12 lg:py-14"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`
                  ${index < 3 ? 'lg:border-r lg:border-gray-200/60' : ''}
                  ${index < 2 ? 'border-b lg:border-b-0 border-gray-200/60 pb-8 lg:pb-0' : 'pt-8 lg:pt-0'}
                  lg:pr-10 last:lg:pr-0
                `}
              >
                {/* Label - above number, uppercase, muted */}
                <p className="text-[10px] sm:text-[11px] font-medium uppercase tracking-widest text-gray-400/80 mb-3">
                  {stat.label}
                </p>
                {/* Number - large, bold */}
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight tabular-nums">
                  <AnimatedCounter
                    end={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
