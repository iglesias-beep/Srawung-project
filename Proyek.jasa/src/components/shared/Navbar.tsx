"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingCart, Menu, X, User, LogOut, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/hooks/use-cart";
import { useAuth } from "@/hooks/use-auth";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, userProfile, logout } = useAuth();
  const items = useCartStore((s) => s.items);
  const itemCount = items.reduce((sum, item) => sum + item.jumlah, 0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/katalog", label: "Katalog" },
    { href: "/blog", label: "Blog" },
    { href: "/tentang-kami", label: "Tentang Kami" },
    { href: "/kontak", label: "Kontak" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "bg-bg-base/90 backdrop-blur-xl border-b border-[#E5E7EB] shadow-[0_1px_10px_rgba(0,0,0,0.08)]"
          : "bg-bg-base/60 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 md:h-18 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img src="/logo.svg" alt="Proyekjasa" className="h-9 w-9" />
            <span className="text-lg font-bold font-[family-name:var(--font-display)] text-text-primary hidden sm:block tracking-tight">
              Proyekjasa
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-text-muted hover:text-text-primary transition-colors rounded-lg hover:bg-bg-elevated/60"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <Link href="/keranjang">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-accent-emerald text-[10px] font-bold text-white px-1">
                    {itemCount > 99 ? "99+" : itemCount}
                  </span>
                )}
              </Button>
            </Link>

            {user ? (
              <div className="hidden md:flex items-center gap-2">
                {userProfile?.role === "admin" && (
                  <Link href="/admin/dashboard">
                    <Button variant="ghost" size="sm">
                      <LayoutDashboard className="h-4 w-4 mr-1" />
                      Admin
                    </Button>
                  </Link>
                )}
                <Button variant="ghost" size="sm" onClick={logout}>
                  <LogOut className="h-4 w-4 mr-1" />
                  Keluar
                </Button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link href="/login">
                  <Button variant="outline" size="sm">
                    <User className="h-4 w-4 mr-1" />
                    Masuk
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">
                    Daftar
                  </Button>
                </Link>
              </div>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-bg-surface/98 backdrop-blur-xl border-t border-[#E5E7EB]">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-3 text-sm font-medium text-text-muted hover:text-text-primary hover:bg-bg-elevated/60 rounded-lg transition-colors min-h-[44px] flex items-center"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <>
                {userProfile?.role === "admin" && (
                  <Link
                    href="/admin/dashboard"
                    className="block px-4 py-3 text-sm font-medium text-text-muted hover:text-text-primary hover:bg-bg-elevated/60 rounded-lg transition-colors min-h-[44px] flex items-center"
                    onClick={() => setMobileOpen(false)}
                  >
                    Dashboard Admin
                  </Link>
                )}
                <button
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className="block w-full text-left px-4 py-3 text-sm font-medium text-destructive hover:bg-destructive/5 rounded-lg transition-colors min-h-[44px]"
                >
                  Keluar
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block px-4 py-3 text-sm font-medium text-accent-emerald hover:bg-accent-emerald/5 rounded-lg transition-colors min-h-[44px] flex items-center"
                  onClick={() => setMobileOpen(false)}
                >
                  Masuk
                </Link>
                <Link
                  href="/register"
                  className="block px-4 py-3 text-sm font-medium text-accent-emerald hover:bg-accent-emerald/5 rounded-lg transition-colors min-h-[44px] flex items-center"
                  onClick={() => setMobileOpen(false)}
                >
                  Daftar
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
