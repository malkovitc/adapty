'use client';

import { cn } from '@/lib/utils';

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export function ShimmerButton({
  children,
  className,
  variant = 'primary',
  ...props
}: ShimmerButtonProps) {
  return (
    <button
      className={cn(
        'relative px-6 py-3 rounded-lg overflow-hidden font-medium transition-all duration-300',
        'group',
        variant === 'primary'
          ? 'bg-neutral-900 text-white hover:bg-neutral-800'
          : 'bg-white text-neutral-900 border border-neutral-200 hover:border-neutral-300',
        className
      )}
      {...props}
    >
      {/* Shimmer overlay */}
      <div
        className={cn(
          'absolute inset-0 -translate-x-full',
          'bg-gradient-to-r from-transparent via-white/20 to-transparent',
          'group-hover:animate-shimmer'
        )}
      />

      <span className="relative z-10">{children}</span>
    </button>
  );
}
