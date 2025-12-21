'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface GlassCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  className?: string;
  variant?: 'light' | 'dark';
  hover?: boolean;
  glow?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

const GlassCard = ({
  children,
  className = '',
  variant = 'light',
  hover = true,
  glow = false,
  padding = 'lg',
  ...motionProps
}: GlassCardProps) => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-12',
  };

  const variantClasses = {
    light: 'bg-white/10 border-white/20',
    dark: 'bg-black/20 border-white/10',
  };

  const baseClasses = clsx(
    'rounded-2xl border backdrop-blur-xl',
    variantClasses[variant],
    paddingClasses[padding],
    glow && 'shadow-2xl shadow-purple-500/20',
    className
  );

  const hoverAnimation = hover
    ? {
        scale: 1.02,
        boxShadow: '0 25px 50px -12px rgba(139, 92, 246, 0.25)',
      }
    : {};

  return (
    <motion.div
      className={twMerge(baseClasses)}
      whileHover={hoverAnimation}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
