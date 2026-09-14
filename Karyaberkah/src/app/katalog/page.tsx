"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, SlidersHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/shared/product-card"
import { useCartStore } from "@/hooks/use-cart"
import { products, categories } from "@/lib/seed-data"
import type { Product } from "@/types"

export default function KatalogPage() {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const addItem = useCartStore((s) => s.addItem)

  const filteredProducts = products.filter((p) => {
    const matchSearch =
      !search ||
      p.nama.toLowerCase().includes(search.toLowerCase()) ||
      p.deskripsi_singkat.toLowerCase().includes(search.toLowerCase())
    const matchCategory = !selectedCategory || p.kategori_id === selectedCategory
    return matchSearch && matchCategory && p.status === "aktif"
  })

  const handleAddToCart = (product: Product) => {
    addItem({
      product_id: product.slug,
      nama: product.nama,
      harga: product.harga,
      jumlah: 1,
      gambar: product.gambar?.[0],
    })
  }

  return (
    <div className="bg-[var(--background)]">
      {/* Header */}
      <div className="bg-[var(--surface)] border-b border-[var(--border-color)]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[var(--foreground)] text-embossed sm:text-4xl">
            Katalog Produk
          </h1>
          <p className="mt-2 text-[var(--muted-fg)]">
            Temukan solusi signage yang tepat untuk bisnis Anda
          </p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-fg)]" />
              <Input
                placeholder="Cari produk..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-[var(--background)] border-[var(--border-color)]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar Kategori */}
          <aside className="w-full shrink-0 lg:w-60">
            <h3 className="font-[family-name:var(--font-display)] text-sm font-bold text-[var(--foreground)] mb-3">
              Kategori
            </h3>
            <div className="flex flex-col gap-1">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                  !selectedCategory
                    ? "bg-[var(--emerald)]/10 text-[var(--emerald)]"
                    : "text-[var(--muted-fg)] hover:bg-[var(--elevated)] hover:text-[var(--foreground)]"
                }`}
              >
                Semua Produk
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                    selectedCategory === cat.slug
                      ? "bg-[var(--emerald)]/10 text-[var(--emerald)]"
                      : "text-[var(--muted-fg)] hover:bg-[var(--elevated)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {cat.nama}
                </button>
              ))}
            </div>
          </aside>

          {/* Grid Produk */}
          <div className="flex-1">
            <div className="mb-4 text-sm text-[var(--muted-fg)]">
              {filteredProducts.length} produk ditemukan
            </div>
            {filteredProducts.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.slug}
                    product={{ ...product, id: product.slug } as Product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <SlidersHorizontal className="h-12 w-12 text-[var(--muted-fg)]/30 mb-4" />
                <p className="text-[var(--muted-fg)] font-medium">
                  Tidak ada produk yang cocok
                </p>
                <p className="text-sm text-[var(--muted-fg)]/60 mt-1">
                  Coba ubah filter atau kata kunci pencarian
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
