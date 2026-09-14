"use client"

import Link from "next/link"
import Image from "next/image"
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useCartStore } from "@/hooks/use-cart"
import { formatRupiah } from "@/lib/utils"

export default function KeranjangPage() {
  const { items, updateQuantity, removeItem, updateNote, clearCart, getTotal } =
    useCartStore()

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center bg-[var(--background)]">
        <ShoppingBag className="h-16 w-16 text-[var(--muted-fg)]/20 mb-4" />
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--foreground)] mb-2">
          Keranjang Kosong
        </h1>
        <p className="text-[var(--muted-fg)] mb-6">
          Belum ada produk yang ditambahkan ke keranjang
        </p>
        <Link href="/katalog">
          <Button className="bg-[var(--emerald)] text-white hover:bg-[var(--emerald)]/90 gap-2">
            Mulai Belanja
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-[var(--background)]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href="/katalog"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--muted-fg)] hover:text-[var(--emerald)] transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Lanjut Belanja
        </Link>

        <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[var(--foreground)] text-embossed mb-8">
          Keranjang Belanja
        </h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.product_id}
                className="flex gap-4 rounded-xl border border-[var(--border-color)] bg-[var(--surface)] p-4"
              >
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-[var(--elevated)]">
                  {item.gambar && (
                    <Image
                      src={item.gambar}
                      alt={item.nama}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  )}
                </div>

                <div className="flex flex-1 flex-col min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="font-[family-name:var(--font-display)] text-sm font-bold text-[var(--foreground)] truncate">
                        {item.nama}
                      </h3>
                      <p className="text-sm font-medium text-[var(--foreground)] tabular-nums">
                        {formatRupiah(item.harga)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.product_id)}
                      className="h-8 w-8 shrink-0 text-[var(--muted-fg)] hover:text-[#dc2626]"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="mt-2 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          updateQuantity(item.product_id, item.jumlah - 1)
                        }
                        className="h-7 w-7"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm font-bold tabular-nums">
                        {item.jumlah}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          updateQuantity(item.product_id, item.jumlah + 1)
                        }
                        className="h-7 w-7"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <span className="font-[family-name:var(--font-display)] text-sm font-bold text-[var(--foreground)] tabular-nums">
                      {formatRupiah(item.harga * item.jumlah)}
                    </span>
                  </div>

                  <div className="mt-2">
                    <Textarea
                      placeholder="Catatan custom..."
                      value={item.catatan_custom || ""}
                      onChange={(e) =>
                        updateNote(item.product_id, e.target.value)
                      }
                      rows={1}
                      className="text-xs bg-[var(--background)] border-[var(--border-color)] min-h-0 py-1.5"
                    />
                  </div>
                </div>
              </div>
            ))}

            <Button
              variant="ghost"
              size="sm"
              onClick={clearCart}
              className="text-[var(--muted-fg)] hover:text-[#dc2626]"
            >
              <Trash2 className="h-4 w-4 mr-1.5" />
              Hapus Semua
            </Button>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl border border-[var(--border-color)] bg-[var(--surface)] p-6">
              <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--foreground)] mb-4">
                Ringkasan Pesanan
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-[var(--muted-fg)]">
                  <span>Subtotal ({items.length} produk)</span>
                  <span className="tabular-nums">{formatRupiah(getTotal())}</span>
                </div>
                <div className="flex justify-between text-[var(--muted-fg)]">
                  <span>Pengiriman</span>
                  <span className="text-[var(--emerald)] font-medium">Dihitung saat checkout</span>
                </div>
                <hr className="border-[var(--border-color)]" />
                <div className="flex justify-between font-bold text-[var(--foreground)]">
                  <span>Estimasi Total</span>
                  <span className="font-[family-name:var(--font-display)] text-lg tabular-nums">
                    {formatRupiah(getTotal())}
                  </span>
                </div>
              </div>
              <Link href="/login?redirect=checkout">
                <Button
                  size="lg"
                  className="w-full mt-6 bg-[var(--emerald)] text-white hover:bg-[var(--emerald)]/90 h-12"
                >
                  Lanjut ke Checkout
                </Button>
              </Link>
              <p className="mt-3 text-center text-xs text-[var(--muted-fg)]">
                Login diperlukan untuk melanjutkan checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
