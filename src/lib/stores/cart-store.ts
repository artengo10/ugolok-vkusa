import { create } from "zustand";
import { persist } from "zustand/middleware";
import { showToast } from "@/lib/utils/toast";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image?: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (
    product: Omit<CartItem, "quantity"> & { quantity?: number }
  ) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  totalPrice: () => number;
  totalItems: () => number;
  calculatePrepayment: (orderType: string, total: number) => number; // Новая функция
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.id === product.id
          );

          const quantityToAdd = product.quantity || 1;

          if (existingItem) {
            const updatedItems = state.items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantityToAdd }
                : item
            );

            showToast.addedToCart(product.name, quantityToAdd);
            return { items: updatedItems };
          } else {
            showToast.addedToCart(product.name, quantityToAdd);
            return {
              items: [...state.items, { ...product, quantity: quantityToAdd }],
            };
          }
        });
      },

      removeItem: (id) => {
        set((state) => {
          const itemToRemove = state.items.find((item) => item.id === id);
          const updatedItems = state.items.filter((item) => item.id !== id);

          if (itemToRemove) {
            showToast.removedFromCart(itemToRemove.name);
          }

          return { items: updatedItems };
        });
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }

        set((state) => {
          const itemToUpdate = state.items.find((item) => item.id === id);
          const updatedItems = state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          );

          if (itemToUpdate) {
            showToast.quantityUpdated(itemToUpdate.name, quantity);
          }

          return { items: updatedItems };
        });
      },

      clearCart: () => {
        showToast.cartCleared();
        set({ items: [] });
      },

      totalPrice: () => {
        const { items } = get();
        return items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      totalItems: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
      },

      // Новая функция для расчета предоплаты
      calculatePrepayment: (orderType: string, total: number) => {
        if (orderType === "pickup" && total >= 2000) {
          return 500; // Предоплата 500₽ для самовывоза от 2000₽
        }
        return 0; // Без предоплаты
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
