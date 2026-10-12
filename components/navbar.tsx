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
import { AnnouncementBar } from "./announcement-bar";

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
      <AnnouncementBar />
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
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "Collections", href: "/collections" },
    { label: "New Arrivals", href: "/new-arrivals" },
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <Sheet open={menu} onOpenChange={setMenu}>
      <SheetContent
        side="left"
        className="!w-[min(88vw,400px)] !bg-ivory p-0 border-r border-border flex flex-col"
      >
        {/* Header */}
        <SheetHeader className="text-left px-6 pt-8 pb-6 border-b border-border">
          <SheetTitle className="font-serif tracking-[0.3em] text-[25px] text-ink">
            WOXLY
          </SheetTitle>
          <SheetDescription className="text-stone text-xs tracking-wide">
            Discover your style
          </SheetDescription>
        </SheetHeader>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-6 py-4">
          {navItems.map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMenu(false)}
              className="group flex min-h-[58px] items-center justify-between border-b border-border/70 transition-colors duration-200"
            >
              <span className="font-sans text-[17px] tracking-wide text-ink transition-colors group-hover:text-gold">
                {item.label}
              </span>

              <ArrowRight className="h-4 w-4 text-stone transition-all duration-200 group-hover:translate-x-1 group-hover:text-gold" />
            </a>
          ))}
        </nav>

        {/* Bottom section */}
        <div className="border-t border-border px-6 py-5">
          <a
            href="/account"
            onClick={() => setMenu(false)}
            className="flex items-center gap-3 text-sm text-ink transition-colors hover:text-gold"
          >
            <UserRound className="h-4 w-4" />
            My Account
          </a>

          <p className="mt-5 text-[10px] uppercase tracking-[0.2em] text-stone">
            Timeless pieces. Everyday elegance.
          </p>
        </div>
      </SheetContent>
    </Sheet>

  );
}
