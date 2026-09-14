import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { blogPosts, getBlogPostBySlug, getRelatedPosts } from "@/lib/blog-data";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Artikel Tidak Ditemukan" };
  return { title: post.judul, description: post.ringkasan };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug);

  return (
    <div>
      <section className="py-20 md:py-28 bg-bg-base">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-text-primary transition-colors mb-8">
            <ChevronLeft className="h-4 w-4" />
            Kembali ke Blog
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <Badge variant="brass">{post.kategori}</Badge>
            <span className="text-xs text-text-muted">{post.tanggal}</span>
            <span className="flex items-center gap-1 text-xs text-text-muted">
              <Clock className="h-3 w-3" />
              {post.waktuBaca} menit baca
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)] text-text-primary tracking-tight mb-10 leading-tight">
            {post.judul}
          </h1>

          {post.gambarCover && (
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-10 border border-[#E5E7EB]">
              <img
                src={post.gambarCover}
                alt={post.judul}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none">
            <div
              className="text-text-primary leading-relaxed space-y-4
                [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:font-[family-name:var(--font-display)] [&_h2]:text-text-primary [&_h2]:mt-10 [&_h2]:mb-4
                [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:font-[family-name:var(--font-display)] [&_h3]:text-text-primary [&_h3]:mt-8 [&_h3]:mb-3
                [&_p]:text-text-muted [&_p]:leading-relaxed
                [&_ul]:space-y-2 [&_ul]:my-4
                [&_li]:text-text-muted
                [&_strong]:text-text-primary [&_strong]:font-semibold
                [&_table]:w-full [&_table]:my-6 [&_table]:border-collapse
                [&_th]:bg-bg-elevated [&_th]:text-left [&_th]:px-4 [&_th]:py-2 [&_th]:text-sm [&_th]:font-medium [&_th]:text-text-primary [&_th]:border [&_th]:border-[#E5E7EB]
                [&_td]:px-4 [&_td]:py-2 [&_td]:text-sm [&_td]:text-text-muted [&_td]:border [&_td]:border-[#E5E7EB]
                [&_hr]:my-8 [&_hr]:border-[#E5E7EB]
              "
              dangerouslySetInnerHTML={{ __html: post.konten.replace(/\n/g, "<br />").replace(/## /g, "").replace(/### /g, "").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/- (.*)/g, "<li>$1</li>").replace(/\|(.*)\|/g, (match) => { const cells = match.split("|").filter(c => c.trim()); return "<tr>" + cells.map(c => `<td>${c.trim()}</td>`).join("") + "</tr>"; }) }}
            />
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {related.length > 0 && (
        <section className="py-16 bg-bg-surface border-t border-[#E5E7EB]">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold font-[family-name:var(--font-display)] text-text-primary mb-6">Artikel Terkait</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {related.map((r) => (
                <Link key={r.id} href={`/blog/${r.slug}`} className="group">
                  <div className="rounded-xl border border-[#E5E7EB] bg-bg-base p-5 card-hover">
                    <Badge variant="brass" className="mb-3 text-[10px]">{r.kategori}</Badge>
                    <h3 className="font-semibold font-[family-name:var(--font-display)] text-text-primary text-sm line-clamp-2 group-hover:text-accent-brass transition-colors">
                      {r.judul}
                    </h3>
                    <div className="mt-3 text-xs text-accent-emerald flex items-center gap-1">
                      Baca <ArrowRight className="h-3 w-3" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
