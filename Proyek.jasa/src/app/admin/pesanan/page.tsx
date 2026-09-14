"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getOrders, updateOrderStatus } from "@/lib/firestore";
import { formatRupiah } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Package } from "lucide-react";

export default function AdminPesananPage() {
  const queryClient = useQueryClient();
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: getOrders,
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: "baru" | "diproses" | "selesai" | "dibatalkan";
    }) => updateOrderStatus(id, status),
    onMutate: ({ id }) => setUpdatingId(id),
    onSettled: () => {
      setUpdatingId(null);
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
    },
  });

  const statusBadge: Record<string, { variant: "emerald" | "brass" | "default" | "secondary"; label: string }> = {
    baru: { variant: "emerald", label: "Baru" },
    diproses: { variant: "brass", label: "Diproses" },
    selesai: { variant: "default", label: "Selesai" },
    dibatalkan: { variant: "secondary", label: "Dibatalkan" },
  };

  const statusOptions = [
    { value: "baru", label: "Baru", variant: "emerald" as const },
    { value: "diproses", label: "Diproses", variant: "brass" as const },
    { value: "selesai", label: "Selesai", variant: "default" as const },
    { value: "dibatalkan", label: "Dibatalkan", variant: "destructive" as const },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold font-[family-name:var(--font-display)] text-text-primary mb-8 tracking-tight">
        Kelola Pesanan
      </h1>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-24 bg-bg-surface animate-pulse rounded-xl" />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-16">
          <Package className="h-12 w-12 text-text-muted mx-auto mb-4" />
          <p className="text-text-muted text-lg">Belum ada pesanan</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardContent className="p-6 space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-text-muted">#{order.id.slice(0, 8)}</span>
                      <Badge variant={statusBadge[order.status]?.variant || "default"}>
                        {order.status}
                      </Badge>
                    </div>
                    <p className="font-semibold text-text-primary font-[family-name:var(--font-display)]">
                      {order.user_nama || "Tanpa Nama"}
                    </p>
                    <p className="text-sm text-text-muted">
                      {order.user_email} &middot; {order.user_no_hp || "-"}
                    </p>
                    {order.user_alamat && (
                      <p className="text-sm text-text-muted">{order.user_alamat}</p>
                    )}
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-xl font-bold text-text-primary tabular-nums">
                      {formatRupiah(order.total)}
                    </p>
                    <p className="text-xs text-text-muted">
                      {new Date(order.dibuat_pada).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="border-t border-[#E5E7EB] pt-3">
                  <p className="text-xs font-medium text-text-muted mb-2">Item Pesanan:</p>
                  <div className="space-y-1">
                    {order.items?.map((item, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span className="text-text-primary">
                          {item.nama} x{item.jumlah}
                          {item.catatan_custom && (
                            <span className="text-text-muted ml-2">({item.catatan_custom})</span>
                          )}
                        </span>
                        <span className="text-text-primary tabular-nums">
                          {formatRupiah(item.harga_saat_pesan * item.jumlah)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-[#E5E7EB] pt-3 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <span className="text-sm text-text-muted shrink-0">Ubah Status:</span>
                  <div className="flex gap-2 flex-wrap">
                    {statusOptions.map((opt) => (
                      <Button
                        key={opt.value}
                        variant={order.status === opt.value ? opt.variant === "destructive" ? "destructive" : "emerald" : "outline"}
                        size="sm"
                        onClick={() =>
                          updateMutation.mutate({
                            id: order.id,
                            status: opt.value as "baru" | "diproses" | "selesai" | "dibatalkan",
                          })
                        }
                        disabled={updatingId === order.id}
                      >
                        {updatingId === order.id && order.status !== opt.value ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        ) : (
                          opt.label
                        )}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
