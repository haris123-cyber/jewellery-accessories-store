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

export function Journal() {
  const stories = [
    "The art of finishing well",
    "A guide to everyday leather",
    "Objects for the weekend",
    "The quiet return of gold",
    "How to choose a frame",
    "Inside the travel edit",
  ];
  return (
    <Shell>
      <div className="px-[4vw] pb-[70px] pt-[clamp(80px,12vw,180px)] text-center max-[560px]:px-5 max-[560px]:pb-[45px]">
        <p className="mb-[18px] text-[11px] font-semibold uppercase tracking-[.22em] text-accent">Notes on style and objects</p>
        <h1 className="font-serif text-[clamp(56px,8vw,120px)] font-normal capitalize leading-[.95] tracking-[-.045em] text-foreground max-[560px]:text-[54px]">Journal</h1>
      </div>
      <main className="grid grid-cols-3 gap-x-5 gap-y-[60px] px-[4vw] pb-[9vw] max-[960px]:grid-cols-2 max-[560px]:grid-cols-1 max-[560px]:px-4 max-[560px]:pb-[70px]">
        {stories.map((s, i) => (
          <article className="first:col-span-2 max-[560px]:first:col-span-1" key={s}>
            <div className="h-[520px] max-[560px]:h-[430px]"><EditorialVisual cell={i} label={s} /></div>
            <p className="mb-[18px] mt-[22px] text-[11px] font-semibold uppercase tracking-[.22em] text-accent">
              {["Style", "Guides", "Travel"][i % 3]}
            </p>
            <h2 className="mb-[14px] font-serif text-4xl font-normal tracking-[-.045em]">{s}</h2>
            <p className="leading-[1.6] text-muted-foreground">
              Thoughtful observations on design, material and the details that
              shape everyday style.
            </p>
            <a
              className="relative inline-flex items-center gap-2.5 text-[11px] uppercase tracking-[.12em] after:absolute after:-bottom-1.5 after:left-0 after:right-full after:h-px after:bg-current after:transition-all hover:after:right-0 [&>svg]:w-4"
              href={`/journal/${s.toLowerCase().replaceAll(" ", "-")}`}
            >
              Read story <ArrowRight />
            </a>
          </article>
        ))}
      </main>
    </Shell>
  );
}
