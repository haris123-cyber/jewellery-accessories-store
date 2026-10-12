"use client";
import Image from "next/image";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, ChevronDown, X, Check } from "lucide-react";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
    DrawerClose,
} from "@/components/ui/drawer";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

    const sortOptions = [
        { value: "featured", label: "Featured" },
        { value: "newest", label: "Newest" },
        { value: "price-low", label: "Price: Low to High" },
        { value: "price-high", label: "Price: High to Low" },
    ];

    const activeFilterCount =
        selectedCategories.length +
        selectedColors.length +
        selectedMaterials.length +
        selectedSizes.length +
        (inStock ? 1 : 0) +
        (priceRange[0] > 0 || priceRange[1] < 100000 ? 1 : 0);

    const clearAllFilters = () => {
        setSelectedCategories([]);
        setSelectedColors([]);
        setSelectedMaterials([]);
        setSelectedSizes([]);
        setInStock(false);
        setPriceRange([0, 100000]);
    };

    return (
        <Shell>
            <div className="pt-[40px] pb-[35px] px-[24px] md:px-[4vw] text-center max-w-[1280px] mx-auto">
                <p className="m-0 mb-[16px] uppercase tracking-[0.14em] text-[10px] font-medium text-stone">Home / Collection</p>
                <h1 className="m-0 text-ink capitalize font-serif text-[35px] md:text-[64px] leading-[1.1] tracking-tight">{category ? category : "All Pieces"}</h1>
                <p className="mt-[16px] text-stone text-[12px] max-w-[500px] mx-auto">Considered objects for every part of the day.</p>
            </div>

            {/* Mobile / Tablet Filter & Sort Bar (50/50 balanced luxury toolbar) */}
            <div className="lg:hidden sticky top-[64px] z-30 bg-ivory/95 backdrop-blur-md border-y border-border">
                <div className="grid grid-cols-2 divide-x divide-border">
                    {/* Filter Trigger */}
                    <Drawer>
                        <DrawerTrigger className="h-[50px] flex items-center justify-center gap-2 px-3 uppercase tracking-[0.16em] text-[11px] font-medium text-ink hover:text-gold active:bg-sand/30 transition-colors select-none focus:outline-none">
                            <SlidersHorizontal className="w-3.5 h-3.5 text-stone" />
                            <span>Filters</span>
                            {activeFilterCount > 0 && (
                                <span className="min-w-[18px] h-[18px] px-1 rounded-full bg-gold text-ivory text-[10px] font-bold flex items-center justify-center leading-none">
                                    {activeFilterCount}
                                </span>
                            )}
                        </DrawerTrigger>
                        <DrawerContent className="bg-ivory border-t border-border flex flex-col max-h-[85vh]">
                            <DrawerHeader className="border-b border-border px-5 py-4 flex flex-row items-center justify-between text-left">
                                <div>
                                    <DrawerTitle className="font-serif text-[22px] text-ink">Filters</DrawerTitle>
                                    <DrawerDescription className="text-stone text-xs">
                                        {list.length} {list.length === 1 ? "piece" : "pieces"} available
                                    </DrawerDescription>
                                </div>
                                {activeFilterCount > 0 && (
                                    <button
                                        onClick={clearAllFilters}
                                        className="text-xs uppercase tracking-wider text-stone hover:text-gold underline underline-offset-4"
                                    >
                                        Reset
                                    </button>
                                )}
                            </DrawerHeader>
                            <div className="p-5 flex-1 overflow-y-auto">
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
                            <div className="p-4 border-t border-border bg-ivory">
                                <DrawerClose asChild>
                                    <button className="w-full h-[46px] bg-ink text-ivory uppercase tracking-[0.16em] text-[12px] font-medium hover:bg-gold transition-colors flex items-center justify-center">
                                        View {list.length} {list.length === 1 ? "Piece" : "Pieces"}
                                    </button>
                                </DrawerClose>
                            </div>
                        </DrawerContent>
                    </Drawer>

                    {/* Sort Trigger */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button
                                className="h-[50px] w-full flex items-center justify-center gap-1.5 px-3 select-none active:bg-sand/30 transition-colors focus:outline-none"
                                aria-label="Sort options"
                            >
                                <span className="uppercase tracking-[0.16em] text-[11px] font-medium text-ink">Sort:</span>
                                <span className="text-stone text-[11px] font-normal tracking-wide uppercase truncate max-w-[90px]">
                                    {sortOptions.find((o) => o.value === sort)?.label}
                                </span>
                                <ChevronDown className="w-3.5 h-3.5 text-stone shrink-0 ml-0.5" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="end"
                            sideOffset={4}
                            className="w-[220px] bg-pearl border border-border shadow-xl rounded-[2px] p-1.5 z-50 text-ink"
                        >
                            {sortOptions.map((opt) => (
                                <DropdownMenuItem
                                    key={opt.value}
                                    onClick={() => setSort(opt.value)}
                                    className={`flex items-center justify-between px-3 py-2.5 text-[13px] font-sans tracking-normal rounded-[2px] cursor-pointer transition-colors ${
                                        sort === opt.value
                                            ? "bg-sand/40 text-gold font-medium"
                                            : "text-ink hover:text-gold hover:bg-sand/20"
                                    }`}
                                >
                                    <span>{opt.label}</span>
                                    {sort === opt.value && <Check className="w-4 h-4 text-gold ml-2 shrink-0" />}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* Mobile Active Filters bar */}
                {activeFilterCount > 0 && (
                    <div className="px-4 py-2 bg-sand/20 border-t border-border/70 flex items-center justify-between text-[11px]">
                        <span className="text-stone">
                            {activeFilterCount} {activeFilterCount === 1 ? "filter" : "filters"} applied
                        </span>
                        <button
                            onClick={clearAllFilters}
                            className="text-ink font-medium hover:text-gold uppercase tracking-[0.14em] text-[10px] underline underline-offset-2"
                        >
                            Clear all
                        </button>
                    </div>
                )}
            </div>

            {/* Desktop Filter & Sort Bar */}
            <div className="hidden lg:flex min-h-[64px] px-[4vw] items-center justify-between border-y border-border text-[12px] uppercase tracking-[0.14em] font-medium text-ink max-w-[1400px] mx-auto w-full">
                <div className="flex items-center gap-6">
                    <span className="text-stone">{list.length} pieces</span>
                    {activeFilterCount > 0 && (
                        <button
                            onClick={clearAllFilters}
                            className="text-[11px] text-stone hover:text-gold flex items-center gap-1.5 underline underline-offset-4 normal-case tracking-normal"
                        >
                            <X className="w-3 h-3" />
                            Clear all filters ({activeFilterCount})
                        </button>
                    )}
                </div>

                <div className="flex items-center gap-6 ml-auto">
                    <label className="flex items-center gap-2">
                        <Search className="w-4 h-4 text-stone" />
                        <input
                            className="w-[180px] xl:w-[220px] border-0 border-b border-border bg-transparent py-1.5 outline-none focus:border-gold transition-colors placeholder:text-stone/60 text-[13px] tracking-normal normal-case"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search collection"
                        />
                    </label>

                    <div className="flex items-center gap-3">
                        <span className="text-stone text-[11px] uppercase tracking-[0.16em]">Sort by</span>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="h-[38px] px-3.5 bg-pearl/60 border border-border/80 rounded-[3px] flex items-center gap-2.5 text-[13px] font-normal text-ink hover:border-gold transition-colors focus:outline-none focus:border-gold cursor-pointer">
                                    <span>{sortOptions.find((o) => o.value === sort)?.label}</span>
                                    <ChevronDown className="w-3.5 h-3.5 text-stone" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="end"
                                sideOffset={6}
                                className="w-[200px] bg-pearl border border-border/80 shadow-xl rounded-[3px] p-1.5 z-50 text-ink"
                            >
                                {sortOptions.map((opt) => (
                                    <DropdownMenuItem
                                        key={opt.value}
                                        onClick={() => setSort(opt.value)}
                                        className={`flex items-center justify-between px-3 py-2.5 text-[13px] rounded-[2px] cursor-pointer transition-colors ${
                                            sort === opt.value
                                                ? "bg-sand/40 text-gold font-medium"
                                                : "text-ink hover:text-gold hover:bg-sand/20"
                                        }`}
                                    >
                                        <span>{opt.label}</span>
                                        {sort === opt.value && <Check className="w-4 h-4 text-gold ml-2 shrink-0" />}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
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


                </div>
            </div>
        </Shell>
    );
}

