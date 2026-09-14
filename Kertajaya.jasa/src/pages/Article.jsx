import { Link, useParams } from "react-router-dom";
import { useData } from "../context/DataContext";
import { waLink } from "../data/site";
import { CtaBand, PageHead } from "../components/ui";
import PromoTeman from "../components/PromoTeman";
import NotFound from "./NotFound";

function Block({ b, i }) {
  switch (b.type) {
    case "h2":
      return <h2 id={`bagian-${i}`}>{b.text}</h2>;
    case "h3":
      return <h3>{b.text}</h3>;
    case "p":
      return <p>{b.text}</p>;
    case "ul":
      return (
        <ul>
          {b.items.map((it, i) => <li key={i}>{it}</li>)}
        </ul>
      );
    case "ol":
      return (
        <ol>
          {b.items.map((it, i) => <li key={i}>{it}</li>)}
        </ol>
      );
    case "table":
      return (
        <table>
          <thead>
            <tr>{b.head.map((h, i) => <th key={i}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {b.rows.map((r, i) => (
              <tr key={i}>
                {r.map((c, j) => (j === 0 ? <td key={j}><strong>{c}</strong></td> : <td key={j}>{c}</td>))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    case "callout":
      return (
        <div className="callout">
          <strong>{b.strong}</strong> {b.text}
        </div>
      );
    default:
      return null;
  }
}

export default function Article() {
  const { slug } = useParams();
  const { articles } = useData();
  const article = articles.find((a) => a.slug === slug);

  if (!article) return <NotFound />;

  const judulH2 = article.blocks.map((b, i) => ({ ...b, i })).filter((b) => b.type === "h2");
  const lainnya = articles.filter((a) => a.slug !== slug).slice(0, 2);

  return (
    <>
      <PageHead crumb="Blog" crumbLink="/blog" title={article.kategori} />

      <section className="section">
        <div className="container article-wrap">
          <article>
            <h1 className="article-title">{article.title}</h1>
            <div className="article-meta">
              <span>{article.kategori}</span>
              <span>&middot; {article.tanggal}</span>
              <span>&middot; {article.baca} baca</span>
            </div>

            <div className="article-hero">
              <img src={article.image} alt={article.title} />
            </div>

            <nav className="toc">
              <strong>Daftar Isi</strong>
              <ol>
                {judulH2.map((b) => (
                  <li key={b.i}><a href={`#bagian-${b.i}`}>{b.text}</a></li>
                ))}
              </ol>
            </nav>

            <div className="article-body">
              {article.blocks.map((b, i) => <Block key={i} b={b} i={i} />)}
            </div>

            <PromoTeman promo={article.promo} judulArtikel={article.title} />

            <div className="article-cta">
              <h3>Butuh bantuan memilih produk custom?</h3>
              <p style={{ marginBottom: "1rem" }}>
                Tim Kertajaya siap membantu lewat WhatsApp, gratis!
              </p>
              <a
                className="btn btn-whatsapp"
                href={waLink(`Halo Kertajaya, saya membaca artikel "${article.title}" dan mau konsultasi.`)}
                target="_blank"
                rel="noreferrer"
              >
                💬 Chat Admin
              </a>
            </div>
          </article>

          {lainnya.length > 0 && (
            <div style={{ marginTop: "2.5rem" }}>
              <div className="section-head-row">
                <h2>Artikel Lainnya</h2>
                <Link className="link-all" to="/blog">Semua Artikel &rarr;</Link>
              </div>
              <div className="blog-grid">
                {lainnya.map((a) => (
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
          )}
        </div>
      </section>

      <CtaBand
        title="Mau Pesan Barang Custom Sekarang?"
        text="Lihat katalog produk kami untuk harga dan ketersediaan terkini."
        pesan="Halo Kertajaya, saya mau tanya stok & harga barang custom."
      />
    </>
  );
}
