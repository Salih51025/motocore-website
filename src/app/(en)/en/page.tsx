import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HomeSections } from "@/components/sections/home";
import { en } from "@/content/i18n/en";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata("en", "home");

export default function EnHomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar locale="en" dict={en} path="" />
      <main id="main-content" className="flex-1">
        <HomeSections locale="en" dict={en} />
      </main>
      <Footer locale="en" dict={en} path="" />
    </div>
  );
}