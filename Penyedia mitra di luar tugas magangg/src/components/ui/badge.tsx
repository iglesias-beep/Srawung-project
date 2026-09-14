import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide",
  {
    variants: {
      variant: {
        gold: "bg-gold text-white shadow-gold",
        goldSoft:
          "bg-gold-pale text-gold-deep border border-gold-2/50",
        forest: "bg-forest text-white",
        moss: "bg-moss text-forest",
        blush: "bg-blush text-ink",
        outline: "border border-ink/15 bg-white text-ink-2",
        success: "bg-emerald-600 text-white",
      },
    },
    defaultVariants: {
      variant: "goldSoft",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
