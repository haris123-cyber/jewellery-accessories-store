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
  AddButton,
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
      <main className="min-h-[80vh] grid place-items-center py-[70px] px-5">
        <form
          className="w-[min(100%,500px)] grid gap-[14px]"
          onSubmit={(e) => {
            e.preventDefault();
            toast.success(signup ? "Account created" : "Welcome back");
          }}
        >
          <p className="m-0 mb-[18px] text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">Your WOXLY</p>
          <h1 className="text-foreground text-[64px] max-[560px]:text-[48px]">{signup ? "Create account" : "Welcome back"}</h1>
          {signup && (
            <div className="grid grid-cols-2 gap-[10px]">
              <input className="min-h-[52px] px-[14px] border border-border bg-white text-[15px] normal-case tracking-normal" required placeholder="First name" />
              <input className="min-h-[52px] px-[14px] border border-border bg-white text-[15px] normal-case tracking-normal" required placeholder="Last name" />
            </div>
          )}
          <input className="min-h-[52px] px-[14px] border border-border bg-white text-[15px] normal-case tracking-normal" required type="email" placeholder="Email" />
          {signup && <input className="min-h-[52px] px-[14px] border border-border bg-white text-[15px] normal-case tracking-normal" required type="tel" placeholder="Phone" />}
          <input className="min-h-[52px] px-[14px] border border-border bg-white text-[15px] normal-case tracking-normal" required type="password" placeholder="Password" />
          {signup && (
            <input className="min-h-[52px] px-[14px] border border-border bg-white text-[15px] normal-case tracking-normal" required type="password" placeholder="Confirm password" />
          )}
          <button className="inline-flex min-h-12 items-center justify-center border border-foreground bg-foreground px-6 text-[11px] uppercase tracking-[0.12em] text-background transition-colors hover:border-accent hover:bg-accent disabled:cursor-not-allowed disabled:opacity-45">
            {signup ? "Create account" : "Login"}
          </button>
          <a className="text-center text-muted-foreground text-[13px] mt-3" href={signup ? "/login" : "/signup"}>
            {signup
              ? "Already have an account? Login"
              : "New here? Create account"}
          </a>
        </form>
      </main>
    </Shell>
  );
}
