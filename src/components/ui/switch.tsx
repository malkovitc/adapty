"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

/**
 * Switch component styled with Adapty design system
 *
 * Uses:
 * - --color-primary (#6720FF) for checked state
 * - --bg-muted (#F5F5F5) for unchecked background
 * - --transition-base for smooth animations
 */
function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        // Base styles
        "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent",
        // Transitions using design system
        "transition-colors duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
        // Focus styles
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2",
        // Disabled state
        "disabled:cursor-not-allowed disabled:opacity-50",
        // Checked state - Adapty purple
        "data-[state=checked]:bg-[var(--color-primary)]",
        // Unchecked state - muted background
        "data-[state=unchecked]:bg-[var(--bg-muted)]",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          // Base styles
          "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0",
          // Transitions using design system
          "transition-transform duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
          // Position based on state
          "data-[state=checked]:translate-x-5",
          "data-[state=unchecked]:translate-x-0"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
