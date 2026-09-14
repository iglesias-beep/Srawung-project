# Katalog.Jasa — Project Blueprint & README

> Dokumen ini adalah **spesifikasi/blueprint** untuk membangun website **katalog.jasa**, sebuah katalog produk & blog edukasi untuk layanan custom signage & printing. Website ini menggunakan **Kertajaya** ([kertajaya-2ecd6.web.app](https://kertajaya-2ecd6.web.app/)) sebagai referensi bisnis & produk, tetapi dengan arah desain baru: **mewah, elegan, simple, clear, dan bright (terang)** — berbanding terbalik dari nuansa gelap referensi (theme color referensi: `#1c2b3a` — navy gelap).

---

## ⚠️ Catatan Penting Sebelum Mulai

Situs referensi (`kertajaya-2ecd6.web.app`) adalah **SPA berbasis JavaScript** (kemungkinan React, di-hosting via Firebase Hosting). Karena itu, konten produk lengkap (nama produk, deskripsi, harga, foto) **tidak bisa diambil otomatis** lewat crawler/text-fetch — yang berhasil ditemukan hanya metadata halaman:

```
Title       : Kertajaya - Barang Custom Signage & Printing
Description : Kertajaya melayani barang custom signage: papan nama, neon box,
              rambu, huruf timbul, totem & pylon, sticker branding, event booth,
              dan lainnya. Garansi perbaikan & support 24/7.
Theme color : #1c2b3a
```

**Yang perlu kamu lakukan:** buka website Kertajaya di browser, lalu copy-paste (atau screenshot / export) daftar produk lengkap — nama, kategori, deskripsi, harga (kalau ada), dan foto — supaya katalog di `katalog.jasa` bisa 100% identik seperti yang kamu minta. Struktur data di bawah sudah aku siapkan supaya tinggal "diisi" begitu data itu ada. Untuk sekarang, kategori produk di bawah aku susun berdasarkan metadata di atas sebagai starting point.

---

## 1. Ringkasan Proyek

| | |
|---|---|
| **Nama proyek** | Katalog.Jasa |
| **Jenis situs** | Katalog produk jasa (custom signage & printing) + Blog edukasi |
| **Referensi bisnis** | Kertajaya (produk & jasa identik) |
| **Arah desain baru** | Mewah, elegan, simple, clear, bright (kontras dari referensi yang gelap) |
| **Device support** | **Wajib fully responsive** — nyaman diakses & dilihat dari HP, tablet, maupun desktop. Mayoritas traffic katalog jasa biasanya datang dari HP (klik dari WhatsApp/Instagram/Google search di HP), jadi mobile experience bukan "nice to have" tapi prioritas utama, bukan cuma versi desktop yang di-shrink. |
| **Target user** | Pemilik toko/ruko, event organizer, brand/UMKM yang butuh signage & branding fisik |
| **Goal utama** | (1) Menampilkan katalog produk secara jelas & meyakinkan, (2) Edukasi lewat blog agar calon customer paham produk sebelum order, (3) Konversi ke kontak/WA/form |

---

## 2. Analisis Referensi (Kertajaya)

Berdasarkan metadata yang berhasil diambil, kategori produk/jasa yang ditawarkan:

- Papan nama (signage)
- Neon box
- Rambu (signage petunjuk/safety)
- Huruf timbul (3D letter)
- Totem & pylon sign
- Sticker branding (branding kendaraan/toko)
- Event booth
- Layanan lain-lain (custom order)

Value proposition yang diangkat: **garansi perbaikan** dan **support 24/7**. Ini elemen trust yang sebaiknya juga ditonjolkan di katalog.jasa.

**TODO:** lengkapi tabel produk di Section 6 dengan data asli (nama produk persis, harga, spesifikasi, foto) dari halaman Kertajaya.

---

## 3. Prinsip & Sistem Desain

Arah desain: **Luxury Minimalism** — mewah tapi tidak ramai, elegan lewat whitespace & tipografi, dan terang/bright (bukan dark mode seperti referensi).

### 3.1 Palet Warna

```css
:root {
  /* Base — bright & clean */
  --color-bg: #FFFFFF;
  --color-bg-soft: #FAF9F6;       /* off-white hangat, kesan mewah */
  --color-surface: #F5F3EE;       /* card background */

  /* Primary — deep elegant navy (echo dari referensi, tapi dipakai sebagai aksen bukan background) */
  --color-primary: #1C2B3A;
  --color-primary-soft: #33495F;

  /* Accent — gold/brass untuk kesan mewah */
  --color-accent: #B8905A;        /* muted gold */
  --color-accent-light: #E4CBA0;

  /* Text */
  --color-text-primary: #1A1A1A;
  --color-text-secondary: #5C5C5C;
  --color-text-muted: #9A9A9A;

  /* Border & divider */
  --color-border: #E8E5DE;

  /* Semantic */
  --color-success: #3F7A5C;
  --color-warning: #C97A2B;
}
```

### 3.2 Tipografi

- **Heading:** Serif elegan — misalnya `"Fraunces"`, `"Playfair Display"`, atau `"Cormorant"` (kesan mewah, editorial).
- **Body/UI:** Sans-serif clean — `"Inter"`, `"General Sans"`, atau `"Manrope"` (mudah dibaca, modern).
- **Skala tipografi (contoh, rem based):**
  - H1: 3rem / 1.1 line-height / font-weight 600 (serif)
  - H2: 2rem / 1.2 (serif)
  - H3: 1.5rem / 1.3 (serif, kadang sans untuk UI-heavy section)
  - Body: 1rem / 1.6 (sans)
  - Small/meta: 0.875rem (sans)

### 3.3 Spacing & Layout

- Gunakan **8pt spacing scale** (8, 16, 24, 32, 48, 64, 96px).
- Banyak **whitespace** — jangan padatkan konten. Kesan mewah datang dari "ruang bernapas", bukan dari elemen dekoratif berlebihan.
- Max content width: `1280px`, dengan padding horizontal responsif (`24px` mobile → `80px` desktop).
- Grid produk: 3 kolom desktop / 2 kolom tablet / 1 kolom mobile.

### 3.4 Komponen Visual

- **Card produk:** rounded-lg (12–16px), border tipis `--color-border`, shadow sangat halus (`0 4px 20px rgba(0,0,0,0.04)`), hover: elevate shadow + scale gambar sedikit (1.03).
- **Button primary:** background `--color-primary`, text putih, hover ke `--color-accent`.
- **Button secondary/outline:** border `--color-primary`, transparent, text `--color-primary`.
- **Divider:** garis tipis gold (`--color-accent-light`) sebagai aksen antar section, bukan garis abu-abu biasa — ini yang bikin kesan "mewah".
- **Icon:** line-icon minimalis (contoh: Lucide/Phosphor), jangan icon solid/berat.
- Hindari: gradient mencolok, drop shadow tebal, warna saturasi tinggi berlebihan, dark section (kecuali footer boleh sedikit lebih gelap sebagai kontras penutup).

### 3.5 Responsive / Mobile-First (Wajib)

Pendekatan: **mobile-first** — desain & CSS ditulis dari layar kecil dulu, baru di-scale up ke tablet/desktop, bukan sebaliknya. Ini penting karena calon customer biasanya klik link katalog dari WhatsApp/Instagram/Google lewat HP.

**Breakpoints (Tailwind default, dipakai konsisten):**

```
sm:  640px   → HP besar / landscape
md:  768px   → Tablet
lg:  1024px  → Laptop kecil
xl:  1280px  → Desktop
```

**Aturan spesifik per komponen:**

- **Navbar** → di HP jadi hamburger menu (drawer/slide-in dari samping), logo tetap terlihat, CTA utama ("Konsultasi Gratis") tetap muncul sebagai icon/button ringkas, bukan hilang.
- **Sticky CTA mobile** → tombol WhatsApp/kontak yang selalu terlihat (fixed di bawah layar) khusus versi HP, karena ini jalur konversi utama.
- **Grid produk** → 3 kolom (desktop) → 2 kolom (tablet) → **1 kolom full-width** (HP), card jangan dipaksa kecil-kecil biar foto produk tetap jelas.
- **Tipografi** → gunakan `clamp()` atau breakpoint scaling supaya heading besar di desktop tidak "meledak" di layar HP (H1 desktop 3rem → H1 mobile sekitar 1.75–2rem).
- **Gambar produk** → wajib `next/image` dengan `sizes` yang benar per breakpoint, supaya HP tidak men-download gambar resolusi desktop (boros kuota, lambat).
- **Touch target** → semua tombol/link minimal area sentuh 44x44px, spacing antar elemen interaktif cukup renggang supaya tidak salah pencet di layar kecil.
- **Tabel spesifikasi produk** → di HP diubah jadi format stacked (label di atas, value di bawah) alih-alih tabel horizontal yang harus di-scroll.
- **Testing wajib** di: Chrome DevTools device emulator (iPhone SE sebagai kasus layar terkecil, iPhone 14/15, Android mid-range) + real device check sebelum go-live.

---

## 4. Tech Stack (Front-End Senior Standard)

| Layer | Pilihan |
|---|---|
| Framework | **Next.js 14+ (App Router)** + React 18/19 |
| Bahasa | TypeScript |
| Styling | Tailwind CSS + CSS variables (design tokens di atas) |
| Komponen UI | shadcn/ui (dikustomisasi sesuai design tokens) |
| Animasi | Framer Motion (halus, subtle — fade/slide, bukan bouncy) |
| Konten Blog | MDX (biar bisa embed komponen di dalam artikel) atau headless CMS (Sanity/Contentful) kalau butuh non-technical editing |
| Gambar | `next/image` dengan optimasi otomatis + lazy load |
| Form/Kontak | React Hook Form + Zod validation, kirim ke WhatsApp API / email service |
| Hosting | Firebase Hosting (konsisten dengan referensi) atau Vercel |
| Icon | lucide-react |
| SEO | `next-seo` / native Next.js Metadata API + JSON-LD structured data (Product, Article schema) |

---

## 5. Sitemap / Struktur Halaman

```
/                       → Home (hero, kategori unggulan, produk pilihan, testimoni, CTA)
/katalog                → Semua produk (filter by kategori)
/katalog/[kategori]     → Papan Nama, Neon Box, Rambu, Huruf Timbul, Totem & Pylon,
                          Sticker Branding, Event Booth, dll.
/produk/[slug]          → Detail produk (spesifikasi, galeri, harga, CTA order)
/blog                   → Index blog (grid artikel + kategori/tag)
/blog/[slug]            → Detail artikel
/tentang-kami           → Company profile, garansi & support 24/7
/kontak                 → Form kontak + WhatsApp + peta lokasi
```

### Struktur Home (urutan section)

1. **Navbar** — logo, menu (Katalog, Blog, Tentang, Kontak), CTA button "Konsultasi Gratis"
2. **Hero** — headline besar (serif), sub-headline, CTA utama, visual produk unggulan
3. **Trust bar** — "Garansi Perbaikan", "Support 24/7", jumlah project selesai, dll.
4. **Kategori Produk** — grid 6-8 kategori dengan icon/foto
5. **Produk Unggulan** — 6 produk pilihan, card mewah
6. **Kenapa Pilih Kami** — 3-4 value proposition dengan icon minimalis
7. **Blog Terbaru** — 3 artikel terbaru untuk edukasi
8. **Testimoni** — carousel/quote elegan
9. **CTA Penutup** — ajakan konsultasi/order
10. **Footer** — kontak, sitemap mini, sosmed, copyright

---

## 6. Struktur Data Produk

Skema data (siap dipakai untuk JSON/CMS):

```ts
type Product = {
  slug: string;
  name: string;               // WAJIB sama persis dengan Kertajaya
  category: 'papan-nama' | 'neon-box' | 'rambu' | 'huruf-timbul'
          | 'totem-pylon' | 'sticker-branding' | 'event-booth' | 'lainnya';
  shortDescription: string;
  fullDescription: string;
  priceInfo: string;          // "Mulai dari Rp X" atau "Hubungi kami"
  images: string[];
  specifications?: { label: string; value: string }[];
  materials?: string[];
  warranty?: string;          // echo dari value prop "garansi perbaikan"
  relatedArticles?: string[]; // slug blog terkait
};
```

### Daftar Kategori Awal (dari referensi — lengkapi item per kategori setelah data lengkap didapat)

| Kategori | Placeholder jumlah produk | Status |
|---|---|---|
| Papan Nama | TODO | Menunggu data |
| Neon Box | TODO | Menunggu data |
| Rambu | TODO | Menunggu data |
| Huruf Timbul | TODO | Menunggu data |
| Totem & Pylon | TODO | Menunggu data |
| Sticker Branding | TODO | Menunggu data |
| Event Booth | TODO | Menunggu data |
| Lainnya | TODO | Menunggu data |

> Begitu kamu kirim data produk asli, tabel ini diisi lengkap (nama produk, harga, spesifikasi, foto) — 1:1 dengan Kertajaya.

---

## 7. Blog / Content Strategy

Tujuan blog: **edukasi calon customer** soal jenis-jenis signage, cara memilih, perawatan, tren, sehingga mereka lebih yakin order — sekaligus SEO untuk kata kunci seperti "neon box custom", "harga huruf timbul", dll.

**Kaidah penulisan artikel:**
- Judul menarik & spesifik (bukan generik), mengandung keyword yang orang cari.
- Struktur: Hook pembuka → Masalah/pertanyaan umum → Pembahasan (H2/H3) → Tips praktis → CTA lihat produk terkait.
- Sisipkan link internal ke halaman produk yang relevan di `/katalog`.
- Panjang ideal: 800–1500 kata, dengan gambar/ilustrasi tiap 2-3 paragraf.
- Nada tulisan: informatif tapi hangat, seperti konsultan yang membantu, bukan sales yang memaksa.

### 5 Contoh Artikel Blog (siap dikembangkan)

1. **"Neon Box vs Papan Nama Akrilik: Mana yang Lebih Cocok untuk Tokomu?"**
   - Kategori: Perbandingan Produk
   - Outline: Perbedaan material & biaya → Ketahanan (outdoor/indoor) → Efek visual di malam hari → Rekomendasi berdasarkan jenis usaha → CTA ke katalog Neon Box & Papan Nama
   - Keyword target: "neon box vs papan nama", "signage toko"

2. **"5 Kesalahan Umum Saat Pesan Huruf Timbul (dan Cara Menghindarinya)"**
   - Kategori: Tips & Edukasi
   - Outline: Kenapa huruf timbul populer → Kesalahan ukuran/proporsi → Kesalahan pemilihan material (galvanis vs akrilik vs stainless) → Kesalahan pencahayaan → Checklist sebelum order → CTA konsultasi
   - Keyword target: "huruf timbul custom", "cara pesan huruf timbul"

3. **"Panduan Memilih Totem & Pylon Sign yang Efektif Menarik Perhatian dari Jalan Raya"**
   - Kategori: Panduan Produk
   - Outline: Fungsi totem/pylon untuk visibilitas jarak jauh → Faktor ukuran & ketinggian ideal → Material tahan cuaca → Studi kasus penempatan yang salah vs benar → CTA lihat portofolio
   - Keyword target: "totem sign", "pylon sign harga"

4. **"Kenapa Garansi Perbaikan Itu Penting Saat Pilih Vendor Signage? Ini yang Perlu Kamu Tahu"**
   - Kategori: Edukasi Trust/Layanan
   - Outline: Risiko signage rusak (korsleting, cat pudar, LED mati) → Apa yang harus dicover garansi → Pertanyaan yang wajib ditanyakan ke vendor → Bagaimana support 24/7 membantu bisnis kamu → CTA hubungi tim
   - Keyword target: "garansi neon box", "servis signage"

5. **"Sticker Branding Kendaraan: Investasi Marketing Berjalan yang Sering Diremehkan UMKM"**
   - Kategori: Marketing & Branding
   - Outline: Konsep "moving billboard" → Estimasi jangkauan iklan sticker branding dibanding media lain → Jenis material sticker (vinyl, one-way vision, dll) → Tips desain agar eye-catching tapi tetap profesional → CTA lihat contoh project
   - Keyword target: "sticker branding mobil", "stiker branding usaha"

> Lima artikel ini bisa langsung dijadikan draft penuh (bukan cuma outline) begitu kamu konfirmasi — tinggal bilang "tulisin full artikelnya" dan aku buatkan versi lengkap siap publish untuk masing-masing.

---

## 8. SEO & Performance Checklist

- [ ] Semua produk & artikel punya `meta title` + `meta description` unik
- [ ] Structured data: `Product` schema di halaman produk, `Article` schema di blog
- [ ] Sitemap.xml & robots.txt otomatis (Next.js built-in)
- [ ] Gambar pakai `next/image`, format WebP, lazy loading
- [ ] Core Web Vitals: target LCP < 2.5s, CLS < 0.1 (diukur di simulasi koneksi mobile, bukan cuma desktop)
- [ ] Open Graph image custom untuk tiap halaman (biar bagus saat di-share)
- [ ] Breadcrumb navigation untuk katalog & blog
- [ ] Lulus Google **Mobile-Friendly Test** & responsive di semua breakpoint (lihat Section 3.5)
- [ ] Cek manual di HP asli (bukan cuma emulator): navbar, sticky CTA, grid produk, form kontak semua nyaman disentuh

---

## 9. Deployment

- Repo di-push ke GitHub → connect ke **Firebase Hosting** (sama seperti referensi Kertajaya) atau **Vercel** (lebih native untuk Next.js).
- Environment: staging (`staging.katalog.jasa` atau preview deploy) → production (`katalog.jasa`).
- Domain custom `katalog.jasa` diarahkan via DNS (A/CNAME record) ke hosting yang dipilih.

---

## 10. Next Steps

1. [ ] Kamu kirim data produk lengkap dari Kertajaya (nama, harga, spesifikasi, foto) → lengkapi Section 6.
2. [ ] Konfirmasi mau pakai artikel blog di atas apa adanya, atau ada topik lain yang lebih relevan.
3. [ ] Setup project Next.js + Tailwind + design tokens dari Section 3.
4. [ ] Build komponen dasar: Navbar, ProductCard, ArticleCard, Footer.
5. [ ] Build halaman Home → Katalog → Detail Produk → Blog → Kontak.
6. [ ] Isi konten produk & 5 artikel blog pertama.
7. [ ] QA (responsive, performance, SEO) → deploy ke `katalog.jasa`.

---

*Dokumen ini adalah living document — update terus seiring data produk asli dan keputusan desain final masuk.*
