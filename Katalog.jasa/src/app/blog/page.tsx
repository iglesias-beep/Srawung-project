import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/breadcrumb";
import { ArticleCard } from "@/components/article-card";
import { getArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Blog Edukasi",
  description:
    "Tips memilih signage, panduan material, perbandingan produk, dan edukasi seputar custom signage & printing dari Katalog Jasa.",
};

export default async function BlogPage() {
  const articles = await getArticles();

  return (
    <>
      <section className="border-b border-line bg-bg-soft">
        <Container className="py-10 md:py-14">
          <Breadcrumb items={[{ label: "Blog" }]} />
          <h1 className="mt-6 font-serif text-3xl font-semibold leading-tight text-ink md:text-5xl">
            Blog Edukasi
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            Wawasan praktis untuk membantu Anda memilih produk signage yang
            tepat, memahami material, dan memaksimalkan investasi branding.
          </p>
        </Container>
      </section>

      <section className="bg-background">
        <Container className="py-12 md:py-16">
          {articles.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article, i) => (
                <div
                  key={article.meta.slug}
                  className={i === 0 ? "sm:col-span-2 lg:col-span-2" : undefined}
                >
                  <ArticleCard article={article.meta} featured={i === 0} />
                </div>
              ))}
            </div>
          ) : (
            <p className="py-16 text-center text-muted">Artikel segera hadir.</p>
          )}
        </Container>
      </section>
    </>
  );
}
