import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/hero";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/section-heading";
import { CategoryCard } from "@/components/category-card";
import { ArticleCard } from "@/components/article-card";
import { WhyUs } from "@/components/why-us";
import { Testimonials } from "@/components/testimonials";
import { ClientKami } from "@/components/client-kami";
import { FadeIn } from "@/components/fade-in";
import { buttonVariants } from "@/components/ui/button";
import { categories } from "@/lib/categories";
import { getArticles } from "@/lib/articles";

export default async function HomePage() {
  const articles = (await getArticles()).slice(0, 3);

  return (
    <>
      <Hero />

      <section className="bg-background">
        <Container className="py-16 md:py-24">
          <SectionHeading
            eyebrow="Kategori Produk"
            title="Semua kebutuhan signage & printing Anda"
            description="Dari papan nama toko hingga totem besar di jalan raya — satu tempat untuk semua kebutuhan branding fisik Anda."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category, i) => (
              <FadeIn key={category.slug} delay={(i % 4) * 0.06}>
                <CategoryCard category={category} />
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <WhyUs />

      <section className="border-y border-accent/20 bg-bg-soft">
        <Container className="py-16 md:py-24">
          <SectionHeading
            eyebrow="Blog Edukasi"
            title="Pahami produk sebelum memesan"
            description="Tips memilih material, perbandingan produk, dan panduan supaya investasi signage Anda benar-benar efektif."
          />
          {articles.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article, i) => (
                <FadeIn key={article.meta.slug} delay={(i % 3) * 0.08}>
                  <ArticleCard article={article.meta} />
                </FadeIn>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted">Artikel segera hadir.</p>
          )}
          <div className="mt-12 flex justify-center">
            <Link
              href="/blog"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              Kunjungi Blog
              <ArrowRight className="h-5 w-5" aria-hidden />
            </Link>
          </div>
        </Container>
      </section>

      <section className="bg-background">
        <Container className="py-16 md:py-24">
          <SectionHeading
            eyebrow="Testimoni"
            title="Apa kata pelanggan kami"
            description="Ratusan bisnis sudah mempercayakan identitas visualnya kepada kami."
          />
          <Testimonials />
        </Container>
      </section>

      <ClientKami />
    </>
  );
}
