import type { Locale } from "@/types/i18n";

/**
 * 3-second clarity audit model.
 * These are the core questions a first-time visitor should answer almost immediately:
 * 1) What is MotoCore?
 * 2) What can I do with it?
 * 3) What is the current status (concept/showcase vs. available app)?
 */
export type ClarityCriterion = {
  id: "what" | "offer" | "status" | "focus";
  label: string;
  expectation: string;
};

export type ClarityAudit = {
  locale: Locale;
  criteria: ClarityCriterion[];
  requiredHeroSignals: string[];
};

export const clarityAudits: Record<Locale, ClarityAudit> = {
  tr: {
    locale: "tr",
    criteria: [
      {
        id: "what",
        label: "Ne olduğu",
        expectation: "Kullanıcı MotoCore'un dijital motosiklet garajı/deneyimi olduğunu ilk bakışta anlar.",
      },
      {
        id: "offer",
        label: "Ne sunduğu",
        expectation: "Kullanıcı keşfetme, kişiselleştirme ve bakım takibi gibi temel değerleri hızlıca görür.",
      },
      {
        id: "status",
        label: "Durum",
        expectation: "Kullanıcı bunun bir konsept vitrin olduğunu ve uygulamanın henüz mağazada olmadığını fark eder.",
      },
      {
        id: "focus",
        label: "Odak",
        expectation: "Yamaha MT-07 odaklı konsept bağlamı görünür ve kafa karıştırmaz.",
      },
    ],
    requiredHeroSignals: [
      "DİJİTAL MOTOSİKLET GARAJI",
      "MotoCore",
      "Motosikletin için kişisel dijital garaj.",
      "Konsept vitrin • Uygulama geliştirme aşamasında",
      "3D garajda incele",
      "Renk ve parça kişiselleştir",
      "Bakım takibini planla",
    ],
  },
  en: {
    locale: "en",
    criteria: [
      {
        id: "what",
        label: "What it is",
        expectation: "Visitors immediately understand MotoCore is a digital motorcycle garage/experience.",
      },
      {
        id: "offer",
        label: "What it offers",
        expectation: "Visitors quickly see core value: explore, customize, and track maintenance.",
      },
      {
        id: "status",
        label: "Status",
        expectation: "Visitors understand this is a concept showcase and the app is not in stores yet.",
      },
      {
        id: "focus",
        label: "Focus",
        expectation: "The Yamaha MT-07 concept focus is visible without creating confusion.",
      },
    ],
    requiredHeroSignals: [
      "DIGITAL MOTORCYCLE GARAGE",
      "MotoCore",
      "A personal digital garage for your motorcycle.",
      "Concept showcase • App in development",
      "Inspect in a 3D garage",
      "Customize colors and parts",
      "Plan maintenance tracking",
    ],
  },
};

export function getClarityAudit(locale: Locale): ClarityAudit {
  return clarityAudits[locale];
}
