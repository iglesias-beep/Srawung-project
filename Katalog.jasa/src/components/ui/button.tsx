import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 min-h-[44px] px-6",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-white hover:bg-primary-soft active:bg-primary-soft",
        outline:
          "border border-primary/40 bg-transparent text-primary hover:border-accent hover:bg-accent hover:text-white",
        ghost:
          "bg-transparent text-primary hover:bg-surface",
        white:
          "bg-white text-primary hover:bg-accent-light",
        accent:
          "bg-accent text-white hover:brightness-110 shadow-[0_4px_14px_rgba(176,141,87,0.4)]",
      },
      size: {
        default: "h-11",
        sm: "h-9 px-4 text-xs min-h-[44px]",
        lg: "h-12 px-8 text-base",
        icon: "h-11 w-11 px-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { Button, buttonVariants };
