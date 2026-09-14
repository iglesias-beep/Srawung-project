import { Headset, Layers, ShieldCheck, Star } from "lucide-react";
import { Container } from "@/components/ui/container";

const items = [
  {
    icon: ShieldCheck,
    label: "Garansi Perbaikan",
    description: "Setiap produk kami jamin dengan garansi perbaikan.",
  },
  {
    icon: Headset,
    label: "Support 24/7",
    description: "Tim siap membantu kapan pun, termasuk hari libur.",
  },
  {
    icon: Layers,
    label: "500+ Project Selesai",
    description: "Ribuan signage untuk toko, brand, dan event.",
  },
  {
    icon: Star,
    label: "Rating 4.9/5",
    description: "Kepuasan customer dari konsultasi hingga pemasangan.",
  },
];

export function TrustBar() {
  return (
    <section className="border-y border-accent/20 bg-bg-soft">
      <Container>
        <ul className="grid grid-cols-1 gap-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.label} className="flex items-start gap-4">
                <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="font-serif text-base font-semibold text-ink">
                    {item.label}
                  </p>
                  <p className="mt-0.5 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
