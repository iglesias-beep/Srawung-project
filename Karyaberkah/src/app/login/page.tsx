"use client"

import { Suspense, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Mail, Lock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/hooks/use-auth"

function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      await signIn(email, password)
      const redirect = searchParams.get("redirect")
      router.push(redirect || "/")
    } catch (err: any) {
      setError(
        err.code === "auth/invalid-credential"
          ? "Email atau password salah"
          : "Terjadi kesalahan. Silakan coba lagi."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-[var(--background)] px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[var(--foreground)] text-embossed">
            Masuk
          </h1>
          <p className="mt-2 text-[var(--muted-fg)]">
            Masuk untuk melanjutkan belanja
          </p>
        </div>

        <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="rounded-lg bg-[#dc2626]/10 px-4 py-3 text-sm text-[#dc2626]">
                {error}
              </div>
            )}

            <div>
              <Label htmlFor="email" className="text-[var(--foreground)]">
                Email
              </Label>
              <div className="relative mt-1.5">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-fg)]" />
                <Input
                  id="email"
                  type="email"
                  placeholder="email@contoh.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 bg-[var(--background)] border-[var(--border-color)]"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="text-[var(--foreground)]">
                Password
              </Label>
              <div className="relative mt-1.5">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-fg)]" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 bg-[var(--background)] border-[var(--border-color)]"
                />
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="w-full bg-[var(--emerald)] text-white hover:bg-[var(--emerald)]/90 gap-2 h-11"
            >
              {loading ? "Masuk..." : "Masuk"}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </Button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-[var(--muted-fg)]">
          Belum punya akun?{" "}
          <Link
            href="/register"
            className="font-medium text-[var(--emerald)] hover:underline"
          >
            Daftar sekarang
          </Link>
        </p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-[80vh] items-center justify-center bg-[var(--background)]"><p className="text-[var(--muted-fg)]">Memuat...</p></div>}>
      <LoginForm />
    </Suspense>
  )
}
