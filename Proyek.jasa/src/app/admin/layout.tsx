"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { LayoutDashboard, Package, Tag, ShoppingCart, PenLine, LogOut, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const sidebarLinks = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/produk", label: "Produk", icon: Package },
  { href: "/admin/kategori", label: "Kategori", icon: Tag },
  { href: "/admin/pesanan", label: "Pesanan", icon: ShoppingCart },
  { href: "/admin/blog", label: "Blog", icon: PenLine },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, userProfile, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!loading && !isLoginPage && (!user || userProfile?.role !== "admin")) {
      router.push("/admin/login");
    }
  }, [user, userProfile, loading, router, isLoginPage]);

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center bg-bg-base">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-accent-brass border-t-transparent" />
      </div>
    );
  }

  if (isLoginPage) return <>{children}</>;
  if (!user || userProfile?.role !== "admin") return null;

  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-bg-base">
      <aside className="hidden lg:flex w-64 flex-col border-r border-[#E5E7EB] bg-bg-surface">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-1">
            <Shield className="h-5 w-5 text-accent-brass" />
            <span className="font-semibold font-[family-name:var(--font-display)] text-text-primary">Admin Panel</span>
          </div>
          <p className="text-xs text-text-muted truncate">{user.email}</p>
        </div>
        <nav className="flex-1 px-3 space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-accent-brass/10 text-accent-brass border border-accent-brass/20"
                    : "text-text-muted hover:bg-bg-elevated hover:text-text-primary border border-transparent"
                }`}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-[#E5E7EB]">
          <Button variant="ghost" className="w-full justify-start text-text-muted" onClick={async () => { await logout(); router.push("/admin/login"); }}>
            <LogOut className="h-4 w-4 mr-3" />
            Keluar
          </Button>
        </div>
      </aside>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-bg-surface/95 backdrop-blur-xl border-t border-[#E5E7EB] z-40">
        <nav className="flex items-center justify-around py-2">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex flex-col items-center gap-1 px-3 py-2 text-xs min-w-[60px] min-h-[44px] justify-center rounded-lg transition-colors ${
                  isActive ? "text-accent-brass" : "text-text-muted"
                }`}
              >
                <link.icon className="h-5 w-5" />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex-1 pb-20 lg:pb-0">{children}</div>
    </div>
  );
}
