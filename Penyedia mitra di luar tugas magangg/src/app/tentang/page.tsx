import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  ChevronDown,
  Eye,
  Handshake,
  Heart,
  Lightbulb,
  MessageCircle,
  Search,
  ShieldCheck,
  Target,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Tentang & FAQ",
  description:
    "Mengenal KatalogJasa — direktori jasa terpercaya untuk Indonesia, beserta pertanyaan yang sering diajukan.",
};

const mission = [
  {
    icon: Search,
    title: "Kemudahan Mencari",
    desc: "Menghubungkan orang dengan penyedia jasa terbaik di sekitarnya tanpa harus bertanya sana-sini.",
  },
  {
    icon: BadgeCheck,
    title: "Transparansi & Kepercayaan",
    desc: "Rating dan ulasan jujur, harga terbuka, dan verifikasi identitas untuk menjaga kualitas layanan.",
  },
  {
    icon: Handshake,
    title: "Pemberdayaan UMKM",
    desc: "Memberi ruang tumbuh bagi penyedia jasa lokal agar bisa menjangkau lebih banyak pelanggan.",
  },
];

const values = [
  {
    icon: Heart,
    title: "Saling Percaya",
    desc: "Setiap interaksi dibangun di atas kepercayaan — antara pelanggan, mitra, dan platform.",
  },
  {
    icon: Target,
    title: "Berfokus pada Hasil",
    desc: "Kami mengukur keberhasilan dari pekerjaan selesai dengan baik dan pelanggan puas.",
  },
  {
    icon: Eye,
    title: "Transparan",
    desc: "Informasi harga, kualifikasi, dan ulasan disajikan apa adanya tanpa manipulasi.",
  },
  {
    icon: Lightbulb,
    title: "Terus Berinovasi",
    desc: "Kami terus menyempurnakan platform agar pengalaman mencari jasa semakin mudah.",
  },
];

const stats = [
  { value: "50+", label: "Kategori Jasa" },
  { value: "500+", label: "Mitra Terdaftar" },
  { value: "10rb+", label: "Ulasan Pengguna" },
  { value: "100%", label: "Fokus UMKM Lokal" },
];

const steps = [
  {
    icon: Search,
    title: "Cari jasa yang dibutuhkan",
    desc: "Gunakan pencarian dan filter kategori, lokasi, serta harga untuk menemukan pilihan terbaik.",
  },
  {
    icon: BadgeCheck,
    title: "Bandingkan rating & ulasan",
    desc: "Periksa profil, portofolio, dan ulasan pelanggan asli sebelum menentukan pilihan.",
  },
  {
    icon: MessageCircle,
    title: "Hubungi langsung via WhatsApp",
    desc: "Tanyakan detail harga dan jadwal langsung kepada penyedia jasa tanpa perantara.",
  },
  {
    icon: ShieldCheck,
    title: "Sepakat & dapatkan hasil terbaik",
    desc: "Buat kesepakatan yang jelas sebelum pekerjaan dimulai untuk hasil yang memuaskan.",
  },
];

const faqs = [
  {
    q: "Apa itu KatalogJasa?",
    a: "KatalogJasa adalah direktori dan platform pencarian penyedia jasa terpercaya di Indonesia. Kami membantu Anda menemukan, membandingkan, dan menghubungi penyedia jasa — mulai dari cleaning service, servis AC, tukang, hingga event organizer.",
  },
  {
    q: "Apakah KatalogJasa memungut biaya dari pelanggan?",
    a: "Tidak. Mencari dan menghubungi penyedia jasa di KatalogJasa 100% gratis untuk pelanggan. Transaksi layanan dilakukan langsung antara Anda dan penyedia jasa.",
  },
  {
    q: "Bagaimana cara bergabung sebagai penyedia jasa?",
    a: "Kunjungi halaman 'Daftar Jadi Mitra', isi formulir pendaftaran, dan tim kami akan melakukan verifikasi. Setelah disetujui, profil usaha Anda akan tampil dan dapat dihubungi pelanggan.",
  },
  {
    q: "Apakah semua penyedia jasa sudah terverifikasi?",
    a: "Mitra yang menampilkan badge 'Terverifikasi' telah melewati pemeriksaan identitas dan dokumen usaha oleh tim kami. Mitra tanpa badge tetap kami pantau melalui ulasan pelanggan.",
  },
  {
    q: "Apakah rating dan ulasan itu asli?",
    a: "Ya. Ulasan bersumber dari pengguna yang telah bekerja sama dengan penyedia jasa bersangkutan. Kami memiliki kebijakan anti-ulasan palsu dan memantau anomali secara berkala.",
  },
  {
    q: "Bagaimana jika saya mendapat layanan yang tidak sesuai?",
    a: "Kami menyarankan untuk berkomunikasi langsung dengan penyedia jasa terlebih dahulu. Jika tidak menemukan solusi, hubungi kami melalui email halo@katalogjasa.biz.id dan kami akan membantu menengahi.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-24 right-0 size-96 rounded-full bg-gold-3/50 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 -left-24 size-80 rounded-full bg-moss/60 blur-3xl" />

        <div className="container-page section-pad grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold-pale px-4 py-1.5 text-xs font-bold text-gold-deep">
              <Heart className="size-3.5" />
              Tentang Kami
            </span>
            <h1 className="mt-5 font-display text-4xl leading-[1.12] font-semibold text-ink sm:text-5xl">
              Membantu Indonesia{" "}
              <span className="text-gold">saling terhubung</span> lewat jasa
              terpercaya
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-2 sm:text-lg">
              KatalogJasa lahir dari satu kegelisahan sederhana: mencari tukang,
              cleaning service, atau vendor acara yang terpercaya sering kali sulit,
              berisiko, dan tidak transparan. Kami hadir untuk mengubah itu semua.
            </p>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-3xl shadow-lift">
              <Image
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80"
                alt="Tim KatalogJasa sedang berdiskusi"
                width={640}
                height={440}
                className="aspect-[10/7] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 left-6 flex items-center gap-3 rounded-2xl border border-white/60 bg-white/95 p-4 shadow-lift backdrop-blur sm:left-10">
              <span className="grid size-11 place-items-center rounded-xl bg-forest text-white">
                <Target className="size-5" />
              </span>
              <div>
                <p className="font-display text-base font-semibold text-ink">
                  Misi Kami
                </p>
                <p className="max-w-[16rem] text-xs leading-relaxed text-ink-2">
                  Menjadi jembatan kepercayaan antara pelanggan dan penyedia jasa
                  lokal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MISI ===== */}
      <section className="section-pad bg-white">
        <div className="container-page">
          <SectionHeading
            eyebrow="Apa yang Kami Lakukan"
            title="Tiga misi utama kami"
            description="Setiap fitur di KatalogJasa dirancang untuk mewujudkan ketiganya."
          />
          <div className="grid gap-5 sm:grid-cols-3">
            {mission.map((m) => (
              <div
                key={m.title}
                className="rounded-2xl border border-sand/70 bg-cream p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <span className="grid size-12 place-items-center rounded-xl bg-gold-pale text-gold-deep">
                  <m.icon className="size-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                  {m.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="section-pad">
        <div className="container-page">
          <div className="grid grid-cols-2 gap-6 rounded-3xl bg-gradient-to-br from-forest to-forest-deep p-8 text-center shadow-lift sm:grid-cols-4 sm:p-12">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-3xl font-semibold text-gold-2 sm:text-4xl">
                  {s.value}
                </p>
                <p className="mt-1 text-xs font-semibold tracking-wide text-cream/70 uppercase">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CARA KERJA ===== */}
      <section className="section-pad bg-white">
        <div className="container-page">
          <SectionHeading
            eyebrow="Cara Kerja"
            title="Mulai mencari jasa dalam 4 langkah"
            description="Proses yang sederhana dan transparan, tanpa kerumitan."
          />
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li
                key={s.title}
                className="relative rounded-2xl border border-sand/70 bg-cream p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <span className="absolute top-5 right-5 font-display text-4xl font-semibold text-gold-2/25">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="grid size-12 place-items-center rounded-xl bg-forest text-white">
                  <s.icon className="size-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===== NILAI ===== */}
      <section className="section-pad">
        <div className="container-page">
          <SectionHeading
            eyebrow="Nilai Kami"
            title="Prinsip yang kami pegang"
            description="Hal-hal yang tidak pernah kami kompromikan."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-sand/70 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <span className="grid size-12 place-items-center rounded-xl bg-gold-pale text-gold-deep">
                  <v.icon className="size-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="section-pad bg-white">
        <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              align="left"
              eyebrow="FAQ"
              title="Pertanyaan yang sering diajukan"
              description="Masih punya pertanyaan lain? Hubungi kami melalui email atau WhatsApp dan tim kami akan membantu."
              className="mb-0"
            />
            <div className="mt-6">
              <Link href="mailto:halo@katalogjasa.biz.id">
                <Button variant="outline">Hubungi Kami</Button>
              </Link>
            </div>
          </div>

          <div className="space-y-3">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl border border-sand/70 bg-white p-5 shadow-soft open:border-gold/40 open:shadow-lift"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <span className="font-display text-base font-semibold text-ink">
                    {f.q}
                  </span>
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-gold-pale text-gold-deep transition-transform duration-300 group-open:rotate-180">
                    <ChevronDown className="size-4" />
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-ink-2">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="section-pad">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-forest to-forest-deep px-6 py-14 text-center shadow-lift sm:px-12">
            <div className="pointer-events-none absolute -top-24 -left-24 size-72 rounded-full bg-gold-2/20 blur-3xl" />
            <div className="relative mx-auto max-w-xl">
              <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
                Siap menemukan jasa terbaik?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-cream/75">
                Ribuan penyedia jasa terverifikasi siap membantu. Mulai sekarang,
                gratis.
              </p>
              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <Link href="/cari">
                  <Button variant="gold" size="lg" className="w-full sm:w-auto">
                    Cari Jasa Sekarang
                  </Button>
                </Link>
                <Link href="/daftar-mitra">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full border-cream/25 bg-transparent text-white hover:bg-white/10 hover:text-white sm:w-auto"
                  >
                    Daftar Jadi Mitra
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
