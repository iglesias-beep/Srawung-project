import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { formatRp, imgProduk } from "../data/products";
import { KONTAK } from "../data/site";
import { subscribeProfile, addOrder, newOrderId } from "../lib/db";

function buildPesan(rows, total, customer) {
  const list = rows
    .map(
      (r, i) =>
        `${i + 1}. ${r.produk.nama} x ${r.qty} ${r.produk.satuan} = ${formatRp(r.subtotal)}`
    )
    .join("\n");

  const identitas = customer
    ? `\n\nData pemesan:\nNama: ${customer.nama || "-"}\nNo. WA: ${customer.wa || "-"}\nAlamat: ${customer.alamat || "-"}`
    : "";

  return (
    `Halo ${KONTAK.namaToko}, saya mau pesan barang custom berikut:\n\n` +
    `${list}\n\n` +
    `Total: ${formatRp(total)}\n\n` +
    `Mohon info ketersediaan & ongkirnya. Terima kasih.` +
    identitas
  );
}

export default function CartDrawer() {
  const { rows, total, totalItem, open, setOpen, setQty, removeItem, clearCart } = useCart();
  const { user } = useAuth();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    if (!user) {
      setCustomer(null);
      return;
    }
    return subscribeProfile(user.uid, (p) => setCustomer(p));
  }, [user]);

  async function handleCheckout() {
    if (!user || rows.length === 0) return;
    try {
      await addOrder({
        uid: user.uid,
        email: user.email || "",
        namaPemesan: customer?.nama || user.displayName || "",
        waPemesan: customer?.wa || "",
        alamatPemesan: customer?.alamat || "",
        id: newOrderId(),
        tanggal: new Date().toISOString(),
        items: rows.map((r) => ({
          id: r.id,
          nama: r.produk.nama,
          qty: r.qty,
          harga: r.produk.harga,
          satuan: r.produk.satuan,
        })),
        subtotal: total,
        status: "Pesanan diterima",
      });
    } catch (e) {
      console.error("Gagal menyimpan pesanan:", e);
    }
  }

  return (
    <>
      <div
        className={"drawer-overlay" + (open ? " show" : "")}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <aside className={"cart-drawer" + (open ? " open" : "")} aria-label="Keranjang belanja">
        <header className="cart-head">
          <h2>🛒 Keranjang ({totalItem})</h2>
          <button className="cart-close" onClick={() => setOpen(false)} aria-label="Tutup keranjang">
            ✕
          </button>
        </header>

        {rows.length === 0 ? (
          <div className="cart-empty">
            <div className="big">🛒</div>
            <p>Keranjang masih kosong.</p>
            <Link className="btn btn-primary" to="/toko" onClick={() => setOpen(false)}>
              Lihat Katalog
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-list">
              {rows.map((r) => (
                <div className="cart-item" key={r.id}>
                  <img src={r.produk.gambar || imgProduk(r.id)} alt={r.produk.nama} />
                  <div className="cart-info">
                    <strong>{r.produk.nama}</strong>
                    <span>{formatRp(r.produk.harga)} / {r.produk.satuan}</span>
                    <div className="qty">
                      <button onClick={() => setQty(r.id, r.qty - 1)} aria-label="Kurangi jumlah">
                        −
                      </button>
                      <span>{r.qty}</span>
                      <button onClick={() => setQty(r.id, r.qty + 1)} aria-label="Tambah jumlah">
                        +
                      </button>
                    </div>
                  </div>
                  <div className="cart-side">
                    <strong>{formatRp(r.subtotal)}</strong>
                    <button className="cart-remove" onClick={() => removeItem(r.id)} aria-label={`Hapus ${r.produk.nama}`}>
                      Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <footer className="cart-foot">
              {user ? (
                <p className="cart-note">
                  Data {customer && customer.wa ? "pengiriman Anda" : "nama Anda"} otomatis ikut dalam pesanan.
                  {!customer?.wa && (
                    <> <Link to="/profil" onClick={() => setOpen(false)}>Lengkapi profil</Link> agar checkout lebih cepat.</>
                  )}
                </p>
              ) : (
                <p className="cart-note">
                  <Link to="/masuk" onClick={() => setOpen(false)}>Masuk</Link> agar pesanan tercatat di riwayat & data pengiriman otomatis terisi.
                </p>
              )}
              <div className="cart-total">
                <span>Total</span>
                <strong>{formatRp(total)}</strong>
              </div>
              <a
                className="btn btn-primary btn-lg"
                href={`https://wa.me/${KONTAK.wa}?text=${encodeURIComponent(buildPesan(rows, total, user ? customer : null))}`}
                target="_blank"
                rel="noreferrer"
                onClick={handleCheckout}
              >
                Checkout via WhatsApp
              </a>
              <button className="btn-link" onClick={clearCart}>
                Kosongkan Keranjang
              </button>
            </footer>
          </>
        )}
      </aside>
    </>
  );
}
