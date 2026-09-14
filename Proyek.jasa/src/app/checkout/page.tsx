"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCartStore } from "@/hooks/use-cart";
import { useAuth } from "@/hooks/use-auth";
import { addOrder } from "@/lib/firestore";
import { formatRupiah } from "@/lib/utils";
import { checkoutSchema, type CheckoutFormData } from "@/schemas/checkout.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Check, ShoppingBag } from "lucide-react";

function CheckoutForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const { items, getTotal, clearCart } = useCartStore();
  const { user, userProfile, loading: authLoading } = useAuth();
  const router = useRouter();
  const total = getTotal();

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login?redirect=checkout");
    }
  }, [user, authLoading, router]);

  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      nama: userProfile?.nama || "",
      email: user?.email || "",
      no_hp: userProfile?.no_hp || "",
      alamat: userProfile?.alamat || "",
    },
  });

  const onSubmit = async (data: CheckoutFormData) => {
    setLoading(true);
    setError("");
    try {
      await addOrder({
        user_id: user!.uid,
        user_nama: data.nama,
        user_email: data.email,
        user_no_hp: data.no_hp,
        user_alamat: data.alamat,
        status: "baru",
        total,
        catatan_pengiriman: data.catatan_pengiriman || "",
        items: items.map((item) => ({
          product_id: item.product_id,
          nama: item.nama,
          jumlah: item.jumlah,
          harga_saat_pesan: item.harga,
          catatan_custom: item.catatan_custom,
          satuan: item.satuan,
        })),
        dibuat_pada: new Date().toISOString(),
        diupdate_pada: new Date().toISOString(),
      });
      clearCart();
      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Gagal membuat pesanan.");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-accent-brass" />
      </div>
    );
  }

  if (success) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent-emerald/10 border border-accent-emerald/20">
          <Check className="h-10 w-10 text-accent-emerald" />
        </div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-display)] text-text-primary mb-2">
          Pesanan Berhasil!
        </h1>
        <p className="text-text-muted mb-6">Tim kami akan segera menghubungi Anda untuk konfirmasi.</p>
        <Button variant="emerald" onClick={() => router.push("/")}>Kembali ke Beranda</Button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <ShoppingBag className="h-12 w-12 text-accent-brass mx-auto mb-4" />
        <h1 className="text-2xl font-bold font-[family-name:var(--font-display)] text-text-primary mb-2">Keranjang Kosong</h1>
        <p className="text-text-muted mb-6">Tambahkan produk terlebih dahulu sebelum checkout.</p>
        <Button variant="emerald" onClick={() => router.push("/katalog")}>Lihat Katalog</Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <h1 className="text-3xl font-bold font-[family-name:var(--font-display)] text-text-primary mb-8 tracking-tight">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-3 space-y-6">
          {error && (
            <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">{error}</div>
          )}

          <div className="rounded-xl border border-[#E5E7EB] bg-bg-surface p-6 space-y-4">
            <h2 className="text-lg font-semibold font-[family-name:var(--font-display)] text-text-primary">Data Diri</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-text-primary mb-1 block">Nama Lengkap</label>
                <Input {...register("nama")} placeholder="Nama Anda" />
                {errors.nama && <p className="text-xs text-destructive mt-1">{errors.nama.message}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-text-primary mb-1 block">No. HP / WhatsApp</label>
                <Input {...register("no_hp")} placeholder="0812-xxxx-xxxx" />
                {errors.no_hp && <p className="text-xs text-destructive mt-1">{errors.no_hp.message}</p>}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-text-primary mb-1 block">Email</label>
              <Input type="email" {...register("email")} placeholder="email@contoh.com" />
              {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label className="text-sm font-medium text-text-primary mb-1 block">Alamat Lengkap</label>
              <Textarea {...register("alamat")} placeholder="Alamat untuk pengiriman/pemasangan" rows={3} />
              {errors.alamat && <p className="text-xs text-destructive mt-1">{errors.alamat.message}</p>}
            </div>
            <div>
              <label className="text-sm font-medium text-text-primary mb-1 block">Catatan Pengiriman (opsional)</label>
              <Textarea {...register("catatan_pengiriman")} placeholder="Catatan pengiriman atau pemasangan" rows={2} />
            </div>
          </div>

          <Button type="submit" variant="emerald" size="lg" className="w-full" disabled={loading}>
            {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Memproses...</> : "Buat Pesanan"}
          </Button>
        </form>

        {/* Order Summary */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-[#E5E7EB] bg-bg-surface p-6 sticky top-24 space-y-4">
            <h2 className="text-lg font-semibold font-[family-name:var(--font-display)] text-text-primary">Ringkasan Pesanan</h2>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div key={item.product_id} className="flex gap-3 text-sm">
                  <div className="relative h-12 w-12 shrink-0 rounded-lg overflow-hidden bg-bg-base">
                    <Image src={item.gambar} alt={item.nama} fill className="object-cover" sizes="48px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-text-primary line-clamp-1">{item.nama}</p>
                    <p className="text-xs text-accent-brass">{item.jumlah} x {formatRupiah(item.harga)}</p>
                  </div>
                  <span className="font-medium text-text-primary shrink-0 tabular-nums">{formatRupiah(item.harga * item.jumlah)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-[#E5E7EB] pt-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Subtotal</span>
                <span className="font-medium text-text-primary tabular-nums">{formatRupiah(total)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Pengiriman</span>
                <span className="text-text-muted">Dikonfirmasi admin</span>
              </div>
              <div className="flex justify-between font-semibold text-lg border-t border-[#E5E7EB] pt-2">
                <span className="text-text-primary">Total</span>
                <span className="text-accent-emerald tabular-nums">{formatRupiah(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="flex h-[50vh] items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-accent-brass" /></div>}>
      <CheckoutForm />
    </Suspense>
  );
}
