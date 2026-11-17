import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PermissionsContent } from "@/components/sections/legal/PermissionsContent";
import { tr } from "@/content/i18n/tr";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata("tr", "permissions");

export default function TrPermissionsPage() {
  const path = "/permissions";
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar locale="tr" dict={tr} path={path} />
      <main className="flex-1">
        <PermissionsContent dict={tr} />
      </main>
      <Footer locale="tr" dict={tr} path={path} />
    </div>
  );
}
