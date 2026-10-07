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
          <a href="/shop" className="relative aspect-[3/5] md:aspect-[4/5] overflow-hidden group block ">
            <img src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=1175&auto=format&fit=crop" alt="Everyday Rings" className="absolute inset-0 w-full h-full object-cover  rounded-tl-2xl transition-transform duration-300 ease-out group-hover:scale-[1.04]" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />
            <div className="absolute bottom-8 left-0 right-0 flex justify-center">
              <span className="btn-text-link !text-ivory !decoration-ivory group-hover:!text-gold group-hover:!decoration-gold">Everyday Rings</span>
            </div>
          </a>
          <a href="/shop" className="relative aspect-[3/5] md:aspect-[4/5] overflow-hidden group block ">
            <img src="https://images.unsplash.com/photo-1611652022419-a9419f74343d?q=80&w=688&auto=format&fit=crop" alt="Statement Necklaces" className="absolute inset-0 w-full h-full object-cover rounded-tr-2xl transition-transform duration-300 ease-out group-hover:scale-[1.04]" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />
            <div className="absolute bottom-8 left-0 right-0 flex justify-center">
              <span className="btn-text-link !text-ivory !decoration-ivory group-hover:!text-gold group-hover:!decoration-gold">Statement Necklaces</span>
            </div>
          </a>
        </div>
      </div>

      {/* Type 3: Full overlay text (The Thread style) */}
      <a href="/shop" className="relative w-full aspect-[5/5] md:aspect-[21/9] overflow-hidden group block rounded-b-2xl ">
        <img src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1200&auto=format&fit=crop" alt="The Thread" className="absolute inset-0 w-full h-full object-cover transition-transform rounded-b-2xl duration-300 ease-out group-hover:scale-[1.04]" />
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
