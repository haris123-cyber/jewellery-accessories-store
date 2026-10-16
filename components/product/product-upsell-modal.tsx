"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Plus, ArrowRight } from "lucide-react";
import { Product, getProduct, money, products } from "@/lib/catalog";
import { useCommerceStore } from "@/store/commerce-store";
import { toast } from "sonner";
import { showAddedToBagToast } from "@/components/ui/added-to-bag-toast";
import { getUnsplashImage } from "@/components/shared/utils";

export interface UpsellItem {
  product: Product;
  customOfferBadge?: string;
  secondaryBadge?: string;
  savings?: number;
}

interface ProductUpsellModalProps {
  isOpen: boolean;
  onClose: () => void;
  mainProduct: Product;
  actionType: "add-to-bag" | "buy-now";
  mainQuantity?: number;
  mainSelectedBundle?: "single" | "pack2" | "pack3";
  onProceedCheckout?: () => void;
}

export function ProductUpsellModal({
  isOpen,
  onClose,
  mainProduct,
  actionType,
  mainQuantity = 1,
  mainSelectedBundle = "single",
  onProceedCheckout,
}: ProductUpsellModalProps) {
  const router = useRouter();
  const add = useCommerceStore((s) => s.add);

  // Compute complementary upsell recommendations for the current product
  const recommendedItems = useMemo<UpsellItem[]>(() => {
    const items: UpsellItem[] = [];

    // 1. High-frequency care add-on (Microfiber anti-tarnish polishing cloth)
    const clothProduct = getProduct("anti-tarnish-polishing-cloth");
    if (clothProduct && clothProduct.slug !== mainProduct.slug) {
      items.push({
        product: clothProduct,
        customOfferBadge: "Save ₹100",
        secondaryBadge: "BUY 1 GET 1",
        savings: 100,
      });
    }

    // 2. Complementary Jewellery piece that pairs with current jewellery piece
    let pairSlug = "sculpted-drop-earrings";
    const cat = mainProduct.category.toLowerCase();
    if (cat.includes("ring")) {
      pairSlug = "sculpted-drop-earrings";
    } else if (cat.includes("earring")) {
      pairSlug = "fine-line-necklace";
    } else if (cat.includes("necklace")) {
      pairSlug = "molten-signet-ring";
    } else if (cat.includes("bracelet")) {
      pairSlug = "molten-signet-ring";
    } else {
      pairSlug = "sculpted-drop-earrings";
    }

    if (pairSlug === mainProduct.slug) {
      pairSlug = "fine-line-necklace";
    }

    const pairProduct = getProduct(pairSlug);
    if (pairProduct && pairProduct.slug !== mainProduct.slug) {
      const savings =
        pairProduct.compareAtPrice && pairProduct.compareAtPrice > pairProduct.price
          ? pairProduct.compareAtPrice - pairProduct.price
          : 320;
      items.push({
        product: pairProduct,
        customOfferBadge: `Save ₹${savings}`,
        secondaryBadge: "PAIR WITH THIS",
        savings,
      });
    }

    // 3. Luxury travel jewelry box organizer
    const boxProduct = getProduct("velvet-travel-jewellery-box");
    if (boxProduct && boxProduct.slug !== mainProduct.slug) {
      items.push({
        product: boxProduct,
        customOfferBadge: "Save ₹300",
        secondaryBadge: "ESSENTIAL",
        savings: 300,
      });
    }

    // Top 2 match the reference UI layout
    return items.slice(0, 2);
  }, [mainProduct]);

  // Selected state: initialize with all items selected by default (matches reference screenshot)
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      setSelectedSlugs(recommendedItems.map((item) => item.product.slug));
    }
  }, [isOpen, recommendedItems]);

  const toggleItem = (slug: string) => {
    setSelectedSlugs((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  // Calculate total price of selected addons
  const selectedAddons = recommendedItems.filter((item) =>
    selectedSlugs.includes(item.product.slug)
  );

  const addonsTotal = selectedAddons.reduce(
    (sum, item) => sum + item.product.price,
    0
  );

  // Close with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock background scroll when modal is open
  useEffect(() => {
    if (!isOpen) return;

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    // Compensate for scrollbar disappearance on desktop to avoid layout shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [isOpen]);

  // Action handlers
  const handleAddSelected = () => {
    // Add all selected addons to bag
    selectedAddons.forEach((item) => {
      add(item.product.slug, 1);
    });

    if (actionType === "buy-now") {
      onClose();
      if (onProceedCheckout) {
        onProceedCheckout();
      } else {
        router.push("/checkout");
      }
    } else {
      if (selectedAddons.length > 0) {
        showAddedToBagToast(selectedAddons[0].product, {
          bundleTitle:
            selectedAddons.length > 1
              ? `+${selectedAddons.length - 1} add-on${selectedAddons.length > 2 ? "s" : ""}`
              : undefined,
          quantity: selectedAddons.length,
        });
      }
      onClose();
    }
  };

  const handleNoThanks = () => {
    onClose();
    if (actionType === "buy-now") {
      if (onProceedCheckout) {
        onProceedCheckout();
      } else {
        router.push("/checkout");
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center">
          {/* Backdrop */}
          <motion.div
            key="upsell-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-[3px]"
            onClick={onClose}
            onTouchMove={(e) => e.preventDefault()}
          />

          {/* Modal / Bottom Sheet Dialog */}
          <motion.div
            key="upsell-content"
            initial={{ y: "100%", opacity: 0.8 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 320 }}
            className="relative z-10 w-full max-w-[480px] bg-[linear-gradient(180deg,#FDFBF7_0%,#F9F4EB_100%)] sm:rounded-[32px] rounded-t-[32px] overflow-hidden shadow-[0_-12px_44px_rgba(0,0,0,0.22)] border-t sm:border border-[#EBE3D3] flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top-Right Decorative Floral Branch Watermark */}
            <div className="absolute top-0 right-0 w-44 h-44 pointer-events-none select-none opacity-[0.28] overflow-hidden z-0">
              <svg viewBox="0 0 180 180" fill="none" className="w-full h-full text-[#C8AD88]">
                <path d="M180 0C140 35 110 90 90 160" stroke="currentColor" strokeWidth="1.6" />
                <path d="M180 0C120 25 70 80 35 150" stroke="currentColor" strokeWidth="1.2" />
                <ellipse cx="140" cy="35" rx="20" ry="8" transform="rotate(-35 140 35)" fill="currentColor" />
                <ellipse cx="105" cy="65" rx="18" ry="7" transform="rotate(-40 105 65)" fill="currentColor" />
                <ellipse cx="70" cy="105" rx="18" ry="7" transform="rotate(-45 70 105)" fill="currentColor" />
                <ellipse cx="160" cy="70" rx="20" ry="8" transform="rotate(-25 160 70)" fill="currentColor" />
                <ellipse cx="120" cy="110" rx="18" ry="7" transform="rotate(-30 120 110)" fill="currentColor" />
              </svg>
            </div>

            {/* Bottom-Left Decorative Floral Branch Watermark */}
            <div className="absolute bottom-0 left-0 w-40 h-40 pointer-events-none select-none opacity-[0.25] overflow-hidden z-0">
              <svg viewBox="0 0 180 180" fill="none" className="w-full h-full text-[#C8AD88] transform rotate-180">
                <path d="M180 0C140 35 110 90 90 160" stroke="currentColor" strokeWidth="1.6" />
                <path d="M180 0C120 25 70 80 35 150" stroke="currentColor" strokeWidth="1.2" />
                <ellipse cx="140" cy="35" rx="20" ry="8" transform="rotate(-35 140 35)" fill="currentColor" />
                <ellipse cx="105" cy="65" rx="18" ry="7" transform="rotate(-40 105 65)" fill="currentColor" />
                <ellipse cx="70" cy="105" rx="18" ry="7" transform="rotate(-45 70 105)" fill="currentColor" />
              </svg>
            </div>

            {/* Grab Handle for mobile bottom sheet */}
            <div className="w-14 h-1 bg-[#D8CCB5] rounded-full mx-auto mt-3 mb-1.5 z-10" />

            {/* Header: X Close button on top-left, Centered Title & Subtitle */}
            <div className="relative pt-2 pb-2 px-5 sm:px-6 flex items-start justify-between z-10">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close recommendations"
                className="w-10 h-10 rounded-full border border-[#D5C7B0] bg-[#FAF7F2]/90 text-[#3A352F] hover:bg-white hover:border-[#B08D57] flex items-center justify-center transition-all cursor-pointer shadow-xs mt-0.5"
              >
                <X className="w-4 h-4 stroke-[2]" />
              </button>

              <div className="flex-1 text-center pr-10">
                <h3 className="font-serif text-[28px] sm:text-[31px] font-normal text-[#1A1815] tracking-tight leading-tight">
                  People also add these
                </h3>
                <p className="uppercase tracking-[0.22em] text-[10px] sm:text-[10.5px] font-semibold text-[#807668] mt-1">
                  POPULAR WITH WHAT YOU JUST ADDED
                </p>

                {/* Decorative Golden Floral Flourish */}
                <div className="flex items-center justify-center gap-2.5 my-2">
                  <div className="h-[1px] w-14 bg-gradient-to-r from-transparent to-[#C5A880]/70" />
                  <svg className="w-3.5 h-3.5 text-[#C5A880]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C12 7.5 7.5 12 2 12C7.5 12 12 16.5 12 22C12 16.5 16.5 12 22 12C16.5 12 12 7.5 12 2Z" />
                  </svg>
                  <div className="h-[1px] w-14 bg-gradient-to-l from-transparent to-[#C5A880]/70" />
                </div>
              </div>
            </div>

            {/* List of Addon Items */}
            <div className="px-4 sm:px-6 py-1 overflow-y-auto space-y-3.5 custom-scrollbar overscroll-contain z-10">
              {recommendedItems.map((item) => {
                const isChecked = selectedSlugs.includes(item.product.slug);
                return (
                  <div
                    key={item.product.slug}
                    onClick={() => toggleItem(item.product.slug)}
                    className={`relative flex items-center justify-between p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer select-none ${isChecked
                      ? "border-[#D1C2A5] bg-[#FDFBF7]/90 shadow-[0_4px_16px_rgba(209,194,165,0.18)] ring-1 ring-[#D1C2A5]/40"
                      : "border-[#E4D9C8]/80 bg-[#FAF7F2]/50 hover:bg-[#FDFBF7] hover:border-[#D1C2A5]/70"
                      }`}
                  >
                    {/* Left Checkbox & Thumbnail & Info */}
                    <div className="flex items-center gap-3 sm:gap-3.5 min-w-0 flex-1 pr-2">
                      {/* Checkbox circle */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleItem(item.product.slug);
                        }}
                        aria-label={
                          isChecked
                            ? `Deselect ${item.product.name}`
                            : `Select ${item.product.name}`
                        }
                        className={`w-[22px] h-[22px] rounded-full flex items-center justify-center shrink-0 transition-all ${isChecked
                          ? "bg-[#1E1714] text-[#FAF7F2] shadow-xs"
                          : "border-2 border-[#C7B9A2] bg-transparent hover:border-[#96836B]"
                          }`}
                      >
                        {isChecked && (
                          <Check className="w-3.5 h-3.5 stroke-[2.8]" />
                        )}
                      </button>

                      {/* Product Thumbnail */}
                      <div className="w-[72px] h-[72px] sm:w-[76px] sm:h-[76px] rounded-xl overflow-hidden bg-white shrink-0 relative border border-[#E0D7C6] shadow-xs">
                        <Image
                          src={item.product.image || getUnsplashImage(item.product.slug)}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="76px"
                        />
                      </div>

                      {/* Details: Title & Badges */}
                      <div className="flex flex-col min-w-0">
                        <h4 className="font-serif text-[16px] sm:text-[17px] font-medium text-[#1A1815] leading-snug line-clamp-2">
                          {item.product.name}
                        </h4>

                        <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                          {item.customOfferBadge && (
                            <span className="text-[11px] font-bold text-[#1F6B34] bg-[#EAF5EC] px-2 py-0.5 rounded-sm">
                              {item.customOfferBadge}
                            </span>
                          )}
                          {item.secondaryBadge && (
                            <span className="text-[9.5px] font-bold uppercase tracking-[0.1em] text-[#6E6455] bg-[#EFE8DC] px-2 py-0.5 rounded-sm">
                              {item.secondaryBadge}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right: Price */}
                    <div className="text-right shrink-0 pl-1">
                      <span className="font-serif text-[20px] sm:text-[22px] font-bold text-[#1A1815] tabular-nums">
                        {money(item.product.price)}
                      </span>
                      {item.product.compareAtPrice &&
                        item.product.compareAtPrice > item.product.price && (
                          <div className="text-[12px] sm:text-[13px] text-[#8C8476] line-through tabular-nums mt-0.5">
                            {money(item.product.compareAtPrice)}
                          </div>
                        )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Footer Section */}
            <div className="p-4 sm:p-6 bg-transparent border-t border-[#EAE1D1] mt-2 space-y-3 z-10">
              {/* Selected Count & Subtotal */}
              <div className="flex flex-col">
                <span className="text-[10px] sm:text-[10.5px] uppercase tracking-[0.18em] font-semibold text-[#807668]">
                  {selectedSlugs.length}{" "}
                  {selectedSlugs.length === 1 ? "ADD-ON SELECTED" : "ADD-ONS SELECTED"}
                </span>
                <span className="font-sans text-[20px] sm:text-[34px] font-bold text-[#1A1815] tabular-nums leading-none mt-1 mb-1 whitespace-nowrap inline-block">
                  {money(addonsTotal)}
                </span>
              </div>

              {/* Primary Action Button (Deep Luxury Eggplant/Espresso with Gold Border) */}
              <button
                type="button"
                onClick={handleAddSelected}
                className="w-full h-[52px] sm:h-[54px] rounded-2xl bg-[#281A28] hover:bg-[#342234] active:bg-[#201420] text-white border border-[#8B7355]/45 shadow-[0_4px_16px_rgba(40,26,40,0.3)] flex items-center justify-between px-6 transition-all cursor-pointer active:scale-[0.99]"
              >
                {selectedSlugs.length > 0 ? (
                  <>
                    <Plus className="w-4 h-4 stroke-[2.2] text-[#EFE7DC]" />
                    <span className="font-semibold text-[13px] sm:text-[13.5px] uppercase tracking-[0.18em] text-[#FAF7F2]">
                      {actionType === "buy-now"
                        ? `ADD SELECTED · ${money(addonsTotal)}`
                        : `ADD SELECTED · ${money(addonsTotal)}`}
                    </span>
                    <ArrowRight className="w-4 h-4 stroke-[2.2] text-[#EFE7DC]" />
                  </>
                ) : (
                  <>
                    <span />
                    <span className="font-semibold text-[13px] sm:text-[13.5px] uppercase tracking-[0.18em] text-[#FAF7F2]">
                      {actionType === "buy-now"
                        ? "CONTINUE TO CHECKOUT"
                        : "CONTINUE WITHOUT ADD-ONS"}
                    </span>
                    <ArrowRight className="w-4 h-4 stroke-[2.2] text-[#EFE7DC]" />
                  </>
                )}
              </button>

              {/* Secondary 'NO THANKS' link */}
              <div className="text-center pt-0.5">
                <button
                  type="button"
                  onClick={handleNoThanks}
                  className="text-[11px] sm:text-[11.5px] uppercase tracking-[0.22em] font-semibold text-[#7D7569] hover:text-[#1A1815] transition-colors cursor-pointer py-1"
                >
                  NO THANKS
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
