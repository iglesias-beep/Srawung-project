"use client"

import Link from "next/link"
import { ArrowLeft, Package, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdminPesananPage() {
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

        <div className="mb-8">
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[var(--foreground)]">
            Kelola Pesanan
          </h1>
          <p className="mt-2 text-[var(--muted-fg)]">
            Lihat dan kelola pesanan masuk
          </p>
        </div>

        {/* Empty state */}
        <div className="flex flex-col items-center justify-center rounded-xl border border-[var(--border-color)] bg-[var(--surface)] py-20 text-center">
          <Clock className="h-12 w-12 text-[var(--muted-fg)]/20 mb-4" />
          <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--foreground)] mb-2">
            Belum Ada Pesanan
          </h2>
          <p className="text-sm text-[var(--muted-fg)] max-w-sm">
            Pesanan dari pelanggan akan muncul di sini setelah mereka melakukan
            checkout. Hubungkan Firebase untuk data real-time.
          </p>
        </div>
      </div>
    </div>
  )
}
