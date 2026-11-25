import type { Locale } from "@/content/i18n";

/**
 * Merkezi medya yönetimi (FAZ 8.1)
 *
 * - Tüm görsel/video yolları bu dosyadan yönetilir.
 * - Bileşenler sabit dosya yolu yazmaz; bu config’i okur.
 * - Görsel yoksa (src/poster undefined veya boş) mevcut placeholder davranışı korunur.
 * - Video yoksa (video.src undefined/boş) oynatıcı render edilmez, placeholder gösterilir.
 * - Sıralama: dizideki öğe sırası ekrandaki sırayı belirler (galeri/app screenshots).
 * - Dosya adı sabit tutulursa sadece public/ altındaki dosyayı değiştirmeniz yeterlidir.
 *   Yol değişirse ilgili `src` alanını burada güncelleyin.
 */

export type LocalizedText = Record<Locale, string>;

export type ImageMediaSpec = {
  /** public/ altındaki yol, örn. "/images/hero/hero-desktop.webp". Medya yoksa undefined bırakın. */
  src?: string;
  /** TR/EN alt metin (erişilebilirlik ve görsel mevcutken img alt). */
  alt: LocalizedText;
  /** Önerilen en-boy oranı (dokümantasyon). */
  recommendedRatio: string;
  /** Önerilen çözünürlük (dokümantasyon). */
  recommendedResolution: string;
  /** Önerilen format (dokümantasyon). */
  recommendedFormat: string;
  /** Bu görselin kullanıldığı bölüm (dokümantasyon). */
  usedIn: string;
};

export type GalleryImageItem = {
  /** Benzersiz ve stabil kimlik (bileşen eşlemesi/sıralama için). */
  id: string;
  src?: string;
  alt: LocalizedText;
  /** Kart üst etiketi (UI). */
  label: LocalizedText;
  /** Kısa açıklama (UI). */
  caption?: LocalizedText;
  recommendedRatio: string;
  recommendedResolution: string;
  recommendedFormat: string;
  usedIn: string;
};

export type AppScreenshotItem = {
  id: string;
  src?: string;
  /** Kategori etiketi ve alt metin türetimi için. */
  label: LocalizedText;
  caption?: LocalizedText;
  recommendedRatio: string;
  recommendedResolution: string;
  recommendedFormat: string;
  usedIn: string;
};

export type VideoMediaSpec = {
  src?: string;
  poster?: string;
  captionsSrc?: string;
  captionsLang?: Locale;
  /** Video/poster için açıklayıcı alt/erişim metni. */
  label: LocalizedText;
  posterAlt: LocalizedText;
  recommendedRatio: string;
  recommendedResolution: string;
  recommendedFormat: string;
  posterRecommendedFormat: string;
  usedIn: string;
};

export type SiteMedia = {
  hero: {
    desktop: ImageMediaSpec;
    mobile: ImageMediaSpec;
  };
  experience: {
    /** 3D Experience ana vitrin görseli/model önizleme görseli. */
    showcase: ImageMediaSpec;
  };
  /** Motosiklet detay galerisi (genel görünüm, motor, özelleştirme, mekanik detaylar). Sıralanabilir. */
  motorcycleDetailGallery: GalleryImageItem[];
  /** Uygulama ekran görüntüleri (sıralanabilir, FAZ 8.5 için korunur). */
  appScreenshots: AppScreenshotItem[];
  promoVideo: VideoMediaSpec;
};

/** Varsayılan/sabit dosya yolları: dosyayı aynı adla değiştirince kod güncellemesi gerekmez. */
export const mediaPaths = {
  heroDesktop: "/images/hero/hero-desktop.webp",
  heroMobile: "/images/hero/hero-mobile.webp",
  experienceShowcase: "/images/experience/experience-showcase.webp",
  detailMotorcycleOverview: "/images/gallery/motorcycle-detail.webp",
  detailEngine: "/images/gallery/engine-detail.webp",
  detailCustomization: "/images/gallery/customization-showcase.webp",
  detailMechanical: "/images/gallery/mechanical-details.webp",
  appGarage: "/images/app/screenshot-garage.webp",
  appCustomization: "/images/app/screenshot-customization.webp",
  appMaintenance: "/images/app/screenshot-maintenance.webp",
  appMotorcycleDetails: "/images/app/screenshot-motorcycle-details.webp",
  appCommunity: "/images/app/screenshot-community.webp",
  promoVideo: "/videos/promo/motocore-promo.mp4",
  promoPoster: "/videos/promo/motocore-promo-poster.webp",
  promoCaptionsTr: "/videos/promo/motocore-promo.tr.vtt",
  promoCaptionsEn: "/videos/promo/motocore-promo.en.vtt",
} as const;

export const siteMedia: SiteMedia = {
  hero: {
    desktop: {
      src: mediaPaths.heroDesktop,
      alt: {
        tr: "MotoCore dijital motosiklet garajı hero görseli (masaüstü)",
        en: "MotoCore digital motorcycle garage hero image (desktop)",
      },
      recommendedRatio: "4:5 veya 5:4 (mevcut hero vitrin alanına uygun, responsive crop)",
      recommendedResolution: "1600×2000 px (dikey) veya 2000×1600 px (yatay), @2x önerilir",
      recommendedFormat: "WebP (tercih), PNG/JPG alternatif",
      usedIn: "Ana sayfa Hero bölümü — masaüstü/ geniş ekran görseli",
    },
    mobile: {
      src: undefined, // hazır olduğunda: mediaPaths.heroMobile
      alt: {
        tr: "MotoCore dijital motosiklet garajı hero görseli (mobil)",
        en: "MotoCore digital motorcycle garage hero image (mobile)",
      },
      recommendedRatio: "4:5",
      recommendedResolution: "1080×1350 px (@2x önerilir)",
      recommendedFormat: "WebP (tercih), PNG/JPG alternatif",
      usedIn: "Ana sayfa Hero bölümü — mobil/dar ekran görseli",
    },
  },
  experience: {
    showcase: {
      src: mediaPaths.experienceShowcase,
      alt: {
        tr: "MotoCore 3D deneyim ve motosiklet vitrin görseli",
        en: "MotoCore 3D experience and motorcycle showcase image",
      },
      recommendedRatio: "16:10 veya 3:2",
      recommendedResolution: "1920×1200 px veya 1800×1200 px",
      recommendedFormat: "WebP (tercih), PNG/JPG alternatif",
      usedIn: "Ana sayfa 3D Experience bölümü ana vitrin alanı",
    },
  },
  motorcycleDetailGallery: [
    {
      id: "motorcycle-overview",
      src: mediaPaths.detailMotorcycleOverview,
      alt: {
        tr: "Yamaha MT-07 genel görünüm — karanlık garaj ortamında motosiklet detayı",
        en: "Yamaha MT-07 overview — motorcycle in a dark garage setting",
      },
      label: { tr: "Genel Görünüm", en: "Motorcycle Overview" },
      caption: {
        tr: "MT-07’nin genel duruşunu ve garaj atmosferini yansıtan ana görünüm.",
        en: "A wide view highlighting the MT-07 stance and garage atmosphere.",
      },
      recommendedRatio: "16:10 veya 3:2",
      recommendedResolution: "1920×1200 px veya 1800×1200 px",
      recommendedFormat: "WebP (tercih), JPG alternatif",
      usedIn: "Ana sayfa Motosiklet Detay Galerisi — ana vitrin görseli",
    },
    {
      id: "engine-detail",
      src: mediaPaths.detailEngine,
      alt: {
        tr: "Yamaha MT-07 motor ve mekanik detay yakın planı",
        en: "Yamaha MT-07 engine and mechanical close-up detail",
      },
      label: { tr: "Motor Detayı", en: "Engine Detail" },
      caption: {
        tr: "Motor bloğu ve mekanik karaktere odaklanan yakın plan detay.",
        en: "A close-up focused on the engine block and mechanical character.",
      },
      recommendedRatio: "4:5 veya 1:1",
      recommendedResolution: "1600×2000 px veya 1600×1600 px",
      recommendedFormat: "WebP (tercih), JPG alternatif",
      usedIn: "Ana sayfa Motosiklet Detay Galerisi — motor detayı",
    },
    {
      id: "customization-showcase",
      src: mediaPaths.detailCustomization,
      alt: {
        tr: "Yamaha MT-07 kişiselleştirme ve parça detayı vitrin görseli",
        en: "Yamaha MT-07 customization and parts showcase detail",
      },
      label: { tr: "Kişiselleştirme Vitrini", en: "Customization Showcase" },
      caption: {
        tr: "Parça, renk ve kişiselleştirme vizyonunu anlatan detay.",
        en: "A detail expressing parts, color, and personalization vision.",
      },
      recommendedRatio: "4:5 veya 3:4",
      recommendedResolution: "1600×2000 px veya 1500×2000 px",
      recommendedFormat: "WebP (tercih), JPG alternatif",
      usedIn: "Ana sayfa Motosiklet Detay Galerisi — kişiselleştirme detayı",
    },
    {
      id: "mechanical-details",
      src: mediaPaths.detailMechanical,
      alt: {
        tr: "Yamaha MT-07 gövde, şasi ve mekanik yüzey detayları",
        en: "Yamaha MT-07 body, chassis, and mechanical surface details",
      },
      label: { tr: "Mekanik Detaylar", en: "Mechanical Details" },
      caption: {
        tr: "Gövde, şasi ve mekanik yüzeylere odaklanan tamamlayıcı görünüm.",
        en: "A complementary view focused on body, chassis, and mechanical surfaces.",
      },
      recommendedRatio: "3:2 veya 4:3",
      recommendedResolution: "1800×1200 px veya 1600×1200 px",
      recommendedFormat: "WebP (tercih), JPG alternatif",
      usedIn: "Ana sayfa Motosiklet Detay Galerisi — mekanik detaylar",
    },
  ],
  appScreenshots: [
    {
      id: "digital-garage",
      src: mediaPaths.appGarage,
      label: { tr: "Garaj", en: "Garage" },
      caption: {
        tr: "Dijital garaj akışını göstermek için planlanan gerçek ekran görüntüsü alanı.",
        en: "Planned space for a real screenshot of the digital garage flow.",
      },
      recommendedRatio: "9:16",
      recommendedResolution: "1080×1920 px (veya cihaz çözünürlüğüne yakın)",
      recommendedFormat: "WebP (tercih), PNG alternatif",
      usedIn: "Ana sayfa App Screenshots bölümü (#app-screenshots) — Garaj",
    },
    {
      id: "customization-3d",
      src: mediaPaths.appCustomization,
      label: { tr: "Özelleştirme", en: "Customization" },
      caption: {
        tr: "Renk ve parça odaklı kişiselleştirme akışı için planlanan vitrin alanı.",
        en: "Planned showcase area for a color and part-focused personalization flow.",
      },
      recommendedRatio: "9:16",
      recommendedResolution: "1080×1920 px",
      recommendedFormat: "WebP (tercih), PNG alternatif",
      usedIn: "Ana sayfa App Screenshots bölümü (#app-screenshots) — Özelleştirme",
    },
    {
      id: "maintenance-tracking",
      src: mediaPaths.appMaintenance,
      label: { tr: "Bakım", en: "Maintenance" },
      caption: {
        tr: "Bakım takibi ve geçmişi ile ilgili akışlar için planlanan vitrin alanı.",
        en: "Planned showcase area for maintenance tracking and history flows.",
      },
      recommendedRatio: "9:16",
      recommendedResolution: "1080×1920 px",
      recommendedFormat: "WebP (tercih), PNG alternatif",
      usedIn: "Ana sayfa App Screenshots bölümü (#app-screenshots) — Bakım",
    },
    {
      id: "motorcycle-details",
      src: mediaPaths.appMotorcycleDetails,
      label: { tr: "Motosiklet Detayları", en: "Motorcycle Details" },
      caption: {
        tr: "Model ve detay inceleme ekranları için ayrılmış gerçek görüntü alanı.",
        en: "Reserved area for real model and detail inspection screens.",
      },
      recommendedRatio: "9:16",
      recommendedResolution: "1080×1920 px",
      recommendedFormat: "WebP (tercih), PNG alternatif",
      usedIn: "Ana sayfa App Screenshots bölümü (#app-screenshots) — Motosiklet Detayları",
    },
    {
      id: "community-shared-builds",
      src: mediaPaths.appCommunity,
      label: { tr: "Topluluk", en: "Community" },
      caption: {
        tr: "Paylaşılan yapılar ve topluluk keşfi ekranları için planlanan alan.",
        en: "Planned area for shared builds and community discovery screens.",
      },
      recommendedRatio: "9:16",
      recommendedResolution: "1080×1920 px",
      recommendedFormat: "WebP (tercih), PNG alternatif",
      usedIn: "Ana sayfa App Screenshots bölümü (#app-screenshots) — Topluluk",
    },
  ],
  promoVideo: {
    src: mediaPaths.promoVideo,
    poster: undefined, // hazır olduğunda: mediaPaths.promoPoster
    captionsSrc: undefined, // hazır olduğunda: locale’a göre mediaPaths.promoCaptionsTr/En
    captionsLang: undefined,
    label: {
      tr: "MotoCore tanıtım videosu",
      en: "MotoCore promo video",
    },
    posterAlt: {
      tr: "MotoCore tanıtım videosu poster görseli",
      en: "MotoCore promo video poster image",
    },
    recommendedRatio: "16:9",
    recommendedResolution: "1920×1080 px (Full HD) veya 3840×2160 px (4K, dosya boyutuna dikkat)",
    recommendedFormat: "MP4 (H.264/AAC, web uyumlu)",
    posterRecommendedFormat: "WebP veya JPG, 1920×1080 px",
    usedIn: "Ana sayfa Promo Video bölümü",
  },
};

/** Geriye dönük uyumluluk: PromoVideoSection için. */
export const promoVideoMedia = {
  src: siteMedia.promoVideo.src,
  poster: siteMedia.promoVideo.poster,
  captionsSrc: siteMedia.promoVideo.captionsSrc,
  captionsLang: siteMedia.promoVideo.captionsLang,
};

export type PromoVideoMedia = typeof promoVideoMedia;

export type GalleryMediaItem = {
  id: string;
  src?: string;
};

/** Geriye dönük uyumluluk: ScreenshotsGallery mevcut id/sıra eşlemesi için locale bazlı görünüm. */
export const galleryMediaByLocale: Record<Locale, GalleryMediaItem[]> = {
  tr: siteMedia.appScreenshots.map((item) => ({ id: item.id, src: item.src })),
  en: siteMedia.appScreenshots.map((item) => ({ id: item.id, src: item.src })),
};
