'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode, forwardRef } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface CardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  variant?: 'default' | 'elevated' | 'bordered' | 'interactive' | 'glass';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  rounded?: 'md' | 'lg' | 'xl' | '2xl';
  href?: string;
  external?: boolean;
  className?: string;
}

/**
 * Unified Card Component
 *
 * Variants:
 * - default: White background with subtle shadow
 * - elevated: Stronger shadow with hover lift effect
 * - bordered: Border instead of shadow
 * - interactive: Hover gradient effect with cursor pointer
 * - glass: Glassmorphism effect (uses .glass class from globals.css)
 *
 * Padding (uses CSS variables):
 * - none: No padding
 * - sm: --spacing-md (16px)
 * - md: --spacing-lg (24px)
 * - lg: --spacing-xl (32px)
 *
 * Rounded (uses CSS variables):
 * - md: --radius-md (8px)
 * - lg: --radius-lg (12px)
 * - xl: --radius-xl (16px)
 * - 2xl: --radius-2xl (24px)
 */
const Card = forwardRef<HTMLDivElement, CardProps>(({
  children,
  variant = 'default',
  padding = 'md',
  rounded = 'xl',
  href,
  external = false,
  className,
  ...motionProps
}, ref) => {
  // Padding classes using CSS variables
  const paddingClasses = {
    none: '',
    sm: 'p-[var(--spacing-md)]',      // 16px
    md: 'p-[var(--spacing-lg)]',      // 24px
    lg: 'p-[var(--spacing-xl)]',      // 32px
  };

  // Border radius classes using CSS variables
  const roundedClasses = {
    md: 'rounded-[var(--radius-md)]',   // 8px
    lg: 'rounded-[var(--radius-lg)]',   // 12px
    xl: 'rounded-[var(--radius-xl)]',   // 16px
    '2xl': 'rounded-[var(--radius-2xl)]', // 24px
  };

  // Variant styles
  const variantClasses = {
    default: cn(
      'bg-white',
      'shadow-[var(--shadow-sm)]',
    ),
    elevated: cn(
      'bg-white',
      'shadow-[var(--shadow-md)]',
    ),
    bordered: cn(
      'bg-white',
      'border border-[var(--border-default)]',
    ),
    interactive: cn(
      'bg-white',
      'shadow-[var(--shadow-sm)]',
      'cursor-pointer',
    ),
    glass: 'glass', // Uses global .glass class from globals.css
  };

  // Base classes
  const baseClasses = cn(
    'relative',
    'transition-all duration-[var(--transition-base)]',
    roundedClasses[rounded],
    paddingClasses[padding],
    variantClasses[variant],
    className
  );

  // Hover animations based on variant
  const getHoverAnimation = () => {
    switch (variant) {
      case 'elevated':
        return {
          y: -4,
          boxShadow: 'var(--shadow-lg)',
        };
      case 'interactive':
        return {
          y: -2,
          boxShadow: 'var(--shadow-md)',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%)',
        };
      case 'bordered':
        return {
          borderColor: 'var(--border-strong)',
        };
      case 'glass':
        // Glass hover is handled by CSS (.glass:hover in globals.css)
        return {};
      default:
        return {};
    }
  };

  // Tap animation for interactive variant
  const getTapAnimation = () => {
    if (variant === 'interactive' || href) {
      return { scale: 0.98 };
    }
    return {};
  };

  const hoverAnimation = getHoverAnimation();
  const tapAnimation = getTapAnimation();

  // Render as link if href is provided
  if (href) {
    const linkProps = external
      ? { target: '_blank' as const, rel: 'noopener noreferrer' }
      : {};

    return (
      <Link
        href={href}
        className={cn(baseClasses, 'block cursor-pointer')}
        {...linkProps}
      >
        <motion.div
          ref={ref}
          className="h-full"
          whileHover={hoverAnimation}
          whileTap={tapAnimation}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        >
          {children}
        </motion.div>
      </Link>
    );
  }

  // Render as div
  return (
    <motion.div
      ref={ref}
      className={baseClasses}
      whileHover={Object.keys(hoverAnimation).length > 0 ? hoverAnimation : undefined}
      whileTap={Object.keys(tapAnimation).length > 0 ? tapAnimation : undefined}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
});

Card.displayName = 'Card';

export default Card;
