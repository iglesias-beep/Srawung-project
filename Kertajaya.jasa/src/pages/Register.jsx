import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, errorMessage } from "../context/AuthContext";
import { PageHead } from "../components/ui";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [konfirmasi, setKonfirmasi] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    if (password.length < 6) {
      setError("Kata sandi minimal 6 karakter.");
      return;
    }
    if (password !== konfirmasi) {
      setError("Konfirmasi kata sandi tidak sama.");
      return;
    }
    setLoading(true);
    try {
      await register(nama.trim(), email.trim(), password);
      navigate("/profil");
    } catch (err) {
      setError(errorMessage(err.code));
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <PageHead crumb="Daftar" title="Daftar Akun" />
      <section className="section">
        <div className="container">
          <div className="auth-card">
            <p className="auth-intro">Buat akun untuk kemudahan belanja di Kertajaya.</p>
            {error && <div className="alert-error">{error}</div>}
            <form onSubmit={onSubmit}>
              <label className="form-field">
                <span>Nama Lengkap</span>
                <input
                  type="text"
                  required
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Nama Anda"
                  autoComplete="name"
                />
              </label>
              <label className="form-field">
                <span>Email</span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  autoComplete="email"
                />
              </label>
              <label className="form-field">
                <span>Kata Sandi</span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimal 6 karakter"
                  autoComplete="new-password"
                />
              </label>
              <label className="form-field">
                <span>Ulangi Kata Sandi</span>
                <input
                  type="password"
                  required
                  value={konfirmasi}
                  onChange={(e) => setKonfirmasi(e.target.value)}
                  placeholder="Ulangi kata sandi"
                  autoComplete="new-password"
                />
              </label>
              <button className="btn btn-primary btn-lg btn-block" disabled={loading}>
                {loading ? "Memproses..." : "Daftar"}
              </button>
            </form>
            <p className="auth-switch">
              Sudah punya akun? <Link to="/masuk">Masuk di sini</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
