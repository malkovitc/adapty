'use client';

import { ReactNode } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning';
  className?: string;
}

const Badge = ({
  children,
  variant = 'default',
  className = '',
}: BadgeProps) => {
  const variantClasses = {
    default: 'bg-purple-100 text-purple-700 border-purple-300',
    success: 'bg-green-100 text-green-700 border-green-300',
    warning: 'bg-yellow-100 text-yellow-700 border-yellow-300',
  };

  const baseClasses = clsx(
    'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border',
    variantClasses[variant],
    className
  );

  return (
    <span className={twMerge(baseClasses)}>
      {children}
    </span>
  );
};

export default Badge;
