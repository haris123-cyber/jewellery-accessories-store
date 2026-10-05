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

export function StoryPage({ kind = "about" }: { kind?: string }) {
  const content: { [k: string]: [string, string] } = {
    about: [
      "Our story",
      "We believe the most useful objects can also be the most expressive. WOXLY brings together refined accessories, honest materials and a point of view shaped by modern life.",
    ],
    contact: [
      "Let’s talk",
      "Our client care team is here Monday to Saturday, 10:00–18:00 IST.",
    ],
    "shipping-returns": [
      "Shipping & returns",
      "Clear timelines, careful delivery and easy returns within 14 days.",
    ],
    faq: [
      "Frequently asked questions",
      "Everything you need to know about orders, delivery, returns and care.",
    ],
  };
  const [title, copy] = content[kind] ?? [
    "The art of finishing well",
    "Style is often decided in the final detail — the piece that makes an outfit feel complete.",
  ];
  return (
    <Shell>
      <main className="grid grid-cols-2 items-center gap-[8vw] px-[8vw] py-[10vw] max-[960px]:grid-cols-1 max-[560px]:px-[18px] max-[560px]:py-[70px]">
        <div>
          <p className="mb-[18px] text-[11px] font-semibold uppercase tracking-[.22em] text-accent">WOXLY / {kind.replaceAll("-", " ")}</p>
          <h1 className="font-serif text-[clamp(60px,8vw,120px)] font-normal leading-[.9] tracking-[-.045em] text-foreground">{title}</h1>
          <p className="max-w-[620px] font-serif text-2xl leading-[1.6] text-muted-foreground">{copy}</p>
          {kind === "contact" && (
            <form
              className="mt-[35px] grid gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Message received");
              }}
            >
              <input className="min-h-[52px] border border-border bg-white px-[14px] text-[15px]" required placeholder="Name" />
              <input className="min-h-[52px] border border-border bg-white px-[14px] text-[15px]" required type="email" placeholder="Email" />
              <input className="min-h-[52px] border border-border bg-white px-[14px] text-[15px]" required placeholder="Subject" />
              <textarea className="min-h-[140px] border border-border bg-white px-[14px] pt-[14px] text-[15px]" required placeholder="Message" />
              <button className="inline-flex min-h-12 items-center justify-center border border-foreground bg-foreground px-6 text-[11px] uppercase tracking-[.12em] text-white transition hover:border-accent hover:bg-accent">Send message</button>
            </form>
          )}
        </div>
        <div className="h-[700px] max-[960px]:h-[560px] max-[560px]:h-[460px]">
          <EditorialVisual cell={kind === "about" ? 0 : 4} label={title} />
        </div>
        <Accordion className="col-span-full" type="single" collapsible>
          {[
            "Orders",
            "Shipping",
            "Returns",
            "Payments",
            "Products",
            "Account",
          ].map((x) => (
            <AccordionItem value={x} key={x}>
              <AccordionTrigger>{x}</AccordionTrigger>
              <AccordionContent>
                We keep this simple: clear updates, careful handling and support
                whenever you need it.
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </main>
    </Shell>
  );
}
