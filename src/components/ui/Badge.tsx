import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeProps = {
  children: ReactNode;
  className?: string;
  tone?: "primary" | "secondary" | "neutral";
};

export function Badge({ children, className, tone = "primary" }: BadgeProps) {
  const toneClass = {
    primary:
      "border-[rgba(46,230,255,0.35)] bg-[rgba(0,209,255,0.08)] text-primary-bright",
    secondary:
      "border-[rgba(255,122,26,0.35)] bg-[rgba(255,122,26,0.08)] text-secondary",
    neutral:
      "border-[var(--border-subtle)] bg-[rgba(18,24,33,0.7)] text-[var(--text-secondary)]",
  }[tone];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.18em]",
        toneClass,
        className,
      )}
    >
      {children}
    </span>
  );
}