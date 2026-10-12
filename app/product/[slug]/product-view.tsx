"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  ArrowDown,
  ArrowRight,
  CircleCheck,
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
} from "lucide-react";
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

  useEffect(() => {
    if (!addToBagRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsStickyVisible(!entry.isIntersecting);
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

            {/* Hurry Up / Selling Fast Pill Badge */}
            {(product.stock ?? 5) > 0 && (
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600 text-white text-[11px] font-semibold uppercase tracking-[0.14em] shadow-sm select-none">
                  <Flame className="w-3.5 h-3.5 text-white shrink-0 animate-pulse" />
                  <span>SELLING FAST · {product.stock || 5} LEFT</span>
                </div>
              </div>
            )}



            {product.rating > 0 && (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-0.5 text-gold">
                  <Star className="w-[14px] fill-current" />
                  <Star className="w-[14px] fill-current" />
                  <Star className="w-[14px] fill-current" />
                  <Star className="w-[14px] fill-current" />
                  <StarHalf className="w-[14px] fill-current" />
                </div>
                <span className="text-[13px] font-medium text-ink">4.7</span>
                <span className="text-[13px] text-stone underline underline-offset-4 decoration-border hover:decoration-gold transition-colors cursor-pointer">(128 reviews)</span>
              </div>
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
                    <CircleCheck className="w-4 h-4 text-emerald-600 shrink-0" />
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
                  Subtotal <span className="font-semibold">{money(product.price * quantity)}</span>
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
                onClick={() => {
                  add(product.slug, quantity);
                  toast.success(`${quantity > 1 ? `${quantity}x ` : ""}${product.name} added to your bag`, {
                    action: {
                      label: "View Bag",
                      onClick: () => router.push("/cart"),
                    },
                  });
                }}
                disabled={!product.stock}
              >
                {product.stock ? "Add to Bag" : "Out of Stock"}
              </button>
              {/* WhatsApp Action Button */}
              <a
                href={`https://wa.me/917306347297?text=${encodeURIComponent(
                  `Hi WOXLY, I have a query about ${product.name} (${money(product.price)}).`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with WOXLY on WhatsApp"
                title="Chat with us on WhatsApp"
                className="w-[54px] h-[54px] border border-border rounded-[2px] flex items-center justify-center bg-pearl hover:border-green-500 hover:bg-stone-50 transition-colors shrink-0"
              >
                <FaWhatsapp className="w-6 h-6 text-gold" />
              </a>
            </div>
            <button
              className="btn-primary w-full h-[54px] text-[13px]"
              onClick={() => {
                add(product.slug, quantity);
                router.push('/checkout');
              }}
              disabled={!product.stock}
            >
              Buy It Now
            </button>
          </div>
          {/* Offers Cards */}
          {(product.category.toLowerCase() === 'jewelry' || product.category.toLowerCase() === 'rings') && (
            <div className="flex flex-col gap-4 mb-6">
              {/* Card 1: Exchange Offer */}
              <div className="border border-[#E5E0D8] rounded-[8px] p-5 bg-[#FCF9F2] relative overflow-hidden">
                <h3 className="text-[18px] font-serif text-[#002B24] leading-tight mb-2 pr-12">
                  This product could be yours for under <br className="hidden md:block" /> ₹4,000!*
                </h3>
                <p className="text-[13px] text-stone leading-relaxed mb-4 pr-8">
                  When you bring 0.95 grams of 22k gold to our store. Tap to check the exact value.
                </p>
                <div className="flex justify-between items-end">
                  <button className="px-6 py-2.5 bg-gradient-to-r from-[#B07B2D] to-[#8C5D1E] hover:from-[#9A6D23] hover:to-[#7A5018] text-white text-[13px] font-medium rounded-full shadow-sm transition-all">
                    Check Value
                  </button>
                  <div className="absolute right-4 bottom-4 w-[60px] h-[60px] flex items-center justify-center opacity-70 border border-[#B07B2D] rounded-full pointer-events-none">
                    <div className="text-[7px] font-bold uppercase text-center text-[#B07B2D] tracking-widest leading-tight">
                      Festival<br />Of<br />Exchange
                    </div>
                  </div>
                </div>
                <div className="text-[10px] text-stone/70 mt-4">
                  Terms and Conditions Applied*
                </div>
              </div>

              {/* Card 2: Lock Gold Rate */}
              <div className="bg-[#E5D5A4] p-[4px] rounded-[4px] relative overflow-hidden">
                <div className="bg-[#5C0617] rounded-[2px] border-[1.5px] border-dashed border-[#D4AF37]/50 p-5 flex flex-col items-start relative z-10">
                  <h3 className="text-[18px] font-serif text-[#F3E1B6] mb-1">
                    Lock Best Gold Rate, Pay the Lower one
                  </h3>
                  <p className="text-[13px] text-[#D8B485] mb-5">
                    Your rate stays frozen till you buy — even if gold climbs.
                  </p>
                  <button className="px-5 py-2.5 bg-gradient-to-r from-[#F0D59D] to-[#CD9D55] hover:from-[#E4C88E] hover:to-[#BE8E45] text-[#4A000F] text-[12px] font-bold tracking-wide rounded-full flex items-center gap-2 shadow-sm transition-all">
                    <Lock className="w-[14px]" /> REQUEST TO LOCK MY GOLD RATE
                  </button>
                  <div className="text-[9px] text-[#C89B55] mt-5 uppercase underline underline-offset-2 hover:text-[#F3E1B6] cursor-pointer">
                    * TERMS & CONDITIONS APPLIED
                  </div>
                </div>

                {/* Decorative Ticket Punches */}
                <div className="absolute -left-[6px] top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
                  <div className="w-[12px] h-[12px] rounded-full bg-white shadow-inner"></div>
                  <div className="w-[12px] h-[12px] rounded-full bg-white shadow-inner"></div>
                  <div className="w-[12px] h-[12px] rounded-full bg-white shadow-inner"></div>
                  <div className="w-[12px] h-[12px] rounded-full bg-white shadow-inner"></div>
                </div>
                <div className="absolute -right-[6px] top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
                  <div className="w-[12px] h-[12px] rounded-full bg-white shadow-inner"></div>
                  <div className="w-[12px] h-[12px] rounded-full bg-white shadow-inner"></div>
                  <div className="w-[12px] h-[12px] rounded-full bg-white shadow-inner"></div>
                  <div className="w-[12px] h-[12px] rounded-full bg-white shadow-inner"></div>
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
          <Accordion type="multiple" defaultValue={["description"]} className="w-full">
            {/* Description Tab */}
            <AccordionItem value="description" className="border-border">
              <AccordionTrigger className="text-[13px] uppercase tracking-[0.14em] font-medium text-ink hover:text-gold hover:no-underline py-5">
                Description
              </AccordionTrigger>
              <AccordionContent className="text-[15px] text-stone leading-relaxed pb-5">
                <p className="mb-6">{product.description || "A refined piece meant for everyday wear. Expertly crafted for durability and timeless appeal."}</p>
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
              <AccordionTrigger className="text-[13px] uppercase tracking-[0.14em] font-medium text-ink hover:text-gold hover:no-underline py-5">
                Product Info
              </AccordionTrigger>
              <AccordionContent className="text-[14px] text-stone leading-relaxed pb-5 space-y-6">
                <div>
                  <h4 className="font-semibold text-ink mb-1.5 text-[12px] uppercase tracking-[0.1em]">Shipping</h4>
                  <p>Complimentary shipping on orders over ₹2,999. Dispatches in 1–2 business days via express courier.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-ink mb-1.5 text-[12px] uppercase tracking-[0.1em]">Returns</h4>
                  <p>We accept returns within 14 days of delivery. Items must be unworn and in original packaging.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-ink mb-1.5 text-[12px] uppercase tracking-[0.1em]">Care</h4>
                  <p>To maintain the shine, remove before showering, swimming, or exercising. Store in the provided WOXLY pouch.</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </main>

      {/* Reviews Section */}
      <section className="bg-[#F9F9F9] border-y border-border px-5 py-[24px] md:py-[96px]">
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

                        <span className="inline-flex items-center gap-1 text-[8px] font-medium text-emerald-800 bg-emerald-50  rounded-full uppercase tracking-wider">
                          <CircleCheck className="w-2 h-2 text-emerald-600 shrink-0" />
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

                  <div className="flex gap-2 mb-4 sm:ml-10">
                    <div className="w-[60px] h-[60px] relative bg-sand overflow-hidden rounded-[2px] border border-border/40">
                      <ProductVisual cell={(product.cell + 1) % 12} name={`${product.name} review photo 1`} image={product.image} />
                    </div>
                    <div className="w-[60px] h-[60px] relative bg-sand overflow-hidden rounded-[2px] border border-border/40">
                      <ProductVisual cell={(product.cell + 2) % 12} name={`${product.name} review photo 2`} image={product.image} />
                    </div>
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

                        <span className="inline-flex items-center gap-1 text-[8px] font-medium text-emerald-800 bg-emerald-50  rounded-full uppercase tracking-wider">
                          <CircleCheck className="w-2 h-2 text-emerald-600 shrink-0" />
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
      {isStickyVisible && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#FFFDF9]/95 backdrop-blur-md border-t border-border/80 px-4 py-3 sm:px-8 sm:py-3.5 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] animate-in slide-in-from-bottom-full duration-300">
          <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-3 sm:gap-6">
            {/* Price & Quantity summary */}
            <div className="flex flex-col justify-center min-w-0">
              <span className="text-[11px] sm:text-[12px] text-stone leading-tight font-normal">
                {quantity} {quantity === 1 ? "item" : "items"}
              </span>
              <span className="text-[17px] sm:text-[20px] font-bold text-ink leading-tight tabular-nums">
                {money(product.price * quantity)}
              </span>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <button
                type="button"
                className="h-[46px] px-4 sm:px-7 rounded-[8px] border border-ink bg-white hover:bg-stone-50 text-ink text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.12em] transition-all disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer active:scale-95"
                onClick={() => {
                  add(product.slug, quantity);
                  toast.success(
                    `${quantity > 1 ? `${quantity}x ` : ""}${product.name} added to your bag`,
                    {
                      action: {
                        label: "View Bag",
                        onClick: () => router.push("/cart"),
                      },
                    }
                  );
                }}
                disabled={!product.stock}
              >
                {product.stock ? "ADD TO BAG" : "OUT OF STOCK"}
              </button>
              <button
                type="button"
                className="h-[46px] px-4 sm:px-7 rounded-[8px] bg-ink hover:bg-stone-900 text-ivory text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.12em] transition-all disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer active:scale-95 shadow-sm"
                onClick={() => {
                  add(product.slug, quantity);
                  router.push("/checkout");
                }}
                disabled={!product.stock}
              >
                BUY NOW
              </button>
            </div>
          </div>
        </div>
      )}
    </Shell>
  );
}
