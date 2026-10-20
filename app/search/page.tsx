import { Suspense } from "react";
import { SearchPage } from "./search-view";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search | WOXLY",
  description: "Refined accessories designed for modern everyday life.",
};

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-ivory" />}>
      <SearchPage />
    </Suspense>
  );
}
