import type { Metadata } from "next";
import "./globals.css";
import { tenantConfig } from "@/lib/tenant";

export const metadata: Metadata = {
  title: { default: `${tenantConfig.brandName} — Premium Accessories`, template: `%s — ${tenantConfig.brandName}` },
  description: "Refined accessories designed for modern everyday life.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
