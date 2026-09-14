import { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Menu, X, User, LogOut, ShoppingCart, MapPin, Phone, Mail, Clock, Facebook, Instagram } from 'lucide-react';

export default function PublicLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { currentUser, signOut, isAdmin } = useAuth();
  const { totalItems, setOpen } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { to: '/', label: 'Beranda' },
    { to: '/produk', label: 'Produk' },
    { to: '/blog', label: 'Blog' },
    { to: '/tentang', label: 'Tentang' },
    { to: '/kontak', label: 'Kontak' },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setUserMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo.svg" alt="Borongjasa" className="w-9 h-9 lg:w-10 lg:h-10" />
              <span className="font-heading text-xl font-bold text-brand-dark">Borongjasa</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    location.pathname === link.to
                      ? 'text-brand-navy'
                      : 'text-brand-muted hover:text-brand-dark'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={() => setOpen(true)}
                className="relative p-2 rounded-lg hover:bg-gray-50 transition-colors"
                aria-label={`Buka keranjang, ${totalItems} item`}
              >
                <ShoppingCart size={22} className="text-brand-dark" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-navy text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
              {currentUser ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-8 h-8 bg-brand-navy/10 rounded-full flex items-center justify-center">
                      <User size={16} className="text-brand-navy" />
                    </div>
                    <span className="text-sm font-medium text-brand-dark">{currentUser.email?.split('@')[0]}</span>
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                      <Link
                        to="/profil"
                        onClick={() => setUserMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-brand-dark hover:bg-gray-50"
                      >
                        Profil Saya
                      </Link>
                      <Link
                        to="/pesanan"
                        onClick={() => setUserMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-brand-dark hover:bg-gray-50"
                      >
                        Pesanan Saya
                      </Link>
                      {isAdmin && (
                        <Link
                          to="/admin/dashboard"
                          onClick={() => setUserMenuOpen(false)}
                          className="block px-4 py-2 text-sm text-brand-navy hover:bg-gray-50 font-medium"
                        >
                          Admin Dashboard
                        </Link>
                      )}
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 flex items-center gap-2"
                      >
                        <LogOut size={14} /> Keluar
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link to="/login" className="text-sm font-medium text-brand-dark hover:text-brand-navy transition-colors">
                    Masuk
                  </Link>
                  <Link to="/register" className="btn-primary text-sm">
                    Daftar
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Cart + Menu Button */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setOpen(true)}
                className="md:hidden relative p-2 rounded-lg hover:bg-gray-50"
                aria-label="Buka keranjang"
              >
                <ShoppingCart size={24} className="text-brand-dark" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-navy text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-50"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileOpen && (
            <div className="md:hidden pb-4 border-t border-gray-100 mt-2 pt-4">
              <div className="flex flex-col gap-2">
                {navLinks.map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      location.pathname === link.to
                        ? 'bg-brand-navy/5 text-brand-navy'
                        : 'text-brand-muted hover:bg-gray-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <hr className="my-2" />
                {currentUser ? (
                  <>
                    <Link
                      to="/profil"
                      onClick={() => setMobileOpen(false)}
                      className="px-4 py-3 rounded-lg text-sm font-medium text-brand-dark hover:bg-gray-50"
                    >
                      Profil Saya
                    </Link>
                    <Link
                      to="/pesanan"
                      onClick={() => setMobileOpen(false)}
                      className="px-4 py-3 rounded-lg text-sm font-medium text-brand-dark hover:bg-gray-50"
                    >
                      Pesanan Saya
                    </Link>
                    {isAdmin && (
                      <Link
                        to="/admin/dashboard"
                        onClick={() => setMobileOpen(false)}
                        className="px-4 py-3 rounded-lg text-sm font-medium text-brand-navy bg-brand-navy/5"
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={() => { handleSignOut(); setMobileOpen(false); }}
                      className="px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 text-left flex items-center gap-2"
                    >
                      <LogOut size={14} /> Keluar
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col gap-2 px-4">
                    <Link to="/login" onClick={() => setMobileOpen(false)} className="btn-secondary text-center text-sm">
                      Masuk
                    </Link>
                    <Link to="/register" onClick={() => setMobileOpen(false)} className="btn-primary text-center text-sm">
                      Daftar
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1"><Outlet /></main>

      {/* Footer */}
      <footer className="bg-brand-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/logo.svg" alt="Borongjasa" className="w-9 h-9" />
                <span className="font-heading text-xl font-bold">Borongjasa</span>
              </div>
              <p className="text-sm text-white/60 leading-relaxed mb-5">
                Penyedia jasa custom sign, printing, dan branding profesional. Papan nama, neon box, huruf timbul, hingga event booth berkualitas untuk bisnis Anda.
              </p>
              <div className="flex items-center gap-3">
                <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-brand-navy transition-colors">
                  <Facebook size={16} />
                </a>
                <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-brand-navy transition-colors">
                  <Instagram size={16} />
                </a>
                <a href="#" aria-label="WhatsApp" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-brand-navy transition-colors">
                  <Phone size={16} />
                </a>
              </div>
            </div>

            {/* Produk */}
            <div>
              <h4 className="font-heading text-base font-semibold mb-4 text-brand-steel">Produk Kami</h4>
              <ul className="space-y-2.5 text-sm">
                <li><Link to="/produk?kategori=papan-nama" className="text-white/60 hover:text-brand-steel transition-colors">Papan Nama</Link></li>
                <li><Link to="/produk?kategori=neon-box" className="text-white/60 hover:text-brand-steel transition-colors">Neon Box</Link></li>
                <li><Link to="/produk?kategori=huruf-timbul" className="text-white/60 hover:text-brand-steel transition-colors">Huruf Timbul</Link></li>
                <li><Link to="/produk?kategori=totem-pylon" className="text-white/60 hover:text-brand-steel transition-colors">Totem & Pylon</Link></li>
                <li><Link to="/produk?kategori=event-booth" className="text-white/60 hover:text-brand-steel transition-colors">Event Booth</Link></li>
                <li><Link to="/produk?kategori=sticker-cutting" className="text-white/60 hover:text-brand-steel transition-colors">Sticker Cutting</Link></li>
              </ul>
            </div>

            {/* Navigasi */}
            <div>
              <h4 className="font-heading text-base font-semibold mb-4 text-brand-steel">Navigasi</h4>
              <ul className="space-y-2.5 text-sm">
                <li><Link to="/" className="text-white/60 hover:text-brand-steel transition-colors">Beranda</Link></li>
                <li><Link to="/produk" className="text-white/60 hover:text-brand-steel transition-colors">Semua Produk</Link></li>
                <li><Link to="/blog" className="text-white/60 hover:text-brand-steel transition-colors">Blog</Link></li>
                <li><Link to="/tentang" className="text-white/60 hover:text-brand-steel transition-colors">Tentang Kami</Link></li>
                <li><Link to="/kontak" className="text-white/60 hover:text-brand-steel transition-colors">Kontak</Link></li>
              </ul>
            </div>

            {/* Kontak */}
            <div>
              <h4 className="font-heading text-base font-semibold mb-4 text-brand-steel">Hubungi Kami</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="text-brand-navy mt-0.5 flex-shrink-0" />
                  <span className="text-white/60">Jl. Contoh No. 123, Surabaya, Jawa Timur</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={16} className="text-brand-navy flex-shrink-0" />
                  <a href="tel:+6281234567890" className="text-white/60 hover:text-brand-steel transition-colors">+62 812-3456-7890</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={16} className="text-brand-navy flex-shrink-0" />
                  <a href="mailto:info@borongjasa.com" className="text-white/60 hover:text-brand-steel transition-colors">info@borongjasa.com</a>
                </li>
                <li className="flex items-start gap-3">
                  <Clock size={16} className="text-brand-navy mt-0.5 flex-shrink-0" />
                  <span className="text-white/60">Senin – Sabtu, 08.00 – 17.00 WIB</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-center text-xs text-white/40">
              &copy; {new Date().getFullYear()} Borongjasa. All rights reserved.
            </p>
            <p className="text-center text-xs text-white/40">
              Custom Sign, Printing & Branding
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
