import type { Metadata } from "next";
import { Award, Factory, Headset, Users } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/breadcrumb";
import { SectionHeading } from "@/components/section-heading";
import { GoldDivider } from "@/components/gold-divider";
import { FadeIn } from "@/components/fade-in";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description:
    "Katalog Jasa adalah mitra custom signage & printing dengan fokus pada desain mewah, material premium, garansi perbaikan, dan support 24/7.",
};

const steps = [
  {
    step: "01",
    title: "Konsultasi & Survei",
    description:
      "Ceritakan kebutuhan Anda — kami survei lokasi, ukur jarak pandang, dan diskusikan budget.",
  },
  {
    step: "02",
    title: "Desain & Revisi",
    description:
      "Tim desain membuat mockup 3D atau skala asli. Anda bebas revisi sampai benar-benar puas.",
  },
  {
    step: "03",
    title: "Produksi Presisi",
    description:
      "Material premium diolah dengan mesin presisi (CNC, laser, printing wide format) dan QC ketat.",
  },
  {
    step: "04",
    title: "Pemasangan & Garansi",
    description:
      "Tim kami pasang dengan rapi dan aman, lalu beri garansi perbaikan dengan support 24/7.",
  },
];

const values = [
  {
    icon: Award,
    title: "Kualitas di atas segalanya",
    description:
      "Kami memilih material dan proses terbaik, karena signage adalah wajah bisnis Anda setiap hari.",
  },
  {
    icon: Users,
    title: "Kolaborasi sejak awal",
    description:
      "Desain dibuat bersama Anda — bukan hasil template. Setiap project unik sesuai brand.",
  },
  {
    icon: Factory,
    title: "Produksi & tim sendiri",
    description:
      "Produksi, desain, dan pemasangan ditangani satu tim, sehingga kualitas konsisten dan mudah dikontrol.",
  },
  {
    icon: Headset,
    title: "Layanan purna jual",
    description:
      "Garansi perbaikan dan support 24/7 memastikan signage Anda tetap prima bertahun-tahun.",
  },
];

export default function TentangKamiPage() {
  return (
    <>
      <section className="border-b border-accent/20 bg-bg-soft">
        <Container className="py-10 md:py-14">
          <Breadcrumb items={[{ label: "Tentang Kami" }]} />
          <h1 className="mt-6 font-serif text-3xl font-semibold leading-tight text-ink md:text-5xl">
            Kami membantu brand tampil{" "}
            <span className="text-accent">mewah</span> dan dikenal.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            Katalog Jasa adalah rumah bagi kebutuhan custom signage & printing:
            dari papan nama toko kecil hingga totem besar di jalan raya. Kami
            percaya signage yang hebat adalah investasi — bukan sekadar
            barang.
          </p>
        </Container>
      </section>

      <section className="bg-background">
        <Container className="py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <FadeIn>
              <div>
                <SectionHeading
                  eyebrow="Cerita Kami"
                  title="Dari bengkel kecil menjadi mitra ratusan bisnis"
                  align="left"
                />
                <div className="mt-6 space-y-4 leading-[1.8] text-text-secondary">
                  <p>
                    Katalog Jasa lahir dari satu kegelisahan sederhana: terlalu
                    banyak bisnis membayar mahal untuk signage yang kurang
                    tepat — desain asal-asalan, material murah, dan tanpa
                    garansi. Ketika tanda rusak, mereka harus mengeluarkan biaya
                    lagi.
                  </p>
                  <p>
                    Kami membangun cara kerja yang berbeda: konsultasi yang
                    jujur, desain yang mewah namun fungsional, material premium,
                    dan yang terpenting — garansi perbaikan dengan support
                    24/7. Karena signage yang benar tidak berhenti di
                    pemasangan; ia harus tetap prima bertahun-tahun.
                  </p>
                  <p>
                    Hari ini, ratusan toko, restoran, klinik, sekolah, dan
                    perusahaan mempercayakan identitas visualnya kepada kami.
                  </p>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="grid gap-4 sm:grid-cols-2">
                {values.map((value) => {
                  const Icon = value.icon;
                  return (
                    <div
                      key={value.title}
                      className="rounded-[16px] border border-line bg-bg-soft p-6 transition-all hover:border-accent/40"
                    >
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/10 text-accent">
                        <Icon className="h-5 w-5" aria-hidden />
                      </span>
                      <h3 className="mt-4 font-serif text-base font-semibold text-ink">
                        {value.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {value.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      <section className="border-y border-accent/20 bg-bg-soft">
        <Container className="py-16 md:py-24">
          <SectionHeading
            eyebrow="Cara Kami Bekerja"
            title="Empat langkah menuju signage yang Anda impikan"
            description="Proses yang transparan dan terstruktur — Anda selalu tahu di tahap mana project Anda berada."
          />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <FadeIn key={step.step} delay={i * 0.08}>
                <div className="relative h-full border border-line bg-background p-6 pt-8 transition-all hover:border-accent/40">
                  <span className="font-serif text-5xl font-semibold text-accent-light">
                    {step.step}
                  </span>
                  <h3 className="mt-4 font-serif text-lg font-semibold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {step.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          <GoldDivider className="mx-auto mt-16 w-40" />
        </Container>
      </section>
    </>
  );
}
