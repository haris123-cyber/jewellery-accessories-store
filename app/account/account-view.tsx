"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  PenLine,
  Gem,
  Package,
  Heart,
  MapPin,
  CreditCard,
  ChevronRight,
  UserRound,
  Ruler,
  Bell,
  Settings,
  Headphones,
  ShieldCheck,
  Truck,
  RotateCcw,
  LogOut,
  ArrowLeft,
  PackageCheck,
  Link
} from "lucide-react";
import { Shell } from "@/components/layout";
import { useCommerceStore } from "@/store/commerce-store";
import { products, money, getProduct } from "@/lib/catalog";
import { ProductCard, ProductVisual } from "@/components/shared";

function WishlistTabContent() {
  const wishlist = useCommerceStore((s) => s.wishlist);
  const list = products.filter((p) => wishlist.includes(p.slug));

  if (!list.length) {
    return (
      <div className="border border-border p-[32px] md:p-[48px] flex flex-col items-center justify-center text-center gap-4 bg-white rounded-[20px] shadow-sm">
        <Heart className="w-[48px] h-[48px] text-stone/50" />
        <p className="text-[14px] text-stone">Your wishlist is empty.</p>
        <a href="/shop" className="btn-primary mt-4 rounded-full px-8 text-[12px] h-[48px]">Explore Collection</a>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-[16px]">
      {list.map((p, i) => (
        <ProductCard product={p} index={i} key={p.slug} />
      ))}
    </div>
  );
}

export function Account() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "overview");
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(searchParams.get("id"));
  const orders = useCommerceStore((s) => s.orders);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Shell>
      <div className="bg-[#FCF9F2] min-h-[70vh] py-8 px-4 md:py-12 md:px-8">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-[320px_1fr] gap-8 md:gap-16 items-start">
          
          {/* Sidebar (Always visible on desktop, visible on mobile if tab is overview) */}
          <div className={`flex-col gap-8 animate-in fade-in duration-300 ${activeTab === "overview" ? "flex" : "hidden md:flex"}`}>
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-[52px] h-[52px] bg-[#1C3A32] rounded-full flex items-center justify-center text-[#E5D5A4] text-[18px] font-serif">
                  AN
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-[0.15em] text-stone font-medium mb-1">
                    Welcome back
                  </span>
                  <h1 className="text-[26px] font-serif text-ink m-0 leading-none">
                    Anjali Nair
                  </h1>
                </div>
              </div>
              <button className="text-stone hover:text-ink transition-colors md:hidden">
                <PenLine className="w-5 h-5" />
              </button>
            </div>

            {/* Loyalty Card */}
            <div className="bg-[#1C3A32] rounded-[20px] p-6 text-white shadow-sm relative overflow-hidden">
              <div className="flex justify-between items-start mb-5">
                <span className="text-[9px] uppercase tracking-[0.15em] text-white/70 font-medium">
                  Woxly Circle · Gold
                </span>
                <Gem className="w-5 h-5 text-white/80" />
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-[36px] font-serif text-[#E5D5A4] leading-none">2,480</span>
                <span className="text-[13px] text-white/80 font-medium">points</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="h-[4px] bg-white/10 rounded-full w-full overflow-hidden">
                  <div className="h-full bg-[#E5D5A4] w-[80%] rounded-full"></div>
                </div>
                <span className="text-[11px] text-white/70 font-medium">
                  520 points to Platinum
                </span>
              </div>
            </div>

            {/* Account Menu */}
            <div className="flex flex-col gap-3">
              <span className="text-[10px] uppercase tracking-[0.14em] text-stone font-medium px-1">
                Account
              </span>
              <div className="bg-white border border-border rounded-[20px] overflow-hidden shadow-sm flex flex-col">
                {[
                  { icon: UserRound, title: "Profile details", sub: "Name, email, mobile", id: "profile" },
                  { icon: Package, title: "My Orders", sub: "", id: "orders" },
                  { icon: Heart, title: "Wishlist", sub: "", id: "wishlist" },
                  { icon: MapPin, title: "Addresses", sub: "", id: "addresses" },
                  { icon: Settings, title: "Settings", sub: "", id: "settings" },
                  { icon: Headphones, title: "Help and support", sub: "Chat with a jewellery expert", id: "/contact" },
                ].map((item, i) => (
                  <button key={i} onClick={() => item.id.startsWith('/') ? router.push(item.id) : setActiveTab(item.id)} className={`flex items-center gap-4 p-[18px] border-b border-border last:border-0 hover:bg-sand/30 transition-colors text-left group ${activeTab === item.id ? "bg-sand/20" : ""}`}>
                    <div className={`w-[42px] h-[42px] rounded-full flex items-center justify-center shrink-0 ${activeTab === item.id ? "bg-[#1C3A32]" : "bg-[#FDFBF7]"}`}>
                      <item.icon className={`w-[18px] h-[18px] stroke-[1.5] ${activeTab === item.id ? "text-white" : "text-ink"}`} />
                    </div>
                    <div className="flex flex-col flex-1 justify-center gap-0.5">
                      <span className="text-[14px] font-medium text-ink">{item.title}</span>
                      {item.sub && <span className="text-[12px] text-stone">{item.sub}</span>}
                    </div>
                    <ChevronRight className="w-4 h-4 text-stone/50 group-hover:text-ink transition-colors" />
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Only: Recent Orders inside Sidebar so they show on overview tab on mobile */}
            <div className="flex flex-col gap-3 md:hidden">
              <span className="text-[10px] uppercase tracking-[0.14em] text-stone font-medium px-1">
                Recent Orders
              </span>

              {orders.length > 0 ? (
                orders.slice(0, 1).map((order) => {
                  const product = getProduct(order.lines[0]?.slug);
                  return (
                    <div key={order.id} className="bg-white border border-border rounded-[20px] p-5 shadow-sm flex flex-col gap-5">
                      <div className="flex justify-between items-center">
                        <span className="text-[13px] font-medium text-ink">Order #{order.id}</span>
                        <span className="bg-sand text-ink text-[9px] uppercase tracking-[0.1em] font-bold px-3 py-1.5 rounded-full">
                          Processing
                        </span>
                      </div>

                      <div className="flex gap-4 items-center mb-1">
                        <div className="w-[120px] h-[120px] border border-border rounded-[12px] flex items-center justify-center shrink-0 overflow-hidden bg-sand relative">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-[14px] font-medium text-ink line-clamp-1">{product.name}</span>
                          <span className="text-[12px] text-stone">{product.material} · Qty {order.lines[0]?.quantity || 1}</span>
                          {order.lines.length > 1 && <span className="text-[11px] text-stone mt-1">+ {order.lines.length - 1} more items</span>}
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-3 border-t border-border">
                        <span className="text-[12px] text-stone font-medium">Placed on {order.date}</span>
                        <button onClick={() => { setSelectedOrderId(order.id); setActiveTab("order-details"); }} className="text-[10px] font-bold text-ink uppercase tracking-[0.1em] underline underline-offset-4 decoration-border hover:decoration-ink transition-colors">
                          View Order
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="bg-white border border-border rounded-[20px] p-8 shadow-sm flex flex-col items-center justify-center text-center gap-4">
                  <PackageCheck className="w-[32px] h-[32px] text-stone/50" />
                  <p className="text-[13px] text-stone">You haven't placed any orders yet.</p>
                </div>
              )}
            </div>

            {/* Trust Badges */}
            <div className="flex justify-between items-center px-6 py-2">
              {[
                { icon: ShieldCheck, label: "BIS hallmarked" },
                { icon: Truck, label: "Insured delivery" },
                { icon: RotateCcw, label: "30-day returns" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-2 text-center">
                  <item.icon className="w-5 h-5 text-ink" strokeWidth={1.5} />
                  <span className="text-[9px] text-stone font-medium">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Sign Out */}
            <button className="w-full h-[52px] border border-border bg-transparent rounded-full flex items-center justify-center gap-3 hover:bg-white hover:shadow-sm transition-all text-ink mt-4">
              <LogOut className="w-[15px] h-[15px]" strokeWidth={2} />
              <span className="text-[10px] uppercase tracking-[0.18em] font-bold">Sign Out</span>
            </button>
          </div>

          {/* Main Content Area */}
          <div className={`flex-col gap-8 animate-in fade-in duration-300 ${activeTab === "overview" ? "hidden md:flex" : "flex"}`}>
            {activeTab !== "overview" && (
              <button
                onClick={() => setActiveTab("overview")}
                className="flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] font-bold text-stone mb-4 hover:text-ink transition-colors md:hidden"
              >
                <ArrowLeft className="w-4 h-4" /> Back to dashboard
              </button>
            )}

            {/* Desktop Overview */}
            {activeTab === "overview" && (
              <div className="hidden md:flex flex-col gap-6">
                <h2 className="text-[32px] font-serif text-ink mb-2">Dashboard</h2>
                
                <span className="text-[10px] uppercase tracking-[0.14em] text-stone font-medium px-1">
                  Recent Orders
                </span>

                {orders.length > 0 ? (
                  orders.slice(0, 1).map((order) => {
                    const product = getProduct(order.lines[0]?.slug);
                    return (
                      <div key={order.id} className="bg-white border border-border rounded-[20px] p-6 shadow-sm flex flex-col gap-6">
                        <div className="flex justify-between items-center">
                          <span className="text-[14px] font-medium text-ink">Order #{order.id}</span>
                          <span className="bg-sand text-ink text-[10px] uppercase tracking-[0.1em] font-bold px-4 py-2 rounded-full">
                            Processing
                          </span>
                        </div>

                        <div className="flex gap-6 items-center mb-2">
                          <div className="w-[140px] h-[140px] border border-border rounded-[12px] flex items-center justify-center shrink-0 overflow-hidden bg-sand relative">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <span className="text-[16px] font-medium text-ink line-clamp-1">{product.name}</span>
                            <span className="text-[14px] text-stone">{product.material} · Qty {order.lines[0]?.quantity || 1}</span>
                            {order.lines.length > 1 && <span className="text-[12px] text-stone mt-1">+ {order.lines.length - 1} more items</span>}
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t border-border">
                          <span className="text-[13px] text-stone font-medium">Placed on {order.date}</span>
                          <button onClick={() => { setSelectedOrderId(order.id); setActiveTab("order-details"); }} className="text-[11px] font-bold text-ink uppercase tracking-[0.12em] underline underline-offset-4 decoration-border hover:decoration-ink transition-colors">
                            View Order
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="bg-white border border-border rounded-[20px] p-12 shadow-sm flex flex-col items-center justify-center text-center gap-4">
                    <PackageCheck className="w-[48px] h-[48px] text-stone/50" />
                    <p className="text-[14px] text-stone">You haven't placed any orders yet.</p>
                  </div>
                )}
              </div>
            )}

          {activeTab === "orders" && (
            <div className="flex flex-col gap-6 animate-in fade-in duration-300">
              <h2 className="text-[32px] font-serif text-ink">Order History</h2>

              {orders.length > 0 ? (
                orders.map((order) => {
                  const product = getProduct(order.lines[0]?.slug);
                  return (
                    <div key={order.id} className="bg-white border border-border rounded-[20px] p-5 shadow-sm flex flex-col gap-5">
                      <div className="flex justify-between items-center">
                        <span className="text-[13px] font-medium text-ink">Order #{order.id}</span>
                        <span className="bg-sand text-ink text-[9px] uppercase tracking-[0.1em] font-bold px-3 py-1.5 rounded-full">
                          Processing
                        </span>
                      </div>

                      <div className="flex gap-4 items-center mb-1">
                        <div className="w-[120px] h-[120px] border border-border rounded-[12px] flex items-center justify-center shrink-0 overflow-hidden bg-sand relative">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-[14px] font-medium text-ink line-clamp-1">{product.name}</span>
                          <span className="text-[12px] text-stone">{product.material} · Qty {order.lines[0]?.quantity || 1}</span>
                          {order.lines.length > 1 && <span className="text-[11px] text-stone mt-1">+ {order.lines.length - 1} more items</span>}
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-3 border-t border-border">
                        <span className="text-[12px] text-stone font-medium">Placed on {order.date}</span>
                        <button onClick={() => { setSelectedOrderId(order.id); setActiveTab("order-details"); }} className="text-[10px] font-bold text-ink uppercase tracking-[0.1em] underline underline-offset-4 decoration-border hover:decoration-ink transition-colors">
                          View Order
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="bg-white border border-border rounded-[20px] p-8 shadow-sm flex flex-col items-center justify-center text-center gap-4">
                  <PackageCheck className="w-[32px] h-[32px] text-stone/50" />
                  <p className="text-[13px] text-stone">You haven't placed any orders yet.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "order-details" && (
            (() => {
              const order = orders.find(o => o.id === selectedOrderId) || orders[0];
              if (!order) return <div className="text-stone">Order not found.</div>;

              return (
                <div className="flex flex-col gap-6 animate-in fade-in duration-300">
                  <div className="flex flex-col">
                    <h2 className="text-[32px] font-serif text-ink">Order #{order.id}</h2>
                    <span className="text-[12px] text-stone">Placed on {order.date}</span>
                  </div>

                  <div className="bg-white border border-border p-6 rounded-[20px] shadow-sm flex flex-col gap-6">
                    <div className="flex justify-between items-center">
                      <span className="bg-sand text-ink text-[9px] uppercase tracking-[0.1em] font-bold px-3 py-1.5 rounded-full">
                        Processing
                      </span>
                      <span className="text-[13px] font-medium text-ink">{money(order.total)}</span>
                    </div>

                    <div className="w-full h-px bg-border"></div>

                    {order.lines.map((line, i) => {
                      const product = getProduct(line.slug);
                      return (
                        <div key={i} className="flex gap-4 items-start">
                          <div className="w-[80px] h-[80px] border border-border rounded-[12px] flex items-center justify-center shrink-0 overflow-hidden bg-sand relative">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex flex-col gap-1 flex-1">
                            <span className="text-[14px] font-medium text-ink line-clamp-1">{product.name}</span>
                            <span className="text-[12px] text-stone">{product.material}</span>
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-[12px] text-stone">Qty {line.quantity}</span>
                              <span className="text-[13px] font-medium text-ink">{money(product.price)}</span>
                            </div>
                          </div>
                        </div>
                      )
                    })}

                    <div className="w-full h-px bg-border"></div>

                    <div className="flex flex-col gap-3 text-[13px]">
                      <div className="flex justify-between text-stone">
                        <span>Subtotal</span>
                        <span>{money(order.total)}</span>
                      </div>
                      <div className="flex justify-between text-stone">
                        <span>Shipping</span>
                        <span>Free</span>
                      </div>
                      <div className="flex justify-between font-medium text-ink pt-3 border-t border-border">
                        <span>Total</span>
                        <span>{money(order.total)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <h3 className="text-[18px] font-serif text-ink">Shipping Address</h3>
                    <div className="border border-border p-5 bg-white rounded-[20px] shadow-sm">
                      <p className="text-[13px] text-stone leading-relaxed">
                        Anjali Nair<br />
                        123 Luxury Lane<br />
                        New Delhi, DL 110001<br />
                        India<br />
                        +91 98765 43210
                      </p>
                    </div>
                  </div>
                </div>
              );
            })()
          )}

          {activeTab === "wishlist" && (
            <div className="flex flex-col gap-6 animate-in fade-in duration-300">
              <h2 className="text-[32px] font-serif text-ink">Wishlist</h2>
              <WishlistTabContent />
            </div>
          )}

          {activeTab === "addresses" && (
            <div className="flex flex-col gap-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <h2 className="text-[32px] font-serif text-ink">Saved Addresses</h2>
                <button className="btn-secondary h-[40px] text-[10px] px-6 rounded-full">ADD NEW</button>
              </div>
              <div className="border border-border p-6 bg-white rounded-[20px] shadow-sm">
                <h3 className="text-[15px] font-medium text-ink mb-2">Home (Default)</h3>
                <p className="text-[13px] text-stone leading-relaxed mb-6">
                  Anjali Nair<br />
                  123 Luxury Lane<br />
                  New Delhi, DL 110001<br />
                  India<br />
                  +91 98765 43210
                </p>
                <div className="flex gap-6 text-[10px] uppercase tracking-[0.14em] font-bold">
                  <button className="text-ink hover:text-gold transition-colors underline underline-offset-4 decoration-border">EDIT</button>
                  <button className="text-error hover:opacity-80 transition-colors underline underline-offset-4 decoration-error/50">DELETE</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="flex flex-col gap-6 animate-in fade-in duration-300">
              <h2 className="text-[32px] font-serif text-ink">Profile Details</h2>
              <div className="flex flex-col gap-5 bg-white p-6 rounded-[20px] border border-border shadow-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-[0.15em] font-bold text-stone">First Name</label>
                    <input type="text" defaultValue="Anjali" className="h-[48px] border border-border px-4 bg-pearl text-ink focus:border-gold outline-none rounded-[10px] text-[14px]" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-[0.15em] font-bold text-stone">Last Name</label>
                    <input type="text" defaultValue="Nair" className="h-[48px] border border-border px-4 bg-pearl text-ink focus:border-gold outline-none rounded-[10px] text-[14px]" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-[0.15em] font-bold text-stone">Email Address</label>
                  <input type="email" defaultValue="anjali@example.com" className="h-[48px] border border-border px-4 bg-pearl text-ink focus:border-gold outline-none rounded-[10px] text-[14px]" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-[0.15em] font-bold text-stone">Phone Number</label>
                  <input type="tel" defaultValue="+91 98765 43210" className="h-[48px] border border-border px-4 bg-pearl text-ink focus:border-gold outline-none rounded-[10px] text-[14px]" />
                </div>
                <button className="btn-primary w-full h-[48px] mt-2 rounded-full text-[11px]">SAVE CHANGES</button>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="flex flex-col gap-6 animate-in fade-in duration-300">
              <h2 className="text-[32px] font-serif text-ink">Account Settings</h2>
              <div className="flex flex-col gap-6 border border-border p-6 bg-white rounded-[20px] shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="pr-4">
                    <h3 className="text-[14px] font-medium text-ink mb-1">Email Notifications</h3>
                    <p className="text-[12px] text-stone">Receive updates on new collections and exclusive offers.</p>
                  </div>
                  <div className="w-[44px] h-[24px] bg-ink rounded-full relative cursor-pointer shrink-0 transition-colors">
                    <div className="w-[20px] h-[20px] bg-white rounded-full absolute top-[2px] right-[2px] shadow-sm"></div>
                  </div>
                </div>
                <div className="w-full h-px bg-border"></div>
                <div className="flex items-center justify-between">
                  <div className="pr-4">
                    <h3 className="text-[14px] font-medium text-ink mb-1">SMS Alerts</h3>
                    <p className="text-[12px] text-stone">Get important order updates on your phone.</p>
                  </div>
                  <div className="w-[44px] h-[24px] bg-border hover:bg-stone/20 rounded-full relative cursor-pointer shrink-0 transition-colors">
                    <div className="w-[20px] h-[20px] bg-white rounded-full absolute top-[2px] left-[2px] shadow-sm"></div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-border p-6 rounded-[20px] shadow-sm">
                <h3 className="text-[18px] font-serif text-ink mb-4">Security</h3>
                <button className="btn-secondary h-[48px] px-8 text-[10px] rounded-full w-full">CHANGE PASSWORD</button>
              </div>
            </div>
          )}

          {activeTab === "sizes" && (
            <div className="flex flex-col gap-6 animate-in fade-in duration-300">
              <h2 className="text-[32px] font-serif text-ink">My Sizes</h2>
              <div className="flex flex-col gap-5 bg-white p-6 rounded-[20px] border border-border shadow-sm">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-[0.15em] font-bold text-stone">Ring Size (US)</label>
                  <select defaultValue="7" className="h-[48px] border border-border px-4 bg-pearl text-ink focus:border-gold outline-none rounded-[10px] text-[14px] appearance-none cursor-pointer">
                    <option value="">Select your ring size</option>
                    {[5, 6, 7, 8, 9, 10, 11, 12].map(s => <option key={s} value={s}>Size {s}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-[0.15em] font-bold text-stone">Bracelet Size</label>
                  <select defaultValue="M" className="h-[48px] border border-border px-4 bg-pearl text-ink focus:border-gold outline-none rounded-[10px] text-[14px] appearance-none cursor-pointer">
                    <option value="">Select your bracelet size</option>
                    {["XS", "S", "M", "L", "XL"].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-[0.15em] font-bold text-stone">Necklace Length</label>
                  <select defaultValue="18" className="h-[48px] border border-border px-4 bg-pearl text-ink focus:border-gold outline-none rounded-[10px] text-[14px] appearance-none cursor-pointer">
                    <option value="">Select preferred length</option>
                    <option value="14">14" (Choker)</option>
                    <option value="16">16" (Collar)</option>
                    <option value="18">18" (Princess)</option>
                    <option value="20">20" (Matinee)</option>
                  </select>
                </div>
                <button className="btn-primary w-full h-[48px] mt-2 rounded-full text-[11px]">SAVE SIZES</button>
                <div className="mt-2 text-center">
                  <button className="text-[11px] text-stone underline underline-offset-4 hover:text-ink transition-colors">
                    Need help finding your size? View Size Guide
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Missing state fallbacks */}
          {["payments", "notifications", "support"].includes(activeTab) && (
            <div className="flex flex-col gap-6 animate-in fade-in duration-300">
              <h2 className="text-[32px] font-serif text-ink capitalize">{activeTab}</h2>
              <div className="border border-border p-[32px] flex flex-col items-center justify-center text-center gap-4 bg-white rounded-[20px] shadow-sm">
                <p className="text-[14px] text-stone">This section is currently under construction.</p>
              </div>
            </div>
          )}

          </div>
        </div>
      </div>
    </Shell>
  );
}
