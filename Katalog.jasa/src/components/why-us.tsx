import { Palette, Ruler, ShieldCheck, Truck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/section-heading";
import { FadeIn } from "@/components/fade-in";

const values = [
  {
    icon: Palette,
    title: "Desain Gratis & Revisi",
    description:
      "Tim desain membantu mewujudkan konsep Anda, dengan revisi sampai Anda puas — tanpa biaya tambahan.",
  },
  {
    icon: Ruler,
    title: "Presisi & Material Premium",
    description:
      "Ukuran dihitung presisi dengan survei lokasi, dan material dipilih agar tahan cuaca serta awet bertahun-tahun.",
  },
  {
    icon: ShieldCheck,
    title: "Garansi Perbaikan",
    description:
      "Setiap produk kami jamin. Jika ada kendala, tim servis kami perbaiki — bukan sekadar janji.",
  },
  {
    icon: Truck,
    title: "Pemasangan Profesional",
    description:
      "Tim pemasangan berpengalaman menangani instalasi, termasuk pengerjaan di ketinggian dan lokasi sulit.",
  },
];

export function WhyUs() {
  return (
    <section className="bg-background">
      <Container className="py-16 md:py-24">
        <SectionHeading
          eyebrow="Kenapa Pilih Kami"
          title="Bukan sekadar produksi, tapi mitra branding jangka panjang"
          description="Kami memandang signage sebagai investasi identitas. Karena itu setiap proses — dari desain hingga pemasangan — kami kerjakan dengan standar yang sama."
        />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, i) => {
            const Icon = value.icon;
            return (
              <FadeIn key={value.title} delay={i * 0.08}>
                <div className="h-full border-t-2 border-accent pt-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-5 font-serif text-lg font-semibold text-ink">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {value.description}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
