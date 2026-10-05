"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartLine = { slug: string; quantity: number };
type CommerceState = { cart: CartLine[]; wishlist: string[]; cartOpen: boolean; add: (slug: string) => void; remove: (slug: string) => void; setQuantity: (slug: string, quantity: number) => void; toggleWishlist: (slug: string) => void; setCartOpen: (open: boolean) => void; clearCart: () => void };
export const useCommerceStore = create<CommerceState>()(persist((set) => ({
  cart: [], wishlist: [], cartOpen: false,
  add: (slug) => set((state) => {
    const isMobile = typeof window !== "undefined" && window.innerWidth <= 560;
    return {
      cart: state.cart.some((line) => line.slug === slug) ? state.cart.map((line) => line.slug === slug ? { ...line, quantity: line.quantity + 1 } : line) : [...state.cart, { slug, quantity: 1 }],
      cartOpen: isMobile ? state.cartOpen : true
    };
  }),
  remove: (slug) => set((state) => ({ cart: state.cart.filter((line) => line.slug !== slug) })),
  setQuantity: (slug, quantity) => set((state) => ({ cart: state.cart.map((line) => line.slug === slug ? { ...line, quantity: Math.max(1, quantity) } : line) })),
  toggleWishlist: (slug) => set((state) => ({ wishlist: state.wishlist.includes(slug) ? state.wishlist.filter((item) => item !== slug) : [...state.wishlist, slug] })),
  setCartOpen: (cartOpen) => set({ cartOpen }), clearCart: () => set({ cart: [] }),
}), { name: "WOXLY-commerce" }));
