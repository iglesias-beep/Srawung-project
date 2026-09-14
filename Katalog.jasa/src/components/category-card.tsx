import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Category } from "@/lib/categories";
import { getProductsByCategory } from "@/lib/products";

export function CategoryCard({ category }: { category: Category }) {
  const Icon = category.icon;
  const productsInCategory = getProductsByCategory(category.slug);
  const count = productsInCategory.length;
  const image = productsInCategory[0]?.images[0];

  return (
    <Link
      href={`/katalog/${category.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[16px] border border-line bg-background shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-card-hover"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface">
        {image ? (
          <Image
            src={image}
            alt={category.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : null}
        <span className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/90 text-accent-light backdrop-blur-sm transition-colors group-hover:bg-accent group-hover:text-white shadow-lg">
          <Icon className="h-5 w-5" aria-hidden />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-serif text-lg font-semibold text-ink">{category.name}</h3>
          <span className="shrink-0 text-xs font-medium tracking-wide text-faint">
            {count} produk
          </span>
        </div>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{category.short}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
          Lihat produk
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
        </span>
      </div>
    </Link>
  );
}
