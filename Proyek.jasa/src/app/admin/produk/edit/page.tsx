"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { localProducts, localCategories } from "@/lib/local-data";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, type ProductFormData } from "@/schemas/product.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

const isFirebaseConfigured = typeof process !== "undefined" && process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== "your_api_key";

function EditForm() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      if (!id) return null;
      if (isFirebaseConfigured) {
        const snap = await getDoc(doc(db, "products", id));
        if (snap.exists()) return { id: snap.id, ...snap.data() } as ProductFormData & { id: string };
      }
      return localProducts.find((p) => p.id === id) || null;
    },
    enabled: !!id,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    values: product
      ? {
          nama: product.nama,
          slug: product.slug,
          category_id: product.category_id,
          harga: product.harga,
          satuan: product.satuan,
          deskripsi_singkat: product.deskripsi_singkat,
          deskripsi_lengkap: product.deskripsi_lengkap || "",
          gambar: product.gambar || [],
          status: product.status || "aktif",
          stok: product.stok ?? 0,
        }
      : undefined,
  });

  const onSubmit = async (data: ProductFormData) => {
    if (!isFirebaseConfigured || !id) return;
    setSaving(true);
    try {
      await updateDoc(doc(db, "products", id), {
        ...data,
        updated_at: new Date().toISOString(),
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  if (!id) {
    return (
      <div className="p-8 text-center">
        <p className="text-text-muted">ID produk tidak ditemukan.</p>
        <Link href="/admin/produk"><Button variant="outline" className="mt-4">Kembali</Button></Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-bg-elevated rounded w-1/4" />
          <div className="h-96 bg-bg-elevated rounded-xl" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-8 text-center">
        <p className="text-text-muted">Produk tidak ditemukan.</p>
        <Link href="/admin/produk"><Button variant="outline" className="mt-4">Kembali</Button></Link>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/produk">
          <Button variant="outline" size="icon"><ArrowLeft className="h-4 w-4" /></Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-display)] text-text-primary">Edit Produk</h1>
          <p className="text-sm text-text-muted">{product.nama}</p>
        </div>
      </div>

      {success && (
        <div className="bg-accent-emerald/10 border border-accent-emerald/20 text-accent-emerald px-4 py-3 rounded-lg text-sm font-medium">
          Produk berhasil diperbarui!
        </div>
      )}

      <Card>
        <CardHeader><CardTitle>Informasi Produk</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-text-primary mb-1 block">Nama Produk</label>
                <Input {...register("nama")} />
                {errors.nama && <p className="text-destructive text-xs mt-1">{errors.nama.message}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-text-primary mb-1 block">Slug</label>
                <Input {...register("slug")} />
                {errors.slug && <p className="text-destructive text-xs mt-1">{errors.slug.message}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-text-primary mb-1 block">Harga (Rp)</label>
                <Input type="number" {...register("harga", { valueAsNumber: true })} />
                {errors.harga && <p className="text-destructive text-xs mt-1">{errors.harga.message}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-text-primary mb-1 block">Satuan</label>
                <Input {...register("satuan")} placeholder="pcs, m2, unit" />
                {errors.satuan && <p className="text-destructive text-xs mt-1">{errors.satuan.message}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-text-primary mb-1 block">Kategori</label>
                <select
                  {...register("category_id")}
                  className="w-full rounded-lg border border-[#E5E7EB] bg-bg-surface px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-brass/40"
                >
                  {localCategories.map((c) => (
                    <option key={c.id} value={c.id}>{c.nama}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-text-primary mb-1 block">Stok</label>
                <Input type="number" {...register("stok", { valueAsNumber: true })} />
              </div>
              <div>
                <label className="text-sm font-medium text-text-primary mb-1 block">Status</label>
                <select
                  {...register("status")}
                  className="w-full rounded-lg border border-[#E5E7EB] bg-bg-surface px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-brass/40"
                >
                  <option value="aktif">Aktif</option>
                  <option value="nonaktif">Nonaktif</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-text-primary mb-1 block">Deskripsi Singkat</label>
              <Textarea {...register("deskripsi_singkat")} rows={2} />
              {errors.deskripsi_singkat && <p className="text-destructive text-xs mt-1">{errors.deskripsi_singkat.message}</p>}
            </div>
            <div>
              <label className="text-sm font-medium text-text-primary mb-1 block">Deskripsi Lengkap</label>
              <Textarea {...register("deskripsi_lengkap")} rows={5} />
            </div>
            <div>
              <label className="text-sm font-medium text-text-primary mb-1 block">URL Gambar (satu per baris)</label>
              <Textarea
                rows={4}
                defaultValue={(product.gambar || []).join("\n")}
                placeholder="https://example.com/image1.jpg"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <Button type="submit" disabled={saving || !isFirebaseConfigured}>
                <Save className="h-4 w-4" />
                {saving ? "Menyimpan..." : "Simpan Perubahan"}
              </Button>
              <Link href="/admin/produk"><Button variant="outline" type="button">Batal</Button></Link>
            </div>
            {!isFirebaseConfigured && (
              <p className="text-xs text-text-muted">Mode demo — koneksi Firebase belum dikonfigurasi.</p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function EditProdukPage() {
  return (
    <Suspense fallback={<div className="p-8"><div className="animate-pulse space-y-4"><div className="h-8 bg-bg-elevated rounded w-1/4" /><div className="h-96 bg-bg-elevated rounded-xl" /></div></div>}>
      <EditForm />
    </Suspense>
  );
}
