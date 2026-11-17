import { en } from "@/content/i18n/en";
import { tr } from "@/content/i18n/tr";
import { locales, type Dictionary, type Locale } from "@/types/i18n";

export const dictionaries: Record<Locale, Dictionary> = { tr, en };

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export { locales, type Dictionary, type Locale };