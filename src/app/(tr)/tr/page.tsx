import type { Metadata } from "next";
import { LocalizedHomeScreen } from "@/components/layout/LocalizedHomeScreen";
import { tr } from "@/content/i18n/tr";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata("tr", "home");

export default function TrHomePage() {
  return <LocalizedHomeScreen locale="tr" dict={tr} />;
}
