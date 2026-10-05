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

export function SearchPage() {
  const [q, setQ] = useState("");
  const list = q
    ? products.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()))
    : products.slice(0, 8);
  return (
    <Shell>
      <main className="px-[4vw] py-[9vw] max-[560px]:px-4 max-[560px]:py-[70px]">
        <p className="mb-[18px] text-center text-[11px] font-semibold uppercase tracking-[.22em] text-accent">Find your piece</p>
        <label className="mx-auto flex max-w-[1000px] items-center border-b border-foreground">
          <Search className="w-[34px]" />
          <input
            className="w-full border-0 bg-transparent px-5 py-[30px] font-serif text-[clamp(28px,5vw,70px)] outline-none"
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search bags, watches, jewelry..."
          />
        </label>
        <div className="my-[30px] mb-[60px] flex justify-between text-xs text-muted-foreground max-[560px]:gap-4">
          <span>{list.length} results</span>
          <span>Popular: Bags · Jewelry · Travel</span>
        </div>
        {list.length ? (
          <div className="grid grid-cols-4 gap-[18px] max-[960px]:grid-cols-2 max-[560px]:gap-x-2 max-[560px]:gap-y-9">
            {list.map((p, i) => (
              <ProductCard product={p} index={i} key={p.slug} />
            ))}
          </div>
        ) : (
          <Empty
            title="No pieces found"
            copy="Try a broader term such as bags, gold or leather."
            href="/shop"
            action="Browse all"
          />
        )}
      </main>
    </Shell>
  );
}
