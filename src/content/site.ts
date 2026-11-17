import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "@/lib/constants";

export const siteConfig = {
  name: "MotoCore",
  defaultLocale: DEFAULT_LOCALE,
  supportedLocales: SUPPORTED_LOCALES,
};

export const localizedRoutes = ["", "/permissions", "/privacy-policy", "/terms-of-use"] as const;