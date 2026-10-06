"use client";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import {
  ArrowDown,
  ArrowRight,
  CircleCheck,
  Clock,
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
            <ProductVisual cell={product.cell} name={product.name} image={product.image} priority />
            <button className="absolute top-4 right-4 btn-icon bg-ivory/80 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity z-20">
              <Search className="w-[18px] text-ink" />
            </button>
          </div>
          <div className="flex gap-[16px] overflow-x-auto snap-x pb-2 hide-scrollbar">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className={`flex-none w-[20%] aspect-square rounded-[2px] overflow-hidden bg-sand cursor-pointer snap-start border-2 transition-colors ${i === 0 ? 'border-gold' : 'border-transparent hover:border-border'}`}>
                <ProductVisual cell={(product.cell + i) % 12} name={`${product.name} view ${i}`} image={product.image} />
              </div>
            ))}
          </div>
        </div>

        {/* Product info */}
        <div className="pt-2 flex flex-col">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-block px-2 py-1 bg-gold-soft text-ink text-[11px] uppercase tracking-[0.14em] font-medium rounded-[2px]">Core Collection</span>
              {product.stock > 0 ? (
                <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] font-medium text-[#16A34A]">
                  <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse"></span>
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
                    <ArrowDown className="w-[14px]" /> {Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}% Off
                  </span>
                </>
              )}
            </div>

            {/* Hurry Up Card */}
            {product.stock > 0 && product.stock <= 15 && (
              <div className="bg-[#FEF2F2] border border-[#FCA5A5] text-[#DC2626] px-[16px] py-[12px] rounded-[2px] mb-6 flex items-center gap-2 text-[14px] font-medium">
                <Clock className="w-[16px]" />
                Hurry up! Only {product.stock} pieces left in stock.
              </div>
            )}

            {/* Offers Card */}
            <div className="border border-border rounded-[2px] p-[16px] mb-6 bg-ivory shadow-sm">
              <h3 className="text-[12px] uppercase tracking-[0.14em] font-medium text-ink mb-3 flex items-center gap-2">
                <Sparkles className="w-[16px] text-gold" />
                Available Offers
              </h3>
              <ul className="text-[14px] text-stone space-y-2 list-disc pl-5 marker:text-gold">
                <li><strong className="text-ink font-medium">Bank Offer:</strong> 5% Unlimited Cashback on selected Credit Cards</li>
                <li><strong className="text-ink font-medium">Special Price:</strong> Get extra 10% off with code <span className="text-gold font-medium">WOXLY10</span></li>
                <li><strong className="text-ink font-medium">No Cost EMI:</strong> Available on orders above ₹5,000</li>
              </ul>
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
          <div className="grid grid-cols-3 md:grid-cols-3 gap-[12px] mb-[48px]">
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
      <section className="bg-[#F9F9F9] border-y border-border py-[64px] md:py-[96px]">
        <div className="max-w-[1280px] mx-auto px-[16px] md:px-[24px]">
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-[48px] lg:gap-[96px]">
            {/* Left Column: Summary */}
            <div className="flex flex-col">
              <h2 className="text-[28px] font-serif text-ink mb-6">Customer Reviews</h2>

              <div className="flex items-center gap-4 mb-3">
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

              <div className="space-y-[12px] text-[12px] text-stone font-medium mb-10">
                {[
                  { s: 5, p: 82, c: 105 },
                  { s: 4, p: 12, c: 15 },
                  { s: 3, p: 4, c: 5 },
                  { s: 2, p: 1, c: 2 },
                  { s: 1, p: 1, c: 1 },
                ].map((row) => (
                  <div key={row.s} className="flex items-center gap-[12px]">
                    <span className="w-2">{row.s}</span>
                    <Star className="w-[12px] text-[#D4AF37] fill-current" />
                    <div className="flex-1 h-[4px] bg-[#E5E5E5] rounded-full overflow-hidden">
                      <div className="h-full bg-[#D4AF37]" style={{ width: `${row.p}%` }} />
                    </div>
                    <span className="w-6 text-right tabular-nums">{row.c}</span>
                  </div>
                ))}
              </div>

              <div className="border border-border p-8 text-center bg-white shadow-sm flex flex-col gap-4">
                <div className="text-[11px] uppercase tracking-[0.14em] text-stone font-medium">
                  Only verified buyers can leave a review.
                </div>
                <div className="text-[11px] uppercase tracking-[0.14em] text-[#D4AF37] font-medium">
                  (Demo: Click to simulate purchase)
                </div>
              </div>
            </div>

            {/* Right Column: Reviews */}
            <div className="flex flex-col">
              <div className="flex flex-col border-t border-border mt-2">
                {/* Review 1 */}
                <div className="py-8 border-b border-border flex flex-col">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-1 text-[#D4AF37]">
                      <Star className="w-[14px] fill-current" />
                      <Star className="w-[14px] fill-current" />
                      <Star className="w-[14px] fill-current" />
                      <Star className="w-[14px] fill-current" />
                      <Star className="w-[14px] fill-current" />
                    </div>
                    <div className="text-[11px] uppercase tracking-[0.14em] text-stone font-medium">
                      Oct 12, 2026
                    </div>
                  </div>
                  <h4 className="text-[18px] font-serif text-ink mb-4">Absolutely stunning piece</h4>
                  <p className="text-[12px] uppercase tracking-[0.05em] leading-relaxed text-ink mb-6">
                    "The craftsmanship is evident, and it feels substantial without being heavy. I've worn it daily for a month, including in the shower, and the finish hasn't faded one bit. Exceeds expectations."
                  </p>
                  <div className="flex gap-2 mb-8">
                    <div className="w-[60px] h-[60px] relative bg-sand overflow-hidden">
                      <ProductVisual cell={(product.cell + 1) % 12} name={`${product.name} review photo 1`} image={product.image} />
                    </div>
                    <div className="w-[60px] h-[60px] relative bg-sand overflow-hidden">
                      <ProductVisual cell={(product.cell + 2) % 12} name={`${product.name} review photo 2`} image={product.image} />
                    </div>
                  </div>
                  <div className="text-[12px] uppercase tracking-[0.14em] text-stone font-medium mt-auto">
                    — PRIYA S.
                  </div>
                </div>

                {/* Review 2 */}
                <div className="py-8 border-b border-border flex flex-col">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-1 text-[#D4AF37]">
                      <Star className="w-[14px] fill-current" />
                      <Star className="w-[14px] fill-current" />
                      <Star className="w-[14px] fill-current" />
                      <Star className="w-[14px] fill-current" />
                      <Star className="w-[14px] fill-current" />
                    </div>
                    <div className="text-[11px] uppercase tracking-[0.14em] text-stone font-medium">
                      Apr 05, 2026
                    </div>
                  </div>
                  <h4 className="text-[18px] font-serif text-ink mb-4">Best jewelry I have ordered online</h4>
                  <p className="text-[12px] uppercase tracking-[0.05em] leading-relaxed text-ink mb-8">
                    Very elegant and shiny, no sharp edges at all. The chain was generous and sat beautifully on the neck. Highly recommend.
                  </p>
                  <div className="w-[60px] h-[60px] mb-5 relative bg-sand overflow-hidden">
                    <ProductVisual cell={(product.cell + 2) % 12} name={`${product.name} review photo 2`} image={product.image} />
                  </div>
                  <div className="text-[12px] uppercase tracking-[0.14em] text-stone font-medium mt-auto">
                    — SUNITHA K.V.
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
    </Shell>
  );
}
