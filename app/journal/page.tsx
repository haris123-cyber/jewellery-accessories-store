import { Journal } from "./journal-view";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Journal",
  description: "Refined accessories designed for modern everyday life.",
};

export default function Page() {
  return <Journal />;
}
