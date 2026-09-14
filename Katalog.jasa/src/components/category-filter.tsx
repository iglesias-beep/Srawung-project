import Link from "next/link";
import { cn } from "@/lib/utils";
import { categories } from "@/lib/categories";

const chipBase =
  "inline-flex min-h-[44px] items-center rounded-full border px-5 text-sm font-medium transition-colors";

const chipActive = "border-primary bg-primary text-white";

const chipIdle =
  "border-line bg-background text-muted hover:border-primary hover:text-primary";

export function CategoryFilter({ active }: { active?: string }) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter kategori">
      <Link
        href="/katalog"
        aria-current={!active ? "page" : undefined}
        className={cn(chipBase, !active ? chipActive : chipIdle)}
      >
        Semua
      </Link>
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`/katalog/${category.slug}`}
          aria-current={category.slug === active ? "page" : undefined}
          className={cn(
            chipBase,
            category.slug === active ? chipActive : chipIdle
          )}
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
}
