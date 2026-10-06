"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  ArrowRight,
  Camera,
  ChevronDown,
  Clock,
  Heart,
  Search,
  ShoppingBag,
  Star,
  StarHalf,
} from "lucide-react";
import {
  categories,
  money,
  products,
  type Product,
} from "@/lib/catalog";
import { useCommerceStore } from "@/store/commerce-store";
import { Slider } from "@/components/ui/slider";

const unsplashImages = [
  "1599643478514-462ce330f619",
  "1600125740428-f6ee3778a87c",
  "1515562141207-7a88fb7ce338",
  "1584916201218-f4242ceb4809",
  "1611085583191-a3b181a88401",
  "1596944924616-7b38e7cfac36",
  "1601121141461-9d6647bca1ed",
  "1575844265571-0008dd52f144",
  "1599643477123-575005b63004",
  "1611591437281-460bfbe1220a",
  "1629224316810-9d8805b95e76",
  "1610461853106-96b17c2f62cb",
];

const getUnsplashImage = (slug: string) => {
  const hash = slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const id = unsplashImages[hash % unsplashImages.length];
  return `https://images.unsplash.com/photo-${id}?w=800&q=80&auto=format&fit=crop`;
};

export function ProductVisual({
  cell,
  name,
  image,
  priority = false,
}: {
  cell: number;
  name: string;
  image?: string;
  priority?: boolean;
}) {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  return (
    <div className="relative aspect-[4/5] overflow-hidden bg-sand group-hover/product:[&>img]:scale-[1.04]">
      {/* Product Image */}
      <Image
        className="absolute inset-0 w-full h-full object-cover transition-all duration-300 ease-out z-10"
        src={image || getUnsplashImage(slug)}
        alt={name}
        fill
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 300px"
        priority={priority}
      />
    </div>
  );
}

export function EditorialVisual({
  cell,
  label,
}: {
  cell: number;
  label: string;
}) {
  const slug = label.replace(/ collection$/i, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  return (
    <div className="relative w-full h-full min-h-[240px] overflow-hidden bg-sand">
      <Image
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
        src={getUnsplashImage(slug)}
        alt={label}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );
}

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
      <a href={`/product/${product.slug}`} className="block mb-4 font-sans relative overflow-hidden rounded-[4px]">
        <ProductVisual
          cell={product.cell}
          name={product.name}
          image={product.image}
          priority={index < 2}
        />

        {/* Badges */}
        <div className="absolute left-3 top-3 z-10 flex flex-col gap-2">
          {index === 0 && (
            <span className="bg-gold-soft text-ink text-[11px] uppercase tracking-[0.14em] font-medium px-2 py-1 rounded-[2px]">New</span>
          )}
          {discount > 0 && (
            <span className="bg-blush text-ink text-[11px] uppercase tracking-[0.14em] font-medium px-2 py-1 rounded-[2px]">{discount}% OFF</span>
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
              toast.success(`${product.name} added to your bag`);
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
            className="btn-icon w-10 h-10 mr-2  md:hidden shadow-sm !rounded-md bg-[gray]/900"
            aria-label="Add to cart"
            onClick={(e) => {
              e.preventDefault();
              add(product.slug);
              router.push("/cart");
            }}
          >
            <ShoppingBag className="w-5 h-5 text-white " />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export function ProductSection({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle?: string;
  items: Product[];
}) {
  return (
    <section id="collection" className="py-[56px]  md:py-[96px] px-[16px] md:px-[24px] max-w-[1280px] mx-auto">
      <div className="mb-[32px] md:mb-[48px] flex flex-col md:flex-row md:items-end  justify-between gap-4">
        <div>
          {subtitle && <p className="m-0 mb-2 text-stone text-[12px] uppercase text-center tracking-[0.14em] font-medium">{subtitle}</p>}
          <h2 className="m-0 text-ink text-center">{title}</h2>
        </div>
      </div>
      <div className="flex overflow-x-auto snap-x  ml-1 snap-mandatory gap-[16px] md:gap-[24px] pb-[16px] -mx-[16px] px-[16px] md:mx-0 md:px-0 scrollbar-none">
        {items.map((p, i) => (
          <div key={p.slug} className="flex-none w-[55vw] md:w-[calc(25%-18px)] snap-start">
            <ProductCard product={p} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}

export function Social() {
  return (
    <section className="bg-ivory py-[56px] md:py-[96px] px-[16px] md:px-[24px]">
      <div className="max-w-[850px] mx-auto mb-[48px] text-center flex flex-col items-center">
        <div>
          <p className="m-0 mb-[16px] uppercase tracking-[0.14em] text-[12px] font-medium text-stone">In good company</p>
          <h2 className="m-0 mb-[16px] text-ink font-serif tracking-[0.1em] text-[32px] md:text-[48px]">@WOXLY</h2>
        </div>
        <p className="m-0 text-stone text-[16px]">Follow the everyday edit.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-[8px]">
        {[
          "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=400&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1608042314453-ae338d80c427?q=80&w=810&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1592317295760-5c1f677dfc78?q=80&w=1915&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=400&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?q=80&w=400&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=400&auto=format&fit=crop"
        ].map((imgSrc, i) => (
          <a href="#" key={i} className="relative block aspect-square overflow-hidden group rounded-[4px]">
            <img src={imgSrc} alt="WOXLY social post" className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]" />
            <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-ink/40 text-ivory text-[12px] uppercase tracking-[0.14em] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <Camera /> View post
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

export const emailSchema = z.object({
  email: z.string().email("Enter a valid email"),
});

export function Newsletter() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ email: string }>({ resolver: zodResolver(emailSchema) });
  return (
    <section className="py-[56px] md:py-[96px] px-[16px] md:px-[24px] bg-sand text-center flex flex-col items-center">
      <div className="max-w-[500px] w-full">
        <p className="m-0 mb-[16px] uppercase tracking-[0.14em] text-[12px] font-medium text-stone">Private notes</p>
        <h2 className="m-0 mb-4 text-ink">10% off your first order</h2>
        <p className="mb-8 text-stone">
          Be the first to discover new collections, limited drops and private offers.
        </p>

        <form
          className="relative w-full flex"
          onSubmit={handleSubmit(() => {
            toast.success("Welcome to WOXLY");
            reset();
          })}
        >
          <input
            suppressHydrationWarning
            className="flex-1 min-h-[48px] px-4 border border-border bg-ivory text-ink rounded-l-[2px] rounded-r-none outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-shadow placeholder:text-stone/60"
            aria-label="Email address"
            placeholder="Email address"
            {...register("email")}
          />
          <button type="submit" className="btn-primary rounded-l-none min-h-[48px] px-6 m-0">
            Join
          </button>
          {errors.email && <span role="alert" className="absolute top-[100%] mt-2 left-0 text-error text-[12px]">{errors.email.message}</span>}
        </form>
      </div>
    </section>
  );
}

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

export function OrderSummary({ subtotal }: { subtotal: number }) {
  const shipping = subtotal >= 2999 ? 0 : 149;
  return (
    <aside className="p-[24px] md:p-[32px] bg-pearl border border-border rounded-[4px] shadow-[0_8px_30px_rgba(27,26,23,0.06)]">
      <h2 className="m-0 mb-6 text-[18px] font-serif">Order summary</h2>
      <div className="space-y-4 mb-6">
        <p className="m-0 flex justify-between text-[15px] text-stone">
          <span>Subtotal</span>
          <strong className="text-ink font-medium tabular-nums">{money(subtotal)}</strong>
        </p>
        <p className="m-0 flex justify-between text-[15px] text-stone">
          <span>Shipping</span>
          <strong className="text-ink font-medium tabular-nums">{shipping === 0 ? "Complimentary" : money(shipping)}</strong>
        </p>
      </div>
      <p className="m-0 flex justify-between pt-4 border-t border-border text-[18px] text-ink font-serif">
        <span>Total</span>
        <strong className="tabular-nums">{money(subtotal + shipping)}</strong>
      </p>
      <a className="btn-primary w-full mt-8" href="/checkout">
        Proceed to checkout
      </a>
      <p className="mt-4 text-center text-stone text-[12px] flex items-center justify-center gap-2">
        Secure checkout · Easy returns
      </p>
    </aside>
  );
}

export function Empty({
  title,
  copy,
  href,
  action,
}: {
  title: string;
  copy: string;
  href: string;
  action: string;
}) {
  return (
    <div className="min-h-[420px] flex flex-col items-center justify-center text-center p-[32px] max-w-[400px] mx-auto">
      <ShoppingBag className="w-[48px] h-[48px] stroke-[1] text-stone mb-6" />
      <h2 className="m-0 mb-4">{title}</h2>
      <p className="text-stone text-[16px] mb-8">{copy}</p>
      <a className="btn-primary" href={href}>
        {action}
      </a>
    </div>
  );
}

export function SummerOffers() {
  return (
    <section className="py-[56px] md:py-[96px] px-[16px] md:px-[24px] max-w-[1280px] mx-auto">
      <div className="text-center mb-10 md:mb-12">
        <p className="m-0 mb-2 text-stone text-[12px] uppercase tracking-[0.14em] font-medium">Limited Time</p>
        <h2 className="m-0 text-ink">The Gifting Season</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
        {/* Card 1 */}
        <div className="bg-sand rounded-[4px] p-8 md:p-10 flex flex-col items-center justify-center text-center">
          <h3 className="text-ink mb-2 text-[24px] md:text-[28px]">Complimentary Wrap</h3>
          <p className="text-stone mb-8 text-[15px]">On all jewellery orders</p>
          <a href="/shop" className="btn-secondary">Shop Gifts</a>
        </div>

        {/* Card 2 */}
        <div className="bg-blush rounded-[4px] p-8 md:p-10 flex flex-col items-center justify-center text-center">
          <h3 className="text-error mb-2 text-[24px] md:text-[28px]">Up to 30% Off</h3>
          <p className="text-error/80 mb-8 text-[15px]">Selected rings & bracelets</p>
          <a href="/shop" className="btn-secondary !border-error !text-error hover:!bg-error hover:!text-ivory">Shop Sale</a>
        </div>

        {/* Card 3 */}
        <div className="bg-ivory border border-border rounded-[4px] p-8 md:p-10 flex flex-col items-center justify-center text-center md:col-span-1 sm:col-span-2">
          <h3 className="text-ink mb-2 text-[24px] md:text-[28px]">Under ₹4,999</h3>
          <p className="text-stone mb-8 text-[15px]">Curated entry pieces</p>
          <a href="/shop" className="btn-secondary">Shop Now</a>
        </div>
      </div>
    </section>
  );
}

export function HomeBanners() {
  return (
    <section className="py-[56px] md:py-[96px] px-[16px] md:px-[24px] max-w-[1280px] mx-auto flex flex-col gap-[56px] md:gap-[96px]">

      {/* Type 4: Side-by-side Text & Image (Crafted to last) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-0 bg-sand rounded-[4px] overflow-hidden">
        <a href="/shop" className="relative w-full aspect-[4/5] md:aspect-auto h-full min-h-[300px] md:min-h-[600px] overflow-hidden group block">
          <img src="https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?q=80&w=800&auto=format&fit=crop" alt="Crafted to last" className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]" />
        </a>
        <div className="p-[32px] md:p-[72px] flex flex-col items-start justify-center">
          <p className="m-0 mb-[16px] text-stone text-[12px] uppercase tracking-[0.14em] font-medium">The Promise</p>
          <h2 className="mb-6 text-ink">Crafted to last</h2>
          <ul className="text-[15px] md:text-[16px] text-stone leading-relaxed mb-8 max-w-[400px] space-y-4">
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
              <span>Premium 18k gold vermeil and solid sterling silver bases.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
              <span>Anti-tarnish coating for everyday resilience.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
              <span>Hypoallergenic materials, safe for sensitive skin.</span>
            </li>
          </ul>
          <a href="/shop" className="btn-secondary">
            Discover Quality
          </a>
        </div>
      </div>

    </section>
  );
}

export function HomeBanners2() {
  return (
    <section className="py-[56px] md:py-[96px] px-[16px] md:px-[24px] max-w-[1280px] mx-auto flex flex-col gap-[56px] md:gap-[96px]">
      {/* Lookbook 2 columns */}
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <p className="m-0 mb-2 text-stone text-[12px] uppercase tracking-[0.14em] text-center font-medium">The Lookbook</p>
            <h2 className="m-0 text-ink text-center">The magic begins here</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-[5px] sm:mb-0 -mb-13 md:gap-[24px]">
          <a href="/shop" className="relative aspect-[3/5] md:aspect-[4/5] overflow-hidden group block rounded-[4px]">
            <img src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=1175&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Everyday Rings" className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />
            <div className="absolute bottom-8 left-0 right-0 flex justify-center">
              <span className="btn-text-link !text-ivory !decoration-ivory group-hover:!text-gold group-hover:!decoration-gold">Everyday Rings</span>
            </div>
          </a>
          <a href="/shop" className="relative aspect-[3/5] md:aspect-[4/5] overflow-hidden group block rounded-[4px]">
            <img src="https://images.unsplash.com/photo-1611652022419-a9419f74343d?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Statement Necklaces" className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />
            <div className="absolute bottom-8 left-0 right-0 flex justify-center">
              <span className="btn-text-link !text-ivory !decoration-ivory group-hover:!text-gold group-hover:!decoration-gold">Statement Necklaces</span>
            </div>
          </a>
        </div>
      </div>

      {/* Type 3: Full overlay text (The Thread style) */}
      <a href="/shop" className="relative w-full aspect-[5/5] md:aspect-[21/9] overflow-hidden group block rounded-[4px]">
        <img src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1200&auto=format&fit=crop" alt="The Thread" className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]" />
        <div className="absolute inset-0 bg-ink/30 transition-colors group-hover:bg-ink/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-ivory text-center p-[24px] md:p-[48px]">
          <h2 className="text-[36px] md:text-[56px] font-serif mb-4 md:mb-6 text-ivory">The Thread</h2>
          <p className="text-[16px] md:text-[20px] max-w-[500px] leading-relaxed mb-8 font-serif text-ivory/90">
            Stories to inspire. Ideas to get the look. Expert advice for living beautifully.
          </p>
          <span className="btn-text-link !text-ivory !decoration-ivory group-hover:!text-gold group-hover:!decoration-gold">View all articles</span>
        </div>
      </a>
    </section>
  );
}
export function AsSeenOn() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(101);

  const displayItems = Array.from({ length: 40 }).flatMap(() => products.slice(0, 5));

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const containerRect = container.getBoundingClientRect();
      const containerCenter =
        containerRect.left + containerRect.width / 2;

      let closestIndex = 0;
      let closestDistance = Infinity;

      const items = container.querySelectorAll("[data-index]");

      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const itemCenter = rect.left + rect.width / 2;
        const distance = Math.abs(containerCenter - itemCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = Number(item.getAttribute("data-index"));
        }
      });

      setActiveIndex((prev) =>
        prev === closestIndex ? prev : closestIndex
      );
    };

    container.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    // Center second item initially
    const timer = setTimeout(() => {
      const items = container.querySelectorAll("[data-index]");

      if (items[101]) {
        const target = items[101] as HTMLElement;

        const scrollPos =
          target.offsetLeft -
          container.offsetWidth / 2 +
          target.offsetWidth / 2;

        container.scrollTo({
          left: scrollPos,
          behavior: "smooth",
        });
      }
    }, 300);

    return () => {
      container.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const scrollToItem = (index: number) => {
    const container = containerRef.current;
    if (!container) return;

    const target = container.querySelector(
      `[data-index="${index}"]`
    ) as HTMLElement;

    if (!target) return;

    const scrollPos =
      target.offsetLeft -
      container.offsetWidth / 2 +
      target.offsetWidth / 2;

    container.scrollTo({
      left: scrollPos,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full overflow-hidden border-y border-border bg-ivory py-[56px] md:py-[96px]">

      {/* Heading */}
      <h2 className="mb-[40px] text-center font-sans text-[20px] font-medium tracking-[0.14em] text-ink md:mb-[56px] md:text-[24px]">
        AS SEEN ON
      </h2>

      {/* Slider */}
      <div
        ref={containerRef}
        className="
          flex
          w-full
          items-center
          gap-[16px]
          overflow-x-auto
          scrollbar-none
          snap-x
          snap-mandatory
          md:gap-[24px]
        "
        style={{
          paddingLeft: "calc(50vw - 110px)",
          paddingRight: "calc(50vw - 110px)",
        }}
      >
        {displayItems.map((product, i) => {
          const isActive = i === activeIndex;

          return (
            <div
              key={i}
              data-index={i}
              className="
                flex
                w-[220px]
                shrink-0
                snap-center
                flex-col
                items-center
              "
            >
              {/* Fixed card wrapper */}
              <div
                className="relative h-[380px] w-[220px] cursor-pointer"
                onClick={() => {
                  if (isActive) {
                    window.location.href = `/product/${product.slug}`;
                  } else {
                    scrollToItem(i);
                  }
                }}
              >
                {/* Image scales visually without changing layout width */}
                <div
                  className={`
                    absolute
                    inset-0
                    overflow-hidden
                    rounded-[8px]
                    shadow-sm
                    transition-all
                    duration-500
                    ease-out
                    ${isActive
                      ? "scale-100 opacity-100"
                      : "scale-[0.79] opacity-50"
                    }
                  `}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="220px"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Name */}
              <a
                href={`/product/${product.slug}`}
                className={`
                  mt-[20px]
                  text-center
                  font-sans
                  uppercase
                  tracking-[0.1em]
                  text-ink
                  transition-all
                  duration-500
                  ${isActive
                    ? "translate-y-0 text-[14px] opacity-100"
                    : "translate-y-[-5px] text-[12px] opacity-0"
                  }
                `}
              >
                {product.name}
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}