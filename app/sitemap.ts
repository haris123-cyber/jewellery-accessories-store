import type { MetadataRoute } from "next";
import { categories, products } from "@/lib/catalog";
const base = "https://WOXLY-accessories.fabled-moss-1219.chatgpt.site";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/shop",
    "/journal",
    "/about",
    "/contact",
    "/faq",
    "/shipping-returns",
  ]
    .map((path) => ({
      url: `${base}${path}`,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    }))
    .concat(
      categories.map((c) => ({
        url: `${base}/category/${c.slug}`,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      })),
      products.map((p) => ({
        url: `${base}/product/${p.slug}`,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      })),
    );
}
