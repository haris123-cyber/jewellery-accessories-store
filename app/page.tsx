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
  HomeBanners2
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
      <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-ink max-[960px]:min-h-[70vh]">
        <Image
          src="/images/gallery-hero.png"
          alt="WOXLY new season jewellery campaign"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-105 motion-safe:duration-1000 max-[960px]:object-[60%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/20 to-transparent" />

        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-[16px] md:px-[24px]">
          <motion.div
            className="max-w-[600px] text-ivory"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="m-0 mb-[24px] uppercase tracking-[0.14em] text-[12px] font-medium text-gold">The Autumn Edit</p>
            <h1 className="m-0 mb-[24px] text-ivory">
              Jewellery that tells your story
            </h1>
            <p className="m-0 mb-[40px] text-[16px] md:text-[18px] text-ivory/90 leading-relaxed max-w-[480px]">
              Discover our latest collection of finely crafted pieces designed for every meaningful moment.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-[16px]">
              <a className="btn-primary w-full sm:w-auto" href="/shop">
                Shop Collection
              </a>
              <a className="btn-secondary !border-ivory !text-ivory hover:!bg-ivory hover:!text-ink w-full sm:w-auto" href="/category/gifting">
                Explore Gifting
              </a>
            </div>
          </motion.div>
        </div>
      </section>



      {/* ── Shop by category ── */}
      <section className="py-[56px] md:py-[96px] px-[16px] md:px-[24px] max-w-[1280px] mx-auto" id="collection">
        <div className="mb-[40px] md:mb-[56px] text-left">
          <p className="m-0 mb-[16px] uppercase tracking-[0.14em] text-[12px] font-medium text-stone">The Collections</p>
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
            >
              Women
            </button>
            <button
              className={`uppercase tracking-[0.14em] text-[13px] font-medium pb-[12px] px-2 transition-colors border-b-2 ${bestSellerTab === "Men" ? "text-ink border-gold" : "text-stone border-transparent hover:text-ink"}`}
              onClick={() => setBestSellerTab("Men")}
            >
              Men
            </button>
            <button
              className={`uppercase tracking-[0.14em] text-[13px] font-medium pb-[12px] px-2 transition-colors border-b-2 ${bestSellerTab === "Gifts" ? "text-ink border-gold" : "text-stone border-transparent hover:text-ink"}`}
              onClick={() => setBestSellerTab("Gifts")}
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

      {/* ── Reviews Carousel ── */}
      <section className="py-[56px] md:py-[96px] bg-sand border-y border-border">
        <div className="max-w-[1280px] mx-auto px-[16px] md:px-[24px]">
          <div className="text-center mb-[48px]">
            <p className="m-0 mb-[16px] uppercase tracking-[0.14em] text-[12px] font-medium text-stone">Real stories</p>
            <h2 className="m-0 text-ink">Loved by our community</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
            {[
              {
                text: "The quality is outstanding. The 18k plating hasn't tarnished at all even with everyday wear. Absolutely love my new hoops.",
                author: "Sarah M.",
                product: "Classic Gold Hoops"
              },
              {
                text: "I bought this as a gift for my wife and she was blown away by the packaging and the piece itself. Will definitely buy again.",
                author: "James T.",
                product: "Diamond Tennis Bracelet"
              },
              {
                text: "Beautiful design and surprisingly lightweight. It feels like wearing nothing but elevates every single outfit I own.",
                author: "Elena R.",
                product: "Layered Pearl Necklace"
              }
            ].map((review, i) => (
              <div key={i} className="bg-ivory p-[32px] md:p-[40px] rounded-[4px] border border-border flex flex-col items-center text-center">
                <div className="flex items-center gap-1 text-gold mb-[24px]">
                  <Star className="w-[16px] h-[16px] fill-current" />
                  <Star className="w-[16px] h-[16px] fill-current" />
                  <Star className="w-[16px] h-[16px] fill-current" />
                  <Star className="w-[16px] h-[16px] fill-current" />
                  <Star className="w-[16px] h-[16px] fill-current" />
                </div>
                <p className="text-ink text-[16px] leading-relaxed font-serif italic mb-[32px] flex-1">
                  "{review.text}"
                </p>
                <div>
                  <p className="uppercase tracking-[0.14em] text-[12px] font-medium text-ink mb-1">{review.author}</p>
                  <p className="text-stone text-[12px]">Verified Buyer · {review.product}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Social />
      <Newsletter />
    </Shell>
  );
}
