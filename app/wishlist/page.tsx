import { Wishlist } from "./wishlist-view";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Wishlist",
  description: "Refined accessories designed for modern everyday life.",
};

export default function Page() {
  return <Wishlist />;
}
