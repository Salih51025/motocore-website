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
        expectation: "Kullanıcı MotoCore'un dijital motosiklet garajı olduğunu ilk bakışta anlar.",
      },
      {
        id: "offer",
        label: "Ne sunduğu",
        expectation: "Kullanıcı 3D garaj, parça inceleme ve bakım/yönetim vizyonunu hızlıca görür.",
      },
      {
        id: "status",
        label: "Durum",
        expectation: "Kullanıcı bunun bir konsept vitrin olduğunu ve uygulamanın henüz mağazada olmadığını fark eder.",
      },
      {
        id: "focus",
        label: "Odak",
        expectation: "MotoCore'un üç temel ürün alanı (3D garaj, parça/personalizasyon, bakım/yönetim) görünür.",
      },
    ],
    requiredHeroSignals: [
      "DİJİTAL MOTOSİKLET GARAJI",
      "MotoCore",
      "Garajın artık cebinde.",
      "Konsept vitrin • Uygulama geliştirme aşamasında",
      "3D dijital garajda incele",
      "Parçaları etkileşimli keşfet",
      "Bakım ve yönetimi tek yerde planla",
    ],
  },
  en: {
    locale: "en",
    criteria: [
      {
        id: "what",
        label: "What it is",
        expectation: "Visitors immediately understand MotoCore is a digital motorcycle garage.",
      },
      {
        id: "offer",
        label: "What it offers",
        expectation: "Visitors quickly see 3D garage, part exploration, and maintenance/management vision.",
      },
      {
        id: "status",
        label: "Status",
        expectation: "Visitors understand this is a concept showcase and the app is not in stores yet.",
      },
      {
        id: "focus",
        label: "Focus",
        expectation: "MotoCore's three core product areas are visible: 3D garage, parts/personalization, maintenance/management.",
      },
    ],
    requiredHeroSignals: [
      "DIGITAL MOTORCYCLE GARAGE",
      "MotoCore",
      "Your garage, now in your pocket.",
      "Concept showcase • App in development",
      "Explore in a 3D digital garage",
      "Inspect parts interactively",
      "Plan maintenance and management in one place",
    ],
  },
};

export function getClarityAudit(locale: Locale): ClarityAudit {
  return clarityAudits[locale];
}
