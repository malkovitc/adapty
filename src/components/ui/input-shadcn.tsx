'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const inputVariants = cva(
  // Base styles
  [
    'flex w-full rounded-lg border bg-white',
    'transition-all duration-[var(--transition-fast)]',
    'placeholder:text-[var(--text-tertiary)]',
    'focus:outline-none focus:ring-2',
    'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[var(--bg-muted)]',
    'file:border-0 file:bg-transparent file:text-sm file:font-medium',
  ],
  {
    variants: {
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-11 px-4 text-base',
        lg: 'h-13 px-5 text-lg',
      },
      variant: {
        default: [
          'border-[var(--border-default)]',
          'hover:border-[var(--border-hover)]',
          'focus:border-[var(--color-primary)]',
          'focus:ring-[var(--color-primary)]/20',
        ],
        error: [
          'border-red-500',
          'focus:border-red-500',
          'focus:ring-red-500/20',
        ],
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  /** Icon to display (left side) */
  icon?: React.ReactNode;
  /** Error message or boolean for error state */
  error?: string | boolean;
  /** Helper text below input */
  helperText?: string;
  /** Label text */
  label?: string;
  /** Full width mode */
  fullWidth?: boolean;
  /** Container className */
  containerClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      containerClassName,
      type = 'text',
      size,
      variant,
      icon,
      error,
      helperText,
      label,
      fullWidth = false,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);

    const hasError = Boolean(error);
    const errorMessage = typeof error === 'string' ? error : undefined;
    const computedVariant = hasError ? 'error' : variant;

    // Icon padding adjustments
    const iconPadding = {
      sm: 'pl-9',
      md: 'pl-11',
      lg: 'pl-12',
    };

    const iconSize = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-5 h-5',
    };

    const iconPosition = {
      sm: 'left-3',
      md: 'left-4',
      lg: 'left-4',
    };

    const currentSize = size || 'md';

    return (
      <div className={cn('relative', fullWidth && 'w-full', containerClassName)}>
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-[var(--text-primary)] mb-1.5"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {icon && (
            <span
              className={cn(
                'absolute top-1/2 -translate-y-1/2',
                'flex items-center justify-center',
                'pointer-events-none',
                'transition-colors duration-150',
                iconSize[currentSize],
                iconPosition[currentSize],
                hasError
                  ? 'text-red-500'
                  : isFocused
                    ? 'text-[var(--color-primary)]'
                    : 'text-[var(--text-tertiary)]'
              )}
            >
              {icon}
            </span>
          )}

          <input
            type={type}
            id={id}
            disabled={disabled}
            className={cn(
              inputVariants({ size, variant: computedVariant }),
              icon && iconPadding[currentSize],
              className
            )}
            ref={ref}
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
              errorMessage
                ? `${id}-error`
                : helperText
                  ? `${id}-helper`
                  : undefined
            }
            {...props}
          />
        </div>

        {errorMessage && (
          <p id={`${id}-error`} className="mt-1.5 text-sm text-red-500" role="alert">
            {errorMessage}
          </p>
        )}

        {helperText && !errorMessage && (
          <p id={`${id}-helper`} className="mt-1.5 text-sm text-[var(--text-secondary)]">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

/**
 * Email icon component for convenience
 */
const EmailIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
  </svg>
);

export { Input, inputVariants, EmailIcon };
export default Input;
