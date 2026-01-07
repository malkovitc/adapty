'use client';

import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useId, useCallback } from 'react';

export interface ToggleProps {
  value: boolean;
  onChange: (value: boolean) => void;
  labelLeft?: string;
  labelRight?: string;
  badge?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

/**
 * Toggle/Switch Component
 *
 * A toggle switch with optional labels on either side and a badge.
 * Perfect for billing period toggles (Monthly/Yearly) with discount badges.
 *
 * Sizes:
 * - sm: 36px track width, 18px knob
 * - md: 44px track width, 20px knob (default)
 * - lg: 52px track width, 24px knob
 *
 * Features:
 * - Animated knob movement with framer-motion
 * - Active label is bold/highlighted
 * - Badge shows next to right label
 * - Fully accessible with keyboard navigation
 */
const Toggle = ({
  value,
  onChange,
  labelLeft,
  labelRight,
  badge,
  size = 'md',
  disabled = false,
  className = '',
}: ToggleProps) => {
  const id = useId();

  const handleToggle = useCallback(() => {
    if (!disabled) {
      onChange(!value);
    }
  }, [disabled, onChange, value]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return;

      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onChange(!value);
      } else if (e.key === 'ArrowLeft' && value) {
        e.preventDefault();
        onChange(false);
      } else if (e.key === 'ArrowRight' && !value) {
        e.preventDefault();
        onChange(true);
      }
    },
    [disabled, onChange, value]
  );

  // Size configuration
  const sizeConfig = {
    sm: {
      track: 'w-9 h-5',        // 36px x 20px
      knob: 'w-4 h-4',          // 16px
      knobTranslate: 16,        // translateX when active
      label: 'text-sm',
      badge: 'text-xs px-2 py-0.5',
    },
    md: {
      track: 'w-11 h-6',       // 44px x 24px
      knob: 'w-5 h-5',          // 20px
      knobTranslate: 20,        // translateX when active
      label: 'text-base',
      badge: 'text-xs px-2.5 py-0.5',
    },
    lg: {
      track: 'w-14 h-7',       // 56px x 28px
      knob: 'w-6 h-6',          // 24px
      knobTranslate: 28,        // translateX when active
      label: 'text-lg',
      badge: 'text-sm px-3 py-1',
    },
  };

  const config = sizeConfig[size];

  const trackClasses = clsx(
    'relative rounded-full cursor-pointer transition-colors duration-200',
    config.track,
    value
      ? 'bg-gradient-to-r from-violet-600 to-pink-500'
      : 'bg-gray-300',
    disabled && 'opacity-50 cursor-not-allowed'
  );

  const knobClasses = clsx(
    'absolute top-0.5 left-0.5 bg-white rounded-full shadow-md',
    config.knob
  );

  const labelClasses = (isActive: boolean) =>
    clsx(
      'transition-all duration-200 select-none',
      config.label,
      isActive
        ? 'text-gray-900 font-semibold'
        : 'text-gray-500 font-normal',
      !disabled && 'cursor-pointer hover:text-gray-700'
    );

  const badgeClasses = clsx(
    'rounded-full font-semibold',
    'bg-green-100 text-green-700 border border-green-300',
    config.badge
  );

  return (
    <div
      className={twMerge(
        'inline-flex items-center gap-3',
        className
      )}
    >
      {/* Left label */}
      {labelLeft && (
        <button
          type="button"
          onClick={() => !disabled && value && onChange(false)}
          className={labelClasses(!value)}
          disabled={disabled}
          tabIndex={-1}
          aria-hidden="true"
        >
          {labelLeft}
        </button>
      )}

      {/* Toggle switch */}
      <div
        role="switch"
        aria-checked={value}
        aria-label={
          labelLeft && labelRight
            ? `Toggle between ${labelLeft} and ${labelRight}`
            : 'Toggle switch'
        }
        aria-describedby={badge ? `${id}-badge` : undefined}
        tabIndex={disabled ? -1 : 0}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className={trackClasses}
      >
        <motion.div
          className={knobClasses}
          initial={false}
          animate={{
            x: value ? config.knobTranslate : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30,
          }}
        />
      </div>

      {/* Right label */}
      {labelRight && (
        <button
          type="button"
          onClick={() => !disabled && !value && onChange(true)}
          className={labelClasses(value)}
          disabled={disabled}
          tabIndex={-1}
          aria-hidden="true"
        >
          {labelRight}
        </button>
      )}

      {/* Badge */}
      {badge && (
        <span
          id={`${id}-badge`}
          className={badgeClasses}
        >
          {badge}
        </span>
      )}
    </div>
  );
};

export default Toggle;
