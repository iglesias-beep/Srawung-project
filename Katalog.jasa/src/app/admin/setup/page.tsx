"use client";

import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { getFirebaseDb, isFirebaseConfigured } from "@/lib/firebase";
import { useAuth } from "@/components/auth-provider";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { AlertCircle, CheckCircle } from "lucide-react";

export default function AdminSetupPage() {
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
      setMsg("Berhasil! Role admin ditetapkan. Refresh halaman untuk melihat tombol Dashboard.");
    } catch (err: unknown) {
      setStatus("error");
      setMsg(err instanceof Error ? err.message : String(err));
    }
  }

  return (
    <section className="bg-background">
      <Container className="flex min-h-[60vh] items-center justify-center py-16">
        <div className="w-full max-w-md space-y-6 text-center">
          <h1 className="font-serif text-3xl font-semibold text-ink">Setup Admin</h1>
          <p className="text-sm text-muted">Klik tombol di bawah untuk menjadikan akun ini sebagai admin.</p>
          {status === "done" && (
            <div className="flex items-center gap-2 justify-center rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700">
              <CheckCircle className="h-4 w-4" /> {msg}
            </div>
          )}
          {status === "error" && (
            <div className="flex items-center gap-2 justify-center rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              <AlertCircle className="h-4 w-4" /> {msg}
            </div>
          )}
          {user ? (
            <button
              onClick={makeAdmin}
              disabled={status === "loading" || status === "done"}
              className={buttonVariants({ variant: "accent", size: "lg", className: "w-full" })}
            >
              {status === "loading" ? "Memproses..." : status === "done" ? "Selesai" : "Jadikan Admin"}
            </button>
          ) : (
            <p className="text-sm text-red-500">Anda belum login.</p>
          )}
        </div>
      </Container>
    </section>
  );
}
