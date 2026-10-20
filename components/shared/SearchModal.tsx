"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, X, ArrowUpRight, ArrowRight } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { products, money, type Product } from "@/lib/catalog";
import { useCommerceStore } from "@/store/commerce-store";
import { getUnsplashImage } from "./utils";

const POPULAR_SEARCHES = [
  { label: "Rings", query: "ring" },
  { label: "Necklaces", query: "necklace" },
  { label: "Earrings", query: "earring" },
  { label: "Bracelets", query: "bracelet" },
];

/**
 * Intelligent, ranked search across the product catalogue.
 * Prioritizes name & category matches over secondary attributes.
 */
export function searchCatalogProducts(query: string, allProducts: Product[]): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  // Special alias: Under 50K
  if (/^under\s*₹?\s*50\s*,?\s*0*0*k?$/i.test(q) || q === "under 50k" || q === "under 50000") {
    return allProducts.filter((p) => p.price <= 50000);
  }

  // Special alias: Bestsellers
  if (["bestseller", "bestsellers", "best seller", "best sellers"].includes(q)) {
    return allProducts.filter((p) => p.badge?.toLowerCase().includes("best"));
  }

  // Singularize common plural searches (e.g., "rings" -> "ring")
  const normalizedQ = q.endsWith("s") && q.length > 3 ? q.slice(0, -1) : q;

  const scored: { product: Product; score: number }[] = [];

  for (const product of allProducts) {
    const name = product.name.toLowerCase();
    const category = product.category.toLowerCase();
    const material = product.material.toLowerCase();
    const badge = (product.badge || "").toLowerCase();

    let score = 0;

    // 1. Exact or prefix match on name (Highest priority)
    if (name === q || name === normalizedQ) {
      score += 100;
    } else if (name.startsWith(q) || name.startsWith(normalizedQ)) {
      score += 85;
    } else {
      // Check if any individual word in name starts with query
      const nameWords = name.split(/\s+/);
      if (nameWords.some((w) => w.startsWith(q) || w.startsWith(normalizedQ))) {
        score += 70;
      } else if (name.includes(q)) {
        score += 45;
      }
    }

    // 2. Category match
    if (category === q || category === normalizedQ) {
      score += 80;
    } else if (category.includes(q) || category.includes(normalizedQ)) {
      score += 40;
    }

    // 3. Material match (requires query of at least 3 characters or word match)
    const matWords = material.split(/\s+/);
    if (matWords.some((w) => w.startsWith(q) || w === q)) {
      score += 30;
    } else if (q.length >= 3 && material.includes(q)) {
      score += 15;
    }

    // 4. Badge match (e.g. "NEW", "LIMITED")
    if (badge.includes(q)) {
      score += 25;
    }

    // 5. Description match (only for specific queries with length >= 4)
    if (q.length >= 4 && product.description.toLowerCase().includes(q)) {
      score += 10;
    }

    if (score > 0) {
      scored.push({ product, score });
    }
  }

  // Sort by highest score first, then by rating
  return scored
    .sort((a, b) => b.score - a.score || b.product.rating - a.product.rating)
    .map((item) => item.product);
}

export function SearchModal() {
  const searchOpen = useCommerceStore((s) => s.searchOpen);
  const setSearchOpen = useCommerceStore((s) => s.setSearchOpen);
  const router = useRouter();

  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut: Cmd+K / Ctrl+K opens, Escape closes
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setSearchOpen]);

  // Lock all background scrolling completely (touch, wheel) while search is open
  useEffect(() => {
    if (!searchOpen) {
      setQuery("");
      return;
    }

    const preventBackgroundScroll = (e: WheelEvent | TouchEvent) => {
      const target = e.target as HTMLElement | null;
      // Allow scrolling ONLY inside elements with data-scrollable="true"
      const scrollable = target?.closest("[data-scrollable='true']");
      if (!scrollable) {
        if (e.cancelable) {
          e.preventDefault();
        }
      }
    };

    window.addEventListener("wheel", preventBackgroundScroll, { passive: false });
    window.addEventListener("touchmove", preventBackgroundScroll, { passive: false });

    const timer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 60);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("wheel", preventBackgroundScroll);
      window.removeEventListener("touchmove", preventBackgroundScroll);
    };
  }, [searchOpen]);

  // Filter products using ranked scoring
  const filteredProducts = useMemo(() => {
    return searchCatalogProducts(query, products);
  }, [query]);

  const closeSearch = () => setSearchOpen(false);

  const searchCatalog = () => {
    const value = query.trim();
    closeSearch();

    if (value) {
      router.push(`/search?q=${encodeURIComponent(value)}`);
    } else {
      router.push("/shop");
    }
  };

  const selectProduct = (slug: string) => {
    closeSearch();
    router.push(`/product/${slug}`);
  };

  const selectCategory = (value: string) => {
    setQuery(value);
    inputRef.current?.focus();
  };

  // Trap scroll within the scrollable container so it never chains to background
  const handleScrollTrap = (e: React.WheelEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const { scrollTop, scrollHeight, clientHeight } = el;
    const isUp = e.deltaY < 0;
    const isDown = e.deltaY > 0;
    if ((isUp && scrollTop <= 0) || (isDown && scrollTop + clientHeight >= scrollHeight - 1)) {
      e.preventDefault();
    }
  };

  return (
    <Sheet open={searchOpen} onOpenChange={setSearchOpen}>
      <SheetContent
        side="top"
        showCloseButton={false}
        className="!bg-[#FCFAF6] !p-0 !gap-0 !border-b !border-[#E7DCCB] !shadow-[0_24px_80px_rgba(0,0,0,0.25)] !max-h-[88vh] !overflow-hidden flex flex-col !z-[100]"
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Search jewellery</SheetTitle>
          <SheetDescription>
            Search products by keyword or category
          </SheetDescription>
        </SheetHeader>

        {/* Centered Content Container */}
        <div className="w-full max-w-[760px] mx-auto flex flex-col min-h-0 flex-1">
          {/* Search Input Row */}
          <div className="flex items-center gap-3 border-b border-[#EAE1D5] px-4 sm:px-6 bg-[#FCFAF6]">
            <Search
              className="h-5 w-5 shrink-0 text-[#A77B43]"
              strokeWidth={1.8}
            />

            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  searchCatalog();
                }
              }}
              placeholder="Search rings, necklaces, earrings, gold..."
              aria-label="Search products"
              autoComplete="off"
              spellCheck="false"
              className="h-[60px] sm:h-[68px] min-w-0 flex-1 bg-transparent font-sans text-[15px] sm:text-base text-[#29251F] border-0 outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-[#A49A8C]"
            />

            {/* Clear button when query exists */}
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  inputRef.current?.focus();
                }}
                aria-label="Clear search input"
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[#A49A8C] hover:bg-[#EAE1D5] hover:text-[#29251F] transition-colors cursor-pointer"
              >
                <X size={15} strokeWidth={2} />
              </button>
            )}

            {/* Modal close button */}
            <button
              type="button"
              onClick={closeSearch}
              aria-label="Close search"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#E7DCCB] bg-white/70 text-[#70665A] transition hover:bg-[#F0E9DE] hover:text-[#29251F] cursor-pointer"
            >
              <X size={17} strokeWidth={1.8} />
            </button>
          </div>

          {/* Popular Searches Tags */}
          <div className="flex flex-wrap items-center gap-1.5 border-b border-[#EAE1D5]/80 bg-[#F7F3EB]/60 px-4 py-3 sm:px-6">
            <span className="mr-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8C8071]">
              POPULAR:
            </span>

            {POPULAR_SEARCHES.map((item) => {
              const isActive = query.toLowerCase() === item.query.toLowerCase();
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => selectCategory(item.query)}
                  className={`rounded-full px-3 py-1 text-xs transition-colors cursor-pointer ${
                    isActive
                      ? "bg-[#29251F] text-[#FAF7F2] font-medium"
                      : "border border-[#E4D9C8] bg-white text-[#51483C] hover:border-[#B18A55] hover:bg-[#F6EFE4] hover:text-[#8B6638]"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Results Container (Scrollable) */}
          <div
            data-scrollable="true"
            onWheel={handleScrollTrap}
            className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-6 sm:py-5 max-h-[min(65vh,480px)] no-scrollbar"
          >
            {query.trim() ? (
              <>
                <div className="mb-3.5 flex items-center justify-between gap-3">
                  <p className="text-xs text-[#82786B]">
                    <span className="font-semibold text-[#29251F]">
                      {filteredProducts.length}
                    </span>{" "}
                    {filteredProducts.length === 1 ? "piece" : "pieces"} found for &ldquo;{query.trim()}&rdquo;
                  </p>

                  {filteredProducts.length > 0 && (
                    <button
                      type="button"
                      onClick={searchCatalog}
                      className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-[#98703D] hover:text-[#29251F] transition-colors cursor-pointer"
                    >
                      View all in Shop <ArrowRight size={13} />
                    </button>
                  )}
                </div>

                {filteredProducts.length > 0 ? (
                  <div className="space-y-2">
                    {filteredProducts.slice(0, 6).map((product) => {
                      const imageSrc = product.image || getUnsplashImage(product.slug);

                      return (
                        <button
                          key={product.slug}
                          type="button"
                          onClick={() => selectProduct(product.slug)}
                          className="group flex w-full items-center gap-3 rounded-xl border border-[#E7DCCB]/60 bg-white p-2.5 text-left transition-all hover:border-[#D7C09D] hover:bg-[#FFFDF9] hover:shadow-xs sm:gap-4 sm:p-3 cursor-pointer"
                        >
                          <div className="relative h-[64px] w-[58px] shrink-0 overflow-hidden rounded-lg bg-[#F0E9DE] sm:h-[72px] sm:w-[60px]">
                            <Image
                              src={imageSrc}
                              alt={product.name}
                              fill
                              sizes="60px"
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            {product.badge && (
                              <span className="absolute bottom-1 left-1 bg-[#E9DCC3] text-[#1B1A17] text-[8px] uppercase tracking-wider font-semibold px-1 rounded">
                                {product.badge}
                              </span>
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="mb-0.5 text-[9px] font-medium uppercase tracking-[0.15em] text-[#99836A]">
                              {product.category}
                            </p>

                            <h3 className="truncate font-serif text-[15px] text-[#29251F] transition-colors group-hover:text-[#98703D] sm:text-base">
                              {product.name}
                            </h3>

                            <div className="mt-1 flex flex-wrap items-center gap-2">
                              <span className="text-sm font-medium text-[#29251F]">
                                {money(product.price)}
                              </span>

                              {product.compareAtPrice && (
                                <span className="text-xs text-[#A49A8C] line-through">
                                  {money(product.compareAtPrice)}
                                </span>
                              )}
                            </div>
                          </div>

                          <ArrowUpRight
                            size={17}
                            strokeWidth={1.5}
                            className="mr-1 shrink-0 text-[#B1A391] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#98703D]"
                          />
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="py-10 text-center">
                    <Search
                      size={28}
                      strokeWidth={1.4}
                      className="mx-auto mb-3 text-[#B4A48E]"
                    />

                    <h3 className="font-serif text-lg text-[#29251F]">
                      No pieces found
                    </h3>

                    <p className="mx-auto mt-1 max-w-[280px] text-xs leading-5 text-[#82786B]">
                      We couldn&rsquo;t find anything matching &ldquo;{query}&rdquo;. Try another term or explore popular categories.
                    </p>

                    <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                      {["Rings", "Necklaces", "Earrings", "Watches"].map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => selectCategory(cat.toLowerCase())}
                          className="rounded-full border border-[#E7DCCB] bg-white px-3 py-1 text-xs text-[#29251F] hover:bg-[#F6EFE4] transition-colors cursor-pointer"
                        >
                          Browse {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* Default View: Suggested Pieces (Clean Minimalist List) */
              <>
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8C8071]">
                    SUGGESTED PIECES
                  </span>
                  <button
                    type="button"
                    onClick={searchCatalog}
                    className="text-xs text-[#98703D] hover:text-[#29251F] font-medium transition-colors cursor-pointer"
                  >
                    Browse all
                  </button>
                </div>

                <div className="space-y-1">
                  {products.slice(0, 4).map((product) => (
                    <button
                      key={product.slug}
                      type="button"
                      onClick={() => selectProduct(product.slug)}
                      className="group flex w-full items-center p-2.5 rounded-lg text-left transition hover:bg-[#F6EFE4] cursor-pointer"
                    >
                      <div className="min-w-0 flex-1">
                        <h4 className="truncate font-sans text-[14px] text-[#29251F] group-hover:text-[#98703D] transition-colors">
                          {product.name}
                        </h4>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
