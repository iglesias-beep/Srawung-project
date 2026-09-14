# Prompt UI/UX — Custom Signage E-Commerce (Versi Terang & Mewah)

Ini menggantikan arahan desain gelap sebelumnya. Copy-paste seluruh isi bagian **PROMPT** di bawah ke OpenCode. Jangan dipotong-potong, semua bagian saling berhubungan (token warna, tipografi, layout, elemen signature harus konsisten satu sama lain).

---

## PROMPT

Kamu adalah design lead di studio desain yang dikenal karena setiap klien mendapat identitas visual yang tidak bisa disamakan dengan brand lain. Rombak total UI/UX website custom signage ini. Target tampilan: **terang (bright), clear/bersih, dan mewah — BUKAN tema gelap/hitam**. Kesan yang dicari: seperti etalase butik premium yang terang benderang, bukan lounge malam.

### Subjek & Brand

Bisnis ini menjual **custom signage & printing fisik**: papan nama, neon box, huruf timbul 3D (akrilik/aluminium/stainless), totem & pylon sign, sticker branding, hingga event booth. Gunakan **data & konten produk nyata dari dua referensi ini** sebagai sumber, jangan buat produk fiktif baru:

- https://kertajaya-2ecd6.web.app/ — referensi tone brand & identitas
- https://katalog-bc7c4.web.app/ — referensi struktur katalog, nama produk, deskripsi, dan harga

Daftar kategori produk yang wajib ditampilkan (ambil dari referensi di atas): Papan Nama, Neon Box, Rambu-Rambu, Huruf Timbul, Totem & Pylon, Sticker Branding Mobil, Sticker Sandblast Kaca, Sticker Cutting, Event Booth, E Kiosk & Charger Point, Electric POP Display — lengkap dengan deskripsi singkat dan harga masing-masing (lihat `README.md` project untuk tabel lengkapnya).

Materialnya premium — logam, akrilik tebal, permukaan metalik, cahaya. Desain harus terasa seperti **plakat/etalase butik yang dipoles rapi di ruang terang** — presisi, bersih, sedikit berkilau di bagian material (brass/metalik), tapi tetap ringan dan approachable untuk semua kalangan.

### Token Desain (WAJIB dipakai konsisten di seluruh halaman)

**Warna — terang, bukan gelap:**
- `--bg-base: #F8F6F1` — latar utama, warm ivory/pearl (bukan putih pekat #FFFFFF yang terasa dingin & steril)
- `--bg-surface: #FFFFFF` — permukaan kartu, putih bersih untuk kontras & kesan "terangkat" dari latar ivory
- `--bg-elevated: #EFEADD` — elemen sedikit lebih dalam (hover state, section alternatif)
- `--text-primary: #1B2230` — teks utama, navy-charcoal gelap (bukan hitam pekat, biar tetap lembut)
- `--text-muted: #6B7280` — teks sekunder/caption
- `--accent-brass: #A9803D` — aksen brass/emas, dipakai untuk border tipis, ikon, highlight material premium (merepresentasikan logam signage)
- `--accent-emerald: #0E5C45` — aksen zamrud dalam, HANYA untuk CTA utama & elemen interaktif penting ("Tambah Keranjang", "Pesan Sekarang", link aktif) — pilih warna ini secara sengaja, JANGAN pakai terracotta/oranye-clay sebagai warna aksen karena itu sudah jadi default AI generik

Filosofi warna: brass = material produk (logam, huruf timbul, plakat), emerald = aksen hidup/aksi (seperti neon hijau butik premium). Kombinasi ivory + brass + emerald harus terasa "butik mewah yang terang", bukan template cream+terracotta yang umum dipakai AI.

**Tipografi:**
- Display/headline: **Bricolage Grotesque** (variable font, karakter tegas dan "dipahat" — cocok karena bentuknya sendiri terasa seperti huruf custom-cut, menyambung ke produk huruf timbul)
- Body: **Inter** atau **General Sans** — netral, sangat mudah dibaca
- Headline besar (48–96px desktop, scale down proporsional di mobile) dengan letter-spacing negatif tipis biar terasa presisi
- Angka harga pakai tabular numbers agar rapi sejajar di kartu produk

**Layout:**
- Grid presisi, spacing konsisten skala 4px/8px, banyak white space — jangan padat, biarkan konten "bernapas"
- Section beranda: hero → kategori produk (grid asimetris) → kenapa pilih kami → **blog edukasi** → testimoni → footer
- Kartu produk: gambar besar rasio konsisten di atas kartu putih bersih dengan shadow lembut (bukan border gelap), border brass 1px muncul saat hover
- Header sticky, background ivory transparan tipis dengan blur saat scroll (bukan solid gelap)

**Elemen Signature (WAJIB ada):**
Buat treatment headline hero dengan efek **"huruf timbul" (raised/embossed 3D letters)** ala plakat logam yang dipasang di dinding terang — gunakan layered `text-shadow` terang di atas kiri (highlight) dan shadow lembut di bawah kanan (depth), sehingga huruf terlihat timbul dan memantulkan cahaya ruangan. Ini elemen paling mewah di halaman, hanya dipakai di headline hero dan label section penting — jangan berlebihan.

### Fitur Blog (WAJIB ada — halaman baru)

Tambahkan section **Blog Edukasi** di beranda + halaman `/blog` penuh, mengikuti struktur referensi:
- Kartu artikel: kategori (misal "Perbandingan Produk", "Tips & Edukasi", "Panduan Produk"), tanggal terbit, estimasi waktu baca, judul, ringkasan singkat, tombol "Baca selengkapnya"
- Halaman detail artikel `/blog/[slug]` dengan konten lengkap, gambar cover, dan artikel terkait di bagian bawah
- Gunakan tone edukatif yang membantu calon pembeli memahami produk sebelum memesan (contoh topik dari referensi: perbandingan neon box vs papan nama akrilik, kesalahan umum pesan huruf timbul, panduan memilih totem & pylon sign)
- Desain kartu blog tetap pakai token warna yang sama (ivory + brass + emerald), bukan skema warna terpisah

### Aturan Ketat

1. **Dilarang** menggunakan tema gelap/hitam sama sekali — semua background dasar harus terang (ivory/putih).
2. **Dilarang** memakai warna terracotta/oranye-clay sebagai aksen utama — pakai emerald sesuai token di atas.
3. **Jangan** pakai layout section generik "3 kolom fitur ikon bulat + judul + paragraf" tanpa variasi visual (ukuran/border/alignment beda).
4. **Jangan** pakai badge angka urut (01/02/03) kecuali kontennya memang proses/tahapan bertahap.
5. Hanya SATU CTA emerald yang paling dominan per section — jangan semua tombol berwarna sama, nanti kehilangan hierarki.
6. Foto produk jadi hero visual di kartu — besar dan tajam, kontras cukup terhadap background terang, bukan thumbnail kecil terjepit teks.
7. Wajib **fully responsive** dan nyaman diakses dari HP Android (Chrome Android), target tap area tombol minimal 44x44px.
8. Hormati `prefers-reduced-motion`. Kontras warna tetap harus lolos WCAG AA meskipun temanya terang & lembut — teks jangan sampai kurang kontras karena warna ivory terlalu muda.

### Proses yang Diminta

1. Sebelum menulis kode: tuliskan rencana desain singkat — konfirmasi token warna & tipografi di atas, buat ASCII wireframe untuk hero dan grid kategori produk.
2. Review rencana itu sendiri — apakah ada bagian yang terasa generik/template AI (terutama kombinasi cream+terracotta yang harus dihindari)? Revisi kalau ada.
3. Bangun design system dulu (warna, tipografi, spacing sebagai Tailwind config/CSS variables), lalu komponen dasar (Button, Card, Badge, ArticleCard), baru halaman penuh.
4. Setelah satu halaman selesai, kritik ulang: apakah benar-benar terasa "terang, bersih, dan mewah", atau masih terasa flat/generik?

### Output yang Diharapkan

Terapkan sistem desain di atas secara konsisten di:
1. Halaman Beranda (termasuk section blog)
2. Halaman Katalog (list produk + filter kategori, data dari referensi)
3. Halaman Detail Produk
4. Halaman Blog (list + detail artikel)
5. Halaman Keranjang
6. Halaman Login/Register
7. Dashboard Admin (tetap ivory/brass/emerald, tapi lebih fungsional/padat data untuk kelola produk, kategori, blog, dan pesanan)

---

## Cara Pakai

1. Pastikan project Next.js + TypeScript + Tailwind CSS + shadcn/ui sudah ter-setup (sesuai `README.md`).
2. Buka OpenCode di root project, paste bagian **PROMPT** di atas.
3. Kalau ada bagian yang masih terasa generik atau kurang "mewah", tunjuk bagian spesifiknya saat minta revisi — jangan minta ulang semua biar konsistensi desain yang sudah bagus tidak hilang.
4. Setelah desain dasar jadi, cek tampilan di Chrome Android (atau resize browser selebar HP) sebelum lanjut ke fitur berikutnya.
