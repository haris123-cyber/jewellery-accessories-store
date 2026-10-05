"use client";
import { useState, useEffect } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useCommerceStore } from "@/store/commerce-store";
import { getProduct, money } from "@/lib/catalog";
import { ProductVisual, Empty } from "./shared";

export function CartDrawer() {
  const { cart, cartOpen, setCartOpen, remove, setQuantity } =
    useCommerceStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const safeCart = mounted ? cart : [];
  const lines = safeCart.map((l) => ({ ...l, product: getProduct(l.slug) }));
  const subtotal = lines.reduce((n, l) => n + l.product.price * l.quantity, 0);
  const FREE_SHIPPING_THRESHOLD = 2999;

  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetContent className="!w-[min(94vw,480px)] !max-w-none !bg-ivory flex flex-col p-0 border-l border-border">
        <SheetHeader className="px-[24px] pt-[32px] pb-[16px]">
          <SheetTitle className="font-serif text-[24px] text-ink">Your bag ({safeCart.length})</SheetTitle>
          <SheetDescription className="text-stone font-medium text-[13px] uppercase tracking-[0.14em]">
            {subtotal < FREE_SHIPPING_THRESHOLD
              ? `${money(FREE_SHIPPING_THRESHOLD - subtotal)} away from complimentary shipping`
              : "You have unlocked complimentary shipping"}
          </SheetDescription>
        </SheetHeader>
        {/* Shipping progress bar */}
        <div className="h-[2px] mx-[24px] bg-sand">
          <span
            className="block h-full bg-gold transition-all duration-500 ease-out"
            style={{ width: `${Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)}%` }}
          />
        </div>
        {/* Cart lines */}
        <div className="overflow-auto flex-1 mt-[16px]">
          {lines.length ? (
            lines.map((l) => (
              <div
                className="grid grid-cols-[105px_1fr_auto] gap-[20px] p-[24px] border-b border-border"
                key={l.slug}
              >
                <div className="aspect-[4/5] overflow-hidden rounded-[2px]">
                  <ProductVisual cell={l.product.cell} name={l.product.name} />
                </div>
                <div className="flex flex-col">
                  <h3 className="m-0 mb-1 text-[15px] font-medium text-ink leading-tight">{l.product.name}</h3>
                  <p className="m-0 text-stone text-[14px] tabular-nums">{money(l.product.price)}</p>
                  
                  {/* Quantity control */}
                  <div className="w-[104px] grid grid-cols-[34px_1fr_34px] items-center border border-border mt-auto h-[36px]">
                    <button
                      className="h-full border-0 bg-transparent flex items-center justify-center cursor-pointer text-ink hover:bg-sand transition-colors"
                      onClick={() => setQuantity(l.slug, l.quantity - 1)}
                    >
                      <Minus className="w-[14px]" />
                    </button>
                    <span className="text-center text-[13px] font-medium text-ink">{l.quantity}</span>
                    <button
                      className="h-full border-0 bg-transparent flex items-center justify-center cursor-pointer text-ink hover:bg-sand transition-colors"
                      onClick={() => setQuantity(l.slug, l.quantity + 1)}
                    >
                      <Plus className="w-[14px]" />
                    </button>
                  </div>
                </div>
                <button
                  className="border-0 bg-transparent self-start cursor-pointer p-0 text-stone hover:text-error transition-colors"
                  onClick={() => remove(l.slug)}
                  aria-label={`Remove ${l.product.name}`}
                >
                  <Trash2 className="w-[18px]" />
                </button>
              </div>
            ))
          ) : (
            <Empty
              title="Your bag is empty"
              copy="A considered selection is waiting."
              href="/shop"
              action="Explore collection"
            />
          )}
        </div>
        {lines.length > 0 && (
          <div className="mt-auto p-[24px] border-t border-border bg-pearl">
            <div className="flex justify-between items-center mb-6">
              <span className="font-serif text-[18px] text-ink">Subtotal</span>
              <strong className="font-medium text-[16px] text-ink tabular-nums">{money(subtotal)}</strong>
            </div>
            <div className="grid grid-cols-2 gap-[12px]">
              <a className="btn-secondary w-full" href="/cart">
                View cart
              </a>
              <a className="btn-primary w-full" href="/checkout">
                Checkout
              </a>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
