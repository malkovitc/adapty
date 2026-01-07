'use client';

import * as React from "react"
import { motion, HTMLMotionProps } from 'framer-motion';
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import Link from 'next/link';
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium cursor-pointer transition-all duration-[var(--transition-base)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-br from-[#4F8EF7] via-[#6366F1] to-[#8B5CF6] text-white font-semibold shadow-[0_4px_15px_rgba(99,102,241,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] hover:shadow-[0_6px_25px_rgba(99,102,241,0.5),inset_0_1px_0_rgba(255,255,255,0.25)] hover:brightness-110 active:brightness-95 active:shadow-[0_2px_10px_rgba(99,102,241,0.3)]",
        primary:
          "bg-gradient-to-br from-[#4F8EF7] via-[#6366F1] to-[#8B5CF6] text-white font-semibold shadow-[0_4px_15px_rgba(99,102,241,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] hover:shadow-[0_6px_25px_rgba(99,102,241,0.5),inset_0_1px_0_rgba(255,255,255,0.25)] hover:brightness-110 active:brightness-95 active:shadow-[0_2px_10px_rgba(99,102,241,0.3)]",
        destructive:
          "bg-red-500 text-white hover:bg-red-600 active:bg-red-700",
        outline:
          "border-2 border-violet-600 bg-transparent text-violet-600 font-semibold hover:bg-violet-600 hover:text-white active:bg-violet-700",
        secondary:
          "border border-[var(--border-default)] bg-transparent text-[var(--text-primary)] font-medium hover:bg-gray-50 hover:border-[var(--border-strong)] active:bg-gray-100",
        ghost:
          "bg-transparent text-violet-600 font-medium hover:text-violet-700 hover:bg-violet-50 px-0",
        link:
          "text-[var(--color-primary)] underline-offset-4 hover:underline px-0",
      },
      size: {
        default: "h-11 px-6 text-base",
        sm: "h-9 px-4 text-sm gap-1.5",
        md: "h-11 px-6 text-base gap-2",
        lg: "h-13 px-8 text-lg gap-2.5",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// Loading spinner component
const LoadingSpinner = () => (
  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
);

// Arrow icon for ghost variant
const ArrowIcon = () => (
  <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 16 16" fill="none">
    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export interface ButtonProps
  extends Omit<HTMLMotionProps<'button'>, 'children'>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  asChild?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  href?: string;
  external?: boolean;
  fullWidth?: boolean;
  loading?: boolean;
}

const hoverAnimation = {
  y: -1,
  transition: { duration: 0.15 },
};

const tapAnimation = {
  scale: 0.98,
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant = 'default',
    size = 'default',
    asChild = false,
    icon,
    iconPosition = 'right',
    href,
    external = false,
    fullWidth = false,
    loading = false,
    children,
    disabled,
    ...props
  }, ref) => {
    const classes = cn(
      buttonVariants({ variant, size }),
      fullWidth && 'w-full',
      loading && 'cursor-wait',
      'group',
      className
    );

    const content = (
      <>
        {loading && <LoadingSpinner />}
        {!loading && icon && iconPosition === 'left' && (
          <span className="inline-flex shrink-0">{icon}</span>
        )}
        <span>{children}</span>
        {!loading && icon && iconPosition === 'right' && (
          <span className="inline-flex shrink-0">{icon}</span>
        )}
        {!loading && !icon && variant === 'ghost' && <ArrowIcon />}
      </>
    );

    // Use Slot for asChild pattern (no motion)
    if (asChild) {
      return (
        <Slot className={classes} ref={ref as React.Ref<HTMLElement>}>
          {children}
        </Slot>
      );
    }

    // Link version with motion
    if (href) {
      const linkProps = external
        ? { target: '_blank' as const, rel: 'noopener noreferrer' }
        : {};

      return (
        <Link href={href} className={classes} {...linkProps}>
          <motion.span
            className="inline-flex items-center gap-inherit"
            whileHover={variant !== 'ghost' && variant !== 'link' ? hoverAnimation : undefined}
            whileTap={tapAnimation}
          >
            {content}
          </motion.span>
        </Link>
      );
    }

    // Button version with motion
    return (
      <motion.button
        ref={ref}
        className={classes}
        whileHover={variant !== 'ghost' && variant !== 'link' ? hoverAnimation : undefined}
        whileTap={tapAnimation}
        disabled={disabled || loading}
        {...props}
      >
        {content}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

// Export both names for compatibility
export { Button, Button as ButtonShadcn, buttonVariants };
export default Button;
