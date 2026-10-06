"use client";
import Image from "next/image";
import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  ArrowLeft,
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

function WishlistTabContent() {
  const wishlist = useCommerceStore((s) => s.wishlist);
  const list = products.filter((p) => wishlist.includes(p.slug));

  if (!list.length) {
    return (
      <div className="border border-border p-[32px] md:p-[64px] flex flex-col items-center justify-center text-center gap-4 bg-sand/30 rounded-[2px]">
        <Heart className="w-[48px] h-[48px] text-stone/50" />
        <p className="text-[15px] text-stone">Your wishlist is empty.</p>
        <a href="/shop" className="btn-primary mt-4">Explore Collection</a>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-[16px] md:gap-[24px]">
      {list.map((p, i) => (
        <ProductCard product={p} index={i} key={p.slug} />
      ))}
    </div>
  );
}

export function Account() {
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth >= 768) {
      if (activeTab === "overview") {
        setActiveTab("orders");
      }
    }
  }, [activeTab]);

  return (
    <Shell>
      <main className="max-w-[1280px] mx-auto px-[16px] md:px-[24px] py-[32px] md:py-[80px] grid grid-cols-1 md:grid-cols-[240px_1fr] gap-[32px] md:gap-[80px]">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col gap-[4px]">
          {[
            { id: "orders", label: "Orders" },
            { id: "wishlist", label: "Wishlist" },
            { id: "addresses", label: "Addresses" },
            { id: "profile", label: "Profile" },
            { id: "settings", label: "Settings" },
          ].map((item) => {
            const isActive = activeTab === item.id;
            const baseClasses = "text-[12px] md:text-[13px] font-medium uppercase tracking-[0.12em] font-sans whitespace-nowrap transition-all text-left px-[20px] py-[12px] md:py-[14px] rounded-full";
            const activeClasses = "bg-ink text-pearl shadow-sm";
            const inactiveClasses = "text-stone hover:bg-stone/5 hover:text-ink";

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
              >
                {item.label}
              </button>
            );
          })}
        </aside>

        {/* Main Content */}
        <div className="flex flex-col">
          {/* Mobile Back to Menu */}
          {activeTab !== "overview" && (
            <button
              onClick={() => setActiveTab("overview")}
              className="md:hidden flex items-center gap-2 text-[12px] uppercase tracking-[0.1em] font-medium text-stone mb-8 hover:text-ink transition-colors w-fit"
            >
              <ArrowLeft className="w-4 h-4" /> Back to menu
            </button>
          )}

          {activeTab === "overview" && (
            <div className="md:hidden">
              <h1 className="m-0 text-ink mb-6 font-serif font-normal text-[36px] tracking-[-0.02em]">Welcome back</h1>

              <div className="flex flex-col gap-3 ">
                {[
                  { id: "orders", title: "Orders" },
                  { id: "wishlist", title: "Wishlist" },
                  { id: "addresses", title: "Addresses" },
                  { id: "profile", title: "Profile Details" },
                  { id: "settings", title: "Settings" },
                ].map((card) => {
                  const content = (
                    <>
                      <span className="text-[13px] uppercase tracking-[0.14em] text-ink font-medium">{card.title}</span>
                      <ArrowRight className="w-4 h-4 text-stone" />
                    </>
                  );

                  return (
                    <button
                      key={card.title}
                      onClick={() => setActiveTab(card.id)}
                      className="flex items-center justify-between border border-border p-[20px] bg-white rounded-[30px] w-full"
                    >
                      {content}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="flex flex-col animate-in fade-in duration-300">
              <h2 className="m-0 text-[32px] md:text-[40px] font-serif text-ink mb-6">Order History</h2>
              <div className="border border-border p-[32px] md:p-[64px] flex flex-col items-center justify-center text-center gap-4 bg-sand/30 rounded-[2px]">
                <PackageCheck className="w-[48px] h-[48px] text-stone/50" />
                <p className="text-[15px] text-stone">You haven't placed any orders yet.</p>
                <a href="/shop" className="btn-primary mt-4">Start Shopping</a>
              </div>
            </div>
          )}

          {activeTab === "wishlist" && (
            <div className="flex flex-col animate-in fade-in duration-300">
              <h2 className="m-0 text-[32px] md:text-[40px] font-serif text-ink mb-6">Wishlist</h2>
              <WishlistTabContent />
            </div>
          )}

          {activeTab === "addresses" && (
            <div className="flex flex-col animate-in fade-in duration-300">
              <div className="flex items-center justify-between mb-6">
                <h2 className="m-0 text-[32px] md:text-[40px] font-serif text-ink">Saved Addresses</h2>
                <button className="btn-secondary h-[40px] text-[12px] px-6">ADD NEW</button>
              </div>
              <div className="border border-border p-[32px] bg-white rounded-[2px]">
                <h3 className="text-[16px] font-medium text-ink mb-2">Home (Default)</h3>
                <p className="text-[14px] text-stone leading-relaxed mb-6">
                  John Doe<br />
                  123 Luxury Lane<br />
                  New Delhi, DL 110001<br />
                  India<br />
                  +91 98765 43210
                </p>
                <div className="flex gap-6 text-[12px] uppercase tracking-[0.14em] font-medium">
                  <button className="text-ink hover:text-gold transition-colors underline underline-offset-4 decoration-border">EDIT</button>
                  <button className="text-error hover:opacity-80 transition-colors underline underline-offset-4 decoration-error/50">DELETE</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="flex flex-col animate-in fade-in duration-300">
              <h2 className="m-0 text-[32px] md:text-[40px] font-serif text-ink mb-8">Profile Details</h2>
              <div className="max-w-[480px] flex flex-col gap-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] uppercase tracking-[0.14em] font-medium text-stone">First Name</label>
                    <input type="text" defaultValue="John" className="h-[54px] border border-border px-4 bg-pearl text-ink focus:border-gold outline-none rounded-[2px]" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] uppercase tracking-[0.14em] font-medium text-stone">Last Name</label>
                    <input type="text" defaultValue="Doe" className="h-[54px] border border-border px-4 bg-pearl text-ink focus:border-gold outline-none rounded-[2px]" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] uppercase tracking-[0.14em] font-medium text-stone">Email Address</label>
                  <input type="email" defaultValue="john@example.com" className="h-[54px] border border-border px-4 bg-pearl text-ink focus:border-gold outline-none rounded-[2px]" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] uppercase tracking-[0.14em] font-medium text-stone">Phone Number</label>
                  <input type="tel" defaultValue="+91 98765 43210" className="h-[54px] border border-border px-4 bg-pearl text-ink focus:border-gold outline-none rounded-[2px]" />
                </div>
                <button className="btn-primary w-fit px-10 h-[54px] mt-4">Save Changes</button>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="flex flex-col animate-in fade-in duration-300">
              <h2 className="m-0 text-[32px] md:text-[40px] font-serif text-ink mb-8">Account Settings</h2>

              <div className="flex flex-col gap-6 border border-border p-6 bg-white rounded-[2px] mb-8">
                <div className="flex items-center justify-between">
                  <div className="pr-4">
                    <h3 className="text-[15px] font-medium text-ink mb-1">Email Notifications</h3>
                    <p className="text-[13px] text-stone">Receive updates on new collections, exclusive offers, and events.</p>
                  </div>
                  <div className="w-[44px] h-[24px] bg-ink rounded-full relative cursor-pointer shrink-0 transition-colors">
                    <div className="w-[20px] h-[20px] bg-white rounded-full absolute top-[2px] right-[2px] shadow-sm"></div>
                  </div>
                </div>
                <div className="w-full h-px bg-border"></div>
                <div className="flex items-center justify-between">
                  <div className="pr-4">
                    <h3 className="text-[15px] font-medium text-ink mb-1">SMS Alerts</h3>
                    <p className="text-[13px] text-stone">Get important order updates and delivery notifications on your phone.</p>
                  </div>
                  <div className="w-[44px] h-[24px] bg-border hover:bg-stone/20 rounded-full relative cursor-pointer shrink-0 transition-colors">
                    <div className="w-[20px] h-[20px] bg-white rounded-full absolute top-[2px] left-[2px] shadow-sm"></div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-[18px] font-serif text-ink mb-4">Security</h3>
                <button className="btn-secondary h-[48px] px-8 text-[12px] mb-8">CHANGE PASSWORD</button>
              </div>

              <div className="pt-8 border-t border-border">
                <button className="text-[13px] text-error font-medium underline underline-offset-4 hover:opacity-80 transition-opacity">
                  Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </Shell>
  );
}
