import { Link } from "react-router-dom";
import { useData } from "../context/DataContext";
import { PageHead } from "../components/ui";

export default function Blog() {
  const { articles } = useData();
  return (
    <>
      <PageHead crumb="Blog" title="Blog & Tips Custom" />

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="kicker">Kategori</span>
            <h2>Artikel Edukasi Seputar Barang Custom</h2>
            <p>
              Panduan memilih produk, tips branding, kalkulasi kebutuhan signage, hingga rekomendasi
              barang custom terbaik.
            </p>
          </div>
          <div className="blog-grid">
            {articles.map((a) => (
              <article className="blog-card" key={a.slug}>
                <div className="thumb">
                  <img src={`${a.image}?v=2`} alt={a.title} loading="lazy" />
                </div>
                <div className="blog-body">
                  <div className="blog-meta">
                    <span>{a.kategori}</span>
                    <span>&middot; {a.tanggal}</span>
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
    </>
  );
}
