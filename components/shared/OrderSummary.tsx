"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { money } from "@/lib/catalog";
import { ShieldCheck, Tag, Check, X, Sparkles } from "lucide-react";
import { useCommerceStore } from "@/store/commerce-store";
import { toast } from "sonner";

export function OrderSummary({ subtotal, hideCheckoutButton = false }: { subtotal: number; hideCheckoutButton?: boolean }) {
  const { promoCode, discountPercent, applyPromo, removePromo } = useCommerceStore();
  const [inputCode, setInputCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isApplying, setIsApplying] = useState(false);

  const shipping = subtotal >= 2999 ? 0 : 149;
  const discountAmount = discountPercent > 0 ? Math.round(subtotal * (discountPercent / 100)) : 0;
  const total = Math.max(0, subtotal - discountAmount + shipping);

  const pathname = usePathname();
  const isCheckout = pathname === '/checkout';

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) {
      setErrorMsg("Please enter a promo code");
      return;
    }
    setIsApplying(true);
    setTimeout(() => {
      const res = applyPromo(inputCode);
      setIsApplying(false);
      if (res.success) {
        toast.success(res.message);
        setInputCode("");
        setErrorMsg("");
      } else {
        setErrorMsg(res.message);
        toast.error(res.message);
      }
    }, 150);
  };

  const handleApplyPreset = (code: string) => {
    setIsApplying(true);
    setTimeout(() => {
      const res = applyPromo(code);
      setIsApplying(false);
      if (res.success) {
        toast.success(res.message);
        setInputCode("");
        setErrorMsg("");
      } else {
        setErrorMsg(res.message);
        toast.error(res.message);
      }
    }, 150);
  };

  const handleRemove = () => {
    removePromo();
    toast.success("Promo code removed");
    setErrorMsg("");
  };

  return (
    <aside className="p-[24px] md:p-[32px] bg-pearl border border-border rounded-[4px] shadow-[0_8px_30px_rgba(27,26,23,0.06)]">
      <h2 className="m-0 mb-6 text-[18px] font-serif">Order summary</h2>
      <div className="space-y-4 mb-6">
        <p className="m-0 flex justify-between text-[15px] text-stone">
          <span>Subtotal</span>
          <strong className="text-ink font-medium tabular-nums">{money(subtotal)}</strong>
        </p>

        {discountAmount > 0 && promoCode && (
          <div className="flex justify-between items-center gap-2 text-[13.5px] sm:text-[14px] text-emerald-800 bg-emerald-50/80 border border-emerald-200/70 px-3 py-2 rounded-[4px]">
            <span className="flex items-center gap-1.5 font-medium truncate">
              <Tag className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span className="truncate">Promo ({promoCode} · {discountPercent}%)</span>
            </span>
            <strong className="tabular-nums font-semibold shrink-0">-{money(discountAmount)}</strong>
          </div>
        )}

        <p className="m-0 flex justify-between text-[15px] text-stone">
          <span>Shipping</span>
          <strong className="text-ink font-medium tabular-nums">{shipping === 0 ? "Complimentary" : money(shipping)}</strong>
        </p>
      </div>

      {/* Promo Code Typing Option */}
      <div className="my-6 pt-5 border-t border-border">
        {promoCode ? (
          <div className="flex items-center justify-between p-3 bg-[#FAF7F2] border border-[#E5E0D8] rounded-[4px]">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[12px] font-bold text-ink uppercase tracking-wider">{promoCode}</span>
                  <span className="text-[10px] font-bold text-emerald-800 uppercase bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                    {discountPercent}% OFF
                  </span>
                </div>
                <p className="text-[11px] text-emerald-700 truncate mt-0.5">
                  Saved {money(discountAmount)} on this order
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleRemove}
              className="text-stone hover:text-red-600 transition-colors p-1.5 cursor-pointer rounded hover:bg-sand/50"
              title="Remove promo code"
              aria-label="Remove promo code"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <form onSubmit={handleApplyPromo} className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-1 flex-wrap">
              <label className="text-[11px] uppercase tracking-[0.14em] font-semibold text-stone flex items-center gap-1.5 shrink-0">
                <Tag className="w-3.5 h-3.5 text-gold" />
                Promo code
              </label>
              <button
                type="button"
                onClick={() => handleApplyPreset("WELOCOM10")}
                className="text-[10px] uppercase tracking-[0.1em] font-semibold text-gold hover:text-ink transition-colors cursor-pointer flex items-center gap-1 shrink-0"
              >
                <Sparkles className="w-3 h-3" />
                Use WELOCOM10
              </button>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={inputCode}
                onChange={(e) => {
                  setInputCode(e.target.value.toUpperCase());
                  if (errorMsg) setErrorMsg("");
                }}
                placeholder="Enter promo code"
                autoCapitalize="characters"
                className="flex-1 min-w-0 h-[42px] px-3.5 bg-ivory/60 border border-border focus:border-gold focus:bg-white text-ink placeholder:text-stone/60 outline-none rounded-[4px] text-[13px] tracking-wider uppercase transition-colors"
              />
              <button
                type="submit"
                disabled={!inputCode.trim() || isApplying}
                className="h-[42px] px-5 bg-ink hover:bg-gold text-ivory text-[11px] uppercase tracking-[0.14em] font-semibold rounded-[4px] transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
              >
                {isApplying ? "..." : "Apply"}
              </button>
            </div>

            {errorMsg && (
              <p className="text-[11px] text-red-600 mt-0.5">{errorMsg}</p>
            )}
          </form>
        )}
      </div>

      <p className="m-0 flex justify-between pt-4 border-t border-border text-[18px] text-ink font-sans">
        <span>Total</span>
        <strong className="tabular-nums">{money(total)}</strong>
      </p>

      {!isCheckout && !hideCheckoutButton && (
        <a className="btn-primary w-full mt-8" href="/checkout">
          Proceed to checkout
        </a>
      )}
      <p className="mt-4 text-center text-stone text-[12px] flex items-center justify-center gap-2">
        <ShieldCheck className="w-3 h-3" /> Secure checkout
      </p>
    </aside>
  );
}
