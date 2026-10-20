"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { showAddedToBagToast } from "@/components/ui/added-to-bag-toast";
import { Plus, PlusSquare, ShoppingBag, Star, StarHalf, BadgePercent } from "lucide-react";
import { money, type Product } from "@/lib/catalog";
import { useCommerceStore } from "@/store/commerce-store";
import { ProductVisual } from "./ProductVisual";
import { WishButton } from "./WishButton";

export function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const add = useCommerceStore((s) => s.add);
  const router = useRouter();

  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  return (
    <motion.article
      className="relative min-w-0 group/product flex flex-col h-full bg-ivory"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: Math.min(index * 0.035, 0.2) }}
    >
      {discount > 0 ? (
        <span className="absolute left-1/2 -top-2 z-20 flex gap-2 -translate-x-1/2 bg-red-700 text-white -translate-y-[25%] whitespace-nowrap rounded-[6px] border border-ink/10 bg-blush px-4 py-2 text-[9px] font-medium uppercase tracking-[.2em] text-ink shadow-[0_4px_12px_rgba(27,26,23,.12)]">
          <BadgePercent className="w-4 h-4 text-white" /> Limited Offer
        </span>
      ) : null}
      <a href={`/product/${product.slug}`} className="block mb-4 font-sans relative overflow-hidden rounded-[4px]">
        <ProductVisual
          cell={product.cell}
          name={product.name}
          image={product.image}
          priority={index < 2}
        />

        {/* Badges */}
        <div className="absolute left-3 top-5 z-10 flex flex-col gap-1.5 items-start">
          {product.badge && (
            <span className="bg-gold-soft text-ink text-[11px] uppercase tracking-[0.14em] font-medium px-2 py-1 rounded-[2px]">
              {product.badge}
            </span>
          )}
          {product.limitedEdition && product.badge?.toLowerCase() !== "limited edition" && (
            <span className="bg-gold-soft text-ink text-[11px] uppercase tracking-[0.14em] font-medium px-2 py-1 rounded-[2px]">
              Limited Edition
            </span>
          )}
        </div>

        <div className="absolute right-3 top-3 z-10">
          <WishButton product={product} />
        </div>

        {/* Add to Bag Desktop Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full opacity-0 transition-all duration-300 ease-out group-hover/product:translate-y-0 group-hover/product:opacity-100 hidden md:block z-10">
          <button
            suppressHydrationWarning
            className="w-full bg-ivory/95 backdrop-blur-sm border border-ink text-ink uppercase tracking-[0.14em] text-[12px] font-medium py-3 rounded-md hover:bg-ink hover:text-ivory transition-colors"
            onClick={(e) => {
              e.preventDefault();
              add(product.slug);
              showAddedToBagToast(product);
            }}
          >
            {product.stock ? "Add to bag" : "Out of stock"}
          </button>
        </div>
      </a>

      <div className="flex flex-col flex-1 relative">
        <h3 className="m-0 text-[15px] font-medium font-sans text-ink leading-[1.4] line-clamp-2 mb-0 -mt-2">
          <a href={`/product/${product.slug}`}>{product.name}</a>
        </h3>


        {product.rating > 0 && (
          <div className="flex items-center gap-1.5 mb-0">
            <div className="flex items-center text-gold">
              <Star className="w-[14px] fill-current" />
              <Star className="w-[14px] fill-current" />
              <Star className="w-[14px] fill-current" />
              <Star className="w-[14px] fill-current" />
              <StarHalf className="w-[14px] fill-current" />
            </div>
            <span className="text-[12px] text-stone font-medium">(24)</span>
          </div>
        )}

        <div className="flex items-center justify-between -mt-0">
          <div className="flex items-center gap-2">
            <span className="text-[15px] font-medium text-ink tabular-nums">{money(product.price)}</span>
            {product.compareAtPrice && (
              <del className="text-[15px] text-stone tabular-nums">{money(product.compareAtPrice)}</del>
            )}
          </div>
          {/* Mobile Cart Icon */}
          <button
            suppressHydrationWarning
            className="btn-icon w-8 h-8 mr-2  md:hidden shadow-sm !rounded-md bg-[gray]/900"
            aria-label="Add to cart"
            onClick={(e) => {
              e.preventDefault();
              add(product.slug);
              showAddedToBagToast(product);
            }}
          >
            <Plus className="w-5 h-5 text-white " />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
