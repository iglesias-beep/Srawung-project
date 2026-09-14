# Borongjasa — Website Custom Sign & Printing

Dokumen ini adalah **prompt/spesifikasi project** untuk dipakai sebagai acuan development (bisa langsung dipakai sebagai instruksi ke AI coding tool seperti Claude Code).

---

## 1. Ringkasan Project

**Nama Toko:** Borongjasa
**Jenis Produk:** Sign custom (papan nama, neon box, huruf timbul, totem & pylon, rambu, sticker branding, event booth, dan produk custom signage lainnya)
**Tujuan Website:**
- Katalog produk untuk calon pelanggan
- Sistem login untuk user (pelanggan)
- Sistem login untuk admin dengan dashboard CRUD produk
- Deploy ke Firebase Hosting, database pakai Firestore

> Catatan: referensi kategori produk diambil dari toko sejenis (kertajaya-2ecd6.web.app/toko) — **hanya sebagai referensi jenis produk**, bukan referensi desain/UI/UX. Desain harus original.

---

## 2. Tech Stack

| Layer | Teknologi |
|---|---|
| Frontend | React (Vite) atau Next.js — pilih salah satu, disarankan **React + Vite** untuk SPA ringan |
| Styling | Tailwind CSS |
| Database | Firebase Firestore |
| Auth | Firebase Authentication (Email/Password, opsional Google Sign-In) |
| Storage | Firebase Storage (untuk gambar produk) |
| Hosting/Deploy | Firebase Hosting |
| State Management | React Context / Zustand (ringan, sesuai kebutuhan) |

---

## 3. Role & Autentikasi

Dua jenis akun dengan hak akses berbeda:

### a. User (Pelanggan)
- Register & login (email/password)
- Melihat katalog produk
- Melihat detail produk
- (Opsional) Simpan produk favorit / wishlist
- (Opsional) Ajukan pesanan / request custom order
- Melihat riwayat pesanan sendiri

### b. Admin
- Login khusus admin (role dibedakan lewat field `role: "admin"` di Firestore collection `users`, atau custom claims Firebase Auth)
- Redirect otomatis ke **Admin Dashboard** setelah login jika role = admin
- Tidak bisa diakses oleh user biasa (proteksi via Firestore Security Rules + route guard di frontend)

---

## 4. Fitur Admin Dashboard (CRUD)

Dashboard admin terpisah dari tampilan user, dengan sidebar navigasi. Fitur:

- **Create** — tambah produk baru (nama, kategori, deskripsi, harga/estimasi harga, upload gambar, status stok/tersedia)
- **Read** — lihat semua produk dalam bentuk tabel/list dengan search & filter kategori
- **Update** — edit data produk yang sudah ada
- **Delete** — hapus produk (dengan konfirmasi sebelum hapus)
- **Manajemen Kategori** — tambah/edit/hapus kategori produk (papan nama, neon box, huruf timbul, dst)
- **(Opsional) Manajemen Pesanan** — lihat daftar order masuk dari user, ubah status (pending/diproses/selesai)
- **(Opsional) Manajemen User** — lihat daftar user terdaftar

---

## 5. Struktur Halaman (Sitemap)

**Public / User:**
- `/` — Landing page (hero, kategori unggulan, produk populer, CTA)
- `/produk` — Katalog semua produk (dengan filter kategori & search)
- `/produk/:id` — Detail produk
- `/login` — Login user
- `/register` — Registrasi user
- `/tentang` — Tentang Borongjasa
- `/kontak` — Kontak / form konsultasi

**Admin:**
- `/admin/login` — Login khusus admin
- `/admin/dashboard` — Ringkasan (jumlah produk, kategori, pesanan)
- `/admin/produk` — Kelola produk (CRUD)
- `/admin/kategori` — Kelola kategori
- `/admin/pesanan` — Kelola pesanan *(opsional)*

---

## 6. Desain UI/UX

**Prinsip desain:**
- Bersih (clean), tidak ramai, whitespace cukup lega
- Terasa **premium/mewah** tapi tetap mudah dipahami semua kalangan usia
- **Background TIDAK boleh warna coklat** — gunakan palet netral premium, contoh:
  - Base: putih / off-white (`#FAFAFA`, `#F5F5F3`) atau dark elegant (`#0F1115`, `#12141A`) jika ingin tema gelap
  - Aksen mewah (tanpa emas/gold): navy (`#1C2B3A`), charcoal (`#22252B`), abu-abu gelap (`#2E333D`), atau steel blue (`#3A4A5C`) untuk kesan premium & profesional
  - Hindari warna coklat/earthy tone dan emas/gold sebagai warna utama background maupun aksen
- Tipografi: satu font elegan untuk heading (contoh: Playfair Display / Cormorant untuk kesan mewah) + satu font sans-serif clean untuk body (contoh: Inter / Poppins)
- Gunakan foto produk berkualitas tinggi dengan banyak white space di sekitarnya
- Tombol/CTA jelas, kontras cukup, rounded-corner moderat (jangan terlalu playful/childish)
- Micro-interaction halus (hover effect, transition) untuk kesan premium tanpa berlebihan

**Wajib Mobile Friendly:**
- Fully responsive (mobile-first approach)
- Navigasi mobile pakai hamburger menu / bottom nav
- Tabel di admin dashboard tetap bisa discroll horizontal di layar kecil
- Ukuran tombol & tap target sesuai standar mobile (min 44x44px)
- Test tampilan di breakpoint: mobile (< 640px), tablet (640–1024px), desktop (> 1024px)

---

## 7. Struktur Data Firestore

```
users (collection)
  └── {uid}
        - name: string
        - email: string
        - role: "user" | "admin"
        - createdAt: timestamp

categories (collection)
  └── {categoryId}
        - name: string          // contoh: "Neon Box", "Huruf Timbul"
        - slug: string
        - createdAt: timestamp

products (collection)
  └── {productId}
        - name: string
        - categoryId: string
        - description: string
        - priceEstimate: string | number
        - images: array<string>   // URL dari Firebase Storage
        - isAvailable: boolean
        - createdAt: timestamp
        - updatedAt: timestamp

orders (collection)  // opsional
  └── {orderId}
        - userId: string
        - productId: string
        - status: "pending" | "diproses" | "selesai"
        - note: string
        - createdAt: timestamp
```

**Firestore Security Rules (garis besar):**
- `products` & `categories` — read: public, write: hanya role admin
- `users` — read/write: hanya milik sendiri, admin bisa baca semua
- `orders` — user hanya bisa baca/tulis order miliknya, admin bisa baca/update semua

---

## 8. Daftar Kategori Produk (referensi)

Berdasarkan riset kategori sign custom pada umumnya:
- Papan Nama
- Neon Box
- Huruf Timbul
- Totem & Pylon
- Rambu / Signage Petunjuk
- Sticker Branding
- Event Booth
- Custom lainnya (sesuaikan dengan kebutuhan Borongjasa)

*(Silakan sesuaikan/ tambahkan kategori sesuai produk asli Borongjasa.)*

---

## 9. Deployment

1. Setup project Firebase (Firestore, Authentication, Storage, Hosting)
2. Build frontend (`npm run build`)
3. Deploy via `firebase deploy`
4. Setup custom domain (opsional) di Firebase Hosting

---

## 10. Prioritas Development (Saran Urutan)

1. Setup project + koneksi Firebase (Auth, Firestore, Storage)
2. Struktur folder & routing dasar
3. Autentikasi user & admin + proteksi route
4. Halaman katalog produk (read-only dulu)
5. Admin dashboard CRUD produk & kategori
6. Landing page + detail produk (UI premium)
7. Fitur pesanan (opsional)
8. Responsive check di semua device
9. Testing & deploy ke Firebase Hosting
