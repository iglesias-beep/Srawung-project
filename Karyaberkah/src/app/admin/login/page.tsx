"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Shield, Mail, Lock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const { signInWithEmailAndPassword } = await import("firebase/auth")
      const { auth, db, isFirebaseConfigured } = await import("@/lib/firebase")
      const { doc, getDoc } = await import("firebase/firestore")

      if (!isFirebaseConfigured) {
        setError("Firebase belum dikonfigurasi. Isi .env.local terlebih dahulu.")
        setLoading(false)
        return
      }

      const result = await signInWithEmailAndPassword(auth, email, password)
      const userDoc = await getDoc(doc(db, "users", result.user.uid))

      if (userDoc.exists() && userDoc.data().role === "admin") {
        router.push("/admin/dashboard")
      } else {
        setError("Akun ini bukan akun admin")
        await auth.signOut()
      }
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
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--emerald)]/10">
            <Shield className="h-7 w-7 text-[var(--emerald)]" />
          </div>
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[var(--foreground)]">
            Admin Panel
          </h1>
          <p className="mt-2 text-[var(--muted-fg)]">
            Masuk dengan akun admin
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
                Email Admin
              </Label>
              <div className="relative mt-1.5">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-fg)]" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@karyaberkah.co.id"
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
              {loading ? "Masuk..." : "Masuk sebagai Admin"}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
