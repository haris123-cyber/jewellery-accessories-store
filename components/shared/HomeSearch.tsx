"use client";

import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Sparkles, SlidersHorizontal, ArrowRight, Gem } from "lucide-react";
import { products, type Product } from "@/lib/catalog";
import { ProductCard } from "./ProductCard";
import { searchCatalogProducts } from "./SearchModal";

const HOME_SEARCH_TAGS = [
  { label: "✨ All Rings", query: "ring" },
  { label: "💎 Drop Earrings", query: "earring" },
  { label: "🌟 Molten Signet", query: "signet" },
  { label: "🏷️ Under ₹50K", query: "under 50k" },
  { label: "👑 Best Sellers", query: "best seller" },
  { label: "🎁 Gift Sets", query: "gift" },
  { label: "⌚ Watches", query: "watch" },
  { label: "✨ Necklaces", query: "necklace" },
];

export function HomeSearch() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Filter products based on active query using ranked matching
  const searchResults = useMemo(() => {
    return searchCatalogProducts(query, products);
  }, [query]);

  const handleTagClick = (tagLabel: string, tagQuery: string) => {
    if (activeTag === tagLabel && query === tagQuery) {
      // Toggle off
      setActiveTag(null);
      setQuery("");
    } else {
      setActiveTag(tagLabel);
      setQuery(tagQuery);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 100);
    }
  };

  const handleClear = () => {
    setQuery("");
    setActiveTag(null);
  };

  return (
    <section className="w-full max-w-[1280px] mx-auto px-[16px] md:px-[24px] py-4 md:py-6" id="search-section">
      <div className="relative overflow-hidden rounded-2xl border border-[#E6D8C5] bg-gradient-to-b from-[#FDFBF7] to-[#F5ECE1] p-4 sm:p-6 md:p-8 shadow-xs">
        
        {/* Subtle Decorative Accents */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#EBD8C1]/40 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-[#DFCEB7]/40 blur-3xl" />

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-2">
            <span className="h-px w-6 bg-gold/60" />
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-stone">
              Search the Collection
            </p>
            <span className="h-px w-6 bg-gold/60" />
          </div>

          {/* Heading */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-normal text-ink mb-4 sm:mb-6">
            Find your perfect piece
          </h2>

          {/* Search Input Bar */}
          <div className="w-full max-w-[680px] relative">
            <div className="relative flex items-center rounded-full bg-white border border-[#E0D1BF] shadow-sm transition-all focus-within:border-gold focus-within:ring-2 focus-within:ring-gold/20">
              <div className="pl-4 sm:pl-5 pr-2 text-stone">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gold shrink-0" strokeWidth={2} />
              </div>

              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveTag(null);
                }}
                placeholder="Search rings, necklaces, drop earrings, watches..."
                className="w-full bg-transparent py-3 sm:py-3.5 pr-3 text-sm sm:text-base font-serif text-ink placeholder:text-stone/60 placeholder:font-sans border-0 outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
              />

              {query && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="p-1.5 mr-1 rounded-full text-stone hover:text-ink hover:bg-stone/10 transition-colors"
                  aria-label="Clear search input"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  if (query.trim()) {
                    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
                  }
                }}
                className="my-1.5 mr-1.5 px-4 sm:px-6 py-2 rounded-full bg-ink hover:bg-ink/90 text-ivory text-xs font-medium uppercase tracking-wider transition-colors shrink-0"
              >
                Search
              </button>
            </div>
          </div>

          {/* Quick Search Tags */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 max-w-[760px]">
            <span className="text-[11px] font-medium uppercase tracking-wider text-stone/80 mr-1 hidden sm:inline-block">
              Popular:
            </span>
            {HOME_SEARCH_TAGS.map((t) => {
              const isSelected = activeTag === t.label;
              return (
                <button
                  key={t.label}
                  type="button"
                  onClick={() => handleTagClick(t.label, t.query)}
                  className={`px-3 py-1 rounded-full text-xs transition-all cursor-pointer ${
                    isSelected
                      ? "bg-gold-soft border border-gold text-ink font-medium shadow-xs"
                      : "bg-white/80 hover:bg-white text-stone hover:text-ink border border-[#E6D8C5]"
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Search Results (Animated Container) */}
        <AnimatePresence>
          {query.trim().length > 0 && (
            <motion.div
              ref={resultsRef}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 sm:mt-8 pt-6 border-t border-[#E6D8C5]"
            >
              {/* Results Bar */}
              <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
                <p className="text-xs uppercase tracking-[0.14em] text-stone font-medium">
                  Showing {searchResults.length}{" "}
                  {searchResults.length === 1 ? "result" : "results"} for &ldquo;{query}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleClear}
                    className="text-xs text-stone hover:text-ink underline transition-colors"
                  >
                    Clear search
                  </button>
                  <a
                    href={`/search?q=${encodeURIComponent(query)}`}
                    className="text-xs font-medium text-gold hover:text-ink flex items-center gap-1 transition-colors"
                  >
                    View in Search Page <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Grid of Results */}
              {searchResults.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                  {searchResults.map((product, i) => (
                    <div key={product.slug} className="w-full">
                      <ProductCard product={product} index={i} />
                    </div>
                  ))}
                </div>
              ) : (
                /* Empty State */
                <div className="py-10 text-center">
                  <Gem className="w-8 h-8 text-stone/40 mx-auto mb-2" strokeWidth={1.5} />
                  <p className="font-serif text-base text-ink">No pieces found matching &ldquo;{query}&rdquo;</p>
                  <p className="text-xs text-stone mt-1 max-w-[320px] mx-auto">
                    Try another search term or click one of the popular tags above.
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
