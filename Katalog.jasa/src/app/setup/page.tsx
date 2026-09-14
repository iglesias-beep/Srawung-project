"use client";

import { useState } from "react";
import Link from "next/link";
import { doc, updateDoc } from "firebase/firestore";
import { getFirebaseDb, isFirebaseConfigured } from "@/lib/firebase";
import { useAuth } from "@/components/auth-provider";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import { AlertCircle, CheckCircle } from "lucide-react";

export default function SetupPage() {
  const { user } = useAuth();
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function makeAdmin() {
    if (!user || !isFirebaseConfigured) return;
    setStatus("loading");
    try {
      const db = getFirebaseDb();
      await updateDoc(doc(db, "users", user.uid), { role: "admin" });
      setStatus("done");
      setMsg("Berhasil! Role admin ditetapkan. Silakan buka /admin sekarang.");
    } catch (err: unknown) {
      setStatus("error");
      setMsg(err instanceof Error ? err.message : String(err));
    }
  }

  return (
    <section className="bg-background">
      <Container className="flex min-h-[60vh] items-center justify-center py-16">
        <div className="w-full max-w-md space-y-6 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-accent">
            <Image src="/kj-logo-brand.svg" alt="Katalog Jasa" width={32} height={32} />
            <span className="font-serif text-2xl font-semibold">Katalog.Jasa</span>
          </Link>
          <h1 className="font-serif text-3xl font-semibold text-ink">Setup Admin</h1>
          <p className="text-sm text-muted">
            Klik tombol di bawah untuk menjadikan akun <strong>{user?.email || "ini"}</strong> sebagai admin.
          </p>
          {status === "done" && (
            <div className="flex items-center gap-2 justify-center rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700">
              <CheckCircle className="h-4 w-4 shrink-0" /> {msg}
            </div>
          )}
          {status === "error" && (
            <div className="flex items-center gap-2 justify-center rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              <AlertCircle className="h-4 w-4 shrink-0" /> {msg}
            </div>
          )}
          {user ? (
            <button
              onClick={makeAdmin}
              disabled={status === "loading" || status === "done"}
              className={buttonVariants({ variant: "accent", size: "lg", className: "w-full" })}
            >
              {status === "loading" ? "Memproses..." : status === "done" ? "Selesai ✓" : "Jadikan Admin"}
            </button>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-red-500">Anda belum login. Login dulu!</p>
              <Link href="/login" className={buttonVariants({ variant: "accent", size: "lg", className: "w-full" })}>
                Login
              </Link>
            </div>
          )}
          {status === "done" && (
            <Link href="/admin" className={buttonVariants({ variant: "primary", size: "lg", className: "w-full" })}>
              Buka Dashboard Admin
            </Link>
          )}
        </div>
      </Container>
    </section>
  );
}
