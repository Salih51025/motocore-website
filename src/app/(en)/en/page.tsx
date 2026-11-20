import type { Metadata } from "next";
import { LocalizedHomeScreen } from "@/components/layout/LocalizedHomeScreen";
import { en } from "@/content/i18n/en";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata("en", "home");

export default function EnHomePage() {
  return <LocalizedHomeScreen locale="en" dict={en} />;
}
