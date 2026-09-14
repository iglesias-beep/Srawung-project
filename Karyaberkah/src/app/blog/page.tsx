"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ArticleCard } from "@/components/shared/article-card"
import { articles } from "@/lib/seed-data"

export default function BlogPage() {
  const [search, setSearch] = useState("")

  const publishedArticles = articles.filter((a) => {
    const matchSearch =
      !search ||
      a.judul.toLowerCase().includes(search.toLowerCase()) ||
      a.kategori.toLowerCase().includes(search.toLowerCase())
    return a.status === "published" && matchSearch
  })

  return (
    <div className="bg-[var(--background)]">
      <div className="bg-[var(--surface)] border-b border-[var(--border-color)]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[var(--foreground)] text-embossed sm:text-4xl">
            Blog Edukasi
          </h1>
          <p className="mt-2 text-[var(--muted-fg)]">
            Tips, panduan, dan perbandingan produk untuk membantu Anda memilih signage yang tepat
          </p>
          <div className="mt-6 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-fg)]" />
              <Input
                placeholder="Cari artikel..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-[var(--background)] border-[var(--border-color)]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {publishedArticles.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {publishedArticles.map((article) => (
              <ArticleCard
                key={article.slug}
                article={{ ...article, id: article.slug } as any}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center text-[var(--muted-fg)]">
            Belum ada artikel yang tersedia
          </div>
        )}
      </div>
    </div>
  )
}
