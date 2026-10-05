export function Footer() {
  return (
    <footer className="grid gap-[40px] md:gap-[5vw] px-[24px] md:px-[4vw] pt-[80px] pb-[32px] bg-ink text-ivory [grid-template-columns:2fr_repeat(4,1fr)] max-[960px]:[grid-template-columns:repeat(2,1fr)] max-[560px]:[grid-template-columns:1fr_1fr]">
      <div className="max-[960px]:[grid-column:1/-1]">
        <a className="font-serif text-[28px] font-medium leading-none tracking-[0.3em] text-ivory" href="/">
          WOXLY
        </a>
        <p className="max-w-[280px] mt-6 text-ivory/70 text-[15px] leading-relaxed">Objects of character for modern everyday life. Thoughtfully designed, responsibly crafted.</p>
      </div>
      {[
        ["SHOP", "New Arrivals", "Women", "Men", "Bags", "Jewelry", "Sale"],
        ["HELP", "Contact", "Shipping & Returns", "FAQ", "Track Order"],
        ["ABOUT", "Our Story", "Journal", "Stores", "Careers"],
        ["LEGAL", "Privacy", "Terms", "Refund Policy"],
      ].map(([title, ...links]) => (
        <div key={title}>
          <h3 className="m-0 mb-[24px] text-[12px] uppercase tracking-[0.14em] font-medium text-gold">{title}</h3>
          {links.map((link) => (
            <a
              key={link}
              className="block my-[12px] text-ivory/80 text-[14px] hover:text-gold transition-colors"
              href={
                link === "FAQ"
                  ? "/faq"
                  : link === "Journal"
                    ? "/journal"
                    : link === "Our Story"
                      ? "/about"
                      : link === "Contact"
                        ? "/contact"
                        : link === "Track Order"
                          ? "/track-order"
                          : "/shop"
              }
            >
              {link}
            </a>
          ))}
        </div>
      ))}
      <div className="[grid-column:1/-1] flex justify-between border-t border-ivory/10 pt-[32px] mt-[48px] text-ivory/60 text-[11px] uppercase tracking-[0.14em] font-medium max-[560px]:grid max-[560px]:gap-4 text-center">
        <span>WOXLY © 2026</span>
        <span>INDIA · INR</span>
        <span>VISA · UPI · MASTERCARD</span>
      </div>
    </footer>
  );
}
