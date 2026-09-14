"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCategories, addCategory, updateCategory, deleteCategory } from "@/lib/firestore";
import { slugify } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Pencil, Trash2, Loader2, Check, X } from "lucide-react";

export default function AdminKategoriPage() {
  const [isAdding, setIsAdding] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const queryClient = useQueryClient();

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const addMutation = useMutation({
    mutationFn: addCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      resetForm();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: { nama: string; slug: string; deskripsi: string } }) =>
      updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      setEditId(null);
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      setDeleteId(null);
    },
  });

  const resetForm = () => {
    setNama("");
    setDeskripsi("");
    setIsAdding(false);
    setEditId(null);
  };

  const handleAdd = () => {
    if (!nama.trim()) return;
    addMutation.mutate({
      nama: nama.trim(),
      slug: slugify(nama),
      urutan: categories.length + 1,
      deskripsi: deskripsi.trim(),
    });
  };

  const handleUpdate = (id: string) => {
    if (!nama.trim()) return;
    updateMutation.mutate({
      id,
      data: { nama: nama.trim(), slug: slugify(nama), deskripsi: deskripsi.trim() },
    });
  };

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold font-[family-name:var(--font-display)] text-text-primary tracking-tight">
          Kelola Kategori
        </h1>
        <Button
          variant="emerald"
          onClick={() => {
            resetForm();
            setIsAdding(true);
          }}
        >
          <Plus className="h-4 w-4 mr-1" /> Tambah
        </Button>
      </div>

      {isAdding && (
        <Card className="mb-6">
          <CardContent className="p-6 space-y-4">
            <h3 className="font-semibold font-[family-name:var(--font-display)] text-text-primary">
              Tambah Kategori Baru
            </h3>
            <Input
              placeholder="Nama kategori"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />
            <Textarea
              placeholder="Deskripsi (opsional)"
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              rows={2}
            />
            <div className="flex gap-2">
              <Button
                variant="emerald"
                onClick={handleAdd}
                disabled={addMutation.isPending || !nama.trim()}
              >
                {addMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Check className="h-4 w-4 mr-1" />
                )}
                Simpan
              </Button>
              <Button variant="outline" onClick={resetForm}>
                Batal
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {isLoading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-bg-surface animate-pulse rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="flex items-center gap-4 p-4 rounded-xl border border-[#E5E7EB] bg-bg-surface transition-all duration-300 hover:bg-bg-elevated/50"
            >
              {editId === cat.id ? (
                <div className="flex-1 space-y-2">
                  <Input
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    placeholder="Nama kategori"
                  />
                  <Textarea
                    value={deskripsi}
                    onChange={(e) => setDeskripsi(e.target.value)}
                    placeholder="Deskripsi"
                    rows={2}
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="emerald"
                      onClick={() => handleUpdate(cat.id)}
                      disabled={updateMutation.isPending || !nama.trim()}
                    >
                      {updateMutation.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Check className="h-4 w-4" />
                      )}
                    </Button>
                    <Button size="sm" variant="outline" onClick={resetForm}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="h-10 w-10 rounded-lg bg-accent-brass/10 border border-accent-brass/20 flex items-center justify-center text-accent-brass font-[family-name:var(--font-display)] font-bold shrink-0">
                    {cat.nama.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-text-primary font-[family-name:var(--font-display)]">
                      {cat.nama}
                    </p>
                    <p className="text-xs text-text-muted">/{cat.slug}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => {
                        setNama(cat.nama);
                        setDeskripsi(cat.deskripsi || "");
                        setEditId(cat.id);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-text-muted hover:text-destructive"
                      onClick={() => setDeleteId(cat.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-bg-surface border border-[#E5E7EB] rounded-xl p-6 max-w-sm mx-4 space-y-4 shadow-2xl">
            <h3 className="text-lg font-semibold font-[family-name:var(--font-display)] text-text-primary">
              Hapus Kategori?
            </h3>
            <p className="text-sm text-text-muted">Kategori yang dihapus tidak dapat dikembalikan.</p>
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
