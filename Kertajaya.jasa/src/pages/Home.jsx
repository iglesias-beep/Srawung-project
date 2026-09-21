import { Link } from "react-router-dom";
import { useData } from "../context/DataContext";
import { waLink } from "../data/site";
import { ProductCard } from "../components/ui";

const FEATURES = [
  {
    ico: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3l7 3v5c0 4.4-3 8.4-7 10-4-1.6-7-5.6-7-10V6l7-3z" />
        <path d="M8.5 12l2.4 2.4 4.6-4.8" />
      </svg>
    ),
    judul: "Kualitas Terjamin",
    teks: "Kualitas bahan baku dan pengerjaan terjamin untuk setiap barang custom yang kami produksi.",
  },
  {
    ico: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4L15 12l-3-3 2.7-2.7z" />
      </svg>
    ),
    judul: "Garansi Perbaikan",
    teks: "Garansi perbaikan jika barang tidak sesuai permintaan atau terdapat kerusakan pengerjaan.",
  },
  {
    ico: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M1 6h14v9H1zM15 9h4l3 3v3h-7z" />
        <circle cx="5.5" cy="17.5" r="1.8" />
        <circle cx="17.5" cy="17.5" r="1.8" />
      </svg>
    ),
    judul: "Gratis Pengiriman",
    teks: "Gratis pengiriman ke seluruh wilayah Sidoarjo, dan pengiriman ke seluruh provinsi Indonesia.",
  },
  {
    ico: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 13a8 8 0 0 1 16 0" />
        <path d="M3 13h3v6H3zM18 13h3v6h-3z" />
        <path d="M21 17v1.5A2.5 2.5 0 0 1 18.5 21H15" />
      </svg>
    ),
    judul: "Support 24/7",
    teks: "Kami siap memberikan konsultasi dan support 24 jam untuk kebutuhan barang custom Anda.",
  },
];

const TESTIMONI = [
  { inisial: "RA", nama: "Raka A.", peran: "Owner Kafe", teks: "Neon box pesananku selesai lebih cepat dari jadwal dan hasilnya rapi banget. Tim Kertajaya komunikatif, mulai dari desain sampai pemasangan. Recommended!" },
  { inisial: "SP", nama: "Sari P.", peran: "Marketing Perusahaan", teks: "Pesan papan nama dan huruf timbul untuk kantor. Hasilnya premium, harga sesuai, dan ada garansi kalau ada yang kurang. Sangat puas!" },
  { inisial: "BY", nama: "Bagas Y.", peran: "Event Organizer", teks: "Event booth dan branding untuk acara kami dibuat berkualitas dan diantar tepat waktu. Support-nya cepat, bahkan di luar jam kerja." },
];

export default function Home() {
  const { products, articles } = useData();
  const unggulan = products.filter((p) => p.unggulan);
  const artikel = articles.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-decor hero-decor-1" />
        <div className="hero-decor hero-decor-2" />
        <div className="hero-decor hero-decor-3" />
        <div className="hero-decor hero-decor-4" />

        <div className="container">
          <div className="hero-content">
            <h1>
              Solusi <span className="hl">Signage</span> &amp; Branding Custom Terpercaya
            </h1>
            <p>
              Kertajaya melayani papan nama, neon box, rambu, huruf timbul, totem &amp;
              pylon sign, sticker branding mobil, hingga event booth. Gratis konsultasi, garansi
              perbaikan, dan support 24/7.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-primary btn-lg" to="/toko">Lihat Katalog Produk →</Link>
              <Link className="btn btn-outline-light btn-lg" to="/kontak">Hubungi Kami</Link>
            </div>
            <div className="hero-trust">
              <div className="trust-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 3l7 3v5c0 4.4-3 8.4-7 10-4-1.6-7-5.6-7-10V6l7-3z" />
                  <path d="M8.5 12l2.4 2.4 4.6-4.8" />
                </svg>
                <span>Garansi Perbaikan</span>
              </div>
              <div className="trust-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M1 6h14v9H1zM15 9h4l3 3v3h-7z" />
                  <circle cx="5.5" cy="17.5" r="1.8" />
                  <circle cx="17.5" cy="17.5" r="1.8" />
                </svg>
                <span>Gratis Pengiriman</span>
              </div>
              <div className="trust-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 13a8 8 0 0 1 16 0" />
                  <path d="M3 13h3v6H3zM18 13h3v6h-3z" />
                  <path d="M21 17v1.5A2.5 2.5 0 0 1 18.5 21H15" />
                </svg>
                <span>Support 24/7</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-testi-float">
          <div className="stars">★★★★★</div>
          <p>"{TESTIMONI[0].teks}"</p>
          <footer>
            <div className="avatar">{TESTIMONI[0].inisial}</div>
            <div>
              <strong>{TESTIMONI[0].nama}</strong>
              <small>{TESTIMONI[0].peran}</small>
            </div>
          </footer>
        </div>
      </section>

      {/* Fitur */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="kicker">Kenapa Kertajaya?</span>
            <h2>Kenyamanan Berbelanja Barang Custom di Satu Tempat</h2>
            <p>Kami membantu Anda mendapatkan barang custom yang tepat, berkualitas, dan sesuai anggaran.</p>
          </div>
          <div className="feature-grid">
            {FEATURES.map((f) => (
              <div className="feature-card" key={f.judul}>
                <div className="ico">{f.ico}</div>
                <h3>{f.judul}</h3>
                <p>{f.teks}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Produk unggulan */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head-row">
            <div>
              <span className="kicker">Produk Unggulan</span>
              <h2>Produk Custom Favorit</h2>
            </div>
            <Link className="link-all" to="/toko">Lihat Semua Produk &rarr;</Link>
          </div>
          <div className="product-grid">
            {unggulan.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        </div>
      </section>

      {/* Blog terbaru */}
      <section className="section">
        <div className="container">
          <div className="section-head-row">
            <div>
              <span className="kicker">Dari Blog</span>
              <h2>Tips &amp; Panduan Barang Custom</h2>
            </div>
            <Link className="link-all" to="/blog">Semua Artikel &rarr;</Link>
          </div>
          <div className="blog-grid">
            {artikel.map((a) => (
              <article className="blog-card" key={a.slug}>
                <div className="thumb">
                  <img src={a.image} alt={a.title} loading="lazy" />
                </div>
                <div className="blog-body">
                  <div className="blog-meta">
                    <span>{a.kategori}</span>
                    <span>&middot; {a.baca} baca</span>
                  </div>
                  <h3>{a.title}</h3>
                  <p>{a.intro}</p>
                  <Link className="read-more" to={`/blog/${a.slug}`}>Baca Selengkapnya &rarr;</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Testimoni */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <span className="kicker">Testimoni</span>
            <h2>Apa Kata Pelanggan Kami</h2>
          </div>
          <div className="testi-grid">
            {TESTIMONI.map((t) => (
              <div className="testi-card" key={t.nama}>
                <div className="stars">★★★★★</div>
                <p>"{t.teks}"</p>
                <footer>
                  <div className="avatar">{t.inisial}</div>
                  <div>
                    <strong>{t.nama}</strong>
                    <small>{t.peran}</small>
                  </div>
                </footer>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
