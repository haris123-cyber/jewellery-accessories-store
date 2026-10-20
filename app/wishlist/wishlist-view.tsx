"use client";
import Image from "next/image";
import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { showAddedToBagToast, showWishlistToast, showNotificationToast } from "@/components/ui/app-toast";
import {
  ArrowRight,
  Camera,
  Check,
  ChevronDown,
  CircleCheck,
  CreditCard,
  Heart,
  Menu,
  Minus,
  PackageCheck,
  Plus,
  Search,
  ShieldCheck,
  ShoppingBag,
  SlidersHorizontal,
  Trash2,
  Truck,
  UserRound,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Toaster } from "@/components/ui/sonner";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  categories,
  getProduct,
  money,
  products,
  type Product,
} from "@/lib/catalog";
import { useCommerceStore } from "@/store/commerce-store";
import {
  ProductVisual,
  EditorialVisual,
  WishButton,
  ProductCard,
  ProductSection,
  Social,
  Newsletter,
  Filters,
  OrderSummary,
  Empty,
} from "@/components/shared";
import { Header, Footer, Shell, CartDrawer } from "@/components/layout";

export function Wishlist() {
  const router = useRouter();
  const { wishlist, toggleWishlist, add } = useCommerceStore();
  const list = products.filter((p) => wishlist.includes(p.slug));

  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isClearingAll, setIsClearingAll] = useState(false);

  const handleConfirmDelete = () => {
    if (!productToDelete) return;
    toggleWishlist(productToDelete.slug);
    showWishlistToast(productToDelete, "removed");
    setProductToDelete(null);
  };

  const handleConfirmClearAll = () => {
    list.forEach((p) => toggleWishlist(p.slug));
    showNotificationToast({
      title: "Wishlist Cleared",
      description: "All saved items have been removed from your wishlist",
      iconType: "trash",
      actionText: "EXPLORE SHOP",
      actionUrl: "/shop",
    });
    setIsClearingAll(false);
  };

  return (
    <Shell>
      <div className="px-[4vw] pb-[50px] pt-16 text-center max-[560px]:px-5 max-[560px]:pb-[35px] max-[560px]:pt-[50px]">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[.22em] text-accent">
          Saved for later
        </p>
        <h1 className="font-serif text-[clamp(48px,7vw,100px)] font-normal capitalize leading-[.95] tracking-[-.045em] text-foreground">
          Wishlist
        </h1>
        {list.length > 0 && (
          <p className="mt-3 text-[13px] text-stone">
            {list.length} {list.length === 1 ? "piece" : "pieces"} saved
          </p>
        )}
      </div>

      <div className="px-[3.5vw] pb-[clamp(70px,10vw,130px)] max-[560px]:px-4 max-w-[1400px] mx-auto w-full">
        {list.length ? (
          <div>
            {/* Header controls */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/80">
              <span className="text-[12px] uppercase tracking-[0.14em] font-medium text-stone">
                {list.length} {list.length === 1 ? "Item" : "Items"} in your wishlist
              </span>
              {list.length > 1 && (
                <button
                  type="button"
                  onClick={() => setIsClearingAll(true)}
                  className="text-[11px] uppercase tracking-[0.14em] text-stone hover:text-red-600 font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Clear Wishlist
                </button>
              )}
            </div>

            {/* Wishlist Items Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-[18px]">
              {list.map((p, i) => (
                <article
                  key={p.slug}
                  className="group/product flex flex-col relative w-full min-w-0 h-full bg-white border border-border/70 rounded-[8px] p-2.5 sm:p-3 shadow-xs hover:shadow-md transition-all duration-300"
                >
                  {/* Image container */}
                  <div className="relative aspect-[3/4] w-full rounded-[4px] overflow-hidden bg-sand mb-3">
                    <a href={`/product/${p.slug}`} className="block w-full h-full">
                      <ProductVisual
                        cell={p.cell}
                        name={p.name}
                        image={p.image}
                        priority={i < 4}
                      />
                    </a>

                    {/* Badge */}
                    {p.badge && (
                      <div className="absolute left-2.5 top-2.5 z-10">
                        <span className="bg-gold-soft text-ink text-[10px] uppercase tracking-[0.14em] font-semibold px-2 py-0.5 rounded-[2px]">
                          {p.badge}
                        </span>
                      </div>
                    )}

                    {/* Delete / Remove Button (Top Right) */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setProductToDelete(p);
                      }}
                      aria-label={`Remove ${p.name} from wishlist`}
                      title="Remove from wishlist"
                      className="absolute right-2.5 top-2.5 z-20 w-8 h-8 rounded-full bg-ivory/90 hover:bg-white text-stone hover:text-red-600 shadow-[0_2px_8px_rgba(0,0,0,0.1)] flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5 transition-colors" />
                    </button>

                    {/* Add to Bag Desktop Hover Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-2.5 translate-y-full opacity-0 transition-all duration-300 ease-out group-hover/product:translate-y-0 group-hover/product:opacity-100 hidden md:block z-10">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          add(p.slug);
                          showAddedToBagToast(p);
                        }}
                        className="w-full bg-ivory/95 backdrop-blur-sm border border-ink text-ink uppercase tracking-[0.14em] text-[11px] font-medium py-2.5 rounded-md hover:bg-ink hover:text-ivory transition-colors shadow-sm cursor-pointer"
                      >
                        {p.stock ? "Add to bag" : "Out of stock"}
                      </button>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="flex flex-col flex-1 min-w-0">
                    <h3 className="m-0 text-[13px] sm:text-[14px] font-medium font-sans text-ink leading-snug line-clamp-2 mb-1">
                      <a href={`/product/${p.slug}`} className="hover:text-gold transition-colors">
                        {p.name}
                      </a>
                    </h3>

                    <p className="text-[11px] sm:text-[12px] text-stone capitalize mb-2">
                      {p.category}
                    </p>

                    <div className="flex items-center gap-2 mb-3 mt-auto">
                      <span className="text-[13px] sm:text-[14px] font-semibold text-ink">
                        {money(p.price)}
                      </span>
                      {p.compareAtPrice && (
                        <del className="text-[11px] sm:text-[12px] text-stone">
                          {money(p.compareAtPrice)}
                        </del>
                      )}
                    </div>

                    {/* Actions Row */}
                    <div className="flex items-center gap-1.5 sm:gap-2 pt-2 border-t border-border/60 w-full min-w-0">
                      <button
                        type="button"
                        onClick={() => {
                          add(p.slug);
                          showAddedToBagToast(p);
                        }}
                        className="flex-1 min-w-0 h-[34px] sm:h-[36px] px-1 sm:px-2 bg-ink hover:bg-gold text-ivory text-[9.5px] sm:text-[11px] uppercase tracking-[0.06em] sm:tracking-[0.1em] font-medium rounded-[4px] transition-colors duration-200 flex items-center justify-center whitespace-nowrap cursor-pointer shadow-xs"
                      >
                        Add to Bag
                      </button>

                      <button
                        type="button"
                        onClick={() => setProductToDelete(p)}
                        aria-label={`Delete ${p.name}`}
                        title="Delete from wishlist"
                        className="w-[32px] sm:w-[36px] h-[34px] sm:h-[36px] border border-border/80 hover:border-red-400 hover:bg-red-50 text-stone hover:text-red-600 rounded-[4px] flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5 shrink-0" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : (
          <Empty
            title="Your wishlist is empty"
            copy="Save the pieces you want to return to."
            href="/shop"
            action="Explore collection"
          />
        )}
      </div>

      {/* Delete Item Confirmation Dialog */}
      <AlertDialog
        open={!!productToDelete}
        onOpenChange={(open) => !open && setProductToDelete(null)}
      >
        <AlertDialogContent className="w-[calc(100%-24px)] max-w-[400px] sm:max-w-[420px] rounded-[20px] sm:rounded-[24px] border border-[#E5E0D8] bg-[#FAF7F2] p-5 sm:p-7 shadow-2xl">
          <AlertDialogHeader className="flex flex-col items-center text-center sm:items-center sm:text-center sm:place-items-center w-full">
            <AlertDialogTitle className="flex items-center justify-center gap-2 sm:gap-2.5 font-serif text-[19px] sm:text-[24px] text-ink font-normal tracking-tight text-center">
              <Trash2 className="h-4.5 w-4.5 sm:h-5 sm:w-5 text-ink/80 stroke-[1.75] shrink-0" />
              <span>Remove from Wishlist?</span>
            </AlertDialogTitle>

            {productToDelete && (
              <div className="mt-3.5 w-full bg-white/95 border border-[#E5E0D8] rounded-[14px] sm:rounded-[16px] p-2.5 sm:p-3 flex items-center gap-3 text-left shadow-2xs">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-[8px] sm:rounded-[10px] overflow-hidden bg-sand shrink-0 border border-border/70">
                  <img
                    src={productToDelete.image}
                    alt={productToDelete.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-semibold text-ink truncate tracking-tight">
                    {productToDelete.name}
                  </p>
                  <p className="text-[12px] text-stone font-medium mt-0.5">
                    {money(productToDelete.price)}
                  </p>
                </div>
              </div>
            )}
            <AlertDialogDescription className="text-[12px] sm:text-[13px] text-stone mt-2.5 leading-relaxed text-center sm:text-center">
              Are you sure you want to remove this piece from your saved wishlist?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="mt-5 flex w-full flex-row gap-2.5 sm:gap-3 sm:flex-row sm:justify-stretch">
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="h-11 sm:h-12 min-h-[44px] sm:min-h-[48px] flex-1 rounded-md bg-ink text-ivory hover:bg-black text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.16em] font-semibold transition-all shadow-sm cursor-pointer flex items-center justify-center whitespace-nowrap"
            >
              Remove
            </AlertDialogAction>

            <AlertDialogCancel className="h-11 sm:h-12 min-h-[44px] sm:min-h-[48px] flex-1 rounded-md border border-[#DDD5C7] bg-transparent text-ink hover:bg-[#F0EBE3] text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.16em] font-semibold transition-all cursor-pointer flex items-center justify-center whitespace-nowrap">
              Cancel
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Clear All Confirmation Dialog */}
      <AlertDialog open={isClearingAll} onOpenChange={setIsClearingAll}>
        <AlertDialogContent className="w-[calc(100%-24px)] max-w-[400px] sm:max-w-[420px] rounded-[20px] sm:rounded-[24px] border border-[#E5E0D8] bg-[#FAF7F2] p-5 sm:p-7 shadow-2xl">
          <AlertDialogHeader className="flex flex-col items-center text-center sm:items-center sm:text-center sm:place-items-center w-full">
            <AlertDialogTitle className="flex items-center justify-center gap-2 sm:gap-2.5 font-serif text-[19px] sm:text-[24px] text-ink font-normal tracking-tight text-center">
              <Trash2 className="h-4.5 w-4.5 sm:h-5 sm:w-5 text-ink/80 stroke-[1.75] shrink-0" />
              <span>Clear Entire Wishlist?</span>
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[12px] sm:text-[13px] text-stone mt-2.5 leading-relaxed text-center sm:text-center">
              Are you sure you want to remove all {list.length} saved pieces from your wishlist? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-5 flex w-full flex-row gap-2.5 sm:gap-3 sm:flex-row sm:justify-stretch">
            <AlertDialogAction
              onClick={handleConfirmClearAll}
              className="h-11 sm:h-12 min-h-[44px] sm:min-h-[48px] flex-1 rounded-md bg-ink hover:bg-black text-ivory text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.16em] font-semibold transition-all shadow-sm cursor-pointer flex items-center justify-center whitespace-nowrap"
            >
              Clear All Items
            </AlertDialogAction>
            <AlertDialogCancel className="h-11 sm:h-12 min-h-[44px] sm:min-h-[48px] flex-1 rounded-md border border-[#DDD5C7] bg-transparent hover:bg-[#F0EBE3] text-ink text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.16em] font-semibold transition-all cursor-pointer flex items-center justify-center whitespace-nowrap">
              Cancel
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Shell>
  );
}
