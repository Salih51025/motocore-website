export const locales = ["tr", "en"] as const;

export type Locale = (typeof locales)[number];

export type LegalSection = {
  id: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  note?: string;
};

export type PermissionItem = {
  id: string;
  name: string;
  purpose: string;
  userControl: string;
  status: string;
};

export type Dictionary = {
  locale: Locale;
  languageName: string;
  htmlLang: string;
  ogLocale: string;
  ogAlternateLocale: string;
  meta: {
    siteName: string;
    home: { title: string; description: string };
    privacy: { title: string; description: string };
    permissions: { title: string; description: string };
    terms: { title: string; description: string };
  };
  nav: {
    home: string;
    features: string;
    experience: string;
    video: string;
    gallery: string;
    galleryMotorcycle: string;
    appScreenshots: string;
    privacy: string;
    permissions: string;
    terms: string;
    cta: string;
    menuOpen: string;
    menuClose: string;
    language: string;
  };
  footer: {
    tagline: string;
    description: string;
    navigationTitle: string;
    legalTitle: string;
    languageTitle: string;
    socialTitle: string;
    socialNote: string;
    rights: string;
  };
  home: {
    hero: {
      eyebrow: string;
      title: string;
      sloganPrimary: string;
      sloganSecondary: string;
      description: string;
      primaryCta: string;
      secondaryCta: string;
      status: string;
      clarityPoints: string[];
      indicators: string[];
    };
    intro: {
      eyebrow: string;
      title: string;
      description: string;
      panelEyebrow: string;
      panelTitle: string;
      panelDescription: string;
      panelHighlights: string[];
    };
    features: {
      eyebrow: string;
      title: string;
      description: string;
      items: Array<{
        id: string;
        kicker: string;
        title: string;
        description: string;
        highlights: string[];
      }>;
    };
    experience: {
      eyebrow: string;
      title: string;
      description: string;
      showcaseLabel: string;
      showcaseNote: string;
      panelTitle: string;
      panelItems: Array<{ label: string; value: string }>;
      tags: string[];
    };
    video: {
      eyebrow: string;
      title: string;
      description: string;
      frameLabel: string;
      statusLabel: string;
      statusDetail: string;
      playLabel: string;
      playHint: string;
      posterLabel: string;
    };
    gallery: {
      eyebrow: string;
      title: string;
      description: string;
      placeholderLabel: string;
      placeholderDetail: string;
      imageAltPrefix: string;
      categories: Array<{
        id: string;
        label: string;
        caption: string;
      }>;
    };
    appScreenshots: {
      eyebrow: string;
      title: string;
      description: string;
      statusLabel: string;
      statusDetail: string;
      imageAltPrefix: string;
      categories: Array<{
        id: string;
        label: string;
        caption: string;
      }>;
    };
    permissionsPreview: {
      eyebrow: string;
      title: string;
      description: string;
      cta: string;
      note: string;
    };
    finalCta: {
      eyebrow: string;
      title: string;
      description: string;
      primaryCta: string;
      primaryCtaHref?: string;
      secondaryCta?: string;
      secondaryCtaHref?: string;
      note?: string;
    };
  };
  legal: {
    lastUpdatedLabel: string;
    lastUpdatedValue: string;
    reviewNoticeTitle: string;
    reviewNoticeBody: string;
    privacy: {
      title: string;
      intro: string;
      sections: LegalSection[];
      checklistTitle: string;
      checklistItems: string[];
    };
    permissions: {
      title: string;
      intro: string;
      items: PermissionItem[];
      notRequestedTitle: string;
      notRequestedBody: string;
      uncertainTitle: string;
      uncertainItems: string[];
      checklistTitle: string;
      checklistItems: string[];
    };
    terms: {
      title: string;
      intro: string;
      sections: LegalSection[];
      checklistTitle: string;
      checklistItems: string[];
    };
  };
  notFound: {
    title: string;
    description: string;
    cta: string;
  };
};