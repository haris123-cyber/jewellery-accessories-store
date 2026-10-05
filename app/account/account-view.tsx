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

export function Account() {
  return (
    <Shell>
      <main className="grid grid-cols-[220px_1fr] gap-[7vw] px-[8vw] py-[10vw] max-[960px]:grid-cols-1 max-[560px]:px-[18px] max-[560px]:py-[70px]">
        <aside className="grid content-start gap-[18px] max-[960px]:flex max-[960px]:overflow-auto">
          {[
            "Overview",
            "Orders",
            "Wishlist",
            "Addresses",
            "Profile",
            "Settings",
          ].map((x) => (
            <a
              href={
                x === "Wishlist"
                  ? "/wishlist"
                  : x === "Orders"
                    ? "/account/orders"
                    : "/account"
              }
              key={x}
              className="border-b border-border pb-[14px] text-[13px] max-[960px]:whitespace-nowrap"
            >
              {x}
            </a>
          ))}
        </aside>
        <div>
          <p className="mb-[18px] text-[11px] font-semibold uppercase tracking-[.22em] text-accent">My WOXLY</p>
          <h1 className="font-serif text-[80px] font-normal leading-[.95] tracking-[-.045em] text-foreground max-[560px]:text-[56px]">Welcome back</h1>
          <div className="mt-10 grid grid-cols-3 gap-3 max-[960px]:grid-cols-2 max-[560px]:grid-cols-1">
            {[
              ["Recent orders", "1 active order"],
              ["Wishlist", "Saved pieces"],
              ["Addresses", "1 saved address"],
            ].map(([a, b]) => (
              <article className="min-h-[220px] border border-border p-6" key={a}>
                <h2 className="font-serif text-[28px] font-normal tracking-[-.045em]">{a}</h2>
                <p className="text-muted-foreground">{b}</p>
                <a className="relative inline-flex items-center gap-2.5 text-[11px] uppercase tracking-[.12em] after:absolute after:-bottom-1.5 after:left-0 after:right-full after:h-px after:bg-current after:transition-all hover:after:right-0 [&>svg]:w-4" href="#">
                  View <ArrowRight />
                </a>
              </article>
            ))}
          </div>
        </div>
      </main>
    </Shell>
  );
}
