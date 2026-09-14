"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/use-auth";
import { registerSchema, type RegisterFormData } from "@/schemas/register.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Loader2 } from "lucide-react";

function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register: registerUser } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    setError("");
    try {
      await registerUser(data.nama, data.email, data.password);
      router.push(redirect);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Registrasi gagal.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-bg-base px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-[#E5E7EB] bg-bg-surface p-8 shadow-[0_1px_3px_rgba(0,0,0,0.2)]">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold font-[family-name:var(--font-display)] text-text-primary">
              Daftar Akun
            </h1>
            <p className="text-text-muted mt-2">
              Sudah punya akun?{" "}
              <Link href="/login" className="text-accent-brass font-medium hover:underline">
                Masuk
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {error && (
              <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            <div>
              <label className="text-sm font-medium text-text-primary mb-1.5 block">
                Nama Lengkap
              </label>
              <Input placeholder="Nama Anda" {...register("nama")} />
              {errors.nama && (
                <p className="text-xs text-destructive mt-1">{errors.nama.message}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-text-primary mb-1.5 block">
                Email
              </label>
              <Input type="email" placeholder="email@contoh.com" {...register("email")} />
              {errors.email && (
                <p className="text-xs text-destructive mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-text-primary mb-1.5 block">
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Minimal 6 karakter"
                  {...register("password")}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-destructive mt-1">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-text-primary mb-1.5 block">
                Konfirmasi Password
              </label>
              <Input type="password" placeholder="Ulangi password" {...register("confirmPassword")} />
              {errors.confirmPassword && (
                <p className="text-xs text-destructive mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            <Button type="submit" variant="emerald" className="w-full" size="lg" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Memproses...
                </>
              ) : (
                "Daftar"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-[80vh] items-center justify-center bg-bg-base">
          <Loader2 className="h-8 w-8 animate-spin text-accent-brass" />
        </div>
      }
    >
      <RegisterForm />
    </Suspense>
  );
}
