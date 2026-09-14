import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { GoldDivider } from "@/components/gold-divider";
import { ArticleCard } from "@/components/article-card";
import { buttonVariants } from "@/components/ui/button";
import { getArticle, getArticles, formatDate } from "@/lib/articles";
import { siteConfig } from "@/lib/site";
import { getProductsByCategory } from "@/lib/products";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({ slug: article.meta.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};
  return {
    title: article.meta.title,
    description: article.meta.description,
    keywords: article.meta.keywords,
    openGraph: {
      type: "article",
      title: article.meta.title,
      description: article.meta.description,
      publishedTime: article.meta.date,
      authors: ["Katalog Jasa"],
      images: [
        {
          url: article.meta.image,
          width: 1200,
          height: 750,
          alt: article.meta.title,
        },
      ],
    },
  };
}

export default async function ArtikelPage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const allArticles = await getArticles();
  const related = allArticles
    .filter(
      (a) => a.meta.slug !== slug && a.meta.category === article.meta.category
    )
    .slice(0, 3);
  const fallback = allArticles.filter((a) => a.meta.slug !== slug).slice(0, 3);
  const relatedArticles = related.length > 0 ? related : fallback;

  const productLinks = article.meta.productLinks ?? [];
  const linkedProducts = productLinks.flatMap(getProductsByCategory);

  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.meta.title,
    description: article.meta.description,
    image: [`${siteConfig.url}${article.meta.image}`],
    datePublished: article.meta.date,
    author: { "@type": "Organization", name: siteConfig.legalName },
    publisher: {
      "@type": "Organization",
      name: siteConfig.legalName,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blog/${slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
      />
      <article>
        <header className="border-b border-line bg-bg-soft">
          <Container className="max-w-3xl py-10 md:py-14">
            <Breadcrumb
              items={[{ label: "Blog", href: "/blog" }, { label: article.meta.title }]}
            />
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Badge variant="accent">{article.meta.category}</Badge>
              <span className="flex items-center gap-3 text-xs text-faint">
                <time dateTime={article.meta.date}>{formatDate(article.meta.date)}</time>
                <span aria-hidden className="h-1 w-1 rounded-full bg-accent" />
                <span>{article.meta.readingTime}</span>
              </span>
            </div>
            <h1 className="mt-5 font-serif text-3xl font-semibold leading-tight text-ink text-balance md:text-5xl">
              {article.meta.title}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
              {article.meta.description}
            </p>
          </Container>
        </header>

        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="relative -mt-8 aspect-[16/9] w-full overflow-hidden rounded-[16px] border border-line bg-surface shadow-card">
            <Image
              src={article.meta.image}
              alt={article.meta.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
        </div>

        <Container className="max-w-3xl py-12 md:py-16">
          <div className="prose-katalog prose prose-lg max-w-none">
            <article.Body />
          </div>

          <GoldDivider className="mt-12 w-full" />

          <div className="mt-10 rounded-[16px] border border-line bg-bg-soft p-8 text-center">
            <p className="font-serif text-xl font-semibold text-ink md:text-2xl">
              Butuh bantuan memilih produk yang tepat?
            </p>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted">
              Tim kami bantu pilihkan produk, ukuran, dan material yang sesuai
              budget Anda.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/kontak"
                className={buttonVariants({ variant: "accent", size: "lg" })}
              >
                Hubungi Kami
              </Link>
              <Link
                href="/katalog"
                className={buttonVariants({ variant: "outline", size: "lg" })}
              >
                Lihat Katalog
              </Link>
            </div>
          </div>

          {linkedProducts.length > 0 ? (
            <div className="mt-12">
              <h2 className="font-serif text-2xl font-semibold text-ink md:text-3xl">
                Produk yang dibahas di artikel ini
              </h2>
              <ul className="mt-5 flex flex-col gap-3">
                {linkedProducts.map((product) => {
                  const cat = product.category;
                  return (
                    <li key={product.slug}>
                      <Link
                        href={`/katalog/${cat}`}
                        className="group inline-flex items-center gap-2 text-base font-medium text-primary underline-offset-4 hover:text-accent hover:underline"
                      >
                        {product.name}
                        <span aria-hidden className="text-accent transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}
        </Container>
      </article>

      {relatedArticles.length > 0 ? (
        <section className="border-t border-line bg-bg-soft">
          <Container className="py-16 md:py-24">
            <h2 className="font-serif text-2xl font-semibold text-ink md:text-3xl">
              Artikel lainnya
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedArticles.map((a) => (
                <ArticleCard key={a.meta.slug} article={a.meta} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
