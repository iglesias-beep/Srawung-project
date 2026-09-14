import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { db } from '../config/firebase';

const CartContext = createContext();
const STORAGE_KEY = 'borongjasa_cart';

export function useCart() {
  return useContext(CartContext);
}

function loadStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadStored);
  const [open, setOpen] = useState(false);

  // Persist to localStorage whenever items change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch { /* ignore */ }
  }, [items]);

  const addItem = useCallback((product, qty = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i =>
          i.id === product.id ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, {
        id: product.id,
        name: product.name,
        priceEstimate: product.priceEstimate,
        image: product.images?.[0] || '',
        categoryName: product.categoryName || '',
        qty,
        unit: product.unit || '',
      }];
    });
    setOpen(true);
  }, []);

  const removeItem = useCallback((id) => {
    setItems(prev => prev.filter(i => i.id !== id));
  }, []);

  const updateQty = useCallback((id, qty) => {
    if (qty <= 0) return;
    setItems(prev => prev.map(i => (i.id === id ? { ...i, qty } : i)));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items]);

  const value = {
    items,
    open,
    setOpen,
    addItem,
    removeItem,
    updateQty,
    clearCart,
    totalItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
