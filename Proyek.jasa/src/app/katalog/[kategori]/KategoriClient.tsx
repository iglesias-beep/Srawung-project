"use client";

import { useState, use } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCategoryBySlug, getProductsByCategory } from "@/lib/firestore";
import { getLocalCategoryBySlug, getLocalProducts } from "@/lib/local-data";
import { ProductCard } from "@/components/shared/ProductCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const isFirebaseConfigured = typeof process !== "undefined" && process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== "your_api_key";

export default function KategoriClient({ kategori }: { kategori: string }) {
  const [search, setSearch] = useState("");

  const { data: category, isLoading: isLoadingCategory } = useQuery({
    queryKey: ["category", kategori],
    queryFn: () => getCategoryBySlug(kategori),
    enabled: isFirebaseConfigured,
  });

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products-kategori", kategori],
    queryFn: () => getProductsByCategory(kategori),
    enabled: isFirebaseConfigured,
  });

  const displayCategory = category || getLocalCategoryBySlug(kategori);
  const displayProducts = products.length > 0 ? products : getLocalProducts(kategori);

  const filtered = displayProducts.filter(
    (p) =>
      !search ||
      p.nama.toLowerCase().includes(search.toLowerCase()) ||
      p.deskripsi_singkat.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-bg-base min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent-brass mb-2">
            Kategori
          </p>
          <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)] text-text-primary tracking-tight">
            {isLoadingCategory
              ? "Memuat..."
              : displayCategory?.nama || "Kategori Tidak Ditemukan"}
          </h1>
          {displayCategory?.deskripsi && (
            <p className="text-text-muted mt-2 max-w-2xl">
              {displayCategory.deskripsi}
            </p>
          )}
        </div>

        <div className="relative max-w-md mb-10">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
          <Input
            placeholder="Cari produk..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-xl bg-bg-surface border border-[#E5E7EB] animate-pulse h-96" />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} categoryNama={displayCategory?.nama} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-text-muted text-lg">Tidak ada produk dalam kategori ini.</p>
          </div>
        )}
      </div>
    </div>
  );
}
