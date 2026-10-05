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

export function Wishlist() {
  const wishlist = useCommerceStore((s) => s.wishlist);
  const list = products.filter((p) => wishlist.includes(p.slug));
  return (
    <Shell>
      <div className="px-[4vw] pb-[70px] pt-20 text-center max-[560px]:px-5 max-[560px]:pb-[45px] max-[560px]:pt-[70px]">
        <p className="mb-[18px] text-[11px] font-semibold uppercase tracking-[.22em] text-accent">Saved for later</p>
        <h1 className="font-serif text-[clamp(56px,8vw,120px)] font-normal capitalize leading-[.95] tracking-[-.045em] text-foreground max-[560px]:text-[54px]">Wishlist</h1>
      </div>
      <div className="px-[3.5vw] py-[clamp(70px,10vw,150px)] max-[560px]:px-4">
        {list.length ? (
          <div className="grid grid-cols-4 gap-[18px] max-[960px]:grid-cols-2 max-[560px]:gap-x-2 max-[560px]:gap-y-9">
            {list.map((p, i) => (
              <ProductCard product={p} index={i} key={p.slug} />
            ))}
          </div>
        ) : (
          <Empty
            title="Your wishlist is empty"
            copy="Save the pieces you want to return to."
            href="/shop"
            action="Explore collection"
          />
        )}
      </div>
    </Shell>
  );
}
