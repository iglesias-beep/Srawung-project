"use client";

import { useQuery } from "@tanstack/react-query";
import { getDashboardStats, getOrders } from "@/lib/firestore";
import { formatRupiah } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, ShoppingCart, Clock, DollarSign } from "lucide-react";

export default function AdminDashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: getDashboardStats,
  });

  const { data: orders = [] } = useQuery({
    queryKey: ["orders-recent"],
    queryFn: async () => {
      const all = await getOrders();
      return all.slice(0, 10);
    },
  });

  const statCards = [
    { title: "Total Produk", value: stats?.totalProducts || 0, icon: Package, accent: "text-accent-brass" },
    { title: "Total Pesanan", value: stats?.totalOrders || 0, icon: ShoppingCart, accent: "text-accent-emerald" },
    { title: "Pesanan Baru", value: stats?.newOrders || 0, icon: Clock, accent: "text-accent-brass" },
    { title: "Pendapatan", value: formatRupiah(stats?.totalRevenue || 0), icon: DollarSign, accent: "text-accent-emerald" },
  ];

  const statusVariant: Record<string, "emerald" | "brass" | "default" | "secondary"> = {
    baru: "emerald",
    diproses: "brass",
    selesai: "emerald",
    dibatalkan: "secondary",
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold font-[family-name:var(--font-display)] text-text-primary mb-8 tracking-tight">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card) => (
          <Card key={card.title}>
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className={`flex h-11 w-11 items-center justify-center rounded-lg bg-bg-base ${card.accent}`}>
                  <card.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-text-muted">{card.title}</p>
                  <p className="text-xl font-bold text-text-primary font-[family-name:var(--font-display)]">{card.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold font-[family-name:var(--font-display)] text-text-primary mb-4">
            Pesanan Terbaru
          </h2>
          {isLoading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-12 bg-bg-base animate-pulse rounded-lg" />
              ))}
            </div>
          ) : orders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#E5E7EB]">
                    <th className="text-left py-3 px-2 font-medium text-text-muted">ID</th>
                    <th className="text-left py-3 px-2 font-medium text-text-muted">Pelanggan</th>
                    <th className="text-left py-3 px-2 font-medium text-text-muted">Total</th>
                    <th className="text-left py-3 px-2 font-medium text-text-muted">Status</th>
                    <th className="text-left py-3 px-2 font-medium text-text-muted">Tanggal</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-[#E5E7EB] last:border-0">
                      <td className="py-3 px-2 font-mono text-xs text-text-muted">{order.id.slice(0, 8)}...</td>
                      <td className="py-3 px-2 text-text-primary">{order.user_nama || "-"}</td>
                      <td className="py-3 px-2 font-medium text-text-primary tabular-nums">{formatRupiah(order.total)}</td>
                      <td className="py-3 px-2">
                        <Badge variant={statusVariant[order.status] || "default"}>{order.status}</Badge>
                      </td>
                      <td className="py-3 px-2 text-text-muted">{new Date(order.dibuat_pada).toLocaleDateString("id-ID")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-text-muted py-8">Belum ada pesanan</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
