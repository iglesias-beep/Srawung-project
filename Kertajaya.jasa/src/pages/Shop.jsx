import { useMemo, useState } from "react";
import { useData } from "../context/DataContext";
import { ProductCard, PageHead } from "../components/ui";

const INFO = [
  {
    ico: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M1 6h14v9H1zM15 9h4l3 3v3h-7z" />
        <circle cx="5.5" cy="17.5" r="1.8" />
        <circle cx="17.5" cy="17.5" r="1.8" />
      </svg>
    ),
    judul: "Gratis Ongkir Sidoarjo",
    teks: "Gratis pengiriman ke seluruh wilayah Sidoarjo untuk pesanan barang custom. Syarat & ketentuan berlaku.",
  },
  {
    ico: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2.5" y="5" width="19" height="14" rx="2" />
        <path d="M2.5 10h19" />
        <path d="M6.5 15h.01M10.5 15h2" />
      </svg>
    ),
    judul: "Pembayaran Fleksibel",
    teks: "Transfer bank, e-wallet (DANA, OVO, GoPay), atau sesuai kesepakatan dengan tim kami.",
  },
  {
    ico: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 4h16v12H8l-4 4V4z" />
        <path d="M8 9h8M8 12h5" />
      </svg>
    ),
    judul: "Cara Pesan Mudah",
    teks: "Order via WhatsApp, Instagram, atau telepon. Tim kami siap membantu dari desain hingga jadi.",
  },
  {
    ico: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2l8 4v6c0 5-3.4 8.9-8 10-4.6-1.1-8-5-8-10V6l8-4z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    judul: "Harga Custom Fleksibel",
    teks: "Harga produk tergantung bahan baku, ukuran, jumlah, dan tingkat kesulitan pengerjaan.",
  },
];

export default function Shop() {
  const { products, listCategories } = useData();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");
  const categories = useMemo(() => listCategories(), [listCategories]);

  const hasil = useMemo(() => {
    const query = q.trim().toLowerCase();
    return products.filter((p) => {
      const matchCat = !cat || p.cat === cat;
      const matchQ =
        !query ||
        p.nama.toLowerCase().includes(query) ||
        p.cat.toLowerCase().includes(query);
      return matchCat && matchQ;
    });
  }, [q, cat, products]);

  return (
    <>
      <PageHead crumb="Toko" title="Katalog Barang Custom" />

      <section className="section">
        <div className="container">
          <div className="shop-toolbar">
            <div className="search-box">
              <span className="icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" />
                </svg>
              </span>
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Cari produk... mis. papan nama, neon box, sticker"
                aria-label="Cari produk"
              />
            </div>
            <div className="chips">
              <button
                className={"chip" + (cat === "" ? " active" : "")}
                onClick={() => setCat("")}
              >
                Semua
              </button>
              {categories.map((c) => (
                <button
                  key={c}
                  className={"chip" + (cat === c ? " active" : "")}
                  onClick={() => setCat(cat === c ? "" : c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <p className="result-info">
            {hasil.length > 0
              ? `Menampilkan ${hasil.length} dari ${products.length} produk`
              : ""}
          </p>

          {hasil.length === 0 ? (
            <div className="empty-state">
              <div className="big">🛒</div>
              <p>
                Produk tidak ditemukan. Coba kata kunci lain atau hubungi kami via WhatsApp.
              </p>
            </div>
          ) : (
            <div className="product-grid">
              {hasil.map((p) => <ProductCard key={p.id} p={p} />)}
            </div>
          )}
        </div>
      </section>

      {/* Info pengiriman & pembayaran */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <span className="kicker">Informasi</span>
            <h2>Pengiriman &amp; Pembayaran</h2>
            <p>Pastikan kebutuhan Anda terpenuhi dengan mudah. Berikut info pengiriman dan pembayaran yang kami layani.</p>
          </div>
          <div className="feature-grid">
            {INFO.map((f) => (
              <div className="feature-card" key={f.judul}>
                <div className="ico">{f.ico}</div>
                <h3>{f.judul}</h3>
                <p>{f.teks}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
