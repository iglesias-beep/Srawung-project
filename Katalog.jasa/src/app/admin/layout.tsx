"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { LayoutDashboard, Package, ShoppingCart, Users, LogOut, AlertCircle } from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Produk", href: "/admin/produk", icon: Package },
  { label: "Pesanan", href: "/admin/pesanan", icon: ShoppingCart },
  { label: "Users", href: "/admin/users", icon: Users },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, userData, loading, authError } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [debug, setDebug] = useState("");

  useEffect(() => {
    if (!loading) {
      setDebug(`user: ${user ? user.email : "null"}, role: ${userData?.role ?? "null"}, error: ${authError || "none"}`);
      if (!user || userData?.role !== "admin") {
        router.push("/login");
      }
    }
  }, [user, userData, loading, authError, router]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-muted">Memuat...</p>
      </div>
    );
  }

  if (!user || userData?.role !== "admin") {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 p-8 text-center">
        <AlertCircle className="h-12 w-12 text-red-400" />
        <h2 className="font-serif text-2xl font-semibold text-ink">Akses Ditolak</h2>
        <p className="text-sm text-muted">{debug}</p>
        <Link href="/login" className={buttonVariants({ variant: "accent" })}>
          Login
        </Link>
      </div>
    );
  }

  return (
    <section className="bg-background">
      <Container className="py-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          <aside className="w-full shrink-0 lg:w-60">
            <div className="sticky top-24 space-y-2">
              <div className="flex items-center gap-2 px-3 pb-4">
                <Image src="/kj-logo-brand.svg" alt="Katalog Jasa" width={20} height={20} />
                <span className="font-serif text-lg font-semibold text-ink">Admin Panel</span>
              </div>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                      isActive
                        ? "bg-accent/10 text-accent"
                        : "text-muted hover:bg-bg-soft hover:text-ink"
                    }`}
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                    {item.label}
                  </Link>
                );
              })}
              <div className="border-t border-line pt-2">
                <Link
                  href="/"
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted hover:bg-bg-soft hover:text-ink"
                >
                  <LogOut className="h-4 w-4" aria-hidden />
                  Kembali ke Beranda
                </Link>
              </div>
            </div>
          </aside>
          <div className="flex-1 min-w-0">{children}</div>
        </div>
      </Container>
    </section>
  );
}
