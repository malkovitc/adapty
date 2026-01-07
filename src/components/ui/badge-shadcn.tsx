import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[var(--color-primary)] text-white",
        secondary:
          "border-transparent bg-[var(--bg-secondary)] text-[var(--text-secondary)]",
        destructive:
          "border-transparent bg-red-500 text-white",
        outline:
          "border-[var(--border-default)] text-[var(--text-primary)]",
        success:
          "border-transparent bg-[var(--color-success)] text-white",
        warning:
          "border-transparent bg-[var(--color-warning)] text-white",
        purple:
          "border-purple-300 bg-purple-100 text-purple-700",
        green:
          "border-green-300 bg-green-100 text-green-700",
        amber:
          "border-amber-300 bg-amber-100 text-amber-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function BadgeShadcn({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { BadgeShadcn, badgeVariants }
