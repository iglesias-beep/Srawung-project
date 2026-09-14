"use client";

import { useState } from "react";
import Link from "next/link";
import { Trash2, Minus, Plus, ShoppingCart, MessageCircle, ArrowLeft } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { useAuth } from "@/components/auth-provider";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { formatRp, waLink, siteConfig } from "@/lib/site";
import { getFirebaseDb, isFirebaseConfigured } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export default function KeranjangPage() {
  const { items, updateItem, removeItem, clearCart, totalItems, totalPrice } = useCart();
  const { user, userData } = useAuth();
  const [notes, setNotes] = useState("");
  const [checkoutStatus, setCheckoutStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [checkoutMsg, setCheckoutMsg] = useState("");

  async function handleCheckout() {
    if (items.length === 0) return;

    setCheckoutStatus("loading");

    const orderData = {
      userId: user?.uid || "guest",
      userName: userData?.name || user?.email || "Guest",
      userEmail: user?.email || "",
      items: items.map((i) => ({
        name: i.name,
        slug: i.slug,
        quantity: i.quantity,
        price: i.price,
        subtotal: i.price * i.quantity,
      })),
      total: totalPrice,
      status: "pending" as const,
      notes,
      createdAt: new Date().toISOString(),
    };

    try {
      if (isFirebaseConfigured && user) {
        const db = getFirebaseDb();
        await addDoc(collection(db, "orders"), orderData);
      }
      setCheckoutStatus("done");

      const itemLines = items.map(
        (i) => `• ${i.name} x${i.quantity} = ${formatRp(i.price * i.quantity)}`
      );
      const msg = [
        `Halo Katalog Jasa, saya ingin memesan:`,
        "",
        ...itemLines,
        "",
        `Total: *${formatRp(totalPrice)}*`,
        notes ? `Catatan: ${notes}` : "",
        "",
        "Mohon info cara pembayaran & estimasi pengerjaan.",
      ]
        .filter(Boolean)
        .join("\n");

      window.open(waLink(msg), "_blank");
    } catch (err: unknown) {
      setCheckoutStatus("error");
      setCheckoutMsg(err instanceof Error ? err.message : "Gagal menyimpan pesanan");
    }
  }

  if (items.length === 0 && checkoutStatus !== "done") {
    return (
      <section className="bg-background">
        <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-4 py-16 text-center">
          <ShoppingCart className="h-16 w-16 text-line" />
          <h1 className="font-serif text-3xl font-semibold text-ink">Keranjang Kosong</h1>
          <p className="text-sm text-muted">Belum ada produk di keranjang Anda.</p>
          <Link href="/katalog" className={buttonVariants({ variant: "accent", size: "lg" })}>
            Lihat Katalog
          </Link>
        </Container>
      </section>
    );
  }

  if (checkoutStatus === "done") {
    return (
      <section className="bg-background">
        <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-4 py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <MessageCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="font-serif text-3xl font-semibold text-ink">Pesanan Terkirim!</h1>
          <p className="text-sm text-muted">
            Pesanan Anda sudah dikirim via WhatsApp. Tim kami akan segera merespons.
          </p>
          <button
            onClick={() => {
              clearCart();
              setCheckoutStatus("idle");
            }}
            className={buttonVariants({ variant: "accent", size: "lg" })}
          >
            Kembali ke Katalog
          </button>
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-background">
      <Container className="py-10 md:py-14">
        <div className="flex items-center gap-3">
          <Link href="/katalog" className="text-muted hover:text-accent">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="font-serif text-3xl font-semibold text-ink">Keranjang Belanja</h1>
        </div>
        <p className="mt-2 text-sm text-muted">{totalItems} produk di keranjang Anda.</p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.slug}
                className="flex gap-4 rounded-2xl border border-line bg-white p-4"
              >
                <div className="h-16 w-16 shrink-0 rounded-xl bg-bg-soft" />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-ink truncate">{item.name}</h3>
                  <p className="mt-0.5 text-xs text-muted">{item.priceLabel}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      onClick={() => updateItem(item.slug, Math.max(1, item.quantity - 1))}
                      className="flex h-7 w-7 items-center justify-center rounded-lg border border-line text-ink hover:border-accent"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="min-w-[1.5rem] text-center text-sm font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateItem(item.slug, item.quantity + 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-lg border border-line text-ink hover:border-accent"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                    <span className="ml-auto text-sm font-semibold text-accent">
                      {formatRp(item.price * item.quantity)}
                    </span>
                    <button
                      onClick={() => removeItem(item.slug)}
                      className="ml-1 text-muted hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="h-fit rounded-2xl border border-line bg-white p-6 space-y-4 lg:sticky lg:top-24">
            <h2 className="font-serif text-xl font-semibold text-ink">Ringkasan</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-muted">
                <span>Total item</span>
                <span>{totalItems}</span>
              </div>
              <div className="border-t border-line pt-2 flex justify-between font-semibold text-ink">
                <span>Total Harga</span>
                <span className="text-accent">{formatRp(totalPrice)}</span>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-ink">Catatan (opsional)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Contoh: Urgent, kirim minggu depan..."
                className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-ink outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                rows={3}
              />
            </div>
            {checkoutStatus === "error" && (
              <p className="text-xs text-red-500">{checkoutMsg}</p>
            )}
            <button
              onClick={handleCheckout}
              disabled={checkoutStatus === "loading"}
              className={buttonVariants({ variant: "accent", size: "lg", className: "w-full" })}
            >
              {checkoutStatus === "loading" ? (
                "Memproses..."
              ) : (
                <>
                  <MessageCircle className="h-5 w-5" />
                  Checkout via WhatsApp
                </>
              )}
            </button>
            {!user && (
              <p className="text-xs text-center text-muted">
                <Link href="/login" className="text-accent hover:underline">Login</Link> untuk menyimpan pesanan ke admin.
              </p>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
