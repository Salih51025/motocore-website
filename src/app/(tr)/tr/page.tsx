import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HomeSections } from "@/components/sections/home";
import { tr } from "@/content/i18n/tr";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata("tr", "home");

export default function TrHomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar locale="tr" dict={tr} path="" />
      <main id="main-content" className="flex-1">
        <HomeSections locale="tr" dict={tr} />
      </main>
      <Footer locale="tr" dict={tr} path="" />
    </div>
  );
}