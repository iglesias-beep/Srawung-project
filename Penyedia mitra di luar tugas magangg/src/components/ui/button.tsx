import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-forest text-white shadow-soft hover:bg-forest-2 hover:shadow-lift active:scale-[0.98]",
        gold: "bg-gold text-white shadow-gold hover:bg-gold-deep active:scale-[0.98]",
        goldSoft:
          "bg-gold-pale text-gold-deep border border-gold-2/60 hover:bg-gold-3 active:scale-[0.98]",
        outline:
          "border border-ink/15 bg-white text-ink hover:border-gold hover:text-gold-deep",
        ghost: "text-ink hover:bg-sand/60",
        white:
          "bg-white text-forest shadow-soft hover:bg-cream-2 active:scale-[0.98]",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        md: "h-11 px-6",
        lg: "h-12 px-7 text-base",
        icon: "h-11 w-11",
        "icon-sm": "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { Button, buttonVariants };
