import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/breadcrumb";
import { ProductCard } from "@/components/product-card";
import { CategoryFilter } from "@/components/category-filter";
import { FadeIn } from "@/components/fade-in";
import { categories, getCategory } from "@/lib/categories";
import { getProductsByCategory } from "@/lib/products";

type Props = {
  params: Promise<{ kategori: string }>;
};

export function generateStaticParams() {
  return categories.map((category) => ({ kategori: category.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { kategori } = await params;
  const category = getCategory(kategori);
  if (!category) return {};
  return {
    title: `Kategori ${category.name}`,
    description: category.description,
  };
}

export default async function KategoriPage({ params }: Props) {
  const { kategori } = await params;
  const category = getCategory(kategori);
  if (!category) notFound();

  const Icon = category.icon;
  const items = getProductsByCategory(category.slug);

  return (
    <>
      <section className="border-b border-line bg-bg-soft">
        <Container className="py-10 md:py-14">
          <Breadcrumb
            items={[
              { label: "Katalog", href: "/katalog" },
              { label: category.name },
            ]}
          />
          <div className="mt-6 flex items-center gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-accent-light">
              <Icon className="h-6 w-6" aria-hidden />
            </span>
            <div>
              <h1 className="font-serif text-3xl font-semibold leading-tight text-ink md:text-5xl">
                {category.name}
              </h1>
              <p className="mt-1 text-sm text-faint">
                {items.length} produk · {category.short}
              </p>
            </div>
          </div>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
            {category.description}
          </p>
        </Container>
      </section>

      <section className="bg-background">
        <Container className="py-12 md:py-16">
          <div className="mb-8">
            <CategoryFilter active={category.slug} />
          </div>

          {items.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((product, i) => (
                <FadeIn key={product.slug} delay={(i % 3) * 0.06}>
                  <ProductCard product={product} />
                </FadeIn>
              ))}
            </div>
          ) : (
            <p className="py-16 text-center text-muted">
              Produk pada kategori ini segera hadir.{" "}
              <Link href="/katalog" className="text-accent underline underline-offset-4">
                Lihat semua produk
              </Link>
              .
            </p>
          )}
        </Container>
      </section>
    </>
  );
}
