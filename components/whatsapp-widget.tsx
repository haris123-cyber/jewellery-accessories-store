"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export function WhatsAppWidget() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !pathname) return null;

  // Exclude product view pages, login, and sign up pages
  const isExcluded =
    pathname.startsWith("/product") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup");

  if (isExcluded) return null;

  const phoneNumber = "917306347297";
  const defaultMessage = encodeURIComponent("Hi WOXLY, I have a query about your collection!");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <div
      id="whatsapp-floating-widget"
      className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 flex items-center gap-2.5 group select-none animate-in fade-in slide-in-from-bottom-3 duration-300"
    >
      {/* Tooltip / Chat hint bubble on hover */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden sm:flex items-center gap-2 bg-ivory/95 backdrop-blur-md px-3.5 py-2 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.08)] border border-border/80 text-ink text-[12px] font-medium opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200 pointer-events-none group-hover:pointer-events-auto"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]" />
        </span>
        <span className="tracking-wide text-ink">Chat with us</span>
      </a>

      {/* Floating WhatsApp Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with WOXLY on WhatsApp"
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-[0_8px_24px_rgba(37,211,102,0.45)] hover:shadow-[0_10px_28px_rgba(37,211,102,0.6)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
      >
        {/* WhatsApp Official SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-7 h-7 text-white"
        >
          <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.176L2.14 21.86a.75.75 0 0 0 .917.917l4.685-1.298A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.95 7.95 0 0 1-4.074-1.119.75.75 0 0 0-.498-.094l-3.32.92.92-3.32a.75.75 0 0 0-.094-.498A7.95 7.95 0 0 1 4 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8z" />
          <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.476-.15-.677.15-.2.301-.777.978-.952 1.179-.175.2-.351.226-.652.075-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.785-1.675-2.086-.176-.301-.019-.464.132-.614.136-.135.301-.351.451-.527.15-.175.201-.301.301-.501.1-.2.05-.376-.025-.526-.075-.15-.677-1.63-.928-2.231-.244-.585-.493-.505-.677-.515-.175-.008-.376-.01-.577-.01-.2 0-.526.075-.802.376-.276.301-1.053 1.028-1.053 2.508 0 1.48 1.078 2.909 1.229 3.109.15.2 2.12 3.238 5.137 4.542.718.31 1.278.496 1.715.635.722.23 1.38.197 1.9-.119.58-.352 1.78-1.456 2.03-2.083.25-.627.25-1.164.175-1.277-.075-.113-.276-.188-.577-.339z" />
        </svg>
      </a>
    </div>
  );
}
