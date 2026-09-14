import Link from "next/link";
import { LayoutGrid } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export function StickyMobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-accent/30 bg-primary/95 p-3 backdrop-blur-md lg:hidden">
      <Link
        href="/katalog"
        className={buttonVariants({ variant: "accent", size: "lg", className: "w-full" })}
      >
        <LayoutGrid className="h-4 w-4" aria-hidden />
        Lihat Katalog
      </Link>
    </div>
  );
}
