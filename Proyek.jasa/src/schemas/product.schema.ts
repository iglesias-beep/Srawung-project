import { z } from "zod";

export const productSchema = z.object({
  nama: z.string().min(1, "Nama produk wajib diisi"),
  slug: z.string().min(1, "Slug wajib diisi"),
  category_id: z.string().min(1, "Kategori wajib dipilih"),
  deskripsi_singkat: z.string().min(1, "Deskripsi singkat wajib diisi"),
  deskripsi_lengkap: z.string().min(1, "Deskripsi lengkap wajib diisi"),
  harga: z.number().min(0, "Harga harus lebih dari 0"),
  satuan: z.string().min(1, "Satuan wajib diisi"),
  gambar: z.array(z.string()).min(1, "Minimal 1 gambar harus diupload"),
  stok: z.number().optional(),
  status: z.enum(["aktif", "nonaktif"]),
});

export type ProductFormData = z.infer<typeof productSchema>;
