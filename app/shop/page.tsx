import { Shop } from "./shop-view";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "All Accessories",
  description: "Refined accessories designed for modern everyday life.",
};

export default function Page() {
  return <Shop />;
}
