import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Paintbrush, Shield, Wrench, Zap, ArrowRight, CheckCircle } from "lucide-react";

export default function TentangKamiPage() {
  return (
    <div>
      {/* Hero */}
      <section className="py-20 md:py-28 bg-bg-base">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="brass" className="mb-4">Tentang Proyekjasa</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-display)] text-text-primary tracking-tight mb-6 leading-[1.1]">
              Partner Terpercaya
              <br />
              <span className="text-brass-shimmer">Untuk Signage Premium</span>
            </h1>
            <p className="text-lg text-text-muted leading-relaxed">
              Kami bergerak di bidang custom signage &amp; printing berkualitas tinggi.
              Pengalaman bertahun-tahun melayani ratusan klien dari UMKM hingga perusahaan besar.
            </p>
          </div>
        </div>
      </section>

      {/* Cerita Kami */}
      <section className="py-20 md:py-28 bg-bg-surface border-y border-[#E5E7EB]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-accent-brass mb-3">
                Cerita Kami
              </p>
              <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)] text-text-primary tracking-tight mb-6">
                Dimulai dari Garasi, Kini Dipercaya BUMN
              </h2>
              <div className="space-y-4 text-text-muted leading-relaxed">
                <p>
                  Proyekjasa didirikan pada tahun 2014 di Surabaya. Bermula dari sebuah garasi kecil
                  dengan satu mesin cutting sticker, kami terus berkembang hingga memiliki workshop
                  sendiri dengan berbagai mesin presisi modern.
                </p>
                <p>
                  Komitmen kami sederhana: hasil terbaik, harga adil, dan pelayanan yang bikin klien
                  tenang. Dari papan nama warung pinggir jalan hingga branding gedung perkantoran �
                  setiap proyek dikerjakan dengan perhatian yang sama.
                </p>
                <p>
                  Kini, lebih dari 500 proyek sudah kami selesaikan untuk klien dari berbagai
                  industri � mulai dari UMKM, kafe, restoran, hingga BUMN dan brand internasional.
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { number: "500+", label: "Proyek Selesai" },
                { number: "10+", label: "Tahun Pengalaman" },
                { number: "50+", label: "Klien Korporat" },
                { number: "100%", label: "Garansi Kepuasan" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-[#E5E7EB] bg-bg-base p-6 text-center card-hover"
                >
                  <p className="text-3xl font-bold font-[family-name:var(--font-display)] text-accent-brass mb-1">
                    {stat.number}
                  </p>
                  <p className="text-sm text-text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Nilai Kami */}
      <section className="py-20 md:py-28 bg-bg-base">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent-brass mb-2">
              Nilai Kami
            </p>
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)] text-text-primary tracking-tight">
              Prinsip Yang Kami Pegang
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Paintbrush, title: "Desain Gratis", desc: "Tim desainer profesional bantu wujudkan visi Anda tanpa biaya tambahan." },
              { icon: Shield, title: "Material Premium", desc: "Logam, akrilik, stainless, neon asli � bukan plastik murahan." },
              { icon: Wrench, title: "Garansi Perbaikan", desc: "Setiap produk dilengkapi garansi untuk ketenangan pikiran Anda." },
              { icon: Zap, title: "Pemasangan Profesional", desc: "Teknisi berpengalaman pasang langsung di lokasi Anda." },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-[#E5E7EB] bg-bg-surface p-6 card-hover"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent-brass/10 border border-accent-brass/20 mb-5">
                  <item.icon className="h-5 w-5 text-accent-brass" />
                </div>
                <h3 className="font-semibold font-[family-name:var(--font-display)] text-text-primary mb-2 text-sm">
                  {item.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proses Kerja */}
      <section className="py-20 md:py-28 bg-bg-surface border-y border-[#E5E7EB]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent-brass mb-2">
              Cara Kerja
            </p>
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)] text-text-primary tracking-tight">
              Dari Ide Sampai Terpasang
            </h2>
          </div>

          <div className="space-y-0">
            {[
              { step: "01", title: "Konsultasi", desc: "Ceritakan kebutuhan signage Anda. Tim kami bantu tentukan material, ukuran, dan desain yang tepat." },
              { step: "02", title: "Desain Gratis", desc: "Tim desainer buatkan konsep visual. Revisi tanpa batas sampai Anda benar-benar puas." },
              { step: "03", title: "Produksi", desc: "Dikerjakan di workshop sendiri dengan mesin presisi. Quality control ketat sebelum dikirim." },
              { step: "04", title: "Pemasangan", desc: "Teknisi berpengalaman pasang langsung di lokasi Anda. Garansi perbaikan included." },
            ].map((item, idx) => (
              <div key={item.step} className="flex gap-6 items-start">
                {/* Timeline */}
                <div className="flex flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-brass text-white font-bold text-sm font-[family-name:var(--font-display)] shrink-0">
                    {item.step}
                  </div>
                  {idx < 3 && <div className="w-px flex-1 bg-[#E5E7EB] min-h-[40px]" />}
                </div>
                {/* Content */}
                <div className={`pb-10 ${idx === 3 ? "pb-0" : ""}`}>
                  <h3 className="text-lg font-bold font-[family-name:var(--font-display)] text-text-primary mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Keunggulan */}
      <section className="py-20 md:py-28 bg-bg-base">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-[#E5E7EB] bg-bg-surface p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-accent-brass mb-3">
                  Kenapa Proyekjasa?
                </p>
                <h2 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-display)] text-text-primary tracking-tight mb-4">
                  Kualitas yang Bisa Anda Andalkan
                </h2>
                <p className="text-text-muted leading-relaxed mb-6">
                  Kami bukan sekadar vendor � kami mitra branding jangka panjang Anda.
                  Setiap produk dikerjakan dengan perhatian detail dan bahan terbaik.
                </p>
                <div className="space-y-3">
                  {[
                    "Desain gratis tanpa batas revisi",
                    "Material premium tahan cuaca",
                    "Garansi perbaikan & maintenance",
                    "Pemasangan oleh teknisi bersertifikat",
                    "Pengerjaan tepat waktu",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2.5">
                      <CheckCircle className="h-4 w-4 text-accent-emerald shrink-0" />
                      <span className="text-sm text-text-muted">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl overflow-hidden border border-[#E5E7EB] aspect-[4/3]">
                <img
                  src="/images/hero-srawung.jpg"
                  alt="Workshop Proyekjasa"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
