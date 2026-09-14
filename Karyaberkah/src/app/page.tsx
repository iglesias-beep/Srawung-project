"use client"

import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  Shield,
  Truck,
  Star,
  Quote,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/shared/product-card"
import { ArticleCard } from "@/components/shared/article-card"
import { useCartStore } from "@/hooks/use-cart"
import { products, articles } from "@/lib/seed-data"
import type { Product } from "@/types"

const featuredProducts = products.filter((p) =>
  ["papan-nama", "neon-box", "huruf-timbul", "totem-pylon"].includes(p.slug)
)

const publishedArticles = articles.filter((a) => a.status === "published").slice(0, 3)

const reasons = [
  {
    icon: Sparkles,
    title: "Desain Custom Sepenuhnya",
    desc: "Setiap produk dibuat sesuai keinginan Anda — dari bahan, ukuran, warna, hingga desain akhir.",
  },
  {
    icon: Shield,
    title: "Kualitas Premium",
    desc: "Material pilihan berstandar industri dengan mesin produksi presisi. Hasil rapi dan tahan lama.",
  },
  {
    icon: Truck,
    title: "Pengiriman & Pemasangan",
    desc: "Delivery ke seluruh Indonesia dengan pemasangan oleh tim berpengalaman.",
  },
]

const testimonials = [
  {
    name: "Budi Santoso",
    company: "Klinik Sehat Sentosa",
    text: "Papan nama dari Karyaberkah sangat memuaskan. Desainnya elegan, pemasangannya rapi, dan pasien jadi lebih mudah menemukan klinik kami.",
    rating: 5,
  },
  {
    name: "Dewi Lestari",
    company: "Warung Nusantara",
    text: "Neon box custom yang dipesan menyala terang dan tahan hujan. Order dari luar kota juga bisa, pengiriman aman. Sangat recommended!",
    rating: 5,
  },
  {
    name: "Ahmad Fauzi",
    company: "Showroom Mobil Megah",
    text: "Huruf timbul stainless steel untuk showroom kami terlihat sangat mewah. Klien kami sering memuji tampilan fasad gedung.",
    rating: 5,
  },
]

export default function HomePage() {
  const addItem = useCartStore((s) => s.addItem)

  const handleAddToCart = (product: Product) => {
    addItem({
      product_id: product.id || product.slug,
      nama: product.nama,
      harga: product.harga,
      jumlah: 1,
      gambar: product.gambar?.[0],
    })
  }

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-[var(--foreground)]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero.jpg"
            alt=""
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--foreground)]/95 via-[var(--foreground)]/80 to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.1]">
              Custom Signage
              <br />
              <span className="text-[var(--emerald)]">Premium</span> untuk
              <br />
              Bisnis Anda
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/70 max-w-lg">
              Papan nama, neon box, huruf timbul, dan segala kebutuhan branding
              visual — dibuat custom, diproduksi presisi, dan dipasang sempurna.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/katalog">
                <Button
                  size="lg"
                  className="bg-[var(--emerald)] text-white hover:bg-[var(--emerald)]/90 gap-2 px-8"
                >
                  Lihat Katalog
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/blog">
                <Button size="lg" variant="secondary" className="gap-2 px-8 bg-white/10 text-white hover:bg-white/20 border border-white/20">
                  Baca Blog
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRODUK UNGGULAN ===== */}
      <section className="bg-[var(--surface)] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl text-embossed">
                Produk Unggulan
              </h2>
              <p className="mt-3 text-[var(--muted-fg)]">
                Pilihan terlaris yang paling sering dipesan klien kami
              </p>
            </div>
            <Link href="/katalog" className="hidden sm:block">
              <Button variant="ghost" className="gap-1.5 text-[var(--emerald)] hover:text-[var(--emerald)]/80">
                Semua Produk
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.slug}
                product={{ ...product, id: product.slug } as Product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== KENAPA PILIH KAMI ===== */}
      <section className="bg-[var(--background)] py-16 sm:py-20 border-t border-[var(--border-color)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl text-embossed">
              Kenapa Pilih Kami?
            </h2>
            <p className="mt-3 text-[var(--muted-fg)]">
              Lebih dari sekadar signage — kami adalah partner branding Anda
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {reasons.map((reason) => (
              <div
                key={reason.title}
                className="flex flex-col rounded-xl border border-[var(--border-color)] bg-[var(--background)] p-8 text-center"
              >
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-[var(--emerald)]/10">
                  <reason.icon className="h-7 w-7 text-[var(--emerald)]" />
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--foreground)] mb-2">
                  {reason.title}
                </h3>
                <p className="text-sm text-[var(--muted-fg)] leading-relaxed">
                  {reason.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BLOG EDUKASI ===== */}
      {publishedArticles.length > 0 && (
        <section className="bg-[var(--surface)] py-16 sm:py-20 border-t border-[var(--border-color)]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl text-embossed">
                  Blog Edukasi
                </h2>
                <p className="mt-3 text-[var(--muted-fg)]">
                  Tips dan panduan sebelum pesan custom signage
                </p>
              </div>
              <Link href="/blog" className="hidden sm:block">
                <Button variant="ghost" className="gap-1.5 text-[var(--emerald)] hover:text-[var(--emerald)]/80">
                  Semua Artikel
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {publishedArticles.map((article) => (
                <ArticleCard
                  key={article.slug}
                  article={{ ...article, id: article.slug } as any}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== TESTIMONI ===== */}
      <section className="bg-[var(--background)] py-16 sm:py-20 border-t border-[var(--border-color)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl text-embossed">
              Apa Kata Klien Kami?
            </h2>
            <p className="mt-3 text-[var(--muted-fg)]">
              Kepuasan klien adalah tolok ukur keberhasilan kami
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="relative flex flex-col rounded-xl border border-[var(--border-color)] bg-[var(--surface)] p-6"
              >
                <Quote className="absolute top-4 right-4 h-8 w-8 text-[var(--emerald)]/10" />
                <div className="mb-3 flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-[var(--emerald)] text-[var(--emerald)]"
                    />
                  ))}
                </div>
                <p className="text-sm text-[var(--foreground)] leading-relaxed flex-1 mb-4">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div>
                  <p className="font-[family-name:var(--font-display)] text-sm font-bold text-[var(--foreground)]">
                    {t.name}
                  </p>
                  <p className="text-xs text-[var(--muted-fg)]">{t.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
