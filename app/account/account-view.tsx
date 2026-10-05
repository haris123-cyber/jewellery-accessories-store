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

export function Account() {
  return (
    <Shell>
      <main className="max-w-[1280px] mx-auto px-[16px] md:px-[24px] py-[32px] md:py-[80px] grid grid-cols-1 md:grid-cols-[240px_1fr] gap-[32px] md:gap-[80px]">
        {/* Sidebar */}
        <aside className="flex flex-col gap-[8px] md:gap-[16px] max-md:flex-row max-md:overflow-x-auto hide-scrollbar max-md:border-b border-border">
          {[
            { label: "Overview", href: "/account" },
            { label: "Orders", href: "/account/orders" },
            { label: "Wishlist", href: "/wishlist" },
            { label: "Addresses", href: "/account/addresses" },
            { label: "Profile", href: "/account/profile" },
            { label: "Settings", href: "/account/settings" },
          ].map((item) => (
            <a
              href={item.href}
              key={item.label}
              className={`
                text-[13px] font-medium uppercase tracking-[0.14em] font-sans whitespace-nowrap transition-colors
                pb-[12px] md:pb-2 border-b-[2px] md:border-b-0 md:border-l-[2px] md:pl-4
                ${item.label === "Overview" 
                  ? "text-ink border-ink max-md:border-ink md:border-ink" 
                  : "text-stone border-transparent max-md:border-transparent md:border-transparent hover:text-ink"}
              `}
            >
              {item.label}
            </a>
          ))}
        </aside>

        {/* Main Content */}
        <div className="flex flex-col">
          <p className="m-0 mb-3 text-gold text-[12px] uppercase tracking-[0.14em] font-medium">My Woxly</p>
          <h1 className="m-0 text-ink mb-10 font-serif font-normal text-[44px] md:text-[64px] tracking-[-0.02em]">Welcome back</h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px] md:gap-[24px]">
            {[
              { title: "Recent orders", desc: "1 active order", link: "/account/orders" },
              { title: "Wishlist", desc: "Saved pieces", link: "/wishlist" },
              { title: "Addresses", desc: "1 saved address", link: "/account/addresses" },
            ].map((card) => (
              <a 
                key={card.title}
                href={card.link}
                className="group flex flex-col justify-between min-h-[160px] md:min-h-[200px] border border-border p-[24px] md:p-[32px] hover:border-gold transition-colors bg-transparent rounded-[2px]"
              >
                <div>
                  <h3 className="m-0 text-[24px] md:text-[28px] font-normal font-serif text-ink mb-1">{card.title}</h3>
                  <p className="m-0 text-[15px] text-stone font-sans mb-8">{card.desc}</p>
                </div>
                <span className="mt-auto self-start flex items-center gap-[8px] text-[11px] uppercase tracking-[0.14em] text-ink font-medium transition-colors group-hover:text-gold">
                  VIEW <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </main>
    </Shell>
  );
}
