import type { Metadata } from "next";
import "./globals.css";
import { tenantConfig } from "@/lib/tenant";
import { Toaster } from "@/components/ui/sonner";
import { WhatsAppWidget } from "@/components/whatsapp-widget";

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
    <html className="scroll-smooth" lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background font-sans text-base text-foreground antialiased" suppressHydrationWarning>
        {children}
        <Toaster />
        <WhatsAppWidget />
      </body>
    </html>
  );
}
