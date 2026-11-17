import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PermissionsContent } from "@/components/sections/legal/PermissionsContent";
import { en } from "@/content/i18n/en";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata("en", "permissions");

export default function EnPermissionsPage() {
  const path = "/permissions";
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar locale="en" dict={en} path={path} />
      <main className="flex-1">
        <PermissionsContent dict={en} />
      </main>
      <Footer locale="en" dict={en} path={path} />
    </div>
  );
}
