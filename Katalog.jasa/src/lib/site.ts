export const siteConfig = {
  name: "Katalog Jasa",
  legalName: "Katalog Jasa",
  domain: "katalog.jasa",
  url: "https://katalog.jasa",
  tagline: "Custom Signage & Printing",
  description:
    "Katalog Jasa adalah katalog produk & blog edukasi untuk layanan custom signage dan printing: papan nama, neon box, rambu, huruf timbul, totem & pylon, sticker branding, hingga event booth.",
  whatsapp: "6281234567890",
  whatsappDisplay: "0812-3456-7890",
  email: "halo@katalog.jasa",
  instagram: "https://instagram.com/katalog.jasa",
  address: "Jl. Contoh No. 123, Surabaya, Jawa Timur",
  mapsEmbedUrl: "https://www.google.com/maps?q=Surabaya,+Jawa+Timur&output=embed",
  hours: "Senin - Sabtu: 08.00 - 17.00",
  hoursSunday: "Minggu: 08.00 - 14.00",
} as const;

export function waLink(message?: string) {
  const base = `https://wa.me/${siteConfig.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const waDefaultMessage =
  "Halo Katalog Jasa, saya mau tanya soal barang custom.";

export function formatRp(n: number) {
  return "Rp " + n.toLocaleString("id-ID");
}
