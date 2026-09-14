"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/components/auth-provider";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";

export default function RegisterPage() {
  const { signUp } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Password tidak cocok.");
      return;
    }
    if (password.length < 6) {
      setError("Password minimal 6 karakter.");
      return;
    }

    setLoading(true);
    try {
      await signUp(email, password, name);
      router.push("/");
    } catch {
      setError("Gagal mendaftar. Email mungkin sudah terdaftar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bg-background">
      <Container className="flex min-h-[70vh] items-center justify-center py-16">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Link href="/" className="inline-flex items-center gap-2 text-accent">
              <Image src="/kj-logo-brand.svg" alt="Katalog Jasa" width={32} height={32} />
              <span className="font-serif text-2xl font-semibold">Katalog Jasa</span>
            </Link>
            <h1 className="mt-6 font-serif text-3xl font-semibold text-ink">Daftar</h1>
            <p className="mt-2 text-sm text-muted">Buat akun baru untuk mulai memesan.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                {error}
              </div>
            )}
            <Input
              label="Nama Lengkap"
              type="text"
              placeholder="Masukkan nama Anda"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              label="Email"
              type="email"
              placeholder="email@contoh.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Password"
              type="password"
              placeholder="Minimal 6 karakter"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Input
              label="Konfirmasi Password"
              type="password"
              placeholder="Ulangi password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className={buttonVariants({ variant: "accent", size: "lg", className: "w-full" })}
            >
              {loading ? "Memproses..." : "Daftar"}
            </button>
          </form>

          <p className="text-center text-sm text-muted">
            Sudah punya akun?{" "}
            <Link href="/login" className="font-medium text-accent hover:underline">
              Masuk
            </Link>
          </p>
        </div>
      </Container>
    </section>
  );
}
