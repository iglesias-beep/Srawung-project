import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { CartItem } from "@/types"

interface CartStore {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "jumlah"> & { jumlah?: number }) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, jumlah: number) => void
  updateNote: (productId: string, catatan_custom: string) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        set((state) => {
          const existing = state.items.find(
            (i) => i.product_id === item.product_id
          )
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product_id === item.product_id
                  ? { ...i, jumlah: i.jumlah + (item.jumlah || 1) }
                  : i
              ),
            }
          }
          return {
            items: [...state.items, { ...item, jumlah: item.jumlah || 1 }],
          }
        })
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((i) => i.product_id !== productId),
        }))
      },

      updateQuantity: (productId, jumlah) => {
        if (jumlah <= 0) {
          get().removeItem(productId)
          return
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.product_id === productId ? { ...i, jumlah } : i
          ),
        }))
      },

      updateNote: (productId, catatan_custom) => {
        set((state) => ({
          items: state.items.map((i) =>
            i.product_id === productId ? { ...i, catatan_custom } : i
          ),
        }))
      },

      clearCart: () => set({ items: [] }),

      getTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.harga * item.jumlah,
          0
        )
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.jumlah, 0)
      },
    }),
    { name: "karyaberkah-cart" }
  )
)
