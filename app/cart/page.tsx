import { CartPage } from "./cart-view";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Shopping Bag",
  description: "Refined accessories designed for modern everyday life.",
};

export default function Page() {
  return <CartPage />;
}
