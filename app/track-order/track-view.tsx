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

export function Track() {
  const [found, setFound] = useState(false);
  return (
    <Shell>
      <main className="mx-auto min-h-[70vh] max-w-[760px] px-6 py-[12vw] text-center">
        <p className="mb-[18px] text-[11px] font-semibold uppercase tracking-[.22em] text-accent">Order status</p>
        <h1 className="font-serif text-[clamp(58px,8vw,100px)] font-normal leading-[.95] tracking-[-.045em] text-foreground">Track your order</h1>
        <form
          className="mt-10 grid grid-cols-[1fr_1fr_auto] gap-2 max-[560px]:grid-cols-1"
          onSubmit={(e) => {
            e.preventDefault();
            setFound(true);
          }}
        >
          <input className="min-h-[52px] border border-border bg-white px-[14px] text-[15px]" required placeholder="Order number" />
          <input className="min-h-[52px] border border-border bg-white px-[14px] text-[15px]" required placeholder="Email or phone" />
          <button className="inline-flex min-h-12 items-center justify-center border border-foreground bg-foreground px-6 text-[11px] uppercase tracking-[.12em] text-white transition hover:border-accent hover:bg-accent">Track order</button>
        </form>
        {found && (
          <div className="mx-auto mt-[60px] max-w-[500px] text-left">
            {[
              "Order placed",
              "Confirmed",
              "Packed",
              "Shipped",
              "Out for delivery",
              "Delivered",
            ].map((s, i) => (
              <div className="relative grid min-h-20 grid-cols-[48px_1fr] before:absolute before:bottom-0 before:left-[17px] before:top-9 before:w-px before:bg-border last:before:hidden" key={s}>
                <span className={`grid h-9 w-9 place-items-center rounded-full border border-border text-[11px] [&>svg]:w-4 ${i < 3 ? "bg-accent text-white" : "bg-background"}`}>{i < 3 ? <Check /> : i + 1}</span>
                <p className="m-0">
                  <strong>{s}</strong>
                  {i < 3 && <small className="mt-1 block text-muted-foreground">Completed</small>}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
    </Shell>
  );
}
