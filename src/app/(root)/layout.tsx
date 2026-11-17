import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../globals.css";
import { RootShell } from "@/components/layout/RootShell";

export const metadata: Metadata = {
  title: "MotoCore",
  description: "MotoCore",
  robots: { index: true, follow: true },
};

export default function RootGroupLayout({ children }: { children: ReactNode }) {
  return <RootShell lang="tr">{children}</RootShell>;
}