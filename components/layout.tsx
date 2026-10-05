import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "./navbar";
import { Footer } from "./footer";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <Toaster position="bottom-center" richColors />
    </>
  );
}

export { Navbar as Header } from "./navbar";
export { Footer } from "./footer";
export { CartDrawer } from "./cart-drawer";
