import * as React from "react";
import { cn } from "@/lib/utils";

function Badge({ className, variant = "default", ...props }: React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "secondary" | "brass" | "emerald" }) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium transition-colors",
        variant === "default" && "bg-bg-elevated text-text-muted border border-[#E5E7EB]",
        variant === "secondary" && "bg-bg-elevated/60 text-text-muted",
        variant === "brass" && "bg-accent-brass/10 text-accent-brass border border-accent-brass/20",
        variant === "emerald" && "bg-accent-emerald/10 text-accent-emerald border border-accent-emerald/15",
        className
      )}
      {...props}
    />
  );
}

export { Badge };
