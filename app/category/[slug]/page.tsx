import { Shop } from "@/app/shop/shop-view";
import type { Metadata } from "next";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const name = `${slug?.[0]?.toUpperCase() ?? ""}${slug?.slice(1) ?? ""}`;
  return {
    title: name,
    description: "Refined accessories designed for modern everyday life.",
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <Shop category={slug?.[0]} />;
}
