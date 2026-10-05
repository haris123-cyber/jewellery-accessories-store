"use client";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import {
  ArrowRight,
  CircleCheck,
  Heart,
  Search,
  ShieldCheck,
  Star,
  StarHalf,
  Truck,
  Sparkles,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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

export function ProductPage({ slug }: { slug?: string }) {
  const product = getProduct(slug);
  const add = useCommerceStore((s) => s.add);
  const [material, setMaterial] = useState(0);
  const [size, setSize] = useState("6");
  
  return (
    <Shell>
      {/* Breadcrumbs */}
      <div className="px-[16px] md:px-[24px] py-[24px] md:py-[32px] text-stone text-[12px] uppercase tracking-[0.14em] font-medium max-w-[1280px] mx-auto">
        <a href="/" className="hover:text-gold transition-colors">Home</a> <span className="mx-2">/</span>
        <a href={`/category/${product.category}`} className="hover:text-gold transition-colors">{product.category}</a> <span className="mx-2">/</span>
        <span className="text-ink">{product.name}</span>
      </div>

      {/* PDP grid */}
      <main className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-[40px] md:gap-[64px] px-[16px] md:px-[24px] pb-[64px] md:pb-[120px] max-w-[1280px] mx-auto">
        {/* Image gallery */}
        <div className="flex flex-col gap-[16px]">
          <div className="aspect-[4/5] w-full rounded-[4px] overflow-hidden relative bg-sand group">
            <ProductVisual cell={product.cell} name={product.name} priority />
            <button className="absolute top-4 right-4 btn-icon bg-ivory/80 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity z-20">
              <Search className="w-[18px] text-ink" />
            </button>
          </div>
          <div className="flex gap-[16px] overflow-x-auto snap-x pb-2 hide-scrollbar">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className={`flex-none w-[20%] aspect-square rounded-[2px] overflow-hidden bg-sand cursor-pointer snap-start border-2 transition-colors ${i === 0 ? 'border-gold' : 'border-transparent hover:border-border'}`}>
                <ProductVisual cell={(product.cell + i) % 12} name={`${product.name} view ${i}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Product info */}
        <div className="pt-2 flex flex-col">
          <div className="mb-6">
            <span className="inline-block px-2 py-1 bg-gold-soft text-ink text-[11px] uppercase tracking-[0.14em] font-medium rounded-[2px] mb-4">Core Collection</span>
            <h1 className="text-[32px] md:text-[40px] font-serif text-ink leading-[1.1] mb-4">{product.name}</h1>
            
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <p className="text-[24px] font-medium text-ink tabular-nums m-0">
                {money(product.price)}
              </p>
              {product.compareAtPrice && (
                <del className="text-[16px] text-stone tabular-nums">{money(product.compareAtPrice)}</del>
              )}
            </div>

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
              {[{c: "#E8CD89", n: "Gold"}, {c: "#E1E1E1", n: "Silver"}, {c: "#E4B8A6", n: "Rose"}].map((m, i) => (
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
              <span className="text-[13px] uppercase tracking-[0.14em] font-medium text-ink">Ring Size</span>
              <button className="text-[12px] uppercase tracking-[0.14em] font-medium text-stone underline underline-offset-4 decoration-border hover:decoration-gold hover:text-ink transition-colors">
                Size Guide
              </button>
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

          {/* Actions */}
          <div className="flex gap-[16px] mb-[40px]">
            <button 
              className="btn-primary flex-1 h-[54px] text-[13px]"
              onClick={() => {
                add(product.slug);
                toast.success(`${product.name} added to your bag`);
              }}
              disabled={!product.stock}
            >
              {product.stock ? "Add to Bag" : "Out of Stock"}
            </button>
            <div className="w-[54px] h-[54px] border border-border rounded-[2px] flex items-center justify-center bg-pearl relative">
              <WishButton product={product} />
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[12px] mb-[48px]">
            {[
              { icon: <ShieldCheck className="w-[18px]" />, label: "2-Year Warranty" },
              { icon: <Sparkles className="w-[18px]" />, label: "Anti-Tarnish" },
              { icon: <Truck className="w-[18px]" />, label: "Free Shipping > ₹2999" },
            ].map(({ icon, label }) => (
              <div key={label} className="bg-sand rounded-[2px] p-[16px] flex flex-col items-center justify-center text-center gap-2">
                <span className="text-ink">{icon}</span>
                <span className="text-[12px] uppercase tracking-[0.14em] font-medium text-ink">{label}</span>
              </div>
            ))}
          </div>

          {/* Delivery & Returns Info */}
          {/* Accordion */}
          <Accordion type="single" collapsible className="w-full">
            {[
              ["description", "Description", product.description || "A refined piece meant for everyday wear. Expertly crafted for durability and timeless appeal."],
              ["materials", "Materials", product.material || "Crafted with an 18k gold vermeil finish over a solid sterling silver base."],
              [
                "dimensions",
                "Dimensions",
                "Chain length: 45cm with a 5cm extender. Pendant size: 1.2cm x 1.2cm.",
              ],
              [
                "shipping",
                "Shipping",
                "Complimentary shipping on orders over ₹2,999. Dispatches in 1–2 business days via express courier.",
              ],
              [
                "returns",
                "Returns",
                "We accept returns within 14 days of delivery. Items must be unworn and in original packaging.",
              ],
              [
                "care",
                "Care",
                "To maintain the shine, remove before showering, swimming, or exercising. Store in the provided WOXLY pouch.",
              ],
            ].map(([v, t, c]) => (
              <AccordionItem value={v} key={v} className="border-border">
                <AccordionTrigger className="text-[13px] uppercase tracking-[0.14em] font-medium text-ink hover:text-gold hover:no-underline py-5">{t}</AccordionTrigger>
                <AccordionContent className="text-[15px] text-stone leading-relaxed pb-5">{c}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>

      {/* Reviews Section */}
      <section className="bg-sand border-y border-border py-[64px] md:py-[96px]">
        <div className="max-w-[1280px] mx-auto px-[16px] md:px-[24px]">
          <h2 className="text-[28px] md:text-[36px] font-serif text-ink mb-[48px] text-center md:text-left">Customer Reviews</h2>
          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-[48px] lg:gap-[96px]">
            {/* Rating Summary */}
            <div className="flex flex-col md:flex-row lg:flex-col gap-[32px] items-center md:items-start lg:items-center">
              <div className="text-center">
                <div className="text-[64px] font-serif text-ink leading-none mb-4">4.7</div>
                <div className="flex items-center justify-center gap-1 text-gold mb-3">
                  <Star className="w-[18px] fill-current" />
                  <Star className="w-[18px] fill-current" />
                  <Star className="w-[18px] fill-current" />
                  <Star className="w-[18px] fill-current" />
                  <StarHalf className="w-[18px] fill-current" />
                </div>
                <div className="text-[13px] text-stone font-medium uppercase tracking-[0.14em]">Based on 128 reviews</div>
              </div>

              <div className="w-full md:w-[300px] lg:w-[240px] space-y-[12px] text-[13px] font-medium text-stone">
                {[
                  { s: 5, p: 82 },
                  { s: 4, p: 12 },
                  { s: 3, p: 4 },
                  { s: 2, p: 1 },
                  { s: 1, p: 1 },
                ].map((row) => (
                  <div key={row.s} className="flex items-center gap-[16px]">
                    <span className="w-2">{row.s}</span>
                    <Star className="w-[14px] text-gold fill-current" />
                    <div className="flex-1 h-[4px] bg-border rounded-full overflow-hidden">
                      <div className="h-full bg-ink" style={{ width: `${row.p}%` }} />
                    </div>
                    <span className="w-8 text-right tabular-nums">{row.p}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Review Card */}
            <div className="border border-border rounded-[2px] p-[32px] md:p-[48px] relative bg-ivory shadow-sm">
              <div className="flex justify-between items-start mb-[24px]">
                <div>
                  <div className="font-medium text-[15px] uppercase tracking-[0.14em] text-ink mb-1">Priya S.</div>
                  <div className="text-[12px] text-stone flex items-center gap-1.5 uppercase tracking-[0.14em]">
                    <CircleCheck className="w-[14px] text-gold" /> Verified Buyer
                  </div>
                </div>
                <div className="text-stone text-[14px]">Oct 12, 2026</div>
              </div>
              <div className="flex items-center gap-1 text-gold mb-[24px]">
                <Star className="w-[16px] fill-current" />
                <Star className="w-[16px] fill-current" />
                <Star className="w-[16px] fill-current" />
                <Star className="w-[16px] fill-current" />
                <Star className="w-[16px] fill-current" />
              </div>
              <p className="text-[18px] text-ink font-serif italic leading-relaxed">
                "Absolutely stunning piece. The craftsmanship is evident, and it feels substantial without being heavy. I've worn it daily for a month, including in the shower, and the finish hasn't faded one bit. Exceeds expectations."
              </p>

              {/* Navigation Arrows */}
              <div className="absolute -left-5 top-1/2 -translate-y-1/2 w-[40px] h-[40px] bg-ivory border border-border rounded-full flex items-center justify-center cursor-pointer hover:border-gold hover:text-gold transition-colors hidden md:flex">
                <ArrowRight className="w-[18px] rotate-180" />
              </div>
              <div className="absolute -right-5 top-1/2 -translate-y-1/2 w-[40px] h-[40px] bg-ivory border border-border rounded-full flex items-center justify-center cursor-pointer hover:border-gold hover:text-gold transition-colors hidden md:flex">
                <ArrowRight className="w-[18px]" />
              </div>

              {/* Pagination Dots */}
              <div className="flex justify-center gap-2 mt-[40px]">
                <div className="w-[6px] h-[6px] rounded-full bg-ink"></div>
                <div className="w-[6px] h-[6px] rounded-full bg-border"></div>
                <div className="w-[6px] h-[6px] rounded-full bg-border"></div>
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
    </Shell>
  );
}
