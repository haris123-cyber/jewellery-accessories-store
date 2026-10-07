"use client";
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { type Product } from "@/lib/catalog";
import { useCommerceStore } from "@/store/commerce-store";

export function WishButton({ product }: { product: Product }) {
  const { wishlist, toggleWishlist } = useCommerceStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const active = mounted ? wishlist.includes(product.slug) : false;

  return (
    <button
      className="btn-icon !rounded-xl"
      aria-label={`${active ? "Remove" : "Save"} ${product.name}`}
      aria-pressed={active}
      suppressHydrationWarning
      onClick={(e) => {
        e.preventDefault();
        toggleWishlist(product.slug);
        toast(active ? "Removed from wishlist" : "Saved to wishlist");
      }}
    >
      <Heart fill={active ? "currentColor" : "none"} />
    </button>
  );
}
