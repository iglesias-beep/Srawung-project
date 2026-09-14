"use client"

import Link from "next/link"
import {
  Package,
  ShoppingCart,
  FileText,
  Layers,
  TrendingUp,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { products, articles, categories } from "@/lib/seed-data"

const stats = [
  {
    label: "Total Produk",
    value: products.length,
    icon: Package,
    href: "/admin/produk",
    color: "text-[var(--brass)]",
    bg: "bg-[var(--brass)]/10",
  },
  {
    label: "Kategori",
    value: categories.length,
    icon: Layers,
    href: "/admin/kategori",
    color: "text-[var(--emerald)]",
    bg: "bg-[var(--emerald)]/10",
  },
  {
    label: "Artikel Blog",
    value: articles.length,
    icon: FileText,
    href: "/admin/blog",
    color: "text-[#6366f1]",
    bg: "bg-[#6366f1]/10",
  },
  {
    label: "Pesanan Baru",
    value: 0,
    icon: ShoppingCart,
    href: "/admin/pesanan",
    color: "text-[#dc2626]",
    bg: "bg-[#dc2626]/10",
  },
]

export default function AdminDashboard() {
  return (
    <div className="bg-[var(--background)]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[var(--foreground)]">
            Dashboard Admin
          </h1>
          <p className="mt-2 text-[var(--muted-fg)]">
            Kelola produk, kategori, blog, dan pesanan
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat) => (
            <Link key={stat.label} href={stat.href}>
              <div className="flex items-center gap-4 rounded-xl border border-[var(--border-color)] bg-[var(--surface)] p-5 transition-all hover:shadow-md hover:border-[var(--brass)]/30">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.bg}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--foreground)]">
                    {stat.value}
                  </p>
                  <p className="text-sm text-[var(--muted-fg)]">{stat.label}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/admin/produk">
            <div className="group flex items-center justify-between rounded-xl border border-[var(--border-color)] bg-[var(--surface)] p-6 transition-all hover:shadow-md hover:border-[var(--emerald)]/30">
              <div>
                <h3 className="font-[family-name:var(--font-display)] font-bold text-[var(--foreground)]">
                  Kelola Produk
                </h3>
                <p className="text-sm text-[var(--muted-fg)] mt-1">
                  Tambah, edit, hapus produk
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-[var(--muted-fg)] group-hover:text-[var(--emerald)] transition-colors" />
            </div>
          </Link>

          <Link href="/admin/kategori">
            <div className="group flex items-center justify-between rounded-xl border border-[var(--border-color)] bg-[var(--surface)] p-6 transition-all hover:shadow-md hover:border-[var(--emerald)]/30">
              <div>
                <h3 className="font-[family-name:var(--font-display)] font-bold text-[var(--foreground)]">
                  Kelola Kategori
                </h3>
                <p className="text-sm text-[var(--muted-fg)] mt-1">
                  Tambah, edit, urutkan kategori
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-[var(--muted-fg)] group-hover:text-[var(--emerald)] transition-colors" />
            </div>
          </Link>

          <Link href="/admin/blog">
            <div className="group flex items-center justify-between rounded-xl border border-[var(--border-color)] bg-[var(--surface)] p-6 transition-all hover:shadow-md hover:border-[var(--emerald)]/30">
              <div>
                <h3 className="font-[family-name:var(--font-display)] font-bold text-[var(--foreground)]">
                  Kelola Blog
                </h3>
                <p className="text-sm text-[var(--muted-fg)] mt-1">
                  Tulis, edit, hapus artikel
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-[var(--muted-fg)] group-hover:text-[var(--emerald)] transition-colors" />
            </div>
          </Link>

          <Link href="/admin/pesanan">
            <div className="group flex items-center justify-between rounded-xl border border-[var(--border-color)] bg-[var(--surface)] p-6 transition-all hover:shadow-md hover:border-[var(--emerald)]/30">
              <div>
                <h3 className="font-[family-name:var(--font-display)] font-bold text-[var(--foreground)]">
                  Kelola Pesanan
                </h3>
                <p className="text-sm text-[var(--muted-fg)] mt-1">
                  Lihat & ubah status pesanan
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-[var(--muted-fg)] group-hover:text-[var(--emerald)] transition-colors" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
