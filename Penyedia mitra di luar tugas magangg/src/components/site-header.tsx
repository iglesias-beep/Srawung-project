"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BadgeCheck,
  ChevronDown,
  Menu,
  Search,
  Sparkles,
  User,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CategoryIcon } from "@/components/category-icon";
import { cn } from "@/lib/utils";

export type HeaderCategory = {
  slug: string;
  name: string;
  icon: string;
};

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/blog", label: "Blog" },
  { href: "/tentang", label: "Tentang" },
];

export function SiteHeader({ categories }: { categories: HeaderCategory[] }) {
  const [open, setOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpen(false);
    setCatOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-sand/70 bg-cream/90 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-20">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-gold-2 to-gold-deep text-white shadow-gold">
            <Sparkles className="size-5" />
          </span>
          <span className="leading-tight">
            <span className="block text-lg font-extrabold tracking-tight text-ink">
              Katalog<span className="text-gold">Jasa</span>
            </span>
            <span className="block text-[10px] font-bold tracking-[0.28em] text-ink-3 uppercase">
              biz.id
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                isActive(link.href)
                  ? "text-gold-deep"
                  : "text-ink-2 hover:bg-sand/50 hover:text-ink"
              )}
            >
              {link.label}
            </Link>
          ))}

          <div className="group relative">
            <button
              type="button"
              className={cn(
                "flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                isActive("/kategori") || isActive("/cari")
                  ? "text-gold-deep"
                  : "text-ink-2 hover:bg-sand/50 hover:text-ink"
              )}
              aria-haspopup="menu"
            >
              Kategori
              <ChevronDown className="size-4 transition-transform group-hover:rotate-180" />
            </button>
            <div className="invisible absolute left-1/2 top-full w-[26rem] -translate-x-1/2 translate-y-2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
              <div className="overflow-hidden rounded-2xl border border-sand bg-white p-3 shadow-lift">
                <div className="grid grid-cols-2 gap-1">
                  {categories.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/kategori/${c.slug}`}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-cream"
                    >
                      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-gold-pale text-gold-deep">
                        <CategoryIcon name={c.icon} className="size-4" />
                      </span>
                      <span className="text-sm font-semibold text-ink">
                        {c.name}
                      </span>
                    </Link>
                  ))}
                </div>
                <Link
                  href="/cari"
                  className="mt-2 flex items-center justify-center gap-2 rounded-xl border border-gold/30 bg-gold-pale py-2.5 text-sm font-bold text-gold-deep transition-colors hover:bg-gold-3"
                >
                  <Search className="size-4" />
                  Lihat semua jasa
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href="/cari"
            className="grid size-10 place-items-center rounded-full text-ink-2 transition-colors hover:bg-sand/60 hover:text-ink"
            aria-label="Cari jasa"
          >
            <Search className="size-5" />
          </Link>
          <Link
            href="/daftar-mitra"
            className="grid size-10 place-items-center rounded-full text-ink-2 transition-colors hover:bg-sand/60 hover:text-ink"
            aria-label="Akun"
          >
            <User className="size-5" />
          </Link>
          <Link href="/daftar-mitra">
            <Button variant="gold" size="sm" className="ml-1 h-11 px-5">
              <BadgeCheck className="size-4" />
              Daftar Jadi Mitra
            </Button>
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid size-10 place-items-center rounded-full text-ink transition-colors hover:bg-sand/60 lg:hidden"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      <div
        className={cn(
          "fixed inset-x-0 top-16 bottom-0 z-40 bg-cream px-5 pt-4 pb-8 transition-all duration-300 lg:hidden",
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0"
        )}
      >
        <nav className="flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-2xl px-4 py-3.5 text-base font-semibold",
                isActive(link.href)
                  ? "bg-gold-pale text-gold-deep"
                  : "text-ink hover:bg-sand/50"
              )}
            >
              {link.label}
            </Link>
          ))}

          <button
            type="button"
            onClick={() => setCatOpen((v) => !v)}
            className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-semibold text-ink hover:bg-sand/50"
            aria-expanded={catOpen}
          >
            Kategori
            <ChevronDown
              className={cn(
                "size-5 text-ink-3 transition-transform",
                catOpen && "rotate-180"
              )}
            />
          </button>
          <div
            className={cn(
              "grid transition-all duration-300",
              catOpen
                ? "mt-1 grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            )}
          >
            <div className="overflow-hidden">
              <div className="grid grid-cols-2 gap-2 p-2">
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/kategori/${c.slug}`}
                    className="flex items-center gap-2.5 rounded-xl bg-white px-3 py-3 shadow-soft"
                  >
                    <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-gold-pale text-gold-deep">
                      <CategoryIcon name={c.icon} className="size-4" />
                    </span>
                    <span className="text-sm font-semibold text-ink">
                      {c.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>

        <div className="mt-5 flex flex-col gap-2.5 border-t border-sand pt-5">
          <Link href="/cari" className="w-full">
            <Button variant="outline" size="lg" className="w-full">
              <Search className="size-4" />
              Cari Jasa
            </Button>
          </Link>
          <Link href="/daftar-mitra" className="w-full">
            <Button variant="gold" size="lg" className="w-full">
              <BadgeCheck className="size-4" />
              Daftar Jadi Mitra
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
