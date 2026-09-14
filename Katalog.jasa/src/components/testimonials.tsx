import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "Papan nama toko saya jadi jauh lebih rapi dan elegan. Prosesnya cepat, timnya sabar revisi desain sampai pas. Garansi perbaikannya juga bikin tenang.",
    name: "Budi Santoso",
    role: "Pemilik Toko Kelontong, Surabaya",
  },
  {
    quote:
      "Neon box dua sisi untuk kafe kami sangat membantu penjualan di malam hari. Pemasangan rapi, dan support-nya cepat saat kami ada pertanyaan.",
    name: "Rina Kusuma",
    role: "Owner Coffee Shop, Jakarta",
  },
  {
    quote:
      "Sticker branding armada kami dikerjakan dengan presisi, tidak ada gelembung sama sekali. Warna masih tajam sampai sekarang. Recommended!",
    name: "Andi Pratama",
    role: "Manager Logistik Perusahaan Distribusi",
  },
  {
    quote:
      "Booth event kami jadi pusat perhatian pameran. Dari desain sampai on-site installation semuanya berjalan lancar. Terima kasih Katalog Jasa!",
    name: "Dewi Lestari",
    role: "Event Organizer, Bandung",
  },
];

export function Testimonials() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {testimonials.map((testimonial) => (
        <figure
          key={testimonial.name}
          className="flex h-full flex-col rounded-2xl border border-line bg-bg-soft p-6 transition-all hover:border-accent/30"
        >
          <div
            className="flex items-center gap-1 text-accent"
            aria-label="Rating 5 dari 5"
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" aria-hidden />
            ))}
          </div>
          <blockquote className="mt-4 flex-1 text-base leading-relaxed text-ink">
            “{testimonial.quote}”
          </blockquote>
          <figcaption className="mt-6 flex items-center gap-3">
            <span
              aria-hidden
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary font-serif text-lg font-semibold text-accent-light"
            >
              {testimonial.name.charAt(0)}
            </span>
            <div>
              <p className="text-sm font-semibold text-ink">
                {testimonial.name}
              </p>
              <p className="mt-0.5 text-xs text-muted">{testimonial.role}</p>
            </div>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
