import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { subscribeProfile, subscribeMyOrders, saveProfile } from "../lib/db";
import { formatRp } from "../data/products";
import { PageHead } from "../components/ui";

function formatTanggal(iso) {
  try {
    return new Date(iso).toLocaleString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export default function Profil() {
  const { user, loading } = useAuth();
  const [nama, setNama] = useState("");
  const [wa, setWa] = useState("");
  const [alamat, setAlamat] = useState("");
  const [tersimpan, setTersimpan] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) return;
    const unsubP = subscribeProfile(user.uid, (p) => {
      setNama(p?.nama || user.displayName || "");
      setWa(p?.wa || "");
      setAlamat(p?.alamat || "");
    });
    const unsubO = subscribeMyOrders(user.uid, setOrders);
    return () => {
      unsubP();
      unsubO();
    };
  }, [user]);

  if (loading) {
    return (
      <section className="section">
        <div className="container"><p>Memeriksa akun...</p></div>
      </section>
    );
  }

  if (!user) {
    return <Navigate to="/masuk" replace />;
  }

  function onSubmit(e) {
    e.preventDefault();
    saveProfile(user.uid, { nama: nama.trim(), wa: wa.trim(), alamat: alamat.trim() });
    setTersimpan(true);
    setTimeout(() => setTersimpan(false), 2500);
  }

  return (
    <>
      <PageHead crumb="Profil" title="Profil Saya" />
      <section className="section">
        <div className="container profil-grid">
          <div className="auth-card">
            <h3 className="profil-h">Data Pengiriman</h3>
            <p className="auth-intro">
              Data ini otomatis ikut terlampir saat Anda checkout via WhatsApp, sehingga Anda tidak perlu mengetik ulang.
            </p>
            <form onSubmit={onSubmit}>
              <label className="form-field">
                <span>Nama</span>
                <input
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Nama Anda"
                  required
                />
              </label>
              <label className="form-field">
                <span>Nomor WhatsApp</span>
                <input
                  type="tel"
                  value={wa}
                  onChange={(e) => setWa(e.target.value)}
                  placeholder="08xx-xxxx-xxxx"
                />
              </label>
              <label className="form-field">
                <span>Alamat Pengiriman</span>
                <textarea
                  rows="3"
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                  placeholder="Alamat lengkap untuk pengiriman"
                />
              </label>
              <button className="btn btn-primary btn-lg btn-block" type="submit">
                Simpan
              </button>
              {tersimpan && <p className="alert-ok">Tersimpan ✓</p>}
            </form>
            <p className="auth-switch">
              Email: {user.email}
            </p>
          </div>

          <div className="auth-card">
            <h3 className="profil-h">Riwayat Pesanan</h3>
            {orders.length === 0 ? (
              <p className="auth-intro">
                Belum ada pesanan. Coba tambah produk dari halaman{" "}
                <Link to="/toko">Toko</Link>, lalu checkout — pesanan akan tercatat otomatis di sini.
              </p>
            ) : (
              <div className="order-list">
                {orders.map((o) => (
                  <div className="order-card" key={o.id}>
                    <div className="order-head">
                      <strong>{o.id}</strong>
                      <span className="order-date">{formatTanggal(o.tanggal)}</span>
                    </div>
                    <ul>
                      {o.items.map((it) => (
                        <li key={it.id}>
                          <span>{it.nama} × {it.qty}</span>
                          <span>{formatRp(it.harga * it.qty)}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="order-total">
                      <span>Total</span>
                      <strong>{formatRp(o.subtotal)}</strong>
                    </div>
                    <span className="stock-badge-static ok">{o.status}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
