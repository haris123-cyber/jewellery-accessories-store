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
  Gem,
  House,
  LayoutGrid,
  Sparkles,
  Crown,
  Package,
  Headset,
  LogOut,
  X
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
    { label: "Home", href: "/", icon: House },
    { label: "Shop ", href: "/shop", icon: Gem },
    { label: "Collections", href: "/collections", icon: LayoutGrid },
    { label: "New Arrivals", href: "/new-arrivals", icon: Sparkles },
    { label: "Bestsellers", href: "/bestsellers", icon: Crown },
  ];

  const profileItems = [
    { label: "My Account", href: "/account", icon: UserRound },
    { label: "Wishlist", href: "/wishlist", icon: Heart },
    { label: "Orders", href: "/account/orders", icon: Package },
    { label: "Contact", href: "/contact", icon: Headset },
  ];

  return (
    <Sheet open={menu} onOpenChange={setMenu}>
      <SheetContent
        side="left"
        showCloseButton={false}
        className="!w-[min(88vw,390px)] !max-w-none !bg-[#FAF7F1] p-0
          border-r border-[#E6D8C5] flex flex-col overflow-hidden
          rounded-r-[26px] shadow-2xl"
      >
        {/* Luxury header */}
        <div className="relative shrink-0 overflow-hidden bg-[#946344] px-6 pb-7 pt-7 text-[#FFF9EF]">
          {/* Custom Luxury Close Button */}
          <button
            type="button"
            onClick={() => setMenu(false)}
            aria-label="Close menu"
            suppressHydrationWarning
            className="absolute top-5 right-5 z-20 w-8 h-8 rounded-full bg-black/20 hover:bg-black/35 active:scale-95 text-[#FFF9EF] flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="w-4 h-4" strokeWidth={2} />
          </button>

          <SheetHeader className="relative z-10 flex ">
            <div className="flex items-center justify-between pr-0">
              <SheetTitle className="font-serif text-[25px] text-center font-normal tracking-[0.34em] text-[#FFF9EF]">
                WOXLY
              </SheetTitle>
            </div>

            <SheetDescription className="mt-1 text-[8px] uppercase tracking-[0.25em] text-[#F0DCC5]">
              Timeless jewellery, made for you
            </SheetDescription>
          </SheetHeader>

          {/* Decorative detail */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#D8B47C]/70" />
            <Gem className="h-4 w-4 text-[#E8C58D]" />
            <span className="h-px w-10 bg-[#D8B47C]/70" />
          </div>

          <p className="mt-2 text-center font-serif text-[21px] tracking-wide">
            Discover your style
          </p>

          {/* Soft curved bottom edge */}
          <div className="pointer-events-none absolute -bottom-7 left-0 h-12 w-full rounded-[50%] bg-[#FAF7F1]" />
        </div>

        {/* Scrollable navigation */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain no-scrollbar px-5 pb-5 pt-5">
          <p className="mb-3 px-2 text-[10px] font-medium uppercase tracking-[0.25em] text-[#65736A]">
            General
          </p>

          <nav className="space-y-1">
            {navItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenu(false)}
                  className={`group flex min-h-[58px] items-center gap-4 rounded-full
                    px-4 transition-all duration-200
                  `}
                >
                  <Icon
                    className={`h-[21px] w-[21px] shrink-0 transition-colors
                      ${index === 1
                        ? "text-[#946344]"
                        : "text-[#294238] group-hover:text-[#946344]"
                      }`}
                    strokeWidth={1.6}
                  />

                  <span className="flex-1 font-serif text-[17px] tracking-wide">
                    {item.label}
                  </span>

                  {item.label === "New Arrivals" && (
                    <span className="rounded-full bg-[#946344] px-2.5 py-1 text-[8px] uppercase tracking-[0.15em] text-white">
                      New
                    </span>
                  )}


                </a>
              );
            })}
          </nav>

          <div className="my-5 h-px bg-[#E8DDCF]" />

          <p className="mb-3 px-2 text-[10px] font-medium uppercase tracking-[0.25em] text-[#65736A]">
            Profile
          </p>

          <nav className="space-y-1">
            {profileItems.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenu(false)}
                  className="group flex min-h-[52px] items-center gap-4 rounded-full
                    px-4 text-[#20382F] transition-colors duration-200
                    hover:bg-[#F2E9DD]"
                >
                  <Icon
                    className={`h-[21px] w-[21px] shrink-0 transition-colors
                       "text-[#294238] group-hover:text-[#946344]"
                      }`}
                    strokeWidth={1.6}
                  />


                  <span className="flex-1 font-serif text-[16px]">
                    {item.label}
                  </span>


                </a>
              );
            })}
          </nav>

          <div className="my-5 h-px bg-[#E8DDCF]" />

          <button
            type="button"
            suppressHydrationWarning
            onClick={() => {
              localStorage.removeItem("token");
              setMenu(false);
              window.location.href = "/login";
            }}
            className="flex min-h-[52px] w-full items-center gap-4 rounded-full px-4 text-[#A95F43] transition-colors hover:bg-[#F2E9DD]"
          >
            <LogOut className="h-5 w-5" strokeWidth={1.6} />
            <span className="flex-1 text-left font-serif text-[16px]">
              Sign Out
            </span>
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>

        {/* Fixed footer */}
        <div className="shrink-0 border-t border-[#E6D8C5] bg-[#FAF7F1] px-5 pb-5 pt-4">
          <a
            href="/account"
            onClick={() => setMenu(false)}
            className="flex items-center gap-3 rounded-2xl bg-[#946344] px-2 py-2 text-[#FFF9EF]
              transition-colors hover:bg-[#214536]"
          >
            <div className="flex ml-2 h-8 w-8 items-center justify-center rounded-full border border-white">
              <UserRound className="h-4 w-4 text-white" strokeWidth={1.5} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="font-serif text-[16px] text-white">My Account</p>
              <p className="mt-1 text-[10px] tracking-wide text-white">
                Orders · Wishlist · Profile
              </p>
            </div>

            <ArrowRight className="h-4 w-4 text-[#E8C58D]" />
          </a>

          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#B08A55]" />
            <Sparkles className="h-3.5 w-3.5 text-[#B08A55]" />
            <span className="h-px w-8 bg-[#B08A55]" />
          </div>

          <p className="mt-2 text-center text-[9px] uppercase tracking-[0.19em] text-[#65736A]">
            Timeless pieces. Everyday elegance.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}


