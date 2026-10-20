"use client";

import * as React from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface BannerSlide {
  id: string;
  image: string;
  alt: string;
  href: string;
  title: string;
}

const defaultBanners: BannerSlide[] = [
  {
    id: "banner-1",
    image: "/images/banners/image copy 4.png",
    alt: "WOXLY Timeless Jewellery Collection",
    href: "/shop?category=jewellery",
    title: "Timeless Jewellery",
  },
  {
    id: "banner-2",
    image: "/images/banners/image copy 5.png",
    alt: "WOXLY Timeless Watches Collection",
    href: "/shop?category=watches",
    title: "Timeless Watches",
  },
  {
    id: "banner-3",
    image: "/images/banners/image copy 2.png",
    alt: "WOXLY Iconic Essentials Collection",
    href: "/shop?category=bags",
    title: "Iconic Essentials",
  },
  {
    id: "banner-4",
    image: "/images/banners/image copy 6.png",
    alt: "WOXLY Statement Pieces Collection",
    href: "/shop?category=jewellery",
    title: "Statement Jewellery",
  },
];

interface HeroBannerCarouselProps {
  banners?: BannerSlide[];
  autoPlayInterval?: number;
}

export function HeroBannerCarousel({
  banners = defaultBanners,
  autoPlayInterval = 4500,
}: HeroBannerCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
    containScroll: false,
  });

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);

  // Sync selected index with Embla scroll snaps
  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Autoplay functionality with smooth pause on touch/hover
  React.useEffect(() => {
    if (!emblaApi || isPaused) return;

    const timer = setInterval(() => {
      emblaApi.scrollNext();
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [emblaApi, isPaused, autoPlayInterval]);

  const scrollPrev = React.useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = React.useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  return (
    <section
      aria-label="Featured collections"
      className="relative w-full max-w-[1280px] mx-auto px-[16px] md:px-[24px] py-4 md:py-8 overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Embla Viewport */}
      <div ref={emblaRef} className="w-full overflow-hidden rounded-2xl cursor-grab active:cursor-grabbing">
        {/* Embla Container */}
        <div className="flex touch-pan-y -ml-3 md:-ml-4">
          {banners.map((banner, index) => {
            const isCurrent = selectedIndex === index;
            return (
              <div
                key={banner.id}
                className="min-w-0 shrink-0 grow-0 basis-[84%] sm:basis-[72%] md:basis-[540px] lg:basis-[580px] pl-3 md:pl-4"
              >
                <a
                  href={banner.href}
                  className={`group relative block w-full overflow-hidden rounded-2xl shadow-sm transition-all duration-300 ${
                    isCurrent ? "opacity-100 scale-100" : "opacity-75 sm:opacity-85 scale-[0.98]"
                  }`}
                  aria-label={banner.alt}
                >
                  <div className="relative aspect-[2/3] w-full overflow-hidden rounded-2xl bg-[#EFE8DC]">
                    <Image
                      src={banner.image}
                      alt={banner.alt}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 640px) 84vw, (max-width: 1024px) 72vw, 600px"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </div>

      {/* Desktop Navigation Arrows */}
      <div className="pointer-events-none absolute inset-0 hidden md:flex items-center justify-between px-4 lg:px-8">
        <button
          type="button"
          onClick={scrollPrev}
          aria-label="Previous slide"
          className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[#1B1A17] shadow-md backdrop-blur-sm transition-all duration-200 hover:bg-white hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#B08D57]"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          type="button"
          onClick={scrollNext}
          aria-label="Next slide"
          className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[#1B1A17] shadow-md backdrop-blur-sm transition-all duration-200 hover:bg-white hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#B08D57]"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Premium Indicators */}
      <div className="mt-4 md:mt-6 flex items-center justify-center gap-2">
        {banners.map((banner, index) => {
          const isSelected = selectedIndex === index;
          return (
            <button
              key={banner.id}
              type="button"
              aria-label={`Go to ${banner.title}`}
              aria-current={isSelected ? "true" : undefined}
              onClick={() => scrollTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ease-out cursor-pointer p-0 border-0 ${
                isSelected
                  ? "w-8 bg-[#153D32]"
                  : "w-2 bg-[#D5C5A5] hover:bg-[#B08D57]"
              }`}
            />
          );
        })}
      </div>
    </section>
  );
}
