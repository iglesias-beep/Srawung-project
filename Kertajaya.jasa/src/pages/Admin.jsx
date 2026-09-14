import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { formatRp, imgProduk, PRODUCTS as SEED_PRODUCTS } from "../data/products";
import { ARTICLES as SEED_ARTICLES } from "../data/articles";
import {
  subscribeProducts,
  subscribeArticles,
  subscribeAllOrders,
  addProduct,
  updateProduct,
  deleteProduct,
  addArticle,
  updateArticle,
  deleteArticle,
  updateOrderStatus,
  deleteOrder,
  seedProducts,
  seedArticles,
} from "../lib/db";
import ImageUpload from "../components/ImageUpload";
import {
  slugify,
  textToBlocks,
  blocksToText,
  tanggalHariIni,
  hitungLamaBaca,
  buatIntro,
} from "../lib/konten";

const STATUS_ORDER = ["Pesanan diterima", "Diproses", "Dikirim", "Selesai", "Dibatalkan"];

const newProductForm = () => ({ id: "", nama: "", cat: "", harga: "", satuan: "", stok: "", unggulan: false, gambar: "" });
const newArticleForm = () => ({
  slug: "", slugTouched: false, title: "", kategori: "", image: "", isi: "",
  promoAktif: false, promoNamaUsaha: "", promoEmoji: "", promoDeskripsi: "", promoHargaMulai: "", promoWa: "", promoPesan: "",
});

const promoDariForm = (f) => {
  if (!f.promoAktif) return null;
  return {
    namaUsaha: f.promoNamaUsaha.trim(),
    emoji: f.promoEmoji.trim(),
    deskripsi: f.promoDeskripsi.trim(),
    hargaMulai: f.promoHargaMulai.trim(),
    wa: f.promoWa.replace(/\D/g, ""),
    pesan: f.promoPesan.trim(),
  };
};

function formatTanggal(iso) {
  if (!iso) return "-";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "-";
  return d.toLocaleString("id-ID", {
    day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
}

const Icons = {
  Search: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" />
    </svg>
  ),
  Plus: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
  Pencil: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 3a2.8 2.8 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
    </svg>
  ),
  Trash: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M10 11v6M14 11v6" />
    </svg>
  ),
  Close: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  ),
  Box: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 8l-9-5-9 5v8l9 5 9-5V8z" /><path d="M3 8l9 5 9-5M12 13v8" />
    </svg>
  ),
  Doc: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M8 13h8M8 17h6" />
    </svg>
  ),
  Cart: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="9" cy="20.5" r="1.4" /><circle cx="17.5" cy="20.5" r="1.4" />
      <path d="M2 3h2.2l2.5 12.4a1.8 1.8 0 0 0 1.8 1.5h9.3a1.8 1.8 0 0 0 1.8-1.5L21.5 7H5.2" />
    </svg>
  ),
};

function Modal({ title, onClose, children }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h3>{title}</h3>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Tutup">
            <Icons.Close />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function AdminNav({ user, onLogout }) {
  return (
    <header className="admin-nav">
      <Link to="/" className="admin-nav-brand" aria-label="Kertajaya - Beranda">
        <img src="/assets/images/logo.svg" alt="Logo Kertajaya" />
        <span>
          <strong>Kertajaya</strong>
          <small>Admin Panel</small>
        </span>
      </Link>
      <div className="admin-nav-right">
        {user && <span className="admin-nav-user">{user.email}</span>}
        <Link to="/" className="admin-nav-link">Lihat Toko</Link>
        {user && (
          <button className="admin-nav-link admin-nav-logout" onClick={onLogout}>Keluar</button>
        )}
      </div>
    </header>
  );
}

function Stat({ label, value, note }) {
  return (
    <div className="admin-stat">
      <p className="admin-stat-label">{label}</p>
      <p className="admin-stat-value">{value}</p>
      {note && <p className="admin-stat-note">{note}</p>}
    </div>
  );
}

function StockBadge({ stok }) {
  const s = Number(stok) || 0;
  const cls = s > 10 ? "ok" : s > 0 ? "low" : "out";
  const label = s > 10 ? "Aman" : s > 0 ? "Menipis" : "Habis";
  return <span className={"stock-badge-static " + cls}>{label}</span>;
}

function EmptyState({ icon, title, sub }) {
  const Icon = icon || Icons.Box;
  return (
    <div className="admin-table-empty">
      <span className="empty-ico"><Icon /></span>
      <p className="empty-title">{title}</p>
      {sub && <p className="muted">{sub}</p>}
    </div>
  );
}

export default function Admin() {
  const { user, isAdmin, loading, logout } = useAuth();

  const [products, setProducts] = useState([]);
  const [articles, setArticles] = useState([]);
  const [orders, setOrders] = useState([]);

  const [loaded, setLoaded] = useState({ products: false, articles: false });
  const [readError, setReadError] = useState("");

  const [query, setQuery] = useState("");

  const [productModal, setProductModal] = useState(null);
  const [articleModal, setArticleModal] = useState(null);

  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);
  const seeded = useRef(false);

  useEffect(() => {
    const onErr = () =>
      setReadError(
        "Tidak dapat menghubungi Firestore. Periksa koneksi internet atau aturan keamanan (Firestore Rules), lalu muat ulang halaman."
      );
    const unsubProducts = subscribeProducts(
      (list) => {
        setProducts(list);
        setLoaded((s) => ({ ...s, products: true }));
      },
      onErr
    );
    const unsubArticles = subscribeArticles(
      (list) => {
        setArticles(list);
        setLoaded((s) => ({ ...s, articles: true }));
      },
      onErr
    );
    const unsubOrders = subscribeAllOrders(setOrders, onErr);
    return () => {
      unsubProducts();
      unsubArticles();
      unsubOrders();
    };
  }, []);

  useEffect(() => {
    if (!user || !isAdmin || readError || seeded.current) return;
    if (!loaded.products || !loaded.articles) return;
    if (products.length > 0 && articles.length > 0) return;
    seeded.current = true;
    (async () => {
      try {
        if (products.length === 0) await seedProducts(SEED_PRODUCTS);
        if (articles.length === 0) await seedArticles(SEED_ARTICLES);
      } catch (e) {
        console.error("auto-seed:", e);
        setReadError(
          "Gagal mengisi data awal di Firestore (" + (e.message || e.code || "write ditolak") +
          "). Pastikan Firestore Rules mengizinkan write, lalu muat ulang halaman."
        );
      }
    })();
  }, [user, isAdmin, readError, loaded, products.length, articles.length]);

  function showToast(ok, text) {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ ok, text });
    toastTimer.current = setTimeout(() => setToast(null), 3200);
  }

  const categories = useMemo(() => [...new Set(products.map((p) => p.cat))], [products]);

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) => p.nama.toLowerCase().includes(q) || p.cat.toLowerCase().includes(q)
    );
  }, [products, query]);

  const stats = useMemo(() => {
    const totalStok = products.reduce((s, p) => s + (Number(p.stok) || 0), 0);
    const nilaiStok = products.reduce((s, p) => s + (Number(p.harga) || 0) * (Number(p.stok) || 0), 0);
    const restok = products.filter((p) => (Number(p.stok) || 0) <= 10).length;
    const nilaiPesanan = orders.reduce((s, o) => s + (Number(o.subtotal) || 0), 0);
    return { totalStok, nilaiStok, restok, nilaiPesanan };
  }, [products, orders]);

  async function saveProduct(e) {
    e.preventDefault();
    const f = productModal;
    if (!f.id.trim() || !f.nama.trim()) {
      showToast(false, "ID dan Nama produk wajib diisi.");
      return;
    }
    const editing = products.some((p) => p.id === f.id.trim());
    const data = {
      nama: f.nama.trim(),
      cat: f.cat.trim() || "Umum",
      harga: Number(f.harga) || 0,
      satuan: f.satuan.trim() || "unit",
      stok: Number(f.stok) || 0,
      unggulan: !!f.unggulan,
      gambar: f.gambar || "",
    };
    setBusy(true);
    try {
      if (editing) await updateProduct(f.id.trim(), data);
      else await addProduct(data);
      showToast(true, editing ? "Produk diperbarui." : "Produk ditambahkan.");
      setProductModal(null);
    } catch (err) {
      showToast(false, "Gagal menyimpan produk. " + (err.message || ""));
    } finally {
      setBusy(false);
    }
  }

  async function removeProduct(p) {
    if (!window.confirm(`Hapus produk "${p.nama || p.id}"?`)) return;
    setBusy(true);
    try {
      await deleteProduct(p.id);
      showToast(true, "Produk dihapus.");
    } catch (err) {
      showToast(false, "Gagal menghapus produk. " + (err.message || ""));
    } finally {
      setBusy(false);
    }
  }

  async function saveArticle(e) {
    e.preventDefault();
    const f = articleModal;
    const slug = (f.slug || "").trim() || slugify(f.title);
    if (!slug || !f.title.trim()) {
      showToast(false, "Judul artikel wajib diisi.");
      return;
    }
    const blocks = textToBlocks(f.isi);
    if (blocks.length === 0) {
      showToast(false, "Isi artikel masih kosong.");
      return;
    }
    const editing = articles.some((a) => a.slug === slug);
    const promo = promoDariForm(f);
    if (promo && (!promo.namaUsaha || !promo.wa)) {
      showToast(false, "Promosi teman: nama usaha & nomor WA wajib diisi.");
      return;
    }
    const data = {
      slug,
      title: f.title.trim(),
      kategori: f.kategori.trim() || "Blog",
      tanggal: tanggalHariIni(),
      baca: hitungLamaBaca(blocks),
      image: f.image.trim(),
      intro: buatIntro(blocks),
      blocks,
      promo,
    };
    setBusy(true);
    try {
      if (editing) await updateArticle(slug, data);
      else await addArticle(data);
      showToast(true, editing ? "Artikel diperbarui." : "Artikel diterbitkan.");
      setArticleModal(null);
    } catch (err) {
      showToast(false, "Gagal menyimpan artikel. " + (err.message || ""));
    } finally {
      setBusy(false);
    }
  }

  async function removeArticle(a) {
    if (!window.confirm(`Hapus artikel "${a.title || a.slug}"?`)) return;
    setBusy(true);
    try {
      await deleteArticle(a.slug);
      showToast(true, "Artikel dihapus.");
    } catch (err) {
      showToast(false, "Gagal menghapus artikel. " + (err.message || ""));
    } finally {
      setBusy(false);
    }
  }

  async function changeOrderStatus(o, status) {
    setBusy(true);
    try {
      await updateOrderStatus(o.id, status);
      showToast(true, "Status pesanan diperbarui.");
    } catch (err) {
      showToast(false, "Gagal memperbarui status. " + (err.message || ""));
    } finally {
      setBusy(false);
    }
  }

  async function removeOrder(o) {
    if (!window.confirm(`Hapus pesanan "${o.id}"?`)) return;
    setBusy(true);
    try {
      await deleteOrder(o.id);
      showToast(true, "Pesanan dihapus.");
    } catch (err) {
      showToast(false, "Gagal menghapus pesanan. " + (err.message || ""));
    } finally {
      setBusy(false);
    }
  }

  if (loading) {
    return (
      <div className="admin-shell">
        <AdminNav user={null} onLogout={logout} />
        <div className="admin-page"><p className="admin-loading">Memuat...</p></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="admin-shell">
        <AdminNav user={null} onLogout={logout} />
        <div className="admin-page">
          <div className="admin-gate">
            <h1>Akses Admin Diperlukan</h1>
            <p>Login sebagai admin untuk membuka dashboard kelola toko.</p>
            <Link className="btn btn-primary" to="/masuk">Masuk</Link>
          </div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="admin-shell">
        <AdminNav user={user} onLogout={logout} />
        <div className="admin-page">
          <div className="admin-gate">
            <h1>Akses Ditolak</h1>
            <p>Akun Anda tidak memiliki izin admin.</p>
            <Link className="btn btn-outline" to="/">Kembali ke Beranda</Link>
          </div>
        </div>
      </div>
    );
  }

  const dataReady = loaded.products && loaded.articles;

  return (
    <div className="admin-shell">
      <AdminNav user={user} onLogout={logout} />

      {toast && <div className={"admin-toast " + (toast.ok ? "ok" : "err")}>{toast.text}</div>}

      <div className="admin-page">
        <div className="admin-head">
          <div>
            <p className="admin-kicker">Admin Panel</p>
            <h1>Dashboard</h1>
            <p className="admin-head-sub">Kelola produk, artikel, dan pesanan toko.</p>
          </div>
        </div>

        {readError ? (
          <div className="admin-error-card">
            <strong>Gagal terhubung ke Firestore</strong>
            <p>{readError}</p>
          </div>
        ) : !dataReady ? (
          <div className="admin-empty"><p className="admin-loading">Memuat data dari Firestore...</p></div>
        ) : (
          <>
            {/* SECTION_STATS */}
            <div className="stat-grid">
              <Stat label="Total Produk" value={products.length} note={categories.length + " kategori"} />
              <Stat label="Total Stok" value={stats.totalStok.toLocaleString("id-ID")} note="unit tersedia" />
              <Stat label="Nilai Stok" value={formatRp(stats.nilaiStok)} note="estimasi harga jual" />
              <Stat label="Perlu Restok" value={stats.restok} note={stats.restok ? "produk stok ≤ 10" : "semua aman"} />
            </div>

            {/* SECTION_PRODUCTS */}
            <section className="admin-card">
              <div className="admin-card-head">
                <div>
                  <h2>Produk</h2>
                  <p>{filteredProducts.length} dari {products.length} produk</p>
                </div>
                <div className="admin-card-actions">
                  <label className="search-box-admin">
                    <span className="search-ico"><Icons.Search /></span>
                    <input
                      type="search"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Cari produk..."
                      aria-label="Cari produk"
                    />
                  </label>
                  <button className="btn btn-primary" onClick={() => setProductModal(newProductForm())}>
                    <Icons.Plus /> Tambah Produk
                  </button>
                </div>
              </div>

              {products.length === 0 ? (
                <EmptyState icon={Icons.Box} title="Belum ada produk" sub="Klik 'Tambah Produk' untuk menambahkan." />
              ) : filteredProducts.length === 0 ? (
                <EmptyState icon={Icons.Box} title="Tidak ada hasil" sub="Coba ubah kata kunci pencarian." />
              ) : (
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr><th>Produk</th><th>Kategori</th><th>Harga</th><th>Stok</th><th>Aksi</th></tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((p) => (
                        <tr key={p.id}>
                          <td>
                            <div className="cell-produk">
                              <img
                                src={p.gambar || imgProduk(p.id)}
                                alt={p.nama}
                                loading="lazy"
                                onError={(e) => { e.currentTarget.style.visibility = "hidden"; }}
                              />
                              <div>
                                <strong>{p.nama}</strong>
                                {p.unggulan && <span className="tag">Unggulan</span>}
                              </div>
                            </div>
                          </td>
                          <td><span className="cat-chip">{p.cat}</span></td>
                          <td className="cell-harga">{formatRp(Number(p.harga) || 0)} <span className="muted">/ {p.satuan || "unit"}</span></td>
                          <td><StockBadge stok={p.stok} /> <span className="muted">{Number(p.stok) || 0}</span></td>
                          <td className="cell-aksi">
                            <button className="btn btn-sm" onClick={() => setProductModal({ ...newProductForm(), ...p })}>
                              <Icons.Pencil /> Edit
                            </button>
                            <button className="btn btn-sm btn-danger" onClick={() => removeProduct(p)}>
                              <Icons.Trash /> Hapus
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>

            {/* SECTION_ARTICLES */}
            <section className="admin-card">
              <div className="admin-card-head">
                <div>
                  <h2>Artikel</h2>
                  <p>{articles.length} artikel</p>
                </div>
                <div className="admin-card-actions">
                  <button className="btn btn-primary" onClick={() => setArticleModal(newArticleForm())}>
                    <Icons.Plus /> Tulis Artikel
                  </button>
                </div>
              </div>

              {articles.length === 0 ? (
                <EmptyState icon={Icons.Doc} title="Belum ada artikel" sub="Klik 'Tulis Artikel' untuk membuat." />
              ) : (
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr><th>Artikel</th><th>Kategori</th><th>Tanggal</th><th>Aksi</th></tr>
                    </thead>
                    <tbody>
                      {articles.map((a) => (
                        <tr key={a.slug}>
                          <td><div className="cell-produk"><strong>{a.title}</strong></div></td>
                          <td><span className="cat-chip">{a.kategori}</span></td>
                          <td className="muted">{a.tanggal || "-"}</td>
                          <td className="cell-aksi">
                            <button
                              className="btn btn-sm"
                              onClick={() => {
                                const p = a.promo || {};
                                setArticleModal({
                                  ...newArticleForm(),
                                  slug: a.slug || "",
                                  slugTouched: true,
                                  title: a.title || "",
                                  kategori: a.kategori || "",
                                  image: a.image || "",
                                  isi: blocksToText(a.blocks || []),
                                  promoAktif: !!p.namaUsaha,
                                  promoNamaUsaha: p.namaUsaha || "",
                                  promoEmoji: p.emoji || "",
                                  promoDeskripsi: p.deskripsi || "",
                                  promoHargaMulai: p.hargaMulai || "",
                                  promoWa: p.wa || "",
                                  promoPesan: p.pesan || "",
                                });
                              }}
                            >
                              <Icons.Pencil /> Edit
                            </button>
                            <button className="btn btn-sm btn-danger" onClick={() => removeArticle(a)}>
                              <Icons.Trash /> Hapus
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>

            {/* SECTION_ORDERS */}
            <section className="admin-card">
              <div className="admin-card-head">
                <div>
                  <h2>Pesanan</h2>
                  <p>{orders.length} pesanan &middot; {formatRp(stats.nilaiPesanan)}</p>
                </div>
              </div>

              {orders.length === 0 ? (
                <EmptyState icon={Icons.Cart} title="Belum ada pesanan" sub="Pesanan dari checkout pelanggan akan muncul di sini." />
              ) : (
                <div className="order-list admin-orders">
                  {orders.map((o) => (
                    <div className="order-card" key={o.id}>
                      <div className="order-head">
                        <strong>{o.id}</strong>
                        <span className="order-date">{formatTanggal(o.tanggal)}</span>
                      </div>
                      <div className="order-cust">
                        {o.namaPemesan || "-"} &middot; {o.waPemesan || "-"}<br />
                        <small>{o.email || ""} &middot; {o.alamatPemesan || "-"}</small>
                      </div>
                      <ul>
                        {(o.items || []).map((it) => (
                          <li key={it.id}>
                            <span>{it.nama} &times; {it.qty}</span>
                            <span>{formatRp((Number(it.harga) || 0) * (Number(it.qty) || 0))}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="order-total">
                        <span>Total</span>
                        <strong>{formatRp(Number(o.subtotal) || 0)}</strong>
                      </div>
                      <div className="order-actions">
                        <label className="order-status">
                          <span>Status:</span>
                          <select
                            value={STATUS_ORDER.includes(o.status) ? o.status : "Pesanan diterima"}
                            onChange={(e) => changeOrderStatus(o, e.target.value)}
                            disabled={busy}
                          >
                            {STATUS_ORDER.map((s) => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </label>
                        <button className="btn btn-sm btn-danger" onClick={() => removeOrder(o)}>
                          <Icons.Trash /> Hapus
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </div>

      {/* MODAL_PRODUCT */}
      {productModal && (
        <Modal
          title={products.some((p) => p.id === productModal.id.trim()) ? "Edit Produk" : "Tambah Produk"}
          onClose={() => setProductModal(null)}
        >
          <form onSubmit={saveProduct}>
            <div className="form-grid">
              <label className="form-field">
                <span>ID (mis. papan-nama)</span>
                <input
                  value={productModal.id}
                  onChange={(e) => setProductModal({ ...productModal, id: e.target.value })}
                  disabled={products.some((p) => p.id === productModal.id.trim())}
                  required
                />
              </label>
              <label className="form-field">
                <span>Nama</span>
                <input
                  value={productModal.nama}
                  onChange={(e) => setProductModal({ ...productModal, nama: e.target.value })}
                  required
                />
              </label>
              <label className="form-field">
                <span>Kategori</span>
                <input
                  value={productModal.cat}
                  onChange={(e) => setProductModal({ ...productModal, cat: e.target.value })}
                  list="admin-cats"
                  required
                />
              </label>
              <datalist id="admin-cats">
                {categories.map((c) => <option key={c} value={c} />)}
              </datalist>
              <label className="form-field">
                <span>Harga (Rp)</span>
                <input
                  type="number" min="0"
                  value={productModal.harga}
                  onChange={(e) => setProductModal({ ...productModal, harga: e.target.value })}
                  required
                />
              </label>
              <label className="form-field">
                <span>Satuan</span>
                <input
                  value={productModal.satuan}
                  onChange={(e) => setProductModal({ ...productModal, satuan: e.target.value })}
                  placeholder="Unit, pcs, m²..."
                  required
                />
              </label>
              <label className="form-field">
                <span>Stok</span>
                <input
                  type="number" min="0"
                  value={productModal.stok}
                  onChange={(e) => setProductModal({ ...productModal, stok: e.target.value })}
                  required
                />
              </label>
              <label className="check-field">
                <input
                  type="checkbox"
                  checked={!!productModal.unggulan}
                  onChange={(e) => setProductModal({ ...productModal, unggulan: e.target.checked })}
                />
                <span>Produk unggulan (tampil di Beranda)</span>
              </label>
              <div className="form-field form-span">
                <span>Gambar produk</span>
                <ImageUpload
                  value={productModal.gambar || ""}
                  onChange={(v) => setProductModal({ ...productModal, gambar: v })}
                />
                <small className="muted">Kosongkan untuk memakai gambar bawaan dari ID produk.</small>
              </div>
            </div>
            <div className="form-actions">
              <button className="btn btn-primary" type="submit" disabled={busy}>
                {busy ? "Menyimpan..." : "Simpan"}
              </button>
              <button className="btn btn-outline" type="button" onClick={() => setProductModal(null)}>Batal</button>
            </div>
          </form>
        </Modal>
      )}

      {/* MODAL_ARTICLE */}
      {articleModal && (
        <Modal
          title={articles.some((a) => a.slug === articleModal.slug.trim()) ? "Edit Artikel" : "Tulis Artikel"}
          onClose={() => setArticleModal(null)}
        >
          <form onSubmit={saveArticle}>
            <div className="form-grid">
              <label className="form-field">
                <span>Judul</span>
                <input
                  value={articleModal.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setArticleModal((m) => ({
                      ...m,
                      title,
                      slug: m.slugTouched ? m.slug : slugify(title),
                    }));
                  }}
                  required
                />
              </label>
              <label className="form-field">
                <span>Slug / ID (otomatis dari judul)</span>
                <input
                  value={articleModal.slug}
                  onChange={(e) => setArticleModal({ ...articleModal, slug: e.target.value, slugTouched: true })}
                  disabled={articles.some((a) => a.slug === articleModal.slug.trim())}
                  placeholder="otomatis-dari-judul"
                />
              </label>
              <label className="form-field">
                <span>Kategori</span>
                <input
                  value={articleModal.kategori}
                  onChange={(e) => setArticleModal({ ...articleModal, kategori: e.target.value })}
                  required
                />
              </label>
              <div className="form-field form-span">
                <span>Gambar artikel</span>
                <ImageUpload
                  value={articleModal.image || ""}
                  onChange={(v) => setArticleModal({ ...articleModal, image: v })}
                  tinggi={110}
                />
              </div>
              <label className="form-field form-span">
                <span>Isi artikel</span>
                <textarea
                  rows="14"
                  value={articleModal.isi}
                  onChange={(e) => setArticleModal({ ...articleModal, isi: e.target.value })}
                  placeholder={"Tulis artikel di sini seperti biasa...\n\nBaris kosong = paragraf baru.\n\n## Judul bagian\n### Sub judul\n- poin bullet\n1. langkah bernomor\n| kolom | kolom | (tabel)\n> [Tips] kotak highlight"}
                />
                <small className="muted">
                  Baris kosong = paragraf baru &middot; <code>## Teks</code> = judul bagian &middot;{" "}
                  <code>### Teks</code> = sub judul &middot; <code>- item</code> = bullet &middot;{" "}
                  <code>1. item</code> = nomor &middot; <code>| a | b |</code> = tabel &middot;{" "}
                  <code>&gt; [Tips] teks</code> = kotak highlight
                </small>
              </label>
              <label className="form-field form-span" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <input
                  type="checkbox"
                  checked={articleModal.promoAktif}
                  onChange={(e) => setArticleModal({ ...articleModal, promoAktif: e.target.checked })}
                />
                <span style={{ fontWeight: 700 }}>🤝 Aktifkan slot promosi gratis untuk usaha teman</span>
              </label>
              {articleModal.promoAktif && (
                <>
                  <label className="form-field">
                    <span>Nama usaha teman</span>
                    <input
                      value={articleModal.promoNamaUsaha}
                      onChange={(e) => setArticleModal({ ...articleModal, promoNamaUsaha: e.target.value })}
                      placeholder="Service AC Jaya"
                    />
                  </label>
                  <label className="form-field">
                    <span>Emoji / ikon</span>
                    <input
                      value={articleModal.promoEmoji}
                      onChange={(e) => setArticleModal({ ...articleModal, promoEmoji: e.target.value })}
                      placeholder="❄️"
                    />
                  </label>
                  <label className="form-field">
                    <span>Harga mulai</span>
                    <input
                      value={articleModal.promoHargaMulai}
                      onChange={(e) => setArticleModal({ ...articleModal, promoHargaMulai: e.target.value })}
                      placeholder="Rp 75.000"
                    />
                  </label>
                  <label className="form-field">
                    <span>Nomor WA teman (format 62...)</span>
                    <input
                      value={articleModal.promoWa}
                      onChange={(e) => setArticleModal({ ...articleModal, promoWa: e.target.value })}
                      placeholder="6281234567891"
                    />
                  </label>
                  <label className="form-field form-span">
                    <span>Deskripsi jasa/produk</span>
                    <textarea
                      rows="2"
                      value={articleModal.promoDeskripsi}
                      onChange={(e) => setArticleModal({ ...articleModal, promoDeskripsi: e.target.value })}
                      placeholder="Jasa service, cuci, dan isi freon AC..."
                    />
                  </label>
                  <label className="form-field form-span">
                    <span>Pesan WA custom (opsional)</span>
                    <textarea
                      rows="2"
                      value={articleModal.promoPesan}
                      onChange={(e) => setArticleModal({ ...articleModal, promoPesan: e.target.value })}
                      placeholder="Kosongkan untuk pesan otomatis sesuai judul artikel"
                    />
                  </label>
                </>
              )}
            </div>
            <div className="form-actions">
              <button className="btn btn-primary" type="submit" disabled={busy}>
                {busy ? "Menyimpan..." : "Simpan"}
              </button>
              <button className="btn btn-outline" type="button" onClick={() => setArticleModal(null)}>Batal</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
