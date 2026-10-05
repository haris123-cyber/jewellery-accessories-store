"use client";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { getProduct, money } from "@/lib/catalog";
import { useCommerceStore } from "@/store/commerce-store";
import { ProductVisual, OrderSummary, Empty } from "@/components/shared";
import { Shell } from "@/components/layout";

export function CartPage() {
  const { cart, remove, setQuantity } = useCommerceStore();
  const lines = cart.map((l) => ({ ...l, product: getProduct(l.slug) }));
  const subtotal = lines.reduce((n, l) => n + l.product.price * l.quantity, 0);
  
  return (
    <Shell>
      <div className="px-[16px] md:px-[4vw] pb-[40px] md:pb-[64px] pt-[80px] md:pt-[100px] text-center">
        <p className="m-0 mb-[16px] uppercase tracking-[0.14em] text-[12px] font-medium text-stone">Your selection</p>
        <h1 className="m-0 font-serif text-[48px] md:text-[64px] leading-[1.1] text-ink">Shopping Bag</h1>
      </div>
      
      {lines.length ? (
        <main className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-[48px] lg:gap-[64px] px-[16px] md:px-[4vw] pb-[96px] max-w-[1400px] mx-auto">
          <div className="overflow-auto custom-scrollbar pr-2 lg:pr-6">
            <div className="hidden md:grid grid-cols-[auto_1fr_100px_100px] gap-[24px] border-b border-border pb-[16px] text-[12px] uppercase tracking-[0.14em] font-medium text-stone mb-[24px]">
              <span className="col-span-2">Product</span>
              <span className="text-center">Quantity</span>
              <span className="text-right">Total</span>
            </div>
            
            {lines.map((l) => (
              <div className="grid grid-cols-[100px_1fr_auto] md:grid-cols-[120px_1fr_100px_100px] gap-[16px] md:gap-[24px] border-b border-border py-[24px] items-center" key={l.slug}>
                <div className="aspect-[4/5] rounded-[2px] overflow-hidden bg-sand">
                  <ProductVisual cell={l.product.cell} name={l.product.name} />
                </div>
                
                <div className="flex flex-col h-full justify-center">
                  <h3 className="m-0 font-serif text-[20px] md:text-[24px] text-ink">{l.product.name}</h3>
                  <p className="m-0 mt-1 text-[14px] text-stone">
                    {l.product.category} · {l.product.material || "18k Gold"}
                  </p>
                  
                  {/* Mobile price and quantity */}
                  <div className="md:hidden mt-auto pt-4 flex flex-col gap-3">
                    <strong className="font-medium text-ink tabular-nums">{money(l.product.price)}</strong>
                    <div className="flex items-center gap-4">
                      <div className="grid grid-cols-[32px_32px_32px] items-center border border-border h-[36px]">
                        <button className="h-full flex items-center justify-center bg-transparent text-ink hover:bg-sand transition-colors" onClick={() => setQuantity(l.slug, l.quantity - 1)}>
                          <Minus className="w-[14px]" />
                        </button>
                        <span className="text-center text-[13px] font-medium text-ink">{l.quantity}</span>
                        <button className="h-full flex items-center justify-center bg-transparent text-ink hover:bg-sand transition-colors" onClick={() => setQuantity(l.slug, l.quantity + 1)}>
                          <Plus className="w-[14px]" />
                        </button>
                      </div>
                      <button className="text-stone hover:text-error transition-colors p-2" onClick={() => remove(l.slug)}>
                        <Trash2 className="w-[16px]" />
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Desktop quantity */}
                <div className="hidden md:flex flex-col items-center gap-[16px]">
                  <div className="grid grid-cols-[32px_32px_32px] items-center border border-border h-[36px]">
                    <button className="h-full flex items-center justify-center bg-transparent text-ink hover:bg-sand transition-colors" onClick={() => setQuantity(l.slug, l.quantity - 1)}>
                      <Minus className="w-[14px]" />
                    </button>
                    <span className="text-center text-[13px] font-medium text-ink">{l.quantity}</span>
                    <button className="h-full flex items-center justify-center bg-transparent text-ink hover:bg-sand transition-colors" onClick={() => setQuantity(l.slug, l.quantity + 1)}>
                      <Plus className="w-[14px]" />
                    </button>
                  </div>
                  <button className="text-[12px] uppercase tracking-[0.14em] text-stone hover:text-error transition-colors underline underline-offset-4 decoration-border" onClick={() => remove(l.slug)}>
                    Remove
                  </button>
                </div>
                
                {/* Desktop total */}
                <div className="hidden md:block text-right">
                  <strong className="font-medium text-ink text-[16px] tabular-nums">{money(l.product.price * l.quantity)}</strong>
                </div>
              </div>
            ))}
          </div>
          <div className="lg:sticky lg:top-[100px] lg:self-start">
            <OrderSummary subtotal={subtotal} />
          </div>
        </main>
      ) : (
        <Empty
          title="Your bag is empty"
          copy="Explore our curated collections and find the perfect addition to your everyday."
          href="/shop"
          action="Explore collection"
        />
      )}
    </Shell>
  );
}
