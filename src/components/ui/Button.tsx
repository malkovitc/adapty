'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode, forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  href?: string;
  external?: boolean;
  fullWidth?: boolean;
  loading?: boolean;
}

/**
 * Unified Button Component
 *
 * Sizes (fixed heights for consistency):
 * - sm: 36px height, 14px text
 * - md: 44px height, 16px text (default)
 * - lg: 52px height, 18px text
 *
 * Variants:
 * - primary: Gradient background, white text (main CTAs)
 * - secondary: Border only, dark text (secondary actions)
 * - outline: Purple border, purple text (alternate CTAs)
 * - ghost: No background, purple text with arrow (links)
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  href,
  external = false,
  fullWidth = false,
  loading = false,
  className = '',
  disabled,
  ...motionProps
}, ref) => {
  // Fixed height sizes for consistency
  const sizeClasses = {
    sm: 'h-9 px-4 text-sm gap-1.5',      // 36px
    md: 'h-11 px-6 text-base gap-2',     // 44px
    lg: 'h-13 px-8 text-lg gap-2.5',     // 52px
  };

  const variantClasses = {
    primary: clsx(
      'bg-gradient-to-r from-violet-600 to-pink-500',
      'text-white font-semibold',
      'shadow-[0_4px_14px_0_rgba(124,58,237,0.39)]',
      'hover:shadow-[0_6px_20px_rgba(124,58,237,0.5)]',
      'hover:from-violet-700 hover:to-pink-600',
      'active:from-violet-800 active:to-pink-700'
    ),
    secondary: clsx(
      'bg-transparent',
      'text-gray-900 font-medium',
      'border border-gray-200',
      'hover:bg-gray-50 hover:border-gray-300',
      'active:bg-gray-100'
    ),
    outline: clsx(
      'bg-transparent',
      'text-violet-600 font-semibold',
      'border-2 border-violet-600',
      'hover:bg-violet-600 hover:text-white',
      'active:bg-violet-700'
    ),
    ghost: clsx(
      'bg-transparent',
      'text-violet-600 font-medium',
      'hover:text-violet-700',
      'px-0'  // No horizontal padding for ghost
    ),
  };

  const baseClasses = clsx(
    'inline-flex items-center justify-center',
    'rounded-lg',
    'transition-all duration-150 ease-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
    sizeClasses[size],
    variantClasses[variant],
    fullWidth && 'w-full',
    loading && 'cursor-wait',
    className
  );

  const hoverAnimation = {
    y: -1,
    transition: { duration: 0.15 },
  };

  const tapAnimation = {
    scale: 0.98,
  };

  // Loading spinner
  const LoadingSpinner = () => (
    <svg
      className="animate-spin h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );

  // Arrow icon for ghost variant
  const ArrowIcon = () => (
    <svg
      className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M6 12L10 8L6 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const content = (
    <>
      {loading && <LoadingSpinner />}
      {!loading && icon && iconPosition === 'left' && (
        <span className="inline-flex shrink-0">{icon}</span>
      )}
      <span>{children}</span>
      {!loading && icon && iconPosition === 'right' && (
        <span className="inline-flex shrink-0">{icon}</span>
      )}
      {!loading && !icon && variant === 'ghost' && <ArrowIcon />}
    </>
  );

  // Link version
  if (href) {
    const linkProps = external
      ? { target: '_blank', rel: 'noopener noreferrer' }
      : {};

    return (
      <Link
        href={href}
        className={twMerge(baseClasses, 'group')}
        {...linkProps}
      >
        <motion.span
          className="inline-flex items-center gap-inherit"
          whileHover={variant !== 'ghost' ? hoverAnimation : undefined}
          whileTap={tapAnimation}
        >
          {content}
        </motion.span>
      </Link>
    );
  }

  // Button version
  return (
    <motion.button
      ref={ref}
      className={twMerge(baseClasses, 'group')}
      whileHover={variant !== 'ghost' ? hoverAnimation : undefined}
      whileTap={tapAnimation}
      disabled={disabled || loading}
      {...motionProps}
    >
      {content}
    </motion.button>
  );
});

Button.displayName = 'Button';

export default Button;
