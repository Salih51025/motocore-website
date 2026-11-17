import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";
import { LOCALE_LABELS } from "@/lib/constants";
import type { Locale } from "@/types/i18n";
import type { Dictionary } from "@/content/i18n";

type FooterProps = {
  locale: Locale;
  dict: Dictionary;
  path?: string;
};

export function Footer({ locale, dict, path = "" }: FooterProps) {
  const homeHref = `/${locale}`;

  return (
    <footer className="border-t border-[var(--border-subtle)] bg-surface/40">
      <PageContainer className="grid gap-10 py-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="space-y-3">
          <p className="font-semibold tracking-wide text-foreground">MotoCore</p>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary-bright">{dict.footer.tagline}</p>
          <p className="max-w-sm text-sm leading-6 text-[var(--text-secondary)]">{dict.footer.description}</p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-foreground">{dict.footer.navigationTitle}</h2>
          <ul className="mt-3 space-y-2 text-sm text-[var(--text-secondary)]">
            <li><Link className="hover:text-foreground" href={`${homeHref}#features`}>{dict.nav.features}</Link></li>
            <li><Link className="hover:text-foreground" href={`${homeHref}#experience`}>{dict.nav.experience}</Link></li>
            <li><Link className="hover:text-foreground" href={`${homeHref}#gallery`}>{dict.nav.galleryMotorcycle}</Link></li>
            <li><Link className="hover:text-foreground" href={`${homeHref}#app-screenshots`}>{dict.nav.appScreenshots}</Link></li>
            <li><Link className="hover:text-foreground" href={`${homeHref}#video`}>{dict.nav.video}</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-foreground">{dict.footer.legalTitle}</h2>
          <ul className="mt-3 space-y-2 text-sm text-[var(--text-secondary)]">
            <li><Link className="hover:text-foreground" href={`/${locale}/privacy-policy`}>{dict.nav.privacy}</Link></li>
            <li><Link className="hover:text-foreground" href={`/${locale}/permissions`}>{dict.nav.permissions}</Link></li>
            <li><Link className="hover:text-foreground" href={`/${locale}/terms-of-use`}>{dict.nav.terms}</Link></li>
          </ul>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-sm font-semibold text-foreground">{dict.footer.languageTitle}</h2>
            <div className="mt-3 flex gap-2 text-sm">
              <Link
                href={`/tr${path}`}
                className={locale === "tr" ? "text-primary-bright" : "text-[var(--text-secondary)] hover:text-foreground"}
                aria-current={locale === "tr" ? "page" : undefined}
              >
                {LOCALE_LABELS.tr} Türkçe
              </Link>
              <span className="text-[var(--text-muted)]">/</span>
              <Link
                href={`/en${path}`}
                className={locale === "en" ? "text-primary-bright" : "text-[var(--text-secondary)] hover:text-foreground"}
                aria-current={locale === "en" ? "page" : undefined}
              >
                {LOCALE_LABELS.en} English
              </Link>
            </div>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-foreground">{dict.footer.socialTitle}</h2>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">{dict.footer.socialNote}</p>
          </div>
        </div>
      </PageContainer>
      <div className="border-t border-[var(--border-subtle)]">
        <PageContainer className="flex flex-col gap-2 py-4 text-xs text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 MotoCore. {dict.footer.rights}</p>
          <p className="font-mono uppercase tracking-[0.14em]">TR / EN</p>
        </PageContainer>
      </div>
    </footer>
  );
}