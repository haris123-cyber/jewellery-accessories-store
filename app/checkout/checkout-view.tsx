"use client";
import { useState, useEffect, useMemo, useRef } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import GooglePay from "@/public/payments/gpay.svg";
import PhonePe from "@/public/payments/phonepe.png";
import RuPay from "@/public/payments/rupay.png";
import { toast } from "sonner";

import {
  ShieldCheck,
  Check,
  CheckCircle2,
  Home,
  Briefcase,
  MapPin,
  Truck,
  Gift,
  ChevronDown,
  ChevronRight,
  ChevronsRight,
  ArrowRight,
  ArrowLeft,
  Banknote,
  CreditCard,
  Lock,
  BookmarkCheck,
  Plus,
  Coins,
  Smartphone,
  CalendarDays,
  Award,
  RotateCcw,
} from "lucide-react";
import { getProduct, money } from "@/lib/catalog";
import { useCommerceStore } from "@/store/commerce-store";
import { OrderSummary, ProductVisual } from "@/components/shared";
import { Shell } from "@/components/layout";

export const checkoutSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  phone: z.string().min(10, "Please enter a valid 10-digit mobile number"),
  email: z.string().email("Please enter a valid email address"),
  address: z.string().min(6, "Please enter your street address"),
  postal: z.string().min(6, "Please enter a valid 6-digit PIN code"),
  city: z.string().min(2, "Please enter your city"),
  state: z.string().min(2, "Please select your state"),
  payment: z.string(),
  orderNotes: z.string().optional(),
});

export type CheckoutData = z.infer<typeof checkoutSchema>;

export type SavedAddress = {
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postal: string;
  type: "home" | "work" | "other";
  isDefault?: boolean;
};

const defaultSavedAddresses: SavedAddress[] = [
  {
    id: "addr-1",
    name: "Haris M",
    phone: "98765 43210",
    address: "24, Palm Grove Apartments, Beach Road, near Lions Park",
    city: "Kozhikode",
    state: "Kerala",
    postal: "673032",
    type: "home",
    isDefault: true,
  },
  {
    id: "addr-2",
    name: "Haris M",
    phone: "98765 43210",
    address: "Suite 402, Cyberpark Tower, Bypass Road",
    city: "Kozhikode",
    state: "Kerala",
    postal: "673016",
    type: "work",
    isDefault: false,
  },
];

const indianStates = [
  "Kerala",
  "Maharashtra",
  "Karnataka",
  "Delhi",
  "Tamil Nadu",
  "Gujarat",
  "Telangana",
  "Uttar Pradesh",
  "West Bengal",
  "Rajasthan",
  "Andhra Pradesh",
  "Madhya Pradesh",
  "Haryana",
  "Punjab",
  "Bihar",
  "Goa",
  "Assam",
  "Odisha",
  "Uttarakhand",
  "Jharkhand",
  "Himachal Pradesh",
  "Jammu and Kashmir",
];

interface SlideToPayProps {
  amount: number;
  onSuccess: () => void;
  isSubmitting?: boolean;
}

function SlideToPayButton({ amount, onSuccess, isSubmitting = false }: SlideToPayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const startXRef = useRef(0);
  const maxDragRef = useRef(0);

  const updateMaxDrag = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const knobWidth = containerWidth < 360 ? 44 : 48;
      const padding = 12;
      maxDragRef.current = Math.max(0, containerWidth - knobWidth - padding);
    }
  };

  useEffect(() => {
    updateMaxDrag();
    window.addEventListener("resize", updateMaxDrag);
    return () => window.removeEventListener("resize", updateMaxDrag);
  }, []);

  useEffect(() => {
    if (!isSubmitting && isCompleted) {
      const timer = setTimeout(() => {
        setIsCompleted(false);
        setDragX(0);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [isSubmitting, isCompleted]);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (isCompleted || isSubmitting) return;
    updateMaxDrag();
    setIsDragging(true);
    startXRef.current = e.clientX - dragX;
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch { }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || isCompleted || isSubmitting) return;
    const currentX = e.clientX - startXRef.current;
    const clamped = Math.max(0, Math.min(currentX, maxDragRef.current));
    setDragX(clamped);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging || isCompleted || isSubmitting) return;
    setIsDragging(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch { }

    const threshold = maxDragRef.current * 0.72;
    if (dragX >= threshold && maxDragRef.current > 0) {
      setDragX(maxDragRef.current);
      setIsCompleted(true);
      onSuccess();
    } else {
      setDragX(0);
    }
  };

  const handleAutoSlide = () => {
    if (isCompleted || isSubmitting || isDragging) return;
    updateMaxDrag();
    if (maxDragRef.current > 0) {
      setDragX(maxDragRef.current);
      setIsCompleted(true);
      setTimeout(() => {
        onSuccess();
      }, 250);
    }
  };

  const dragPercent = maxDragRef.current > 0 ? dragX / maxDragRef.current : 0;

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={`relative w-full h-[58px] sm:h-[62px] rounded-full bg-[#1c352c] p-1.5 select-none overflow-hidden shadow-[0_8px_25px_rgba(28,53,44,0.25)] flex items-center touch-none transition-all cursor-grab active:cursor-grabbing ${
        isDragging ? "shadow-[0_10px_30px_rgba(28,53,44,0.4)] ring-2 ring-[#c99b53]/50" : ""
      }`}
    >
      {/* Background fill track that expands as you slide */}
      <div
        className="absolute left-0 top-0 bottom-0 bg-[#26483b] rounded-full pointer-events-none"
        style={{
          width: `${dragX + 50}px`,
          transition: isDragging ? "none" : "width 0.28s cubic-bezier(0.2, 0.8, 0.2, 1)",
        }}
      />

      {/* Center Label Text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none px-12 transition-opacity duration-200"
        style={{ opacity: isCompleted || isSubmitting ? 0 : Math.max(0.1, 1 - dragPercent * 1.6) }}
      >
        <span className="font-bold tracking-[0.14em] uppercase text-[12px] sm:text-[14px] text-[#faf6ee] text-center truncate">
          SLIDE TO PAY {money(amount)}
        </span>
      </div>

      {/* Completed / Submitting state text */}
      {(isCompleted || isSubmitting) && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-12 animate-in fade-in duration-200">
          <span className="font-bold tracking-[0.14em] uppercase text-[12px] sm:text-[13px] text-[#c99b53] text-center">
            PROCESSING PAYMENT...
          </span>
        </div>
      )}

      {/* Draggable Knob */}
      <div
        style={{
          transform: `translateX(${dragX}px)`,
          transition: isDragging ? "none" : "transform 0.28s cubic-bezier(0.2, 0.8, 0.2, 1)",
        }}
        className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#c99b53] text-[#1c352c] flex items-center justify-center shadow-lg relative z-10 shrink-0 transition-colors ${
          isCompleted ? "bg-emerald-500 text-white" : "hover:bg-[#d6a95f]"
        }`}
      >
        {isCompleted || isSubmitting ? (
          <Check className="w-5 h-5 stroke-[2.5] animate-in zoom-in duration-200" />
        ) : (
          <ChevronsRight
            className={`w-5 h-5 stroke-[2.5] transition-transform ${
              isDragging ? "scale-115" : "animate-pulse"
            }`}
          />
        )}
      </div>

      {/* Click / Tap fallback trigger */}
      {!isCompleted && !isDragging && (
        <button
          type="button"
          onClick={handleAutoSlide}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          aria-label={`Slide to pay ${money(amount)}`}
          tabIndex={-1}
        />
      )}
    </div>
  );
}

export function Checkout() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState<"delivery" | "payment">("delivery");
  const [addressType, setAddressType] = useState<"home" | "work" | "other">("home");
  const [isGift, setIsGift] = useState(true);
  const [saveInfo, setSaveInfo] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);


  // Saved Addresses State & Custom Dropdown State
  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>(defaultSavedAddresses);
  const [selectedAddressId, setSelectedAddressId] = useState<string>("addr-1");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Payment UI State
  const [useLoyaltyCoins, setUseLoyaltyCoins] = useState<boolean>(false);
  const [selectedOnlineApp, setSelectedOnlineApp] = useState<"gpay" | "phonepe" | "rupay" | "rupay">("gpay");
  const [isOrderExpanded, setIsOrderExpanded] = useState<boolean>(false);

  const cart = useCommerceStore((s) => s.cart);
  const clearCart = useCommerceStore((s) => s.clearCart);
  const placeOrder = useCommerceStore((s) => s.placeOrder);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem("woxly_saved_addresses");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSavedAddresses(parsed);
        }
      }
    } catch {
      // fallback to default
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Compute dynamic delivery arrival date window (e.g., 3-5 days ahead)
  const deliveryRange = useMemo(() => {
    const start = new Date();
    start.setDate(start.getDate() + 3);
    const end = new Date();
    end.setDate(end.getDate() + 5);

    const startDay = start.getDate();
    const endDay = end.getDate();
    const month = end.toLocaleDateString("en-US", { month: "short" });

    return `${startDay} – ${endDay} ${month}`;
  }, []);

  const subtotal = cart.reduce(
    (n, l) => n + getProduct(l.slug).price * l.quantity,
    0
  );
  const discountPercent = useCommerceStore((s) => s.discountPercent);
  const promoDiscount = discountPercent > 0 ? Math.round(subtotal * (discountPercent / 100)) : 0;
  const shipping = subtotal >= 2999 ? 0 : 149;
  const originalAmount = subtotal + 500;
  const loyaltyDiscount = useLoyaltyCoins ? 100 : 0;
  const totalSavings = 500 + loyaltyDiscount + promoDiscount;
  const finalPayable = Math.max(0, subtotal + shipping - loyaltyDiscount - promoDiscount);
  const emiPerMonth = Math.round(finalPayable / 12);
  const totalPieces = cart.reduce((n, l) => n + l.quantity, 0);
  const itemsSummary = cart.map((l) => getProduct(l.slug).name).join(", ");

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CheckoutData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: "Haris M",
      phone: "98765 43210",
      email: "",
      address: "24, Palm Grove Apartments, Beach Road, near Lions Park",
      postal: "673032",
      city: "Kozhikode",
      state: "Kerala",
      payment: "upi",
      orderNotes: "",
    },
  });

  const watchedName = watch("name");
  const watchedPhone = watch("phone");
  const watchedEmail = watch("email");
  const watchedPostal = watch("postal");
  const watchedPayment = watch("payment");
  const selectedAddress = savedAddresses.find((a) => a.id === selectedAddressId);

  // Handle switching between saved addresses via dropdown
  const handleSelectAddress = (id: string) => {
    setSelectedAddressId(id);
    if (id === "new") {
      setAddressType("other");
      setValue("address", "", { shouldValidate: false });
      setValue("city", "", { shouldValidate: false });
      setValue("postal", "", { shouldValidate: false });
    } else {
      const found = savedAddresses.find((a) => a.id === id);
      if (found) {
        setAddressType(found.type);
        setValue("name", found.name, { shouldValidate: true });
        setValue("phone", found.phone, { shouldValidate: true });
        setValue("address", found.address, { shouldValidate: true });
        setValue("city", found.city, { shouldValidate: true });
        setValue("state", found.state, { shouldValidate: true });
        setValue("postal", found.postal, { shouldValidate: true });
      }
    }
  };

  // Handle clicking Home, Work, or Other pills directly
  const handlePillClick = (type: "home" | "work" | "other") => {
    setAddressType(type);
    if (type === "home") {
      const homeAddr = savedAddresses.find((a) => a.type === "home") || savedAddresses[0];
      if (homeAddr) {
        setSelectedAddressId(homeAddr.id);
        setValue("name", homeAddr.name, { shouldValidate: true });
        setValue("phone", homeAddr.phone, { shouldValidate: true });
        setValue("address", homeAddr.address, { shouldValidate: true });
        setValue("city", homeAddr.city, { shouldValidate: true });
        setValue("state", homeAddr.state, { shouldValidate: true });
        setValue("postal", homeAddr.postal, { shouldValidate: true });
      }
    } else if (type === "work") {
      const workAddr = savedAddresses.find((a) => a.type === "work") || savedAddresses[1] || savedAddresses[0];
      if (workAddr) {
        setSelectedAddressId(workAddr.id);
        setValue("name", workAddr.name, { shouldValidate: true });
        setValue("phone", workAddr.phone, { shouldValidate: true });
        setValue("address", workAddr.address, { shouldValidate: true });
        setValue("city", workAddr.city, { shouldValidate: true });
        setValue("state", workAddr.state, { shouldValidate: true });
        setValue("postal", workAddr.postal, { shouldValidate: true });
      }
    } else {
      setSelectedAddressId("new");
      setValue("address", "", { shouldValidate: false });
      setValue("city", "", { shouldValidate: false });
      setValue("postal", "", { shouldValidate: false });
    }
  };

  // Validate step 1 fields before transitioning to payment
  const handleProceedToPayment = async () => {
    const isValid = await trigger(["name", "phone", "email", "address", "postal", "city", "state"]);
    if (isValid) {
      setCurrentStep("payment");
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const handleSlideSuccess = () => {
    setIsSubmitting(true);
    handleSubmit(
      (data) => {
        onFinalSubmit(data);
      },
      (errors) => {
        setIsSubmitting(false);
        const firstErr = Object.values(errors)[0];
        if (firstErr?.message) {
          toast.error(firstErr.message as string);
        }
      }
    )();
  };

  const onFinalSubmit = (data: CheckoutData) => {
    if (saveInfo) {
      const isExisting = savedAddresses.some(
        (a) =>
          a.address.toLowerCase().trim() === data.address.toLowerCase().trim() &&
          a.postal.trim() === data.postal.trim()
      );
      if (!isExisting) {
        const newAddress: SavedAddress = {
          id: "addr-" + Date.now(),
          name: data.name,
          phone: data.phone,
          address: data.address,
          city: data.city,
          state: data.state,
          postal: data.postal,
          type: addressType,
        };
        const updated = [...savedAddresses, newAddress];
        setSavedAddresses(updated);
        try {
          localStorage.setItem("woxly_saved_addresses", JSON.stringify(updated));
        } catch { }
      }
    }

    const lines = cart.map((item) => ({
      slug: item.slug,
      quantity: item.quantity,
      price: getProduct(item.slug).price,
    }));
    const orderId = placeOrder(lines, finalPayable);
    clearCart();
    router.push(`/order-success?id=${orderId}&subtotal=${finalPayable}`);
  };

  if (!mounted) return null;

  if (cart.length === 0) {
    return (
      <Shell>
        <main className="min-h-[70vh] flex flex-col items-center justify-center bg-ivory px-6 text-center">
          <ShieldCheck className="w-[64px] h-[64px] text-stone/30 mb-6" />
          <h1 className="font-serif text-[32px] md:text-[48px] text-ink mb-4">
            Your bag is empty
          </h1>
          <p className="text-[14px] text-stone mb-8">
            You need to add some items before you can checkout.
          </p>
          <a href="/shop" className="btn-primary px-8">
            Continue Shopping
          </a>
        </main>
      </Shell>
    );
  }

  return (
    <Shell>
      <main className="min-h-screen bg-ivory px-[16px] md:px-[4vw] py-[28px] md:py-[44px]">
        <div className="mx-auto grid max-w-[1240px] grid-cols-1 lg:grid-cols-[1fr_400px] gap-[40px] lg:gap-[64px] items-start">
          {/* LEFT SIDE: Luxury Checkout Form */}
          <div className="w-full">
            {/* Top Stepper Breadcrumbs */}
            <div className="flex items-center justify-center sm:justify-start gap-2.5 sm:gap-3 text-[8px] sm:text-[12px] font-medium tracking-[0.08em] uppercase text-stone mb-6 select-none">
              <Link
                href="/cart"
                className="flex items-center gap-1.5 text-ink hover:text-gold transition-colors"
              >
                <span className="w-5 h-5 rounded-full bg-[#1b2b24] text-white flex items-center justify-center text-[10px]">
                  <Check className="w-3 h-3 stroke-[2.5]" />
                </span>
                <span className="font-bold tracking-[0.1em]">BAG</span>
              </Link>

              <div className="w-12 sm:w-10 h-[1.5px] bg-[#d8d0c2]" />

              <button
                type="button"
                onClick={() => setCurrentStep("delivery")}
                className={`flex items-center gap-1.5 transition-colors ${currentStep === "delivery"
                  ? "text-ink font-bold"
                  : "text-stone hover:text-ink"
                  }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${currentStep === "delivery"
                    ? "bg-[#1b2b24] text-white"
                    : "bg-[#1b2b24] text-white"
                    }`}
                >
                  {currentStep === "payment" ? (
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  ) : (
                    "2"
                  )}
                </span>
                <span className="tracking-[0.1em]">DELIVERY</span>
              </button>

              <div className="w-12 sm:w-10 h-[1.5px] bg-[#d8d0c2]" />

              <div
                className={`flex items-center gap-1.5 transition-colors ${currentStep === "payment"
                  ? "text-ink font-bold"
                  : "text-stone/60"
                  }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-medium ${currentStep === "payment"
                    ? "bg-[#1b2b24] text-white font-bold"
                    : "border border-stone/30 text-stone/60"
                    }`}
                >
                  3
                </span>
                <span className="tracking-[0.1em]">PAYMENT</span>
              </div>
            </div>



            <form id="checkout-form" onSubmit={handleSubmit(onFinalSubmit)}>
              {/* STEP 1: DELIVERY FORM */}
              {currentStep === "delivery" && (
                <div className="bg-white rounded-[24px] border border-[#e5dfd3] shadow-[0_6px_30px_rgba(27,26,23,0.04)] p-6 sm:p-8">
                  <div>
                    {/* Card Header */}
                    <div className="flex items-center justify-between pb-5 border-b border-[#f0eae0]">
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-full bg-[#1b2b24] text-white flex items-center justify-center text-[12px] font-bold">
                          1
                        </span>
                        <h2 className="font-serif italic text-[22px] sm:text-[24px] text-ink font-normal">
                          Delivery
                        </h2>
                      </div>

                    </div>

                    {/* CONTACT SECTION */}
                    <div className="flex items-center gap-3 mt-6 mb-5">
                      <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.16em] uppercase text-[#8c8273]">
                        CONTACT
                      </span>
                      <div className="h-[1px] flex-1 bg-[#ede6da]" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Full Name */}
                      <div>
                        <label className="block text-[12px] font-semibold text-[#453f36] mb-1.5">
                          Full name
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Haris M"
                            {...register("name")}
                            className={`w-full h-[50px] px-3.5 pr-10 rounded-xl border ${errors.name
                              ? "border-error focus:border-error"
                              : "border-[#ded6c7] focus:border-[#1b2b24]"
                              } bg-white text-ink text-[14px] outline-none transition-all placeholder:text-stone/40`}
                          />
                          {watchedName && watchedName.trim().length >= 2 && !errors.name && (
                            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-600">
                              <CheckCircle2 className="w-4 h-4 stroke-[2.2]" />
                            </span>
                          )}
                        </div>
                        {errors.name && (
                          <p className="mt-1.5 text-[11px] text-error font-medium">
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      {/* Mobile Number */}
                      <div>
                        <label className="block text-[12px] font-semibold text-[#453f36] mb-1.5">
                          Mobile number <span className="text-error">*</span>
                        </label>
                        <div
                          className={`relative flex items-center rounded-xl border ${errors.phone
                            ? "border-error focus-within:border-error"
                            : "border-[#ded6c7] focus-within:border-[#1b2b24]"
                            } bg-white transition-all overflow-hidden`}
                        >
                          <div className="flex items-center gap-1.5 pl-3.5 pr-2.5 py-3 text-[13px] font-bold text-ink border-r border-[#ebe3d6] bg-[#faf8f4] select-none">
                            <span className="text-[11px] text-[#736c61]">IN</span>
                            <span>+91</span>
                          </div>
                          <input
                            type="tel"
                            placeholder="98765 43210"
                            {...register("phone")}
                            className="flex-1 h-[50px] px-3 pr-10 bg-transparent text-ink text-[14px] outline-none placeholder:text-stone/40"
                          />
                          {watchedPhone &&
                            watchedPhone.replace(/\D/g, "").length >= 10 &&
                            !errors.phone && (
                              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-600">
                                <CheckCircle2 className="w-4 h-4 stroke-[2.2]" />
                              </span>
                            )}
                        </div>
                        {errors.phone && (
                          <p className="mt-1.5 text-[11px] text-error font-medium">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Email */}
                    <div className="mt-4">
                      <label className="block text-[12px] font-semibold text-[#453f36] mb-1.5">
                        Email (for order updates)
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          placeholder="name@example.com"
                          {...register("email")}
                          className={`w-full h-[50px] px-3.5 pr-10 rounded-xl border ${errors.email
                            ? "border-error focus:border-error"
                            : "border-[#ded6c7] focus:border-[#1b2b24]"
                            } bg-white text-ink text-[14px] outline-none transition-all placeholder:text-stone/40`}
                        />
                        {watchedEmail &&
                          watchedEmail.includes("@") &&
                          watchedEmail.includes(".") &&
                          !errors.email && (
                            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-600">
                              <CheckCircle2 className="w-4 h-4 stroke-[2.2]" />
                            </span>
                          )}
                      </div>
                      {errors.email && (
                        <p className="mt-1.5 text-[11px] text-error font-medium">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    {/* SHIPPING ADDRESS SECTION */}
                    <div className="flex items-center gap-3 mt-7 mb-5">
                      <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.16em] uppercase text-[#8c8273]">
                        SHIPPING ADDRESS
                      </span>
                      <div className="h-[1px] flex-1 bg-[#ede6da]" />
                    </div>

                    {/* Address Type Pills (Clicking Home or Work auto-fills the respective saved address) */}
                    <div className="flex items-center gap-2.5 mb-4 select-none">
                      {[
                        { id: "home", label: "Home", icon: Home },
                        { id: "work", label: "Work", icon: Briefcase },
                        { id: "other", label: "Other", icon: MapPin },
                      ].map(({ id, label, icon: Icon }) => (
                        <button
                          key={id}
                          type="button"
                          onClick={() => handlePillClick(id as "home" | "work" | "other")}
                          className={`flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium transition-all cursor-pointer ${addressType === id
                            ? "bg-[#1b2b24] text-white shadow-sm border border-[#1b2b24]"
                            : "bg-white text-[#453f36] border border-[#ded6c7] hover:border-[#1b2b24]"
                            }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          <span>{label}</span>
                        </button>
                      ))}
                    </div>



                    {/* Address Field */}
                    <div className="mb-4">
                      <label className="block text-[12px] font-semibold text-[#453f36] mb-1.5">
                        Address <span className="text-error">*</span>
                      </label>
                      <textarea
                        rows={2}
                        placeholder="24, Palm Grove Apartments, Beach Road, near Lions Park"
                        {...register("address")}
                        className={`w-full p-3.5 rounded-xl border ${errors.address
                          ? "border-error focus:border-error"
                          : "border-[#ded6c7] focus:border-[#1b2b24]"
                          } bg-white text-ink text-[14px] outline-none transition-all resize-none placeholder:text-stone/40 leading-relaxed`}
                      />
                      {errors.address && (
                        <p className="mt-1.5 text-[11px] text-error font-medium">
                          {errors.address.message}
                        </p>
                      )}
                    </div>

                    {/* Pin Code & City */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      {/* Pin Code */}
                      <div>
                        <label className="block text-[12px] font-semibold text-[#453f36] mb-1.5">
                          Pin code <span className="text-error">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            maxLength={6}
                            placeholder="673032"
                            {...register("postal")}
                            className={`w-full h-[50px] px-3.5 pr-10 rounded-xl border ${errors.postal
                              ? "border-error focus:border-error"
                              : "border-[#ded6c7] focus:border-[#1b2b24]"
                              } bg-white text-ink text-[14px] outline-none transition-all placeholder:text-stone/40`}
                          />
                          {watchedPostal &&
                            watchedPostal.replace(/\D/g, "").length === 6 &&
                            !errors.postal && (
                              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-600">
                                <CheckCircle2 className="w-4 h-4 stroke-[2.2]" />
                              </span>
                            )}
                        </div>
                        {errors.postal && (
                          <p className="mt-1.5 text-[11px] text-error font-medium">
                            {errors.postal.message}
                          </p>
                        )}
                      </div>

                      {/* City */}
                      <div>
                        <label className="block text-[12px] font-semibold text-[#453f36] mb-1.5">
                          City <span className="text-error">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Kozhikode"
                          {...register("city")}
                          className={`w-full h-[50px] px-3.5 rounded-xl border ${errors.city
                            ? "border-error focus:border-error"
                            : "border-[#ded6c7] focus:border-[#1b2b24]"
                            } bg-white text-ink text-[14px] outline-none transition-all placeholder:text-stone/40`}
                        />
                        {errors.city && (
                          <p className="mt-1.5 text-[11px] text-error font-medium">
                            {errors.city.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Delivery Estimate Alert */}
                    <div className="mb-4 flex items-center gap-2.5 text-[12px] text-[#1b5e3d] bg-[#f0f7f4] border border-[#d2e7dd] px-3.5 py-2.5 rounded-xl font-medium">
                      <Truck className="w-4 h-4 shrink-0 text-[#1b5e3d]" />
                      <span>
                        Delivers to your area · Free insured delivery · Arrives{" "}
                        <strong className="font-semibold">{deliveryRange}</strong>
                      </span>
                    </div>

                    {/* State Dropdown */}
                    <div className="mb-6">
                      <label className="block text-[12px] font-semibold text-[#453f36] mb-1.5">
                        State
                      </label>
                      <div className="relative">
                        <select
                          {...register("state")}
                          className="w-full h-[50px] px-3.5 pr-10 rounded-xl border border-[#ded6c7] bg-white text-ink text-[14px] outline-none transition-all focus:border-[#1b2b24] appearance-none cursor-pointer"
                        >
                          {indianStates.map((st) => (
                            <option key={st} value={st}>
                              {st}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-4 h-4 text-[#736c61] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                      {errors.state && (
                        <p className="mt-1.5 text-[11px] text-error font-medium">
                          {errors.state.message}
                        </p>
                      )}
                    </div>

                    {/* EXTRAS SECTION */}
                    <div className="flex items-center gap-3 mt-7 mb-5">
                      <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.16em] uppercase text-[#8c8273]">
                        EXTRAS
                      </span>
                      <div className="h-[1px] flex-1 bg-[#ede6da]" />
                    </div>

                    {/* Gift Order Toggle Card */}
                    <div className="bg-[#fbf7f0] border border-[#ebe0cc] rounded-2xl p-3.5 sm:p-4 flex items-center justify-between gap-3 sm:gap-4 mb-4">
                      <div className="flex items-start gap-2.5 sm:gap-3 min-w-0 flex-1">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#f3e6cf] flex items-center justify-center shrink-0 text-[#8e6f3e] mt-0.5">
                          <Gift className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-[13px] sm:text-[14px] font-semibold text-[#1b1a17] leading-tight">
                            This order is a gift
                          </h3>
                          <p className="text-[11px] sm:text-[12px] text-stone mt-0.5 leading-snug">
                            Prices hidden on the slip, with a handwritten note
                          </p>
                        </div>
                      </div>

                      {/* Animated Toggle Switch */}
                      <button
                        type="button"
                        role="switch"
                        aria-checked={isGift}
                        onClick={() => setIsGift(!isGift)}
                        className={`w-12 h-6 min-w-[48px] shrink-0 rounded-full transition-colors relative cursor-pointer focus:outline-none p-0.5 ${isGift ? "bg-[#1b2b24]" : "bg-[#ded6c7]"
                          }`}
                        aria-label="Toggle gift order"
                      >
                        <span
                          className={`block w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${isGift ? "translate-x-6" : "translate-x-0"
                            }`}
                        />
                      </button>
                    </div>

                    {/* Order Notes */}
                    <div className="mb-5">
                      <label className="block text-[12px] font-semibold text-[#453f36] mb-1.5">
                        Order notes
                      </label>
                      <input
                        type="text"
                        placeholder="Delivery instructions or a gift message (optional)"
                        {...register("orderNotes")}
                        className="w-full h-[50px] px-3.5 rounded-xl border border-[#ded6c7] bg-white text-ink text-[14px] outline-none transition-all focus:border-[#1b2b24] placeholder:text-stone/40"
                      />
                    </div>

                    {/* Save Address Checkbox */}
                    <label className="flex items-center gap-3 cursor-pointer select-none mb-6 group">
                      <input
                        type="checkbox"
                        checked={saveInfo}
                        onChange={(e) => setSaveInfo(e.target.checked)}
                        className="sr-only"
                      />
                      <span
                        className={`w-4 h-4 rounded-[4px] border flex items-center justify-center transition-all ${saveInfo
                          ? "bg-[#1b2b24] border-[#1b2b24] text-white"
                          : "border-[#b8af9f] bg-white group-hover:border-[#1b2b24]"
                          }`}
                      >
                        {saveInfo && <Check className="w-3 h-3 stroke-[3]" />}
                      </span>
                      <span className="text-[13px] text-[#524d44] font-medium">
                        Save this address and number for faster checkout
                      </span>
                    </label>

                    {/* Continue to Payment Button */}
                    <button
                      type="button"
                      onClick={handleProceedToPayment}
                      className="w-full h-[54px] rounded-xl bg-[#1b2b24] hover:bg-[#121f1a] text-white font-medium text-[13px] tracking-[0.14em] uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Continue to payment</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: PAYMENT METHOD (Individual Floating Cards matching User Spec) */}
              {currentStep === "payment" && (
                <div className="flex flex-col gap-3.5">
                  {/* 1. Emerald Hero Card */}
                  <div className="relative overflow-hidden sm:hidden block rounded-[24px] sm:rounded-[26px] bg-white p-6 sm:p-7 text-black shadow-[0_8px_30px_rgba(22,46,36,0.22)]">
                    {/* Concentric rings decoration in top-right */}
                    <div className="absolute -top-16 -right-16 w-52 h-52 rounded-full border border-black/10 pointer-events-none" />
                    <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full border border-black/10 pointer-events-none" />
                    <div className="absolute top-0 right-0 w-24 h-24 rounded-full border border-black/10 pointer-events-none" />

                    <div className="relative z-10">
                      <span className="block text-[11px] font-bold tracking-[0.18em] uppercase text-black">
                        AMOUNT PAYABLE
                      </span>

                      <div className="font-sans italic text-[36px] sm:text-[42px] font-normal leading-tight my-1 text-black">
                        {money(finalPayable)}
                      </div>

                      <div className="text-[12px] text-black flex items-center gap-1.5 mb-4 font-normal">
                        <span className="line-through opacity-80">{money(originalAmount)}</span>
                        <span>·</span>
                        <span>inclusive of all taxes</span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2.5">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#11241d]/90 border border-[#26483a] text-[11px] font-medium text-[#7de0a5]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>You save ₹{totalSavings}</span>
                        </div>

                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#11241d]/90 border border-[#26483a] text-[11px] font-medium text-[#7de0a5]">
                          <Truck className="w-3.5 h-3.5" />
                          <span>Arrives {deliveryRange}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2. Delivery Address Preview Card */}
                  <div className="bg-white rounded-[20px] sm:rounded-[22px] border border-[#ede5d8] p-4 sm:p-5 flex items-center justify-between shadow-[0_2px_10px_rgba(27,26,23,0.03)]">
                    <div className="flex items-center gap-3.5 min-w-0 pr-2">
                      <div className="w-10 h-10 rounded-full bg-[#f4f0e8] flex items-center justify-center text-[#453f36] shrink-0">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[13.5px] font-semibold text-ink flex items-center gap-1.5 truncate">
                          <span>{watchedName || "Haris M"}</span>
                          <span className="text-stone">·</span>
                          <span className="capitalize">{addressType}</span>
                        </div>
                        <p className="text-[12px] text-stone truncate mt-0.5 max-w-[240px] sm:max-w-md">
                          {watch("address") || "24, Palm Grove Apartments"}, {watch("city") || "Kozhikode"} {watch("postal") || "673032"}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCurrentStep("delivery")}
                      className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#453f36] hover:text-ink px-2 py-1 transition-colors cursor-pointer shrink-0"
                    >
                      EDIT
                    </button>
                  </div>

                  {/* 3. PAYMENT METHOD Header & Pay Online Card */}
                  <div className="flex items-center gap-3 mt-1 mb-1">
                    <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#8c8273]">
                      PAYMENT METHOD
                    </span>
                    <div className="h-[1px] flex-1 bg-[#ede6da]" />
                  </div>

                  <div className="relative">
                    {/* Overlapping Save Badge */}
                    <div className="absolute -top-3 right-6 z-10 pointer-events-none">
                      <span className="bg-[#b8863b] text-white text-[10px] font-bold tracking-[0.12em] uppercase px-3 py-0.5 rounded-full shadow-sm">
                        SAVE ₹{totalSavings}
                      </span>
                    </div>

                    <div
                      onClick={() => setValue("payment", "upi")}
                      className={`bg-white rounded-[22px] p-4 sm:p-5 transition-all shadow-[0_2px_12px_rgba(27,43,36,0.04)] cursor-pointer ${watchedPayment === "upi"
                        ? "border-2 border-[#1c352c]"
                        : "border border-[#ede5d8] hover:border-[#1c352c]/50"
                        }`}
                    >
                      {/* Top row */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-xl bg-[#1c352c] text-white flex items-center justify-center shrink-0 shadow-sm">
                            <Smartphone className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-[14.5px] font-semibold text-ink leading-snug">
                              Pay Online
                            </div>
                            <div className="text-[12px] text-stone mt-0.5">
                              UPI, cards, net banking or EMI
                            </div>
                          </div>
                        </div>

                        {/* Radio Indicator */}
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${watchedPayment === "upi" ? "border-[#1c352c]" : "border-[#b8af9f]"
                            }`}
                        >
                          {watchedPayment === "upi" && (
                            <div className="w-2.5 h-2.5 rounded-full bg-[#1c352c]" />
                          )}
                        </div>
                      </div>

                      {/* App Buttons Grid with Images */}
                      <div className="grid grid-cols-3 gap-2.5 sm:gap-3 mt-4">
                        {[
                          {
                            id: "gpay",
                            label: "Google Pay",
                            image: (
                              <Image
                                src={GooglePay}
                                alt="Google Pay"
                                width={54}
                                height={22}
                                className="h-5 w-auto object-contain"
                              />
                            ),
                          },
                          {
                            id: "phonepe",
                            label: "PhonePe",
                            image: (
                              <Image
                                src={PhonePe}
                                alt="PhonePe"
                                width={36}
                                height={36}
                                className="h-7 w-auto object-contain"
                              />
                            ),
                          },
                          {
                            id: "rupay",
                            label: "RuPay",
                            image: (
                              <Image
                                src={RuPay}
                                alt="RuPay"
                                width={58}
                                height={22}
                                className="h-5 w-auto object-contain"
                              />
                            ),
                          },
                        ].map((app) => {
                          const isSelected = watchedPayment === "upi" && selectedOnlineApp === app.id;
                          return (
                            <button
                              key={app.id}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setValue("payment", "upi");
                                setSelectedOnlineApp(app.id as any);
                              }}
                              className="flex flex-col items-center group cursor-pointer"
                            >
                              <div
                                className={`w-full h-[54px] rounded-2xl border transition-all flex items-center justify-center px-2.5 ${isSelected
                                  ? "border-[#1c352c] bg-[#faf8f4] shadow-sm ring-1 ring-[#1c352c]"
                                  : "border-[#ded6c7] bg-white group-hover:border-[#1c352c]/50"
                                  }`}
                              >
                                {app.image}
                              </div>
                              <span className="text-[11px] text-stone group-hover:text-ink font-medium mt-1.5 transition-colors">
                                {app.label}
                              </span>
                            </button>
                          );
                        })}
                      </div>




                    </div>
                  </div>

                  {/* 4. Cash on Delivery Card */}
                  <div
                    onClick={() => setValue("payment", "cod")}
                    className={`bg-white rounded-[22px] p-4 sm:p-5 flex items-center justify-between transition-all shadow-[0_2px_10px_rgba(27,26,23,0.02)] cursor-pointer ${watchedPayment === "cod"
                      ? "border-2 border-[#1c352c]"
                      : "border border-[#ede5d8] hover:border-[#1c352c]/50"
                      }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-xl bg-[#f4f0e8] text-[#453f36] flex items-center justify-center shrink-0">
                        <Banknote className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[14.5px] font-semibold text-ink leading-snug">
                          Cash on Delivery
                        </div>
                        <div className="text-[12px] text-stone mt-0.5">
                          Pay in cash when your order arrives
                        </div>
                      </div>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${watchedPayment === "cod" ? "border-[#1c352c]" : "border-[#b8af9f]"
                        }`}
                    >
                      {watchedPayment === "cod" && (
                        <div className="w-2.5 h-2.5 rounded-full bg-[#1c352c]" />
                      )}
                    </div>
                  </div>

                  {/* 5. Loyalty Coins Card */}
                  <div className="bg-[#faf6ee] rounded-[22px] border border-[#e8dfcf] p-3.5 sm:p-5 flex items-center justify-between gap-3 sm:gap-4 shadow-[0_2px_10px_rgba(27,26,23,0.02)]">
                    <div className="flex items-center gap-3 sm:gap-3.5 min-w-0 flex-1">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#b8863b] text-white flex items-center justify-center font-bold text-[14px] sm:text-[15px] shrink-0 shadow-sm">
                        ₹
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[13.5px] sm:text-[14px] font-semibold text-ink leading-snug">
                          Use 100 Loyalty Coins
                        </div>
                        <div className="text-[11.5px] sm:text-[12px] text-stone mt-0.5">
                          Save ₹100 · Up to 20% of order
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      role="switch"
                      aria-checked={useLoyaltyCoins}
                      onClick={() => setUseLoyaltyCoins(!useLoyaltyCoins)}
                      className={`w-12 h-6 min-w-[48px] shrink-0 rounded-full transition-colors relative cursor-pointer p-0.5 ${useLoyaltyCoins ? "bg-[#1c352c]" : "bg-[#ded6c7]"
                        }`}
                      aria-label="Toggle loyalty coins"
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${useLoyaltyCoins ? "translate-x-6" : "translate-x-0"
                          }`}
                      />
                    </button>
                  </div>

                  {/* 6. YOUR ORDER Header & Card */}
                  <div className="flex items-center gap-3 mt-1 mb-1 sm:hidden block">
                    <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#8c8273]">
                      YOUR ORDER
                    </span>
                    <div className="h-[1px] flex-1 bg-[#ede6da]" />
                  </div>

                  <div className="bg-white rounded-[22px] sm:hidden block border border-[#ede5d8] p-4 sm:p-5 shadow-[0_2px_10px_rgba(27,26,23,0.02)]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3.5 min-w-0 pr-2">
                        {/* Overlapping circular product thumbnails */}
                        <div className="flex -space-x-2.5 overflow-hidden shrink-0">
                          {cart.slice(0, 3).map((item, idx) => {
                            const p = getProduct(item.slug);
                            return (
                              <div
                                key={item.slug}
                                className="w-10 h-10 rounded-full border-2 border-white bg-sand overflow-hidden relative shadow-sm"
                                style={{ zIndex: 10 - idx }}
                              >
                                <ProductVisual cell={p.cell} name={p.name} image={p.image} />
                              </div>
                            );
                          })}
                        </div>

                        <div className="min-w-0">
                          <div className="text-[13.5px] font-semibold text-ink leading-snug">
                            {totalPieces} {totalPieces === 1 ? "piece" : "pieces"}
                          </div>
                          <p className="text-[12px] text-stone truncate mt-0.5 max-w-[200px] sm:max-w-xs">
                            {itemsSummary}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsOrderExpanded(!isOrderExpanded)}
                        className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#453f36] hover:text-ink px-2 py-1 transition-colors cursor-pointer shrink-0"
                      >
                        {isOrderExpanded ? "HIDE" : "VIEW"}
                      </button>
                    </div>

                    {/* Expanded Item list */}
                    {isOrderExpanded && (
                      <div className="mt-4 pt-4 border-t border-[#f0eae0] flex flex-col gap-3">
                        {cart.map((item) => {
                          const prod = getProduct(item.slug);
                          return (
                            <div key={item.slug} className="flex items-center justify-between text-[13px]">
                              <div className="flex items-center gap-2.5 min-w-0">
                                <span className="w-5 h-5 rounded-full bg-[#f4f0e8] text-[11px] font-semibold text-ink flex items-center justify-center shrink-0">
                                  {item.quantity}×
                                </span>
                                <span className="truncate text-ink font-medium">{prod.name}</span>
                              </div>
                              <span className="font-semibold text-ink shrink-0 ml-3">
                                {money(prod.price * item.quantity)}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* 7. Trust Badges Row */}
                  <div className="flex items-center justify-center gap-4 sm:gap-6 text-[11.5px] text-[#6b6459] font-medium py-1">

                    <div className="flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-stone" />
                      <span>BIS hallmarked</span>
                    </div>

                  </div>

                  {/* 8. Slide To Pay CTA Button */}
                  <SlideToPayButton
                    amount={finalPayable}
                    onSuccess={handleSlideSuccess}
                    isSubmitting={isSubmitting}
                  />
                </div>
              )}

              {/* Security reassurance guarantee (Only for step 1) */}
              {currentStep === "delivery" && (
                <div className="mt-5 text-center text-stone text-[12px] flex items-center justify-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 sm:mt-0 sm:ml-0 -mt-4 ml-5" />
                  <span>
                    256-bit SSL encrypted · Authentic 18K / 925 Hallmarked Guarantee
                  </span>
                </div>
              )}
            </form>
          </div>

          {/* RIGHT SIDE: Elegant Order Summary */}
          <div className="lg:sticky lg:top-[36px] hidden md:block lg:self-start flex flex-col gap-4">
            <div className="bg-white border border-[#e5dfd3] p-6 rounded-[24px] shadow-[0_6px_30px_rgba(27,26,23,0.04)]">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#f0eae0]">
                <h2 className="m-0 text-[18px] font-serif italic text-ink font-normal">
                  In your bag
                </h2>
                <span className="text-[12px] font-medium text-stone">
                  {cart.reduce((a, b) => a + b.quantity, 0)} {cart.reduce((a, b) => a + b.quantity, 0) === 1 ? "item" : "items"}
                </span>
              </div>

              <div className="flex flex-col gap-4 max-h-[320px] overflow-auto hide-scrollbar pr-1">
                {cart.map((l) => {
                  const p = getProduct(l.slug);
                  return (
                    <div
                      className="flex gap-4 pb-4 border-b border-[#f0eae0] last:border-0 last:pb-0"
                      key={l.slug}
                    >
                      <div className="w-[64px] h-[78px] bg-sand shrink-0 relative overflow-hidden rounded-xl border border-[#ede5d8]">
                        <ProductVisual
                          cell={p.cell}
                          name={p.name}
                          image={p.image}
                        />
                      </div>
                      <div className="flex flex-col justify-center flex-1 min-w-0">
                        <span className="text-[13.5px] font-semibold text-ink leading-snug line-clamp-2 mb-1">
                          {p.name}
                        </span>
                        <div className="flex justify-between items-center w-full">
                          <span className="text-[12px] text-stone">
                            Qty {l.quantity}
                          </span>
                          <span className="text-[13.5px] font-semibold text-ink tabular-nums">
                            {money(p.price * l.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Price Calculations */}
            <OrderSummary subtotal={subtotal} hideCheckoutButton />
          </div>
        </div>
      </main>
    </Shell>
  );
}
