import { ProductPage } from "./product-view";
import type { Metadata } from "next";
import { getProduct } from "@/lib/catalog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  return { title: p.name, description: p.description };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ProductPage slug={slug?.[0]} />;
}
