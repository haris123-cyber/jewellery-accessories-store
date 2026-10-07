"use client";
import Image from "next/image";
import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  ArrowRight,
  Camera,
  Check,
  ChevronDown,
  CircleCheck,
  CreditCard,
  Heart,
  Menu,
  Minus,
  PackageCheck,
  Plus,
  Search,
  ShieldCheck,
  ShoppingBag,
  SlidersHorizontal,
  Trash2,
  Truck,
  UserRound,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Toaster } from "@/components/ui/sonner";
import {
  categories,
  getProduct,
  money,
  products,
  type Product,
} from "@/lib/catalog";
import { useCommerceStore } from "@/store/commerce-store";
import {
  ProductVisual,
  EditorialVisual,
  WishButton,
  ProductCard,
  ProductSection,
  Social,
  Newsletter,
  Filters,
  OrderSummary,
  Empty,
} from "@/components/shared";
import { Header, Footer, Shell, CartDrawer } from "@/components/layout";

export function Auth({ signup = false }: { signup?: boolean }) {
  return (
    <Shell>
      <main className="min-h-screen bg-ivory flex items-center justify-center py-[64px] px-[24px]">
        <div className="w-full max-w-[440px] bg-white border border-border p-[40px] md:p-[56px] rounded-[24px] shadow-[0_8px_30px_rgba(27,26,23,0.04)]">
          
          <div className="text-center mb-[40px]">
            <h1 className="font-serif text-[40px] md:text-[48px] text-ink leading-tight mb-2">
              {signup ? "Create Account" : "Welcome Back"}
            </h1>
            <p className="text-[14px] text-stone">
              {signup ? "Join Woxly to experience premium jewelry." : "Sign in to access your Woxly account."}
            </p>
          </div>

          <form
            className="flex flex-col gap-[20px]"
            onSubmit={(e) => {
              e.preventDefault();
              toast.success(signup ? "Account created" : "Welcome back");
            }}
          >
            {signup && (
              <div className="grid grid-cols-2 gap-[16px]">
                <label className="relative block">
                  <span className="absolute left-[16px] top-[10px] text-[10px] uppercase tracking-[0.1em] font-medium text-stone">First name</span>
                  <input className="w-full h-[64px] pt-[24px] pb-[8px] rounded-[12px] px-[16px] border border-border bg-pearl text-ink text-[15px] outline-none transition-colors focus:border-gold placeholder:text-transparent" required placeholder="First name" />
                </label>
                <label className="relative block">
                  <span className="absolute left-[16px] top-[10px] text-[10px] uppercase tracking-[0.1em] font-medium text-stone">Last name</span>
                  <input className="w-full h-[64px] pt-[24px] pb-[8px] rounded-[12px] px-[16px] border border-border bg-pearl text-ink text-[15px] outline-none transition-colors focus:border-gold placeholder:text-transparent" required placeholder="Last name" />
                </label>
              </div>
            )}
            
            <label className="relative block">
              <span className="absolute left-[16px] top-[10px] text-[10px] uppercase tracking-[0.1em] font-medium text-stone">Email</span>
              <input className="w-full h-[64px] pt-[24px] pb-[8px] rounded-[12px] px-[16px] border border-border bg-pearl text-ink text-[15px] outline-none transition-colors focus:border-gold placeholder:text-transparent" required type="email" placeholder="Email" />
            </label>

            {signup && (
              <label className="relative block">
                <span className="absolute left-[16px] top-[10px] text-[10px] uppercase tracking-[0.1em] font-medium text-stone">Phone</span>
                <input className="w-full h-[64px] pt-[24px] pb-[8px] rounded-[12px] px-[16px] border border-border bg-pearl text-ink text-[15px] outline-none transition-colors focus:border-gold placeholder:text-transparent" required type="tel" placeholder="Phone" />
              </label>
            )}

            <label className="relative block">
              <span className="absolute left-[16px] top-[10px] text-[10px] uppercase tracking-[0.1em] font-medium text-stone">Password</span>
              <input className="w-full h-[64px] pt-[24px] pb-[8px] rounded-[12px] px-[16px] border border-border bg-pearl text-ink text-[15px] outline-none transition-colors focus:border-gold placeholder:text-transparent" required type="password" placeholder="Password" />
            </label>

            {signup && (
              <label className="relative block">
                <span className="absolute left-[16px] top-[10px] text-[10px] uppercase tracking-[0.1em] font-medium text-stone">Confirm Password</span>
                <input className="w-full h-[64px] pt-[24px] pb-[8px] rounded-[12px] px-[16px] border border-border bg-pearl text-ink text-[15px] outline-none transition-colors focus:border-gold placeholder:text-transparent" required type="password" placeholder="Confirm password" />
              </label>
            )}

            {!signup && (
              <div className="flex justify-end -mt-[8px]">
                <a href="#" className="text-[12px] text-stone hover:text-ink underline-offset-4 hover:underline transition-colors">
                  Forgot password?
                </a>
              </div>
            )}

            <button className="btn-primary w-full h-[64px] text-[14px] mt-[8px] rounded-full">
              {signup ? "Create account" : "Sign In"}
            </button>
            
            <div className="text-center mt-[16px]">
              <a className="text-[13px] text-stone hover:text-ink underline-offset-4 hover:underline transition-colors" href={signup ? "/login" : "/signup"}>
                {signup
                  ? "Already have an account? Sign In"
                  : "New to Woxly? Create an account"}
              </a>
            </div>
          </form>
        </div>
      </main>
    </Shell>
  );
}
