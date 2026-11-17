import { cn } from "@/lib/utils";

type GlowBackdropProps = {
  className?: string;
};

export function GlowBackdrop({ className }: GlowBackdropProps) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className="absolute -top-24 right-[-10%] h-72 w-72 rounded-full bg-[rgba(0,209,255,0.12)] blur-3xl" />
      <div className="absolute bottom-[-20%] left-[-5%] h-80 w-80 rounded-full bg-[rgba(255,122,26,0.1)] blur-3xl" />
    </div>
  );
}