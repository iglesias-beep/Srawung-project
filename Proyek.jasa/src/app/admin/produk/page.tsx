"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProducts, getCategories, deleteProduct } from "@/lib/firestore";
import { formatRupiah } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, Search, Loader2 } from "lucide-react";

export default function AdminProdukPage() {
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["admin-products"],
    queryFn: () => getProducts(),
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      setDeleteId(null);
    },
  });

  const filtered = products.filter((p) =>
    p.nama.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold font-[family-name:var(--font-display)] text-text-primary tracking-tight">
          Kelola Produk
        </h1>
        <Link href="/admin/produk/tambah">
          <Button variant="emerald">
            <Plus className="h-4 w-4 mr-1" /> Tambah
          </Button>
        </Link>
      </div>

      <div className="relative max-w-md mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
        <Input
          placeholder="Cari produk..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-bg-surface animate-pulse rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-[#E5E7EB]">
          <table className="w-full text-sm">
            <thead className="bg-bg-surface">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-text-muted">Produk</th>
                <th className="text-left py-3 px-4 font-medium text-text-muted hidden sm:table-cell">Kategori</th>
                <th className="text-left py-3 px-4 font-medium text-text-muted">Harga</th>
                <th className="text-left py-3 px-4 font-medium text-text-muted hidden sm:table-cell">Status</th>
                <th className="text-right py-3 px-4 font-medium text-text-muted">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => {
                const cat = categories.find((c) => c.id === product.category_id);
                return (
                  <tr key={product.id} className="border-t border-[#E5E7EB] hover:bg-bg-elevated/30 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-bg-base overflow-hidden shrink-0 border border-[#E5E7EB]">
                          {product.gambar[0] ? (
                            <img src={product.gambar[0]} alt="" className="h-full w-full object-cover" />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-[10px] text-text-muted">N/A</div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-text-primary">{product.nama}</p>
                          <p className="text-xs text-text-muted sm:hidden">{cat?.nama}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 hidden sm:table-cell text-text-muted">{cat?.nama || "-"}</td>
                    <td className="py-3 px-4 font-medium text-text-primary tabular-nums">{formatRupiah(product.harga)}</td>
                    <td className="py-3 px-4 hidden sm:table-cell">
                      <Badge variant={product.status === "aktif" ? "emerald" : "secondary"}>{product.status}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/produk/edit?id=${product.id}`}>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-text-muted hover:text-destructive"
                          onClick={() => setDeleteId(product.id)}
                          disabled={deleteId === product.id}
                        >
                          {deleteId === product.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-bg-surface border border-[#E5E7EB] rounded-xl p-6 max-w-sm mx-4 space-y-4 shadow-2xl">
            <h3 className="text-lg font-semibold font-[family-name:var(--font-display)] text-text-primary">
              Hapus Produk?
            </h3>
            <p className="text-sm text-text-muted">Tindakan ini tidak dapat dibatalkan.</p>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setDeleteId(null)}>
                Batal
              </Button>
              <Button
                variant="destructive"
                onClick={() => deleteMutation.mutate(deleteId)}
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Hapus"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
