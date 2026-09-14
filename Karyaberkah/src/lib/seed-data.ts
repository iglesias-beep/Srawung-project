import type { Product, Category, Article } from "@/types"

export const categories: Omit<Category, "id">[] = [
  { nama: "Papan Nama", slug: "papan-nama", urutan: 1 },
  { nama: "Neon Box", slug: "neon-box", urutan: 2 },
  { nama: "Huruf Timbul", slug: "huruf-timbul", urutan: 3 },
  { nama: "Rambu-Rambu", slug: "rambu-rambu", urutan: 4 },
  { nama: "Totem & Pylon", slug: "totem-pylon", urutan: 5 },
  { nama: "Sticker Branding Mobil", slug: "sticker-branding-mobil", urutan: 6 },
  { nama: "Sticker Sandblast Kaca", slug: "sticker-sandblast-kaca", urutan: 7 },
  { nama: "Sticker Cutting", slug: "sticker-cutting", urutan: 8 },
  { nama: "Event Booth", slug: "event-booth", urutan: 9 },
  { nama: "E Kiosk & Charger Point", slug: "e-kiosk-charger-point", urutan: 10 },
  { nama: "Electric POP Display", slug: "electric-pop-display", urutan: 11 },
]

export const products: Omit<Product, "id" | "dibuat_pada" | "diupdate_pada">[] =
  [
    {
      nama: "Papan Nama Custom",
      slug: "papan-nama",
      kategori_id: "papan-nama",
      deskripsi_singkat:
        "Custom paling fleksibel dari segi bahan, ukuran, dan desain. Cocok untuk toko, kantor, rumah makan, klinik.",
      deskripsi_lengkap:
        "Papan nama custom kami dibuat dari bahan pilihan berkualitas tinggi dengan proses produksi presisi. Tersedia dalam berbagai material seperti akrilik, kayu, metal, dan kombinasi. Desain bisa disesuaikan sepenuhnya dengan brand Anda — dari tipografi, warna, hingga finishing akhir. Cocok untuk berbagai jenis usaha mulai dari toko retail, kantor profesional, rumah makan, hingga klinik.",
      harga: 150000,
      satuan: "Unit",
      gambar: ["/images/products/papan-nama.jpg"],
      stok: 45,
      status: "aktif",
      kategori_nama: "Papan Nama",
    },
    {
      nama: "Neon Box Custom",
      slug: "neon-box",
      kategori_id: "neon-box",
      deskripsi_singkat:
        "Menyala terang, terlihat jelas siang & malam, cocok untuk branding 24 jam.",
      deskripsi_lengkap:
        "Neon box custom kami menggunakan lampu LED berkualitas tinggi yang hemat energi namun tetap terang dan menarik perhatian. Tersedia dalam berbagai bentuk dan ukuran, dari persegi panjang hingga bentuk custom sesuai logo brand Anda. Tahan cuaca dan dirancang untuk penggunaan jangka panjang. Ideal untuk toko, restoran, dan bisnis yang buka 24 jam.",
      harga: 200000,
      satuan: "Unit",
      gambar: ["/images/products/neon-box.jpg"],
      stok: 30,
      status: "aktif",
      kategori_nama: "Neon Box",
    },
    {
      nama: "Huruf Timbul Custom",
      slug: "huruf-timbul",
      kategori_id: "huruf-timbul",
      deskripsi_singkat:
        "Tiga dimensi, kesan premium & elegan. Bahan akrilik, aluminium, atau stainless.",
      deskripsi_lengkap:
        "Huruf timbul custom kami memberikan kesan tiga dimensi yang premium dan elegan. Tersedia dalam material akrilik, aluminium, dan stainless steel dengan berbagai finishing seperti brushed, mirror, dan painted. Setiap huruf dipotong presisi menggunakan teknologi CNC/laser cutting. Cocok untuk kantor perusahaan, hotel, mall, dan bangunan komersial lainnya.",
      harga: 80000,
      satuan: "Huruf",
      gambar: ["/images/products/huruf-timbul.jpg"],
      stok: 200,
      status: "aktif",
      kategori_nama: "Huruf Timbul",
    },
    {
      nama: "Rambu-Rambu Custom",
      slug: "rambu",
      kategori_id: "rambu-rambu",
      deskripsi_singkat:
        "Jelas, sesuai standar, tahan cuaca. Untuk area parkir, jalan, dan area publik.",
      deskripsi_lengkap:
        "Rambu-rambu custom kami diproduksi sesuai standar yang berlaku dengan material tahan cuaca. Cocok untuk rambu parkir, rambu arahan, rambu informasi, dan rambu keselamatan. Menggunakan bahan seperti aluminium, akrilik, dan reflector high-grade untuk visibilitas maksimal siang dan malam hari.",
      harga: 150000,
      satuan: "Rambu",
      gambar: ["/images/products/rambu.jpg"],
      stok: 120,
      status: "aktif",
      kategori_nama: "Rambu-Rambu",
    },
    {
      nama: "Totem & Pylon Sign Custom",
      slug: "totem-pylon",
      kategori_id: "totem-pylon",
      deskripsi_singkat:
        "Tinggi dan mencolok dari kejauhan. Cocok untuk SPBU, showroom, kawasan industri.",
      deskripsi_lengkap:
        "Totem dan pylon sign custom dirancang untuk visibilitas maksimal dari jarak jauh. Struktur kokoh dari besi/baja dengan finishing powder coating atau stainless. Bisa dilengkapi dengan illumination untuk tampilan malam hari. Cocok untuk SPBU, showroom mobil, kawasan industri, mall, dan gedung perkantoran.",
      harga: 1300000,
      satuan: "Unit",
      gambar: ["/images/products/totem-pylon.jpg"],
      stok: 8,
      status: "aktif",
      kategori_nama: "Totem & Pylon",
    },
    {
      nama: "Sticker Branding Mobil Custom",
      slug: "sticker-mobil",
      kategori_id: "sticker-branding-mobil",
      deskripsi_singkat:
        "Branding kendaraan operasional, iklan berjalan yang efektif.",
      deskripsi_lengkap:
        "Sticker branding mobil custom menggunakan bahan vinyl premium tahan UV dan cuaca. Dicetak dengan resolusi tinggi menggunakan mesin digital printing terkini. Pemasangan rapi tanpa gelembung udara. Cocok untuk kendaraan operasional perusahaan, mobil sales, armada kurir, dan kendaraan brand lainnya. Iklan berjalan yang efektif dan ekonomis.",
      harga: 1000000,
      satuan: "Mobil",
      gambar: ["/images/products/sticker-mobil.jpg"],
      stok: 15,
      status: "aktif",
      kategori_nama: "Sticker Branding Mobil",
    },
    {
      nama: "Sticker Sandblast Kaca Custom",
      slug: "sticker-sandblast",
      kategori_id: "sticker-sandblast-kaca",
      deskripsi_singkat:
        "Untuk kaca kantor & etalase, kesan elegan & profesional.",
      deskripsi_lengkap:
        "Sticker sandblast kaca memberikan efek frosted glass yang elegan dan profesional. Cocok untuk kantor, ruang meeting, etalase toko, dan area yang membutuhkan privasi semi-transparan. Tersedia dalam berbagai motif dan desain custom. Mudah dipasang dan dilepas tanpa meninggalkan bekas.",
      harga: 25000,
      satuan: "122 x 50 cm",
      gambar: ["/images/products/sticker-sandblast.jpg"],
      stok: 60,
      status: "aktif",
      kategori_nama: "Sticker Sandblast Kaca",
    },
    {
      nama: "Sticker Cutting Custom",
      slug: "sticker-cutting",
      kategori_id: "sticker-cutting",
      deskripsi_singkat:
        "Logo cutting presisi untuk kaca, kendaraan, dan media lain.",
      deskripsi_lengkap:
        "Sticker cutting custom dipotong presisi menggunakan mesin cutting plotter. Cocok untuk logo, tulisan, dan desain grafis pada kaca, kendaraan, dinding, dan berbagai media lainnya. Tersedia dalam berbagai warna dan jenis vinyl. Tahan lama dan tahan cuaca untuk penggunaan indoor maupun outdoor.",
      harga: 2000,
      satuan: "Sticker",
      gambar: ["/images/products/sticker-cutting.jpg"],
      stok: 350,
      status: "aktif",
      kategori_nama: "Sticker Cutting",
    },
    {
      nama: "Event Booth Custom",
      slug: "event-booth",
      kategori_id: "event-booth",
      deskripsi_singkat:
        "Booth pameran custom, desain impactful, struktur kokoh.",
      deskripsi_lengkap:
        "Event booth custom kami dirancang untuk memberikan dampak visual maksimal di pameran dan event. Struktur kokoh dari rangka besi/aluminium dengan finishing premium. Desain bisa disesuaikan dengan tema event dan brand Anda. Dilengkapi dengan panel grafis, pencahayaan, dan fitur interaktif sesuai kebutuhan.",
      harga: 25000000,
      satuan: "Unit",
      gambar: ["/images/products/event-booth.jpg"],
      stok: 4,
      status: "aktif",
      kategori_nama: "Event Booth",
    },
    {
      nama: "E Kiosk & Charger Point Custom",
      slug: "e-kiosk",
      kategori_id: "e-kiosk-charger-point",
      deskripsi_singkat:
        "Untuk area publik & pusat perbelanjaan, titik daya + media informasi.",
      deskripsi_lengkap:
        "E Kiosk dan Charger Point custom merupakan solusi modern untuk area publik dan pusat perbelanjaan. Dilengkapi dengan layar informasi interaktif dan titik pengisian daya USB/Wireless. Desain bisa disesuaikan dengan interior ruangan. Cocok untuk mall, bandara, stasiun, hotel, dan ruang publik lainnya.",
      harga: 8000000,
      satuan: "Unit",
      gambar: ["/images/products/e-kiosk.jpg"],
      stok: 6,
      status: "aktif",
      kategori_nama: "E Kiosk & Charger Point",
    },
    {
      nama: "Electric POP Display Custom",
      slug: "electric-pop",
      kategori_id: "electric-pop-display",
      deskripsi_singkat:
        "Display bergerak untuk menarik perhatian di dalam toko.",
      deskripsi_lengkap:
        "Electric POP Display custom dirancang untuk menarik perhatian pelanggan di dalam toko. Dilengkapi dengan mekanisme bergerak (spinning, sliding, atau flipping) dan pencahayaan LED. Cocok untuk promosi produk, launching barang baru, dan display season. Struktur ringan namun kokoh, mudah dipindahkan dan dipasang.",
      harga: 2500000,
      satuan: "Unit",
      gambar: ["/images/products/electric-pop.jpg"],
      stok: 10,
      status: "aktif",
      kategori_nama: "Electric POP Display",
    },
  ]

export const articles: Omit<Article, "id">[] = [
  {
    judul: "Panduan Memilih Papan Nama & Signage yang Tepat untuk Bisnis",
    slug: "panduan-memilih-papan-nama-signage",
    kategori: "Panduan Memilih Produk",
    ringkasan:
      "Memilih papan nama dan signage yang tepat adalah langkah penting untuk membangun citra bisnis yang profesional. Pelajari tips lengkapnya di sini.",
    konten: `
## Mengapa Papan Nama Penting?

Papan nama adalah identitas pertama yang dilihat pelanggan. Papan nama yang profesional meningkatkan kepercayaan dan memudahkan pelanggan menemukan bisnis Anda.

## Faktor yang Perlu Dipertimbangkan

1. **Lokasi** — Pertimbangkan jarak pandang dan traffic area
2. **Material** — Akrilik, kayu, metal, atau kombinasi sesuai budget
3. **Desain** — Sesuaikan dengan brand identity bisnis Anda
4. **Pencahayaan** — Pertimbangkan lampu LED untuk visibilitas malam hari

## Rekomendasi Material

| Material | Kelebihan | Cocok Untuk |
|---|---|---|
| Akrilik | Modern, transparan | Toko, klinik |
| Kayu | Natural, warm | Cafe, restoran |
| Metal | Kokoh, tahan lama | Kantor, showroom |
| Kombinasi | Fleksibel, unik | Brand premium |

## Kesimpulan

Konsultasikan kebutuhan signage Anda dengan kami untuk mendapatkan hasil terbaik sesuai budget dan kebutuhan bisnis Anda.
    `,
    gambar_cover: "/images/blog/blog-papan-nama.jpg",
    waktu_baca: 6,
    dipublikasikan_pada: "2026-08-11",
    status: "published",
  },
  {
    judul: "Neon Box vs Huruf Timbul: Mana yang Lebih Cocok untuk Branding Anda?",
    slug: "neon-box-vs-huruf-timbul",
    kategori: "Tips Branding",
    ringkasan:
      "Memilih antara neon box dan huruf timbul bisa jadi membingungkan. Bandingkan keduanya dari berbagai aspek untuk keputusan terbaik.",
    konten: `
## Neon Box

Neon box adalah box dengan pencahayaan LED di dalamnya. Visibilitas tinggi baik siang maupun malam hari.

## Huruf Timbul

Huruf timbul memberikan efek 3D yang premium dan elegan. Terlihat mewah dari berbagai sudut pandang.

## Perbandingan

| Aspek | Neon Box | Huruf Timbul |
|---|---|---|
| Visibilitas malam | Sangat baik | Perlu lampu tambahan |
| Biaya | Sedang | Bervariasi |
| Kesan | Modern, terang | Premium, elegan |
| Perawatan | Ganti lampu | Minim |

## Kesimpulan

Pilih neon box jika visibilitas malam hari jadi prioritas. Pilih huruf timbul jika ingin kesan premium dan elegan pada fasad bangunan.
    `,
    gambar_cover: "/images/blog/blog-neon-box.jpg",
    waktu_baca: 5,
    dipublikasikan_pada: "2026-08-04",
    status: "published",
  },
  {
    judul: "Sticker Branding Mobil & Cutting: Iklan Berjalan yang Efektif untuk Bisnis",
    slug: "sticker-branding-mobil-iklan-berjalan",
    kategori: "Tips Branding",
    ringkasan:
      "Branding kendaraan memberikan exposure ribuan kali sehari. Pelajari mengapa sticker branding mobil layak jadi strategi marketing Anda.",
    konten: `
## Iklan yang Bergerak

Berbeda dengan billboard statis, branding kendaraan berpindah-pindah lokasi sepanjang hari. Rata-rata kendaraan yang di-branding bisa dilihat oleh 3,000-5,000 orang per hari.

## ROI yang Mengagumkan

Dibandingkan media advertising lain, cost per impression branding kendaraan jauh lebih rendah. Satu investasi untuk exposure bertahun-tahun.

## Tips Desain

1. Gunakan font besar dan kontras tinggi
2. Sertakan nama bisnis dan nomor kontak yang jelas
3. Hindari terlalu banyak informasi — cukup brand + CTA
4. Manfaatkan seluruh permukaan kendaraan secara maksimal

## Sticker Cutting untuk Detail

Sticker cutting memberikan presisi tinggi untuk logo dan tulisan. Cocok untuk branding halus pada kaca dan body kendaraan.
    `,
    gambar_cover: "/images/blog/sticker-branding-mobil-iklan-berjalan.jpg",
    waktu_baca: 5,
    dipublikasikan_pada: "2026-07-28",
    status: "published",
  },
]
