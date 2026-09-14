import Link from "next/link"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatRupiah } from "@/lib/utils"
import type { Product } from "@/types"

interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-[var(--border-color)] bg-[var(--surface)] card-brass-hover">
      <Link href={`/produk/${product.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-[var(--elevated)]">
          <Image
            src={product.gambar?.[0] || "/placeholder.svg"}
            alt={product.nama}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {product.kategori_nama && (
            <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-[var(--surface)]/90 px-2.5 py-1 text-xs font-medium text-[var(--emerald)] backdrop-blur-sm border border-[var(--emerald)]/20">
              {product.kategori_nama}
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <Link href={`/produk/${product.slug}`}>
          <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-[var(--foreground)] leading-snug mb-1 line-clamp-2 hover:text-[var(--emerald)] transition-colors">
            {product.nama}
          </h3>
        </Link>
        <p className="text-sm text-[var(--muted-fg)] leading-relaxed line-clamp-2 mb-4">
          {product.deskripsi_singkat}
        </p>

        <div className="mt-auto flex items-end justify-between gap-3">
          <div>
            <span className="block font-[family-name:var(--font-display)] text-xl font-bold text-[var(--foreground)] tabular-nums">
              {formatRupiah(product.harga)}
            </span>
            <span className="text-xs text-[var(--muted-fg)]">/ {product.satuan}</span>
          </div>
          <Button
            size="sm"
            className="bg-[var(--emerald)] text-white hover:bg-[var(--emerald)]/90 shrink-0 gap-1.5"
            onClick={(e) => {
              e.preventDefault()
              onAddToCart?.(product)
            }}
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Keranjang</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
