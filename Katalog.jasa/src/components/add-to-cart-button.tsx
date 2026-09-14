"use client";

import { useState } from "react";
import { ShoppingCart, Check, Minus, Plus } from "lucide-react";
import { useCart } from "@/components/cart-provider";

interface Props {
  slug: string;
  name: string;
  price: number;
  priceLabel: string;
  category: string;
  image: string;
}

export function AddToCartButton({ slug, name, price, priceLabel, category, image }: Props) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem({ slug, name, price, priceLabel, category, image }, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1 rounded-xl border border-line bg-white">
        <button
          onClick={() => setQty(Math.max(1, qty - 1))}
          className="flex h-9 w-9 items-center justify-center rounded-l-xl text-ink transition hover:bg-bg-soft"
          aria-label="Kurangi"
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <span className="min-w-[2rem] text-center text-sm font-semibold text-ink">{qty}</span>
        <button
          onClick={() => setQty(qty + 1)}
          className="flex h-9 w-9 items-center justify-center rounded-r-xl text-ink transition hover:bg-bg-soft"
          aria-label="Tambah"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
      <button
        onClick={handleAdd}
        className="inline-flex h-11 items-center gap-2 rounded-xl bg-accent px-5 text-sm font-medium text-white shadow-sm transition hover:brightness-110"
      >
        {added ? (
          <>
            <Check className="h-4 w-4" />
            Ditambahkan!
          </>
        ) : (
          <>
            <ShoppingCart className="h-4 w-4" />
            Keranjang
          </>
        )}
      </button>
    </div>
  );
}
