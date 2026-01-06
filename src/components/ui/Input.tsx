'use client';

import { forwardRef, useState, type InputHTMLAttributes, type ReactNode } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Input size - matches Button sizes for alignment */
  size?: 'sm' | 'md' | 'lg';
  /** Icon to display (left side by default) */
  icon?: ReactNode;
  /** Icon position */
  iconPosition?: 'left' | 'right';
  /** Error message or boolean for error state */
  error?: string | boolean;
  /** Helper text below input */
  helperText?: string;
  /** Full width mode */
  fullWidth?: boolean;
  /** Label text */
  label?: string;
  /** Container className */
  containerClassName?: string;
}

/**
 * Input Component
 *
 * Sizes (fixed heights matching Button for inline alignment):
 * - sm: 36px height, 14px text
 * - md: 44px height, 16px text (default)
 * - lg: 52px height, 18px text
 *
 * Features:
 * - Email validation visual feedback
 * - Icon support (left/right)
 * - Error state with message
 * - Focus ring matching Button style
 * - Integrates with Button for hero email forms
 *
 * @example
 * // Basic email input
 * <Input type="email" placeholder="Enter your email" />
 *
 * @example
 * // With icon and error
 * <Input
 *   type="email"
 *   icon={<MailIcon />}
 *   error="Please enter a valid email"
 *   placeholder="your@email.com"
 * />
 *
 * @example
 * // Inline with Button (hero form)
 * <div className="flex gap-2">
 *   <Input type="email" placeholder="Enter email" size="lg" />
 *   <Button size="lg">Get Started</Button>
 * </div>
 */
const Input = forwardRef<HTMLInputElement, InputProps>(({
  size = 'md',
  icon,
  iconPosition = 'left',
  error,
  helperText,
  fullWidth = false,
  label,
  containerClassName,
  className,
  type = 'text',
  disabled,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  // Fixed height sizes matching Button
  const sizeClasses = {
    sm: 'h-9 text-sm',      // 36px
    md: 'h-11 text-base',   // 44px
    lg: 'h-13 text-lg',     // 52px
  };

  const paddingClasses = {
    sm: {
      default: 'px-3',
      withIconLeft: 'pl-9 pr-3',
      withIconRight: 'pl-3 pr-9',
    },
    md: {
      default: 'px-4',
      withIconLeft: 'pl-11 pr-4',
      withIconRight: 'pl-4 pr-11',
    },
    lg: {
      default: 'px-5',
      withIconLeft: 'pl-12 pr-5',
      withIconRight: 'pl-5 pr-12',
    },
  };

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-5 h-5',
  };

  const iconPositionClasses = {
    sm: {
      left: 'left-3',
      right: 'right-3',
    },
    md: {
      left: 'left-4',
      right: 'right-4',
    },
    lg: {
      left: 'left-4',
      right: 'right-4',
    },
  };

  const hasError = Boolean(error);
  const errorMessage = typeof error === 'string' ? error : undefined;

  const getPaddingClass = () => {
    if (icon && iconPosition === 'left') return paddingClasses[size].withIconLeft;
    if (icon && iconPosition === 'right') return paddingClasses[size].withIconRight;
    return paddingClasses[size].default;
  };

  const inputClasses = twMerge(
    clsx(
      // Base styles
      'w-full',
      'rounded-lg',
      'border',
      'bg-white',
      'transition-all duration-150 ease-out',
      'placeholder:text-gray-400',

      // Size
      sizeClasses[size],
      getPaddingClass(),

      // States
      !hasError && !disabled && [
        'border-gray-200',
        'hover:border-gray-300',
        'focus:border-violet-500',
        'focus:ring-2 focus:ring-violet-500/20',
      ],

      // Error state
      hasError && [
        'border-red-500',
        'focus:border-red-500',
        'focus:ring-2 focus:ring-red-500/20',
      ],

      // Disabled state
      disabled && [
        'bg-gray-50',
        'border-gray-200',
        'text-gray-400',
        'cursor-not-allowed',
      ],

      // Focus outline
      'focus:outline-none',
    ),
    className
  );

  const containerClasses = clsx(
    'relative',
    fullWidth ? 'w-full' : 'w-auto',
    containerClassName
  );

  return (
    <div className={containerClasses}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
        </label>
      )}

      <div className="relative">
        {/* Icon */}
        {icon && (
          <span
            className={clsx(
              'absolute top-1/2 -translate-y-1/2',
              'flex items-center justify-center',
              'text-gray-400',
              'pointer-events-none',
              'transition-colors duration-150',
              iconSizeClasses[size],
              iconPositionClasses[size][iconPosition],
              isFocused && !hasError && 'text-violet-500',
              hasError && 'text-red-500',
            )}
          >
            {icon}
          </span>
        )}

        <input
          ref={ref}
          type={type}
          disabled={disabled}
          className={inputClasses}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          aria-invalid={hasError}
          aria-describedby={
            errorMessage ? `${props.id}-error` : helperText ? `${props.id}-helper` : undefined
          }
          {...props}
        />
      </div>

      {/* Error message */}
      {errorMessage && (
        <p
          id={`${props.id}-error`}
          className="mt-1.5 text-sm text-red-500"
          role="alert"
        >
          {errorMessage}
        </p>
      )}

      {/* Helper text */}
      {helperText && !errorMessage && (
        <p
          id={`${props.id}-helper`}
          className="mt-1.5 text-sm text-gray-500"
        >
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;

/**
 * Email icon component for convenience
 */
export const EmailIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
  </svg>
);
