import { SearchPage } from "./search-view";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Search",
  description: "Refined accessories designed for modern everyday life.",
};

export default function Page() {
  return <SearchPage />;
}
