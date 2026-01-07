"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const separatorVariants = cva(
  "shrink-0",
  {
    variants: {
      variant: {
        default: "bg-[var(--border-default)]",
        strong: "bg-[var(--border-strong)]",
        muted: "bg-[var(--bg-muted)]",
        gradient: "bg-gradient-to-r from-transparent via-[var(--border-default)] to-transparent",
      },
      spacing: {
        default: "",
        sm: "my-2",
        md: "my-4",
        lg: "my-6",
        xl: "my-8",
      },
    },
    defaultVariants: {
      variant: "default",
      spacing: "default",
    },
  }
)

export interface SeparatorProps
  extends React.ComponentProps<typeof SeparatorPrimitive.Root>,
    VariantProps<typeof separatorVariants> {}

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  variant,
  spacing,
  ...props
}: SeparatorProps) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        separatorVariants({ variant, spacing }),
        "data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      )}
      {...props}
    />
  )
}

export { Separator, separatorVariants }
