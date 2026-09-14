import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";

export function Stars({
  value,
  className,
  starClassName,
}: {
  value: number;
  className?: string;
  starClassName?: string;
}) {
  const rounded = Math.round(value * 2) / 2;
  const full = Math.floor(rounded);
  const half = rounded - full >= 0.5;
  return (
    <div
      className={cn("flex items-center gap-0.5", className)}
      aria-label={`Rating ${value} dari 5`}
    >
      {Array.from({ length: 5 }).map((_, i) => {
        if (i < full) {
          return (
            <Star
              key={i}
              aria-hidden
              className={cn("size-4 fill-gold text-gold", starClassName)}
            />
          );
        }
        if (i === full && half) {
          return (
            <StarHalf
              key={i}
              aria-hidden
              className={cn("size-4 fill-gold text-gold", starClassName)}
            />
          );
        }
        return (
          <Star
            key={i}
            aria-hidden
            className={cn("size-4 fill-sand text-sand", starClassName)}
          />
        );
      })}
    </div>
  );
}
