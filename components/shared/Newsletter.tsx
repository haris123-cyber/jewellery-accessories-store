"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

export const emailSchema = z.object({
  email: z.string().email("Enter a valid email"),
});

export function Newsletter() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ email: string }>({ resolver: zodResolver(emailSchema) });
  return (
    <section className="py-[56px] md:py-[96px] px-[16px] md:px-[24px] bg-sand text-center flex flex-col items-center">
      <div className="max-w-[500px] w-full">
        <p className="m-0 mb-[16px] uppercase tracking-[0.14em] text-[12px] font-medium text-stone">Private notes</p>
        <h2 className="m-0 mb-4 text-ink">10% off your first order</h2>
        <p className="mb-8 text-stone">
          Be the first to discover new collections, limited drops and private offers.
        </p>

        <form
          className="relative w-full flex"
          onSubmit={handleSubmit(() => {
            toast.success("Welcome to WOXLY");
            reset();
          })}
        >
          <input
            suppressHydrationWarning
            className="flex-1 min-h-[48px] px-4 border border-border bg-ivory text-ink rounded-l-[2px] rounded-r-none outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-shadow placeholder:text-stone/60"
            aria-label="Email address"
            placeholder="Email address"
            {...register("email")}
          />
          <button suppressHydrationWarning type="submit" className="btn-primary rounded-l-none min-h-[48px] px-6 m-0">
            Join
          </button>
          {errors.email && <span role="alert" className="absolute top-[100%] mt-2 left-0 text-error text-[12px]">{errors.email.message}</span>}
        </form>
      </div>
    </section>
  );
}
