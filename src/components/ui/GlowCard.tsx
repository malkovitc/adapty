'use client';

import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  borderRadius?: number;
}

export function GlowCard({
  children,
  className,
  glowColor = '#6366F1',
  borderRadius = 12,
}: GlowCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  const { width, height } = dimensions;
  const r = borderRadius;

  // Calculate the perimeter for a rounded rectangle
  const perimeter = width > 0 && height > 0
    ? 2 * (width - 2 * r) + 2 * (height - 2 * r) + 2 * Math.PI * r
    : 0;

  // Path for rounded rectangle (clockwise from top-left corner after the radius)
  const pathD = width > 0 && height > 0
    ? `M ${r} 0
       L ${width - r} 0
       Q ${width} 0 ${width} ${r}
       L ${width} ${height - r}
       Q ${width} ${height} ${width - r} ${height}
       L ${r} ${height}
       Q 0 ${height} 0 ${height - r}
       L 0 ${r}
       Q 0 0 ${r} 0`
    : '';

  return (
    <div
      ref={containerRef}
      className={cn('relative rounded-xl', className)}
    >
      {/* SVG animated border */}
      {width > 0 && height > 0 && (
        <svg
          className="absolute inset-0 pointer-events-none"
          width={width}
          height={height}
          style={{ overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={glowColor} stopOpacity="0" />
              <stop offset="40%" stopColor={glowColor} stopOpacity="1" />
              <stop offset="60%" stopColor={glowColor} stopOpacity="1" />
              <stop offset="100%" stopColor={glowColor} stopOpacity="0" />
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Static border */}
          <path
            d={pathD}
            fill="none"
            stroke="rgba(99, 102, 241, 0.2)"
            strokeWidth="1"
          />

          {/* Animated running light */}
          <path
            d={pathD}
            fill="none"
            stroke="url(#borderGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            filter="url(#glow)"
            style={{
              strokeDasharray: `${perimeter * 0.25} ${perimeter * 0.75}`,
              strokeDashoffset: 0,
              animation: `glow-border-trace 4s linear infinite`,
              ['--perimeter' as string]: `-${perimeter}px`,
            }}
          />
        </svg>
      )}

      {/* Card content with background */}
      <div className="relative bg-white rounded-xl overflow-hidden">
        {children}
      </div>
    </div>
  );
}
