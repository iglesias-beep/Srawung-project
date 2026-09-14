"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/use-auth";
import { loginSchema, type LoginFormData } from "@/schemas/login.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Eye, EyeOff, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setError("");
    try {
      const cred = await login(data.email, data.password);
      const { getDoc, doc } = await import("firebase/firestore");
      const { db } = await import("@/lib/firebase");
      const userDoc = await getDoc(doc(db, "users", cred.user.uid));
      const userData = userDoc.data();
      if (userData?.role !== "admin") {
        setError("Akun ini bukan akun admin.");
        const { signOut } = await import("firebase/auth");
        const { auth } = await import("@/lib/firebase");
        await signOut(auth);
        return;
      }
      router.push("/admin/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login admin gagal.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-base px-4 py-16">
      <Card className="w-full max-w-md">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent-brass/10 border border-accent-brass/20">
              <Shield className="h-8 w-8 text-accent-brass" />
            </div>
            <h1 className="text-3xl font-bold font-[family-name:var(--font-display)] text-text-primary">Admin Login</h1>
            <p className="text-text-muted mt-2">Masuk ke dashboard admin</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">{error}</div>}
            <div>
              <label className="text-sm font-medium text-text-primary mb-1 block">Email Admin</label>
              <Input type="email" placeholder="admin@contoh.com" {...register("email")} />
              {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label className="text-sm font-medium text-text-primary mb-1 block">Password</label>
              <div className="relative">
                <Input type={showPassword ? "text" : "password"} placeholder="Masukkan password admin" {...register("password")} />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-destructive mt-1">{errors.password.message}</p>}
            </div>
            <Button type="submit" variant="emerald" className="w-full" size="lg" disabled={loading}>
              {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Memproses...</> : "Masuk sebagai Admin"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
