"use client";
import { ChevronDown } from "lucide-react";
import { categories, products } from "@/lib/catalog";
import { Slider } from "@/components/ui/slider";

export function Filters({
  selectedCategories = [],
  onCategoryChange,
  inStock = false,
  onInStockChange,
  priceRange = [0, 100000],
  onPriceRangeChange,
  selectedColors = [],
  onColorChange,
  selectedSizes = [],
  onSizeChange,
  selectedMaterials = [],
  onMaterialChange,
}: {
  selectedCategories?: string[];
  onCategoryChange?: (category: string) => void;
  inStock?: boolean;
  onInStockChange?: (inStock: boolean) => void;
  priceRange?: [number, number];
  onPriceRangeChange?: (range: [number, number]) => void;
  selectedColors?: string[];
  onColorChange?: (color: string) => void;
  selectedSizes?: string[];
  onSizeChange?: (size: string) => void;
  selectedMaterials?: string[];
  onMaterialChange?: (material: string) => void;
} = {}) {
  // Derive unique colors and materials from products
  const uniqueColors = Array.from(new Set(products.flatMap((p) => p.colors)));
  const uniqueMaterials = Array.from(new Set(products.map((p) => p.material)));
  const uniqueSizes = ["XS", "S", "M", "L", "XL"]; // Dummy data for size

  return (
    <div>
      {[
        "Category",
        "Price",
        "Color",
        "Size",
        "Material",
        "Availability",
      ].map((item, i) => (
        <details key={item} open={i === 0 || i === 1 || i === 5} className="border-b border-border group">
          <summary className="min-h-[56px] flex justify-between items-center list-none cursor-pointer text-[13px] uppercase tracking-[0.14em] font-medium text-ink [&::-webkit-details-marker]:hidden">
            {item}
            <ChevronDown className="w-[18px] text-stone transition-transform group-open:-rotate-180" />
          </summary>
          <div className="grid gap-3 pb-[24px] text-stone text-[15px]">
            {i === 0 ? (
              categories.slice(0, 6).map((c) => (
                <label key={c.slug} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(c.slug)}
                    onChange={() => onCategoryChange?.(c.slug)}
                    className="w-[18px] h-[18px] accent-gold border-border rounded-[2px]"
                  />{" "}
                  {c.label}
                </label>
              ))
            ) : i === 1 ? (
              <div className="flex flex-col gap-6 pt-4 pb-2 px-1">
                <Slider
                  min={0}
                  max={100000}
                  step={100}
                  value={priceRange}
                  onValueChange={(val: any) => onPriceRangeChange?.(val as [number, number])}
                  className="[&_[data-slot=slider-range]]:bg-[#2563EB] [&_[data-slot=slider-thumb]]:border-[#2563EB] [&_[data-slot=slider-thumb]]:bg-[#2563EB]"
                />
                <div className="flex items-center justify-between gap-4 mt-2">
                  <div className="flex-1 border border-border rounded-[4px] p-2 text-center relative bg-white">
                    <span className="text-[11px] text-stone absolute -top-2.5 left-1/2 -translate-x-1/2 bg-ivory px-1 leading-none">Min</span>
                    <span className="font-medium text-ink">₹{priceRange[0]}</span>
                  </div>
                  <div className="text-border">-</div>
                  <div className="flex-1 border border-border rounded-[4px] p-2 text-center relative bg-white">
                    <span className="text-[11px] text-stone absolute -top-2.5 left-1/2 -translate-x-1/2 bg-ivory px-1 leading-none">Max</span>
                    <span className="font-medium text-ink">₹{priceRange[1]}</span>
                  </div>
                </div>
              </div>
            ) : i === 2 ? (
              <div className="flex flex-wrap gap-2 pb-2">
                {uniqueColors.map(color => (
                  <button
                    key={color}
                    onClick={() => onColorChange?.(color)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColors.includes(color) ? "border-gold scale-110" : "border-transparent"}`}
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            ) : i === 3 ? (
              <div className="flex flex-wrap gap-2 pb-2">
                {uniqueSizes.map(size => (
                  <button
                    key={size}
                    onClick={() => onSizeChange?.(size)}
                    className={`min-w-[40px] h-10 px-2 rounded-[2px] border text-[13px] transition-colors ${selectedSizes.includes(size) ? "bg-ink text-ivory border-ink" : "bg-white text-ink border-border hover:border-ink"}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            ) : i === 4 ? (
              uniqueMaterials.map(mat => (
                <label key={mat} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedMaterials.includes(mat)}
                    onChange={() => onMaterialChange?.(mat)}
                    className="w-[18px] h-[18px] accent-gold border-border rounded-[2px]"
                  />{" "}
                  {mat}
                </label>
              ))
            ) : i === 5 ? (
              <>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStock}
                    onChange={(e) => onInStockChange?.(e.target.checked)}
                    className="w-[18px] h-[18px] accent-gold border-border rounded-[2px]"
                  />{" "}
                  In stock
                </label>
              </>
            ) : (
              <span className="text-[13px] italic opacity-50">Filter not implemented</span>
            )}
          </div>
        </details>
      ))}
    </div>
  );
}
