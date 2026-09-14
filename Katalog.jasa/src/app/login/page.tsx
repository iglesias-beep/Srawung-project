"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/components/auth-provider";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import type { Metadata } from "next";

export default function LoginPage() {
  const { signIn } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signIn(email, password);
      router.push("/");
    } catch {
      setError("Email atau password salah.");
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
              <span className="font-serif text-2xl font-semibold">{process.env.NEXT_PUBLIC_SITE_NAME || "Katalog Jasa"}</span>
            </Link>
            <h1 className="mt-6 font-serif text-3xl font-semibold text-ink">Masuk</h1>
            <p className="mt-2 text-sm text-muted">Selamat datang kembali! Masuk ke akun Anda.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                {error}
              </div>
            )}
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
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className={buttonVariants({ variant: "accent", size: "lg", className: "w-full" })}
            >
              {loading ? "Memproses..." : "Masuk"}
            </button>
          </form>

          <p className="text-center text-sm text-muted">
            Belum punya akun?{" "}
            <Link href="/register" className="font-medium text-accent hover:underline">
              Daftar sekarang
            </Link>
          </p>
        </div>
      </Container>
    </section>
  );
}
