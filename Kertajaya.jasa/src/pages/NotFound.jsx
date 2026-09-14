import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container" style={{ textAlign: "center", padding: "3rem 1rem" }}>
        <div style={{ fontSize: "4rem" }}>🪧</div>
        <h1 style={{ color: "var(--dark)", margin: "0.5rem 0" }}>Halaman Tidak Ditemukan</h1>
        <p style={{ color: "var(--muted)", marginBottom: "1.5rem" }}>
          Halaman yang Anda cari tidak ada atau telah dipindahkan.
        </p>
        <Link className="btn btn-primary" to="/">Kembali ke Beranda</Link>
      </div>
    </section>
  );
}
