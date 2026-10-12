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
  Check,
  Clock,
  Sparkles,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import Link from "next/link";

const getDeliveryDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 4);
  return date.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
};
import { Shell } from "@/components/layout";
import { useCommerceStore } from "@/store/commerce-store";
import { products, money, getProduct, type Product } from "@/lib/catalog";
import { ProductCard, ProductVisual } from "@/components/shared";

function WishlistTabContent() {
  const { wishlist, toggleWishlist, add } = useCommerceStore();
  const list = products.filter((p) => wishlist.includes(p.slug));
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const handleConfirmDelete = () => {
    if (!productToDelete) return;
    toggleWishlist(productToDelete.slug);
    toast.success(`${productToDelete.name} removed from wishlist`);
    setProductToDelete(null);
  };

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
    <>
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-[16px]">
        {list.map((p) => (
          <div key={p.slug} className="bg-white border border-border rounded-[16px] p-3.5 shadow-xs flex flex-col gap-3">
            <div className="aspect-[3/4] w-full rounded-[8px] overflow-hidden bg-sand relative">
              <a href={`/product/${p.slug}`} className="block w-full h-full">
                <ProductVisual cell={p.cell} name={p.name} image={p.image} />
              </a>
              <button
                type="button"
                onClick={() => setProductToDelete(p)}
                aria-label="Remove item"
                title="Remove from wishlist"
                className="absolute right-2.5 top-2.5 w-8 h-8 rounded-full bg-ivory/90 hover:bg-white text-stone hover:text-red-600 shadow-sm flex items-center justify-center transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex flex-col flex-1">
              <h4 className="text-[14px] font-medium text-ink line-clamp-1 mb-1">
                <a href={`/product/${p.slug}`} className="hover:text-gold transition-colors">{p.name}</a>
              </h4>
              <p className="text-[12px] text-stone mb-2">{money(p.price)}</p>
              <div className="flex gap-2 mt-auto p-0 sm:pt-2 border-t border-border/60">
                <button
                  type="button"
                  onClick={() => {
                    add(p.slug);
                    toast.success(`${p.name} added to your bag`);
                  }}
                  className="btn-primary gap-0 flex-1 h-[34px]  text-[8px] sm:text-[10px] uppercase tracking-wider whitespace-nowrap font-semibold rounded-[4px]"
                >
                  Add to Bag
                </button>
                <button
                  type="button"
                  onClick={() => setProductToDelete(p)}
                  aria-label="Delete item"
                  title="Remove from wishlist"
                  className="w-[34px] h-[46px] border border-border rounded-[4px] flex items-center justify-center text-stone hover:text-red-600 hover:border-red-400 hover:bg-red-50 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AlertDialog open={!!productToDelete} onOpenChange={(open) => !open && setProductToDelete(null)}>
        <AlertDialogContent className="sm:max-w-[420px] rounded-[24px] border border-[#E5E0D8] bg-[#FAF7F2] p-6 sm:p-7 shadow-2xl">
          <AlertDialogHeader className="flex flex-col items-center text-center">
            <div className="w-13 h-13 rounded-full bg-sand/80 border border-[#DDD5C7] text-ink flex items-center justify-center mb-2.5 shadow-2xs">
              <Trash2 className="w-5 h-5 text-ink/80 stroke-[1.75]" />
            </div>
            <AlertDialogTitle className="font-serif text-[22px] sm:text-[24px] text-ink font-normal tracking-tight">
              Remove from Wishlist?
            </AlertDialogTitle>
            {productToDelete && (
              <div className="mt-3.5 w-full bg-white/95 border border-[#E5E0D8] rounded-[16px] p-3 flex items-center gap-3.5 text-left shadow-2xs">
                <div className="w-14 h-14 rounded-[10px] overflow-hidden bg-sand shrink-0 border border-border/70">
                  <img src={productToDelete.image} alt={productToDelete.name} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-semibold text-ink truncate tracking-tight">{productToDelete.name}</p>
                  <p className="text-[12px] text-stone font-medium mt-0.5">{money(productToDelete.price)}</p>
                </div>
              </div>
            )}
            <AlertDialogDescription className="text-[13px] text-stone mt-2.5 leading-relaxed text-center">
              Are you sure you want to remove this piece from your saved wishlist?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-col-reverse gap-2.5 mt-5 w-full shrink-0">
            <AlertDialogCancel className="w-full h-[48px] min-h-[48px] shrink-0 rounded-full border border-border/90 bg-transparent hover:bg-sand/50 text-ink text-[11px] uppercase tracking-[0.16em] font-semibold transition-all cursor-pointer flex items-center justify-center">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="w-full h-[48px] min-h-[48px] shrink-0 rounded-full bg-ink hover:bg-black text-ivory text-[11px] uppercase tracking-[0.16em] font-semibold transition-all shadow-sm cursor-pointer flex items-center justify-center"
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export interface SavedAddress {
  id: string;
  type: "Home" | "Work" | "Other";
  isDefault: boolean;
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

const DEFAULT_ADDRESSES: SavedAddress[] = [
  {
    id: "addr-1",
    type: "Home",
    isDefault: true,
    name: "Anjali Nair",
    street: "123 Luxury Lane",
    city: "New Delhi",
    state: "DL",
    pincode: "110001",
    country: "India",
    phone: "+91 98765 43210",
  },
];

function AddressesTabContent() {
  const [addresses, setAddresses] = useState<SavedAddress[]>(DEFAULT_ADDRESSES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<SavedAddress | null>(null);
  const [addressToDelete, setAddressToDelete] = useState<SavedAddress | null>(null);

  const [formData, setFormData] = useState({
    type: "Home" as "Home" | "Work" | "Other",
    name: "Anjali Nair",
    phone: "+91 98765 43210",
    street: "",
    city: "New Delhi",
    state: "Delhi",
    pincode: "",
    country: "India",
    isDefault: false,
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem("woxly_saved_addresses");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setAddresses(parsed);
        }
      }
    } catch {
      // fallback to DEFAULT_ADDRESSES
    }
  }, []);

  const saveAddresses = (newList: SavedAddress[]) => {
    setAddresses(newList);
    try {
      localStorage.setItem("woxly_saved_addresses", JSON.stringify(newList));
    } catch {
      // ignore
    }
  };

  const handleOpenAddModal = () => {
    setEditingAddress(null);
    setFormData({
      type: "Home",
      name: "Anjali Nair",
      phone: "+91 98765 43210",
      street: "",
      city: "New Delhi",
      state: "Delhi",
      pincode: "",
      country: "India",
      isDefault: addresses.length === 0,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (addr: SavedAddress) => {
    setEditingAddress(addr);
    setFormData({
      type: addr.type,
      name: addr.name,
      phone: addr.phone,
      street: addr.street,
      city: addr.city,
      state: addr.state,
      pincode: addr.pincode,
      country: addr.country,
      isDefault: addr.isDefault,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.street.trim() || !formData.city.trim() || !formData.pincode.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (editingAddress) {
      const updatedList = addresses.map((a) => {
        if (a.id === editingAddress.id) {
          return { ...a, ...formData };
        }
        if (formData.isDefault) {
          return { ...a, isDefault: false };
        }
        return a;
      });
      saveAddresses(updatedList);
      toast.success("Address updated successfully");
    } else {
      const newAddr: SavedAddress = {
        id: "addr-" + Date.now(),
        ...formData,
      };
      let updatedList = [...addresses];
      if (formData.isDefault || updatedList.length === 0) {
        newAddr.isDefault = true;
        updatedList = updatedList.map((a) => ({ ...a, isDefault: false }));
      }
      updatedList.push(newAddr);
      saveAddresses(updatedList);
      toast.success("Address added successfully");
    }

    setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (!addressToDelete) return;
    let updatedList = addresses.filter((a) => a.id !== addressToDelete.id);
    if (addressToDelete.isDefault && updatedList.length > 0) {
      updatedList[0].isDefault = true;
    }
    saveAddresses(updatedList);
    toast.success("Address removed");
    setAddressToDelete(null);
  };

  const handleSetDefault = (id: string) => {
    const updatedList = addresses.map((a) => ({
      ...a,
      isDefault: a.id === id,
    }));
    saveAddresses(updatedList);
    toast.success("Default address updated");
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <h2 className="text-[32px] font-serif text-ink">Saved Addresses</h2>
        <button
          type="button"
          onClick={handleOpenAddModal}
          className="btn-secondary h-[40px] text-[10px] px-6 rounded-full cursor-pointer hover:border-ink"
        >
          ADD NEW
        </button>
      </div>

      {addresses.length === 0 ? (
        <div className="border border-border/80 p-10 bg-white rounded-[20px] text-center flex flex-col items-center justify-center gap-4">
          <div className="w-12 h-12 rounded-full bg-sand/60 flex items-center justify-center text-stone">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-[16px] font-medium text-ink">No saved addresses</h3>
            <p className="text-[13px] text-stone mt-1">Add a shipping address for faster and easier checkout.</p>
          </div>
          <button
            type="button"
            onClick={handleOpenAddModal}
            className="btn-primary text-[11px] h-[42px] px-6 rounded-full mt-2"
          >
            Add New Address
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={`border p-6 bg-white rounded-[20px] shadow-sm flex flex-col justify-between transition-all ${addr.isDefault ? "border-ink/40 ring-1 ring-ink/10" : "border-border hover:border-border/90"
                }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-[15px] font-medium text-ink">
                    {addr.type} {addr.isDefault && <span className="text-stone font-normal">(Default)</span>}
                  </h3>
                  {addr.isDefault ? (
                    <span className="bg-sand text-ink text-[9px] uppercase tracking-[0.12em] font-bold px-2.5 py-1 rounded-full">
                      Default
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleSetDefault(addr.id)}
                      className="text-[10px] uppercase tracking-[0.12em] text-stone hover:text-ink font-semibold transition-colors cursor-pointer"
                    >
                      Set as Default
                    </button>
                  )}
                </div>

                <p className="text-[13px] text-stone leading-relaxed mb-6">
                  <span className="font-medium text-ink">{addr.name}</span><br />
                  {addr.street}<br />
                  {addr.city}, {addr.state} {addr.pincode}<br />
                  {addr.country}<br />
                  {addr.phone}
                </p>
              </div>

              <div className="flex gap-6 text-[10px] uppercase tracking-[0.14em] font-bold pt-3 border-t border-border/60">
                <button
                  type="button"
                  onClick={() => handleOpenEditModal(addr)}
                  className="text-ink hover:text-gold transition-colors underline underline-offset-4 decoration-border cursor-pointer"
                >
                  EDIT
                </button>
                <button
                  type="button"
                  onClick={() => setAddressToDelete(addr)}
                  className="text-error hover:opacity-80 transition-colors underline underline-offset-4 decoration-error/50 cursor-pointer"
                >
                  DELETE
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Address Dialog */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto rounded-[24px] border border-[#E5E0D8] bg-[#FAF7F2] p-6 sm:p-7 shadow-2xl">
          <DialogHeader className="text-left mb-2">
            <DialogTitle className="font-serif text-[24px] text-ink">
              {editingAddress ? "Edit Address" : "Add New Address"}
            </DialogTitle>
            <DialogDescription className="text-[13px] text-stone mt-1">
              Enter your shipping details for seamless delivery and checkout.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
            {/* Address Type selection */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase tracking-[0.14em] font-bold text-stone">Address Type</label>
              <div className="flex gap-2">
                {(["Home", "Work", "Other"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, type: t }))}
                    className={`h-[36px] px-5 rounded-full text-[11px] uppercase tracking-[0.12em] font-semibold transition-all cursor-pointer ${formData.type === t
                      ? "bg-ink text-ivory shadow-xs"
                      : "bg-white border border-border text-ink hover:bg-sand/40"
                      }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Name and Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-[0.14em] font-bold text-stone">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. Anjali Nair"
                  className="h-[44px] border border-border px-3.5 bg-white text-ink focus:border-gold outline-none rounded-[10px] text-[13px]"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-[0.14em] font-bold text-stone">Mobile Number *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  placeholder="e.g. +91 98765 43210"
                  className="h-[44px] border border-border px-3.5 bg-white text-ink focus:border-gold outline-none rounded-[10px] text-[13px]"
                />
              </div>
            </div>

            {/* Street Address */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase tracking-[0.14em] font-bold text-stone">Street Address / House No. *</label>
              <input
                type="text"
                required
                value={formData.street}
                onChange={(e) => setFormData((prev) => ({ ...prev, street: e.target.value }))}
                placeholder="e.g. 123 Luxury Lane, Apt 4B"
                className="h-[44px] border border-border px-3.5 bg-white text-ink focus:border-gold outline-none rounded-[10px] text-[13px]"
              />
            </div>

            {/* City & State */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-[0.14em] font-bold text-stone">City *</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
                  placeholder="e.g. New Delhi"
                  className="h-[44px] border border-border px-3.5 bg-white text-ink focus:border-gold outline-none rounded-[10px] text-[13px]"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-[0.14em] font-bold text-stone">State *</label>
                <input
                  type="text"
                  required
                  value={formData.state}
                  onChange={(e) => setFormData((prev) => ({ ...prev, state: e.target.value }))}
                  placeholder="e.g. Delhi"
                  className="h-[44px] border border-border px-3.5 bg-white text-ink focus:border-gold outline-none rounded-[10px] text-[13px]"
                />
              </div>
            </div>

            {/* PIN Code & Country */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-[0.14em] font-bold text-stone">PIN Code *</label>
                <input
                  type="text"
                  required
                  value={formData.pincode}
                  onChange={(e) => setFormData((prev) => ({ ...prev, pincode: e.target.value }))}
                  placeholder="e.g. 110001"
                  className="h-[44px] border border-border px-3.5 bg-white text-ink focus:border-gold outline-none rounded-[10px] text-[13px]"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-[0.14em] font-bold text-stone">Country</label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => setFormData((prev) => ({ ...prev, country: e.target.value }))}
                  className="h-[44px] border border-border px-3.5 bg-white text-ink focus:border-gold outline-none rounded-[10px] text-[13px]"
                />
              </div>
            </div>

            {/* Set as Default Checkbox */}
            <label className="flex items-center gap-2.5 mt-1 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={formData.isDefault}
                onChange={(e) => setFormData((prev) => ({ ...prev, isDefault: e.target.checked }))}
                className="w-4 h-4 rounded text-ink accent-ink focus:ring-gold cursor-pointer"
              />
              <span className="text-[13px] text-ink font-medium">Make this my default shipping address</span>
            </label>

            {/* Actions */}
            <div className="flex flex-col-reverse sm:flex-row gap-3 mt-5 pt-3 border-t border-border/80 shrink-0">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-full sm:flex-1 h-[48px] min-h-[48px] shrink-0 rounded-full border border-border/90 bg-transparent hover:bg-sand/40 text-ink text-[11px] uppercase tracking-[0.14em] font-semibold transition-all cursor-pointer flex items-center justify-center"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full sm:flex-1 h-[48px] min-h-[48px] shrink-0 rounded-full bg-ink hover:bg-black text-ivory text-[11px] uppercase tracking-[0.14em] font-semibold transition-all shadow-sm cursor-pointer flex items-center justify-center"
              >
                {editingAddress ? "Update Address" : "Save Address"}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Address Confirmation Dialog */}
      <AlertDialog open={!!addressToDelete} onOpenChange={(open) => !open && setAddressToDelete(null)}>
        <AlertDialogContent className="sm:max-w-[420px] rounded-[24px] border border-[#E5E0D8] bg-[#FAF7F2] p-6 sm:p-7 shadow-2xl">
          <AlertDialogHeader className="flex flex-col items-center text-center">
            <div className="w-13 h-13 rounded-full bg-sand/80 border border-[#DDD5C7] text-ink flex items-center justify-center mb-2.5 shadow-2xs">
              <Trash2 className="w-5 h-5 text-ink/80 stroke-[1.75]" />
            </div>
            <AlertDialogTitle className="font-serif text-[22px] sm:text-[24px] text-ink font-normal tracking-tight">
              Delete Address?
            </AlertDialogTitle>
            {addressToDelete && (
              <div className="mt-3.5 w-full bg-white/95 border border-[#E5E0D8] rounded-[16px] p-3.5 text-left shadow-2xs">
                <p className="text-[13px] font-semibold text-ink">{addressToDelete.type} Address</p>
                <p className="text-[12px] text-stone mt-1 leading-relaxed">
                  {addressToDelete.name}<br />
                  {addressToDelete.street}<br />
                  {addressToDelete.city}, {addressToDelete.state} {addressToDelete.pincode}
                </p>
              </div>
            )}
            <AlertDialogDescription className="text-[13px] text-stone mt-2.5 leading-relaxed text-center">
              Are you sure you want to remove this saved address? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-col-reverse gap-2.5 mt-5 w-full shrink-0">
            <AlertDialogCancel className="w-full h-[48px] min-h-[48px] shrink-0 rounded-full border border-border/90 bg-transparent hover:bg-sand/50 text-ink text-[11px] uppercase tracking-[0.16em] font-semibold transition-all cursor-pointer flex items-center justify-center">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="w-full h-[48px] min-h-[48px] shrink-0 rounded-full bg-ink hover:bg-black text-ivory text-[11px] uppercase tracking-[0.16em] font-semibold transition-all shadow-sm cursor-pointer flex items-center justify-center"
            >
              Delete Address
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function SettingsTabContent() {
  const router = useRouter();
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
  });
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isSignoutEverywhereDialogOpen, setIsSignoutEverywhereDialogOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("woxly_user_preferences");
      if (saved) {
        setPreferences(JSON.parse(saved));
      }
    } catch { }
  }, []);

  const handleSavePreferences = () => {
    try {
      localStorage.setItem("woxly_user_preferences", JSON.stringify(preferences));
    } catch { }
    toast.success("Preferences saved successfully");
  };

  const handleSignOutEverywhere = () => {
    setIsSignoutEverywhereDialogOpen(false);
    toast.success("Signed out of all devices");
    router.replace("/login");
  };

  const handleDeleteAccount = () => {
    setIsDeleteDialogOpen(false);
    try {
      localStorage.removeItem("woxly_user_profile");
      localStorage.removeItem("woxly_saved_addresses");
      localStorage.removeItem("woxly_user_preferences");
    } catch { }
    toast.error("Your account has been deleted");
    router.replace("/login");
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300">
      <div>
        <h2 className="text-[32px] font-serif text-ink tracking-tight">Settings</h2>
        <p className="text-[13px] text-stone mt-1">Manage security, notifications, and account options.</p>
      </div>

      {/* Notifications Card */}
      <div className="bg-white border border-border/80 rounded-[24px] p-6 sm:p-8 shadow-xs flex flex-col gap-5">
        <div>
          <h3 className="text-[18px] font-medium text-ink">Notifications</h3>
          <p className="text-[13px] text-stone mt-0.5">Pick how you get order updates.</p>
        </div>

        <div className="flex flex-col gap-3">
          {/* Email Notifications */}
          <div className="border border-border/70 rounded-[14px] p-4 flex items-center justify-between gap-4 bg-[#FCFBF8]/30 hover:bg-[#FCFBF8] transition-colors">
            <div>
              <h4 className="text-[14px] font-semibold text-ink">Email Notifications</h4>
              <p className="text-[12px] text-stone mt-0.5">Get order updates and deals by email.</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={preferences.emailNotifications}
              onClick={() => setPreferences((p) => ({ ...p, emailNotifications: !p.emailNotifications }))}
              className={`w-[48px] h-[26px] rounded-full transition-colors relative cursor-pointer shrink-0 ${preferences.emailNotifications ? "bg-gold" : "bg-[#E5E0D8]"
                }`}
            >
              <span
                className={`block w-[20px] h-[20px] rounded-full bg-white shadow-xs transition-all absolute top-[3px] ${preferences.emailNotifications ? "right-[3px]" : "left-[3px]"
                  }`}
              />
            </button>
          </div>

          {/* Push Notifications */}
          <div className="border border-border/70 rounded-[14px] p-4 flex items-center justify-between gap-4 bg-[#FCFBF8]/30 hover:bg-[#FCFBF8] transition-colors">
            <div>
              <h4 className="text-[14px] font-semibold text-ink">Push Notifications</h4>
              <p className="text-[12px] text-stone mt-0.5">Get important updates in your browser.</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={preferences.pushNotifications}
              onClick={() => setPreferences((p) => ({ ...p, pushNotifications: !p.pushNotifications }))}
              className={`w-[48px] h-[26px] rounded-full transition-colors relative cursor-pointer shrink-0 ${preferences.pushNotifications ? "bg-gold" : "bg-[#E5E0D8]"
                }`}
            >
              <span
                className={`block w-[20px] h-[20px] rounded-full bg-white shadow-xs transition-all absolute top-[3px] ${preferences.pushNotifications ? "right-[3px]" : "left-[3px]"
                  }`}
              />
            </button>
          </div>

          {/* Marketing Emails */}
          <div className="border border-border/70 rounded-[14px] p-4 flex items-center justify-between gap-4 bg-[#FCFBF8]/30 hover:bg-[#FCFBF8] transition-colors">
            <div>
              <h4 className="text-[14px] font-semibold text-ink">Marketing Emails</h4>
              <p className="text-[12px] text-stone mt-0.5">Get offers and newsletters by email.</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={preferences.marketingEmails}
              onClick={() => setPreferences((p) => ({ ...p, marketingEmails: !p.marketingEmails }))}
              className={`w-[48px] h-[26px] rounded-full transition-colors relative cursor-pointer shrink-0 ${preferences.marketingEmails ? "bg-[#7C3AED]" : "bg-[#E5E0D8]"
                }`}
            >
              <span
                className={`block w-[20px] h-[20px] rounded-full bg-white shadow-xs transition-all absolute top-[3px] ${preferences.marketingEmails ? "right-[3px]" : "left-[3px]"
                  }`}
              />
            </button>
          </div>
        </div>

        <div className="pt-1">
          <button
            type="button"
            onClick={handleSavePreferences}
            className="inline-flex items-center gap-2 h-[42px] px-6 rounded-full bg-gold hover:bg-gold/70 text-white text-[11px] uppercase tracking-[0.14em] font-semibold transition-all shadow-xs cursor-pointer active:scale-[0.98]"
          >
            <Bell className="w-4 h-4 stroke-[2]" />
            SAVE PREFERENCES
          </button>
        </div>
      </div>

      {/* Sign out and delete Card */}
      <div className="bg-[#FEF2F2]/60 border border-[#FCA5A5]/60 rounded-[24px] p-6 sm:p-8 flex flex-col gap-4">
        <div>
          <h3 className="text-[18px] font-medium text-ink">Sign out and delete</h3>
          <p className="text-[13px] text-stone mt-0.5">These actions affect your account and sign-in.</p>
        </div>

        <div className="flex flex-col gap-3">
          {/* Sign out everywhere */}
          <button
            type="button"
            onClick={() => setIsSignoutEverywhereDialogOpen(true)}
            className="w-full bg-white border border-[#FCA5A5]/80 hover:bg-white/90 text-[#DC2626] rounded-[16px] px-5 py-4 flex items-center justify-between transition-colors shadow-2xs cursor-pointer text-left"
          >
            <span className="text-[14px] font-semibold text-[#DC2626]">Sign out everywhere</span>
            <LogOut className="w-4 h-4 text-[#DC2626] stroke-[2]" />
          </button>

          {/* Delete account */}
          <button
            type="button"
            onClick={() => setIsDeleteDialogOpen(true)}
            className="w-full bg-[#EF4444] hover:bg-[#DC2626] text-white rounded-[16px] px-5 py-4 flex items-center justify-between transition-colors shadow-2xs cursor-pointer text-left"
          >
            <span className="text-[14px] font-semibold text-white">Delete account</span>
            <Trash2 className="w-4 h-4 text-white stroke-[2]" />
          </button>
        </div>

        <p className="text-[12px] text-[#DC2626] font-normal leading-relaxed mt-0.5">
          Warning: You can't undo account deletion. All your data will be removed.
        </p>
      </div>

      {/* Sign out everywhere confirmation */}
      <AlertDialog open={isSignoutEverywhereDialogOpen} onOpenChange={setIsSignoutEverywhereDialogOpen}>
        <AlertDialogContent className="sm:max-w-[420px] rounded-[24px] border border-[#E5E0D8] bg-[#FAF7F2] p-6 sm:p-7 shadow-2xl">
          <AlertDialogHeader className="flex flex-col items-center text-center">
            <div className="w-13 h-13 rounded-full bg-sand/80 border border-[#DDD5C7] text-ink flex items-center justify-center mb-2.5 shadow-2xs">
              <LogOut className="w-5 h-5 text-ink/80 stroke-[1.75]" />
            </div>
            <AlertDialogTitle className="font-serif text-[22px] sm:text-[24px] text-ink font-normal tracking-tight">
              Sign Out Everywhere?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[13px] text-stone mt-2.5 leading-relaxed text-center">
              You will be signed out from all active sessions on your mobile devices, tablets, and computers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-col-reverse gap-2.5 mt-5 w-full shrink-0">
            <AlertDialogCancel className="w-full h-[48px] min-h-[48px] shrink-0 rounded-full border border-border/90 bg-transparent hover:bg-sand/50 text-ink text-[11px] uppercase tracking-[0.16em] font-semibold transition-all cursor-pointer flex items-center justify-center">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleSignOutEverywhere}
              className="w-full h-[48px] min-h-[48px] shrink-0 rounded-full bg-[#EF4444] hover:bg-[#DC2626] text-white text-[11px] uppercase tracking-[0.16em] font-semibold transition-all shadow-sm cursor-pointer flex items-center justify-center"
            >
              Sign Out Everywhere
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete account confirmation */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="sm:max-w-[420px] rounded-[24px] border border-[#E5E0D8] bg-[#FAF7F2] p-6 sm:p-7 shadow-2xl">
          <AlertDialogHeader className="flex flex-col items-center text-center">
            <div className="w-13 h-13 rounded-full bg-red-100/80 border border-red-200 text-red-600 flex items-center justify-center mb-2.5 shadow-2xs">
              <Trash2 className="w-5 h-5 stroke-[1.75]" />
            </div>
            <AlertDialogTitle className="font-serif text-[22px] sm:text-[24px] text-ink font-normal tracking-tight">
              Delete Account Permanently?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[13px] text-stone mt-2.5 leading-relaxed text-center">
              This action is permanent and cannot be undone. All your order history, saved addresses, points, and personal details will be deleted forever.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-col-reverse gap-2.5 mt-5 w-full shrink-0">
            <AlertDialogCancel className="w-full h-[48px] min-h-[48px] shrink-0 rounded-full border border-border/90 bg-transparent hover:bg-sand/50 text-ink text-[11px] uppercase tracking-[0.16em] font-semibold transition-all cursor-pointer flex items-center justify-center">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAccount}
              className="w-full h-[48px] min-h-[48px] shrink-0 rounded-full bg-[#EF4444] hover:bg-[#DC2626] text-white text-[11px] uppercase tracking-[0.16em] font-semibold transition-all shadow-sm cursor-pointer flex items-center justify-center"
            >
              Delete Account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export function Account() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "overview");
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(searchParams.get("id"));
  const orders = useCommerceStore((s) => s.orders);

  const [profile, setProfile] = useState({
    firstName: "Anjali",
    lastName: "Nair",
    email: "anjali@example.com",
    phone: "+91 98765 43210",
  });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const saved = localStorage.getItem("woxly_user_profile");
      if (saved) {
        setProfile(JSON.parse(saved));
      }
    } catch {
      // fallback to initial profile
    }
  }, []);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) setActiveTab(tab);
    const orderId = searchParams.get("id");
    if (orderId) setSelectedOrderId(orderId);
  }, [searchParams]);

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
                  {(profile.firstName[0] || "A") + (profile.lastName[0] || "N")}
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-[0.15em] text-stone font-medium mb-1">
                    Welcome back
                  </span>
                  <h1 className="text-[26px] font-serif text-ink m-0 leading-none">
                    {profile.firstName} {profile.lastName}
                  </h1>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("profile");
                  router.push("/account?tab=profile");
                }}
                aria-label="Edit Profile"
                title="Edit profile details"
                className="text-stone hover:text-ink transition-colors p-2 rounded-full hover:bg-sand/40 cursor-pointer"
              >
                <PenLine className="w-5 h-5" />
              </button>
            </div>

            {/* Loyalty Card */}
            <div className="bg-[#1C3A32] rounded-[20px] p-6 text-white shadow-sm relative overflow-hidden">
              <div className="flex justify-between items-start mb-5">
                <span className="text-[9px] uppercase tracking-[0.15em] text-white/70 font-medium">
                  Woxly Circle · Points
                </span>
                <Gem className="w-5 h-5 text-white/80" />
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-[36px] font-serif text-[#E5D5A4] leading-none">2,480</span>
                <span className="text-[13px] text-white/80 font-medium">points</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="h-[2px] bg-white/10 rounded-full w-full overflow-hidden">
                  <div className="h-full bg-[#E5D5A4] w-[100%] rounded-full"></div>
                </div>

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

                      {/* Delivery Progress Preview */}
                      <div className="bg-sand/30 rounded-xl p-3 flex flex-col gap-1.5">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-medium text-ink flex items-center gap-1.5">
                            <Truck className="w-3.5 h-3.5 text-stone" />
                            Est. Delivery: <strong className="text-emerald-800">{getDeliveryDate()}</strong>
                          </span>
                          <span className="text-[10px] text-stone font-medium">Stage 2 of 4</span>
                        </div>
                        <div className="w-full bg-border/60 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-ink h-full rounded-full w-[45%]" />
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



            {/* Sign Out */}
            <button
              onClick={() => router.replace("/login")}
              className="w-full h-[52px] border  border-border bg-transparent rounded-full flex items-center justify-center gap-3 hover:bg-white hover:shadow-sm transition-all text-ink mt-4"
            >
              <LogOut className="w-[15px] h-[15px] text-[red]" strokeWidth={2} />
              <span className="text-[10px] uppercase tracking-[0.18em] text-[red] font-bold">
                Sign Out
              </span>
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

                        {/* Delivery Progress Preview */}
                        <div className="bg-sand/30 rounded-xl p-3.5 flex flex-col gap-2">
                          <div className="flex items-center justify-between text-[12px]">
                            <span className="font-medium text-ink flex items-center gap-2">
                              <Truck className="w-4 h-4 text-stone" />
                              Est. Delivery: <strong className="text-emerald-800">{getDeliveryDate()}</strong>
                            </span>
                            <span className="text-[11px] text-stone font-medium">Stage 2 of 4 · Processing</span>
                          </div>
                          <div className="w-full bg-border/60 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-ink h-full rounded-full w-[45%]" />
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

                        {/* Delivery Progress Preview */}
                        <div className="bg-sand/30 rounded-xl p-3 flex flex-col gap-1.5">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-medium text-ink flex items-center gap-1.5">
                              <Truck className="w-3.5 h-3.5 text-stone" />
                              Est. Delivery: <strong className="text-emerald-800">{getDeliveryDate()}</strong>
                            </span>
                            <span className="text-[10px] text-stone font-medium">Stage 2 of 4</span>
                          </div>
                          <div className="w-full bg-border/60 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-ink h-full rounded-full w-[45%]" />
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

                    {/* Delivery Progress Card */}
                    <div className="bg-white border border-border p-5 sm:p-6 rounded-[20px] shadow-sm flex flex-col gap-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border/70">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="relative flex h-2.5 w-2.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                              On Schedule · Processing
                            </span>
                          </div>
                          <h3 className="text-[18px] sm:text-[20px] font-serif text-ink mt-1.5">
                            Est. Delivery by <span className="font-semibold text-emerald-950">{getDeliveryDate()}</span>
                          </h3>
                        </div>
                        <div className="flex flex-col sm:items-end text-[12px] text-stone">
                          <span>
                            Tracking ID: <strong className="text-ink font-mono font-semibold">BD-{order.id.replace(/\D/g, "") || "97986"}IN</strong>
                          </span>
                          <span className="text-[11px] text-stone/80">Courier: BlueDart Air Express</span>
                        </div>
                      </div>

                      {/* Desktop Progress Stepper */}
                      <div className="hidden sm:block py-2">
                        <div className="relative flex items-center justify-between">
                          {/* Background line */}
                          <div className="absolute top-[18px] left-[32px] right-[32px] h-[3px] bg-sand -z-0">
                            {/* Active filled line (38% progress for 'Processing') */}
                            <div className="h-full bg-ink rounded-full transition-all duration-500 w-[38%]" />
                          </div>

                          {[
                            {
                              title: "Order Placed",
                              date: order.date,
                              status: "completed",
                              icon: Check,
                            },
                            {
                              title: "Processing",
                              date: "In progress",
                              status: "current",
                              icon: Sparkles,
                            },
                            {
                              title: "Shipped",
                              date: "Dispatches tomorrow",
                              status: "upcoming",
                              icon: Truck,
                            },
                            {
                              title: "Delivered",
                              date: getDeliveryDate(),
                              status: "upcoming",
                              icon: PackageCheck,
                            },
                          ].map((item, idx) => {
                            const isCompleted = item.status === "completed";
                            const isCurrent = item.status === "current";
                            return (
                              <div key={idx} className="flex flex-col items-center text-center relative z-10 w-[95px]">
                                <div
                                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${isCompleted
                                    ? "bg-gold text-white"
                                    : isCurrent
                                      ? "bg-gold text-white ring-4 ring-gold/20 shadow-sm"
                                      : "border-2 border-border bg-white text-stone"
                                    }`}
                                >
                                  <item.icon className="w-4 h-4" />
                                </div>
                                <span className={`text-[12px] mt-2 font-medium ${isCurrent ? "text-ink font-semibold" : isCompleted ? "text-ink" : "text-stone"}`}>
                                  {item.title}
                                </span>
                                <span className={`text-[10px] mt-0.5 ${isCurrent ? "text-gold font-semibold" : "text-stone"}`}>
                                  {item.date}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Mobile Vertical Progress Stepper */}
                      <div className="sm:hidden flex flex-col gap-3 py-1">
                        {[
                          {
                            title: "Order Placed",
                            date: order.date,
                            desc: "Order confirmed & payment verified",
                            status: "completed",
                            icon: Check,
                          },
                          {
                            title: "Processing & Packaging",
                            date: "In Progress",
                            desc: "Handcrafted & quality inspection at atelier",
                            status: "upcoming",
                            icon: Sparkles,
                          },
                          {
                            title: "Shipped via BlueDart",
                            date: "Expected tomorrow",
                            desc: "Dispatched with express delivery tracking",
                            status: "upcoming",
                            icon: Truck,
                          },
                          {
                            title: "Delivered",
                            date: getDeliveryDate(),
                            desc: "Handed over to Anjali Nair",
                            status: "upcoming",
                            icon: PackageCheck,
                          },
                        ].map((item, idx, arr) => {
                          const isCompleted = item.status === "completed";
                          const isCurrent = item.status === "current";
                          const isLast = idx === arr.length - 1;

                          return (
                            <div key={idx} className="flex gap-3 relative">
                              {/* Step icon and vertical line */}
                              <div className="flex flex-col items-center">
                                <div
                                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 ${isCompleted
                                    ? "bg-gold text-white"
                                    : isCurrent
                                      ? "bg-gold text-white ring-4 ring-gold/20 shadow-sm"
                                      : "border-2 border-border bg-white text-stone"
                                    }`}
                                >
                                  <item.icon className="w-3.5 h-3.5" />
                                </div>
                                {!isLast && (
                                  <div
                                    className={`w-[2px] grow min-h-[32px] my-1 ${isCompleted ? "bg-ink" : isCurrent ? "bg-gradient-to-b from-gold to-border" : "bg-border/60"
                                      }`}
                                  />
                                )}
                              </div>

                              {/* Step Content */}
                              <div className="pb-3 pt-0.5 min-w-0 flex-1">
                                <div className="flex items-center justify-between gap-2">
                                  <h4 className={`text-[13px] leading-tight ${isCurrent ? "font-bold text-ink" : isCompleted ? "font-semibold text-ink" : "font-medium text-stone"}`}>
                                    {item.title}
                                  </h4>
                                  <span className={`text-[10px] font-medium shrink-0 ${isCurrent ? "text-gold font-semibold" : "text-stone"}`}>
                                    {item.date}
                                  </span>
                                </div>
                                <p className="text-[11px] text-stone mt-0.5 leading-snug">
                                  {item.desc}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Live Activity Feed */}
                      <div className="bg-sand/30 border border-border/60 rounded-xl p-3.5 flex items-start gap-2.5 text-[12px]">
                        <Clock className="w-4 h-4 text-stone shrink-0 mt-0.5" />
                        <div className="flex-1 text-stone leading-relaxed">
                          <strong className="text-ink font-medium">Latest Activity:</strong> Order packaging & authenticity verification underway at WOXLY Mumbai Atelier.
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-border p-6 rounded-[20px] shadow-sm flex flex-col gap-6">
                      <div className="flex justify-between items-center">
                        <span className="bg-emerald-50 text-emerald-800 text-[10px] uppercase tracking-[0.12em] font-bold px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 border border-emerald-200/60">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Processing
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
              <AddressesTabContent />
            )}

            {activeTab === "profile" && (
              <div className="flex flex-col gap-6 animate-in fade-in duration-300">
                <h2 className="text-[32px] font-serif text-ink">Profile Details</h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const firstName = (form.elements.namedItem("firstName") as HTMLInputElement).value.trim();
                    const lastName = (form.elements.namedItem("lastName") as HTMLInputElement).value.trim();
                    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
                    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value.trim();

                    if (!firstName || !lastName) {
                      toast.error("First and last name are required");
                      return;
                    }

                    const updated = { firstName, lastName, email, phone };
                    setProfile(updated);
                    try {
                      localStorage.setItem("woxly_user_profile", JSON.stringify(updated));
                    } catch { }
                    toast.success("Profile details saved successfully");
                  }}
                  className="flex flex-col gap-5 bg-white p-6 rounded-[20px] border border-border shadow-sm"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] uppercase tracking-[0.15em] font-bold text-stone">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        defaultValue={profile.firstName}
                        key={`fn-${profile.firstName}`}
                        className="h-[48px] border border-border px-4 bg-pearl text-ink focus:border-gold outline-none rounded-[10px] text-[14px]"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] uppercase tracking-[0.15em] font-bold text-stone">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        defaultValue={profile.lastName}
                        key={`ln-${profile.lastName}`}
                        className="h-[48px] border border-border px-4 bg-pearl text-ink focus:border-gold outline-none rounded-[10px] text-[14px]"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-[0.15em] font-bold text-stone">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      defaultValue={profile.email}
                      key={`em-${profile.email}`}
                      className="h-[48px] border border-border px-4 bg-pearl text-ink focus:border-gold outline-none rounded-[10px] text-[14px]"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-[0.15em] font-bold text-stone">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      defaultValue={profile.phone}
                      key={`ph-${profile.phone}`}
                      className="h-[48px] border border-border px-4 bg-pearl text-ink focus:border-gold outline-none rounded-[10px] text-[14px]"
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full h-[48px] mt-2 rounded-full text-[11px] cursor-pointer">
                    SAVE CHANGES
                  </button>
                </form>
              </div>
            )}

            {activeTab === "settings" && (
              <SettingsTabContent />
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
