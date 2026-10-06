import { Success } from "./success-view";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Order Success",
  description: "Refined accessories designed for modern everyday life.",
};

export default async function Page({ searchParams }: { searchParams: Promise<{ subtotal?: string }> }) {
  const params = await searchParams;
  const subtotal = Number(params.subtotal) || 0;
  return <Success subtotal={subtotal} />;
}
