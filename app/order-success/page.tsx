import { Success } from "./success-view";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Order Success",
  description: "Refined accessories designed for modern everyday life.",
};

export default function Page() {
  return <Success />;
}
