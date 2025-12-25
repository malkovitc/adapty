'use client';

import { useId } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedPathProps {
  d: string;
  duration?: number;
  color?: string;
  className?: string;
}

export function AnimatedPath({
  d,
  duration: _duration = 2.2,
  color = 'rgba(99, 102, 241, 1)', // indigo
  className
}: AnimatedPathProps) {
  const id = useId();
  const gradientId = `gradient-${id}`;
  const filterId = `glow-${id}`;

  return (
    <svg className={cn('absolute pointer-events-none', className)} viewBox="0 0 600 200" fill="none">
      <defs>
        <filter id={filterId}>
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={color.replace('1)', '0)')} />
          <stop offset="0.5" stopColor={color} />
          <stop offset="1" stopColor={color.replace('1)', '0)')} />
        </linearGradient>
      </defs>

      {/* Base path (dim) */}
      <path
        d={d}
        fill="none"
        stroke="rgba(0,0,0,0.08)"
        strokeWidth="2"
      />

      {/* Animated light runner */}
      <path
        d={d}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="2.5"
        strokeLinecap="round"
        filter={`url(#${filterId})`}
        className="animate-dash"
        style={{
          strokeDasharray: '60 420',
        }}
      />
    </svg>
  );
}
