import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-accent-primary text-white hover:bg-accent-primary/80",
        secondary:
          "border-transparent bg-panel-raised text-text-secondary hover:bg-panel-raised/80",
        destructive:
          "border-transparent bg-accent-danger text-white hover:bg-accent-danger/80",
        outline: "text-text-primary border-border-hairline hover:bg-white/5",
        // Custom for TMRW spec
        pill_selected: "bg-white text-app-bg border-transparent h-[28px] px-3",
        pill_default: "bg-panel-raised text-text-secondary border-border-hairline h-[28px] px-3 hover:bg-white/5",
        
        chip_default: "bg-panel-raised/50 backdrop-blur-md text-text-secondary border-border-hairline h-[28px] px-3 hover:bg-panel-raised/80",
        chip_selected: "bg-accent-primary/20 text-accent-primary border-accent-primary/30 h-[28px] px-3",
        
        status_warning: "bg-accent-warning/15 text-accent-warning border-transparent",
        status_danger: "bg-accent-danger/15 text-accent-danger border-transparent",
        status_success: "bg-accent-success/15 text-accent-success border-transparent",
        status_primary: "bg-accent-primary/15 text-accent-primary border-transparent",
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

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }

