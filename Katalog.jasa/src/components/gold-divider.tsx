import { cn } from "@/lib/utils";

export function GoldDivider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("h-px w-16 bg-gradient-to-r from-transparent via-accent to-transparent", className)}
    />
  );
}
