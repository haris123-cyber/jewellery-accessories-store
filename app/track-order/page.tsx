import { Track } from "./track-view";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Track Order",
  description: "Refined accessories designed for modern everyday life.",
};

export default function Page() {
  return <Track />;
}
