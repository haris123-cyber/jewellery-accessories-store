import { Checkout } from "./checkout-view";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Checkout",
  description: "Refined accessories designed for modern everyday life.",
};

export default function Page() {
  return <Checkout />;
}
