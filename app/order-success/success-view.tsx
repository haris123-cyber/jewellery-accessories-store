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

export function Success() {
  return (
    <Shell>
      <main className="mx-auto min-h-[70vh] max-w-[760px] px-6 py-[12vw] text-center">
        <CircleCheck className="mx-auto mb-7 h-[70px] w-[70px] stroke-1 text-accent" />
        <p className="mb-[18px] text-[11px] font-semibold uppercase tracking-[.22em] text-accent">Thank you</p>
        <h1 className="font-serif text-[clamp(58px,8vw,100px)] font-normal leading-[.95] tracking-[-.045em] text-foreground">Order confirmed</h1>
        <p className="leading-[1.8] text-muted-foreground">
          Your order <strong>#GLR-26091</strong> is being prepared. Estimated
          delivery: 30 Sep–2 Oct.
        </p>
        <div className="mt-[35px] flex justify-center gap-2.5 max-[560px]:flex-col">
          <a className="inline-flex min-h-12 items-center justify-center border border-foreground bg-foreground px-6 text-[11px] uppercase tracking-[.12em] text-white transition hover:border-accent hover:bg-accent" href="/track-order">
            Track order
          </a>
          <a className="inline-flex min-h-12 items-center justify-center border border-foreground px-6 text-[11px] uppercase tracking-[.12em] transition hover:border-accent hover:bg-accent hover:text-white" href="/shop">
            Continue shopping
          </a>
        </div>
      </main>
    </Shell>
  );
}
