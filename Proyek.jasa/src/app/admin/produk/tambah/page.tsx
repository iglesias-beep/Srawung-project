"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getCategories, addProduct } from "@/lib/firestore";
import { uploadMultipleImages } from "@/lib/storage";
import { slugify } from "@/lib/utils";
import { productSchema, type ProductFormData } from "@/schemas/product.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Loader2, Upload } from "lucide-react";
import Link from "next/link";

export default function AdminTambahProdukPage() {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState("");
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      status: "aktif",
      satuan: "Unit",
      gambar: [],
    },
  });

  const nama = watch("nama");

  const onSubmit = async (data: ProductFormData) => {
    setError("");
    try {
      const now = new Date().toISOString();
      await addProduct({
        ...data,
        slug: slugify(data.nama),
        gambar: data.gambar,
        dibuat_pada: now,
        diupdate_pada: now,
      });
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      router.push("/admin/produk");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Gagal menyimpan produk.";
      setError(message);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setUploadProgress(0);
    try {
      const urls = await uploadMultipleImages(
        Array.from(files),
        `products/${slugify(nama || "produk")}`,
        (_, progress) => setUploadProgress(progress)
      );
      const current = watch("gambar") || [];
      setValue("gambar", [...current, ...urls], { shouldValidate: true });
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const gambar = watch("gambar") || [];

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link href="/admin/produk">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Kembali
          </Button>
        </Link>
      </div>

      <h1 className="text-3xl font-bold font-[family-name:var(--font-display)] text-text-primary mb-8 tracking-tight">
        Tambah Produk Baru
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {error && (
          <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="text-lg font-semibold font-[family-name:var(--font-display)] text-text-primary">
              Informasi Produk
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-text-primary mb-1 block">Nama Produk</label>
                <Input {...register("nama")} placeholder="Contoh: Papan Nama Custom" />
                {errors.nama && (
                  <p className="text-xs text-destructive mt-1">{errors.nama.message}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-text-primary mb-1 block">Kategori</label>
                <Select
                  {...register("category_id")}
                  placeholder="Pilih kategori"
                  options={categories.map((c) => ({ value: c.id, label: c.nama }))}
                />
                {errors.category_id && (
                  <p className="text-xs text-destructive mt-1">{errors.category_id.message}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-text-primary mb-1 block">Satuan</label>
                <Input {...register("satuan")} placeholder="Unit / Huruf / Rambu" />
                {errors.satuan && (
                  <p className="text-xs text-destructive mt-1">{errors.satuan.message}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-text-primary mb-1 block">Harga (Rp)</label>
                <Input
                  type="number"
                  {...register("harga", { valueAsNumber: true })}
                  placeholder="150000"
                />
                {errors.harga && (
                  <p className="text-xs text-destructive mt-1">{errors.harga.message}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-text-primary mb-1 block">Status</label>
                <Select
                  {...register("status")}
                  options={[
                    { value: "aktif", label: "Aktif" },
                    { value: "nonaktif", label: "Nonaktif" },
                  ]}
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-text-primary mb-1 block">Deskripsi Singkat</label>
                <Input
                  {...register("deskripsi_singkat")}
                  placeholder="Ringkasan singkat produk"
                />
                {errors.deskripsi_singkat && (
                  <p className="text-xs text-destructive mt-1">{errors.deskripsi_singkat.message}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-text-primary mb-1 block">Deskripsi Lengkap</label>
                <Textarea
                  {...register("deskripsi_lengkap")}
                  placeholder="Deskripsi lengkap produk..."
                  rows={5}
                />
                {errors.deskripsi_lengkap && (
                  <p className="text-xs text-destructive mt-1">{errors.deskripsi_lengkap.message}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="text-lg font-semibold font-[family-name:var(--font-display)] text-text-primary">
              Gambar Produk
            </h2>

            <div>
              <label className="text-sm font-medium text-text-primary mb-2 block">Upload Gambar</label>
              <div className="flex items-center gap-4">
                <label className="cursor-pointer">
                  <div className="flex items-center gap-2 px-4 py-2 border border-[#E5E7EB] rounded-lg hover:bg-bg-elevated transition-colors text-sm text-text-primary">
                    <Upload className="h-4 w-4" />
                    {uploading ? `Uploading ${uploadProgress.toFixed(0)}%...` : "Pilih Gambar"}
                  </div>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                    disabled={uploading}
                  />
                </label>
                {uploading && (
                  <div className="flex-1 h-2 bg-bg-base rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent-emerald transition-all"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                )}
              </div>
            </div>

            {gambar.length > 0 && (
              <div className="grid grid-cols-4 gap-2">
                {gambar.map((url, i) => (
                  <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-bg-base border border-[#E5E7EB]">
                    <img src={url} alt="" className="h-full w-full object-cover" />
                    <button
                      type="button"
                      className="absolute top-1 right-1 h-5 w-5 rounded-full bg-destructive text-white flex items-center justify-center text-xs"
                      onClick={() => {
                        setValue(
                          "gambar",
                          gambar.filter((_, j) => j !== i),
                          { shouldValidate: true }
                        );
                      }}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            )}

            {errors.gambar && (
              <p className="text-xs text-destructive">{errors.gambar.message}</p>
            )}
          </CardContent>
        </Card>

        <Button type="submit" variant="emerald" size="lg" className="w-full">
          Simpan Produk
        </Button>
      </form>
    </div>
  );
}
