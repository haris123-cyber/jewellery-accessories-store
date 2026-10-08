"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, Eye, EyeOff, LockKeyhole } from "lucide-react";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

type AuthProps = { signup?: boolean };

const inputClass =
  "h-12 w-full border-b border-border bg-transparent px-0 text-[14px] text-ink outline-none transition-colors placeholder:text-stone/70 focus:border-gold";

export function Auth({ signup = false }: AuthProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const title = signup ? "Create your account" : "Welcome back";

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!signup) {
      router.replace("/account");
      return;
    }

    toast.success("Your sign-up form was submitted.");
  }

  return (
    <main className="min-h-[calc(100vh-120px)] bg-ivory px-4 py-6 md:grid md:grid-cols-2 md:p-0">
      <section className="relative hidden min-h-[760px] overflow-hidden bg-emerald md:block">
        <Image
          alt="WOXLY fine jewellery collection"
          className="object-cover object-center opacity-80"
          fill
          priority
          sizes="50vw"
          src="/images/banners/image copy 3.png"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald via-emerald/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-12 text-ivory lg:p-16">
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[.22em] text-gold-soft">
            Made for every moment
          </p>
          <h1 className="max-w-md font-serif text-5xl font-medium leading-[.9] tracking-tight lg:text-6xl">
            A little luxury, every day.
          </h1>
          <p className="mt-6 max-w-sm text-sm leading-7 text-ivory/80">
            Discover considered jewellery and accessories designed to become part of your story.
          </p>
        </div>
      </section>

      <section className="flex min-h-[650px] items-center justify-center py-10 md:min-h-[760px] md:py-16">
        <div className="w-full max-w-[430px]">
          <Link className="mb-14 inline-block font-serif text-[27px] font-medium tracking-[.3em] text-ink" href="/">
            WOXLY
          </Link>

          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[.2em] text-gold">
            {signup ? "Join the collection" : "Your WOXLY account"}
          </p>
          <h1 className="font-serif text-[44px] font-medium leading-none tracking-tight text-ink md:text-[54px]">
            {title}
          </h1>
          <p className="mt-4 max-w-sm text-sm leading-6 text-stone">
            {signup
              ? "Save your favourite pieces, track every order and receive early access to new drops."
              : "Sign in to manage your orders, wishlist and personal details."}
          </p>

          <form className="mt-10 space-y-6" onSubmit={submit}>
            {signup && (
              <div className="grid grid-cols-2 gap-5">
                <label className="grid gap-2 text-[11px] font-semibold uppercase tracking-[.12em] text-ink">
                  First name
                  <input className={inputClass} autoComplete="given-name" placeholder="Aanya" required />
                </label>
                <label className="grid gap-2 text-[11px] font-semibold uppercase tracking-[.12em] text-ink">
                  Last name
                  <input className={inputClass} autoComplete="family-name" placeholder="Sharma" required />
                </label>
              </div>
            )}

            <label className="grid gap-2 text-[11px] font-semibold uppercase tracking-[.12em] text-ink">
              Email address
              <input className={inputClass} autoComplete="email" placeholder="you@example.com" required type="email" />
            </label>

            {signup && (
              <label className="grid gap-2 text-[11px] font-semibold uppercase tracking-[.12em] text-ink">
                Phone number
                <input className={inputClass} autoComplete="tel" placeholder="+91 98765 43210" required type="tel" />
              </label>
            )}

            <label className="grid gap-2 text-[11px] font-semibold uppercase tracking-[.12em] text-ink">
              Password
              <span className="relative">
                <input
                  className={`${inputClass} pr-10`}
                  autoComplete={signup ? "new-password" : "current-password"}
                  minLength={8}
                  placeholder="At least 8 characters"
                  required
                  type={showPassword ? "text" : "password"}
                />
                <button
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-stone transition-colors hover:text-ink"
                  onClick={() => setShowPassword((visible) => !visible)}
                  type="button"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </span>
            </label>

            {signup && (
              <label className="flex items-start gap-3 pt-1 text-xs leading-5 text-stone">
                <input className="mt-1 size-3.5 accent-gold" required type="checkbox" />
                <span>I agree to the Terms of Use and Privacy Policy.</span>
              </label>
            )}

            {!signup && (
              <div className="flex items-center justify-between pt-1 text-xs">
                <label className="flex items-center gap-2 text-stone">
                  <input className="size-3.5 accent-gold" type="checkbox" /> Remember me
                </label>
                <a className="text-ink underline decoration-gold underline-offset-4 hover:text-gold" href="#">
                  Forgot password?
                </a>
              </div>
            )}

            <button className="mt-2 inline-flex min-h-14 w-full items-center justify-center gap-3 bg-ink px-6 text-[12px] font-medium uppercase tracking-[.14em] text-ivory transition-colors hover:bg-gold" type="submit">
              {signup ? "Create account" : "Sign in"} <ArrowRight className="size-4" />
            </button>
          </form>

          <div className="mt-9 border-t border-border pt-6 text-center text-sm text-stone">
            {signup ? "Already have an account? " : "New to WOXLY? "}
            <Link className="font-medium text-ink underline decoration-gold underline-offset-4 hover:text-gold" href={signup ? "/login" : "/signup"}>
              {signup ? "Sign in" : "Create an account"}
            </Link>
          </div>

          <p className="mt-8 flex items-center justify-center gap-2 text-center text-[11px] uppercase tracking-[.1em] text-stone">
            {signup ? <Check className="size-3.5 text-gold" /> : <LockKeyhole className="size-3.5 text-gold" />}
            {signup ? "Secure & private" : "Your details are protected"}
          </p>
        </div>
      </section>
      <Toaster position="bottom-center" richColors />
    </main>
  );
}
