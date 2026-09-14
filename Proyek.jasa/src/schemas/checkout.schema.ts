import { z } from "zod";

export const checkoutSchema = z.object({
  nama: z.string().min(1, "Nama wajib diisi"),
  no_hp: z.string().min(1, "Nomor HP wajib diisi"),
  email: z.string().email("Email tidak valid"),
  alamat: z.string().min(1, "Alamat wajib diisi"),
  catatan_pengiriman: z.string().optional(),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
