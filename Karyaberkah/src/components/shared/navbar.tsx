"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { ShoppingCart, Menu, X, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/hooks/use-cart"
import { useAuth } from "@/hooks/use-auth"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/katalog", label: "Toko" },
  { href: "/blog", label: "Blog" },
  { href: "#kontak", label: "Kontak" },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const itemCount = useCartStore((s) => s.getItemCount())
  const { user, signOut } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border-color)] bg-[var(--background)]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <Image src="/logo.svg" alt="Karyaberkah" width={34} height={34} priority />
          <span className="font-[family-name:var(--font-display)] text-lg font-bold tracking-tight text-[var(--foreground)]">
            Karyaberkah
          </span>
        </Link>

        {/* Center Nav */}
        <nav className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-[var(--muted-fg)] hover:text-[var(--foreground)] rounded-lg transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <Link href="/keranjang" className="relative">
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[var(--emerald)] text-[9px] font-bold text-white px-1">
                  {itemCount}
                </span>
              )}
            </Button>
          </Link>

          {user ? (
            <div className="hidden lg:flex items-center gap-2">
              {user.role === "admin" && (
                <Link href="/admin/dashboard">
                  <Button variant="ghost" size="sm" className="text-sm">
                    Admin
                  </Button>
                </Link>
              )}
              <Button variant="ghost" size="sm" className="text-sm" onClick={signOut}>
                Keluar
              </Button>
            </div>
          ) : (
            <Link href="/login" className="hidden lg:block">
              <Button variant="ghost" size="sm" className="gap-1.5 text-sm">
                <User className="h-4 w-4" />
                Masuk
              </Button>
            </Link>
          )}

          {/* Mobile Menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger render={<Button variant="ghost" size="icon" className="h-10 w-10 lg:hidden" />}>
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-[var(--background)] p-6">
              <div className="flex items-center gap-2.5 mb-8">
                <Image src="/logo.svg" alt="Karyaberkah" width={28} height={28} />
                <span className="font-[family-name:var(--font-display)] text-base font-bold text-[var(--foreground)]">
                  Karyaberkah
                </span>
              </div>
              <nav className="flex flex-col gap-0.5">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-3 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--elevated)] transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <hr className="border-[var(--border-color)] my-5" />
              <div className="flex flex-col gap-2.5">
                {user ? (
                  <>
                    {user.role === "admin" && (
                      <Link href="/admin/dashboard" onClick={() => setOpen(false)}>
                        <Button variant="outline" size="sm" className="w-full justify-start text-sm">
                          Dashboard Admin
                        </Button>
                      </Link>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => { signOut(); setOpen(false) }}
                      className="justify-start text-sm"
                    >
                      Keluar
                    </Button>
                  </>
                ) : (
                  <Link href="/login" onClick={() => setOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full gap-2 text-sm">
                      <User className="h-4 w-4" />
                      Masuk / Daftar
                    </Button>
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
