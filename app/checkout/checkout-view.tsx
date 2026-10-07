"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Banknote, ShieldCheck } from "lucide-react";
import { getProduct, money } from "@/lib/catalog";
import { useCommerceStore } from "@/store/commerce-store";
import { OrderSummary, ProductVisual } from "@/components/shared";
import { Shell } from "@/components/layout";

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
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const cart = useCommerceStore((s) => s.cart);
  const clearCart = useCommerceStore((s) => s.clearCart);
  const placeOrder = useCommerceStore((s) => s.placeOrder);

  useEffect(() => {
    setMounted(true);
  }, []);

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
    defaultValues: { payment: "upi" },
  });

  if (!mounted) return null;

  if (cart.length === 0) {
    return (
      <Shell>
        <main className="min-h-[70vh] flex flex-col items-center justify-center bg-ivory px-6 text-center">
          <ShieldCheck className="w-[64px] h-[64px] text-stone/30 mb-6" />
          <h1 className="font-serif text-[32px] md:text-[48px] text-ink mb-4">Your bag is empty</h1>
          <p className="text-[14px] text-stone mb-8">You need to add some items before you can checkout.</p>
          <a href="/shop" className="btn-primary px-8">Continue Shopping</a>
        </main>
      </Shell>
    );
  }

  return (
    <Shell>
      <main className="min-h-screen bg-ivory px-[16px] md:px-[4vw] py-[32px] md:py-[48px]">

        <div className="mx-auto grid max-w-[1280px] grid-cols-1 lg:grid-cols-[1fr_400px] gap-[48px] lg:gap-[96px]">
          <form
            id="checkout-form"
            onSubmit={handleSubmit(() => {
              const lines = cart.map(item => ({
                slug: item.slug,
                quantity: item.quantity,
                price: getProduct(item.slug).price
              }));
              const orderId = placeOrder(lines, subtotal);
              clearCart();
              router.push(`/order-success?id=${orderId}&subtotal=${subtotal}`);
            })}
          >
            <div className="mb-[40px]">
              <p className="m-0 mb-[6px] uppercase tracking-[0.14em] text-[10px] font-medium text-stone">Step 1 of 3</p>
              <h1 className="m-0 font-serif text-[40px] md:text-[48px] leading-[1.1] text-ink">Delivery details</h1>
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
                    className={`w-full h-[64px] pt-[24px] pb-[8px] rounded-xl px-[16px] border ${errors[name as keyof CheckoutData] ? 'border-error' : 'border-border'} bg-pearl text-ink text-[15px] outline-none transition-colors focus:border-gold rounded-[2px] placeholder:text-transparent`}
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

                  { v: "upi", l: "UPI Transfer", Icon: Banknote },
                  { v: "cod", l: "Cash on Delivery", Icon: Banknote },
                ].map(({ v, l, Icon }) => (
                  <label className="flex items-center gap-[16px] h-[64px] px-[24px] border border-border bg-pearl rounded-[2px] cursor-pointer hover:border-gold transition-colors group has-[:checked]:border-ink" key={v}>
                    <input type="radio" value={v} {...register("payment")} className="w-[16px] h-[16px] accent-ink" />
                    <Icon className="w-[20px] text-stone group-has-[:checked]:text-ink" />
                    <span className="text-[14px] font-medium text-ink">{l}</span>
                  </label>
                ))}
              </div>
            </fieldset>


            <div className="mt-[16px] text-center text-stone text-[12px] flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-[14px]" />
              Your payment information is encrypted and secure.
            </div>
          </form>

          <div className="lg:sticky lg:top-[48px] lg:self-start flex flex-col gap-[0px]">

            <div className="bg-pearl border border-border p-[24px] rounded-[4px] shadow-[0_8px_30px_rgba(27,26,23,0.06)]">
              <h2 className="m-0 mb-6 text-[18px] font-serif">In your bag</h2>
              <div className="flex flex-col gap-[16px] max-h-[300px] overflow-auto hide-scrollbar pr-2">
                {cart.map((l) => {
                  const p = getProduct(l.slug);
                  return (
                    <div className="flex gap-[16px] pb-[16px] border-b border-border last:border-0 last:pb-0" key={l.slug}>
                      <div className="w-[64px] h-[80px] bg-sand shrink-0 relative overflow-hidden rounded-[2px]">
                        <ProductVisual cell={p.cell} name={p.name} image={p.image} />
                      </div>
                      <div className="flex flex-col justify-center flex-1">
                        <span className="text-[14px] font-medium text-ink leading-tight line-clamp-2 mb-1">{p.name}</span>
                        <div className="flex justify-between items-center w-full">
                          <span className="text-[12px] text-stone">Qty {l.quantity}</span>
                          <span className="text-[14px] font-medium text-ink tabular-nums">{money(p.price)}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <OrderSummary subtotal={subtotal} hideCheckoutButton />
            <button
              className="btn-primary w-full h-[64px] text-[14px] mt-6"
              type="submit"
              form="checkout-form"
            >
              Place secure order
            </button>
          </div>
        </div>
      </main>
    </Shell>
  );
}
