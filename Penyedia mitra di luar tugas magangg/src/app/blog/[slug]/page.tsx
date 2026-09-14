import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, Clock, PenLine } from "lucide-react";
import type { BlogPost } from "@prisma/client";
import { getBlogPostBySlug, getRecentBlogPosts } from "@/lib/data";
import { formatDate } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BlogCard } from "@/components/blog-card";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { prisma } = await import("@/lib/db");
  const posts = await prisma.blogPost.findMany({ select: { slug: true } });
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Artikel tidak ditemukan" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { images: [post.image] },
  };
}

function renderContent(content: string) {
  const blocks = content.split("\n\n").filter((b) => b.trim().length > 0);
  return blocks.map((block, i) => {
    if (block.startsWith("### ")) {
      return (
        <h3
          key={i}
          className="mt-8 mb-3 font-display text-xl font-semibold text-ink"
        >
          {block.slice(4)}
        </h3>
      );
    }
    if (block.startsWith("## ")) {
      return (
        <h2
          key={i}
          className="mt-10 mb-4 font-display text-2xl font-semibold text-ink"
        >
          {block.slice(3)}
        </h2>
      );
    }
    if (block.startsWith("- ")) {
      return (
        <ul key={i} className="my-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-ink-2">
          {block
            .split("\n")
            .filter((l) => l.trim().length > 0)
            .map((line, j) => (
              <li key={j}>{line.slice(2)}</li>
            ))}
        </ul>
      );
    }
    return (
      <p key={i} className="my-4 text-base leading-relaxed text-ink-2">
        {block}
      </p>
    );
  });
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const related = (await getRecentBlogPosts(3)).filter((p) => p.id !== post.id);

  return (
    <article className="container-page py-10 sm:py-14">
      <Link
        href="/blog"
        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-ink-2 transition-colors hover:text-gold-deep"
      >
        <ArrowLeft className="size-4" />
        Kembali ke Blog
      </Link>

      <header className="mx-auto max-w-3xl">
        <Badge variant="gold">{post.category}</Badge>
        <h1 className="mt-4 font-display text-3xl leading-tight font-semibold text-ink sm:text-4xl lg:text-[2.6rem]">
          {post.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-2">{post.excerpt}</p>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-sand/70 pt-5 text-sm text-ink-3">
          <span className="flex items-center gap-2">
            <PenLine className="size-4 text-gold" />
            {post.author}
          </span>
          <span className="flex items-center gap-2">
            <Calendar className="size-4 text-gold" />
            {formatDate(post.publishedAt)}
          </span>
          <span className="flex items-center gap-2">
            <Clock className="size-4 text-gold" />
            {post.readingTime} menit baca
          </span>
        </div>
      </header>

      <div className="relative mx-auto mt-8 aspect-[21/10] overflow-hidden rounded-3xl shadow-lift">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(min-width: 768px) 768px, 100vw"
          className="object-cover"
        />
      </div>

      <div className="mx-auto mt-10 max-w-3xl">{renderContent(post.content)}</div>

      <div className="mx-auto mt-10 flex max-w-3xl items-center justify-between gap-4 rounded-2xl bg-cream p-6">
        <div>
          <p className="font-display text-lg font-semibold text-ink">
            Butuh jasa profesional?
          </p>
          <p className="text-sm text-ink-2">
            Temukan penyedia jasa terverifikasi di sekitarmu.
          </p>
        </div>
        <Link href="/cari" className="shrink-0">
          <Button variant="primary">
            Cari Jasa
            <ArrowRight className="size-4" />
          </Button>
        </Link>
      </div>

      {related.length > 0 && (
        <section className="mt-16 border-t border-sand/70 pt-12">
          <h2 className="font-display text-2xl font-semibold text-ink">
            Artikel lainnya
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p: BlogPost) => (
              <BlogCard key={p.id} post={p} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
