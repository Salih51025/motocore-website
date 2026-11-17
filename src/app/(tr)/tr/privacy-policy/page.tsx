import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PrivacyContent } from "@/components/sections/legal/PrivacyContent";
import { tr } from "@/content/i18n/tr";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata("tr", "privacy");

export default function TrPrivacyPolicyPage() {
  const path = "/privacy-policy";
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar locale="tr" dict={tr} path={path} />
      <main className="flex-1">
        <PrivacyContent dict={tr} />
      </main>
      <Footer locale="tr" dict={tr} path={path} />
    </div>
  );
}
