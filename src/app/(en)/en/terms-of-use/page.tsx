import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TermsContent } from "@/components/sections/legal/TermsContent";
import { en } from "@/content/i18n/en";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata("en", "terms");

export default function EnTermsOfUsePage() {
  const path = "/terms-of-use";
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar locale="en" dict={en} path={path} />
      <main className="flex-1">
        <TermsContent dict={en} />
      </main>
      <Footer locale="en" dict={en} path={path} />
    </div>
  );
}
