import type { LucideIcon } from "lucide-react";
import {
  AudioLines,
  Building2,
  Car,
  Landmark,
  Lightbulb,
  MonitorSmartphone,
  PanelTop,
  Scissors,
  Store,
  TriangleAlert,
  Zap,
} from "lucide-react";

export type CategorySlug =
  | "papan-nama"
  | "neon-box"
  | "rambu"
  | "huruf-timbul"
  | "totem-pylon"
  | "sticker-mobil"
  | "sticker-sandblast"
  | "sticker-cutting"
  | "event-booth"
  | "e-kiosk"
  | "electric-pop";

export type Category = {
  slug: CategorySlug;
  name: string;
  short: string;
  description: string;
  icon: LucideIcon;
};

export const categories: Category[] = [
  {
    slug: "papan-nama",
    name: "Papan Nama",
    short: "Rp 150.000/Unit",
    description:
      "Papan nama custom paling fleksibel dari segi bahan, ukuran, dan desain. Cocok untuk toko, kantor, rumah makan, dan klinik.",
    icon: Store,
  },
  {
    slug: "neon-box",
    name: "Neon Box",
    short: "Rp 200.000/Unit",
    description:
      "Neon box yang menyala terang dan terlihat jelas siang & malam. Paling efektif untuk branding yang butuh visibilitas 24 jam.",
    icon: PanelTop,
  },
  {
    slug: "rambu",
    name: "Rambu-Rambu",
    short: "Rp 150.000/Rambu",
    description:
      "Rambu-rambu custom yang jelas, sesuai standar, dan tahan cuaca. Cocok untuk area parkir, jalan, dan area publik.",
    icon: TriangleAlert,
  },
  {
    slug: "huruf-timbul",
    name: "Huruf Timbul",
    short: "Rp 80.000/Huruf",
    description:
      "Huruf timbul tiga dimensi dengan kesan premium dan elegan, dibuat dari akrilik, aluminium, atau stainless sesuai kebutuhan.",
    icon: Landmark,
  },
  {
    slug: "totem-pylon",
    name: "Totem & Pylon",
    short: "Rp 1.300.000/Unit",
    description:
      "Totem dan pylon sign yang tinggi dan mencolok dari kejauhan. Paling cocok untuk SPBU, showroom, dan kawasan industri.",
    icon: Building2,
  },
  {
    slug: "sticker-mobil",
    name: "Sticker Branding Mobil",
    short: "Rp 1.000.000/Mobil",
    description:
      "Sticker branding untuk kendaraan operasional — iklan berjalan yang menjangkau ratusan mata setiap kali mobil Anda melintas.",
    icon: Car,
  },
  {
    slug: "sticker-sandblast",
    name: "Sticker Sandblast Kaca",
    short: "Rp 25.000 (122 x 50 cm)",
    description:
      "Sticker sandblast untuk kaca kantor & etalase — memberi privasi dengan kesan elegan dan profesional.",
    icon: Lightbulb,
  },
  {
    slug: "sticker-cutting",
    name: "Sticker Cutting",
    short: "Rp 2.000/Sticker",
    description:
      "Logo cutting presisi untuk kaca, kendaraan, dan berbagai media lain dengan hasil tajam dan rapi.",
    icon: Scissors,
  },
  {
    slug: "event-booth",
    name: "Event Booth",
    short: "Rp 25.000.000/Unit",
    description:
      "Booth pameran custom untuk event dan pameran — desain impactful, struktur kokoh, dan selesai tepat waktu.",
    icon: AudioLines,
  },
  {
    slug: "e-kiosk",
    name: "E Kiosk & Charger Point",
    short: "Rp 8.000.000/Unit",
    description:
      "E kiosk dan charger point custom untuk area publik, pusat perbelanjaan, dan fasilitas yang butuh titik daya + media informasi.",
    icon: MonitorSmartphone,
  },
  {
    slug: "electric-pop",
    name: "Electric POP Display",
    short: "Rp 2.500.000/Unit",
    description:
      "Electric POP display yang bergerak untuk menarik perhatian di dalam toko dan area promosi.",
    icon: Zap,
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
