import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useData } from "./DataContext";

const STORAGE_KEY = "kertajaya-cart";

const CartContext = createContext(null);

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((it) => it.qty > 0).map((it) => ({ id: it.id, qty: Math.min(it.qty, 999) }));
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const { products } = useData();
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setItems(loadCart());
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* abaikan jika localStorage tidak tersedia */
    }
  }, [items]);

  const addItem = useCallback(
    (id, qty = 1) => {
      setItems((prev) => {
        const found = prev.find((it) => it.id === id);
        const produk = products.find((p) => p.id === id);
        const max = produk ? produk.stok : 999;
        if (found) {
          return prev.map((it) =>
            it.id === id ? { ...it, qty: Math.min(it.qty + qty, max) } : it
          );
        }
        return [...prev, { id, qty: Math.min(qty, max) }];
      });
      setOpen(true);
    },
    [products]
  );

  const setQty = useCallback(
    (id, qty) => {
      setItems((prev) => {
        if (qty <= 0) return prev.filter((it) => it.id !== id);
        const produk = products.find((p) => p.id === id);
        const max = produk ? produk.stok : 999;
        return prev.map((it) => (it.id === id ? { ...it, qty: Math.min(qty, max) } : it));
      });
    },
    [products]
  );

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const detail = useMemo(() => {
    const rows = items
      .map((it) => {
        const p = products.find((x) => x.id === it.id);
        return p ? { ...it, produk: p, subtotal: p.harga * it.qty } : null;
      })
      .filter(Boolean);
    const totalItem = rows.reduce((sum, r) => sum + r.qty, 0);
    const total = rows.reduce((sum, r) => sum + r.subtotal, 0);
    return { rows, totalItem, total };
  }, [items, products]);

  const value = useMemo(
    () => ({ ...detail, open, setOpen, addItem, setQty, removeItem, clearCart }),
    [detail, open, addItem, setQty, removeItem, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart harus dipakai di dalam <CartProvider>");
  return ctx;
}
