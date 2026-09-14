"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Paintbrush, Star, ChevronRight, Clock, MessageSquare, Ruler, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { getCategories, getProducts } from "@/lib/firestore";
import { localCategories, localProducts } from "@/lib/local-data";
import { formatRupiah } from "@/lib/utils";
import { blogPosts } from "@/lib/blog-data";

const isFirebaseConfigured = typeof process !== "undefined" && process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== "your_api_key";

export default function HomePage() {
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    enabled: isFirebaseConfigured,
  });

  const { data: products = [] } = useQuery({
    queryKey: ["products-aktif"],
    queryFn: () => getProducts("aktif"),
    enabled: isFirebaseConfigured,
  });

  const displayCategories = categories.length > 0 ? categories : localCategories;
  const displayProducts = products.length > 0 ? products : localProducts;

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-bg-base">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 min-h-[80vh] items-center py-20">
            <div className="space-y-8">
              <Badge variant="brass" className="text-xs uppercase tracking-widest px-3 py-1">
                Custom Signage & Printing Premium
              </Badge>

              <h1 className="headline-embossed text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05]">
                Signage yang{" "}
                <span className="text-brass-shimmer">berkilau</span>{" "}
                untuk bisnis Anda
              </h1>

              <p className="text-lg text-text-muted max-w-lg leading-relaxed">
                Papan nama, neon box, huruf timbul, dan berbagai kebutuhan branding premium.
                Material logam & akrilik � presisi, solid, tahan cuaca.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/katalog">
                  <Button size="lg" variant="emerald" className="w-full sm:w-auto">
                    Lihat Katalog
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Hubungi Kami
                  </Button>
                </a>
              </div>
            </div>

            <div className="relative aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
              <img
                src="/images/hero-srawung.jpg"
                alt="Custom Signage Proyekjasa"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-base/20 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      {displayCategories.length > 0 && (
        <section className="py-20 md:py-28 bg-bg-surface border-y border-[#E5E7EB]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-accent-brass mb-2">
                  Produk Kami
                </p>
                <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)] text-text-primary tracking-tight">
                  Semua Kategori
                </h2>
              </div>
              <Link href="/katalog">
                <Button variant="outline" size="sm">
                  Semua Kategori
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {displayCategories.slice(0, 4).map((cat) => {
                const productCount = displayProducts.filter((p) => p.category_id === cat.id).length;
                return (
                  <Link key={cat.id} href={`/katalog/${cat.slug}`} className="group">
                    <div className="relative h-56 sm:h-64 rounded-xl border border-[#E5E7EB] bg-bg-elevated overflow-hidden card-hover">
                      {cat.gambar ? (
                        <Image
                          src={cat.gambar}
                          alt={cat.nama}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-5xl font-[family-name:var(--font-display)] font-bold text-accent-brass/10">
                          {cat.nama.charAt(0)}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-bg-base/80 via-bg-base/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <h3 className="text-lg font-bold font-[family-name:var(--font-display)] text-text-primary mb-0.5">
                          {cat.nama}
                        </h3>
                        <p className="text-xs text-text-muted">
                          {productCount} produk tersedia
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Proses Kerja � Step by Step */}
      <section className="py-20 md:py-28 bg-bg-base">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent-brass mb-2">
              Cara Kerja
            </p>
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)] text-text-primary tracking-tight">
              Dari Ide sampai Terpasang
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              {
                step: "01",
                icon: MessageSquare,
                title: "Konsultasi",
                desc: "Ceritakan kebutuhan signage Anda. Tim kami bantu tentukan material, ukuran, dan desain yang tepat.",
              },
              {
                step: "02",
                icon: Paintbrush,
                title: "Desain Gratis",
                desc: "Tim desainer buatkan konsep visual. Revisi tanpa batas sampai Anda benar-benar puas.",
              },
              {
                step: "03",
                icon: Ruler,
                title: "Produksi",
                desc: "Dikerjakan di workshop sendiri dengan mesin presisi. Quality control ketat sebelum dikirim.",
              },
              {
                step: "04",
                icon: CheckCircle,
                title: "Pemasangan",
                desc: "Teknisi berpengalaman pasang langsung di lokasi Anda. Garansi perbaikan included.",
              },
            ].map((item, idx) => (
              <div key={item.step} className="relative text-center">
                {/* Connector line (hidden on mobile, visible lg) */}
                {idx < 3 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(50%+40px)] right-[calc(-50%+40px)] h-px bg-[#E5E7EB]">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent-brass/40" />
                  </div>
                )}

                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent-brass/10 border border-accent-brass/20 mb-5">
                  <item.icon className="h-6 w-6 text-accent-brass" />
                  <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-accent-brass text-white text-[10px] font-bold">
                    {item.step}
                  </span>
                </div>

                <h3 className="font-semibold font-[family-name:var(--font-display)] text-text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed max-w-[240px] mx-auto">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Edukasi */}
      <section className="py-20 md:py-28 bg-bg-surface border-y border-[#E5E7EB]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-accent-brass mb-2">
                Blog Edukasi
              </p>
              <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)] text-text-primary tracking-tight">
                Pahami Produk Sebelum Memesan
              </h2>
            </div>
            <Link href="/blog">
              <Button variant="outline" size="sm">
                Kunjungi Blog
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {blogPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                <div className="rounded-xl border border-[#E5E7EB] bg-bg-base overflow-hidden card-hover">
                  {post.gambarCover && (
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <img
                        src={post.gambarCover}
                        alt={post.judul}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge variant="brass">{post.kategori}</Badge>
                      <span className="flex items-center gap-1 text-xs text-text-muted">
                        <Clock className="h-3 w-3" />
                        {post.waktuBaca} menit baca
                      </span>
                    </div>
                    <h3 className="font-bold font-[family-name:var(--font-display)] text-text-primary mb-3 line-clamp-2 group-hover:text-accent-brass transition-colors duration-300">
                      {post.judul}
                    </h3>
                    <p className="text-sm text-text-muted line-clamp-2 leading-relaxed">
                      {post.ringkasan}
                    </p>
                    <div className="mt-4 text-sm font-medium text-accent-emerald flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                      Baca selengkapnya <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-28 bg-bg-base">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent-brass mb-2">
              Testimoni
            </p>
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)] text-text-primary tracking-tight">
              Kata Mereka Tentang Kami
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                initial: "B",
                name: "Budi Santoso",
                company: "Toko Kelontong, Surabaya",
                text: "Papan nama toko saya jadi jauh lebih rapi dan elegan. Prosesnya cepat, timnya sabar revisi desain sampai pas. Garansi perbaikannya juga bikin tenang.",
              },
              {
                initial: "R",
                name: "Rina Kusuma",
                company: "Coffee Shop, Jakarta",
                text: "Neon box dua sisi untuk kafe kami sangat membantu penjualan di malam hari. Pemasangan rapi, dan support-nya cepat saat kami ada pertanyaan.",
              },
              {
                initial: "A",
                name: "Andi Pratama",
                company: "Manager Logistik, Perusahaan Distribusi",
                text: "Sticker branding armada kami dikerjakan dengan presisi, tidak ada gelembung sama sekali. Warna masih tajam sampai sekarang. Recommended!",
              },
            ].map((t) => (
              <div
                key={t.name}
                className="rounded-xl border border-[#E5E7EB] bg-bg-surface p-6 card-hover flex flex-col"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-accent-brass text-accent-brass" />
                  ))}
                </div>
                <p className="text-sm text-text-muted mb-6 leading-relaxed flex-1">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="border-t border-[#E5E7EB] pt-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-brass/10 text-accent-brass font-bold text-sm font-[family-name:var(--font-display)]">
                    {t.initial}
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary text-sm font-[family-name:var(--font-display)]">
                      {t.name}
                    </p>
                    <p className="text-xs text-text-muted">{t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Logos � Marquee */}
      <section className="py-16 md:py-20 bg-bg-surface border-y border-[#E5E7EB] overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent-brass mb-10 text-center">
            Dipercaya BUMN & Brand Ternama
          </p>
        </div>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-bg-surface to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-bg-surface to-transparent z-10" />
          <div className="flex animate-marquee w-max">
            {[
              { name: "Pertamina", src: "/images/clients/pertamina.jpg" },
              { name: "PLN", src: "/images/clients/pln.webp" },
              { name: "Telkomsel", src: "/images/clients/telkomsel.jpg" },
              { name: "PGN", src: "/images/clients/pgn.jpg" },
              { name: "Fonterra", src: "/images/clients/fonterra.png" },
              { name: "Volcom", src: "/images/clients/volcom.jpg" },
              { name: "Billabong", src: "/images/clients/billabong.png" },
              { name: "Quiksilver", src: "/images/clients/quiksilver.jpg" },
              { name: "Motasa", src: "/images/clients/motasa.png" },
              { name: "Harfam Makmur", src: "/images/clients/harfam-makmur.png" },
            ].concat([
              { name: "Pertamina", src: "/images/clients/pertamina.jpg" },
              { name: "PLN", src: "/images/clients/pln.webp" },
              { name: "Telkomsel", src: "/images/clients/telkomsel.jpg" },
              { name: "PGN", src: "/images/clients/pgn.jpg" },
              { name: "Fonterra", src: "/images/clients/fonterra.png" },
              { name: "Volcom", src: "/images/clients/volcom.jpg" },
              { name: "Billabong", src: "/images/clients/billabong.png" },
              { name: "Quiksilver", src: "/images/clients/quiksilver.jpg" },
              { name: "Motasa", src: "/images/clients/motasa.png" },
              { name: "Harfam Makmur", src: "/images/clients/harfam-makmur.png" },
            ]).map((client, idx) => (
              <img
                key={idx}
                src={client.src}
                alt={client.name}
                className="h-8 md:h-10 w-auto object-contain opacity-70 hover:opacity-100 transition-all duration-300 mx-8 md:mx-12 shrink-0"
              />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
