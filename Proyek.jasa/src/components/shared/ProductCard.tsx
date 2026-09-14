"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatRupiah } from "@/lib/utils";
import { useCartStore } from "@/hooks/use-cart";
import type { Product } from "@/types/product";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  categoryNama?: string;
}

export function ProductCard({ product, categoryNama }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const [showToast, setShowToast] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      product_id: product.id,
      nama: product.nama,
      harga: product.harga,
      jumlah: 1,
      gambar: product.gambar[0] || "/placeholder.png",
      catatan_custom: "",
      satuan: product.satuan,
    });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <Link href={`/produk/${product.slug}`}>
      <div className="group relative rounded-xl border border-[#E5E7EB] bg-bg-surface overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.2)] card-hover">
        {showToast && (
          <div className="absolute top-3 right-3 z-10 bg-accent-emerald text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-[0_2px_12px_rgba(5,150,105,0.3)]">
            Ditambahkan!
          </div>
        )}

        <div className="relative aspect-[4/3] bg-bg-elevated overflow-hidden">
          {product.gambar[0] ? (
            <Image
              src={product.gambar[0]}
              alt={product.nama}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-text-muted/40 text-sm">
              Tidak ada gambar
            </div>
          )}
          <Badge className="absolute top-3 left-3" variant="brass">
            {categoryNama || "Produk"}
          </Badge>
        </div>

        <div className="p-4 space-y-3">
          <h3 className="font-semibold text-text-primary line-clamp-2 group-hover:text-accent-brass transition-colors duration-300 font-[family-name:var(--font-display)]">
            {product.nama}
          </h3>

          <p className="text-sm text-text-muted line-clamp-2 leading-relaxed">
            {product.deskripsi_singkat}
          </p>

          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold text-text-primary tabular-nums">
              {formatRupiah(product.harga)}
            </span>
            <span className="text-xs text-text-muted">/ {product.satuan}</span>
          </div>

          <div className="flex gap-2 pt-1">
            <Button
              size="sm"
              variant="emerald"
              className="flex-1"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4" />
              Tambah
            </Button>
            <Button size="sm" variant="outline" className="px-3">
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
