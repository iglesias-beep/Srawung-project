import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { ArticleMeta } from "@/lib/articles";
import { formatDate } from "@/lib/articles";
import { Badge } from "@/components/ui/badge";

export function ArticleCard({
  article,
  featured = false,
}: {
  article: ArticleMeta;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/blog/${article.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[16px] border border-line bg-background shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-card-hover"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface">
        <Image
          src={article.image}
          alt={article.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <Badge className="absolute left-4 top-4 bg-background/90 backdrop-blur-sm">
          {article.category}
        </Badge>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3 text-xs text-faint">
          <time dateTime={article.date}>{formatDate(article.date)}</time>
          <span aria-hidden className="h-1 w-1 rounded-full bg-accent" />
          <span>{article.readingTime}</span>
        </div>
        <h3
          className={
            featured
              ? "mt-3 font-serif text-2xl font-semibold leading-snug text-ink transition-colors group-hover:text-accent md:text-3xl"
              : "mt-3 font-serif text-lg font-semibold leading-snug text-ink transition-colors group-hover:text-accent"
          }
        >
          {article.title}
        </h3>
        <p
          className={
            featured
              ? "mt-2 line-clamp-3 flex-1 text-base leading-relaxed text-muted md:text-lg"
              : "mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted"
          }
        >
          {article.description}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
          Baca selengkapnya
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </span>
      </div>
    </Link>
  );
}
