import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { HudCorners } from "@/components/effects/HudCorners";

type HudPanelProps = {
  children: ReactNode;
  className?: string;
  tone?: "default" | "strong";
  showCorners?: boolean;
};

export function HudPanel({ children, className, tone = "default", showCorners = true }: HudPanelProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border p-5 backdrop-blur-sm sm:p-6",
        tone === "default"
          ? "border-[var(--border-subtle)] bg-[linear-gradient(180deg,rgba(18,24,33,0.72),rgba(11,15,20,0.82))]"
          : "border-[var(--border-strong)] bg-[var(--surface-panel-strong)] shadow-[var(--shadow-panel)]",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(46,230,255,0.28),transparent)]" aria-hidden="true" />
      {showCorners ? <HudCorners /> : null}
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}