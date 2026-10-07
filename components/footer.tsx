"use client";

import Link from "next/link";
import { Mail, Phone, MessageCircle } from "lucide-react";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();
  if (pathname === '/login' || pathname === '/signup') return null;

  return (
    <footer className="bg-white pt-10 md:pt-16 pb-6 border-t border-zinc-200 font-sans">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-8 mb-12">

          {/* Brand Column */}
          <div className="w-full lg:w-[35%] flex flex-col items-start">
            <div className=" lg:flex items-center gap-0 mb-6">
              <div className="text-[#4a148c]">

              </div>
              <span className="font-bold text-2xl text-black">Woxly</span>
            </div>

            <h3 className="font-bold text-black mb-5 text-[15px]">Online Grocery & Shopping</h3>

            <p className="text-gray-500 text-[13px] leading-relaxed mb-6 max-w-[320px]">
              This slug is used for your storefront URL in subdomain-based deployments
              (example: storename.yourdomain.com).
              Best premuim super market near Bangalore core
            </p>

            <a href="#" className="hidden lg:inline-flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white hover:opacity-90 transition-opacity mt-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              <span className="sr-only">Instagram</span>
            </a>
          </div>

          {/* Links Columns */}
          <div className="w-full lg:w-[65%] grid grid-cols-2 sm:grid-cols-3 gap-8 gap-y-10">

            {/* Company */}
            <div className="col-span-1">
              <h3 className="font-bold mb-4 text-black text-[15px]">Company</h3>
              <ul className="space-y-3 text-[13px] text-gray-500">
                <li><Link href="/about" className="hover:text-black transition-colors">About us</Link></li>
                <li><Link href="/contact" className="hover:text-black transition-colors">Contact us</Link></li>
                <li><Link href="/faq" className="hover:text-black transition-colors">FAQs</Link></li>
                <li><Link href="/blog" className="hover:text-black transition-colors">Blog</Link></li>
                <li><Link href="/feedback" className="hover:text-black transition-colors">Feedback</Link></li>
                <li><Link href="/" className="hover:text-black transition-colors">new demo page</Link></li>
              </ul>
            </div>

            {/* Policies */}
            <div className="col-span-1">
              <h3 className="font-bold mb-4 text-black text-[15px]">Policies</h3>
              <ul className="space-y-3 text-[13px] text-gray-500">
                <li><Link href="/privacy" className="hover:text-black transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-black transition-colors">Terms & Conditions</Link></li>
                <li><Link href="/shipping" className="hover:text-black transition-colors">Shipping Policy</Link></li>
                <li><Link href="/return" className="hover:text-black transition-colors">Return Policy</Link></li>
              </ul>
            </div>


            {/* Support */}
            <div className="col-span-2 sm:col-span-1">
              <h3 className="font-bold mb-4 text-black text-[15px]">Support</h3>
              <ul className="space-y-4 text-[13px] text-gray-500">
                <li><Link href="/help" className="hover:text-black transition-colors">Get help</Link></li>

                <li>
                  <a href="mailto:info@woxly.in" className="flex items-center gap-3 hover:text-black transition-colors">
                    <Mail className="w-[18px] h-[18px] text-gray-400" />
                    <span>info@woxly.in</span>
                  </a>
                </li>

                <li>
                  <a href="https://wa.me/917306347297" className="flex flex-col gap-1 hover:text-black transition-colors">
                    <div className="flex items-center gap-3">
                      <IconBrandWhatsapp className="w-[18px] h-[18px] text-[#25D366]" stroke={2} />
                      <span>WhatsApp</span>
                    </div>
                    <span className="ml-[30px]">+917306347297</span>
                  </a>
                </li>

                <li>
                  <a href="tel:+917012802594" className="flex flex-col gap-1 hover:text-black transition-colors">
                    <div className="flex items-center gap-3">
                      <Phone className="w-[18px] h-[18px] text-gray-400" />
                      <span>Phone</span>
                    </div>
                    <span className="ml-[30px]">+917012802594</span>
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Mobile Instagram */}
        <div className="flex justify-center lg:hidden my-8">
          <a href="#" className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white hover:opacity-90 transition-opacity">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            <span className="sr-only">Instagram</span>
          </a>
        </div>

        {/* Secure Payments Section */}
        <div className="flex justify-center lg:justify-end mb-6">
          <div className="flex flex-col items-center lg:items-end">
            <span className="text-[10px] font-bold text-gray-500 tracking-[0.15em] uppercase mb-3 text-center lg:text-right">SECURE PAYMENTS</span>
            <div className="flex flex-wrap justify-center lg:justify-end gap-2">
              <div className="w-[50px] h-[32px] bg-white border border-gray-200 rounded flex items-center justify-center p-1">
                <img src="/payments/upi.svg" alt="UPI" className="w-full h-full object-contain" />
              </div>
              <div className="w-[50px] h-[32px] bg-white border border-gray-200 rounded flex items-center justify-center p-1">
                <img src="/payments/mastercard.svg" alt="Mastercard" className="w-full h-full object-contain" />
              </div>
              <div className="w-[50px] h-[32px] bg-white border border-gray-200 rounded flex items-center justify-center p-1.5">
                <img src="/payments/visa.png.png" alt="Visa" className="w-full h-full object-contain" />
              </div>
              <div className="w-[50px] h-[32px] bg-white border border-gray-200 rounded flex items-center justify-center p-1">
                <img src="/payments/rupay.png" alt="RuPay" className="w-full h-full object-contain" />
              </div>
              <div className="w-[50px] h-[32px] bg-white border border-gray-200 rounded flex items-center justify-center p-1.5">
                <img src="/payments/gpay.svg" alt="Google Pay" className="w-full h-full object-contain" />
              </div>
              <div className="w-[50px] h-[32px] bg-white border border-gray-200 rounded flex items-center justify-center p-1">
                <img src="/payments/phonepe.png" alt="PhonePe" className="w-full h-full object-contain" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-zinc-200 flex flex-col md:flex-row items-center justify-between gap-4 text-[13px] text-gray-500">
          <p>© 2026 Mini Mart. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <Link href="/privacy" className="hover:text-black transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-black transition-colors">Terms of use</Link>
            <Link href="/shipping" className="hover:text-black transition-colors">Shipping Policy</Link>
            <Link href="/return" className="hover:text-black transition-colors">Return Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
