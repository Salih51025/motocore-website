import type { Locale } from "@/types/i18n";
import type { Dictionary } from "@/content/i18n";
import { HeroSection } from "./HeroSection";
import { IntroSection } from "./IntroSection";
import { FeaturesSection } from "./FeaturesSection";
import { Experience3DSection } from "./Experience3DSection";
import { ScreenshotsGallery } from "./ScreenshotsGallery";
import { PromoVideoSection } from "./PromoVideoSection";
import { AppScreenshotsGallery } from "./AppScreenshotsGallery";
import { PermissionsPreviewSection } from "./PermissionsPreviewSection";
import { FinalCTASection } from "./FinalCTASection";

export function HomeSections({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <>
      <HeroSection dict={dict} />
      <IntroSection dict={dict} />
      <FeaturesSection dict={dict} />
      <Experience3DSection dict={dict} />
      <ScreenshotsGallery dict={dict} locale={locale} />
      <PromoVideoSection dict={dict} />
      <AppScreenshotsGallery dict={dict} locale={locale} />
      <PermissionsPreviewSection locale={locale} dict={dict} />
      <FinalCTASection dict={dict} />
    </>
  );
}