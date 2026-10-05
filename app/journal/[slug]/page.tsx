import { StoryPage } from "@/components/story-view";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Journal",
  description: "Refined accessories designed for modern everyday life.",
};

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <StoryPage kind="article" />;
}
