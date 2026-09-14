"use client";

import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/hooks/use-cart";
import { useAuth } from "@/hooks/use-auth";
import { formatRupiah } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft } from "lucide-react";

export default function KeranjangPage() {
  const { items, removeItem, updateQuantity, updateNote, clearCart, getTotal, getItemCount } = useCartStore();
  const { user } = useAuth();
  const total = getTotal();
  const itemCount = getItemCount();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-bg-elevated border border-[#E5E7EB]">
          <ShoppingBag className="h-10 w-10 text-accent-brass" />
        </div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-display)] text-text-primary mb-2">
          Keranjang Kosong
        </h1>
        <p className="text-text-muted mb-6">Belum ada produk yang ditambahkan</p>
        <Link href="/katalog">
          <Button variant="emerald">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Mulai Belanja
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <h1 className="text-3xl font-bold font-[family-name:var(--font-display)] text-text-primary mb-8 tracking-tight">
        Keranjang Belanja
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.product_id} className="flex gap-4 p-4 rounded-xl border border-[#E5E7EB] bg-bg-surface">
              <div className="relative h-20 w-20 shrink-0 rounded-lg overflow-hidden bg-bg-base">
                <Image src={item.gambar} alt={item.nama} fill className="object-cover" sizes="80px" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h3 className="font-semibold text-text-primary text-sm line-clamp-1">{item.nama}</h3>
                    <p className="text-xs text-accent-brass tabular-nums">{formatRupiah(item.harga)} / {item.satuan}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-text-muted hover:text-destructive hover:bg-destructive/10 shrink-0"
                    onClick={() => removeItem(item.product_id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center justify-between mt-3 gap-4">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.product_id, item.jumlah - 1)}>
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center text-sm font-medium text-text-primary tabular-nums">{item.jumlah}</span>
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.product_id, item.jumlah + 1)}>
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <span className="font-semibold text-text-primary text-sm tabular-nums">
                    {formatRupiah(item.harga * item.jumlah)}
                  </span>
                </div>

                <Textarea
                  placeholder="Catatan custom (ukuran, bahan, warna...)"
                  value={item.catatan_custom}
                  onChange={(e) => updateNote(item.product_id, e.target.value)}
                  className="mt-2 text-xs min-h-[36px]"
                  rows={1}
                />
              </div>
            </div>
          ))}

          <div className="flex justify-end">
            <Button variant="destructive" onClick={clearCart}>
              <Trash2 className="h-4 w-4 mr-1" />
              Hapus Semua
            </Button>
          </div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="rounded-xl border border-[#E5E7EB] bg-bg-surface p-6 sticky top-24 space-y-4">
            <h2 className="text-lg font-semibold font-[family-name:var(--font-display)] text-text-primary">
              Ringkasan
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-muted">Item ({itemCount})</span>
                <span className="text-text-primary tabular-nums">{formatRupiah(total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Pengiriman</span>
                <span className="text-text-muted">Dihitung saat checkout</span>
              </div>
              <div className="border-t border-[#E5E7EB] pt-2">
                <div className="flex justify-between font-semibold text-lg">
                  <span className="text-text-primary">Total</span>
                  <span className="text-accent-emerald tabular-nums">{formatRupiah(total)}</span>
                </div>
              </div>
            </div>

            {user ? (
              <Link href="/checkout" className="block">
                <Button variant="emerald" size="lg" className="w-full">Lanjut ke Checkout</Button>
              </Link>
            ) : (
              <Link href="/login?redirect=checkout" className="block">
                <Button variant="emerald" size="lg" className="w-full">Login untuk Checkout</Button>
              </Link>
            )}
            <Link href="/katalog" className="block">
              <Button variant="outline" className="w-full">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Lanjut Belanja
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
