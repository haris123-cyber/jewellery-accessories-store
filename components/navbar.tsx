"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Menu,
  Search,
  UserRound,
  Heart,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useCommerceStore } from "@/store/commerce-store";
import { CartDrawer } from "./cart-drawer";

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const [menu, setMenu] = useState(false);
  const cart = useCommerceStore((s) => s.cart);
  const setCartOpen = useCommerceStore((s) => s.setCartOpen);
  const router = useRouter();
  const count = mounted ? cart.reduce((n, l) => n + l.quantity, 0) : 0;

  return (
    <>
      <div className="h-[40px] flex items-center justify-center bg-emerald text-ivory uppercase tracking-[0.14em] text-[12px] font-medium max-[560px]:text-[10px]">
        Certified hallmark jewellery
      </div>
      <header className="sticky top-0 z-50 h-[80px] grid grid-cols-[1fr_auto_1fr] items-center px-[24px] border-b border-border bg-ivory/95 backdrop-blur-md max-[960px]:grid-cols-[auto_1fr_auto] max-[960px]:px-[16px] max-[960px]:h-[64px]">
        <div className="flex items-center gap-6">
          <button
            className="btn-icon border-transparent bg-transparent hidden max-[960px]:inline-flex"
            onClick={() => setMenu(true)}
            aria-label="Open menu"
            suppressHydrationWarning
          >
            <Menu />
          </button>
          <nav className="flex gap-[24px] uppercase tracking-[0.14em] text-[12px] font-medium text-ink max-[960px]:hidden">
            {[
              "Rings",
              "Necklaces",
              "Earrings",
              "Bracelets",
              "Watches",
              "Bags",
              "Gifting",
            ].map((item) => (
              <a key={item} href={`/category/${item.toLowerCase()}`} className="relative after:absolute after:left-0 after:right-full after:-bottom-[4px] after:h-[1px] after:bg-gold hover:after:right-0 after:transition-all after:duration-300 hover:text-gold transition-colors">
                {item}
              </a>
            ))}
          </nav>
        </div>
        <a className="font-serif text-[28px] font-medium leading-none tracking-[0.3em] text-ink max-[960px]:justify-self-center max-[960px]:text-[24px]" href="/">
          WOXLY
        </a>
        <div className="justify-self-end flex items-center gap-[12px] max-[960px]:gap-[8px]">

          <a
            className="btn-icon hidden max-[960px]:inline-flex"
            href="/account"
            aria-label="Account"
          >
            <UserRound />
          </a>

          <button
            className="btn-icon relative"
            onClick={() => {
              if (typeof window !== 'undefined' && window.innerWidth <= 560) {
                router.push('/cart');
              } else {
                setCartOpen(true);
              }
            }}
            aria-label={`Cart with ${count} items`}
            suppressHydrationWarning
          >
            <ShoppingBag />
            {count > 0 && (
              <span className="absolute top-[2px] right-[2px] min-w-[16px] h-[16px] flex items-center justify-center rounded-full bg-gold-soft text-ink text-[10px] font-medium border border-ivory">
                {count}
              </span>
            )}
          </button>
        </div>
      </header>
      <MobileNavbar menu={menu} setMenu={setMenu} />
      <CartDrawer />
    </>
  );
}

export function MobileNavbar({
  menu,
  setMenu,
}: {
  menu: boolean;
  setMenu: (v: boolean) => void;
}) {
  return (
    <Sheet open={menu} onOpenChange={setMenu}>
      <SheetContent side="left" className="!w-[min(90vw,430px)] !bg-ivory p-6 border-r border-border">
        <SheetHeader className="text-left mb-8 font-sans">
          <SheetTitle className="font-serif tracking-[0.3em] text-[24px] text-ink">WOXLY</SheetTitle>
          <SheetDescription className="text-stone">Explore the collection</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col ">
          {[
            "Rings",
            "Necklaces",
            "Earrings",
            "Bracelets",
            "Watches",
            "Bags",
            "Gifting",
          ].map((item, i) => (
            <a
              key={item}
              href={`/category/${item.toLowerCase()}`}
              className="min-h-[58px] grid grid-cols-[1fr_auto] items-center border-b border-border group"
            >
              <span className="text-ink font-sans mb-5 mt-5 text-[28px] group-hover:text-gold transition-colors">
                {item}
              </span>
              <ArrowRight className="w-[18px] text-ink group-hover:text-gold transition-colors" />
            </a>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
