import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { blogPosts } from "@/lib/blog-data";

export const metadata = {
  title: "Blog",
  description: "Tips memilih material, perbandingan produk, dan panduan supaya investasi signage Anda efektif.",
};

export default function BlogPage() {
  return (
    <div>
      <section className="py-20 md:py-28 bg-bg-base">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent-brass mb-3">Blog Edukasi</p>
          <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-display)] text-text-primary tracking-tight mb-4">
            Tips & Panduan Signage
          </h1>
          <p className="text-lg text-text-muted max-w-2xl leading-relaxed mb-14">
            Tips memilih material, perbandingan produk, dan panduan supaya investasi signage Anda benar-benar efektif.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                <div className="rounded-xl border border-[#E5E7EB] bg-bg-surface overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.2)] card-hover h-full flex flex-col">
                  {post.gambarCover && (
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <img
                        src={post.gambarCover}
                        alt={post.judul}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge variant="brass">{post.kategori}</Badge>
                      <span className="flex items-center gap-1 text-xs text-text-muted">
                        <Clock className="h-3 w-3" />
                        {post.waktuBaca} menit baca
                      </span>
                    </div>
                    <h2 className="text-lg font-bold font-[family-name:var(--font-display)] text-text-primary mb-3 line-clamp-2 group-hover:text-accent-brass transition-colors duration-300">
                      {post.judul}
                    </h2>
                    <p className="text-sm text-text-muted line-clamp-3 leading-relaxed flex-1">
                      {post.ringkasan}
                    </p>
                    <div className="mt-6 flex items-center justify-between text-sm">
                      <span className="text-text-muted text-xs">{post.tanggal}</span>
                      <span className="font-medium text-accent-emerald flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                        Baca selengkapnya <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
