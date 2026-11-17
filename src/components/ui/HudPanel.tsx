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
        "relative overflow-hidden rounded-xl border p-5 sm:p-6",
        tone === "default"
          ? "border-[var(--border-subtle)] bg-[var(--surface-panel)]"
          : "border-[var(--border-strong)] bg-[var(--surface-panel-strong)] shadow-[var(--shadow-panel)]",
        className,
      )}
    >
      {showCorners ? <HudCorners /> : null}
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}