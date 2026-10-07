import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Track Order",
  description: "Refined accessories designed for modern everyday life.",
};

export default function Page() {
  redirect("/account?tab=order-details");
}
