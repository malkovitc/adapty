import { ReactNode } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface SectionProps {
  children: ReactNode;
  size?: 'sm' | 'default' | 'lg';
  background?: 'white' | 'gray' | 'dark' | 'gradient';
  className?: string;
  id?: string;
}

/**
 * Section wrapper component for consistent vertical spacing.
 *
 * Uses CSS variables from globals.css:
 * - default: 64px (--spacing-3xl) top/bottom
 * - sm: 48px (--spacing-2xl) top/bottom
 * - lg: 96px (calc(--spacing-3xl * 1.5)) top/bottom
 *
 * Responsive: spacing reduces on mobile (max-width: 768px)
 */
const Section = ({
  children,
  size = 'default',
  background = 'white',
  className = '',
  id,
}: SectionProps) => {
  // Map size prop to CSS class from globals.css
  const sizeClasses = {
    sm: 'section-sm',
    default: 'section',
    lg: 'section-lg',
  };

  // Background styles using CSS variables from globals.css
  const backgroundClasses = {
    white: 'bg-[var(--bg-primary)]',
    gray: 'bg-[var(--bg-subtle)]',
    dark: 'bg-[var(--bg-dark)] text-[var(--text-light)]',
    gradient: 'bg-gradient-to-b from-[var(--bg-primary)] to-[var(--bg-subtle)]',
  };

  const baseClasses = clsx(
    sizeClasses[size],
    backgroundClasses[background],
    className
  );

  return (
    <section id={id} className={twMerge(baseClasses)}>
      {children}
    </section>
  );
};

export default Section;
