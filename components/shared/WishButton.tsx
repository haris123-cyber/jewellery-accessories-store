"use client";
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { type Product } from "@/lib/catalog";
import { useCommerceStore } from "@/store/commerce-store";

export function WishButton({
  product,
  className = "",
}: {
  product: Product;
  className?: string;
}) {
  const { wishlist, toggleWishlist } = useCommerceStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const active = mounted ? wishlist.includes(product.slug) : false;

  return (
    <button
      className={`btn-icon !rounded-full transition-all duration-200 active:scale-95 ${
        active ? "text-red-600" : "text-ink hover:text-red-500"
      } ${className}`}
      aria-label={`${active ? "Remove" : "Save"} ${product.name}`}
      aria-pressed={active}
      suppressHydrationWarning
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(product.slug);
        if (active) {
          toast("Removed from wishlist");
        } else {
          toast.success(`${product.name} saved to wishlist`);
        }
      }}
    >
      <Heart
        className={`w-5 h-5 transition-all duration-200 ${
          active ? "fill-red-600 text-red-600 scale-110" : "fill-none"
        }`}
      />
    </button>
  );
}
