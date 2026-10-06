"use client";
import Image from "next/image";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { products } from "@/lib/catalog";
import {
    ProductCard,
    Filters,
    Empty,
} from "@/components/shared";
import { Shell } from "@/components/layout";

export function Shop({ category }: { category?: string }) {
    const [sort, setSort] = useState("featured");
    const [query, setQuery] = useState("");
    const [selectedCategories, setSelectedCategories] = useState<string[]>(category ? [category] : []);
    const [inStock, setInStock] = useState<boolean>(false);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);

    const toggleState = (setState: React.Dispatch<React.SetStateAction<string[]>>, val: string) => {
        setState((prev) => prev.includes(val) ? prev.filter((x) => x !== val) : [...prev, val]);
    };

    const list = useMemo(() => {
        let result = products;

        if (selectedCategories.length > 0) {
            result = result.filter((p) => selectedCategories.includes(p.category));
        }
        if (selectedColors.length > 0) {
            result = result.filter((p) => selectedColors.some(c => p.colors.includes(c)));
        }
        if (selectedMaterials.length > 0) {
            result = result.filter((p) => selectedMaterials.includes(p.material));
        }
        // Dummy filter for Size since there are no sizes in Product data
        // if (selectedSizes.length > 0) { ... }

        result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

        if (inStock) {
            result = result.filter((p) => p.stock > 0);
        }

        if (query)
            result = result.filter((p) =>
                p.name.toLowerCase().includes(query.toLowerCase()),
            );
        if (sort === "price-low")
            result = [...result].sort((a, b) => a.price - b.price);
        if (sort === "price-high")
            result = [...result].sort((a, b) => b.price - a.price);
        if (sort === "newest") result = [...result].reverse();
        return result;
    }, [selectedCategories, selectedColors, selectedMaterials, selectedSizes, priceRange, inStock, sort, query]);

    return (
        <Shell>
            <div className="pt-[40px] pb-[35px] px-[24px] md:px-[4vw] text-center max-w-[1280px] mx-auto">
                <p className="m-0 mb-[16px] uppercase tracking-[0.14em] text-[10px] font-medium text-stone">Home / Collection</p>
                <h1 className="m-0 text-ink capitalize font-serif text-[35px] md:text-[64px] leading-[1.1] tracking-tight">{category ? category : "All Pieces"}</h1>
                <p className="mt-[16px] text-stone text-[12px] max-w-[500px] mx-auto">Considered objects for every part of the day.</p>
            </div>

            <div className="min-h-[64px] px-[16px] md:px-[4vw] flex items-center gap-[24px] border-y border-border text-[12px] uppercase tracking-[0.14em] font-medium text-ink max-w-[1400px] mx-auto w-full">
                <span className="hidden md:inline-block text-stone">{list.length} pieces</span>
                <label className="ml-auto flex items-center gap-2 hidden md:flex">
                    <Search className="w-[18px] text-stone" />
                    <input
                        className="w-[180px] border-0 border-b border-border bg-transparent py-2 outline-none focus:border-gold transition-colors placeholder:text-stone/60"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search collection"
                    />
                </label>
                <Drawer>
                    <DrawerTrigger className="md:hidden flex-1 min-h-[48px] flex justify-center items-center gap-2 border-r border-border bg-transparent uppercase tracking-[0.14em] text-[12px] font-medium text-ink cursor-pointer hover:text-gold transition-colors">
                        <SlidersHorizontal className="w-[18px]" /> Filters
                    </DrawerTrigger>
                    <DrawerContent className="bg-ivory border-t border-border">
                        <DrawerHeader className="border-b border-border pb-4">
                            <DrawerTitle className="font-serif text-[24px] text-ink">Filter collection</DrawerTitle>
                            <DrawerDescription className="text-stone">
                                Refine by category, material and availability.
                            </DrawerDescription>
                        </DrawerHeader>
                        <div className="p-4 max-h-[60vh] overflow-y-auto">
                            <Filters
                                selectedCategories={selectedCategories}
                                onCategoryChange={(c) => toggleState(setSelectedCategories, c)}
                                inStock={inStock}
                                onInStockChange={setInStock}
                                priceRange={priceRange}
                                onPriceRangeChange={setPriceRange}
                                selectedColors={selectedColors}
                                onColorChange={(c) => toggleState(setSelectedColors, c)}
                                selectedSizes={selectedSizes}
                                onSizeChange={(s) => toggleState(setSelectedSizes, s)}
                                selectedMaterials={selectedMaterials}
                                onMaterialChange={(m) => toggleState(setSelectedMaterials, m)}
                            />
                        </div>
                    </DrawerContent>
                </Drawer>
                <label className="ml-auto md:ml-0 flex items-center gap-3 uppercase tracking-[0.14em] text-[12px] flex-1 md:flex-none justify-center md:justify-start">
                    Sort{" "}
                    <div className="relative">
                        <select className="appearance-none border border-border bg-pearl rounded-[2px] h-[40px] px-4 pr-10 outline-none tracking-normal normal-case text-[14px] cursor-pointer text-ink hover:border-gold transition-colors focus:ring-1 focus:ring-gold focus:border-gold" value={sort} onChange={(e) => setSort(e.target.value)}>
                            <option value="featured">Featured</option>
                            <option value="newest">Newest</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                        </select>
                        <ChevronDownIcon className="w-[16px] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-stone" />
                    </div>
                </label>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-[48px] lg:gap-[64px] pt-[48px] pb-[96px] px-[16px] md:px-[4vw] max-w-[1400px] mx-auto">
                <aside className="hidden lg:block sticky top-[100px] self-start h-[calc(100vh-120px)] overflow-y-auto pr-4 custom-scrollbar">
                    <Filters
                        selectedCategories={selectedCategories}
                        onCategoryChange={(c) => toggleState(setSelectedCategories, c)}
                        inStock={inStock}
                        onInStockChange={setInStock}
                        priceRange={priceRange}
                        onPriceRangeChange={setPriceRange}
                        selectedColors={selectedColors}
                        onColorChange={(c) => toggleState(setSelectedColors, c)}
                        selectedSizes={selectedSizes}
                        onSizeChange={(s) => toggleState(setSelectedSizes, s)}
                        selectedMaterials={selectedMaterials}
                        onMaterialChange={(m) => toggleState(setSelectedMaterials, m)}
                    />
                </aside>
                <div>
                    {list.length ? (
                        <div className="grid grid-cols-2 md:grid-cols-3  gap-x-[16px] md:gap-x-[24px] gap-y-[40px] md:gap-y-[56px]">
                            {list.map((p, i) => (
                                <ProductCard key={p.slug} product={p} index={i} />
                            ))}
                        </div>
                    ) : (
                        <Empty
                            title="No pieces found"
                            copy="Try another search or clear your filters."
                            href="/shop"
                            action="View all pieces"
                        />
                    )}

                    {list.length > 0 && (
                        <div className="flex justify-center mt-[64px]">
                            <button className="btn-secondary min-w-[200px]">Load more</button>
                        </div>
                    )}
                </div>
            </div>
        </Shell>
    );
}

function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m6 9 6 6 6-6" />
        </svg>
    );
}
