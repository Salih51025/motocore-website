import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";

const base =
  "btn-future relative isolate inline-flex cursor-pointer select-none items-center justify-center gap-2 overflow-hidden rounded-lg text-center font-semibold leading-tight tracking-[0.01em] transition-[color,background-color,border-color,box-shadow,transform] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-55";
const variants: Record<Variant, string> = {
  primary:
    "border border-[rgba(46,230,255,0.45)] bg-[linear-gradient(135deg,var(--primary),var(--primary-bright))] text-[#031016] shadow-[0_0_0_1px_rgba(46,230,255,0.2),0_10px_28px_rgba(0,209,255,0.22)] hover:shadow-[0_0_0_1px_rgba(46,230,255,0.36),0_0_36px_rgba(0,209,255,0.28),0_14px_34px_rgba(0,209,255,0.24)] hover:-translate-y-0.5 active:translate-y-px active:shadow-[0_0_0_1px_rgba(46,230,255,0.24),0_6px_18px_rgba(0,209,255,0.18)]",
  secondary:
    "border border-[rgba(184,196,214,0.28)] bg-[rgba(18,24,33,0.88)] text-[var(--text-primary)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] hover:border-[rgba(46,230,255,0.45)] hover:bg-[rgba(24,34,46,0.96)] hover:text-white hover:shadow-[0_0_0_1px_rgba(46,230,255,0.12),0_0_28px_rgba(0,209,255,0.1)] hover:-translate-y-0.5 active:translate-y-px",
  ghost:
    "border border-[var(--border-subtle)] bg-[rgba(11,15,20,0.35)] text-[var(--text-primary)] hover:border-[var(--border-strong)] hover:bg-[rgba(18,24,33,0.7)] hover:text-white hover:shadow-[0_0_24px_rgba(0,209,255,0.08)] hover:-translate-y-0.5 active:translate-y-px",
};
const sizes: Record<Size, string> = {
  sm: "min-h-9 px-4 py-2 text-sm",
  md: "min-h-11 px-5 py-2.5 text-sm sm:text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href) {
    const { href, ...rest } = props as ButtonAsLink;
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}