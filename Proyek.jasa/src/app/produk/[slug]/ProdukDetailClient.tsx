"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getProductBySlug,
  getCategories,
  getProductsByCategory,
} from "@/lib/firestore";
import { getLocalProductBySlug, localCategories, getLocalProducts } from "@/lib/local-data";
import { useCartStore } from "@/hooks/use-cart";
import { formatRupiah } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Check, Minus, Plus, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const isFirebaseConfigured = typeof process !== "undefined" && process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== "your_api_key";

export default function ProdukDetailClient({ slug }: { slug: string }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", slug],
    queryFn: () => getProductBySlug(slug),
    enabled: isFirebaseConfigured,
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    enabled: isFirebaseConfigured,
  });

  const displayProduct = product || getLocalProductBySlug(slug);
  const displayCategories = categories.length > 0 ? categories : localCategories;
  const category = displayCategories.find((c) => c.id === displayProduct?.category_id);

  const { data: relatedProducts = [] } = useQuery({
    queryKey: ["related-products", category?.slug],
    queryFn: () => getProductsByCategory(category!.slug),
    enabled: !!category?.slug && isFirebaseConfigured,
  });

  const localRelated = category ? getLocalProducts(category.slug).filter((p) => p.id !== displayProduct?.id) : [];
  const filteredRelated = (relatedProducts.length > 0 ? relatedProducts : localRelated)
    .filter((p) => p.id !== displayProduct?.id)
    .slice(0, 4);

  if (isLoading) {
    return (
      <div className="bg-bg-base min-h-screen">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="animate-pulse space-y-6">
            <div className="h-4 bg-bg-surface rounded w-1/3" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="aspect-square bg-bg-surface rounded-xl" />
              <div className="space-y-4">
                <div className="h-6 bg-bg-surface rounded w-1/4" />
                <div className="h-8 bg-bg-surface rounded w-1/2" />
                <div className="h-5 bg-bg-surface rounded w-3/4" />
                <div className="h-12 bg-bg-surface rounded w-1/3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!displayProduct) {
    return (
      <div className="bg-bg-base min-h-screen">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-2xl font-bold font-[family-name:var(--font-display)] text-text-primary mb-4">
            Produk Tidak Ditemukan
          </h1>
          <Link href="/katalog">
            <Button variant="outline">Kembali ke Katalog</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem({
      product_id: displayProduct.id,
      nama: displayProduct.nama,
      harga: displayProduct.harga,
      jumlah: quantity,
      gambar: displayProduct.gambar[0] || "/placeholder.png",
      catatan_custom: "",
      satuan: displayProduct.satuan,
    });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className="bg-bg-base min-h-screen">
      {showToast && (
        <div className="fixed top-24 right-6 z-50 bg-accent-emerald text-white text-sm font-medium px-4 py-2.5 rounded-lg shadow-[0_4px_20px_rgba(5,150,105,0.3)] animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4" />
            Ditambahkan ke keranjang!
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        <nav className="flex items-center gap-1.5 text-sm text-text-muted mb-8">
          <Link href="/" className="hover:text-text-primary transition-colors">Beranda</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/katalog" className="hover:text-text-primary transition-colors">Katalog</Link>
          {category && (
            <>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link href={`/katalog/${category.slug}`} className="hover:text-text-primary transition-colors">{category.nama}</Link>
            </>
          )}
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-text-primary font-medium">{displayProduct.nama}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14">
          <div className="space-y-4">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-bg-elevated border border-[#E5E7EB]">
              {displayProduct.gambar[selectedImage] ? (
                <Image src={displayProduct.gambar[selectedImage]} alt={displayProduct.nama} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" priority />
              ) : (
                <div className="flex h-full items-center justify-center text-text-muted text-sm">Tidak ada gambar</div>
              )}
            </div>
            {displayProduct.gambar.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto pb-2">
                {displayProduct.gambar.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative h-18 w-18 shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === i
                        ? "border-accent-brass shadow-[0_0_12px_rgba(201,162,78,0.25)]"
                        : "border-[#E5E7EB] hover:border-[#9CA3AF]"
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" sizes="72px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <Badge variant="brass" className="mb-3">{category?.nama || "Produk"}</Badge>
              <h1 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-display)] text-text-primary tracking-tight">{displayProduct.nama}</h1>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-text-primary tabular-nums">{formatRupiah(displayProduct.harga)}</span>
              <span className="text-text-muted">/ {displayProduct.satuan}</span>
            </div>
            <p className="text-text-muted leading-relaxed">{displayProduct.deskripsi_singkat}</p>
            {displayProduct.deskripsi_lengkap && (
              <div className="border-t border-[#E5E7EB] pt-6">
                <h3 className="font-semibold font-[family-name:var(--font-display)] text-text-primary mb-3">Deskripsi Lengkap</h3>
                <div className="text-sm text-text-muted leading-relaxed whitespace-pre-line">{displayProduct.deskripsi_lengkap}</div>
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-text-primary mb-2 block">Jumlah</label>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus className="h-4 w-4" /></Button>
                <span className="w-12 text-center font-semibold text-lg text-text-primary tabular-nums">{quantity}</span>
                <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}><Plus className="h-4 w-4" /></Button>
              </div>
            </div>
            <div className="bg-bg-surface rounded-xl border border-[#E5E7EB] p-5">
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-muted">Subtotal</span>
                <span className="text-xl font-bold text-text-primary tabular-nums">{formatRupiah(displayProduct.harga * quantity)}</span>
              </div>
            </div>
            <div className="space-y-3">
              <Button size="lg" variant="emerald" className="w-full" onClick={handleAddToCart}>
                <ShoppingCart className="h-5 w-5" />Tambah ke Keranjang
              </Button>
              <Link href="/keranjang" className="block">
                <Button variant="outline" size="lg" className="w-full">Lihat Keranjang</Button>
              </Link>
            </div>
          </div>
        </div>

        {filteredRelated.length > 0 && (
          <section className="mt-16 md:mt-24 border-t border-[#E5E7EB] pt-12">
            <h2 className="text-xl font-bold font-[family-name:var(--font-display)] text-text-primary mb-8">Produk Sejenis</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredRelated.map((rp) => (
                <Link key={rp.id} href={`/produk/${rp.slug}`} className="group">
                  <div className="rounded-xl border border-[#E5E7EB] bg-bg-surface overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.2)] card-hover">
                    <div className="relative aspect-[4/3] bg-bg-elevated overflow-hidden">
                      {rp.gambar[0] ? (
                        <Image src={rp.gambar[0]} alt={rp.nama} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 50vw, 25vw" />
                      ) : (
                        <div className="flex h-full items-center justify-center text-text-muted/40 text-sm">Tidak ada gambar</div>
                      )}
                    </div>
                    <div className="p-4 space-y-2">
                      <h3 className="font-semibold text-sm text-text-primary line-clamp-2 group-hover:text-accent-brass transition-colors font-[family-name:var(--font-display)]">{rp.nama}</h3>
                      <span className="text-base font-bold text-text-primary tabular-nums">{formatRupiah(rp.harga)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
