"use client";
import { usePathname } from "next/navigation";
import { money } from "@/lib/catalog";

export function OrderSummary({ subtotal, hideCheckoutButton = false }: { subtotal: number; hideCheckoutButton?: boolean }) {
  const shipping = subtotal >= 2999 ? 0 : 149;
  const pathname = usePathname();
  const isCheckout = pathname === '/checkout';
  return (
    <aside className="p-[24px] md:p-[32px] bg-pearl border border-border rounded-[4px] shadow-[0_8px_30px_rgba(27,26,23,0.06)]">
      <h2 className="m-0 mb-6 text-[18px] font-serif">Order summary</h2>
      <div className="space-y-4 mb-6">
        <p className="m-0 flex justify-between text-[15px] text-stone">
          <span>Subtotal</span>
          <strong className="text-ink font-medium tabular-nums">{money(subtotal)}</strong>
        </p>
        <p className="m-0 flex justify-between text-[15px] text-stone">
          <span>Shipping</span>
          <strong className="text-ink font-medium tabular-nums">{shipping === 0 ? "Complimentary" : money(shipping)}</strong>
        </p>
      </div>
      <p className="m-0 flex justify-between pt-4 border-t border-border text-[18px] text-ink font-sans">
        <span>Total</span>
        <strong className="tabular-nums">{money(subtotal + shipping)}</strong>
      </p>
      {!isCheckout && !hideCheckoutButton && (
        <a className="btn-primary w-full mt-8" href="/checkout">
          Proceed to checkout
        </a>
      )}
      <p className="mt-4 text-center text-stone text-[12px] flex items-center justify-center gap-2">
        Secure checkout · Easy returns
      </p>
    </aside>
  );
}
