import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Note: I am not installing radix-ui/react-slot just yet as it wasn't in my initial list, 
// but for a simple button I can just use a span or button element directly or make Slot optional/custom.
// For now, I'll stick to a standard button without Slot to avoid extra dependencies unless needed for composition.
// Actually, Slot is very useful for "asChild". I'll skip it for now to keep dependencies minimal unless I need it.

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-primary disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-accent-primary text-white hover:bg-accent-primary/90 shadow-sm",
        destructive:
          "bg-accent-danger text-white hover:bg-accent-danger/90 shadow-sm",
        outline:
          "border border-border-subtle bg-transparent shadow-sm hover:bg-accent-primary/10 hover:text-accent-primary",
        secondary:
          "bg-panel-raised text-text-primary hover:bg-panel-raised/80",
        ghost: "hover:bg-accent-primary/10 hover:text-accent-primary",
        link: "text-accent-primary underline-offset-4 hover:underline",
        flat: "bg-white text-app-bg hover:bg-white/90 font-bold", // High contrast
      },
      size: {
        default: "h-[40px] px-4 py-2 rounded-button",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-[40px] w-[40px] rounded-button",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // implementing simple asChild support or just ignoring it for now as I removed radix slot
    // Suppress unused variable warning
    void asChild;
    const Comp = "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

