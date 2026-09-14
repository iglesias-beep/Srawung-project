"use client"

import Link from "next/link"
import { Plus, Pencil, Trash2, ArrowLeft, GripVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { categories, products } from "@/lib/seed-data"

export default function AdminKategoriPage() {
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
              Kelola Kategori
            </h1>
            <p className="mt-2 text-[var(--muted-fg)]">
              {categories.length} kategori terdaftar
            </p>
          </div>
          <Button className="bg-[var(--emerald)] text-white hover:bg-[var(--emerald)]/90 gap-2">
            <Plus className="h-4 w-4" />
            Tambah Kategori
          </Button>
        </div>

        <div className="overflow-hidden rounded-xl border border-[var(--border-color)] bg-[var(--surface)]">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--border-color)] bg-[var(--elevated)]">
                <th className="px-4 py-3 font-medium text-[var(--foreground)] w-12">
                  #
                </th>
                <th className="px-4 py-3 font-medium text-[var(--foreground)]">
                  Nama Kategori
                </th>
                <th className="px-4 py-3 font-medium text-[var(--foreground)]">
                  Slug
                </th>
                <th className="px-4 py-3 font-medium text-[var(--foreground)]">
                  Jumlah Produk
                </th>
                <th className="px-4 py-3 font-medium text-[var(--foreground)] text-right">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat, index) => (
                <tr
                  key={cat.slug}
                  className="border-b border-[var(--border-color)] last:border-0"
                >
                  <td className="px-4 py-3 text-[var(--muted-fg)]">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 font-medium text-[var(--foreground)]">
                    {cat.nama}
                  </td>
                  <td className="px-4 py-3 text-[var(--muted-fg)] font-mono text-xs">
                    {cat.slug}
                  </td>
                  <td className="px-4 py-3 text-[var(--muted-fg)]">
                    {
                      products.filter(
                        (p) => p.kategori_id === cat.slug
                      ).length
                    }
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
  )
}
