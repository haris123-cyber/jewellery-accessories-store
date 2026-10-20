"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartLine = { slug: string; quantity: number };
export type OrderLine = { slug: string; quantity: number };
export type Order = { id: string; date: string; lines: OrderLine[]; total: number };

type CommerceState = { 
  cart: CartLine[]; 
  wishlist: string[]; 
  orders: Order[];
  cartOpen: boolean; 
  promoCode: string | null;
  discountPercent: number;
  add: (slug: string, quantity?: number) => void; 
  remove: (slug: string) => void; 
  setQuantity: (slug: string, quantity: number) => void; 
  toggleWishlist: (slug: string) => void; 
  setCartOpen: (open: boolean) => void; 
  clearCart: () => void;
  applyPromo: (code: string) => { success: boolean; message: string; discountPercent?: number };
  removePromo: () => void;
  placeOrder: (lines: OrderLine[], total: number) => string;
};

export const useCommerceStore = create<CommerceState>()(persist((set) => ({
  cart: [], wishlist: [], orders: [], cartOpen: false,
  promoCode: null,
  discountPercent: 0,
  add: (slug, qty = 1) => set((state) => {
    const isMobile = typeof window !== "undefined" && window.innerWidth <= 560;
    return {
      cart: state.cart.some((line) => line.slug === slug) 
        ? state.cart.map((line) => line.slug === slug ? { ...line, quantity: line.quantity + qty } : line) 
        : [...state.cart, { slug, quantity: qty }],
      cartOpen: isMobile ? state.cartOpen : true
    };
  }),
  remove: (slug) => set((state) => ({ cart: state.cart.filter((line) => line.slug !== slug) })),
  setQuantity: (slug, quantity) => set((state) => ({ cart: state.cart.map((line) => line.slug === slug ? { ...line, quantity: Math.max(1, quantity) } : line) })),
  toggleWishlist: (slug) => set((state) => ({ wishlist: state.wishlist.includes(slug) ? state.wishlist.filter((item) => item !== slug) : [...state.wishlist, slug] })),
  setCartOpen: (cartOpen) => set({ cartOpen }), 
  clearCart: () => set({ cart: [], promoCode: null, discountPercent: 0 }),
  applyPromo: (rawCode) => {
    const code = rawCode.trim().toUpperCase();
    const VALID_CODES: Record<string, number> = {
      WELOCOM10: 10,
      WELCOME10: 10,
      WOX10: 10,
      WELCOME15: 15,
      GOLD15: 15,
      LUXURY20: 20,
      VIP25: 25,
      FESTIVE: 10,
    };

    if (!code) {
      return { success: false, message: "Please enter a promo code" };
    }

    if (VALID_CODES[code]) {
      const discount = VALID_CODES[code];
      set({ promoCode: code, discountPercent: discount });
      return {
        success: true,
        message: `Promo code ${code} applied! ${discount}% discount added.`,
        discountPercent: discount,
      };
    }

    return {
      success: false,
      message: "Invalid promo code. Try WELOCOM10 or LUXURY20",
    };
  },
  removePromo: () => set({ promoCode: null, discountPercent: 0 }),
  placeOrder: (lines, total) => {
    const id = "WX-" + Math.floor(10000 + Math.random() * 90000);
    const date = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    set((state) => ({ orders: [{ id, date, lines, total }, ...state.orders] }));
    return id;
  }
}), { name: "WOXLY-commerce" }));
