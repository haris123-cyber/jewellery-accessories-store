import { type Product } from "@/lib/catalog";
import { ProductCard } from "./ProductCard";

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
