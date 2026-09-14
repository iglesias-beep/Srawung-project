"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCategories, getProducts } from "@/lib/firestore";
import { localCategories, localProducts } from "@/lib/local-data";
import { ProductCard } from "@/components/shared/ProductCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const isFirebaseConfigured = typeof process !== "undefined" && process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== "your_api_key";

export default function KatalogPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("semua");

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    enabled: isFirebaseConfigured,
  });

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products-aktif"],
    queryFn: () => getProducts("aktif"),
    enabled: isFirebaseConfigured,
  });

  const displayCategories = categories.length > 0 ? categories : localCategories;
  const displayProducts = products.length > 0 ? products : localProducts;

  const filtered = displayProducts.filter((p) => {
    const matchCategory =
      selectedCategory === "semua" || p.category_id === selectedCategory;
    const matchSearch =
      !search ||
      p.nama.toLowerCase().includes(search.toLowerCase()) ||
      p.deskripsi_singkat.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="bg-bg-base min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent-brass mb-2">
            Semua Produk
          </p>
          <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)] text-text-primary tracking-tight">
            Katalog
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
            <Input
              placeholder="Cari produk..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            <button
              onClick={() => setSelectedCategory("semua")}
              className={`shrink-0 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 min-h-[44px] ${
                selectedCategory === "semua"
                  ? "bg-accent-brass/15 text-accent-brass border border-accent-brass/30"
                  : "bg-bg-surface text-text-muted border border-[#E5E7EB] hover:border-accent-brass/30 hover:text-text-primary"
              }`}
            >
              Semua
            </button>
            {displayCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`shrink-0 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 min-h-[44px] ${
                  selectedCategory === cat.id
                    ? "bg-accent-brass/15 text-accent-brass border border-accent-brass/30"
                    : "bg-bg-surface text-text-muted border border-[#E5E7EB] hover:border-accent-brass/30 hover:text-text-primary"
                }`}
              >
                {cat.nama}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="rounded-xl bg-bg-surface border border-[#E5E7EB] animate-pulse h-96"
              />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((product) => {
              const cat = displayCategories.find((c) => c.id === product.category_id);
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  categoryNama={cat?.nama}
                />
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-text-muted text-lg">
              Tidak ada produk yang ditemukan.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
