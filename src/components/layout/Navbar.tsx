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
    <header className="sticky top-0 z-50 border-b border-[var(--border-subtle)]/80 bg-[rgba(5,7,11,0.72)] backdrop-blur-xl">
      <PageContainer className="flex h-[var(--nav-height)] items-center justify-between gap-4">
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
          <div className="inline-flex items-center rounded-md border border-[var(--border-subtle)] bg-[rgba(18,24,33,0.5)] p-1" aria-label={dict.nav.language}>
            <Link
              href={`/${locale}${path}`}
              className={cn(
                "rounded px-2.5 py-1 text-xs font-medium",
                locale === "tr" ? "bg-[rgba(0,209,255,0.14)] text-primary-bright" : "text-[var(--text-secondary)] hover:text-foreground",
              )}
              aria-current={locale === "tr" ? "page" : undefined}
            >
              {LOCALE_LABELS.tr}
            </Link>
            <Link
              href={languageHref}
              className={cn(
                "rounded px-2.5 py-1 text-xs font-medium",
                locale === "en" ? "bg-[rgba(0,209,255,0.14)] text-primary-bright" : "text-[var(--text-secondary)] hover:text-foreground",
              )}
              aria-current={locale === "en" ? "page" : undefined}
            >
              {LOCALE_LABELS.en}
            </Link>
          </div>
          <Button href={`${homeHref}#intro`} size="sm" variant="primary">
            {dict.nav.cta}
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-foreground md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? dict.nav.menuClose : dict.nav.menuOpen}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? dict.nav.menuClose : dict.nav.menuOpen}</span>
          <span aria-hidden="true" className="text-lg leading-none">{open ? "×" : "≡"}</span>
        </button>
      </PageContainer>

      {open ? (
        <div id="mobile-menu" className="border-t border-[var(--border-subtle)] bg-[rgba(11,15,20,0.98)] md:hidden">
          <PageContainer className="flex flex-col gap-2 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm text-[var(--text-secondary)] hover:bg-[rgba(18,24,33,0.8)] hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 flex items-center gap-2 border-t border-[var(--border-subtle)] pt-3">
              <span className="text-xs text-[var(--text-muted)]">{dict.nav.language}:</span>
              <Link
                href={`/${locale}${path}`}
                className={cn("rounded border px-2 py-1 text-xs", locale === "tr" ? "border-[var(--border-strong)] text-primary-bright" : "border-[var(--border-subtle)] text-[var(--text-secondary)]")}
                onClick={() => setOpen(false)}
              >
                TR
              </Link>
              <Link
                href={languageHref}
                className={cn("rounded border px-2 py-1 text-xs", locale === "en" ? "border-[var(--border-strong)] text-primary-bright" : "border-[var(--border-subtle)] text-[var(--text-secondary)]")}
                onClick={() => setOpen(false)}
              >
                EN
              </Link>
            </div>
            <Button href={`${homeHref}#intro`} size="sm" className="mt-2 w-full" onClick={() => setOpen(false)}>
              {dict.nav.cta}
            </Button>
          </PageContainer>
        </div>
      ) : null}
    </header>
  );
}