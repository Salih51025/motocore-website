import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/content/i18n";
import { localizedRoutes, siteConfig } from "@/content/site";

type PageKey = "home" | "privacy" | "permissions" | "terms";

const routeByKey: Record<PageKey, (typeof localizedRoutes)[number]> = {
  home: "",
  privacy: "/privacy-policy",
  permissions: "/permissions",
  terms: "/terms-of-use",
};

export function getLocalizedPath(locale: Locale, path = ""): string {
  return `/${locale}${path}`;
}

export function createAlternates(locale: Locale, path = ""): Metadata["alternates"] {
  const languages = Object.fromEntries(
    siteConfig.supportedLocales.map((l) => [l, getLocalizedPath(l, path)]),
  ) as Record<string, string>;

  return {
    canonical: getLocalizedPath(locale, path),
    languages: {
      ...languages,
      "x-default": getLocalizedPath(siteConfig.defaultLocale, path),
    },
  };
}

export function createPageMetadata(locale: Locale, page: PageKey): Metadata {
  const dict = getDictionary(locale);
  const meta = dict.meta[page];
  const path = routeByKey[page];

  return {
    title: meta.title,
    description: meta.description,
    alternates: createAlternates(locale, path),
    openGraph: {
      title: meta.title,
      description: meta.description,
      siteName: dict.meta.siteName,
      locale: dict.ogLocale,
      alternateLocale: [dict.ogAlternateLocale],
      type: "website",
      url: getLocalizedPath(locale, path),
    },
    twitter: {
      card: "summary",
      title: meta.title,
      description: meta.description,
    },
  };
}