import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../globals.css";
import { RootShell } from "@/components/layout/RootShell";

export const metadata: Metadata = {
  title: {
    default: "MotoCore",
    template: "%s | MotoCore",
  },
  description:
    "MotoCore is a presentation website for a mobile app concept that reimagines the motorcycle experience in a digital environment.",
  applicationName: "MotoCore",
  robots: { index: true, follow: true },
};

export default function EnRootLayout({ children }: { children: ReactNode }) {
  return <RootShell lang="en">{children}</RootShell>;
}