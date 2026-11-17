import { locales, type Locale } from "@/types/i18n";

export const APP_NAME = "MotoCore";
export const DEFAULT_LOCALE: Locale = "tr";
export const SUPPORTED_LOCALES = locales;
export const LOCALE_LABELS: Record<Locale, string> = {
  tr: "TR",
  en: "EN",
};

// Domain henüz kesinleşmedi; sitemap/metadata mutlak URL gerektiğinde buradan yapılandırılacak.
export const SITE_URL: string = "";