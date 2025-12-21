'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  href?: string;
  fullWidth?: boolean;
}

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  href,
  fullWidth = false,
  className = '',
  ...motionProps
}: ButtonProps) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variantClasses = {
    primary: 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/50',
    secondary: 'border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white',
    ghost: 'text-purple-600 hover:bg-purple-600/10',
  };

  const baseClasses = clsx(
    'rounded-lg font-semibold transition-all duration-300 inline-flex items-center justify-center gap-2',
    sizeClasses[size],
    variantClasses[variant],
    fullWidth && 'w-full',
    className
  );

  const hoverAnimation = {
    scale: 1.05,
    transition: { duration: 0.2 },
  };

  const tapAnimation = {
    scale: 0.95,
  };

  const content = (
    <>
      {icon && <span className="inline-flex">{icon}</span>}
      {children}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={twMerge(baseClasses)}>
        <motion.div
          whileHover={hoverAnimation}
          whileTap={tapAnimation}
          className="flex items-center gap-2"
        >
          {content}
        </motion.div>
      </Link>
    );
  }

  return (
    <motion.button
      className={twMerge(baseClasses)}
      whileHover={hoverAnimation}
      whileTap={tapAnimation}
      {...motionProps}
    >
      {content}
    </motion.button>
  );
};

export default Button;
