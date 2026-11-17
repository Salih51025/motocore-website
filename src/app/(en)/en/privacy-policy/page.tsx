import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PrivacyContent } from "@/components/sections/legal/PrivacyContent";
import { en } from "@/content/i18n/en";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata("en", "privacy");

export default function EnPrivacyPolicyPage() {
  const path = "/privacy-policy";
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar locale="en" dict={en} path={path} />
      <main className="flex-1">
        <PrivacyContent dict={en} />
      </main>
      <Footer locale="en" dict={en} path={path} />
    </div>
  );
}
