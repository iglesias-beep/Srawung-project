import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, errorMessage } from "../context/AuthContext";
import { PageHead } from "../components/ui";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email.trim(), password);
      navigate("/");
    } catch (err) {
      setError(errorMessage(err.code));
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <PageHead crumb="Masuk" title="Masuk Akun" />
      <section className="section">
        <div className="container">
          <div className="auth-card">
            <p className="auth-intro">Masuk untuk menyimpan keranjang dan melacak pesanan Anda.</p>
            {error && <div className="alert-error">{error}</div>}
            <form onSubmit={onSubmit}>
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
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
              </label>
              <button className="btn btn-primary btn-lg btn-block" disabled={loading}>
                {loading ? "Memproses..." : "Masuk"}
              </button>
            </form>
            <p className="auth-switch">
              Belum punya akun? <Link to="/daftar">Daftar Sekarang</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
