import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  titleAs?: "h1" | "h2" | "h3";
  actions?: ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  titleAs: Title = "h2",
  actions,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-primary-bright">
          {eyebrow}
        </p>
      ) : null}
      <div className={cn("space-y-3", align === "center" && "max-w-3xl")}>
        <Title className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          {title}
        </Title>
        {description ? (
          <p className={cn("max-w-2xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg", align === "center" && "mx-auto")}>
            {description}
          </p>
        ) : null}
      </div>
      {actions ? <div className="pt-1">{actions}</div> : null}
    </div>
  );
}