import { Account } from "./account-view";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "My Account",
  description: "Refined accessories designed for modern everyday life.",
};

export default function Page() {
  return <Account />;
}
