import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MessageCircle, ShieldCheck, ShoppingCart, Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { ProductGallery } from "@/components/product-gallery";
import { ProductCard } from "@/components/product-card";
import { ArticleCard } from "@/components/article-card";
import { GoldDivider } from "@/components/gold-divider";
import { getProduct, products } from "@/lib/products";
import { getCategory } from "@/lib/categories";
import { waLink, siteConfig } from "@/lib/site";
import { getArticle } from "@/lib/articles";
import { AddToCartButton } from "@/components/add-to-cart-button";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      type: "website",
      images: [
        {
          url: product.images[0],
          width: 1200,
          height: 900,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProdukPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const related = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 3);

  const relatedArticles = product.relatedArticles ?? [];
  const articles = (
    await Promise.all(relatedArticles.map((s) => getArticle(s)))
  ).filter((a) => a !== null);

  const orderMessage = [
    `Halo Katalog Jasa, saya tertarik dengan produk *${product.name}*.`,
    "",
    "Boleh minta info harga & pemesanannya?",
  ].join("\n");

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    image: product.images.map((img) => `${siteConfig.url}${img}`),
    category: category?.name,
    brand: {
      "@type": "Brand",
      name: siteConfig.legalName,
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "IDR",
      availability: "https://schema.org/InStock",
      description: product.priceInfo,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <section className="border-b border-accent/20 bg-bg-soft">
        <Container className="py-10 md:py-14">
          <Breadcrumb
            items={[
              { label: "Katalog", href: "/katalog" },
              category
                ? { label: category.name, href: `/katalog/${category.slug}` }
                : { label: "Produk" },
              { label: product.name },
            ]}
          />
        </Container>
      </section>

      <section className="bg-background">
        <Container className="grid gap-10 py-12 md:py-16 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          <ProductGallery images={product.images} name={product.name} />

          <div>
            <div className="flex flex-wrap items-center gap-3">
              {category ? <Badge variant="accent">{category.name}</Badge> : null}
              <span className="flex items-center gap-1.5 text-sm text-muted">
                <ShieldCheck className="h-4 w-4 text-success" aria-hidden />
                {product.warranty}
              </span>
            </div>
            <h1 className="mt-4 font-serif text-3xl font-semibold leading-tight text-ink md:text-4xl">
              {product.name}
            </h1>
            <p className="mt-3 text-lg font-medium text-accent">{product.priceInfo}</p>
            <p className="mt-4 leading-relaxed text-text-secondary">
              {product.shortDescription}
            </p>

            <GoldDivider className="my-8 w-full" />

            <h2 className="font-serif text-2xl font-semibold text-ink md:text-3xl">
              Deskripsi Produk
            </h2>
            <div className="mt-3 space-y-4">
              {product.fullDescription.split("\n\n").map((paragraph, i) => (
                <p key={i} className="leading-[1.8] text-text-secondary">
                  {paragraph}
                </p>
              ))}
            </div>

            {product.materials.length > 0 ? (
              <>
                <h2 className="mt-8 font-serif text-2xl font-semibold text-ink md:text-3xl">
                  Material
                </h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {product.materials.map((material) => (
                    <li
                      key={material}
                      className="rounded-full border border-accent/30 bg-accent/5 px-4 py-1.5 text-sm text-muted"
                    >
                      {material}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            <AddToCartButton
              slug={product.slug}
              name={product.name}
              price={parseInt(product.priceInfo.replace(/[^0-9]/g, "")) || 0}
              priceLabel={product.priceInfo}
              category={product.category}
              image={product.images[0]}
            />

            <a
              href={waLink(orderMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-base font-semibold text-white transition hover:bg-primary-soft"
            >
              <MessageCircle className="h-5 w-5" aria-hidden />
              Order via WhatsApp
            </a>

            <Link
              href="/kontak"
              className="mt-2 block text-center text-sm font-medium text-accent hover:underline"
            >
              Hubungi Kami untuk info lebih lanjut
            </Link>
          </div>
        </Container>
      </section>

      {product.specifications.length > 0 ? (
        <section className="border-y border-accent/20 bg-bg-soft">
          <Container className="py-14 md:py-20">
            <h2 className="font-serif text-2xl font-semibold text-ink md:text-3xl">
              Spesifikasi
            </h2>
            <dl className="mt-8 grid gap-px overflow-hidden rounded-[16px] border border-accent/20 bg-accent/20 sm:grid-cols-2">
              {product.specifications.map((spec) => (
                <div
                  key={spec.label}
                  className="flex flex-col gap-1 bg-bg-soft p-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                >
                  <dt className="text-sm font-medium text-faint">{spec.label}</dt>
                  <dd className="text-base font-medium text-ink sm:text-right">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Container>
        </section>
      ) : null}

      {related.length > 0 ? (
        <section className="bg-background">
          <Container className="py-16 md:py-24">
            <h2 className="font-serif text-2xl font-semibold text-ink md:text-3xl">
              Produk terkait
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {articles.length > 0 ? (
        <section className="border-t border-accent/20 bg-bg-soft">
          <Container className="py-16 md:py-24">
            <h2 className="font-serif text-2xl font-semibold text-ink md:text-3xl">
              Artikel terkait
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <ArticleCard key={article.meta.slug} article={article.meta} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <div className="hidden" aria-hidden>
        <Image
          src={product.images[0]}
          alt=""
          width={1200}
          height={900}
          sizes="1px"
          priority={false}
        />
      </div>
    </>
  );
}
