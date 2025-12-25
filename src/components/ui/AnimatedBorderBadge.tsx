'use client';

import { ReactNode } from 'react';
import Link from 'next/link';

interface AnimatedBorderBadgeProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export default function AnimatedBorderBadge({
  href,
  children,
  className = ''
}: AnimatedBorderBadgeProps) {
  return (
    <Link
      href={href}
      className={`
        group relative inline-flex items-center gap-2
        rounded-full px-4 py-2 text-sm font-medium
        text-slate-600 hover:text-slate-900
        transition-colors duration-300
        ${className}
      `}
      style={{
        background: `
          linear-gradient(white, white) padding-box,
          conic-gradient(from var(--border-angle),
            rgba(99, 102, 241, 0.1) 0%,
            rgba(99, 102, 241, 0.4) 25%,
            rgba(59, 130, 246, 0.6) 50%,
            rgba(99, 102, 241, 0.4) 75%,
            rgba(99, 102, 241, 0.1) 100%
          ) border-box
        `,
        border: '1.5px solid transparent',
        animation: 'border-rotate 4s linear infinite',
      }}
    >
      {children}
    </Link>
  );
}

// Alternative version with SVG-based animation for better cross-browser support
export function AnimatedBorderBadgeSVG({
  href,
  children,
  className = ''
}: AnimatedBorderBadgeProps) {
  return (
    <Link
      href={href}
      className={`
        group relative inline-flex items-center gap-2
        rounded-full text-sm font-medium
        text-slate-600 hover:text-slate-900
        transition-colors duration-300
        ${className}
      `}
    >
      {/* SVG animated border */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ transform: 'scale(1.02)' }}
      >
        <defs>
          <linearGradient id="gradient-border" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(99, 102, 241, 0.6)">
              <animate
                attributeName="stop-color"
                values="rgba(99, 102, 241, 0.6); rgba(59, 130, 246, 0.6); rgba(99, 102, 241, 0.2); rgba(99, 102, 241, 0.6)"
                dur="3s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="50%" stopColor="rgba(59, 130, 246, 0.6)">
              <animate
                attributeName="stop-color"
                values="rgba(59, 130, 246, 0.6); rgba(99, 102, 241, 0.2); rgba(99, 102, 241, 0.6); rgba(59, 130, 246, 0.6)"
                dur="3s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="rgba(99, 102, 241, 0.2)">
              <animate
                attributeName="stop-color"
                values="rgba(99, 102, 241, 0.2); rgba(99, 102, 241, 0.6); rgba(59, 130, 246, 0.6); rgba(99, 102, 241, 0.2)"
                dur="3s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
        </defs>
        <rect
          x="0.75"
          y="0.75"
          width="calc(100% - 1.5px)"
          height="calc(100% - 1.5px)"
          rx="9999"
          ry="9999"
          fill="none"
          stroke="url(#gradient-border)"
          strokeWidth="1.5"
          className="animate-[dash_3s_linear_infinite]"
          style={{
            strokeDasharray: '100 200',
            strokeDashoffset: '0',
          }}
        />
      </svg>

      {/* Background and content */}
      <span className="relative bg-white rounded-full px-4 py-2 flex items-center gap-2 shadow-sm border border-slate-100">
        {children}
      </span>
    </Link>
  );
}
