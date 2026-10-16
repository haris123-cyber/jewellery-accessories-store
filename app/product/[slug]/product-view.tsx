"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { showAddedToBagToast, showNotificationToast } from "@/components/ui/app-toast";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlarmClock,
  ArrowDown,
  ArrowRight,
  Clock,
  Flame,
  Heart,
  Lock,
  Search,
  ShieldCheck,
  Star,
  StarHalf,
  ThumbsUp,

  ThumbsDown,
  Truck,
  Sparkles,
  UserRound,
  Minus,
  Plus,
  FileText,
  Info,
  CircleDashedCheck,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { getUnsplashImage } from "@/components/shared/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  getProduct,
  money,
  products,
} from "@/lib/catalog";
import { useCommerceStore } from "@/store/commerce-store";
import {
  ProductVisual,
  ProductSection,
  WishButton,
} from "@/components/shared";
import { Shell } from "@/components/layout";
import { DropdownMenu } from "radix-ui";
import { FaWhatsapp } from "react-icons/fa";
import { IconGardenCart } from "@tabler/icons-react";
import { ProductUpsellModal } from "@/components/product/product-upsell-modal";

const phoneNumber = "917306347297";
const defaultMessage = encodeURIComponent("Hi WOXLY, I have a query about your collection!");
const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

export function ProductPage({ slug }: { slug?: string }) {
  const router = useRouter();
  const product = getProduct(slug);
  const add = useCommerceStore((s) => s.add);
  const [material, setMaterial] = useState(0);
  const [size, setSize] = useState("6");
  const [hasPurchased, setHasPurchased] = useState(false);
  const [rating, setRating] = useState(0);
  const [isStickyVisible, setIsStickyVisible] = useState(false);
  const [pincode, setPincode] = useState("");
  const [deliveryChecked, setDeliveryChecked] = useState(false);
  const [deliveryError, setDeliveryError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedBundle, setSelectedBundle] = useState<"single" | "pack2" | "pack3">("single");
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeReviewPhotoIndex, setActiveReviewPhotoIndex] = useState<number | null>(null);
  const [isUpsellOpen, setIsUpsellOpen] = useState(false);
  const [upsellActionType, setUpsellActionType] = useState<"add-to-bag" | "buy-now">("add-to-bag");

  const isJewelleryProduct = [
    'jewelry', 'jewellery', 'rings', 'ring', 'earrings', 'earring', 'necklaces', 'necklace', 'bracelets', 'bracelet'
  ].includes(product.category.toLowerCase());

  const handleAddToBag = () => {
    add(product.slug, activeBundleQuantity);
    showAddedToBagToast(product, {
      bundleTitle:
        selectedBundle === "single"
          ? "Single"
          : selectedBundle === "pack2"
            ? "Pack of 2"
            : "Pack of 3",
      quantity: activeBundleQuantity,
    });
    if (isJewelleryProduct) {
      setUpsellActionType("add-to-bag");
      setIsUpsellOpen(true);
    }
  };

  const handleBuyNow = () => {
    add(product.slug, activeBundleQuantity);
    if (isJewelleryProduct) {
      setUpsellActionType("buy-now");
      setIsUpsellOpen(true);
    } else {
      router.push("/checkout");
    }
  };

  const pack2Price = Math.round(product.price * 2 * 0.9);
  const pack2Savings = product.price * 2 - pack2Price;
  const pack3Price = Math.round(product.price * 3 * 0.85);
  const pack3Savings = product.price * 3 - pack3Price;

  const activeBundlePrice =
    selectedBundle === "single"
      ? product.price * quantity
      : selectedBundle === "pack2"
        ? pack2Price
        : pack3Price;

  const activeBundleQuantity =
    selectedBundle === "single" ? quantity : selectedBundle === "pack2" ? 2 : 3;

  const handleCopyCode = () => {
    navigator.clipboard.writeText("WOXLY10");
    setCopiedCode(true);
    showNotificationToast({
      title: "Coupon WOXLY10 Copied!",
      description: "10% off will be applied at checkout",
      iconType: "tag",
      actionText: "APPLIED",
    });
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const reviewPhotos = [
    {
      src: product.image,
      alt: `${product.name} review photo 1`,
      reviewer: "ARPAN S.",
      date: "21/07/26",
      rating: 5,
      comment: "Stunning craftsmanship and weight. It looks even better in person than on the site.",
    },
    {
      src: getUnsplashImage(`${product.slug}-review-angle`),
      alt: `${product.name} review photo 2`,
      reviewer: "ARPAN S.",
      date: "21/07/26",
      rating: 5,
      comment: "Stunning craftsmanship and weight. It looks even better in person than on the site.",
    },
    {
      src: getUnsplashImage(`${product.slug}-review-packaging`),
      alt: `${product.name} review photo 3`,
      reviewer: "MALVIKA D.",
      date: "16/07/26",
      rating: 5,
      comment: "Ordered this as a gift and the packaging was immaculate. Premium finish and fast delivery.",
    },
  ];

  useEffect(() => {
    if (activeReviewPhotoIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveReviewPhotoIndex(null);
      } else if (e.key === "ArrowLeft") {
        setActiveReviewPhotoIndex((prev) =>
          prev !== null ? (prev > 0 ? prev - 1 : reviewPhotos.length - 1) : null
        );
      } else if (e.key === "ArrowRight") {
        setActiveReviewPhotoIndex((prev) =>
          prev !== null ? (prev < reviewPhotos.length - 1 ? prev + 1 : 0) : null
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeReviewPhotoIndex, reviewPhotos.length]);

  const handlePincodeCheck = () => {
    if (pincode.trim().length === 6) {
      setDeliveryChecked(true);
      setDeliveryError("");
      toast.success(`Delivery available to ${pincode}!`);
    } else {
      setDeliveryChecked(false);
      setDeliveryError("Please enter a valid 6-digit pincode.");
      toast.error("Please enter a valid 6-digit pincode.");
    }
  };

  const getDeliveryDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 3);
    return date.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };
  const addToBagRef = useRef<HTMLButtonElement>(null);
  const reviewsRef = useRef<HTMLElement>(null);

  const scrollToReviews = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }
    const section = reviewsRef.current || document.getElementById("reviews");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      if (typeof window !== "undefined") {
        window.history.replaceState(null, "", "#reviews");
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#reviews") {
      setTimeout(() => {
        reviewsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  }, []);

  useEffect(() => {
    if (!addToBagRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Sticky bar shows when user has scrolled down past the main Add to Bag button
        const isPastButton = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        setIsStickyVisible(isPastButton);
      },
      { threshold: 0 }
    );
    observer.observe(addToBagRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Shell>


      {/* PDP grid */}
      <main className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-[40px] md:gap-[64px] px-[16px] md:px-[24px] pb-[64px] md:pb-[120px] max-w-[1280px] mx-auto">
        {/* Image gallery */}
        <div className="flex flex-col gap-[16px] ">
          <div className="aspect-[4/5] w-full rounded-[4px] overflow-hidden relative bg-sand group">
            <WishButton
              product={product}
              className="absolute top-4 right-4 z-20 w-11 h-11 bg-ivory/90 hover:bg-ivory backdrop-blur-md border border-black/5 shadow-[0_4px_12px_rgba(0,0,0,0.08)] flex items-center justify-center rounded-full hover:scale-105 active:scale-95 transition-all"
            />

            <ProductVisual cell={product.cell} name={product.name} image={product.image} priority />
            <button className="absolute bottom-4 right-4 btn-icon bg-ivory/80 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <Search className="w-[18px] text-ink" />
            </button>
          </div>
          <div className="flex gap-[16px] overflow-x-auto snap-x pb-2 hide-scrollbar hidden sm:flex">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className={`flex-none w-[20%] aspect-square rounded-[2px] overflow-hidden bg-sand cursor-pointer snap-start border-2 transition-colors ${i === 0 ? 'border-gold' : 'border-transparent hover:border-border'}`}>
                <ProductVisual cell={(product.cell + i) % 12} name={`${product.name} view ${i}`} image={product.image} />
              </div>
            ))}
          </div>
        </div>

        {/* Product info */}
        <div className="pt-2 flex flex-col">
          <div className="mb-6    ">
            <div className="flex items-center gap-3 mb-4 justify-between flex">
              <span className="inline-block px-2 py-1 bg-gold-soft text-ink text-[11px] uppercase tracking-[0.14em] font-medium rounded-[2px]">Core Collection</span>
              {product.stock > 0 ? (
                <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] font-medium text-[#16A34A]">
                  <span className="w-2 h-2   rounded-full bg-[#16A34A] animate-pulse"></span>
                  In Stock
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] font-medium text-error">
                  <span className="w-2 h-2 rounded-full bg-error"></span>
                  Out of Stock
                </span>
              )}
            </div>
            <h1 className="text-[32px] md:text-[40px] font-serif text-ink leading-[1.1] mb-4">{product.name}</h1>

            <div className="flex flex-wrap items-center gap-4 mb-4">
              <p className="text-[24px] font-medium text-ink tabular-nums m-0">
                {money(product.price)}
              </p>
              {product.compareAtPrice && (
                <>
                  <del className="text-[16px] text-stone tabular-nums">{money(product.compareAtPrice)}</del>
                  <span className="text-[11px] font-medium text-error inline-flex items-center gap-1 bg-error/10 px-2 py-1 rounded-[2px] uppercase tracking-[0.14em]">
                    <ArrowDown className="w-[14px]" /> {Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}% Drop
                  </span>
                </>
              )}
            </div>

            {/* Urgency Stock Banner matching reference image */}
            {(product.stock ?? 5) > 0 && (
              <div className="mb-6 p-3 sm:px-4 sm:py-3 rounded-2xl bg-sand border border-[#FAD7D4] flex items-center justify-between gap-3 shadow-[0_2px_10px_rgba(155,27,48,0.03)]">
                <div className="flex items-center min-w-0">
                  {/* Bag Icon with rays and blush circle */}
                  <div className="relative shrink-0 flex items-center justify-center">
                    {/* 3 radiating accent rays at top-left */}
                    <svg
                      className="absolute -top-1 -left-1 w-4 h-4 text-[#A87938]"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                    >
                      <line x1="1" y1="11" x2="3.5" y2="10" />
                      <line x1="2" y1="5.5" x2="5" y2="7.5" />
                      <line x1="6.5" y1="1.5" x2="7.5" y2="4.5" />
                    </svg>

                    {/* Blush circular badge */}
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#FDECEB] flex items-center justify-center">
                      {/* Shopping bag with diamond */}
                      <svg
                        className="w-5 h-5 sm:w-[22px] sm:h-[22px] text-[#8B1B2A]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {/* Bag body */}
                        <path d="M5.5 8.5h13l-1.2 11.2a2 2 0 0 1-2 1.8H8.7a2 2 0 0 1-2-1.8L5.5 8.5z" />
                        {/* Bag handles */}
                        <path d="M9 8.5V6a3 3 0 0 1 6 0v2.5" />
                        {/* Diamond / Gem */}
                        <path d="M9.8 13.5h4.4l1-1.6H8.8l1 1.6z" strokeWidth="1.3" />
                        <path d="M8.8 11.9l3.2 4.5 3.2-4.5" strokeWidth="1.3" />
                        <path d="M12 11.9v4.5" strokeWidth="1.3" />
                      </svg>
                    </div>
                  </div>

                  {/* Vertical divider */}
                  <div className="h-8 sm:h-9 w-[1px] bg-[#F1D1CE] mx-3 sm:mx-3.5 shrink-0" />

                  {/* Text content */}
                  <div className="flex flex-col min-w-0">
                    <div className="text-[12.5px] sm:text-[14px] leading-tight">
                      <span className="font-bold text-[#8B1B2A] uppercase tracking-[0.03em]">
                        ONLY {product.stock || 5} LEFT
                      </span>{" "}
                      <span className="font-semibold text-ink uppercase tracking-[0.05em]">
                        IN STOCK
                      </span>
                    </div>
                    <span className="text-[11.5px] sm:text-[12.5px] text-[#78716C] leading-tight mt-1 font-normal truncate">
                      Order now before it&apos;s gone
                    </span>
                  </div>
                </div>

                {/* Hurry Up Pill Button */}
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#9E1B2D] text-white text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.06em] shrink-0 shadow-sm select-none">
                  <AlarmClock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white shrink-0" />
                  <span>HURRY UP!</span>
                </div>
              </div>
            )}



            {product.rating > 0 && (
              <a
                href="#reviews"
                id="reviews-trigger"
                onClick={scrollToReviews}
                className="inline-flex items-center gap-3 cursor-pointer group text-left no-underline text-inherit focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm transition-opacity hover:opacity-90"
                aria-label="Scroll to 128 customer reviews"
              >
                <div className="flex items-center gap-0.5 text-gold group-hover:scale-105 transition-transform origin-left">
                  <Star className="w-[14px] fill-current" />
                  <Star className="w-[14px] fill-current" />
                  <Star className="w-[14px] fill-current" />
                  <Star className="w-[14px] fill-current" />
                  <StarHalf className="w-[14px] fill-current" />
                </div>
                <span className="text-[13px] font-medium text-ink">4.7</span>
                <span className="text-[13px] text-stone underline underline-offset-4 decoration-border group-hover:decoration-gold group-hover:text-ink transition-colors">
                  (128 reviews)
                </span>
              </a>
            )}
          </div>

          <p className="text-[16px] text-stone leading-relaxed mb-8">
            An elegant everyday essential. Handcrafted with meticulous attention to detail, this piece is designed to be layered or worn as a standalone statement.
          </p>

          {/* Material selector */}
          <div className="mb-[32px]">
            <p className="text-[13px] uppercase tracking-[0.14em] font-medium text-ink mb-4">
              Material: <span className="font-normal text-stone capitalize">{material === 0 ? "18k Gold Vermeil" : material === 1 ? "Sterling Silver" : "Rose Gold"}</span>
            </p>
            <div className="flex gap-[16px]">
              {[{ c: "#E8CD89", n: "Gold" }, { c: "#E1E1E1", n: "Silver" }, { c: "#E4B8A6", n: "Rose" }].map((m, i) => (
                <button
                  key={m.n}
                  className={`relative w-[40px] h-[40px] rounded-full flex items-center justify-center transition-all ${material === i ? "border border-ink" : "border border-transparent hover:border-border"}`}
                  onClick={() => setMaterial(i)}
                  aria-label={`Material ${m.n}`}
                >
                  <span className="w-[30px] h-[30px] rounded-full block border border-black/5" style={{ background: m.c }} />
                </button>
              ))}
            </div>
          </div>

          {/* Size selector */}
          <div className="mb-[40px]">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[13px] uppercase tracking-[0.14em] font-medium text-ink"> Size</span>
              <Dialog>
                <DialogTrigger asChild>
                  <button className="text-[12px] uppercase tracking-[0.14em] font-medium text-stone underline underline-offset-4 decoration-border hover:decoration-gold hover:text-ink transition-colors">
                    Size Guide
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-serif">Ring Size Guide</DialogTitle>
                  </DialogHeader>
                  <div className="py-4">
                    <table className="w-full text-[14px] text-left border-collapse text-ink">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="py-3 px-2 font-semibold">US Size</th>
                          <th className="py-3 px-2 font-semibold">UK/AU</th>
                          <th className="py-3 px-2 font-semibold">EU</th>
                          <th className="py-3 px-2 font-semibold text-right">Circumference (mm)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-border/50">
                          <td className="py-3 px-2">5</td><td className="py-3 px-2">J 1/2</td><td className="py-3 px-2">49</td><td className="py-3 px-2 text-right">49.3</td>
                        </tr>
                        <tr className="border-b border-border/50">
                          <td className="py-3 px-2">6</td><td className="py-3 px-2">L 1/2</td><td className="py-3 px-2">52</td><td className="py-3 px-2 text-right">51.9</td>
                        </tr>
                        <tr className="border-b border-border/50">
                          <td className="py-3 px-2">7</td><td className="py-3 px-2">N 1/2</td><td className="py-3 px-2">54</td><td className="py-3 px-2 text-right">54.4</td>
                        </tr>
                        <tr className="border-b border-border/50">
                          <td className="py-3 px-2">8</td><td className="py-3 px-2">P 1/2</td><td className="py-3 px-2">57</td><td className="py-3 px-2 text-right">57.0</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-2">9</td><td className="py-3 px-2">R 1/2</td><td className="py-3 px-2">59</td><td className="py-3 px-2 text-right">59.5</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="mt-6 text-stone text-[13px] leading-relaxed">
                      <strong className="text-ink">How to measure:</strong> Wrap a piece of string or paper around the base of your finger. Mark the point where the ends meet with a pen. Measure the string or paper with a ruler (in millimeters) to get the circumference of your finger.
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex flex-wrap gap-[12px]">
              {["5", "6", "7", "8", "9"].map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`min-w-[48px] h-[48px] px-4 rounded-[2px] border flex items-center justify-center text-[15px] font-medium transition-colors ${size === s ? "border-ink bg-ink text-ivory" : "border-border text-ink hover:border-ink"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Bundle Purchase Section */}
          <div className="mb-[32px] flex flex-col gap-3.5">
            {/* Choose Your Set (Bundle Purchase) */}
            <div className="pt-2 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-[12px] uppercase tracking-[0.14em] font-semibold text-ink">
                  Choose Your Set
                </span>
                <span className="text-[11px] sm:text-[12px] text-stone font-normal">
                  Better together, less per item
                </span>
              </div>

              {/* Set Option 1: One */}
              <button
                type="button"
                onClick={() => {
                  setSelectedBundle("single");
                  setQuantity(1);
                }}
                className={`w-full relative flex items-center justify-between p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer text-left ${selectedBundle === "single"
                  ? "border-2 border-gold bg-[#FFFDF9] shadow-[0_4px_16px_rgba(27,26,23,0.06)]"
                  : "border-border/80 bg-white hover:border-ink/40"
                  }`}
              >
                {selectedBundle === "single" && (
                  <span className="absolute -top-2.5 left-4 px-2.5 py-0.5 rounded-full bg-ink text-ivory text-[9px] font-bold uppercase tracking-[0.16em] shadow-sm">
                    Choice
                  </span>
                )}

                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-[56px] h-[56px] sm:w-[60px] sm:h-[60px] rounded-xl overflow-hidden bg-sand shrink-0 relative border border-border/40">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="60px"
                    />
                  </div>

                  <div className="flex flex-col min-w-0">
                    <span className="text-[15px] sm:text-[16px] font-semibold text-ink leading-tight font-sans">
                      One
                    </span>
                    <span className="text-[12px] sm:text-[13px] text-stone font-normal mt-0.5">
                      One item
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[17px] sm:text-[19px] font-bold text-ink tabular-nums">
                    {money(product.price)}
                  </span>
                </div>
              </button>

              {/* Set Option 2: Pack of 2 */}
              <button
                type="button"
                onClick={() => {
                  setSelectedBundle("pack2");
                  setQuantity(2);
                }}
                className={`w-full relative flex items-center justify-between p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer text-left ${selectedBundle === "pack2"
                  ? "border-2 border-gold bg-[#FFFDF9] shadow-[0_4px_16px_rgba(27,26,23,0.06)]"
                  : "border-border/80 bg-white hover:border-ink/40"
                  }`}
              >
                {selectedBundle === "pack2" ? (
                  <span className="absolute -top-2.5 left-4 px-2.5 py-0.5 rounded-full bg-ink text-ivory text-[9px] font-bold uppercase tracking-[0.16em] shadow-sm">
                    Popular
                  </span>
                ) : (
                  <span className="absolute -top-2.5 left-4 px-2.5 py-0.5 rounded-full bg-emerald-700 text-white text-[9px] font-bold uppercase tracking-[0.14em] shadow-xs">
                    Save 10%
                  </span>
                )}

                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-[56px] h-[56px] sm:w-[60px] sm:h-[60px] rounded-xl overflow-hidden bg-sand shrink-0 relative border border-border/40">
                    <Image
                      src={product.image}
                      alt={`${product.name} pack of 2`}
                      fill
                      className="object-cover"
                      sizes="60px"
                    />

                  </div>

                  <div className="flex flex-col min-w-0">
                    <span className="text-[15px] sm:text-[16px] font-semibold text-ink leading-tight font-sans">
                      Pack of 2
                    </span>
                    <span className="text-[12px] sm:text-[13px] text-emerald-800 font-medium mt-0.5">
                      Save {money(pack2Savings)}
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="flex flex-col items-end">
                    <span className="text-[17px] sm:text-[19px] font-bold text-ink tabular-nums">
                      {money(pack2Price)}
                    </span>
                    <del className="text-[11px] text-stone tabular-nums">
                      {money(product.price * 2)}
                    </del>
                  </div>
                </div>
              </button>

              {/* Set Option 3: Pack of 3 */}
              <button
                type="button"
                onClick={() => {
                  setSelectedBundle("pack3");
                  setQuantity(3);
                }}
                className={`w-full relative flex items-center justify-between p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer text-left ${selectedBundle === "pack3"
                  ? "border-2 border-gold bg-[#FFFDF9] shadow-[0_4px_16px_rgba(27,26,23,0.06)]"
                  : "border-border/80 bg-white hover:border-ink/40"
                  }`}
              >
                {selectedBundle === "pack3" ? (
                  <span className="absolute -top-2.5 left-4 px-2.5 py-0.5 rounded-full bg-ink text-ivory text-[9px] font-bold uppercase tracking-[0.16em] shadow-sm">
                    Best Value
                  </span>
                ) : (
                  <span className="absolute -top-2.5 left-4 px-2.5 py-0.5 rounded-full bg-gold-deep text-white text-[9px] font-bold uppercase tracking-[0.14em] shadow-xs">
                    Save 15%
                  </span>
                )}

                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-[56px] h-[56px] sm:w-[60px] sm:h-[60px] rounded-xl overflow-hidden bg-sand shrink-0 relative border border-border/40">
                    <Image
                      src={product.image}
                      alt={`${product.name} pack of 3`}
                      fill
                      className="object-cover"
                      sizes="60px"
                    />

                  </div>

                  <div className="flex flex-col min-w-0">
                    <span className="text-[15px] sm:text-[16px] font-semibold text-ink leading-tight font-sans">
                      Pack of 3
                    </span>
                    <span className="text-[12px] sm:text-[13px] text-emerald-800 font-medium mt-0.5">
                      Save {money(pack3Savings)}
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="flex flex-col items-end">
                    <span className="text-[17px] sm:text-[19px] font-bold text-ink tabular-nums">
                      {money(pack3Price)}
                    </span>
                    <del className="text-[11px] text-stone tabular-nums">
                      {money(product.price * 3)}
                    </del>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Pincode Check */}
          <div className="mb-[32px] bg-sand/30 p-4 rounded-xl border border-border/60 transition-all">
            <label className="text-[10px] uppercase tracking-[0.14em] font-medium text-ink mb-2 block flex items-center gap-2">
              <Truck className="w-3.5 h-3.5 text-stone" />
              Check Delivery Availability
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={pincode}
                onChange={(e) => {
                  setPincode(e.target.value.replace(/\D/g, "").slice(0, 6));
                  if (deliveryError) setDeliveryError("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handlePincodeCheck();
                  }
                }}
                placeholder="Enter 6-digit pincode"
                className={`flex-1 h-[46px] border bg-white rounded-[4px] px-4 text-[14px] outline-none transition-colors ${deliveryError ? "border-red-400 focus:border-red-600" : "border-border focus:border-ink"
                  }`}
              />
              <button
                type="button"
                className="btn-secondary h-[46px] px-6 text-[11px] uppercase tracking-[0.12em] font-medium whitespace-nowrap bg-white border border-border hover:border-ink transition-colors"
                onClick={handlePincodeCheck}
              >
                Check
              </button>
            </div>

            {/* Error Message */}
            {deliveryError && (
              <p className="text-[12px] text-red-600 mt-2 font-medium flex items-center gap-1.5">
                {deliveryError}
              </p>
            )}

            {/* Delivery Details shown below section when checked */}
            {deliveryChecked ? (
              <div className="mt-4 pt-3.5 border-t border-border/60 space-y-2.5 animate-in fade-in duration-300">
                <div className="flex items-center justify-between text-emerald-800  py-2 rounded-[4px]">
                  <div className="flex items-center gap-2 text-[12px] font-medium">
                    <CircleDashedCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Delivery available to <strong className="font-semibold text-emerald-950">{pincode}</strong></span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setDeliveryChecked(false);
                      setPincode("");
                    }}
                    className="text-[11px] text-emerald-900/70 hover:text-emerald-950 underline uppercase tracking-wider font-semibold ml-2"
                  >
                    Change
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[12px]">
                  <div className="flex items-center gap-2 text-ink">
                    <Truck className="w-3.5 h-3.5 text-stone shrink-0" />
                    <span>Est. Delivery by <strong className="font-medium text-ink">{getDeliveryDate()}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-ink">
                    <ShieldCheck className="w-3.5 h-3.5 text-stone shrink-0" />
                    <span>Free Express Shipping</span>
                  </div>
                  <div className="flex items-center gap-2 text-ink">
                    <Clock className="w-3.5 h-3.5 text-stone shrink-0" />
                    <span>Dispatched in 24 hours</span>
                  </div>
                  <div className="flex items-center gap-2 text-ink">
                    <Sparkles className="w-3.5 h-3.5 text-gold shrink-0" />
                    <span>Cash on Delivery (COD) available</span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-[12px] text-stone mt-2.5 flex items-center gap-1.5">
                <Truck className="w-[14px]" /> Usually dispatches in 24 hours.
              </p>
            )}
          </div>

          {/* Quantity Selector & Subtotal */}
          <div className="mb-[24px]">
            <label className="text-[11px] uppercase tracking-[0.14em] font-semibold text-ink mb-2.5 block">
              Quantity
            </label>
            <div className="flex items-center justify-between gap-4">
              {/* Stepper */}
              <div className="inline-flex items-center justify-between w-[124px] sm:w-[130px] h-[46px] border border-border/80 bg-white rounded-lg px-2 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1 || !product.stock}
                  className="w-8 h-8 flex items-center justify-center text-ink/75 hover:text-ink disabled:opacity-25 transition-colors cursor-pointer disabled:cursor-not-allowed"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5 stroke-[2.2]" />
                </button>
                <span className="text-[15px] font-semibold text-ink tabular-nums select-none min-w-[20px] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(product.stock || 10, q + 1))}
                  disabled={quantity >= (product.stock || 10) || !product.stock}
                  className="w-8 h-8 flex items-center justify-center text-ink/75 hover:text-ink disabled:opacity-25 transition-colors cursor-pointer disabled:cursor-not-allowed"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[2.2]" />
                </button>
              </div>

              {/* Stock Alert & Dynamic Subtotal */}
              <div className="text-right">
                <p className="text-[11px] sm:text-[12px] font-semibold text-[#b91c1c] leading-tight mb-1">
                  Only {product.stock || 5} in stock
                </p>
                <p className="text-[14px] text-ink">
                  Subtotal <span className="font-semibold">{money(activeBundlePrice)}</span>
                  {selectedBundle !== "single" && (
                    <span className="text-emerald-700 text-[11px] font-medium block">
                      Saved {money(selectedBundle === "pack2" ? pack2Savings : pack3Savings)}
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-[12px] mb-[40px]">
            <div className="flex gap-[16px]">
              <button
                ref={addToBagRef}
                className="btn-secondary flex-1 h-[54px] text-[13px] border border-ink"
                onClick={handleAddToBag}
                disabled={!product.stock}
              >
                {product.stock ? "Add to Bag" : "Out of Stock"}
              </button>
              {/* WhatsApp Action Button */}
              <a
                href={`https://wa.me/917306347297?text=${encodeURIComponent(
                  `Hi WOXLY, I have a query about ${product.name} (${selectedBundle === "single" ? "Single" : selectedBundle === "pack2" ? "Pack of 2" : "Pack of 3"} - ${money(activeBundlePrice)}).`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with WOXLY on WhatsApp"
                title="Chat with us on WhatsApp"
                className="w-[54px] h-[54px] border border-border rounded-[2px] flex items-center justify-center bg-pearl hover:border-green-500 hover:bg-stone-50 transition-colors shrink-0"
              >
                <FaWhatsapp className="w-6 h-6 text-[green]" />
              </a>
            </div>
            <button
              className="btn-primary w-full h-[54px] text-[13px]"
              onClick={handleBuyNow}
              disabled={!product.stock}
            >
              Buy It Now
            </button>
          </div>
          {/* Offer Tickets */}
          {['jewelry', 'rings', 'ring', 'earrings', 'earring', 'necklaces', 'necklace'].includes(product.category.toLowerCase()) && (
            <div className="flex flex-col gap-3.5 mb-6">
              {/* Ticket 1: Online Payment Offer */}
              <div className="w-full rounded-[16px] overflow-hidden border border-[#BF9F71] shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex items-stretch min-h-[66px] sm:min-h-[72px]">
                {/* Left: Gold Metallic Section */}
                <div className="flex-1 bg-[linear-gradient(180deg,#E5D4B6_0%,#F8EFE1_48%,#DFCCAA_100%)] p-[4px] flex min-w-0">
                  <div className="w-full h-full border border-[#9E8152]/30 rounded-[12px] px-4 py-2.5 sm:px-6 sm:py-3 flex flex-col justify-center">
                    <span className="text-[10.5px] sm:text-[11px] font-bold uppercase tracking-[0.16em] text-[#1A1A1A] leading-tight font-sans">
                      ONLINE PAYMENT OFFER
                    </span>
                    <span className="text-[12.5px] sm:text-[13px] font-semibold uppercase tracking-[0.04em] text-[#1A1A1A] mt-1 leading-tight font-sans">
                      PAY ONLINE AND SAVE 10
                    </span>
                  </div>
                </div>

                {/* Right: Navy Section */}
                <div className="w-[115px] sm:w-[140px] shrink-0 bg-[#162030] p-[4px] flex">
                  <div className="w-full h-full border border-[#D0BA8C]/40 rounded-[12px] flex items-center justify-center px-3 py-2.5">
                    <span className="text-[#E0CDA7] tracking-wide whitespace-nowrap text-[21px] sm:text-[23px] flex items-baseline">
                      <span className="font-sans font-light mr-0.5 text-[20px] sm:text-[22px]">₹</span>
                      <span className="font-serif">10 off</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Ticket 2: First Order (Style 2 - Regal Emerald & Gold Octagon) */}
              <div className="w-full rounded-[4px] bg-[#0E2822] border border-[#163B32] p-3 sm:p-3.5 flex items-center gap-4 sm:gap-5 shadow-[0_2px_10px_rgba(0,0,0,0.06)] min-h-[68px] sm:min-h-[74px] relative overflow-hidden">
                {/* Inset Decorative Certificate Border with Scalloped / Notched Corners */}
                <div className="absolute inset-[4px] border border-[#C5A87D]/40 pointer-events-none rounded-[1px]">
                  {/* Concave Notched Corners */}
                  <span className="absolute -top-[1px] -left-[1px] w-[9px] h-[9px] bg-[#0E2822] border-r border-b border-[#C5A87D]/40 rounded-br-full" />
                  <span className="absolute -top-[1px] -right-[1px] w-[9px] h-[9px] bg-[#0E2822] border-l border-b border-[#C5A87D]/40 rounded-bl-full" />
                  <span className="absolute -bottom-[1px] -left-[1px] w-[9px] h-[9px] bg-[#0E2822] border-r border-t border-[#C5A87D]/40 rounded-tr-full" />
                  <span className="absolute -bottom-[1px] -right-[1px] w-[9px] h-[9px] bg-[#0E2822] border-l border-t border-[#C5A87D]/40 rounded-tl-full" />
                </div>

                {/* Left: Metallic Gold Octagon Medallion Badge */}
                <div className="relative w-[52px] h-[52px] sm:w-[58px] sm:h-[58px] shrink-0 flex items-center justify-center z-10 ml-1">
                  <svg viewBox="0 0 60 60" className="w-full h-full drop-shadow-sm">
                    <defs>
                      <linearGradient id="emeraldTicketOctagon" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#F9EED7" />
                        <stop offset="35%" stopColor="#E2CA99" />
                        <stop offset="70%" stopColor="#C49E5D" />
                        <stop offset="100%" stopColor="#9E7635" />
                      </linearGradient>
                    </defs>
                    <polygon
                      points="17.57,2 42.43,2 58,17.57 58,42.43 42.43,58 17.57,58 2,42.43 2,17.57"
                      fill="url(#emeraldTicketOctagon)"
                      stroke="#F4E6C8"
                      strokeWidth="1.2"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center leading-none pointer-events-none">
                    <span className="font-serif text-[18px] sm:text-[20px] font-bold text-[#141A18] leading-none mb-0.5">
                      10%
                    </span>
                    <span className="text-[9px] sm:text-[9.5px] font-sans font-extrabold uppercase tracking-[0.16em] text-[#141A18] leading-none">
                      OFF
                    </span>
                  </div>
                </div>

                {/* Right: Content */}
                <div className="flex flex-col justify-center min-w-0 z-10">
                  <span className="font-serif text-[18px] sm:text-[21px] font-normal uppercase tracking-[0.16em] text-[#DEC18C] leading-tight">
                    FIRST ORDER
                  </span>
                  <div className="text-[12.5px] sm:text-[13.5px] text-[#EDE8DF] mt-1 flex items-center gap-1.5 flex-wrap font-sans">
                    <span>10% offer Code</span>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard?.writeText("SINS10");
                        showNotificationToast({
                          title: "Coupon SINS10 Copied!",
                          description: "10% off will be applied at checkout",
                          iconType: "tag",
                          actionText: "APPLIED",
                        });
                      }}
                      className="font-bold text-[#DEC18C] underline underline-offset-4 decoration-[#DEC18C] decoration-[1.5px] hover:text-white transition-colors cursor-pointer"
                      title="Click to copy code"
                    >
                      SINS10
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Features */}
          <div className="grid grid-cols-3 md:grid-cols-3 gap-[12px] mb-[48px]">
            {[
              { icon: <ShieldCheck className="w-[18px]" />, label: "2-Year Warranty" },
              { icon: <Sparkles className="w-[18px]" />, label: "Anti-Tarnish" },
              { icon: <Truck className="w-[18px]" />, label: "Free Shipping > ₹2999" },
            ].map(({ icon, label }) => (
              <div key={label} className="bg-sand rounded-[2px] p-[16px] flex flex-col items-center justify-center text-center gap-2">
                <span className="text-ink">{icon}</span>
                <span className="text-[9px] uppercase tracking-[0.14em] font-medium text-ink">{label}</span>
              </div>
            ))}
          </div>

          {/* Delivery & Returns Info */}
          {/* Accordion */}
          <Accordion type="multiple" defaultValue={["description"]} className="w-full px-5 pl-2">
            {/* Description Tab */}
            <AccordionItem value="description" className="border-border ">
              <AccordionTrigger className="text-[13px] uppercase tracking-[0.14em] font-sans text-ink hover:text-gold hover:no-underline py-5">
                <span className="flex items-center gap-2.5">
                  <FileText className="w-[18px] h-[18px] text-stone group-hover:text-gold transition-colors" />
                  <span>Description</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-[12px] text-stone leading-relaxed pb-5">
                <p className="mb-6 font-medium">{product.description || "A refined piece meant for everyday wear. Expertly crafted for durability and timeless appeal."}</p>
                <div className="border border-border rounded-[2px] overflow-hidden">
                  <table className="w-full text-[13px] text-left">
                    <tbody>
                      <tr className="border-b border-border">
                        <th className="py-3 px-4 font-medium bg-sand/30 w-1/3 text-ink">Category</th>
                        <td className="py-3 px-4 capitalize">{product.category}</td>
                      </tr>
                      <tr className="border-b border-border">
                        <th className="py-3 px-4 font-medium bg-sand/30 w-1/3 text-ink">Material</th>
                        <td className="py-3 px-4">{product.material || "18k Gold Vermeil"}</td>
                      </tr>
                      <tr className="border-b border-border">
                        <th className="py-3 px-4 font-medium bg-sand/30 w-1/3 text-ink">Weight</th>
                        <td className="py-3 px-4">Approx. 4.5g</td>
                      </tr>
                      <tr>
                        <th className="py-3 px-4 font-medium bg-sand/30 w-1/3 text-ink">Dimensions</th>
                        <td className="py-3 px-4">15mm x 12mm pendant</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Shipping, Returns & Care Tab */}
            <AccordionItem value="shipping-returns" className="border-border">
              <AccordionTrigger className="text-[13px] uppercase tracking-[0.14em] font-sans text-ink hover:text-gold hover:no-underline py-5">
                <span className="flex items-center gap-2.5">
                  <Info className="w-[18px] h-[18px] text-stone group-hover:text-gold transition-colors" />
                  <span>Product Info</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-[11px] text-stone  font-medium leading-relaxed pb-5 space-y-6">
                <div>
                  <h4 className="font-sans text-ink mb-1.5 text-[11px] uppercase tracking-[0.1em]">Shipping</h4>
                  <p>Complimentary shipping on orders over ₹2,999. Dispatches in 1–2 business days via express courier.</p>
                </div>
                <div>
                  <h4 className="font-sans text-ink mb-1.5 text-[11px] uppercase tracking-[0.1em]">Returns</h4>
                  <p>We accept returns within 14 days of delivery. Items must be unworn and in original packaging.</p>
                </div>
                <div>
                  <h4 className="font-sans text-ink mb-1.5 text-[11px] uppercase tracking-[0.1em]">Care</h4>
                  <p>To maintain the shine, remove before showering, swimming, or exercising. Store in the provided WOXLY pouch.</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </main>

      {/* Reviews Section */}
      <section
        id="reviews"
        ref={reviewsRef}
        className="bg-[#F9F9F9] border-y border-border px-5 py-[24px] md:py-[96px] scroll-mt-20 md:scroll-mt-24"
      >
        <div className="max-w-[1280px] mx-auto px-[16px] md:px-[24px]">
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-[48px] lg:gap-[96px]">
            {/* Left Column: Summary */}
            <div className="flex flex-col">
              <h2 className="text-[28px] font-serif text-ink mb-4">Customer Reviews</h2>

              <div className="flex items-center gap-4 mb-1">
                <div className="flex items-center gap-1 text-[#D4AF37]">
                  <Star className="w-[18px] fill-current" />
                  <Star className="w-[18px] fill-current" />
                  <Star className="w-[18px] fill-current" />
                  <Star className="w-[18px] fill-current" />
                  <StarHalf className="w-[18px] fill-current" />
                </div>
                <span className="text-[24px] font-serif text-ink">4.7</span>
              </div>

              <div className="text-[11px] uppercase tracking-[0.14em] text-stone font-medium mb-10">
                Based on 128 reviews
              </div>

              <div className="space-y-[1px] text-[12px] text-stone font-medium mb-10">
                {[
                  { s: 5, p: 82, c: 105 },
                  { s: 4, p: 12, c: 15 },
                  { s: 3, p: 4, c: 5 },
                  { s: 2, p: 1, c: 2 },
                  { s: 1, p: 1, c: 1 },
                ].map((row) => (
                  <div key={row.s} className="flex items-center gap-[8px]">
                    <span className="w-2">{row.s}</span>
                    <Star className="w-[12px] text-[#D4AF37] fill-current" />
                    <div className="flex-1 h-[4px] bg-[#E5E5E5] rounded-full overflow-hidden">
                      <div className="h-full bg-[#D4AF37]" style={{ width: `${row.p}%` }} />
                    </div>
                    <span className="w-6 text-right tabular-nums">{row.c}</span>
                  </div>
                ))}
              </div>




            </div>

            {/* Right Column: Reviews */}
            <div className="flex flex-col">
              <div className="flex flex-col border-t border-border -mt-10">
                {/* Review 1 */}
                <div className="py-5 border-b border-border flex flex-col">

                  <div className="flex justify-between items-start mb-2.5">
                    <div className="flex items-start gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-sand/60 border border-border/70 flex items-center justify-center shrink-0">
                        <UserRound className="w-4 h-4 text-stone" />
                      </div>

                      <div className="flex flex-col items-start gap-1.5">
                        <span className="font-serif text-[15px] md:text-[16px] text-ink font-medium">
                          ARPAN S.
                        </span>

                        <span className="inline-flex items-center gap-1 text-[8px] font-medium text-emerald-800   rounded-full uppercase tracking-wider">
                          <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
                          Verified Buyer
                        </span>
                      </div>
                    </div>

                    <span className="text-[12px] text-stone shrink-0">
                      21/07/26
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-[#D4AF37] mb-2 sm:ml-10">
                    <Star className="w-[14px] fill-current" />
                    <Star className="w-[14px] fill-current" />
                    <Star className="w-[14px] fill-current" />
                    <Star className="w-[14px] fill-current" />
                    <Star className="w-[14px] fill-current" />
                  </div>
                  <p className="text-[13px] text-ink/80 mb-3 sm:ml-10">
                    Stunning craftsmanship and weight. It looks even better in person than on the site.
                  </p>

                  <div className="flex gap-2.5 mb-4 sm:ml-10">
                    <button
                      type="button"
                      onClick={() => setActiveReviewPhotoIndex(0)}
                      className="w-[64px] h-[64px] relative bg-sand overflow-hidden rounded-[3px] border border-border/70 hover:border-gold hover:shadow-md transition-all cursor-pointer group focus:outline-none focus:ring-1 focus:ring-gold"
                      aria-label="Enlarge review photo 1 by ARPAN S."
                    >
                      <Image
                        src={reviewPhotos[0].src}
                        alt={reviewPhotos[0].alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="64px"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                        <Search className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 drop-shadow transition-opacity" />
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveReviewPhotoIndex(1)}
                      className="w-[64px] h-[64px] relative bg-sand overflow-hidden rounded-[3px] border border-border/70 hover:border-gold hover:shadow-md transition-all cursor-pointer group focus:outline-none focus:ring-1 focus:ring-gold"
                      aria-label="Enlarge review photo 2 by ARPAN S."
                    >
                      <Image
                        src={reviewPhotos[1].src}
                        alt={reviewPhotos[1].alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="64px"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                        <Search className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 drop-shadow transition-opacity" />
                      </div>
                    </button>
                  </div>

                  <div className="flex items-center gap-3 text-[12px] text-stone mt-auto sm:ml-10">
                    <span>Was this review helpful?</span>
                    <button className="flex items-center gap-1 hover:text-ink transition-colors"><ThumbsUp className="w-[14px]" /> 3</button>
                    <button className="flex items-center gap-1 hover:text-ink transition-colors"><ThumbsDown className="w-[14px]" /> 1</button>
                  </div>
                </div>

                {/* Review 2 */}
                <div className="py-5 border-b border-border flex flex-col">
                  <div className="flex justify-between items-start mb-2.5">
                    <div className="flex items-start gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-sand/60 border border-border/70 flex items-center justify-center shrink-0">
                        <UserRound className="w-4 h-4 text-stone" />
                      </div>

                      <div className="flex flex-col items-start gap-1.5">
                        <span className="font-serif text-[15px] md:text-[16px] text-ink font-medium">
                          MALVIKA D.
                        </span>

                        <span className="inline-flex items-center gap-1 text-[8px] font-medium text-emerald-800  rounded-full uppercase tracking-wider">
                          <ShieldCheck className="w-3 h-3   text-emerald-600 shrink-0" />
                          Verified Buyer
                        </span>
                      </div>
                    </div>

                    <span className="text-[12px] text-stone shrink-0">
                      16/07/26
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[#D4AF37] mb-2 sm:ml-10">
                    <Star className="w-[14px] fill-current" />
                    <Star className="w-[14px] fill-current" />
                    <Star className="w-[14px] fill-current" />
                    <Star className="w-[14px] fill-current" />
                    <Star className="w-[14px] fill-current" />
                  </div>
                  <p className="text-[13px] text-ink/80 mb-3 sm:ml-10">
                    Ordered this as a gift and the packaging was immaculate. Premium finish and fast delivery.
                  </p>

                  <div className="flex gap-2.5 mb-4 sm:ml-10">
                    <button
                      type="button"
                      onClick={() => setActiveReviewPhotoIndex(2)}
                      className="w-[64px] h-[64px] relative bg-sand overflow-hidden rounded-[3px] border border-border/70 hover:border-gold hover:shadow-md transition-all cursor-pointer group focus:outline-none focus:ring-1 focus:ring-gold"
                      aria-label="Enlarge review photo 3 by MALVIKA D."
                    >
                      <Image
                        src={reviewPhotos[2].src}
                        alt={reviewPhotos[2].alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="64px"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                        <Search className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 drop-shadow transition-opacity" />
                      </div>
                    </button>
                  </div>

                  <div className="flex items-center gap-3 text-[12px] text-stone mt-auto sm:ml-10">
                    <span>Was this review helpful?</span>
                    <button className="flex items-center gap-1 hover:text-ink transition-colors"><ThumbsUp className="w-[14px]" /> 5</button>
                    <button className="flex items-center gap-1 hover:text-ink transition-colors"><ThumbsDown className="w-[14px]" /> 0</button>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>







      <ProductSection
        title="Curated pairings"
        items={products
          .filter(
            (p) => p.category === product.category && p.slug !== product.slug,
          )
          .slice(0, 4)}
      />

      {/* Promotional Banner */}
      <section className="relative w-full h-[50vh] min-h-[400px] bg-sand overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-2xl text-white">
          <h2 className="text-[32px] md:text-[48px] font-serif mb-4 leading-tight capitalize text-white">
            Discover More {product.category}
          </h2>
          <p className="text-[14px] md:text-[16px] mb-8 font-medium text-white/90">
            Explore our curated collection of fine {product.category}, designed for everyday elegance.
          </p>
          <a href={`/category/${product.category}`} className="inline-block border border-white text-white bg-transparent px-8 py-3 text-[12px] uppercase tracking-[0.14em] hover:bg-white hover:text-ink transition-colors font-medium">
            Shop the Collection
          </a>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-[64px] md:py-[96px] max-w-[800px] mx-auto px-10 md:px-[24px]">
        <h2 className="text-[28px] md:text-[32px] font-serif text-ink text-center mb-10 tracking-wide">FAQS</h2>
        <Accordion type="single" collapsible className="w-full border-t  border-border/60">
          {[
            {
              q: "How to handle or take care of the product?",
              a: "To maintain the shine of your jewellery, avoid contact with perfumes, lotions, and harsh chemicals. Remove it before swimming, exercising, or showering. Store it in a cool, dry place, ideally in the provided WOXLY pouch or a lined jewellery box.",
            },
            {
              q: "Can I return my order?",
              a: "Yes, we accept returns within 14 days of delivery. Please ensure the item is unworn, in its original condition, and returned with all original packaging and tags attached.",
            },
            {
              q: "What material is the jewellery made of?",
              a: "Our pieces are crafted using high-quality materials including 18k gold vermeil over a solid sterling silver base, ensuring durability and a premium finish. Specific materials for this piece can be found in the Description tab.",
            },
            {
              q: "How do I choose the correct size?",
              a: "You can use our Size Guide provided near the Add to Bag button. It includes detailed instructions on how to measure your finger circumference or diameter to find the perfect fit.",
            },
          ].map((faq, index) => (
            <AccordionItem key={index} value={`faq-${index}`} className="border-border/60">
              <AccordionTrigger className="text-[15px] font-medium text-ink hover:text-gold hover:no-underline py-5 text-left">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-[14px] text-stone leading-relaxed pb-6">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>



      {/* Sticky Add to Bag Bar */}
      <AnimatePresence>
        {isStickyVisible && (
          <motion.div
            key="sticky-add-to-bag"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{
              y: { duration: 0.32, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.22, ease: "easeInOut" },
            }}
            className="fixed bottom-0 left-0 right-0 bg-[#FFFDF9]/95 backdrop-blur-md border-t border-border/80 px-4 py-3 sm:px-8 sm:py-3.5 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]"
          >
            <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-3 sm:gap-6">
              {/* Price & Quantity summary */}
              <div className="flex flex-col justify-center min-w-0">
                <span className="text-[11px] sm:text-[12px] text-stone leading-tight font-normal">
                  {selectedBundle === "single"
                    ? quantity === 1
                      ? "1 item"
                      : `${quantity} items`
                    : selectedBundle === "pack2"
                      ? "Pack of 2"
                      : "Pack of 3"}
                </span>
                <span className="text-[17px] sm:text-[20px] font-bold text-ink leading-tight tabular-nums">
                  {money(activeBundlePrice)}
                </span>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                <button
                  type="button"
                  className="h-[46px] px-4 sm:px-7 rounded-[8px] border border-ink bg-white hover:bg-stone-50 text-ink text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.12em] transition-all disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer active:scale-95"
                  onClick={handleAddToBag}
                  disabled={!product.stock}
                >
                  {product.stock ? "ADD TO BAG" : "OUT OF STOCK"}
                </button>
                <button
                  type="button"
                  className="h-[46px] px-4 sm:px-7 rounded-[8px] bg-ink hover:bg-stone-900 text-ivory text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.12em] transition-all disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer active:scale-95 shadow-sm"
                  onClick={handleBuyNow}
                  disabled={!product.stock}
                >
                  BUY NOW
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Review Photo Lightbox Modal */}
      {activeReviewPhotoIndex !== null && reviewPhotos[activeReviewPhotoIndex] && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setActiveReviewPhotoIndex(null)}
        >
          {/* Close button */}
          <button
            type="button"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer z-20"
            onClick={(e) => {
              e.stopPropagation();
              setActiveReviewPhotoIndex(null);
            }}
            aria-label="Close photo preview"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Prev button */}
          {reviewPhotos.length > 1 && (
            <button
              type="button"
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer z-20"
              onClick={(e) => {
                e.stopPropagation();
                setActiveReviewPhotoIndex((prev) =>
                  prev !== null ? (prev > 0 ? prev - 1 : reviewPhotos.length - 1) : 0
                );
              }}
              aria-label="Previous review photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Next button */}
          {reviewPhotos.length > 1 && (
            <button
              type="button"
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer z-20"
              onClick={(e) => {
                e.stopPropagation();
                setActiveReviewPhotoIndex((prev) =>
                  prev !== null ? (prev < reviewPhotos.length - 1 ? prev + 1 : 0) : 0
                );
              }}
              aria-label="Next review photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Modal Content */}
          <div
            className="relative max-w-[560px] w-full bg-[#181715] rounded-xl overflow-hidden border border-white/10 shadow-2xl flex flex-col animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Enlarged Image */}
            <div className="relative aspect-square w-full bg-black/60 overflow-hidden">
              <Image
                src={reviewPhotos[activeReviewPhotoIndex].src}
                alt={reviewPhotos[activeReviewPhotoIndex].alt}
                fill
                className="object-contain"
                sizes="(max-width: 640px) 95vw, 560px"
                priority
              />
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-medium text-white/90">
                {activeReviewPhotoIndex + 1} / {reviewPhotos.length}
              </div>
            </div>

            {/* Review Info Card */}
            <div className="p-4 sm:p-5 bg-[#1f1e1a] text-ivory flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-[15px] font-medium text-white">
                    {reviewPhotos[activeReviewPhotoIndex].reviewer}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[9px] font-medium text-emerald-400 bg-emerald-950/70 border border-emerald-500/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    <ShieldCheck className="w-2.5 h-2.5" /> Verified Buyer
                  </span>
                </div>
                <span className="text-[12px] text-white/50">
                  {reviewPhotos[activeReviewPhotoIndex].date}
                </span>
              </div>

              <div className="flex items-center gap-1 text-[#D4AF37]">
                {Array.from({ length: reviewPhotos[activeReviewPhotoIndex].rating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>

              <p className="text-[13px] text-white/80 leading-relaxed font-sans">
                &ldquo;{reviewPhotos[activeReviewPhotoIndex].comment}&rdquo;
              </p>
            </div>
          </div>
        </div>
      )}
      {/* Upsell Recommendations Modal */}
      <ProductUpsellModal
        isOpen={isUpsellOpen}
        onClose={() => setIsUpsellOpen(false)}
        mainProduct={product}
        actionType={upsellActionType}
        mainQuantity={activeBundleQuantity}
        mainSelectedBundle={selectedBundle}
        onProceedCheckout={() => router.push("/checkout")}
      />
    </Shell>
  );
}
