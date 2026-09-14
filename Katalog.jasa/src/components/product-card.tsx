import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/lib/products";
import { getCategory } from "@/lib/categories";
import { Badge } from "@/components/ui/badge";

export function ProductCard({ product }: { product: Product }) {
  const category = getCategory(product.category);

  return (
    <Link
      href={`/produk/${product.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[16px] border border-line bg-background shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-card-hover"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {category ? (
          <Badge className="absolute left-4 top-4 bg-background/90 backdrop-blur-sm">
            {category.name}
          </Badge>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif text-lg font-semibold leading-snug text-ink">
          {product.name}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted">
          {product.shortDescription}
        </p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="text-sm font-medium text-accent">
            {product.priceInfo}
          </span>
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-primary transition-all group-hover:border-accent group-hover:bg-accent group-hover:text-white shadow-sm">
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </span>
        </div>
      </div>
    </Link>
  );
}
