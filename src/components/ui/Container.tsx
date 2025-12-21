import { ReactNode } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const Container = ({
  children,
  className = '',
  size = 'xl',
}: ContainerProps) => {
  const sizeClasses = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full',
  };

  const baseClasses = clsx(
    'mx-auto px-4 sm:px-6 lg:px-8',
    sizeClasses[size],
    className
  );

  return (
    <div className={twMerge(baseClasses)}>
      {children}
    </div>
  );
};

export default Container;
