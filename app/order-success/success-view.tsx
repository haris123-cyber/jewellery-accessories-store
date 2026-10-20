"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Check,
  CheckCircle2,
  Package,
  Truck,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Download,
  ShoppingBag,
  MapPin,
  CreditCard,
  Clock,
  MessageSquare,
  Award,
  ChevronRight,
  Gift,
  Printer,
  RotateCcw,
  Gem,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import { Shell } from "@/components/layout";
import { getProduct, money, products, type Product } from "@/lib/catalog";
import { useCommerceStore } from "@/store/commerce-store";
import { showAddedToBagToast } from "@/components/ui/app-toast";

export function Success({ subtotal = 0, orderId }: { subtotal?: number; orderId?: string }) {
  const orders = useCommerceStore((s) => s.orders);
  const add = useCommerceStore((s) => s.add);

  // Retrieve current order or fallback
  const currentOrder = useMemo(() => {
    if (orderId) {
      const found = orders.find((o) => o.id === orderId);
      if (found) return found;
    }
    if (orders.length > 0) return orders[0];
    return null;
  }, [orders, orderId]);

  const displayOrderId = currentOrder?.id || orderId || "WX-89321";
  const displayDate = currentOrder?.date || new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

  const orderLines = useMemo(() => {
    if (currentOrder?.lines && currentOrder.lines.length > 0) {
      return currentOrder.lines;
    }
    // Fallback display pieces if directly visited
    return [
      { slug: products[0]?.slug || "solitaire-diamond-ring", quantity: 1, price: products[0]?.price || 14999 },
      { slug: products[1]?.slug || "eternity-gold-band", quantity: 1, price: products[1]?.price || 4718 },
    ];
  }, [currentOrder]);

  const computedSubtotal = useMemo(() => {
    return orderLines.reduce((acc, line) => {
      const p = getProduct(line.slug);
      return acc + (p.price * line.quantity);
    }, 0);
  }, [orderLines]);

  const displayTotal = currentOrder?.total || subtotal || computedSubtotal;

  // Dynamic estimated delivery date window (3 to 5 days ahead)
  const deliveryRange = useMemo(() => {
    const d1 = new Date();
    d1.setDate(d1.getDate() + 3);
    const d2 = new Date();
    d2.setDate(d2.getDate() + 5);
    const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "short" };
    return `${d1.toLocaleDateString("en-IN", options)} – ${d2.toLocaleDateString("en-IN", options)}`;
  }, []);

  // Shipping details state loaded from localStorage
  const [shippingAddress, setShippingAddress] = useState({
    name: "Anjali Nair",
    phone: "+91 98765 43210",
    street: "123 Luxury Lane, Near Palm Court",
    city: "New Delhi",
    state: "Delhi",
    postal: "110001",
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem("woxly_saved_addresses");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const def = parsed.find((a: any) => a.isDefault) || parsed[0];
          setShippingAddress({
            name: def.name || "Anjali Nair",
            phone: def.phone || "+91 98765 43210",
            street: def.address || def.street || "123 Luxury Lane, Near Palm Court",
            city: def.city || "New Delhi",
            state: def.state || "Delhi",
            postal: def.postal || def.pincode || "110001",
          });
        }
      }
    } catch { }
  }, []);

  // Curated complementary recommendation pieces
  const recommendedProducts = useMemo(() => {
    const currentSlugs = orderLines.map((l) => l.slug);
    return products.filter((p) => !currentSlugs.includes(p.slug)).slice(0, 3);
  }, [orderLines]);

  const handlePrintReceipt = () => {
    toast.success(`Preparing receipt for Order #${displayOrderId}...`);
    setTimeout(() => {
      if (typeof window !== "undefined") {
        window.print();
      }
    }, 300);
  };

  return (
    <Shell>
      <div className="bg-[#FAF7F2] min-h-screen py-6 sm:py-10 md:py-12 px-3 sm:px-6 lg:px-8">
        <div className="max-w-[1080px] mx-auto flex flex-col gap-6 sm:gap-8 md:gap-10">

          {/* 1. HERO CELEBRATION HEADER */}
          <div className="bg-white border border-[#E5E0D8] rounded-[20px] sm:rounded-[28px] md:rounded-[32px] p-5 sm:p-8 md:p-10 text-center shadow-[0_4px_24px_rgba(27,26,23,0.04)] relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 sm:w-96 h-80 sm:h-96 bg-[#C99B53]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
              {/* Animated Gold Celebratory Emblem */}
              <div className="relative flex items-center justify-center mb-4 sm:mb-5">
                <style>{`
                  @keyframes emblemPop {
                    0% {
                      transform: scale(0.2);
                      opacity: 0;
                    }
                    60% {
                      transform: scale(1.1);
                      opacity: 1;
                    }
                    80% {
                      transform: scale(0.96);
                    }
                    100% {
                      transform: scale(1);
                      opacity: 1;
                    }
                  }
                  @keyframes strokeDraw {
                    0% {
                      stroke-dashoffset: 40;
                      opacity: 0;
                    }
                    25% {
                      opacity: 1;
                    }
                    100% {
                      stroke-dashoffset: 0;
                      opacity: 1;
                    }
                  }
                  @keyframes rippleRing {
                    0% {
                      transform: scale(0.85);
                      opacity: 0.8;
                    }
                    100% {
                      transform: scale(1.5);
                      opacity: 0;
                    }
                  }
                  @keyframes softShine {
                    0%, 100% {
                      box-shadow: 0 0 18px rgba(176, 141, 87, 0.25), 0 6px 20px rgba(142, 111, 62, 0.35);
                    }
                    50% {
                      box-shadow: 0 0 32px rgba(201, 155, 83, 0.5), 0 8px 28px rgba(142, 111, 62, 0.45);
                    }
                  }
                  @keyframes sparklePop {
                    0% {
                      transform: scale(0) rotate(0deg);
                      opacity: 0;
                    }
                    50% {
                      transform: scale(1.2) rotate(45deg);
                      opacity: 1;
                    }
                    100% {
                      transform: scale(1) rotate(90deg);
                      opacity: 0.8;
                    }
                  }
                  .emblem-pop {
                    animation: emblemPop 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
                  }
                  .stroke-draw {
                    stroke-dasharray: 40;
                    stroke-dashoffset: 40;
                    animation: strokeDraw 0.65s cubic-bezier(0.65, 0, 0.45, 1) 0.35s forwards;
                  }
                  .ripple-1 {
                    animation: rippleRing 2.6s cubic-bezier(0.2, 0.8, 0.2, 1) infinite;
                  }
                  .ripple-2 {
                    animation: rippleRing 2.6s cubic-bezier(0.2, 0.8, 0.2, 1) 0.9s infinite;
                  }
                  .glow-shine {
                    animation: softShine 3s ease-in-out infinite;
                  }
                  .sparkle-pop-1 {
                    animation: sparklePop 0.8s ease-out 0.6s both;
                  }
                  .sparkle-pop-2 {
                    animation: sparklePop 0.8s ease-out 0.8s both;
                  }
                `}</style>

                {/* Outward Expanding Ripple Rings */}
                <div className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-[#B08D57]/40 ripple-1 pointer-events-none" />
                <div className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-[#B08D57]/30 ripple-2 pointer-events-none" />



                {/* Outer Halo Ring */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#B08D57]/10 flex items-center justify-center ring-6 sm:ring-8 ring-[#B08D57]/5 shadow-inner">
                  {/* Animated Pop-in Golden Circle with Glow */}
                  <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-gradient-to-tr from-[#8E6F3E] via-[#B08D57] to-[#C99B53] text-white flex items-center justify-center glow-shine emblem-pop shadow-lg cursor-pointer active:scale-95 transition-transform">
                    {/* Animated SVG Checkmark / Tick */}
                    <svg
                      className="w-10 h-10 sm:w-11 sm:h-11 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path
                        d="M5 13l4 4L19 7"
                        className="stroke-draw"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Eyebrow */}
              <div className="inline-flex items-center mb-5 gap-1.5 px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#E5E0D8] text-[9.5px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.18em] font-semibold text-[#8E6F3E] mb-2.5 sm:mb-3">

                <span> Payment Verified</span>
              </div>

              {/* Main Heading */}
              <h1 className="font-serif text-[30px] sm:text-[44px] md:text-[54px] font-normal leading-[1.08] tracking-tight text-ink mb-2 sm:mb-3">
                Thank you for your order
              </h1>

              {/* Subtitle with order details */}
              <p className="text-[13px] sm:text-[14.5px] text-stone max-w-lg leading-relaxed mb-5 sm:mb-6 px-1">
                Your order <strong className="text-ink font-semibold">#{displayOrderId}</strong> is being carefully prepared by our master jewelers. A receipt has been sent to your registered email.
              </p>

              {/* Order Meta Pills */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 text-[11px] sm:text-[12px] text-stone">
                <span className="px-3 py-1 sm:py-1.5  font-medium">
                  Order <strong className="text-ink font-semibold">#{displayOrderId}</strong>
                </span>
                <span className="px-3 py-1 sm:py-1.5  font-medium">
                  Placed on <strong className="text-ink font-semibold">{displayDate}</strong>
                </span>
                <span className="px-3 py-1 sm:py-1.5 rounded-full   text-emerald-800 font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                  <span>Paid - {money(displayTotal)}</span>
                </span>
              </div>
            </div>
          </div>

          {/* 2. ESTIMATED DELIVERY & LIVE PROGRESS TIMELINE */}
          <div className="bg-white border border-[#E5E0D8] rounded-[20px] sm:rounded-[24px] p-4 sm:p-6 md:p-7 shadow-xs mb-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 sm:pb-5 border-b border-[#E5E0D8]/70">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full  border border-emerald-200 text-emerald-800 flex items-center justify-center shrink-0">
                  <Truck className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[1.75]" />
                </div>
                <div>
                  <div className="text-[10.5px] sm:text-[11.5px] uppercase tracking-[0.14em] font-semibold text-stone">
                    Estimated Delivery Window
                  </div>
                  <div className="text-[15px] sm:text-[17px] font-serif font-medium text-ink mt-0.5">
                    Arriving by <span className="font-sans font-semibold text-emerald-950">{deliveryRange}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* 4-Stage Visual Timeline in a single continuous line */}
            <div className="pt-4 sm:pt-6 pb-2">
              <div className="grid grid-cols-4 gap-1 sm:gap-4 relative">
                {/* Connecting progress track line across all 4 stages */}
                <div className="absolute top-[16px] sm:top-[20px] left-[10%] right-[10%] h-[2px] bg-[#E5E0D8] -z-0">
                  <div className="h-full bg-gradient-to-r from-emerald-700 via-emerald-600 to-[#B08D57] w-[34%]" />
                </div>

                {/* Step 1 */}
                <div className="flex flex-col items-center text-center relative z-10 px-0.5 sm:px-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-800 text-white flex items-center justify-center shadow-xs mb-1.5 sm:mb-2 ring-4 ring-white">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                  </div>
                  <span className="text-[10px] sm:text-[12px] font-bold text-ink leading-tight">
                    Order <span className="block sm:inline">Confirmed</span>
                  </span>
                  <span className="text-[8.5px] sm:text-[10px] text-stone mt-0.5">
                    <span className="sm:hidden">Verified</span>
                    <span className="hidden sm:inline">Payment Verified</span>
                  </span>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col items-center text-center relative z-10 px-0.5 sm:px-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#FAF7F2] border-2 border-[#B08D57] text-[#B08D57] flex items-center justify-center shadow-xs mb-1.5 sm:mb-2 ring-4 ring-white">
                    <Gem className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2]" />
                  </div>
                  <span className="text-[10px] sm:text-[12px] font-bold text-ink leading-tight">
                    Hallmark <span className="block sm:inline">Check</span>
                  </span>
                  <span className="text-[8.5px] sm:text-[10px] text-[#B08D57] font-semibold mt-0.5">
                    In Progress
                  </span>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col items-center text-center relative z-10 opacity-60 px-0.5 sm:px-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#FAF7F2] border-2 border-[#D8D2C6] text-stone flex items-center justify-center mb-1.5 sm:mb-2 ring-4 ring-white">
                    <Package className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <span className="text-[10px] sm:text-[12px] font-medium text-stone leading-tight">
                    Luxury <span className="block sm:inline">Packaging</span>
                  </span>
                  <span className="text-[8.5px] sm:text-[10px] text-stone/80 mt-0.5">
                    Upcoming
                  </span>
                </div>

                {/* Step 4 */}
                <div className="flex flex-col items-center text-center relative z-10 opacity-60 px-0.5 sm:px-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#FAF7F2] border-2 border-[#D8D2C6] text-stone flex items-center justify-center mb-1.5 sm:mb-2 ring-4 ring-white">
                    <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <span className="text-[10px] sm:text-[12px] font-medium text-stone leading-tight">
                    Express <span className="block sm:inline">Delivery</span>
                  </span>
                  <span className="text-[8.5px] sm:text-[10px] text-stone/80 mt-0.5">
                    Upcoming
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. TWO-COLUMN MAIN DETAILS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-[1.25fr_1fr] gap-6 sm:gap-8 items-start">

            {/* LEFT COLUMN: Items & Shipping Details */}
            <div className="flex flex-col gap-5 sm:gap-6">





              {/* Luxury Packaging Guarantee Card */}
              <div className="bg-[#FAF7F2] border border-[#E5E0D8] rounded-[20px] sm:rounded-[24px] p-4 sm:p-5 flex items-start gap-3 sm:gap-3.5">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#B08D57]/15 text-[#8E6F3E] flex items-center justify-center shrink-0 mt-0.5">
                  <Gift className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="text-[13px] sm:text-[14px] font-semibold text-ink">
                    Complimentary Signature Packaging Included
                  </h3>
                  <p className="text-[11.5px] sm:text-[12px] text-stone mt-1 leading-relaxed">
                    Your pieces will arrive nestled in an authentic WOXLY velvet jewelry travel pouch, luxury presentation case, and tamper-evident sealed outer box.
                  </p>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Price Summary, CTAs, Concierge */}
            <div className="flex flex-col gap-5 sm:gap-6">

              {/* Order Payment Summary Card */}
              <div className="bg-white border border-[#E5E0D8] rounded-[20px] sm:rounded-[24px] p-4 sm:p-6 shadow-xs flex flex-col gap-4 sm:gap-5">




                {/* Primary Action Buttons */}
                <div className="flex flex-col gap-2.5 pt-1">
                  <Link
                    href={`/account?tab=order-details${displayOrderId ? `&id=${displayOrderId}` : ""}`}
                    className="w-full h-[46px] sm:h-[48px] rounded-full bg-ink hover:bg-gold text-white text-[11px] uppercase tracking-[0.15em] font-semibold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                  >
                    <span>Track Order in My Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <button
                    type="button"
                    onClick={handlePrintReceipt}
                    className="w-full h-[44px] sm:h-[46px] rounded-full border border-[#D5CEC2] hover:bg-sand/40 text-ink text-[11px] uppercase tracking-[0.14em] font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Printer className="w-4 h-4 text-stone" />
                    <span>Download / Print Receipt</span>
                  </button>

                  <Link
                    href="/shop"
                    className="w-full h-[44px] sm:h-[46px] rounded-full bg-[#FAF7F2] hover:bg-sand text-ink text-[11px] uppercase tracking-[0.14em] font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#E5E0D8]"
                  >
                    <ShoppingBag className="w-4 h-4 text-stone" />
                    <span>Continue Shopping</span>
                  </Link>
                </div>
              </div>

              {/* Guarantees & Support Card */}
              <div className="bg-white border border-[#E5E0D8] rounded-[20px] sm:rounded-[24px] p-4 sm:p-5 shadow-xs flex flex-col gap-3.5 sm:gap-4">
                <h3 className="text-[13px] sm:text-[14px] font-bold uppercase tracking-[0.1em] text-ink m-0">
                  The WOXLY Promise
                </h3>

                <div className="flex flex-col gap-2.5 sm:gap-3 text-[12px] sm:text-[12.5px] text-stone">
                  <div className="flex items-center gap-2.5">
                    <Award className="w-4 h-4 text-[#B08D57] shrink-0" />
                    <span>BIS Hallmarked 100% Certified Authenticity</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <RotateCcw className="w-4 h-4 text-[#B08D57] shrink-0" />
                    <span>30-Day Hassle-Free Exchanges & Returns</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-[#B08D57] shrink-0" />
                    <span>Lifetime Anti-Tarnish & Plating Guarantee</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E5E0D8]/70">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[11.5px] sm:text-[12px] font-semibold text-ink">Have questions?</p>
                      <p className="text-[10.5px] sm:text-[11px] text-stone">Concierge available 24/7</p>
                    </div>
                    <Link
                      href="/contact"
                      className="text-[10.5px] sm:text-[11px] uppercase tracking-[0.12em] font-bold text-gold hover:text-ink transition-colors flex items-center gap-1"
                    >
                      <span>Get Help</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* 4. COMPLEMENTARY RECOMMENDATIONS ("Pairs Well With Your Order") */}
          {recommendedProducts.length > 0 && (
            <div className="bg-white border border-[#E5E0D8] rounded-[18px] sm:rounded-[28px] p-3.5 sm:p-7 md:p-8 shadow-xs mt-1">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1.5 sm:gap-2 mb-3.5 sm:mb-6 pb-3 sm:pb-4 border-b border-[#E5E0D8]/70">

                <Link
                  href="/shop"
                  className="text-[10px] sm:text-[11px] uppercase tracking-[0.14em] font-semibold text-ink hover:text-gold transition-colors inline-flex items-center gap-1"
                >
                  <span>Explore all designs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-1.5 sm:gap-4 md:gap-6">
                {recommendedProducts.map((p) => (
                  <div
                    key={p.slug}
                    className="border border-[#E5E0D8] rounded-[12px] sm:rounded-[18px] p-1.5 sm:p-3.5 bg-[#FCFBF8] flex flex-col justify-between hover:shadow-md transition-all group overflow-hidden"
                  >
                    <div>
                      <div className="aspect-square rounded-[8px] sm:rounded-[12px] overflow-hidden bg-sand mb-1.5 sm:mb-3 relative border border-border/60">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <h3 className="text-[11px] sm:text-[14px] font-medium text-ink truncate mb-0.5 leading-tight">
                        <Link href={`/product/${p.slug}`} className="hover:text-gold transition-colors">
                          {p.name}
                        </Link>
                      </h3>
                      <p className="text-[9.5px] sm:text-[11.5px] text-stone truncate mb-1">
                        <span className="sm:hidden capitalize">{p.category}</span>
                        <span className="hidden sm:inline">{p.category} · {p.material}</span>
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 pt-1.5 sm:pt-3 border-t border-border/60 mt-auto">
                      <span className="text-[11px] sm:text-[13.5px] font-bold text-ink tabular-nums leading-tight">{money(p.price)}</span>
                      <button
                        type="button"
                        onClick={() => {
                          add(p.slug);
                          showAddedToBagToast(p);
                        }}
                        className="w-full sm:w-auto h-[24px] sm:h-[34px] px-1.5 sm:px-3.5 rounded-full bg-ink hover:bg-gold text-white text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1 active:scale-95 shrink-0"
                      >
                        <ShoppingBag className="w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </Shell>
  );
}
