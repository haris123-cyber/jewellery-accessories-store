"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { showNotificationToast } from "@/components/ui/app-toast";

interface AnnouncementItem {
  id: string;
  text: string;
  badge?: string;
  code?: string;
}

const announcements: AnnouncementItem[] = [
  {
    id: "welcome",
    text: "USE WELOCOM10 CODE TO 10% OFF ON EVERY PRODUCT",
    code: "WELOCOM10",
  },
  {
    id: "shipping",
    text: "COMPLIMENTARY WORLDWIDE EXPRESS SHIPPING OVER $150",
  },
  {
    id: "craft",
    text: "NEW ARRIVALS: HANDCRAFTED 18K GOLD & STERLING SILVER",
  },
];

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isPaused, setIsPaused] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [marqueeDuration, setMarqueeDuration] = useState("16s");

  const containerRef = useRef<HTMLDivElement>(null);
  const textMeasureRef = useRef<HTMLSpanElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % announcements.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + announcements.length) % announcements.length);
  }, []);

  const current = announcements[index];

  // Measure overflow accurately by comparing hidden single text width with container width
  const checkOverflow = useCallback(() => {
    if (containerRef.current && textMeasureRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const textWidth = textMeasureRef.current.offsetWidth;
      const overflowing = textWidth > containerWidth - 8;
      setIsOverflowing(overflowing);

      if (overflowing && textWidth > 0) {
        // Comfortable luxury reading speed: ~28-32 px/s
        const durationSec = Math.max(13, Math.round((textWidth + 48) / 30));
        setMarqueeDuration(`${durationSec}s`);
      }
    }
  }, []);

  useEffect(() => {
    checkOverflow();
    const timer = setTimeout(checkOverflow, 50);

    const handleResize = () => checkOverflow();
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, [index, checkOverflow]);

  // Auto-slide timer: gives extra reading time when marquee scrolling
  useEffect(() => {
    if (isPaused) return;

    const slideDuration = isOverflowing ? 12000 : 4500;
    const timer = setInterval(() => {
      nextSlide();
    }, slideDuration);

    return () => clearInterval(timer);
  }, [nextSlide, isPaused, isOverflowing]);

  // Mobile touch interactions: pause on touch, swipe left/right to change slides
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current !== null && touchStartY.current !== null) {
      const diffX = e.changedTouches[0].clientX - touchStartX.current;
      const diffY = e.changedTouches[0].clientY - touchStartY.current;

      // Only trigger if horizontal swipe is intentional
      if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0) {
          prevSlide();
        } else {
          nextSlide();
        }
      }
      touchStartX.current = null;
      touchStartY.current = null;
    }
    setIsPaused(false);
  };

  const handleCopyCode = (code?: string) => {
    if (!code) return;
    try {
      navigator.clipboard?.writeText(code);
      showNotificationToast({
        title: `Code "${code}" Copied!`,
        description: "Apply at checkout to enjoy your discount",
        iconType: "tag",
        actionText: "EXPLORE",
        actionUrl: "/shop",
      });
    } catch {
      // Fallback if clipboard permission is denied
    }
  };

  return (
    <div
      className="relative z-50 bg-[#0f3d2e] text-white border-b border-[#1b5541] select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={() => setIsPaused(false)}
      role="region"
      aria-label="Announcement"
      suppressHydrationWarning
    >
      {/* Hidden off-screen span used to calculate exact text width without truncation */}
      <span
        ref={textMeasureRef}
        className="invisible absolute top-0 left-0 -z-50 pointer-events-none whitespace-nowrap font-medium text-[11px] sm:text-[12px] tracking-[0.12em] uppercase"
        aria-hidden="true"
      >
        {current.text}
      </span>

      <div
        className="max-w-7xl mx-auto h-[38px] px-2 sm:px-6 flex items-center justify-between text-xs tracking-wider"
        suppressHydrationWarning
      >
        {/* Left Arrow Button */}
        <button
          type="button"
          onClick={prevSlide}
          className="relative z-10 w-7 h-7 flex items-center justify-center rounded-full text-emerald-200/90 hover:text-white hover:bg-white/10 active:bg-white/20 transition-colors focus:outline-none focus:ring-1 focus:ring-emerald-300 shrink-0"
          aria-label="Previous announcement"
          suppressHydrationWarning
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Animated Text Container with smooth edge fade when scrolling */}
        <div
          ref={containerRef}
          className="flex-1 overflow-hidden relative h-[28px] flex items-center mx-1 sm:mx-2"
          style={
            isOverflowing
              ? {
                  maskImage:
                    "linear-gradient(to right, transparent, black 24px, black calc(100% - 24px), transparent)",
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent, black 24px, black calc(100% - 24px), transparent)",
                }
              : undefined
          }
          suppressHydrationWarning
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={current.id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -30 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={`w-full flex items-center text-[11px] sm:text-[12px] tracking-[0.12em] uppercase ${
                isOverflowing ? "justify-start" : "justify-center text-center"
              }`}
            >
              {isOverflowing ? (
                /* Auto-scrolling continuous marquee when content overflows */
                <div
                  className={`inline-flex items-center will-change-transform animate-announcement-marquee ${
                    current.code ? "cursor-pointer" : ""
                  }`}
                  style={{
                    animationPlayState: isPaused ? "paused" : "running",
                    animationDuration: marqueeDuration,
                  }}
                  onClick={() => handleCopyCode(current.code)}
                  title={current.code ? `Tap to copy code: ${current.code}` : undefined}
                >
                  {/* First Track Copy */}
                  <div className="inline-flex items-center shrink-0">
                    <span className="font-medium">{current.text}</span>
                    <span
                      className="mx-6 text-emerald-400/80 text-[10px] select-none"
                      aria-hidden="true"
                    >
                      ✦
                    </span>
                  </div>

                  {/* Second Track Copy for Seamless Continuous Loop */}
                  <div className="inline-flex items-center shrink-0" aria-hidden="true">
                    <span className="font-medium">{current.text}</span>
                    <span className="mx-6 text-emerald-400/80 text-[10px] select-none">
                      ✦
                    </span>
                  </div>
                </div>
              ) : (
                /* Centered static display when content fits comfortably */
                <div
                  className={`inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap ${
                    current.code
                      ? "cursor-pointer hover:text-emerald-200 transition-colors"
                      : ""
                  }`}
                  onClick={() => handleCopyCode(current.code)}
                  title={current.code ? `Tap to copy code: ${current.code}` : undefined}
                >
                  <span>{current.text}</span>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Arrow Button */}
        <button
          type="button"
          onClick={nextSlide}
          className="relative z-10 w-7 h-7 flex items-center justify-center rounded-full text-emerald-200/90 hover:text-white hover:bg-white/10 active:bg-white/20 transition-colors focus:outline-none focus:ring-1 focus:ring-emerald-300 shrink-0"
          aria-label="Next announcement"
          suppressHydrationWarning
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
