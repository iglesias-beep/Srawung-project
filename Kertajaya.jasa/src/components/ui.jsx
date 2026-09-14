import { Link } from "react-router-dom";
import { useState } from "react";
import { formatRp, imgProduk } from "../data/products";
import { waLink } from "../data/site";
import { CLIENTS } from "../data/clients";
import { useCart } from "../context/CartContext";

export function statusStok(stok) {
  if (stok <= 0) return { label: "Stok Habis", kelas: "habis" };
  if (stok <= 10) return { label: `Sisa ${stok}`, kelas: "menipis" };
  return { label: `Stok ${stok}`, kelas: "tersedia" };
}

export function ProductCard({ p }) {
  const { addItem } = useCart();
  const stok = statusStok(p.stok ?? 0);
  const habis = p.stok <= 0;

  return (
    <article className="product-card">
      <div className="thumb">
        <img src={p.gambar || imgProduk(p.id)} alt={p.nama} loading="lazy" />
        <span className={"stock-badge " + stok.kelas}>{stok.label}</span>
      </div>
      <div className="product-body">
        <span className="product-cat">{p.cat}</span>
        <h3>{p.nama}</h3>
        <div className="product-price">
          {formatRp(p.harga)} <span className="unit">/ {p.satuan}</span>
        </div>
        <div className="card-actions">
          <button
            className="btn btn-primary"
            onClick={() => addItem(p.id)}
            disabled={habis}
            aria-label={`Tambah ${p.nama} ke keranjang`}
          >
            {habis ? "Stok Habis" : "+ Keranjang"}
          </button>
        </div>
      </div>
    </article>
  );
}

export function ClientMarquee() {
  // Duplicate list for seamless infinite loop (original + copy)
  const row1 = [...CLIENTS, ...CLIENTS];
  // Second row: offset by half, reversed direction
  const row2 = [...[...CLIENTS].reverse(), ...[...CLIENTS].reverse()];

  function LogoCard({ c }) {
    const [imgError, setImgError] = useState(false);
    return (
      <span className="client-logo" title={c.nama}>
        {c.logo && !imgError ? (
          <img
            className="client-img"
            src={c.logo}
            alt={`Logo ${c.nama}`}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="client-mark" style={{ background: c.warna }}>
            {c.emoji || c.nama.charAt(0)}
          </span>
        )}
        <span className="client-name">{c.nama}</span>
      </span>
    );
  }

  return (
    <section className="section section-alt clients">
      <div className="container">
        <div className="section-head">
          <span className="kicker">Client Kami</span>
          <h2>Dipercaya BUMN &amp; Brand Ternama</h2>
          <p>
            Barang custom dari Kertajaya dipercaya berbagai perusahaan,
            BUMN, dan brand ternama di Indonesia.
          </p>
        </div>
      </div>

      {/* Row 1 – kanan ke kiri */}
      <div className="marquee">
        <div className="marquee-track marquee-ltr">
          {row1.map((c, i) => (
            <LogoCard c={c} idx={i} key={`r1-${i}`} />
          ))}
        </div>
      </div>

      {/* Row 2 – kiri ke kanan (berlawanan) */}
      <div className="marquee" style={{ marginTop: "0.9rem" }}>
        <div className="marquee-track marquee-rtl">
          {row2.map((c, i) => (
            <LogoCard c={c} idx={i} key={`r2-${i}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaBand({ title, text, pesan }) {
  return (
    <section className="cta-band">
      <div className="container">
        <h2>{title}</h2>
        <p>{text}</p>
        <a className="btn btn-white btn-lg" href={waLink(pesan)} target="_blank" rel="noreferrer">
          💬 Chat WhatsApp Sekarang
        </a>
      </div>
    </section>
  );
}

export function PageHead({ crumb, crumbLink, title }) {
  return (
    <section className="page-head">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Beranda</Link> &rsaquo;{" "}
          {crumbLink ? (
            <>
              <Link to={crumbLink}>{crumb}</Link> &rsaquo; {title}
            </>
          ) : (
            crumb
          )}
        </div>
        <h1>{title}</h1>
      </div>
    </section>
  );
}
