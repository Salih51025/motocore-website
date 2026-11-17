import { cn } from "@/lib/utils";

type HudCornersProps = {
  className?: string;
};

export function HudCorners({ className }: HudCornersProps) {
  const corner = "absolute h-3 w-3 border-primary/60";
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0", className)}>
      <span className={cn(corner, "left-2 top-2 border-l border-t")} />
      <span className={cn(corner, "right-2 top-2 border-r border-t")} />
      <span className={cn(corner, "bottom-2 left-2 border-b border-l")} />
      <span className={cn(corner, "bottom-2 right-2 border-b border-r")} />
    </div>
  );
}