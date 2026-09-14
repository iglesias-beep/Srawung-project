import Link from "next/link"
import Image from "next/image"
import { Clock } from "lucide-react"
import { formatDate } from "@/lib/utils"
import type { Article } from "@/types"

interface ArticleCardProps {
  article: Article
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link href={`/blog/${article.slug}`} className="group block">
      <div className="flex flex-col overflow-hidden rounded-xl border border-[var(--border-color)] bg-[var(--surface)] card-brass-hover">
        <div className="relative aspect-[16/9] overflow-hidden bg-[var(--elevated)]">
          <Image
            src={article.gambar_cover || "/placeholder.svg"}
            alt={article.judul}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="mb-2 flex items-center gap-3">
            <span className="inline-flex items-center rounded-full bg-[var(--emerald)]/10 px-2.5 py-0.5 text-xs font-medium text-[var(--emerald)]">
              {article.kategori}
            </span>
            <div className="flex items-center gap-1 text-xs text-[var(--muted-fg)]">
              <Clock className="h-3 w-3" />
              {article.waktu_baca} menit baca
            </div>
          </div>

          <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-[var(--foreground)] leading-snug mb-2 line-clamp-2 group-hover:text-[var(--emerald)] transition-colors">
            {article.judul}
          </h3>
          <p className="text-sm text-[var(--muted-fg)] leading-relaxed line-clamp-2 mb-3">
            {article.ringkasan}
          </p>

          <div className="mt-auto flex items-center justify-between">
            <span className="text-xs text-[var(--muted-fg)]">
              {formatDate(article.dipublikasikan_pada)}
            </span>
            <span className="text-sm font-medium text-[var(--emerald)] group-hover:underline">
              Baca selengkapnya
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
