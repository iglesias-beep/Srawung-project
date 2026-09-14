"use client";

import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { getFirebaseDb, isFirebaseConfigured } from "@/lib/firebase";
import { useAuth } from "@/components/auth-provider";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import { AlertCircle, CheckCircle } from "lucide-react";
import Link from "next/link";

const seedProducts = [
  { slug: "papan-nama", name: "Papan Nama Custom", category: "papan-nama", price: 150000, shortDesc: "Papan nama custom paling fleksibel dari segi bahan, ukuran, dan desain.", badge: "Best Seller", images: ["/images/products/papan-nama.jpg"] },
  { slug: "neon-box", name: "Neon Box Custom", category: "neon-box", price: 200000, shortDesc: "Neon box yang menyala terang dan terlihat jelas siang & malam.", badge: "Popular", images: ["/images/products/neon-box.jpg"] },
  { slug: "rambu", name: "Rambu-Rambu Custom", category: "rambu", price: 150000, shortDesc: "Rambu-rambu custom yang jelas, sesuai standar, dan tahan cuaca.", badge: "", images: ["/images/products/rambu.jpg"] },
  { slug: "huruf-timbul", name: "Huruf Timbul Custom", category: "huruf-timbul", price: 80000, shortDesc: "Huruf timbul 3D dengan kesan premium dan elegan.", badge: "Premium", images: ["/images/products/huruf-timbul.jpg"] },
  { slug: "totem-pylon", name: "Totem & Pylon Sign Custom", category: "totem-pylon", price: 1300000, shortDesc: "Totem dan pylon sign yang tinggi dan mencolok dari kejauhan.", badge: "", images: ["/images/products/totem-pylon.jpg"] },
  { slug: "sticker-mobil", name: "Sticker Branding Mobil Custom", category: "sticker-mobil", price: 1000000, shortDesc: "Sticker branding untuk kendaraan operasional.", badge: "", images: ["/images/products/sticker-mobil.jpg"] },
  { slug: "sticker-sandblast", name: "Sticker Sandblast Kaca Custom", category: "sticker-sandblast", price: 25000, shortDesc: "Sticker sandblast untuk kaca kantor & etalase.", badge: "", images: ["/images/products/sticker-sandblast.jpg"] },
  { slug: "sticker-cutting", name: "Sticker Cutting Custom", category: "sticker-cutting", price: 2000, shortDesc: "Logo cutting presisi untuk kaca, kendaraan, dan media lain.", badge: "", images: ["/images/products/sticker-cutting.jpg"] },
  { slug: "event-booth", name: "Event Booth Custom", category: "event-booth", price: 25000000, shortDesc: "Booth pameran custom untuk event dan pameran.", badge: "Premium", images: ["/images/products/event-booth.jpg"] },
  { slug: "e-kiosk", name: "E Kiosk & Charger Point Custom", category: "e-kiosk", price: 8000000, shortDesc: "E kiosk dan charger point custom untuk area publik.", badge: "", images: ["/images/products/e-kiosk.jpg"] },
  { slug: "electric-pop", name: "Electric POP Display Custom", category: "electric-pop", price: 2500000, shortDesc: "Electric POP display yang bergerak untuk menarik perhatian.", badge: "", images: ["/images/products/electric-pop.jpg"] },
];

export default function SeedPage() {
  const { user } = useAuth();
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");
  const [count, setCount] = useState(0);

  async function seedAll() {
    if (!user || !isFirebaseConfigured) return;
    setStatus("loading");
    try {
      const db = getFirebaseDb();
      for (const p of seedProducts) {
        await setDoc(doc(db, "products", p.slug), p);
        setCount((c) => c + 1);
      }
      setStatus("done");
      setMsg(`${seedProducts.length} produk berhasil ditambahkan ke Firestore!`);
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
          <h1 className="font-serif text-3xl font-semibold text-ink">Seed Produk</h1>
          <p className="text-sm text-muted">
            Tambahkan {seedProducts.length} produk dari data statis ke Firestore.
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
          {status === "loading" && (
            <div className="text-sm text-muted">Mengunggah {count}/{seedProducts.length} produk...</div>
          )}

          {user ? (
            <button
              onClick={seedAll}
              disabled={status === "loading" || status === "done"}
              className={buttonVariants({ variant: "accent", size: "lg", className: "w-full" })}
            >
              {status === "loading" ? "Memproses..." : status === "done" ? "Selesai ✓" : "Seed Sekarang"}
            </button>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-red-500">Anda belum login.</p>
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
