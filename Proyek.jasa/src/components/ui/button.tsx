import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "destructive" | "emerald";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-emerald/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40 cursor-pointer min-h-[44px] min-w-[44px]",
          variant === "default" && "bg-bg-elevated text-text-primary hover:bg-[#E5E7EB] border border-[#E5E7EB] hover:border-accent-brass/40",
          variant === "outline" && "border border-[#E5E7EB] bg-transparent text-text-primary hover:border-accent-brass/50 hover:bg-bg-elevated/50",
          variant === "ghost" && "bg-transparent text-text-muted hover:text-text-primary hover:bg-bg-elevated/60",
          variant === "destructive" && "bg-destructive/10 text-destructive hover:bg-destructive/20 border border-destructive/15",
          variant === "emerald" && "bg-accent-emerald text-white hover:bg-[#047857] shadow-[0_2px_12px_rgba(5,150,105,0.25)] hover:shadow-[0_4px_20px_rgba(5,150,105,0.35)]",
          size === "default" && "h-11 px-5",
          size === "sm" && "h-9 px-3 text-xs",
          size === "lg" && "h-13 px-8 text-base font-semibold",
          size === "icon" && "h-11 w-11",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
