import { StoryPage } from "@/components/story-view";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Shipping & Returns",
  description: "Refined accessories designed for modern everyday life.",
};

export default function Page() {
  return <StoryPage kind="shipping-returns" />;
}
