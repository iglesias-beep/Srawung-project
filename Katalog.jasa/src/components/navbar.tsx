"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, User, LogOut, LayoutDashboard, ShoppingCart } from "lucide-react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { getFirebaseAuth, getFirebaseDb, isFirebaseConfigured } from "@/lib/firebase";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";
import { buttonVariants } from "@/components/ui/button";
import { useCart } from "@/components/cart-provider";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/katalog", label: "Katalog" },
  { href: "/blog", label: "Blog" },
  { href: "/tentang-kami", label: "Tentang" },
  { href: "/kontak", label: "Kontak" },
];

import Image from "next/image";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-2.5", className)}
      aria-label={`${siteConfig.name} — beranda`}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors group-hover:brightness-110">
        <Image src="/kj-logo-brand.svg" alt="Katalog Jasa" width={36} height={36} priority />
      </span>
      <span className="font-serif text-xl font-semibold tracking-tight text-ink">
        Katalog<span className="text-accent">.Jasa</span>
      </span>
    </Link>
  );
}

function useNavbarAuth() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setReady(true);
      return;
    }
    let mounted = true;
    const auth = getFirebaseAuth();
    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      if (!mounted) return;
      if (fbUser) {
        setEmail(fbUser.email || "");
        setLoggedIn(true);
        try {
          const db = getFirebaseDb();
          const snap = await getDoc(doc(db, "users", fbUser.uid));
          if (mounted && snap.exists()) {
            const d = snap.data();
            setName(d.name || fbUser.email || "");
            setRole(d.role || "");
          } else if (mounted) {
            setName(fbUser.email || "");
          }
        } catch {
          if (mounted) setName(fbUser.email || "");
        }
      } else {
        setLoggedIn(false);
        setEmail("");
        setName("");
        setRole("");
      }
      if (mounted) setReady(true);
    });
    return () => { mounted = false; unsub(); };
  }, []);

  return { email, name, role, loggedIn, ready };
}

function SignOutButton({ className, onClick }: { className?: string; onClick?: () => void }) {
  async function handle() {
    if (!isFirebaseConfigured) return;
    const { signOut } = await import("firebase/auth");
    await signOut(getFirebaseAuth());
    onClick?.();
  }
  return (
    <button onClick={handle} className={className} aria-label="Keluar">
      <LogOut className="h-4 w-4" />
    </button>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { email, name, role, loggedIn, ready } = useNavbarAuth();
  const showAdmin = loggedIn;
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-accent/20 bg-background/90 backdrop-blur-md">
      <nav className="mx-auto flex h-16 w-full max-w-[1280px] items-center justify-between px-6 md:h-[72px] md:px-10 lg:px-20">
        <Logo />

        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : link.href === "/katalog"
                  ? pathname.startsWith("/katalog") || pathname.startsWith("/produk")
                  : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-accent",
                  active ? "text-primary" : "text-muted"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/keranjang"
            className="relative rounded-xl border border-line bg-white p-2 text-sm text-muted transition hover:border-accent hover:text-accent"
            aria-label="Keranjang"
          >
            <ShoppingCart className="h-4 w-4" />
            {totalItems > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </Link>
          {showAdmin && (
            <Link
              href="/admin"
              className={buttonVariants({ variant: "accent", size: "default" })}
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
          )}
          {loggedIn && (
            <>
              <div className="flex items-center gap-2 rounded-xl border border-line bg-white px-3 py-2 text-sm font-medium text-ink">
                <User className="h-4 w-4 text-accent" />
                <span>{name || email}</span>
              </div>
              <SignOutButton
                className="rounded-xl border border-line bg-white p-2 text-sm text-muted transition hover:border-red-300 hover:text-red-500"
              />
            </>
          )}
          {!loggedIn && ready && (
            <Link
              href="/login"
              className={buttonVariants({ variant: "accent", size: "default" })}
            >
              Masuk
            </Link>
          )}
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href="/keranjang"
            className="relative inline-flex items-center justify-center rounded-full border border-line bg-white p-2 text-muted"
            aria-label="Keranjang"
          >
            <ShoppingCart className="h-4 w-4" />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </Link>
          {loggedIn && showAdmin && (
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-xs font-medium text-white shadow-sm"
              aria-label="Admin Dashboard"
            >
              <LayoutDashboard className="h-3.5 w-3.5" />
              Admin
            </Link>
          )}
          {!loggedIn && ready && (
            <Link
              href="/login"
              className={buttonVariants({ variant: "accent", size: "icon" })}
              aria-label="Masuk"
            >
              <User className="h-5 w-5" />
            </Link>
          )}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Buka menu"
            className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent transition-colors hover:bg-accent hover:text-white"
          >
            <Menu className="h-3.5 w-3.5" />
            Menu
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              aria-label="Tutup menu"
              className="fixed inset-0 z-40 bg-primary/40 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="fixed right-0 top-0 z-50 flex h-dvh w-[82%] max-w-sm flex-col bg-background shadow-2xl lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex h-16 items-center justify-between border-b border-line px-6">
                <Logo />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Tutup menu"
                  className={buttonVariants({ variant: "ghost", size: "icon" })}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-[52px] items-center rounded-lg px-4 font-serif text-xl font-medium text-ink transition-colors hover:bg-surface"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/keranjang"
                  onClick={() => setOpen(false)}
                  className="flex min-h-[52px] items-center rounded-lg px-4 font-serif text-xl font-medium text-ink transition-colors hover:bg-surface"
                >
                  <ShoppingCart className="mr-3 h-5 w-5" />
                  Keranjang
                  {totalItems > 0 && (
                    <span className="ml-2 rounded-full bg-accent px-2 py-0.5 text-xs font-bold text-white">
                      {totalItems}
                    </span>
                  )}
                </Link>
                {showAdmin && (
                  <Link
                    href="/admin"
                    onClick={() => setOpen(false)}
                    className="flex min-h-[52px] items-center rounded-lg bg-accent/10 px-4 font-serif text-xl font-medium text-accent transition-colors"
                  >
                    <LayoutDashboard className="mr-3 h-5 w-5" />
                    Dashboard Admin
                  </Link>
                )}
              </div>
              <div className="border-t border-line p-6 space-y-3">
                {loggedIn ? (
                  <>
                    <div className="flex items-center gap-2 text-sm font-medium text-ink">
                      <User className="h-4 w-4 text-accent" />
                      {name || email}
                    </div>
                    <SignOutButton
                      className="flex w-full items-center gap-2 rounded-xl border border-line px-4 py-2.5 text-sm text-ink hover:bg-bg-soft"
                      onClick={() => setOpen(false)}
                    />
                  </>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className={buttonVariants({ variant: "accent", size: "lg", className: "w-full" })}
                  >
                    Masuk
                  </Link>
                )}
                <p className="text-center text-xs text-faint">
                  {siteConfig.whatsappDisplay} · {siteConfig.hours}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
