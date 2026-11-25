"use client";

import Link from "next/link";
import { useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/Button";
import { LOCALE_LABELS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types/i18n";
import type { Dictionary } from "@/content/i18n";

type NavbarProps = {
  locale: Locale;
  dict: Dictionary;
  path?: string;
};

export function Navbar({ locale, dict, path = "" }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const homeHref = `/${locale}`;
  const navItems = [
    { href: `${homeHref}#features`, label: dict.nav.features },
    { href: `${homeHref}#experience`, label: dict.nav.experience },
    { href: `${homeHref}#gallery`, label: dict.nav.galleryMotorcycle },
    { href: `${homeHref}#app-screenshots`, label: dict.nav.appScreenshots },
    { href: `${homeHref}#video`, label: dict.nav.video },
  ];

  const otherLocale: Locale = locale === "tr" ? "en" : "tr";
  const languageHref = `/${otherLocale}${path}`;

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border-subtle)]/70 bg-[rgba(5,7,11,0.62)] shadow-[0_1px_0_rgba(46,230,255,0.08),0_12px_40px_rgba(0,0,0,0.25)] backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgba(46,230,255,0.35),transparent)]" aria-hidden="true" />
      <PageContainer className="relative flex h-[var(--nav-height)] items-center justify-between gap-4">
        <Link href={homeHref} className="flex items-center gap-2 font-semibold tracking-wide text-foreground">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[var(--border-strong)] bg-[rgba(0,209,255,0.08)] font-mono text-xs text-primary-bright">
            MC
          </span>
          <span className="text-sm sm:text-base">MotoCore</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-4 lg:gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-[var(--text-secondary)] transition-colors hover:text-foreground whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <div className="inline-flex items-center rounded-lg border border-[var(--border-subtle)] bg-[rgba(18,24,33,0.72)] p-1" aria-label={dict.nav.language}>
            <Link
              href={`/tr${path}`}
              className={cn(
                "inline-flex min-h-8 items-center justify-center rounded-md px-3 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]",
                locale === "tr"
                  ? "bg-primary text-[#031016] shadow-[0_0_0_1px_rgba(46,230,255,0.25)]"
                  : "text-[var(--text-secondary)] hover:bg-[rgba(18,24,33,0.9)] hover:text-foreground",
              )}
              aria-current={locale === "tr" ? "page" : undefined}
            >
              {LOCALE_LABELS.tr}
            </Link>
            <Link
              href={`/en${path}`}
              className={cn(
                "inline-flex min-h-8 items-center justify-center rounded-md px-3 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]",
                locale === "en"
                  ? "bg-primary text-[#031016] shadow-[0_0_0_1px_rgba(46,230,255,0.25)]"
                  : "text-[var(--text-secondary)] hover:bg-[rgba(18,24,33,0.9)] hover:text-foreground",
              )}
              aria-current={locale === "en" ? "page" : undefined}
            >
              {LOCALE_LABELS.en}
            </Link>
          </div>
          <Button
            href={`${homeHref}#intro`}
            size="md"
            variant="primary"
            className="w-full sm:w-auto sm:min-w-[11rem]"
          >
            {dict.nav.cta}
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[rgba(18,24,33,0.55)] text-foreground transition-colors hover:border-[var(--border-strong)] hover:bg-[rgba(24,34,46,0.9)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? dict.nav.menuClose : dict.nav.menuOpen}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? dict.nav.menuClose : dict.nav.menuOpen}</span>
          <span aria-hidden="true" className="text-xl font-semibold leading-none">{open ? "×" : "≡"}</span>
        </button>
      </PageContainer>

      {open ? (
        <div id="mobile-menu" className="border-t border-[var(--border-subtle)] bg-[rgba(11,15,20,0.98)] md:hidden">
          <PageContainer className="flex flex-col gap-2 py-4">
            {navItems.map((item) => {
              const isMedia =
                item.href.includes("#gallery") ||
                item.href.includes("#app-screenshots") ||
                item.href.includes("#video");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex min-h-10 items-center rounded-md px-3 py-2 text-sm transition-colors hover:bg-[rgba(18,24,33,0.8)] hover:text-foreground",
                    isMedia
                      ? "text-primary-bright/90 bg-[rgba(0,209,255,0.04)]"
                      : "text-[var(--text-secondary)]",
                  )}
                  onClick={() => setOpen(false)}
                >
                  {isMedia ? (
                    <span aria-hidden="true" className="mr-2 h-1.5 w-1.5 rounded-full bg-primary-bright/70" />
                  ) : null}
                  {item.label}
                </Link>
              );
            })}
            <div className="mt-2 flex items-center gap-2 border-t border-[var(--border-subtle)] pt-3">
              <span className="text-xs font-medium text-[var(--text-secondary)]">{dict.nav.language}:</span>
              <Link
                href={`/tr${path}`}
                className={cn(
                  "inline-flex min-h-8 items-center justify-center rounded-md border px-3 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]",
                  locale === "tr"
                    ? "border-[rgba(46,230,255,0.45)] bg-primary text-[#031016]"
                    : "border-[var(--border-subtle)] bg-[rgba(18,24,33,0.45)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-foreground",
                )}
                onClick={() => setOpen(false)}
              >
                TR
              </Link>
              <Link
                href={`/en${path}`}
                className={cn(
                  "inline-flex min-h-8 items-center justify-center rounded-md border px-3 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]",
                  locale === "en"
                    ? "border-[rgba(46,230,255,0.45)] bg-primary text-[#031016]"
                    : "border-[var(--border-subtle)] bg-[rgba(18,24,33,0.45)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-foreground",
                )}
                onClick={() => setOpen(false)}
              >
                EN
              </Link>
            </div>
            <Button
              href={`${homeHref}#intro`}
              size="md"
              variant="primary"
              className="mt-2 w-full sm:w-auto sm:min-w-[11rem]"
              onClick={() => setOpen(false)}
            >
              {dict.nav.cta}
            </Button>
          </PageContainer>
        </div>
      ) : null}
    </header>
  );
}