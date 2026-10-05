import { Auth } from "@/components/auth-view";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Login",
  description: "Refined accessories designed for modern everyday life.",
};

export default function Page() {
  return <Auth signup={false} />;
}
