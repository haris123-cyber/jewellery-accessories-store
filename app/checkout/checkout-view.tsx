"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CreditCard, Banknote, ShieldCheck } from "lucide-react";
import { getProduct } from "@/lib/catalog";
import { useCommerceStore } from "@/store/commerce-store";
import { OrderSummary } from "@/components/shared";

export const checkoutSchema = z.object({
  email: z.string().email(),
  phone: z.string().min(10),
  name: z.string().min(2),
  address: z.string().min(8),
  city: z.string().min(2),
  state: z.string().min(2),
  postal: z.string().min(6),
  payment: z.string(),
});
export type CheckoutData = z.infer<typeof checkoutSchema>;

export function Checkout() {
  const cart = useCommerceStore((s) => s.cart),
    clearCart = useCommerceStore((s) => s.clearCart);
  const subtotal = cart.reduce(
    (n, l) => n + getProduct(l.slug).price * l.quantity,
    0,
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { payment: "card" },
  });
  
  return (
    <main className="min-h-screen bg-ivory px-[16px] md:px-[4vw] py-[32px] md:py-[48px]">
      <div className="max-w-[1280px] mx-auto mb-[48px] md:mb-[64px] flex items-center justify-between">
        <a className="block font-serif text-[28px] md:text-[32px] font-medium leading-none tracking-[0.3em] text-ink" href="/">
          WOXLY
        </a>
        <div className="hidden md:flex items-center gap-2 text-stone text-[12px] uppercase tracking-[0.14em] font-medium">
          <ShieldCheck className="w-[16px]" /> Secure Checkout
        </div>
      </div>
      
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 lg:grid-cols-[1fr_400px] gap-[48px] lg:gap-[96px]">
        <form
          onSubmit={handleSubmit(() => {
            clearCart();
            window.location.href = "/order-success";
          })}
        >
          <div className="mb-[40px]">
            <p className="m-0 mb-[16px] uppercase tracking-[0.14em] text-[12px] font-medium text-stone">Step 1 of 3</p>
            <h1 className="m-0 font-serif text-[40px] md:text-[48px] leading-[1.1] text-ink">Delivery details</h1>
          </div>
          
          <div className="flex gap-[16px] md:gap-[32px] border-b border-border pb-[24px] text-[12px] uppercase tracking-[0.14em] font-medium text-stone mb-[40px] overflow-auto hide-scrollbar whitespace-nowrap">
            <span className="text-ink border-b-2 border-gold pb-[22px] -mb-[26px]">1 Contact & Delivery</span>
            <span>2 Payment</span>
            <span>3 Review</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[24px] gap-y-[24px] mb-[48px]">
            {[
              ["email", "Email", "email", "col-span-1 md:col-span-2"],
              ["phone", "Phone", "tel", "col-span-1 md:col-span-2"],
              ["name", "Full name", "text", "col-span-1 md:col-span-2"],
              ["address", "Address", "text", "col-span-1 md:col-span-2"],
              ["city", "City", "text", "col-span-1"],
              ["state", "State", "text", "col-span-1"],
              ["postal", "Postal code", "text", "col-span-1 md:col-span-2"],
            ].map(([name, label, type, span]) => (
              <label className={`block relative ${span}`} key={name}>
                <span className="absolute left-[16px] top-[10px] text-[11px] uppercase tracking-[0.1em] font-medium text-stone">
                  {label}
                </span>
                <input 
                  className={`w-full h-[64px] pt-[24px] pb-[8px] px-[16px] border ${errors[name as keyof CheckoutData] ? 'border-error' : 'border-border'} bg-pearl text-ink text-[15px] outline-none transition-colors focus:border-gold rounded-[2px] placeholder:text-transparent`}
                  type={type} 
                  placeholder={label}
                  {...register(name as keyof CheckoutData)} 
                />
                {errors[name as keyof CheckoutData] && (
                  <span className="absolute -bottom-[20px] left-0 text-error text-[11px] font-medium">Please enter a valid {label.toLowerCase()}.</span>
                )}
              </label>
            ))}
          </div>
          
          <fieldset className="border-0 p-0 m-0 mb-[48px]">
            <legend className="font-serif text-[24px] text-ink mb-[24px]">Payment method</legend>
            <div className="flex flex-col gap-[12px]">
              {[
                ["card", "Credit / Debit Card", CreditCard],
                ["upi", "UPI Transfer", Banknote],
                ["cod", "Cash on Delivery", Banknote],
              ].map(([v, l, Icon]) => (
                <label className="flex items-center gap-[16px] h-[64px] px-[24px] border border-border bg-pearl rounded-[2px] cursor-pointer hover:border-gold transition-colors group has-[:checked]:border-ink" key={v}>
                  <input type="radio" value={v} {...register("payment")} className="w-[16px] h-[16px] accent-ink" />
                  <Icon className="w-[20px] text-stone group-has-[:checked]:text-ink" />
                  <span className="text-[14px] font-medium text-ink">{l}</span>
                </label>
              ))}
            </div>
          </fieldset>
          
          <button className="btn-primary w-full h-[64px] text-[14px]" type="submit">
            Place secure order
          </button>
          <div className="mt-[16px] text-center text-stone text-[12px] flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-[14px]" />
            Your payment information is encrypted and secure.
          </div>
        </form>
        
        <div className="lg:sticky lg:top-[48px] lg:self-start">
          <OrderSummary subtotal={subtotal} />
        </div>
      </div>
    </main>
  );
}
