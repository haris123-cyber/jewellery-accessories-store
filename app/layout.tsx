import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { tenantConfig } from "@/lib/tenant";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: `${tenantConfig.brandName} — Premium Accessories`,
    template: `%s — ${tenantConfig.brandName}`,
  },
  description: "Refined accessories designed for modern everyday life.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className={`scroll-smooth ${cormorant.variable} ${jost.variable}`} lang="en" suppressHydrationWarning>
      <body className="bg-background font-sans text-base text-foreground antialiased" suppressHydrationWarning>{children}</body>
    </html>
  );
}
