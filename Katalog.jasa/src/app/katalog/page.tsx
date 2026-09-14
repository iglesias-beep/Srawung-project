import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/breadcrumb";
import { ProductCard } from "@/components/product-card";
import { CategoryFilter } from "@/components/category-filter";
import { FadeIn } from "@/components/fade-in";
import { products } from "@/lib/products";

export const metadata = {
  title: "Katalog Produk",
  description:
    "Jelajahi semua produk custom signage & printing: papan nama, neon box, rambu, huruf timbul, totem & pylon, sticker branding, dan event booth.",
};

export default function KatalogPage() {
  return (
    <>
      <section className="border-b border-line bg-bg-soft">
        <Container className="py-10 md:py-14">
          <Breadcrumb items={[{ label: "Katalog" }]} />
          <h1 className="mt-6 font-serif text-3xl font-semibold leading-tight text-ink md:text-5xl">
            Katalog Produk & Jasa
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            Semua kebutuhan custom signage & printing dalam satu tempat. Pilih
            kategori untuk mempersempit pencarian, atau lihat semua produk di
            bawah.
          </p>
        </Container>
      </section>

      <section className="bg-background">
        <Container className="py-12 md:py-16">
          <CategoryFilter />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, i) => (
              <FadeIn key={product.slug} delay={(i % 3) * 0.06}>
                <ProductCard product={product} />
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
