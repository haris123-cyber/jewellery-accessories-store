"use client";
import Image from "next/image";
import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
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
    toast.success(`${productToDelete.name} removed from wishlist`);
    setProductToDelete(null);
  };

  const handleConfirmClearAll = () => {
    list.forEach((p) => toggleWishlist(p.slug));
    toast.success("Wishlist cleared");
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-[18px]">
              {list.map((p, i) => (
                <article
                  key={p.slug}
                  className="group/product flex flex-col relative w-full h-full bg-white border border-border/70 rounded-[8px] p-3 shadow-xs hover:shadow-md transition-all duration-300"
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
                          toast.success(`${p.name} added to your bag`, {
                            action: {
                              label: "View Bag",
                              onClick: () => router.push("/cart"),
                            },
                          });
                        }}
                        className="w-full bg-ivory/95 backdrop-blur-sm border border-ink text-ink uppercase tracking-[0.14em] text-[11px] font-medium py-2.5 rounded-md hover:bg-ink hover:text-ivory transition-colors shadow-sm cursor-pointer"
                      >
                        {p.stock ? "Add to bag" : "Out of stock"}
                      </button>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="flex flex-col flex-1">
                    <h3 className="m-0 text-[14px] font-medium font-sans text-ink leading-snug line-clamp-2 mb-1">
                      <a href={`/product/${p.slug}`} className="hover:text-gold transition-colors">
                        {p.name}
                      </a>
                    </h3>

                    <p className="text-[12px] text-stone capitalize mb-2">
                      {p.category}
                    </p>

                    <div className="flex items-center gap-2 mb-3 mt-auto">
                      <span className="text-[14px] font-semibold text-ink">
                        {money(p.price)}
                      </span>
                      {p.compareAtPrice && (
                        <del className="text-[12px] text-stone">
                          {money(p.compareAtPrice)}
                        </del>
                      )}
                    </div>

                    {/* Actions Row */}
                    <div className="flex items-center gap-2 pt-2 border-t border-border/60">
                      <button
                        type="button"
                        onClick={() => {
                          add(p.slug);
                          toast.success(`${p.name} added to your bag`, {
                            action: {
                              label: "View Bag",
                              onClick: () => router.push("/cart"),
                            },
                          });
                        }}
                        className="btn-primary flex-1 h-[36px] text-[11px] uppercase tracking-[0.12em] font-medium rounded-[4px]"
                      >
                        Add to Bag
                      </button>
                      <button
                        type="button"
                        onClick={() => setProductToDelete(p)}
                        aria-label={`Delete ${p.name}`}
                        title="Delete from wishlist"
                        className="w-[36px] h-[36px] border border-border/80 hover:border-red-400 hover:bg-red-50 text-stone hover:text-red-600 rounded-[4px] flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
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
        <AlertDialogContent className="sm:max-w-[420px] rounded-[24px] border border-[#E5E0D8] bg-[#FAF7F2] p-6 sm:p-7 shadow-2xl">
          <AlertDialogHeader className="flex flex-col items-center text-center">
            <div className="w-13 h-13 rounded-full bg-sand/80 border border-[#DDD5C7] text-ink flex items-center justify-center mb-2.5 shadow-2xs">
              <Trash2 className="w-5 h-5 text-ink/80 stroke-[1.75]" />
            </div>
            <AlertDialogTitle className="font-serif text-[22px] sm:text-[24px] text-ink font-normal tracking-tight">
              Remove from Wishlist?
            </AlertDialogTitle>
            {productToDelete && (
              <div className="mt-3.5 w-full bg-white/95 border border-[#E5E0D8] rounded-[16px] p-3 flex items-center gap-3.5 text-left shadow-2xs">
                <div className="w-14 h-14 rounded-[10px] overflow-hidden bg-sand shrink-0 border border-border/70">
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
            <AlertDialogDescription className="text-[13px] text-stone mt-2.5 leading-relaxed text-center">
              Are you sure you want to remove this piece from your saved wishlist?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-col-reverse gap-2.5 mt-5 w-full shrink-0">
            <AlertDialogCancel className="w-full h-[48px] min-h-[48px] shrink-0 rounded-full border border-border/90 bg-transparent hover:bg-sand/50 text-ink text-[11px] uppercase tracking-[0.16em] font-semibold transition-all cursor-pointer flex items-center justify-center">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="w-full h-[48px] min-h-[48px] shrink-0 rounded-full bg-ink hover:bg-black text-ivory text-[11px] uppercase tracking-[0.16em] font-semibold transition-all shadow-sm cursor-pointer flex items-center justify-center"
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Clear All Confirmation Dialog */}
      <AlertDialog open={isClearingAll} onOpenChange={setIsClearingAll}>
        <AlertDialogContent className="sm:max-w-[420px] rounded-[24px] border border-[#E5E0D8] bg-[#FAF7F2] p-6 sm:p-7 shadow-2xl">
          <AlertDialogHeader className="flex flex-col items-center text-center">
            <div className="w-13 h-13 rounded-full bg-sand/80 border border-[#DDD5C7] text-ink flex items-center justify-center mb-2.5 shadow-2xs">
              <Trash2 className="w-5 h-5 text-ink/80 stroke-[1.75]" />
            </div>
            <AlertDialogTitle className="font-serif text-[22px] sm:text-[24px] text-ink font-normal tracking-tight">
              Clear Entire Wishlist?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[13px] text-stone mt-2.5 leading-relaxed text-center">
              Are you sure you want to remove all {list.length} saved pieces from your wishlist? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-col-reverse gap-2.5 mt-5 w-full shrink-0">
            <AlertDialogCancel className="w-full h-[48px] min-h-[48px] shrink-0 rounded-full border border-border/90 bg-transparent hover:bg-sand/50 text-ink text-[11px] uppercase tracking-[0.16em] font-semibold transition-all cursor-pointer flex items-center justify-center">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmClearAll}
              className="w-full h-[48px] min-h-[48px] shrink-0 rounded-full bg-ink hover:bg-black text-ivory text-[11px] uppercase tracking-[0.16em] font-semibold transition-all shadow-sm cursor-pointer flex items-center justify-center"
            >
              Clear All Items
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Shell>
  );
}
