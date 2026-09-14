# Prompt UI/UX — Custom Signage E-Commerce

Copy-paste seluruh isi file ini ke OpenCode sebagai instruksi desain. Jangan dipotong-potong, karena setiap bagian saling berhubungan (token warna, tipografi, layout, dan elemen signature harus konsisten).

---

## PROMPT

Kamu adalah design lead di studio desain yang dikenal karena setiap klien mendapat identitas visual yang tidak bisa disamakan dengan brand lain. Rombak total UI/UX website custom signage ini — bukan sekadar rapikan spacing, tapi bangun sistem desain yang utuh dan disiplin. Tampilan saat ini berantakan; targetnya adalah **clean, mewah, dan mudah dipahami semua kalangan**.

### Subjek & Brand

Bisnis ini menjual **custom signage & printing fisik**: papan nama, neon box, huruf timbul 3D (akrilik/aluminium/stainless), totem & pylon sign, sticker branding, hingga event booth. Materialnya premium — logam, akrilik tebal, cahaya neon, permukaan metalik. Desain website harus **terasa seperti produknya sendiri**: presisi, solid, dan sedikit "menyala" — bukan template e-commerce generik.

### Token Desain (WAJIB dipakai konsisten di seluruh halaman)

**Warna:**
- `--bg-base: #10131A` — latar utama, near-black kebiruan (bukan hitam pekat, biar tidak terasa flat)
- `--bg-surface: #171B24` — permukaan kartu/section, sedikit lebih terang dari base
- `--bg-elevated: #1F2430` — elemen terangkat (modal, dropdown, hover state)
- `--text-primary: #F2F0EA` — teks utama, off-white hangat (bukan putih pekat)
- `--text-muted: #8D93A3` — teks sekunder/caption
- `--accent-brass: #C9A24E` — aksen emas/kuningan, dipakai untuk highlight material premium, border tipis, ikon
- `--accent-glow: #FF8A3D` — aksen "menyala" seperti neon sign, HANYA untuk CTA utama & elemen interaktif penting (tombol "Tambah Keranjang", "Pesan Sekarang", link aktif)

Jangan pakai gradient generik atau warna terracotta/cream template AI pada umumnya. Kontras warna brass/glow terhadap background gelap harus terasa seperti signage menyala di malam hari — itu adalah metafora visual utama brand ini.

**Tipografi:**
- Display/headline: **Bricolage Grotesque** (variable font, karakter tegas dan sedikit "dipahat" — cocok karena bentuknya sendiri terasa seperti huruf custom-cut, menyambung ke produk "huruf timbul")
- Body: **Inter** atau **General Sans** — netral, sangat mudah dibaca di semua ukuran layar
- Skala tipe: headline besar (48–96px di desktop, scale down proporsional di mobile), gunakan letter-spacing negatif tipis di headline besar biar terasa presisi/mahal
- Angka harga selalu pakai tabular numbers agar rapi saat sejajar di kartu produk

**Layout:**
- Grid presisi dengan spacing konsisten (pakai skala 4px/8px), banyak white space — jangan padat
- Section beranda: hero → kategori produk (grid asimetris, bukan grid kotak rata semua) → kenapa pilih kami → testimoni → footer
- Kartu produk: rasio gambar konsisten, border tipis `--accent-brass` di 1px pada hover (bukan shadow tebal generik), transisi halus
- Header sticky, transparan di atas hero lalu solid saat scroll

**Elemen Signature (WAJIB ada, ini yang membedakan desain ini dari template lain):**
Buat treatment teks headline hero dengan efek **"huruf timbul" (raised/embossed 3D letters)** menggunakan layered `text-shadow` atau `-webkit-text-stroke` + shadow bertingkat, mensimulasikan huruf logam timbul yang kena cahaya dari atas. Ini elemen paling mewah di halaman dan langsung merepresentasikan produk inti bisnis (huruf timbul custom). Jangan dipakai berlebihan di semua teks — hanya di headline hero dan mungkin angka/label section penting.

### Aturan Ketat

1. **Jangan** pakai layout section generik "3 kolom fitur dengan ikon bulat + judul + paragraf" tanpa alasan — kalau dipakai, beri variasi visual (border, ukuran beda, alignment beda).
2. **Jangan** pakai badge angka urut (01/02/03) kecuali kontennya memang berupa proses/tahapan (misal: alur pemesanan).
3. Semua CTA (tombol utama) pakai `--accent-glow`, dan hanya SATU CTA glow yang paling dominan per section — jangan semua tombol menyala sekaligus, nanti terasa murah.
4. Foto produk harus jadi hero visual di kartu produk — besar, kontras tinggi terhadap background gelap, bukan thumbnail kecil terjepit teks.
5. Wajib **fully responsive** dan nyaman diakses dari HP Android (Chrome Android) — target tap area tombol minimal 44x44px, teks tidak perlu di-zoom untuk dibaca.
6. Hormati `prefers-reduced-motion` — animasi/hover halus tapi bisa dimatikan untuk user yang butuh.
7. Kontras warna harus lolos standar aksesibilitas (WCAG AA) meskipun temanya gelap & mewah — teks tetap harus mudah dibaca oleh semua kalangan.

### Proses yang Diminta

1. Sebelum menulis kode, tuliskan dulu rencana desain singkat: konfirmasi token warna & tipografi di atas, buat ASCII wireframe untuk struktur hero dan grid kategori produk.
2. Review rencana itu sendiri — apakah ada bagian yang terasa seperti template generik? Kalau ada, revisi dan jelaskan kenapa.
3. Baru bangun komponen: mulai dari design system (warna, tipografi, spacing sebagai CSS variables/Tailwind config), lalu komponen dasar (Button, Card, Badge), baru halaman penuh.
4. Setelah selesai satu halaman, kritik ulang hasilnya sendiri sebelum lanjut ke halaman berikutnya — apakah tampilannya benar-benar "mewah dan clean", atau masih berantakan/generik?

### Output yang Diharapkan

Terapkan sistem desain di atas secara konsisten mulai dari:
1. Halaman Beranda
2. Halaman Katalog (list produk + filter kategori)
3. Halaman Detail Produk
4. Halaman Keranjang
5. Halaman Login/Register
6. Dashboard Admin (tetap mewah tapi lebih fungsional/padat data, tetap pakai token warna & tipografi yang sama)

---

## Cara Pakai

1. Pastikan project Next.js + TypeScript + Tailwind CSS + shadcn/ui sudah ter-setup (sesuai `README.md`).
2. Buka OpenCode di root project, paste prompt di atas (bagian "PROMPT" saja).
3. Kalau OpenCode menghasilkan sesuatu yang masih terasa generik di satu bagian, tunjuk bagian spesifiknya dan minta revisi — jangan minta "buat ulang semua", karena akan kehilangan konsistensi yang sudah bagus di bagian lain.
4. Setelah desain dasar jadi, cek tampilannya di Chrome Android (atau resize browser ke lebar HP) sebelum lanjut ke fitur berikutnya.
