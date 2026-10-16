"use client";

import React from "react";
import Image from "next/image";
import { toast } from "sonner";
import { ChevronRight, X, Heart, Trash2, Sparkles, Check, Tag } from "lucide-react";
import { Product } from "@/lib/catalog";
import { getUnsplashImage } from "@/components/shared/utils";
import { useCommerceStore } from "@/store/commerce-store";

/* -------------------------------------------------------------------------- */
/* 1. Added to Bag Toast                                                      */
/* -------------------------------------------------------------------------- */

export interface AddedToBagToastProps {
  toastId: string | number;
  product: Product;
  bundleTitle?: string;
  quantity?: number;
}

export function AddedToBagToast({
  toastId,
  product,
  bundleTitle,
  quantity = 1,
}: AddedToBagToastProps) {
  const setCartOpen = useCommerceStore((s) => s.setCartOpen);

  const handleViewBag = () => {
    toast.dismiss(toastId);
    setCartOpen(true);
  };

  const handleDismiss = () => {
    toast.dismiss(toastId);
  };

  const subtitle = `${quantity > 1 ? `${quantity}x ` : ""}${product.name}${
    bundleTitle ? ` (${bundleTitle})` : ""
  }`;

  return (
    <div
      role="status"
      aria-live="polite"
      data-custom-toast="true"
      className="added-to-bag-toast relative overflow-hidden w-[min(94vw,560px)] mx-auto bg-[#FAF7F2] border border-[#E7DFD3] rounded-[22px] shadow-[0_16px_40px_rgba(27,26,23,0.14),0_2px_8px_rgba(27,26,23,0.06)] p-3 sm:p-3.5 pl-3.5 pr-4 flex items-center gap-3 sm:gap-4 select-none"
    >
      {/* Decorative background confetti flakes */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0"
        aria-hidden="true"
      >
        <span className="absolute top-2 left-10 w-2 h-3.5 bg-[#E2C799]/55 rounded-[1px] rotate-[22deg]" />
        <span className="absolute bottom-2 left-28 w-2 h-3.5 bg-[#D8B67B]/50 rounded-[1px] -rotate-[38deg]" />
        <span className="absolute top-2.5 left-48 w-1.5 h-3 bg-[#E4CEAA]/60 rounded-[1px] rotate-[52deg]" />
        <span className="absolute bottom-2.5 left-[54%] w-2 h-3 bg-[#D8B67B]/45 rounded-[1px] rotate-[18deg]" />
        <span className="absolute top-2 right-24 w-1.5 h-3.5 bg-[#E4CEAA]/55 rounded-[1px] -rotate-[28deg]" />
        <span className="absolute bottom-2 right-12 w-2 h-3.5 bg-[#D8B67B]/50 rounded-[1px] rotate-[40deg]" />
        <span className="absolute top-3.5 left-[42%] text-[#C9A253]/60 text-[9px]">✦</span>
        <span className="absolute bottom-3 right-36 text-[#C9A253]/55 text-[10px]">✦</span>
      </div>

      {/* Product Image Thumbnail */}
      <div className="w-[52px] h-[52px] sm:w-[60px] sm:h-[60px] rounded-[16px] overflow-hidden bg-[#F3ECE0] border border-[#E8DFC8] shrink-0 relative flex items-center justify-center shadow-inner z-10">
        <Image
          src={product.image || getUnsplashImage(product.slug)}
          alt={product.name}
          fill
          className="object-cover"
          sizes="60px"
        />
      </div>

      {/* Center Details */}
      <div className="flex-1 min-w-0 pr-1 sm:pr-2 z-10">
        <div className="flex items-center gap-1.5 leading-tight">
          <h4 className="font-serif text-[16px] sm:text-[18.5px] font-medium text-[#1B1A17] tracking-normal m-0">
            Added to your bag
          </h4>
        </div>
        <p className="text-[12px] sm:text-[13px] font-sans text-[#635C50] font-normal truncate mt-0.5 m-0 leading-normal">
          {subtitle}
        </p>
      </div>

      {/* Primary Action Button: VIEW BAG */}
      <button
        type="button"
        onClick={handleViewBag}
        className="shrink-0 bg-[#0F3D2E] hover:bg-[#154E3B] active:bg-[#0A2A20] text-white text-[11px] sm:text-[12px] font-sans font-semibold tracking-[0.14em] uppercase px-4 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all flex items-center gap-1 shadow-[0_2px_8px_rgba(15,61,46,0.25)] active:scale-[0.98] cursor-pointer z-10"
      >
        <span>VIEW BAG</span>
        <ChevronRight className="w-3.5 h-3.5 stroke-[2.4]" />
      </button>

      {/* Close Button */}
      <button
        type="button"
        onClick={handleDismiss}
        className="absolute top-2 right-2 p-1 text-[#1B1A17]/40 hover:text-[#1B1A17] hover:bg-black/5 active:bg-black/10 rounded-full transition-colors z-20 cursor-pointer"
        aria-label="Close notification"
      >
        <X className="w-3.5 h-3.5 stroke-[2]" />
      </button>
    </div>
  );
}

export function showAddedToBagToast(
  product: Product,
  options?: {
    bundleTitle?: string;
    quantity?: number;
  }
) {
  return toast.custom(
    (id) => (
      <AddedToBagToast
        toastId={id}
        product={product}
        bundleTitle={options?.bundleTitle}
        quantity={options?.quantity}
      />
    ),
    {
      unstyled: true,
      className: "!bg-transparent !border-0 !border-none !p-0 !shadow-none !rounded-none !w-full !max-w-none flex justify-center",
      duration: 5000,
    }
  );
}

/* -------------------------------------------------------------------------- */
/* 2. Wishlist Toast (Added or Removed)                                       */
/* -------------------------------------------------------------------------- */

export interface WishlistToastProps {
  toastId: string | number;
  product: Product;
  action: "added" | "removed";
}

export function WishlistToast({
  toastId,
  product,
  action,
}: WishlistToastProps) {
  const handleViewWishlist = () => {
    toast.dismiss(toastId);
    window.location.href = "/wishlist";
  };

  const handleDismiss = () => {
    toast.dismiss(toastId);
  };

  const isAdded = action === "added";

  return (
    <div
      role="status"
      aria-live="polite"
      data-custom-toast="true"
      className="added-to-bag-toast relative overflow-hidden w-[min(94vw,560px)] mx-auto bg-[#FAF7F2] border border-[#E7DFD3] rounded-[22px] shadow-[0_16px_40px_rgba(27,26,23,0.14),0_2px_8px_rgba(27,26,23,0.06)] p-3 sm:p-3.5 pl-3.5 pr-4 flex items-center gap-3 sm:gap-4 select-none"
    >
      {/* Decorative background confetti flakes */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0"
        aria-hidden="true"
      >
        <span className="absolute top-2 left-10 w-2 h-3.5 bg-[#E2C799]/55 rounded-[1px] rotate-[22deg]" />
        <span className="absolute bottom-2 left-28 w-2 h-3.5 bg-[#D8B67B]/50 rounded-[1px] -rotate-[38deg]" />
        <span className="absolute top-2.5 left-48 w-1.5 h-3 bg-[#E4CEAA]/60 rounded-[1px] rotate-[52deg]" />
        <span className="absolute bottom-2.5 left-[54%] w-2 h-3 bg-[#D8B67B]/45 rounded-[1px] rotate-[18deg]" />
        <span className="absolute top-2 right-24 w-1.5 h-3.5 bg-[#E4CEAA]/55 rounded-[1px] -rotate-[28deg]" />
        <span className="absolute bottom-2 right-12 w-2 h-3.5 bg-[#D8B67B]/50 rounded-[1px] rotate-[40deg]" />
        <span className="absolute top-3.5 left-[42%] text-[#C9A253]/60 text-[9px]">✦</span>
        <span className="absolute bottom-3 right-36 text-[#C9A253]/55 text-[10px]">✦</span>
      </div>

      {/* Product Image Thumbnail with mini Heart Indicator */}
      <div className="w-[52px] h-[52px] sm:w-[60px] sm:h-[60px] rounded-[16px] overflow-hidden bg-[#F3ECE0] border border-[#E8DFC8] shrink-0 relative flex items-center justify-center shadow-inner z-10">
        <Image
          src={product.image || getUnsplashImage(product.slug)}
          alt={product.name}
          fill
          className="object-cover"
          sizes="60px"
        />
        <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-white/95 shadow-sm flex items-center justify-center z-20">
          <Heart
            className={`w-3 h-3 ${
              isAdded ? "fill-red-600 text-red-600" : "text-stone fill-none"
            }`}
          />
        </div>
      </div>

      {/* Center Details */}
      <div className="flex-1 min-w-0 pr-1 sm:pr-2 z-10">
        <div className="flex items-center gap-1.5 leading-tight">
          <h4 className="font-serif text-[16px] sm:text-[18.5px] font-medium text-[#1B1A17] tracking-normal m-0">
            {isAdded ? "Saved to your wishlist" : "Removed from wishlist"}
          </h4>
        </div>
        <p className="text-[12px] sm:text-[13px] font-sans text-[#635C50] font-normal truncate mt-0.5 m-0 leading-normal">
          {product.name}
        </p>
      </div>

      {/* Primary Action Button: VIEW WISHLIST */}
      <button
        type="button"
        onClick={handleViewWishlist}
        className="shrink-0 bg-[#0F3D2E] hover:bg-[#154E3B] active:bg-[#0A2A20] text-white text-[11px] sm:text-[12px] font-sans font-semibold tracking-[0.14em] uppercase px-4 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all flex items-center gap-1 shadow-[0_2px_8px_rgba(15,61,46,0.25)] active:scale-[0.98] cursor-pointer z-10"
      >
        <span>WISHLIST</span>
        <ChevronRight className="w-3.5 h-3.5 stroke-[2.4]" />
      </button>

      {/* Close Button */}
      <button
        type="button"
        onClick={handleDismiss}
        className="absolute top-2 right-2 p-1 text-[#1B1A17]/40 hover:text-[#1B1A17] hover:bg-black/5 active:bg-black/10 rounded-full transition-colors z-20 cursor-pointer"
        aria-label="Close notification"
      >
        <X className="w-3.5 h-3.5 stroke-[2]" />
      </button>
    </div>
  );
}

export function showWishlistToast(
  product: Product,
  action: "added" | "removed" = "added"
) {
  return toast.custom(
    (id) => (
      <WishlistToast toastId={id} product={product} action={action} />
    ),
    {
      unstyled: true,
      className: "!bg-transparent !border-0 !border-none !p-0 !shadow-none !rounded-none !w-full !max-w-none flex justify-center",
      duration: 4500,
    }
  );
}

/* -------------------------------------------------------------------------- */
/* 3. General App Notification Toast (Remove All, Cleared, Alerts, etc.)       */
/* -------------------------------------------------------------------------- */

export interface GeneralNotificationToastProps {
  toastId: string | number;
  title: string;
  description?: string;
  iconType?: "trash" | "heart" | "check" | "sparkles" | "tag";
  actionText?: string;
  actionUrl?: string;
  onAction?: () => void;
}

export function GeneralNotificationToast({
  toastId,
  title,
  description,
  iconType = "check",
  actionText,
  actionUrl,
  onAction,
}: GeneralNotificationToastProps) {
  const handleAction = () => {
    toast.dismiss(toastId);
    if (onAction) {
      onAction();
    } else if (actionUrl) {
      window.location.href = actionUrl;
    }
  };

  const handleDismiss = () => {
    toast.dismiss(toastId);
  };

  const renderIcon = () => {
    switch (iconType) {
      case "trash":
        return <Trash2 className="w-5 h-5 text-[#8E4A49] stroke-[1.8]" />;
      case "heart":
        return <Heart className="w-5 h-5 text-red-600 fill-red-600" />;
      case "sparkles":
        return <Sparkles className="w-5 h-5 text-[#C9A253] stroke-[1.8]" />;
      case "tag":
        return <Tag className="w-5 h-5 text-[#0F3D2E] stroke-[1.8]" />;
      default:
        return <Check className="w-5 h-5 text-[#0F3D2E] stroke-[2.2]" />;
    }
  };

  return (
    <div
      role="status"
      aria-live="polite"
      data-custom-toast="true"
      className="added-to-bag-toast relative overflow-hidden w-[min(94vw,560px)] mx-auto bg-[#FAF7F2] border border-[#E7DFD3] rounded-[22px] shadow-[0_16px_40px_rgba(27,26,23,0.14),0_2px_8px_rgba(27,26,23,0.06)] p-3 sm:p-3.5 pl-3.5 pr-4 flex items-center gap-3 sm:gap-4 select-none"
    >
      {/* Decorative background confetti flakes */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0"
        aria-hidden="true"
      >
        <span className="absolute top-2 left-10 w-2 h-3.5 bg-[#E2C799]/55 rounded-[1px] rotate-[22deg]" />
        <span className="absolute bottom-2 left-28 w-2 h-3.5 bg-[#D8B67B]/50 rounded-[1px] -rotate-[38deg]" />
        <span className="absolute top-2.5 left-48 w-1.5 h-3 bg-[#E4CEAA]/60 rounded-[1px] rotate-[52deg]" />
        <span className="absolute bottom-2.5 left-[54%] w-2 h-3 bg-[#D8B67B]/45 rounded-[1px] rotate-[18deg]" />
        <span className="absolute top-2 right-24 w-1.5 h-3.5 bg-[#E4CEAA]/55 rounded-[1px] -rotate-[28deg]" />
        <span className="absolute bottom-2 right-12 w-2 h-3.5 bg-[#D8B67B]/50 rounded-[1px] rotate-[40deg]" />
        <span className="absolute top-3.5 left-[42%] text-[#C9A253]/60 text-[9px]">✦</span>
        <span className="absolute bottom-3 right-36 text-[#C9A253]/55 text-[10px]">✦</span>
      </div>

      {/* Styled Icon Box */}
      <div className="w-[52px] h-[52px] sm:w-[60px] sm:h-[60px] rounded-[16px] bg-[#F3ECE0] border border-[#E8DFC8] shrink-0 flex items-center justify-center shadow-inner z-10">
        {renderIcon()}
      </div>

      {/* Center Details */}
      <div className="flex-1 min-w-0 pr-1 sm:pr-2 z-10">
        <div className="flex items-center gap-1.5 leading-tight">
          <h4 className="font-serif text-[16px] sm:text-[18.5px] font-medium text-[#1B1A17] tracking-normal m-0">
            {title}
          </h4>
        </div>
        {description && (
          <p className="text-[12px] sm:text-[13px] font-sans text-[#635C50] font-normal truncate mt-0.5 m-0 leading-normal">
            {description}
          </p>
        )}
      </div>

      {/* Action Button if specified */}
      {actionText && (
        <button
          type="button"
          onClick={handleAction}
          className="shrink-0 bg-[#0F3D2E] hover:bg-[#154E3B] active:bg-[#0A2A20] text-white text-[11px] sm:text-[12px] font-sans font-semibold tracking-[0.14em] uppercase px-4 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all flex items-center gap-1 shadow-[0_2px_8px_rgba(15,61,46,0.25)] active:scale-[0.98] cursor-pointer z-10"
        >
          <span>{actionText}</span>
          <ChevronRight className="w-3.5 h-3.5 stroke-[2.4]" />
        </button>
      )}

      {/* Close Button */}
      <button
        type="button"
        onClick={handleDismiss}
        className="absolute top-2 right-2 p-1 text-[#1B1A17]/40 hover:text-[#1B1A17] hover:bg-black/5 active:bg-black/10 rounded-full transition-colors z-20 cursor-pointer"
        aria-label="Close notification"
      >
        <X className="w-3.5 h-3.5 stroke-[2]" />
      </button>
    </div>
  );
}

export function showNotificationToast(props: {
  title: string;
  description?: string;
  iconType?: "trash" | "heart" | "check" | "sparkles" | "tag";
  actionText?: string;
  actionUrl?: string;
  onAction?: () => void;
  duration?: number;
}) {
  return toast.custom(
    (id) => (
      <GeneralNotificationToast
        toastId={id}
        title={props.title}
        description={props.description}
        iconType={props.iconType}
        actionText={props.actionText}
        actionUrl={props.actionUrl}
        onAction={props.onAction}
      />
    ),
    {
      unstyled: true,
      className: "!bg-transparent !border-0 !border-none !p-0 !shadow-none !rounded-none !w-full !max-w-none flex justify-center",
      duration: props.duration || 4500,
    }
  );
}
