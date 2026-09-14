import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import type { BlogPost } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/format";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-sand/70 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-cream-2">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <Badge variant="gold">{post.category}</Badge>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-3">
          <span className="flex items-center gap-1.5">
            <Calendar className="size-3.5" />
            {formatDate(post.publishedAt)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="size-3.5" />
            {post.readingTime} mnt baca
          </span>
        </div>
        <h3 className="font-display text-lg leading-snug font-semibold text-ink transition-colors group-hover:text-gold-deep">
          {post.title}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-ink-2">
          {post.excerpt}
        </p>
        <span className="mt-auto flex items-center gap-1.5 pt-1 text-sm font-bold text-gold-deep">
          Baca artikel
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}
