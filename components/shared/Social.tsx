import { Camera } from "lucide-react";

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
