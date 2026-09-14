import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  CheckCircle2,
  Clock,
  MapPin,
  MessageCircle,
  Phone,
  Quote,
  ShieldCheck,
} from "lucide-react";
import {
  getProviderBySlug,
  getSimilarProviders,
} from "@/lib/data";
import {
  formatDate,
  formatPriceLabel,
  formatRupiah,
  telLink,
  waLink,
} from "@/lib/format";
import { Stars } from "@/components/ui/stars";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { ServiceCard } from "@/components/service-card";
import { CategoryIcon } from "@/components/category-icon";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { prisma } = await import("@/lib/db");
  const providers = await prisma.provider.findMany({
    select: { slug: true },
  });
  return providers.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const provider = await getProviderBySlug(slug);
  if (!provider) return { title: "Penyedia Jasa tidak ditemukan" };
  return {
    title: `${provider.name} — ${provider.category.name} di ${provider.location}`,
    description: provider.tagline,
    openGraph: { images: [provider.coverImage] },
  };
}

export default async function ProviderDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const provider = await getProviderBySlug(slug);
  if (!provider) notFound();

  const similar = await getSimilarProviders(
    provider.categoryId,
    provider.id
  );

  const waMessage = `Halo ${provider.name}, saya menemukan jasa Anda di KatalogJasa.biz.id. Saya ingin bertanya tentang ${provider.category.name}.`;
  const wa = waLink(provider.whatsapp, waMessage);

  const serviceMin = provider.services.reduce(
    (min, s) => (s.price < min ? s.price : min),
    provider.priceFrom
  );
  const serviceMax = provider.services.reduce(
    (max, s) => (s.price > max ? s.price : max),
    provider.priceFrom
  );

  return (
    <>
      <div className="container-page pt-8 pb-16 sm:pt-10 sm:pb-24">
        <Link
          href="/cari"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-ink-2 transition-colors hover:text-gold-deep"
        >
          <ArrowLeft className="size-4" />
          Kembali ke Hasil Pencarian
        </Link>

        {/* ================= HEADER ================= */}
        <header className="relative overflow-hidden rounded-3xl border border-sand/70 shadow-lift">
          <div className="relative aspect-[21/8] min-h-56 bg-cream-2 sm:min-h-72">
            <Image
              src={provider.coverImage}
              alt={`Cover ${provider.name}`}
              fill
              sizes="100vw"
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-transparent" />
          </div>

          <div className="relative -mt-16 flex flex-col gap-6 px-5 pb-6 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:pb-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <span className="grid size-28 shrink-0 place-items-center overflow-hidden rounded-2xl border-4 border-white bg-white shadow-lift sm:size-32">
                <Image
                  src={provider.image}
                  alt={provider.name}
                  width={128}
                  height={128}
                  className="size-full object-cover"
                />
              </span>
              <div className="text-white">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="gold">{provider.category.name}</Badge>
                  {provider.verified && (
                    <Badge variant="success">
                      <BadgeCheck className="size-3.5" />
                      Terverifikasi
                    </Badge>
                  )}
                </div>
                <h1 className="mt-2 font-display text-3xl font-semibold text-white sm:text-4xl">
                  {provider.name}
                </h1>
                <p className="mt-1 text-sm text-white/70 sm:text-base">
                  {provider.businessName} · {provider.tagline}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 rounded-2xl border border-white/20 bg-white/10 p-4 text-white backdrop-blur">
              <div>
                <p className="flex items-center gap-1.5 text-2xl font-extrabold">
                  {provider.rating.toFixed(1)}
                  <Stars value={provider.rating} starClassName="size-4" />
                </p>
                <p className="text-xs text-white/70">
                  {provider.reviewsCount} ulasan pengguna
                </p>
              </div>
              <div className="hidden h-10 w-px bg-white/20 sm:block" />
              <div>
                <p className="flex items-center gap-1.5 text-sm font-bold">
                  <MapPin className="size-4 text-gold-2" />
                  {provider.location}
                </p>
                <p className="text-xs text-white/70">Area layanan & sekitarnya</p>
              </div>
            </div>
          </div>
        </header>

        {/* ================= STATS ================= */}
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            {
              icon: BriefcaseBusiness,
              label: "Tahun Pengalaman",
              value: `${provider.yearsExperience} tahun`,
            },
            {
              icon: CheckCircle2,
              label: "Pekerjaan Selesai",
              value: `${provider.completedJobs}+`,
            },
            {
              icon: Clock,
              label: "Waktu Respons",
              value: provider.responseTime,
            },
            {
              icon: ShieldCheck,
              label: "Status Mitra",
              value: provider.verified ? "Terverifikasi" : "Terdaftar",
            },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-sand/70 bg-white p-4 shadow-soft sm:p-5"
            >
              <s.icon className="size-5 text-gold" />
              <p className="mt-2 font-display text-lg font-semibold text-ink sm:text-xl">
                {s.value}
              </p>
              <p className="text-xs font-medium text-ink-3">{s.label}</p>
            </div>
          ))}
        </div>

        {/* ================= MAIN ================= */}
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_20rem]">
          <div className="min-w-0 space-y-12">
            {/* Tentang */}
            <section>
              <SectionHeading
                align="left"
                eyebrow="Tentang"
                title="Mengenal penyedia jasa ini"
                className="mb-5"
              />
              <div className="space-y-4 text-base leading-relaxed text-ink-2">
                {provider.description
                  .split("\n\n")
                  .filter(Boolean)
                  .map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
              </div>
            </section>

            {/* Layanan & Harga */}
            <section>
              <SectionHeading
                align="left"
                eyebrow="Layanan & Harga"
                title="Daftar layanan yang ditawarkan"
                className="mb-5"
              />
              <div className="space-y-3">
                {provider.services.map((svc) => (
                  <div
                    key={svc.id}
                    className="flex flex-col gap-2 rounded-2xl border border-sand/70 bg-white p-5 shadow-soft transition-colors hover:border-gold/40 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <h3 className="font-display text-base font-semibold text-ink">
                        {svc.name}
                      </h3>
                      <p className="mt-0.5 text-sm leading-relaxed text-ink-2">
                        {svc.description}
                      </p>
                    </div>
                    <p className="shrink-0 sm:text-right">
                      <span className="text-lg font-extrabold text-gold-deep">
                        {formatPriceLabel(svc.price)}
                      </span>
                      <span className="ml-1.5 text-xs font-medium text-ink-3">
                        / {svc.unit}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-ink-3">
                *Harga dapat berbeda tergantung kondisi lapangan. Hubungi penyedia
                jasa untuk penawaran yang lebih akurat.
              </p>
            </section>

            {/* Portofolio */}
            {provider.portfolios.length > 0 && (
              <section>
                <SectionHeading
                  align="left"
                  eyebrow="Portofolio"
                  title="Hasil kerja terbaru"
                  className="mb-5"
                />
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {provider.portfolios.map((pf) => (
                    <figure
                      key={pf.id}
                      className="group overflow-hidden rounded-2xl border border-sand/70 shadow-soft"
                    >
                      <div className="relative aspect-square overflow-hidden bg-cream-2">
                        <Image
                          src={pf.image}
                          alt={pf.caption}
                          fill
                          sizes="(max-width: 640px) 50vw, 25vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <figcaption className="p-3 text-xs font-medium text-ink-2">
                        {pf.caption}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </section>
            )}

            {/* Ulasan */}
            <section>
              <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                <SectionHeading
                  align="left"
                  eyebrow="Ulasan"
                  title={`${provider.reviewsCount} ulasan dari pelanggan`}
                  className="mb-0"
                />
                <div className="flex items-center gap-2 rounded-xl bg-gold-pale px-4 py-2">
                  <Stars value={provider.rating} starClassName="size-4" />
                  <span className="font-extrabold text-gold-deep">
                    {provider.rating.toFixed(1)} / 5
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {provider.reviews.map((r) => (
                  <article
                    key={r.id}
                    className="rounded-2xl border border-sand/70 bg-white p-5 shadow-soft"
                  >
                    <div className="flex items-center gap-3">
                      <Image
                        src={r.avatar}
                        alt={r.author}
                        width={40}
                        height={40}
                        className="size-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-display text-sm font-semibold text-ink">
                          {r.author}
                        </p>
                        <p className="text-xs text-ink-3">
                          {formatDate(r.createdAt)}
                        </p>
                      </div>
                      <div className="ml-auto">
                        <Stars
                          value={r.rating}
                          starClassName="size-3.5"
                        />
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-ink-2">
                      <Quote className="mr-1 inline size-3.5 -translate-y-0.5 text-gold-2" />
                      {r.comment}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          </div>

          {/* ================= SIDEBAR ================= */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="space-y-4 rounded-3xl border border-sand/70 bg-white p-6 shadow-lift">
              <div>
                <p className="text-xs font-semibold tracking-wide text-ink-3 uppercase">
                  Estimasi Biaya
                </p>
                <p className="mt-1 font-display text-2xl font-semibold text-ink">
                  {formatRupiah(serviceMin)}
                  {serviceMax > serviceMin && (
                    <span className="text-ink-3">
                      {" "}
                      – {formatRupiah(serviceMax)}
                    </span>
                  )}
                </p>
                <p className="text-xs text-ink-3">
                  Rentang harga dari {provider.services.length} layanan
                </p>
              </div>

              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 items-center justify-center gap-2 rounded-full bg-emerald-500 text-sm font-bold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:bg-emerald-600"
              >
                <MessageCircle className="size-5" />
                Chat WhatsApp Sekarang
              </a>
              <a
                href={telLink(provider.phone)}
                className="flex h-12 items-center justify-center gap-2 rounded-full border border-ink/15 text-sm font-bold text-ink transition-colors hover:border-gold hover:text-gold-deep"
              >
                <Phone className="size-5" />
                {provider.phone}
              </a>

              <ul className="space-y-3 border-t border-sand/70 pt-4 text-sm text-ink-2">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
                  <span>
                    <strong className="block font-semibold text-ink">Lokasi</strong>
                    {provider.location}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 size-4 shrink-0 text-gold" />
                  <span>
                    <strong className="block font-semibold text-ink">
                      Waktu Respons
                    </strong>
                    {provider.responseTime}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <BriefcaseBusiness className="mt-0.5 size-4 shrink-0 text-gold" />
                  <span>
                    <strong className="block font-semibold text-ink">
                      Pengalaman
                    </strong>
                    {provider.yearsExperience} tahun · {provider.completedJobs}+
                    pekerjaan
                  </span>
                </li>
              </ul>

              <p className="flex items-start gap-2 rounded-xl bg-gold-pale/60 p-3 text-xs leading-relaxed text-gold-deep">
                <ShieldCheck className="mt-0.5 size-4 shrink-0" />
                Transaksi dilakukan langsung antara Anda dan penyedia jasa.
                KatalogJasa tidak menerima pembayaran apa pun dari transaksi ini.
              </p>
            </div>
          </aside>
        </div>

        {/* ================= MITRA SERUPA ================= */}
        {similar.length > 0 && (
          <section className="mt-16">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading
                align="left"
                eyebrow="Jasa Serupa"
                title="Penyedia jasa lain yang mungkin kamu butuhkan"
                className="mb-0"
              />
              <Link href={`/kategori/${provider.category.slug}`} className="shrink-0">
                <Button variant="outline">
                  <CategoryIcon
                    name={provider.category.icon}
                    className="size-4"
                  />
                  Kategori {provider.category.name}
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((p) => (
                <ServiceCard key={p.id} provider={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* ================= MOBILE STICKY BAR ================= */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-sand/70 bg-white/95 px-4 py-3 shadow-lift backdrop-blur lg:hidden">
        <div className="flex items-center gap-3">
          <span className="min-w-0">
            <span className="block text-[10px] font-semibold text-ink-3 uppercase">
              Mulai dari
            </span>
            <span className="block truncate text-sm font-extrabold text-gold-deep">
              {formatPriceLabel(serviceMin)}
            </span>
          </span>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-emerald-500 text-sm font-bold text-white transition-colors hover:bg-emerald-600"
          >
            <MessageCircle className="size-5" />
            Chat WhatsApp
          </a>
        </div>
      </div>

      {/* spacer agar konten tidak tertutup sticky bar di mobile */}
      <div className="h-16 lg:hidden" />
    </>
  );
}
