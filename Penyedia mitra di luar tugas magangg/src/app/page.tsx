import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
} from "lucide-react";
import { SearchBar } from "@/components/search-bar";
import { ServiceCard } from "@/components/service-card";
import { BlogCard } from "@/components/blog-card";
import { CategoryIcon } from "@/components/category-icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Stars } from "@/components/ui/stars";
import {
  getCategories,
  getFeaturedProviders,
  getLocations,
  getProviderCount,
  getRecentBlogPosts,
  getReviewCount,
} from "@/lib/data";

const quickChips = [
  "Cleaning Service",
  "Service AC",
  "Tukang Ledeng",
  "Desain Logo",
  "Dekorasi",
];

const values = [
  {
    icon: BadgeCheck,
    title: "Mitra Terverifikasi",
    desc: "Setiap penyedia jasa melewati verifikasi identitas dan dokumen usaha sebelum tampil.",
  },
  {
    icon: Star,
    title: "Rating & Ulasan Jujur",
    desc: "Bandingkan kualitas lewat rating dan ulasan nyata dari pelanggan sebelumnya.",
  },
  {
    icon: MessageCircle,
    title: "Kontak WhatsApp Langsung",
    desc: "Tanyakan detail harga dan jadwal tanpa ribet, langsung terhubung dengan penyedia.",
  },
  {
    icon: ShieldCheck,
    title: "Layanan yang Terjaga",
    desc: "Kami mendorong transparansi harga dan garansi hasil kerja untuk setiap layanan.",
  },
];

export default async function HomePage() {
  const [categories, featured, blogPosts, locations, providerCount, reviewCount] =
    await Promise.all([
      getCategories(),
      getFeaturedProviders(),
      getRecentBlogPosts(3),
      getLocations(),
      getProviderCount(),
      getReviewCount(),
    ]);

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-32 -right-32 size-[28rem] rounded-full bg-gold-3/60 blur-3xl" />
        <div className="pointer-events-none absolute top-40 -left-40 size-[24rem] rounded-full bg-moss/70 blur-3xl" />

        <div className="container-page section-pad grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold-pale px-4 py-1.5 text-xs font-bold text-gold-deep animate-fade-in">
              <Sparkles className="size-3.5" />
              Direktori Jasa Terpercaya untuk Indonesia
            </span>
            <h1 className="mt-5 font-display text-4xl leading-[1.1] font-semibold text-ink animate-fade-up sm:text-5xl lg:text-[3.4rem]">
              Cari{" "}
              <span className="relative text-gold">
                jasa terpercaya
                <svg
                  className="absolute -bottom-2 left-0 w-full text-gold-2"
                  viewBox="0 0 200 9"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M2 7C50 2 150 2 198 7"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{" "}
              di sekitarmu
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-2 animate-fade-up sm:text-lg">
              Bandingkan rating, harga, dan ulasan dari puluhan penyedia jasa
              terverifikasi — lalu hubungi langsung via WhatsApp. Semua
              kebutuhanmu, dari rumah sampai acara, ada di satu tempat.
            </p>

            <div className="mt-8 animate-fade-up">
              <SearchBar locations={locations} />
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2 animate-fade-up">
              <span className="text-xs font-semibold text-ink-3">Populer:</span>
              {quickChips.map((chip) => (
                <Link
                  key={chip}
                  href={`/cari?q=${encodeURIComponent(chip)}`}
                  className="rounded-full border border-sand bg-white px-3 py-1.5 text-xs font-semibold text-ink-2 transition-colors hover:border-gold hover:text-gold-deep"
                >
                  {chip}
                </Link>
              ))}
            </div>

            <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 animate-fade-up">
              {[
                { value: `${providerCount}+`, label: "Mitra Aktif" },
                { value: `${categories.length}`, label: "Kategori Jasa" },
                { value: `${Math.round(reviewCount / 100) / 10}rb+`, label: "Ulasan" },
              ].map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-display text-2xl font-semibold text-forest sm:text-3xl">
                    {s.value}
                  </dd>
                  <dd className="text-xs font-semibold text-ink-3">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative overflow-hidden rounded-3xl shadow-lift">
              <Image
                src="https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=1200&q=80"
                alt="Tim profesional membersihkan rumah"
                width={640}
                height={760}
                priority
                className="h-[30rem] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/25 to-transparent" />
            </div>

            <div className="absolute -left-8 top-10 w-44 rotate-[-4deg] overflow-hidden rounded-2xl border border-white/60 shadow-lift animate-float">
              <Image
                src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&q=80"
                alt="Interior rumah yang rapi"
                width={300}
                height={200}
                className="aspect-[3/2] w-full object-cover"
              />
            </div>

            <div className="absolute -right-6 bottom-12 w-44 rotate-[4deg] overflow-hidden rounded-2xl border border-white/60 shadow-lift animate-float-slow">
              <Image
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80"
                alt="Dekorasi acara yang elegan"
                width={300}
                height={200}
                className="aspect-[3/2] w-full object-cover"
              />
            </div>

            <div className="absolute bottom-6 left-6 flex items-center gap-3 rounded-2xl border border-white/60 bg-white/95 p-4 shadow-lift backdrop-blur">
              <span className="grid size-10 place-items-center rounded-xl bg-gold-pale text-gold-deep">
                <BadgeCheck className="size-5" />
              </span>
              <div>
                <p className="text-sm font-bold text-ink">Mitra Terverifikasi</p>
                <div className="flex items-center gap-1.5">
                  <Stars value={4.8} starClassName="size-3" />
                  <span className="text-xs text-ink-3">4.8/5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= KATEGORI POPULER ================= */}
      <section className="section-pad bg-white">
        <div className="container-page">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              align="left"
              eyebrow="Kategori Populer"
              title="Temukan jasa sesuai kebutuhanmu"
              description="Dari kebutuhan rumah tangga hingga event besar — semua penyedia jasa sudah dikelompokkan agar mudah dicari."
              className="mb-0"
            />
            <Link href="/cari" className="shrink-0 self-start sm:self-auto">
              <Button variant="outline">
                Lihat Semua Jasa
                <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/kategori/${c.slug}`}
                className="group rounded-2xl border border-sand/70 bg-cream p-5 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:bg-white hover:shadow-lift"
              >
                <span className="grid size-12 place-items-center rounded-xl bg-gold-pale text-gold-deep transition-all duration-300 group-hover:bg-gold group-hover:text-white group-hover:shadow-gold">
                  <CategoryIcon name={c.icon} className="size-5" />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold text-ink">
                  {c.name}
                </h3>
                <p className="mt-1 text-xs font-medium text-ink-3">
                  {c._count.providers}{" "}
                  {c._count.providers === 1 ? "penyedia jasa" : "penyedia jasa"}
                </p>
                <span className="mt-3 flex items-center gap-1 text-xs font-bold text-gold-deep opacity-0 transition-opacity group-hover:opacity-100">
                  Jelajahi
                  <ArrowRight className="size-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PENYEDIA UNGGULAN ================= */}
      <section className="section-pad">
        <div className="container-page">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              align="left"
              eyebrow="Penyedia Jasa Unggulan"
              title="Dengan rating tertinggi dari pelanggan"
              description="Mitra pilihan kami yang paling dipercaya — dinilai langsung dari pengalaman pelanggan asli."
              className="mb-0"
            />
            <Link href="/cari" className="shrink-0 self-start sm:self-auto">
              <Button variant="outline">
                <TrendingUp className="size-4" />
                Lihat Semua
              </Button>
            </Link>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <ServiceCard key={p.id} provider={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= KENAPA KAMI ================= */}
      <section className="section-pad bg-white">
        <div className="container-page">
          <SectionHeading
            eyebrow="Kenapa KatalogJasa?"
            title="Bekerja cerdas, bukan asal memilih jasa"
            description="Kami membantu kamu membandingkan penyedia jasa dengan informasi yang transparan."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-sand/70 bg-cream p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <span className="grid size-12 place-items-center rounded-xl bg-forest text-white shadow-soft">
                  <v.icon className="size-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA MITRA ================= */}
      <section className="section-pad">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-forest to-forest-deep px-6 py-14 text-center shadow-lift sm:px-12 lg:py-20">
            <div className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-gold-2/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 size-72 rounded-full bg-forest-2/40 blur-3xl" />
            <div className="relative mx-auto max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-gold-2/40 bg-gold-2/15 px-4 py-1.5 text-xs font-bold text-gold-2">
                <Sparkles className="size-3.5" />
                Untuk Para Penyedia Jasa
              </span>
              <h2 className="mt-5 font-display text-3xl font-semibold text-white sm:text-4xl">
                Siap berkembang bersama kami?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-cream/75 sm:text-lg">
                Daftarkan usaha jasamu di KatalogJasa dan raih pelanggan baru di
                sekitarmu. Gratis, mudah, dan langsung tampil untuk ribuan
                pengunjung.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href="/daftar-mitra">
                  <Button variant="gold" size="lg" className="w-full sm:w-auto">
                    <BadgeCheck className="size-5" />
                    Daftar Jadi Mitra
                  </Button>
                </Link>
                <Link href="/tentang">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full border-cream/25 bg-transparent text-white hover:bg-white/10 hover:text-white sm:w-auto"
                  >
                    Pelajari Cara Kerja
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= BLOG ================= */}
      <section className="section-pad bg-white">
        <div className="container-page">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              align="left"
              eyebrow="Dari Blog"
              title="Tips & panduan memilih jasa"
              description="Artikel terbaru untuk membantumu memilih penyedia jasa yang tepat."
              className="mb-0"
            />
            <Link href="/blog" className="shrink-0 self-start sm:self-auto">
              <Button variant="outline">
                Semua Artikel
                <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
