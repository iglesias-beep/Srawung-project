"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { categories } from "@/lib/categories";
import { waLink } from "@/lib/site";

const schema = z.object({
  nama: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.email("Format email tidak valid"),
  telepon: z.string().min(8, "Nomor telepon tidak valid"),
  kategori: z.string().min(1, "Pilih kategori produk"),
  pesan: z.string().min(10, "Pesan minimal 10 karakter"),
});

type FormValues = z.infer<typeof schema>;

const inputClass =
  "w-full rounded-xl border border-line bg-background px-4 py-3 text-sm text-ink placeholder:text-faint focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      nama: "",
      email: "",
      telepon: "",
      kategori: "",
      pesan: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    const lines = [
      "Halo Katalog Jasa, saya ingin konsultasi.",
      `Nama: ${values.nama}`,
      `Email: ${values.email}`,
      `Telepon: ${values.telepon}`,
      `Kebutuhan: ${values.kategori}`,
      "",
      `Pesan: ${values.pesan}`,
    ];
    await new Promise((r) => setTimeout(r, 700));
    window.open(waLink(lines.join("\n")), "_blank", "noopener,noreferrer");
    setSent(true);
    reset();
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-[16px] border border-line bg-bg-soft p-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-success" aria-hidden />
        <h3 className="font-serif text-2xl font-semibold text-ink">
          Pesan Anda terkirim!
        </h3>
        <p className="max-w-md text-sm leading-relaxed text-muted">
          WhatsApp sudah terbuka dengan ringkasan pesan Anda. Tim kami akan
          membalas secepatnya. Jika belum terbuka, kirim ulang atau hubungi
          kami langsung.
        </p>
        <Button variant="outline" onClick={() => setSent(false)}>
          Kirim pesan lain
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="nama" className="mb-2 block text-sm font-medium text-ink">
            Nama
          </label>
          <input
            id="nama"
            type="text"
            placeholder="Nama lengkap Anda"
            className={inputClass}
            {...register("nama")}
          />
          {errors.nama ? (
            <p className="mt-1.5 text-xs text-warning">{errors.nama.message}</p>
          ) : null}
        </div>
        <div>
          <label htmlFor="telepon" className="mb-2 block text-sm font-medium text-ink">
            Nomor WhatsApp
          </label>
          <input
            id="telepon"
            type="tel"
            placeholder="08xx-xxxx-xxxx"
            className={inputClass}
            {...register("telepon")}
          />
          {errors.telepon ? (
            <p className="mt-1.5 text-xs text-warning">{errors.telepon.message}</p>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-ink">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="nama@email.com"
          className={inputClass}
          {...register("email")}
        />
        {errors.email ? (
          <p className="mt-1.5 text-xs text-warning">{errors.email.message}</p>
        ) : null}
      </div>

      <div>
        <label htmlFor="kategori" className="mb-2 block text-sm font-medium text-ink">
          Kebutuhan
        </label>
        <select
          id="kategori"
          className={cn(inputClass, "appearance-none")}
          {...register("kategori")}
        >
          <option value="">Pilih kategori produk…</option>
          {categories.map((category) => (
            <option key={category.slug} value={category.name}>
              {category.name}
            </option>
          ))}
          <option value="Lainnya / belum yakin">Lainnya / belum yakin</option>
        </select>
        {errors.kategori ? (
          <p className="mt-1.5 text-xs text-warning">{errors.kategori.message}</p>
        ) : null}
      </div>

      <div>
        <label htmlFor="pesan" className="mb-2 block text-sm font-medium text-ink">
          Pesan
        </label>
        <textarea
          id="pesan"
          rows={5}
          placeholder="Ceritakan kebutuhan signage / printing Anda (ukuran, lokasi, budget, dll.)"
          className={cn(inputClass, "resize-none")}
          {...register("pesan")}
        />
        {errors.pesan ? (
          <p className="mt-1.5 text-xs text-warning">{errors.pesan.message}</p>
        ) : null}
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full sm:w-auto"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
            Mengirim…
          </>
        ) : (
          <>
            <MessageCircle className="h-5 w-5" aria-hidden />
            Kirim via WhatsApp
          </>
        )}
      </Button>
      <p className="text-xs leading-relaxed text-faint">
        Dengan mengirim, Anda setuju dihubungi kembali oleh tim kami via
        WhatsApp atau email untuk menindaklanjuti kebutuhan Anda.
      </p>
    </form>
  );
}
