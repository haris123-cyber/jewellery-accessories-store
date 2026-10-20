"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Truck, RotateCcw, ShieldCheck, CreditCard, Star } from "lucide-react";
import { categories, products, type BestSellerGroup } from "@/lib/catalog";
import {
  EditorialVisual,
  ProductSection,
  ProductCard,
  Social,
  Newsletter,
  SummerOffers,
  HomeBanners,
  HomeBanners2,
  AsSeenOn,
  HeroBannerCarousel,
  HomeSearch,
} from "@/components/shared";
import { Shell } from "@/components/layout";
import { useState } from "react";
import { useAutoScroll } from "@/hooks/use-auto-scroll";

export default function HomePage() {
  const categoriesScrollRef = useAutoScroll({ speed: 3000 });
  const bestSellersScrollRef = useAutoScroll({ speed: 3000 });

  const [bestSellerTab, setBestSellerTab] = useState<BestSellerGroup>("women");

  const filteredBestSellers = products.filter(
    (product) =>
      product.badge?.trim().toLowerCase() === "best seller" &&
      product.bestSellerGroup === bestSellerTab,
  );

  return (
    <Shell>

      {/* ── Banner Carousel ── */}
      <HeroBannerCarousel />



      <section className="w-full max-w-[1280px] mx-auto px-[16px] md:px-[24px] py-4 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

          {/* Under 50K Banner */}
          <div className="overflow-hidden rounded-2xl shadow-sm">
            <Image
              src="/images/banners/image copy 7.png"
              alt="Under 50K jewellery collection"
              width={800}
              height={600}
              sizes="(max-width: 768px) 100vw, 640px"
              className="h-[220px] sm:h-[280px] md:h-[340px] w-full rounded-2xl object-cover object-center transition-transform duration-500 hover:scale-[1.02]"
            />
          </div>

          {/* Earrings Banner */}
          <div className="overflow-hidden rounded-2xl shadow-sm">
            <Image
              src="/images/banners/image copy 8.png"
              alt="Elegant gold earrings collection"
              width={800}
              height={450}
              sizes="(max-width: 768px) 100vw, 640px"
              className="h-[220px] sm:h-[280px] md:h-[340px] w-full rounded-2xl object-cover object-center transition-transform duration-500 hover:scale-[1.02]"
            />
          </div>

        </div>
      </section>


      {/* ── Shop by category ── */}
      <section className="py-[26px] md:py-[96px] px-[16px] md:px-[24px] max-w-[1280px] mx-auto" id="collection">
        <div className="mb-[40px] md:mb-[56px] text-left">
          <p className="m-0 mb-[16px] uppercase tracking-[0.14em] text-center text-[12px] font-medium text-stone">The Categories</p>
          <h2 className="m-0 text-ink">Curated for every moment</h2>
        </div>

        <div ref={categoriesScrollRef} className="flex overflow-x-auto snap-x snap-mandatory gap-[8px] md:gap-[24px] pb-[16px] -mx-[16px] px-[16px] md:mx-0 md:px-0 no-scrollbar">
          {categories.slice(0, 8).map((c) => (
            <a
              href={`/category/${c.slug}`}
              key={c.slug}
              className="group relative flex-none w-[70vw] md:w-[calc(33.333%-16px)] aspect-[3/4] overflow-hidden rounded-2xl snap-center"
            >
              <EditorialVisual cell={c.cell} label={`${c.label} collection`} />
              <div className="absolute  inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-80" />
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

      {/* ── Hero Campaign Banner ── */}
      <section className="w-full max-w-[1280px] mx-auto px-[16px] md:px-[24px] py-0 md:py-8">
        <div className="overflow-hidden rounded-2xl shadow-sm w-full">
          <Image
            src="/images/banners/image copy 9.png"
            alt="WOXLY new season jewellery campaign"
            width={1280}
            height={600}
            priority
            className="w-full h-[220px] sm:h-[320px] md:h-[420px] object-cover object-center rounded-2xl transition-transform duration-500 hover:scale-[1.01]"
          />
        </div>
      </section>

      {/* ── Dual Promotion Banners ── */}
      <section className="w-full max-w-[1280px] mx-auto px-[16px] md:px-[24px] py-4 md:py-8">
        <div className="grid grid-cols-2 gap-3 md:gap-6">

          {/* Banner 1 */}
          <div className="overflow-hidden rounded-2xl shadow-sm">
            <Image
              src="/images/banners/image copy 10.png"
              alt="WOXLY jewellery collection"
              width={600}
              height={420}
              sizes="(max-width: 768px) 50vw, 600px"
              className="h-[160px] sm:h-[260px] md:h-[360px] w-full rounded-2xl object-cover object-center transition-transform duration-500 hover:scale-[1.02]"
            />
          </div>

          {/* Banner 2 */}
          <div className="overflow-hidden rounded-2xl shadow-sm">
            <Image
              src="/images/banners/image copy 11.png"
              alt="WOXLY new season jewellery campaign"
              width={600}
              height={420}
              sizes="(max-width: 768px) 50vw, 600px"
              className="h-[160px] sm:h-[260px] md:h-[360px] w-full rounded-2xl object-cover object-center transition-transform duration-500 hover:scale-[1.02]"
            />
          </div>

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
              className={`uppercase tracking-[0.14em] text-[13px] font-medium pb-[12px] px-2 transition-colors border-b-2 ${bestSellerTab === "women" ? "text-ink border-gold" : "text-stone border-transparent hover:text-ink"}`}
              onClick={() => {
                setBestSellerTab("women");
                bestSellersScrollRef.current?.scrollTo({ left: 0, behavior: "smooth" });
              }}
              suppressHydrationWarning
            >
              Women
            </button>
            <button
              className={`uppercase tracking-[0.14em] text-[13px] font-medium pb-[12px] px-2 transition-colors border-b-2 ${bestSellerTab === "men" ? "text-ink border-gold" : "text-stone border-transparent hover:text-ink"}`}
              onClick={() => {
                setBestSellerTab("men");
                bestSellersScrollRef.current?.scrollTo({ left: 0, behavior: "smooth" });
              }}
              suppressHydrationWarning
            >
              Men
            </button>
            <button
              className={`uppercase tracking-[0.14em] text-[13px] font-medium pb-[12px] px-2 transition-colors border-b-2 ${bestSellerTab === "gifts" ? "text-ink border-gold" : "text-stone border-transparent hover:text-ink"}`}
              onClick={() => {
                setBestSellerTab("gifts");
                bestSellersScrollRef.current?.scrollTo({ left: 0, behavior: "smooth" });
              }}
              suppressHydrationWarning
            >
              Gifts
            </button>
          </div>
        </div>
        <div ref={bestSellersScrollRef} className="flex overflow-x-auto ml-1 snap-x snap-mandatory gap-[16px] md:gap-[24px] pb-[16px] pt-4 -mx-[16px] px-[16px] md:mx-0 md:px-0 no-scrollbar">
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


      <Newsletter />
    </Shell>
  );
}
