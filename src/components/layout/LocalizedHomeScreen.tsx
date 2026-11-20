import type { Locale } from "@/types/i18n";
import type { Dictionary } from "@/content/i18n";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HomeSections } from "@/components/sections/home";

type LocalizedHomeScreenProps = {
  locale: Locale;
  dict: Dictionary;
};

export function LocalizedHomeScreen({ locale, dict }: LocalizedHomeScreenProps) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip bg-background">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(80%_50%_at_50%_-10%,rgba(0,209,255,0.12),transparent_60%),radial-gradient(50%_40%_at_100%_20%,rgba(255,122,26,0.08),transparent_55%)]" aria-hidden="true" />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-elevated focus:px-3 focus:py-2 focus:text-sm focus:text-foreground"
      >
        {locale === "tr" ? "İçeriğe atla" : "Skip to content"}
      </a>
      <Navbar locale={locale} dict={dict} path="" />
      <main id="main-content" className="flex-1">
        <HomeSections locale={locale} dict={dict} />
      </main>
      <Footer locale={locale} dict={dict} path="" />
    </div>
  );
}
