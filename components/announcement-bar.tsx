"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

  const nextSlide = useCallback(() => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % announcements.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + announcements.length) % announcements.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 4500);
    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  const current = announcements[index];

  return (
    <div
      className="relative z-50 bg-[#0f3d2e] text-white border-b border-[#1b5541] select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Announcement"
      suppressHydrationWarning
    >
      <div className="max-w-7xl mx-auto h-[38px] px-3 sm:px-6 flex items-center justify-between text-xs tracking-wider" suppressHydrationWarning>
        {/* Left Arrow Button */}
        <button
          type="button"
          onClick={prevSlide}
          className="p-1 rounded-full text-emerald-200/80 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-1 focus:ring-emerald-300"
          aria-label="Previous announcement"
          suppressHydrationWarning
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Animated Text Container */}
        <div className="flex-1 overflow-hidden relative h-[26px] flex items-center justify-center mx-2 text-center" suppressHydrationWarning>
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={current.id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="inline-flex items-center justify-center gap-2 font-medium text-[11px] sm:text-[12px] tracking-[0.12em] uppercase truncate"
            >
              <span>{current.text}</span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Arrow Button */}
        <button
          type="button"
          onClick={nextSlide}
          className="p-1 rounded-full text-emerald-200/80 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-1 focus:ring-emerald-300"
          aria-label="Next announcement"
          suppressHydrationWarning
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
