import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TermsContent } from "@/components/sections/legal/TermsContent";
import { tr } from "@/content/i18n/tr";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata("tr", "terms");

export default function TrTermsOfUsePage() {
  const path = "/terms-of-use";
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar locale="tr" dict={tr} path={path} />
      <main className="flex-1">
        <TermsContent dict={tr} />
      </main>
      <Footer locale="tr" dict={tr} path={path} />
    </div>
  );
}
