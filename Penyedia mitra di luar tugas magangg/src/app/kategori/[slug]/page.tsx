import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, FolderOpen } from "lucide-react";
import { getCategoryBySlug, getLocations, getProvidersByCategory } from "@/lib/data";
import { ProviderCatalog } from "@/components/provider-catalog";
import { CategoryIcon } from "@/components/category-icon";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { prisma } = await import("@/lib/db");
  const categories = await prisma.category.findMany({
    select: { slug: true },
  });
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: "Kategori tidak ditemukan" };
  return {
    title: `${category.name} | Kategori Jasa`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const [category, providers, locations] = await Promise.all([
    getCategoryBySlug(slug),
    getProvidersByCategory(slug),
    getLocations(),
  ]);

  if (!category) notFound();

  return (
    <div className="container-page pb-16 pt-8 sm:pb-20 sm:pt-12">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-ink-2 transition-colors hover:text-gold-deep"
      >
        <ArrowLeft className="size-4" />
        Kembali ke Beranda
      </Link>

      <div className="mb-10 flex flex-col gap-4 rounded-3xl border border-sand/70 bg-white p-6 shadow-soft sm:p-8">
        <div className="flex items-center gap-4">
          <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-gold-pale text-gold-deep sm:size-16">
            <CategoryIcon name={category.icon} className="size-7 sm:size-8" />
          </span>
          <div>
            <p className="eyebrow mb-1">Kategori Jasa</p>
            <h1 className="font-display text-3xl leading-tight font-semibold text-ink sm:text-4xl">
              {category.name}
            </h1>
          </div>
        </div>
        <p className="max-w-2xl text-base leading-relaxed text-ink-2">
          {category.description}
        </p>
        <p className="flex items-center gap-2 text-sm font-semibold text-ink-3">
          <FolderOpen className="size-4 text-gold" />
          {providers.length} penyedia jasa tersedia
        </p>
      </div>

      <ProviderCatalog providers={providers} locations={locations} />
    </div>
  );
}
