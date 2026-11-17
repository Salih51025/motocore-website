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
    "MotoCore, motosiklet deneyimini dijital ortamda yeniden düşünmeyi amaçlayan bir mobil uygulama vizyonunun tanıtım sitesidir.",
  applicationName: "MotoCore",
  robots: { index: true, follow: true },
};

export default function TrRootLayout({ children }: { children: ReactNode }) {
  return <RootShell lang="tr">{children}</RootShell>;
}