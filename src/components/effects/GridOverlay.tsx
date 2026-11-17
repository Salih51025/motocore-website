import { cn } from "@/lib/utils";

type GridOverlayProps = {
  className?: string;
};

export function GridOverlay({ className }: GridOverlayProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 opacity-[0.08]",
        "[background-image:linear-gradient(to_right,rgba(46,230,255,0.35)_1px,transparent_1px),linear-gradient(to_bottom,rgba(46,230,255,0.35)_1px,transparent_1px)] [background-size:48px_48px]",
        className,
      )}
    />
  );
}