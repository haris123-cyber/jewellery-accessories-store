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
