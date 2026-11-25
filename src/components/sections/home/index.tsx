import type { Locale } from "@/types/i18n";
import type { Dictionary } from "@/content/i18n";
import { Reveal } from "@/components/effects/Reveal";
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
      <Reveal><IntroSection dict={dict} /></Reveal>
      <Reveal><FeaturesSection dict={dict} /></Reveal>
      <Reveal><Experience3DSection dict={dict} /></Reveal>
      <Reveal><ScreenshotsGallery dict={dict} locale={locale} /></Reveal>
      <Reveal><PromoVideoSection dict={dict} /></Reveal>
      <Reveal><AppScreenshotsGallery dict={dict} locale={locale} /></Reveal>
      <Reveal><PermissionsPreviewSection locale={locale} dict={dict} /></Reveal>
      <Reveal><FinalCTASection dict={dict} /></Reveal>
    </>
  );
}
