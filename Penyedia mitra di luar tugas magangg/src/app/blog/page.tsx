import type { Metadata } from "next";
import Link from "next/link";
import { Newspaper, Tag } from "lucide-react";
import { getBlogPosts } from "@/lib/data";
import { BlogCard } from "@/components/blog-card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Blog & Artikel",
  description:
    "Tips memilih jasa, estimasi harga, panduan perawatan, dan cerita sukses mitra dari KatalogJasa.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  const categories = [...new Set(posts.map((p) => p.category))];

  return (
    <div className="container-page py-12 sm:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold-pale px-4 py-1.5 text-xs font-bold text-gold-deep">
          <Newspaper className="size-3.5" />
          KatalogJasa Blog
        </span>
        <h1 className="mt-5 font-display text-4xl font-semibold text-ink sm:text-5xl">
          Tips, panduan & cerita
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-ink-2 sm:text-lg">
          Kumpulan artikel untuk membantu Anda memilih penyedia jasa terbaik,
          memahami estimasi harga, dan merawat aset dengan benar.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
        {categories.map((c) => (
          <Badge key={c} variant="outline" className="px-3.5 py-1.5">
            <Tag className="size-3" />
            {c}
          </Badge>
        ))}
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      {posts.length === 0 && (
        <div className="mt-12 rounded-2xl border border-dashed border-sand bg-white/60 p-16 text-center">
          <p className="font-display text-lg font-semibold text-ink">
            Belum ada artikel
          </p>
          <p className="mt-1 text-sm text-ink-2">
            Artikel akan segera hadir.{" "}
            <Link href="/" className="font-bold text-gold-deep">
              Kembali ke beranda
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
