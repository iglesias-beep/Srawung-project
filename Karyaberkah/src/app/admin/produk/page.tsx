"use client"

import Link from "next/link"
import { Plus, Pencil, Trash2, ArrowLeft, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { products, categories } from "@/lib/seed-data"
import { formatRupiah } from "@/lib/utils"

export default function AdminProdukPage() {
  return (
    <div className="bg-[var(--background)]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--muted-fg)] hover:text-[var(--emerald)] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Dashboard
          </Link>
        </div>

        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[var(--foreground)]">
              Kelola Produk
            </h1>
            <p className="mt-2 text-[var(--muted-fg)]">
              {products.length} produk terdaftar
            </p>
          </div>
          <Button className="bg-[var(--emerald)] text-white hover:bg-[var(--emerald)]/90 gap-2">
            <Plus className="h-4 w-4" />
            Tambah Produk
          </Button>
        </div>

        <div className="overflow-hidden rounded-xl border border-[var(--border-color)] bg-[var(--surface)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--border-color)] bg-[var(--elevated)]">
                  <th className="px-4 py-3 font-medium text-[var(--foreground)]">
                    Produk
                  </th>
                  <th className="px-4 py-3 font-medium text-[var(--foreground)]">
                    Kategori
                  </th>
                  <th className="px-4 py-3 font-medium text-[var(--foreground)]">
                    Harga
                  </th>
                  <th className="px-4 py-3 font-medium text-[var(--foreground)]">
                    Status
                  </th>
                  <th className="px-4 py-3 font-medium text-[var(--foreground)] text-right">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.slug}
                    className="border-b border-[var(--border-color)] last:border-0"
                  >
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-[var(--foreground)]">
                          {product.nama}
                        </p>
                        <p className="text-xs text-[var(--muted-fg)] truncate max-w-[200px]">
                          {product.deskripsi_singkat}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[var(--muted-fg)]">
                      {product.kategori_nama}
                    </td>
                    <td className="px-4 py-3 font-medium text-[var(--foreground)] tabular-nums">
                      {formatRupiah(product.harga)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                          product.status === "aktif"
                            ? "bg-[var(--emerald)]/10 text-[var(--emerald)]"
                            : "bg-[var(--muted-fg)]/10 text-[var(--muted-fg)]"
                        }`}
                      >
                        {product.status === "aktif" ? (
                          <Eye className="h-3 w-3" />
                        ) : (
                          <EyeOff className="h-3 w-3" />
                        )}
                        {product.status === "aktif" ? "Aktif" : "Nonaktif"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-[#dc2626] hover:text-[#dc2626]"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
