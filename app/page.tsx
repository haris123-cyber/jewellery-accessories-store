"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Truck, RotateCcw, ShieldCheck, CreditCard, Star } from "lucide-react";
import { categories, products } from "@/lib/catalog";
import {
  EditorialVisual,
  ProductSection,
  ProductCard,
  Social,
  Newsletter,
  SummerOffers,
  HomeBanners,
  HomeBanners2,
  AsSeenOn
} from "@/components/shared";
import { Shell } from "@/components/layout";
import { useState } from "react";

export default function HomePage() {
  const [bestSellerTab, setBestSellerTab] = useState("Women");

  const filteredBestSellers = products.filter(p => {
    if (bestSellerTab === "Women") return ["jewelry", "bags", "sunglasses"].includes(p.category);
    if (bestSellerTab === "Men") return ["watches", "wallets", "belts"].includes(p.category);
    if (bestSellerTab === "Gifts") return p.category === "gifts" || p.price < 2500;
    return true;
  }).slice(0, 4);

  return (
    <Shell>
      {/* ── Hero ── */}
      <section className="relative w-full h-[80vh] min-h-[500px] md:h-auto md:min-h-0 md:aspect-[3/1] 2xl:max-h-[640px] overflow-hidden group">
        <Image
          src="/images/gallery-hero.png"
          alt="WOXLY new season jewellery campaign"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-105 motion-safe:duration-1000 max-[960px]:object-[60%_center]"
        />


      </section>



      {/* ── Shop by category ── */}
      <section className="py-[56px] md:py-[96px] px-[16px] md:px-[24px] max-w-[1280px] mx-auto" id="collection">
        <div className="mb-[40px] md:mb-[56px] text-left">
          <p className="m-0 mb-[16px] uppercase tracking-[0.14em] text-center text-[12px] font-medium text-stone">The Collections</p>
          <h2 className="m-0 text-ink">Curated for every moment</h2>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory gap-[16px] md:gap-[24px] pb-[16px] -mx-[16px] px-[16px] md:mx-0 md:px-0 hide-scrollbar">
          {categories.slice(0, 6).map((c) => (
            <a
              href={`/category/${c.slug}`}
              key={c.slug}
              className="group relative flex-none w-[70vw] md:w-[calc(33.333%-16px)] aspect-[3/4] overflow-hidden rounded-[4px] snap-center"
            >
              <EditorialVisual cell={c.cell} label={`${c.label} collection`} />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-80" />
              <div className="absolute left-6 right-6 bottom-6 flex justify-between items-end">
                <span className="font-serif text-[28px] text-ivory leading-none group-hover:text-gold transition-colors">
                  {c.label}
                </span>
                <ArrowRight className="w-[24px] text-ivory group-hover:text-gold transition-colors group-hover:translate-x-1" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── New Arrivals ── */}
      <ProductSection
        title="New arrivals"
        subtitle="Fresh pieces. Quietly distinctive."
        items={products.slice(0, 8)}
      />

      {/* ── Feature Split (HomeBanners) ── */}
      <HomeBanners />

      {/* ── Best Sellers (Tabbed Mock) ── */}
      <section className="py-[56px] md:py-[96px] px-[16px] md:px-[24px] max-w-[1280px] mx-auto bg-ivory">
        <div className="flex flex-col items-center mb-[40px] md:mb-[56px]">
          <h2 className="m-0 mb-[24px] text-ink text-center">Best sellers</h2>
          <div className="flex items-center justify-center gap-[24px] border-b border-border w-full max-w-[400px]">
            <button
              className={`uppercase tracking-[0.14em] text-[13px] font-medium pb-[12px] px-2 transition-colors border-b-2 ${bestSellerTab === "Women" ? "text-ink border-gold" : "text-stone border-transparent hover:text-ink"}`}
              onClick={() => setBestSellerTab("Women")}
              suppressHydrationWarning
            >
              Women
            </button>
            <button
              className={`uppercase tracking-[0.14em] text-[13px] font-medium pb-[12px] px-2 transition-colors border-b-2 ${bestSellerTab === "Men" ? "text-ink border-gold" : "text-stone border-transparent hover:text-ink"}`}
              onClick={() => setBestSellerTab("Men")}
              suppressHydrationWarning
            >
              Men
            </button>
            <button
              className={`uppercase tracking-[0.14em] text-[13px] font-medium pb-[12px] px-2 transition-colors border-b-2 ${bestSellerTab === "Gifts" ? "text-ink border-gold" : "text-stone border-transparent hover:text-ink"}`}
              onClick={() => setBestSellerTab("Gifts")}
              suppressHydrationWarning
            >
              Gifts
            </button>
          </div>
        </div>
        <div className="flex overflow-x-auto ml-1 snap-x snap-mandatory gap-[16px] md:gap-[24px] pb-[16px] -mx-[16px] px-[16px] md:mx-0 md:px-0 hide-scrollbar">
          {filteredBestSellers.map((p, i) => (
            <div key={p.slug} className="flex-none w-[55vw] md:w-[calc(25%-18px)] snap-start">
              <ProductCard product={p} index={i} />
            </div>
          ))}
        </div>
        <div className="mt-[48px] flex justify-center">
          <a href="/shop" className="btn-secondary">View all bestsellers</a>
        </div>
      </section>

      {/* ── Lookbook & Editorial (HomeBanners2) ── */}
      <HomeBanners2 />

      {/* ── Summer Offers ── */}
      <SummerOffers />

      {/* ── As Seen On Carousel ── */}
      <AsSeenOn />

      <Social />
      <Newsletter />
    </Shell>
  );
}
