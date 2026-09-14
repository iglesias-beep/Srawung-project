import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { KONTAK, waLink } from "../data/site";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import CartDrawer from "./CartDrawer";
import { ClientMarquee } from "./ui";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

function CartButton() {
  const { totalItem, setOpen } = useCart();
  return (
    <button
      className="cart-btn"
      onClick={() => setOpen(true)}
      aria-label={`Buka keranjang, ${totalItem} item`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="9" cy="20.5" r="1.4" />
        <circle cx="17.5" cy="20.5" r="1.4" />
        <path d="M2 3h2.2l2.5 12.4a1.8 1.8 0 0 0 1.8 1.5h9.3a1.8 1.8 0 0 0 1.8-1.5L21.5 7H5.2" />
      </svg>
      {totalItem > 0 && <span className="cart-badge">{totalItem}</span>}
    </button>
  );
}

function AccountMenu() {
  const [openMenu, setOpenMenu] = useState(false);
  const { user, isAdmin, logout } = useAuth();
  const { pathname } = useLocation();
  const boxRef = useRef(null);

  useEffect(() => {
    setOpenMenu(false);
  }, [pathname]);

  useEffect(() => {
    function onDocClick(e) {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <div className="account" ref={boxRef}>
      <button
        className={"account-btn" + (openMenu ? " open" : "")}
        aria-haspopup="menu"
        aria-expanded={openMenu}
        onClick={() => setOpenMenu((v) => !v)}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20a8 8 0 0 1 16 0" />
        </svg>
        <span>{user ? (user.displayName || user.email?.split("@")[0]) : "Akun"}</span>
        <svg className="caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      <div className={"account-menu" + (openMenu ? " open" : "")} role="menu">
        {user ? (
          <>
            <div className="account-head">
              <strong>{user.displayName || "Pengguna"}</strong>
              {isAdmin && <em>Admin</em>}
              <small>{user.email}</small>
            </div>
            <Link to="/profil" role="menuitem">Profil Saya</Link>
            {isAdmin && (
              <Link to="/admin" role="menuitem">Dashboard Admin</Link>
            )}
            <button role="menuitem" onClick={logout}>Keluar</button>
          </>
        ) : (
          <>
            <Link to="/masuk" role="menuitem">Masuk</Link>
            <Link to="/daftar" role="menuitem">Daftar Akun Baru</Link>
          </>
        )}
      </div>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="header">
      <div className="container nav-wrap">
        <Link className="brand" to="/" aria-label="Kertajaya - Beranda">
          <img src="/assets/images/logo.svg" alt="Logo Kertajaya" />
          <span className="brand-text">
            <strong>Kertajaya</strong>
            <small>Custom Signage &amp; Printing</small>
          </span>
        </Link>
        <nav className={"nav" + (open ? " open" : "")} id="navMenu">
          <ul>
            <li><NavLink to="/" end>Beranda</NavLink></li>
            <li><NavLink to="/toko">Toko</NavLink></li>
            <li><NavLink to="/blog">Blog</NavLink></li>
            <li><NavLink to="/kontak">Kontak</NavLink></li>
            <li>
              <a className="nav-cta" href={waLink("Halo Kertajaya, saya mau pesan barang custom.")} target="_blank" rel="noreferrer">
                Pesan Sekarang
              </a>
            </li>
          </ul>
        </nav>
        <div className="nav-actions">
          <AccountMenu />
          <CartButton />
          <button
            className={"nav-toggle" + (open ? " open" : "")}
            id="navToggle"
            aria-label="Buka menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="brand">
              <img src="/assets/images/logo.svg" alt="Logo Kertajaya" />
              <span className="brand-text">
                <strong>Kertajaya</strong>
                <small>Custom Signage &amp; Printing</small>
              </span>
            </div>
            <p>
              Menyediakan barang custom signage berkualitas — papan nama, neon box, rambu,
              huruf timbul, sticker branding, hingga event booth — dengan garansi perbaikan.
            </p>
          </div>
          <div>
            <h4>Menu</h4>
            <ul>
              <li><Link to="/">Beranda</Link></li>
              <li><Link to="/toko">Toko</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/kontak">Kontak</Link></li>
            </ul>
          </div>
          <div>
            <h4>Hubungi Kami</h4>
            <ul>
              <li>📞 <a href={`tel:${KONTAK.telInternational}`}>{KONTAK.telepon}</a></li>
              <li>💬 <a href={waLink("Halo Kertajaya, saya mau tanya-tanya barang custom.")} target="_blank" rel="noreferrer">WhatsApp Kami</a></li>
            </ul>
          </div>
          <div>
            <h4>Lokasi</h4>
            <ul>
              <li>📍 {KONTAK.alamat}</li>
              <li><Link to="/kontak#peta">Lihat Peta &rarr;</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} Kertajaya. Seluruh hak cipta dilindungi.</span>
          <span>Barang Custom Signage &amp; Printing</span>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppFloat() {
  return (
    <a
      className="wa-float pulse"
      href={waLink("Halo Kertajaya, saya mau tanya stok & harga barang custom.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat WhatsApp"
    >
      <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
        <path d="M16 3C9.4 3 4 8.4 4 15c0 2.1.6 4.1 1.6 5.9L4 29l8.3-1.6c1.7.8 3.6 1.3 5.7 1.3 6.6 0 12-5.4 12-12S22.6 3 16 3zm0 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-4.9 1 1-4.8-.3-.4c-1-1.6-1.6-3.5-1.6-5.5C5 8.5 9.9 5 16 5c6 0 10.9 4.5 10.9 9.9s-4.9 9.9-10.9 9.9zm5.5-7.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.7l.4-.5c.1-.2.2-.3.3-.5s0-.4 0-.5c0-.1-.7-1.7-1-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.3z"/>
      </svg>
      <span className="label">Chat WhatsApp</span>
    </a>
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      className={"back-top" + (show ? " show" : "")}
      aria-label="Kembali ke atas"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      ↑
    </button>
  );
}

export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Outlet />
      </main>
      <ClientMarquee />
      <Footer />
      <CartDrawer />
      <WhatsAppFloat />
      <BackToTop />
    </>
  );
}
