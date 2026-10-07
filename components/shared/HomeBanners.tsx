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
