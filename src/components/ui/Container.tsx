import { ReactNode, HTMLAttributes, createElement } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Container size variants mapped to Tailwind max-width classes
 * - sm: 768px (max-w-3xl)
 * - md: 1024px (max-w-5xl)
 * - lg: 1152px (max-w-6xl)
 * - full: 1280px (max-w-7xl) - default, matches design system
 */
export type ContainerSize = 'sm' | 'md' | 'lg' | 'full';

/**
 * Allowed HTML elements for semantic rendering
 */
export type ContainerElement = 'div' | 'section' | 'article' | 'main' | 'aside' | 'header' | 'footer';

/**
 * Props for the Container component
 */
export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  /** Content to render inside the container */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Container max-width size variant */
  size?: ContainerSize;
  /** HTML element to render as (for semantic HTML) */
  as?: ContainerElement;
}

/**
 * Size variant to Tailwind class mapping
 */
const sizeClasses: Record<ContainerSize, string> = {
  sm: 'max-w-3xl',    // 768px
  md: 'max-w-5xl',    // 1024px
  lg: 'max-w-6xl',    // 1152px
  full: 'max-w-7xl',  // 1280px - design system default
};

/**
 * Unified Container component for consistent page layouts.
 *
 * Uses CSS variables from globals.css for responsive padding:
 * - Mobile: 16px (--spacing-md)
 * - Tablet (sm): 24px (--spacing-lg)
 * - Desktop (lg): 48px (--spacing-2xl)
 *
 * @example
 * // Basic usage
 * <Container>Content</Container>
 *
 * @example
 * // With size variant
 * <Container size="md">Narrower content</Container>
 *
 * @example
 * // As semantic HTML element
 * <Container as="section" className="py-16">
 *   <h2>Section Title</h2>
 * </Container>
 *
 * @example
 * // As main content area
 * <Container as="main" size="lg">
 *   <article>...</article>
 * </Container>
 */
const Container = ({
  children,
  className = '',
  size = 'full',
  as: Element = 'div',
  ...props
}: ContainerProps) => {
  const baseClasses = clsx(
    // Center the container
    'mx-auto w-full',
    // Responsive padding using CSS variable values:
    // Mobile: 16px, Tablet (sm): 24px, Desktop (lg): 48px
    'px-[var(--spacing-md)] sm:px-[var(--spacing-lg)] lg:px-[var(--spacing-2xl)]',
    // Max-width based on size variant
    sizeClasses[size],
    // Custom classes
    className
  );

  return createElement(
    Element,
    { className: twMerge(baseClasses), ...props },
    children
  );
};

export default Container;
