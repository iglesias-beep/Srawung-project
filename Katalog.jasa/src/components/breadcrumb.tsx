import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type Crumb = {
  label: string;
  href?: string;
};

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="overflow-x-auto whitespace-nowrap"
    >
      <ol className="flex items-center gap-1.5 text-sm text-faint">
        <li>
          <Link href="/" className="transition-colors hover:text-accent">
            Beranda
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <ChevronRight className="h-4 w-4 text-line" aria-hidden />
            {item.href ? (
              <Link
                href={item.href}
                className={cn(
                  "transition-colors hover:text-accent",
                  i === items.length - 1 && "text-muted"
                )}
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-muted">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
