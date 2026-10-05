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

export function NotFound() {
  return (
    <Shell>
      <main className="mx-auto min-h-[70vh] max-w-[760px] px-6 py-[12vw] text-center">
        <p className="m-0 mb-[18px] text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">404</p>
        <h1 className="text-[clamp(58px,8vw,100px)] text-foreground">This page has moved.</h1>
        <p className="leading-[1.8] text-muted-foreground">The piece you were looking for is no longer here.</p>
        <a className="mt-8 inline-flex min-h-12 items-center justify-center border border-foreground bg-foreground px-6 text-[11px] uppercase tracking-[0.12em] text-background transition-colors hover:border-accent hover:bg-accent" href="/shop">
          Back to shop
        </a>
      </main>
    </Shell>
  );
}
