"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Loader2, PartyPopper } from "lucide-react";
import type { Category } from "@prisma/client";
import { cn } from "@/lib/utils";
import { Input, Textarea, Select, Label } from "@/components/ui/input";

const phoneRegex = /^(\+62|62|0)8[0-9]{6,11}$/;

const mitraSchema = z.object({
  name: z
    .string({ message: "Nama lengkap wajib diisi" })
    .trim()
    .min(3, "Nama minimal 3 karakter")
    .max(60, "Nama maksimal 60 karakter"),
  businessName: z
    .string({ message: "Nama usaha wajib diisi" })
    .trim()
    .min(3, "Nama usaha minimal 3 karakter")
    .max(80, "Nama usaha maksimal 80 karakter"),
  email: z
    .string({ message: "Email wajib diisi" })
    .trim()
    .email("Format email tidak valid"),
  phone: z
    .string({ message: "Nomor WhatsApp wajib diisi" })
    .trim()
    .regex(phoneRegex, "Nomor harus diawali 08/62 dan berjumlah 10–14 digit"),
  category: z
    .string({ message: "Pilih kategori jasa" })
    .min(1, "Pilih kategori jasa"),
  location: z
    .string({ message: "Lokasi usaha wajib diisi" })
    .trim()
    .min(3, "Lokasi minimal 3 karakter")
    .max(80, "Lokasi maksimal 80 karakter"),
  description: z
    .string({ message: "Deskripsi singkat wajib diisi" })
    .trim()
    .min(20, "Ceritakan lebih detail (minimal 20 karakter)")
    .max(500, "Maksimal 500 karakter"),
  agreement: z
    .boolean()
    .refine((v) => v === true, "Anda harus menyetujui syarat & ketentuan"),
});

type MitraFormValues = z.infer<typeof mitraSchema>;

export function MitraForm({
  categories,
  locations,
}: {
  categories: Category[];
  locations: string[];
}) {
  const [submitState, setSubmitState] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MitraFormValues>({
    resolver: zodResolver(mitraSchema),
    defaultValues: {
      name: "",
      businessName: "",
      email: "",
      phone: "",
      category: "",
      location: "",
      description: "",
      agreement: false,
    },
  });

  async function onSubmit(values: MitraFormValues) {
    setSubmitState("submitting");
    try {
      const res = await fetch("/api/mitra", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Gagal menyimpan pendaftaran");
      setSubmitState("success");
      reset();
    } catch {
      setSubmitState("error");
    }
  }

  if (submitState === "success") {
    return <SuccessCard onReset={() => setSubmitState("idle")} />;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-3xl border border-sand/70 bg-white p-6 shadow-lift sm:p-8"
    >
      <h2 className="font-display text-xl font-semibold text-ink">
        Formulir Pendaftaran Mitra
      </h2>
      <p className="mt-1 text-sm text-ink-2">
        Isi data berikut dengan lengkap. Tim kami akan meninjau pendaftaran Anda.
      </p>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <Field label="Nama lengkap" error={errors.name?.message}>
          <Input
            type="text"
            placeholder="contoh: Budi Santoso"
            {...register("name")}
            aria-invalid={!!errors.name}
          />
        </Field>

        <Field label="Nama usaha" error={errors.businessName?.message}>
          <Input
            type="text"
            placeholder="contoh: Bersih Bersama Cleaning"
            {...register("businessName")}
            aria-invalid={!!errors.businessName}
          />
        </Field>

        <Field label="Email aktif" error={errors.email?.message}>
          <Input
            type="email"
            placeholder="contoh: budi@email.com"
            {...register("email")}
            aria-invalid={!!errors.email}
          />
        </Field>

        <Field label="Nomor WhatsApp" error={errors.phone?.message}>
          <Input
            type="tel"
            inputMode="tel"
            placeholder="contoh: 081234567890"
            {...register("phone")}
            aria-invalid={!!errors.phone}
          />
        </Field>

        <Field label="Kategori jasa" error={errors.category?.message}>
          <Select {...register("category")} aria-invalid={!!errors.category}>
            <option value="">Pilih kategori...</option>
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </Select>
        </Field>

        <Field label="Kota / area layanan" error={errors.location?.message}>
          <Select
            {...register("location")}
            aria-invalid={!!errors.location}
          >
            <option value="">Pilih atau ketik lokasi...</option>
            {locations.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </Select>
        </Field>

        <div className="sm:col-span-2">
          <Field
            label="Deskripsi singkat usaha"
            error={errors.description?.message}
          >
            <Textarea
              placeholder="Ceritakan jenis layanan, keunggulan, dan area yang Anda jangkau..."
              className="min-h-32"
              {...register("description")}
              aria-invalid={!!errors.description}
            />
          </Field>
        </div>
      </div>

      <label className="mt-6 flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          className="mt-0.5 size-4 accent-[#b8892e]"
          {...register("agreement")}
          aria-invalid={!!errors.agreement}
        />
        <span className="text-sm leading-relaxed text-ink-2">
          Saya menyatakan bahwa informasi yang diberikan benar dan saya menyetujui{" "}
          <a href="/tentang#faq" className="font-bold text-gold-deep underline decoration-gold/40 underline-offset-2">
            Syarat & Ketentuan
          </a>{" "}
          KatalogJasa.
        </span>
      </label>
      {errors.agreement?.message && (
        <FieldError message={errors.agreement.message} />
      )}

      {submitState === "error" && (
        <div
          role="alert"
          className="mt-5 rounded-xl border border-blush bg-blush/40 p-4 text-sm font-semibold text-ink"
        >
          Maaf, terjadi kesalahan saat mengirim pendaftaran. Silakan coba lagi.
        </div>
      )}

      <button
        type="submit"
        disabled={submitState === "submitting"}
        className="mt-7 flex h-13 w-full items-center justify-center gap-2 rounded-full bg-forest px-6 py-3.5 text-sm font-bold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:bg-forest-2 focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitState === "submitting" ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Mengirim pendaftaran...
          </>
        ) : (
          <>
            <CheckCircle2 className="size-4" />
            Daftar Jadi Mitra Gratis
          </>
        )}
      </button>

      <p className="mt-4 text-center text-xs text-ink-3">
        Dengan mendaftar, Anda menyetujui data dikelola sesuai kebijakan privasi
        kami. Tidak ada biaya tersembunyi.
      </p>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("min-w-0", error && "mb-1")}>
      <Label>{label}</Label>
      <div className="mt-1.5">{children}</div>
      {error && <FieldError message={error} />}
    </div>
  );
}

function FieldError({ message }: { message: string }) {
  return (
    <p className="mt-1.5 text-xs font-medium text-red-600" role="alert">
      {message}
    </p>
  );
}

function SuccessCard({ onReset }: { onReset: () => void }) {
  return (
    <div className="rounded-3xl border border-sand/70 bg-white p-8 text-center shadow-lift sm:p-12">
      <span className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-100 text-emerald-600">
        <PartyPopper className="size-8" />
      </span>
      <h2 className="mt-5 font-display text-2xl font-semibold text-ink sm:text-3xl">
        Pendaftaran berhasil dikirim!
      </h2>
      <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-ink-2">
        Terima kasih sudah mendaftar sebagai mitra KatalogJasa. Tim kami akan
        menghubungi Anda melalui WhatsApp/email dalam 1×24 jam kerja untuk proses
        verifikasi.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-7 inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3 text-sm font-bold text-ink transition-colors hover:border-gold hover:text-gold-deep"
      >
        Daftarkan usaha lain
      </button>
    </div>
  );
}
