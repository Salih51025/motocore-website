import type { MetadataRoute } from "next";
import { locales } from "@/content/i18n";
import { localizedRoutes } from "@/content/site";
import { SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!SITE_URL) return [];

  const base = SITE_URL.replace(/\/$/, "");
  return locales.flatMap((locale) =>
    localizedRoutes.map((route) => ({
      url: `${base}/${locale}${route}`,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${base}/${l}${route}`]),
        ),
      },
    })),
  );
}