"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Truck, RotateCcw, ShieldCheck, CreditCard, Star } from "lucide-react";
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
  AsSeenOn
} from "@/components/shared";
import { Shell } from "@/components/layout";
import { useEffect, useRef, useState } from "react";

export default function HomePage() {
  const banners = [
    "/images/banners/image copy 4.png",
    "/images/banners/image copy 5.png",
    "/images/banners/image copy 2.png",
    "/images/banners/image copy 6.png",
  ];

  // A leading and trailing set lets the carousel reset invisibly after banner four.
  const loopedBanners = [...banners, ...banners, ...banners];
  const bannerRailRef = useRef<HTMLDivElement>(null);

  const [bestSellerTab, setBestSellerTab] = useState<BestSellerGroup>("women");

  const filteredBestSellers = products.filter(
    (product) =>
      product.badge?.trim().toLowerCase() === "best seller" &&
      product.bestSellerGroup === bestSellerTab,
  );

  useEffect(() => {
    const rail = bannerRailRef.current;
    if (!rail) return;

    const goToMiddleSet = () => {
      const firstMiddleBanner = rail.children[banners.length] as HTMLElement | undefined;
      if (firstMiddleBanner) rail.scrollLeft = firstMiddleBanner.offsetLeft;
    };

    goToMiddleSet();
    window.addEventListener("resize", goToMiddleSet);
    return () => window.removeEventListener("resize", goToMiddleSet);
  }, [banners.length]);

  function handleBannerScroll() {
    const rail = bannerRailRef.current;
    if (!rail) return;

    const firstMiddleBanner = rail.children[banners.length] as HTMLElement | undefined;
    const firstTrailingBanner = rail.children[banners.length * 2] as HTMLElement | undefined;
    if (!firstMiddleBanner || !firstTrailingBanner) return;

    // Once a duplicate set is reached, move to the matching card in the centre set.
    if (rail.scrollLeft < firstMiddleBanner.offsetLeft - 32) {
      rail.scrollLeft += firstTrailingBanner.offsetLeft - firstMiddleBanner.offsetLeft;
    } else if (rail.scrollLeft >= firstTrailingBanner.offsetLeft - 32) {
      rail.scrollLeft -= firstTrailingBanner.offsetLeft - firstMiddleBanner.offsetLeft;
    }
  }

  function moveBanner(direction: 1 | -1) {
    const rail = bannerRailRef.current;
    if (!rail) return;
    const firstBanner = rail.children[0] as HTMLElement | undefined;
    if (!firstBanner) return;
    const gap = 16;
    rail.scrollBy({ left: direction * (firstBanner.offsetWidth + gap), behavior: "smooth" });
  }

  return (
    <Shell>
      {/* ── Hero ── */}
      <section className="w-full flex flex-col items-center justify-center gap-1 overflow-hidden group py-0 md:py-8 mt-2 md:mt-0">
        <Image
          src="/images/banners/image.png"
          alt="WOXLY new season jewellery campaign"
          width={425}
          height={260}
          priority
          className="object-cover object-center rounded-2xl px-2 motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-105 motion-safe:duration-1000 max-[960px]:object-[60%_center]"
        />


      </section>
      {/* ── Banner Carousel ── */}
      <section aria-label="Featured collections" className="w-full py-5 md:py-8">
        <div className="mb-3 flex items-center justify-between px-5 md:px-8">
        
        </div>
        <div
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-5 md:px-8 hide-scrollbar"
          onScroll={handleBannerScroll}
          ref={bannerRailRef}
        >
          {loopedBanners.map((src, i) => (
            <div
              key={i}
              className="flex-none w-[90vw] md:w-[600px] snap-center overflow-hidden rounded-2xl"
            >
              <Image
                src={src}
                alt={`Featured WOXLY collection ${(i % banners.length) + 1}`}
                width={600}
                height={350}
                className="w-full h-auto object-cover rounded-2xl"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── Shop by category ── */}
      <section className="py-[56px] md:py-[96px] px-[16px] md:px-[24px] max-w-[1280px] mx-auto" id="collection">
        <div className="mb-[40px] md:mb-[56px] text-left">
          <p className="m-0 mb-[16px] uppercase tracking-[0.14em] text-center text-[12px] font-medium text-stone">The Collections</p>
          <h2 className="m-0 text-ink">Curated for every moment</h2>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory gap-[8px] md:gap-[24px] pb-[16px] -mx-[16px] px-[16px] md:mx-0 md:px-0 hide-scrollbar">
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
              onClick={() => setBestSellerTab("women")}
              suppressHydrationWarning
            >
              Women
            </button>
            <button
              className={`uppercase tracking-[0.14em] text-[13px] font-medium pb-[12px] px-2 transition-colors border-b-2 ${bestSellerTab === "men" ? "text-ink border-gold" : "text-stone border-transparent hover:text-ink"}`}
              onClick={() => setBestSellerTab("men")}
              suppressHydrationWarning
            >
              Men
            </button>
            <button
              className={`uppercase tracking-[0.14em] text-[13px] font-medium pb-[12px] px-2 transition-colors border-b-2 ${bestSellerTab === "gifts" ? "text-ink border-gold" : "text-stone border-transparent hover:text-ink"}`}
              onClick={() => setBestSellerTab("gifts")}
              suppressHydrationWarning
            >
              Gifts
            </button>
          </div>
        </div>
        <div className="flex overflow-x-auto ml-1 snap-x snap-mandatory gap-[16px] md:gap-[24px] pb-[16px] pt-4 -mx-[16px] px-[16px] md:mx-0 md:px-0 hide-scrollbar">
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
