"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Mail, Lock, User, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/hooks/use-auth"

export default function RegisterPage() {
  const [nama, setNama] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { signUp } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Password tidak cocok")
      return
    }

    if (password.length < 6) {
      setError("Password minimal 6 karakter")
      return
    }

    setLoading(true)
    try {
      await signUp(email, password, nama)
      router.push("/")
    } catch (err: any) {
      setError(
        err.code === "auth/email-already-in-use"
          ? "Email sudah terdaftar"
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
            Daftar Akun
          </h1>
          <p className="mt-2 text-[var(--muted-fg)]">
            Buat akun untuk mulai berbelanja
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
              <Label htmlFor="nama" className="text-[var(--foreground)]">
                Nama Lengkap
              </Label>
              <div className="relative mt-1.5">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-fg)]" />
                <Input
                  id="nama"
                  placeholder="Nama lengkap"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  required
                  className="pl-10 bg-[var(--background)] border-[var(--border-color)]"
                />
              </div>
            </div>

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
                  placeholder="Minimal 6 karakter"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 bg-[var(--background)] border-[var(--border-color)]"
                />
              </div>
            </div>

            <div>
              <Label
                htmlFor="confirmPassword"
                className="text-[var(--foreground)]"
              >
                Konfirmasi Password
              </Label>
              <div className="relative mt-1.5">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-fg)]" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Ulangi password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
              {loading ? "Mendaftar..." : "Daftar"}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </Button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-[var(--muted-fg)]">
          Sudah punya akun?{" "}
          <Link
            href="/login"
            className="font-medium text-[var(--emerald)] hover:underline"
          >
            Masuk
          </Link>
        </p>
      </div>
    </div>
  )
}
