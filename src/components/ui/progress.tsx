"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const progressVariants = cva(
  "relative w-full overflow-hidden rounded-full transition-all",
  {
    variants: {
      size: {
        default: "h-2",
        sm: "h-1",
        lg: "h-3",
        xl: "h-4",
      },
      variant: {
        default: "bg-[var(--bg-muted)]",
        secondary: "bg-[var(--bg-secondary)] border border-[var(--border-default)]",
        muted: "bg-[var(--border-default)]",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  }
)

const indicatorVariants = cva(
  "h-full w-full flex-1 rounded-full transition-all duration-[var(--transition-base)]",
  {
    variants: {
      color: {
        default: "bg-[var(--color-primary)]",
        success: "bg-[var(--color-secondary)]",
        warning: "bg-[var(--color-accent)]",
        gradient: "bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)]",
      },
    },
    defaultVariants: {
      color: "default",
    },
  }
)

export interface ProgressProps
  extends React.ComponentProps<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants> {
  indicatorColor?: VariantProps<typeof indicatorVariants>["color"]
}

function Progress({
  className,
  value,
  size,
  variant,
  indicatorColor,
  ...props
}: ProgressProps) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(progressVariants({ size, variant }), className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn(indicatorVariants({ color: indicatorColor }))}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress, progressVariants, indicatorVariants }
