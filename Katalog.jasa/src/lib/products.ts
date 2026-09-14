import type { CategorySlug } from "./categories";
import { formatRp } from "./site";

export type Product = {
  slug: string;
  name: string;
  category: CategorySlug;
  shortDescription: string;
  fullDescription: string;
  priceInfo: string;
  images: string[];
  specifications: { label: string; value: string }[];
  materials: string[];
  warranty: string;
  featured?: boolean;
  relatedArticles?: string[];
};

function harga(n: number, satuan: string) {
  return `${formatRp(n)}/${satuan}`;
}

export const products: Product[] = [
  {
    slug: "papan-nama",
    name: "Papan Nama Custom",
    category: "papan-nama",
    shortDescription:
      "Papan nama custom paling fleksibel dari segi bahan, ukuran, dan desain. Cocok untuk toko, kantor, rumah makan, dan klinik.",
    fullDescription:
      "Papan nama custom adalah pilihan paling fleksibel untuk semua jenis usaha. Kami memproduksi papan nama dari berbagai bahan — akrilik yang ringan dan mudah dibentuk, aluminium/galvalum yang kokoh dan anti karat, stainless steel yang mewah untuk kesan premium, hingga kaca yang bersih dan modern (sering dipadukan sandblast).\n\nHarga dihitung dari bahan baku, ukuran, jumlah, dan tingkat kesulitan pengerjaan. Konsultasikan desain dan kebutuhan Anda — tim kami bantu menentukan bahan dan ukuran yang paling pas, dengan garansi perbaikan.",
    priceInfo: harga(150000, "Unit"),
    images: ["/images/products/papan-nama.jpg"],
    specifications: [
      { label: "Harga", value: "Rp 150.000/Unit (mulai)" },
      { label: "Bahan", value: "Akrilik, aluminium/galvalum, stainless, kaca" },
      { label: "Kelebihan", value: "Fleksibel dari segi bahan, ukuran, dan desain" },
      { label: "Cocok untuk", value: "Toko, kantor, rumah makan, klinik" },
    ],
    materials: ["Akrilik", "Aluminium / Galvalum", "Stainless steel", "Kaca"],
    warranty: "Garansi perbaikan",
    featured: true,
    relatedArticles: ["neon-box-vs-papan-nama-akrilik"],
  },
  {
    slug: "neon-box",
    name: "Neon Box Custom",
    category: "neon-box",
    shortDescription:
      "Neon box yang menyala terang dan terlihat jelas siang & malam. Paling efektif untuk branding yang butuh visibilitas 24 jam.",
    fullDescription:
      "Neon box adalah kotak bertanda yang dilapisi akrilik dan dilengkapi lampu di dalamnya. Ketika menyala, keseluruhan permukaannya memancarkan cahaya sehingga sangat mudah dilihat — bahkan dari kejauhan dan dalam kondisi gelap.\n\nSangat efektif untuk jalan raya yang ramai, dengan permukaan luas untuk menampilkan logo dan teks secara mencolok. Tersedia berbagai warna cahaya untuk menyesuaikan identitas brand. Catatan: konsumsi lampu perlu diperhitungkan dan lampu perlu perawatan berkala agar tetap terang.",
    priceInfo: harga(200000, "Unit"),
    images: ["/images/products/neon-box.jpg"],
    specifications: [
      { label: "Harga", value: "Rp 200.000/Unit (mulai)" },
      { label: "Bahan", value: "Akrilik + lampu LED/neon" },
      { label: "Kelebihan", value: "Menyala terang, terlihat siang & malam" },
      { label: "Cocok untuk", value: "Branding yang butuh visibilitas 24 jam" },
    ],
    materials: ["Akrilik", "Lampu LED", "Frame metal"],
    warranty: "Garansi perbaikan",
    featured: true,
    relatedArticles: ["neon-box-vs-papan-nama-akrilik"],
  },
  {
    slug: "rambu",
    name: "Rambu-Rambu Custom",
    category: "rambu",
    shortDescription:
      "Rambu-rambu custom yang jelas, sesuai standar, dan tahan cuaca. Cocok untuk area parkir, jalan, dan area publik.",
    fullDescription:
      "Rambu-rambu custom kami buat dengan standar yang jelas dan material tahan cuaca, sehingga informasi selalu terbaca dalam kondisi apa pun. Cocok untuk area parkir, penunjuk arah, area publik, hingga kebutuhan instansi.\n\nKami menyesuaikan desain, ukuran, dan bahan dengan kebutuhan lokasi Anda. Konsultasikan kebutuhan rambu Anda untuk mendapatkan rekomendasi yang tepat.",
    priceInfo: harga(150000, "Rambu"),
    images: ["/images/products/rambu.jpg"],
    specifications: [
      { label: "Harga", value: "Rp 150.000/Rambu (mulai)" },
      { label: "Jenis", value: "Custom sesuai kebutuhan" },
      { label: "Kelebihan", value: "Jelas, sesuai standar, tahan cuaca" },
      { label: "Cocok untuk", value: "Area parkir, jalan, area publik" },
    ],
    materials: ["Plat metal", "Sheet reflektif", "Cat coating"],
    warranty: "Garansi perbaikan",
    featured: true,
  },
  {
    slug: "huruf-timbul",
    name: "Huruf Timbul Custom",
    category: "huruf-timbul",
    shortDescription:
      "Huruf timbul tiga dimensi dengan kesan premium dan elegan, dibuat dari akrilik, aluminium, atau stainless sesuai kebutuhan.",
    fullDescription:
      "Huruf timbul adalah huruf tiga dimensi yang menonjol dari permukaan bidang pemasangannya, memberi kesan premium dan profesional yang kuat. Bahan yang umum dipakai adalah akrilik atau stainless, dan huruf bisa dibuat dengan pencahayaan tersembunyi (backlight) untuk efek dramatis.\n\nHarga dihitung per huruf — total biaya tergantung jumlah dan ukuran huruf. Fleksibel untuk berbagai jenis huruf dan logo dengan detail halus, dan relatif awet serta mudah dirawat, terutama untuk bahan stainless.",
    priceInfo: harga(80000, "Huruf"),
    images: ["/images/products/huruf-timbul.jpg"],
    specifications: [
      { label: "Harga", value: "Rp 80.000/Huruf (mulai)" },
      { label: "Bahan", value: "Akrilik, aluminium, stainless" },
      { label: "Kelebihan", value: "Kesan premium & elegan" },
      { label: "Cocok untuk", value: "Kantor, gedung, brand premium" },
    ],
    materials: ["Akrilik", "Aluminium", "Stainless steel"],
    warranty: "Garansi perbaikan",
    featured: true,
    relatedArticles: ["5-kesalahan-pesan-huruf-timbul"],
  },
  {
    slug: "totem-pylon",
    name: "Totem & Pylon Sign Custom",
    category: "totem-pylon",
    shortDescription:
      "Totem dan pylon sign yang tinggi dan mencolok dari kejauhan. Paling cocok untuk SPBU, showroom, dan kawasan industri.",
    fullDescription:
      "Totem dan pylon sign adalah signage besar yang berdiri tegak dan mencolok dari kejauhan, paling efektif untuk lokasi yang harus terlihat jelas dari jalan raya — seperti SPBU, showroom, dan kawasan industri.\n\nDibangun dari struktur yang kokoh dengan pondasi yang benar, dan bisa dikombinasikan dengan pencahayaan agar tetap terlihat di malam hari. Konsultasikan ukuran dan desainnya dengan tim kami untuk hasil yang presisi dan tahan lama.",
    priceInfo: harga(1300000, "Unit"),
    images: ["/images/products/totem-pylon.jpg"],
    specifications: [
      { label: "Harga", value: "Rp 1.300.000/Unit (mulai)" },
      { label: "Jenis", value: "Totem sign / pylon sign custom" },
      { label: "Kelebihan", value: "Tinggi & mencolok dari kejauhan" },
      { label: "Cocok untuk", value: "SPBU, showroom, kawasan industri" },
    ],
    materials: ["Besi galvanis", "HPL / akrilik", "LED"],
    warranty: "Garansi perbaikan",
    featured: true,
    relatedArticles: ["panduan-memilih-totem-pylon-sign"],
  },
  {
    slug: "sticker-mobil",
    name: "Sticker Branding Mobil Custom",
    category: "sticker-mobil",
    shortDescription:
      "Sticker branding untuk kendaraan operasional — iklan berjalan yang menjangkau ratusan mata setiap kali mobil Anda melintas.",
    fullDescription:
      "Sticker branding mobil mengubah kendaraan operasional Anda menjadi iklan berjalan yang beroperasi sendiri sepanjang waktu. Dibandingkan billboard atau iklan digital, biayanya jauh lebih ringan dengan jangkauan yang terus bergerak.\n\nProsesnya terstruktur: kirim logo atau desain awal, tim menentukan kombinasi warna, ukuran, dan penempatan di badan kendaraan, desain diverifikasi bersama, lalu sticker dicetak, di-cutting presisi, dan dipasang dengan teknik agar tidak menggelembung. Perawatan: cuci manual dengan sabun lembut dan hindari semprotan tekanan tinggi langsung ke tepi sticker.",
    priceInfo: harga(1000000, "Mobil"),
    images: ["/images/products/sticker-mobil.jpg"],
    specifications: [
      { label: "Harga", value: "Rp 1.000.000/Mobil (mulai)" },
      { label: "Jenis", value: "Full body / sebagian" },
      { label: "Kelebihan", value: "Iklan berjalan, biaya sekali pasang" },
      { label: "Ketahanan", value: "Bertahun-tahun dengan perawatan tepat" },
    ],
    materials: ["Vinyl premium", "Laminasi", "Cutting presisi"],
    warranty: "Garansi perbaikan",
    featured: true,
    relatedArticles: ["sticker-branding-kendaraan-investasi"],
  },
  {
    slug: "sticker-sandblast",
    name: "Sticker Sandblast Kaca Custom",
    category: "sticker-sandblast",
    shortDescription:
      "Sticker sandblast untuk kaca kantor & etalase — memberi privasi dengan kesan elegan dan profesional.",
    fullDescription:
      "Sticker sandblast memberi efek buram yang elegan pada kaca, cocok untuk kaca kantor dan etalase yang ingin privasi sekaligus tetap terlihat profesional.\n\nDikerjakan dengan bahan sandblast berkualitas dan cutting presisi sesuai desain Anda. Kombinasikan dengan cutting logo untuk tampilan yang lebih menarik.",
    priceInfo: harga(25000, "122 x 50 cm"),
    images: ["/images/products/sticker-sandblast.jpg"],
    specifications: [
      { label: "Harga", value: "Rp 25.000 / 122 x 50 cm" },
      { label: "Kegunaan", value: "Kaca kantor & etalase" },
      { label: "Kelebihan", value: "Privasi dengan kesan elegan" },
      { label: "Bahan", value: "Sticker sandblast premium" },
    ],
    materials: ["Sticker sandblast", "Cutting presisi"],
    warranty: "Garansi perbaikan",
    featured: true,
    relatedArticles: ["sticker-branding-kendaraan-investasi"],
  },
  {
    slug: "sticker-cutting",
    name: "Sticker Cutting Custom",
    category: "sticker-cutting",
    shortDescription:
      "Logo cutting presisi untuk kaca, kendaraan, dan berbagai media lain dengan hasil tajam dan rapi.",
    fullDescription:
      "Sticker cutting adalah pembuatan logo atau huruf yang di-cutting presisi sesuai desain, untuk ditempel di kaca, kendaraan, dinding, atau media lain. Hasilnya tajam, rapi, dan menyatu dengan media pemasangannya.\n\nKami melayani sticker cutting dalam berbagai ukuran dan warna vinyl. Konsultasikan desain logo Anda untuk hasil yang presisi dan awet.",
    priceInfo: harga(2000, "Sticker"),
    images: ["/images/products/sticker-cutting.jpg"],
    specifications: [
      { label: "Harga", value: "Rp 2.000/Sticker (mulai)" },
      { label: "Media", value: "Kaca, kendaraan, dinding, dll" },
      { label: "Kelebihan", value: "Presisi & tajam" },
      { label: "Bahan", value: "Vinyl premium berbagai warna" },
    ],
    materials: ["Vinyl premium", "Cutting presisi"],
    warranty: "Garansi perbaikan",
    featured: true,
    relatedArticles: ["sticker-branding-kendaraan-investasi"],
  },
  {
    slug: "event-booth",
    name: "Event Booth Custom",
    category: "event-booth",
    shortDescription:
      "Booth pameran custom untuk event dan pameran — desain impactful, struktur kokoh, dan selesai tepat waktu.",
    fullDescription:
      "Booth pameran yang dirancang baik bisa menjadi pusat perhatian di tengah keramaian event. Kami membangun booth custom dari struktur kokoh yang ringan dipasang-bongkar, dikombinasikan dengan grafis dan pencahayaan yang menarik.\n\nHarga disesuaikan dengan ukuran stand, material, dan tingkat kesulitan desain. Konsultasikan kebutuhan event Anda — tim kami siap membantu dari desain hingga on-site installation.",
    priceInfo: harga(25000000, "Unit"),
    images: ["/images/products/event-booth.jpg"],
    specifications: [
      { label: "Harga", value: "Rp 25.000.000/Unit (mulai)" },
      { label: "Ukuran", value: "Custom sesuai kebutuhan event" },
      { label: "Layanan", value: "Desain + produksi + on-site install" },
      { label: "Cocok untuk", value: "Pameran, event, launching" },
    ],
    materials: ["Aluminium / struktur modular", "Flexy print", "LED"],
    warranty: "Garansi perbaikan",
    featured: true,
  },
  {
    slug: "e-kiosk",
    name: "E Kiosk & Charger Point Custom",
    category: "e-kiosk",
    shortDescription:
      "E kiosk dan charger point custom untuk area publik, pusat perbelanjaan, dan fasilitas yang butuh titik daya + media informasi.",
    fullDescription:
      "E kiosk dan charger point adalah solusi custom untuk area publik yang butuh titik pengisian daya sekaligus media informasi atau iklan. Kami memproduksi sesuai desain dan kebutuhan lokasi Anda.\n\nStruktur kokoh, finishing rapi, dan dapat dikombinasikan dengan branding atau media display. Konsultasikan kebutuhan lokasi Anda untuk penawaran yang sesuai.",
    priceInfo: harga(8000000, "Unit"),
    images: ["/images/products/e-kiosk.jpg"],
    specifications: [
      { label: "Harga", value: "Rp 8.000.000/Unit (mulai)" },
      { label: "Fungsi", value: "Charger point + media informasi" },
      { label: "Bahan", value: "Custom sesuai desain" },
      { label: "Cocok untuk", value: "Area publik, mall, fasilitas umum" },
    ],
    materials: ["Struktur metal", "Finishing custom", "Komponen listrik"],
    warranty: "Garansi perbaikan",
    featured: true,
  },
  {
    slug: "electric-pop",
    name: "Electric POP Display Custom",
    category: "electric-pop",
    shortDescription:
      "Electric POP display yang bergerak untuk menarik perhatian di dalam toko dan area promosi.",
    fullDescription:
      "Electric POP (Point of Purchase) display memanfaatkan gerakan untuk menarik perhatian pengunjung — sangat efektif untuk promosi produk di dalam toko, kafe, dan area ritel.\n\nKami memproduksi electric POP display custom sesuai desain dan kebutuhan promosi Anda, dengan mekanisme yang aman dan tahan lama. Konsultasikan konsepnya untuk penawaran terbaik.",
    priceInfo: harga(2500000, "Unit"),
    images: ["/images/products/electric-pop.jpg"],
    specifications: [
      { label: "Harga", value: "Rp 2.500.000/Unit (mulai)" },
      { label: "Fungsi", value: "Menarik perhatian pengunjung" },
      { label: "Bahan", value: "Custom sesuai desain" },
      { label: "Cocok untuk", value: "Toko, ritel, area promosi" },
    ],
    materials: ["Struktur metal", "Mekanik motor", "Grafis cetak"],
    warranty: "Garansi perbaikan",
    featured: true,
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(slug: string): Product[] {
  return products.filter((p) => p.category === slug);
}

export const featuredProducts: Product[] = products.filter((p) => p.featured);
