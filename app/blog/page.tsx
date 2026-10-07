import type { Metadata } from "next";
import { BlogView } from "./blog-view";

export const metadata: Metadata = {
  title: "Blog",
  description: "Read the latest news and updates from Woxly.",
};

export default function BlogPage() {
  return <BlogView />;
}
