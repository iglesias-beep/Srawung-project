import type { Metadata } from "next";
import { BadgeCheck, Clock, HeartHandshake, Megaphone, TrendingUp } from "lucide-react";
import { getCategories, getLocations, getProviderCount } from "@/lib/data";
import { MitraForm } from "@/components/mitra-form";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "Daftar Jadi Mitra",
  description:
    "Daftarkan usaha jasa Anda di KatalogJasa secara gratis. Raih pelanggan baru di sekitar Anda.",
};

const benefits = [
  {
    icon: Megaphone,
    title: "Eksposur ke Ratusan Pelanggan",
    desc: "Profil usaha Anda tampil di direktori dan bisa ditemukan calon pelanggan di lokasi Anda.",
  },
  {
    icon: TrendingUp,
    title: "Peluang Order Lebih Banyak",
    desc: "Dengan profil rapi dan rating baik, Anda akan lebih mudah dipilih pelanggan baru.",
  },
  {
    icon: Clock,
    title: "Pendaftaran Cepat & Gratis",
    desc: "Cukup 5 menit mengisi formulir. Tidak ada biaya pendaftaran atau komisi di awal.",
  },
  {
    icon: BadgeCheck,
    title: "Bisa Mendapat Badge Terverifikasi",
    desc: "Tim kami melakukan verifikasi untuk meningkatkan kepercayaan pelanggan pada usaha Anda.",
  },
];

export default async function DaftarMitraPage() {
  const [categories, locations, providerCount] = await Promise.all([
    getCategories(),
    getLocations(),
    getProviderCount(),
  ]);

  return (
    <div className="container-page py-12 sm:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold-pale px-4 py-1.5 text-xs font-bold text-gold-deep">
          <HeartHandshake className="size-3.5" />
          Gratis untuk semua penyedia jasa
        </span>
        <h1 className="mt-5 font-display text-4xl font-semibold text-ink sm:text-5xl">
          Gabung jadi <span className="text-gold">Mitra KatalogJasa</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-ink-2 sm:text-lg">
          Bergabunglah bersama {providerCount}+ penyedia jasa lainnya di
          Indonesia. Daftar sekarang, kelola profil Anda, dan raih pelanggan baru
          di sekitar Anda.
        </p>
      </div>

      <div className="mx-auto mt-10 grid max-w-6xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        {/* Keuntungan */}
        <aside className="rounded-3xl border border-sand/70 bg-white p-6 shadow-soft sm:p-8">
          <SectionHeading
            align="left"
            eyebrow="Keuntungan Bergabung"
            title="Kenapa menjadi Mitra?"
            className="mb-6"
          />
          <ul className="space-y-5">
            {benefits.map((b) => (
              <li key={b.title} className="flex gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gold-pale text-gold-deep">
                  <b.icon className="size-5" />
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold text-ink">
                    {b.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-2">
                    {b.desc}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-2xl bg-cream p-5">
            <p className="text-sm leading-relaxed text-ink-2">
              <strong className="text-ink">Perlu bantuan?</strong> Tim kami siap
              membantu proses pendaftaran Anda melalui{" "}
              <a
                href="https://wa.me/6281288888888"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-gold-deep underline decoration-gold/40 underline-offset-2"
              >
                WhatsApp
              </a>
              .
            </p>
          </div>
        </aside>

        {/* Form */}
        <MitraForm categories={categories} locations={locations} />
      </div>
    </div>
  );
}
