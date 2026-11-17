import Image from "next/image";
import type { Dictionary, Locale } from "@/content/i18n";
import { siteMedia } from "@/content/media";

type HeroVisualProps = {
  dict: Dictionary;
  locale?: Locale;
  /** Manuel override (opsiyonel); verilmezse merkezi medya config kullanılır. */
  imageSrc?: string;
};

export function HeroVisual({ dict, locale, imageSrc }: HeroVisualProps) {
  const labels = dict.home.hero.indicators;
  const currentLocale = locale ?? dict.locale;
  const desktop = siteMedia.hero.desktop;
  const mobile = siteMedia.hero.mobile;
  const hasDesktop = Boolean(desktop.src);
  const hasMobile = Boolean(mobile.src);
  const hasAny = Boolean(imageSrc || hasDesktop || hasMobile);

  return (
    <div className="hero-reveal hero-reveal-4 relative mx-auto w-full max-w-[34rem] lg:max-w-none">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[linear-gradient(160deg,rgba(11,15,20,0.96),rgba(5,7,11,0.88))] shadow-[var(--shadow-panel)] sm:aspect-[5/4] lg:aspect-[4/5]">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(65%_55%_at_65%_35%,rgba(0,209,255,0.16),transparent_62%),radial-gradient(55%_45%_at_20%_85%,rgba(0,209,255,0.08),transparent_60%)]" />
        <div aria-hidden="true" className="absolute inset-0 opacity-[0.1] [background-image:linear-gradient(to_right,rgba(46,230,255,0.28)_1px,transparent_1px),linear-gradient(to_bottom,rgba(46,230,255,0.28)_1px,transparent_1px)] [background-size:42px_42px]" />
        <div aria-hidden="true" className="hero-scan absolute inset-x-[-20%] top-0 h-24 bg-[linear-gradient(to_bottom,transparent,rgba(46,230,255,0.07),transparent)]" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[rgba(5,7,11,0.7)] to-transparent" />

        {/* HUD corners */}
        <span aria-hidden="true" className="absolute left-4 top-4 h-6 w-6 border-l border-t border-primary/50 sm:left-5 sm:top-5" />
        <span aria-hidden="true" className="absolute right-4 top-4 h-6 w-6 border-r border-t border-primary/50 sm:right-5 sm:top-5" />
        <span aria-hidden="true" className="absolute bottom-4 left-4 h-6 w-6 border-b border-l border-primary/50 sm:bottom-5 sm:left-5" />
        <span aria-hidden="true" className="absolute bottom-4 right-4 h-6 w-6 border-b border-r border-primary/50 sm:bottom-5 sm:right-5" />

        {/* System indicators */}
        <div className="hero-reveal hero-reveal-5 absolute left-4 top-4 z-[2] hidden space-y-2 sm:left-6 sm:top-6 sm:block">
          {labels.slice(0, 2).map((label) => (
            <div key={label} className="flex items-center gap-2 rounded-md border border-[var(--border-subtle)] bg-[rgba(5,7,11,0.6)] px-2.5 py-1.5 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-bright shadow-[0_0_10px_rgba(46,230,255,0.55)]" />
              <span className="font-mono text-[10px] tracking-[0.16em] text-[var(--text-secondary)]">{label}</span>
            </div>
          ))}
        </div>
        <div className="hero-reveal hero-reveal-6 absolute bottom-4 right-4 z-[2] hidden space-y-2 sm:bottom-6 sm:right-6 sm:block">
          {labels.slice(2, 4).map((label) => (
            <div key={label} className="ml-auto flex w-fit items-center gap-2 rounded-md border border-[var(--border-subtle)] bg-[rgba(5,7,11,0.6)] px-2.5 py-1.5 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary/80 shadow-[0_0_10px_rgba(0,209,255,0.3)]" />
              <span className="font-mono text-[10px] tracking-[0.16em] text-[var(--text-secondary)]">{label}</span>
            </div>
          ))}
        </div>

        {/* Central showcase */}
        <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-8 lg:p-10">
          {hasAny ? (
            <div className="relative h-full w-full">
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt={desktop.alt[currentLocale]}
                  fill
                  className="object-contain drop-shadow-[0_0_40px_rgba(0,209,255,0.18)]"
                  priority
                  sizes="(min-width: 1024px) 42vw, 90vw"
                />
              ) : (
                <>
                  {hasDesktop ? (
                    <Image
                      src={desktop.src!}
                      alt={desktop.alt[currentLocale]}
                      fill
                      priority
                      sizes="(min-width: 1024px) 42vw, 90vw"
                      className={`${hasMobile ? "hidden sm:block" : ""} object-contain drop-shadow-[0_0_40px_rgba(0,209,255,0.18)]`}
                    />
                  ) : null}
                  {hasMobile ? (
                    <Image
                      src={mobile.src!}
                      alt={mobile.alt[currentLocale]}
                      fill
                      priority
                      sizes="90vw"
                      className={`${hasDesktop ? "block sm:hidden" : ""} object-contain drop-shadow-[0_0_40px_rgba(0,209,255,0.18)]`}
                    />
                  ) : null}
                </>
              )}
            </div>
          ) : (
            <div className="relative flex h-full w-full items-center justify-center">
              <div aria-hidden="true" className="absolute inset-x-[12%] bottom-[14%] h-px bg-[linear-gradient(90deg,transparent,rgba(46,230,255,0.45),transparent)]" />
              <div aria-hidden="true" className="absolute left-1/2 top-[18%] h-[56%] w-px -translate-x-1/2 bg-[linear-gradient(180deg,transparent,rgba(46,230,255,0.22),transparent)]" />
              <div aria-hidden="true" className="absolute bottom-[16%] left-1/2 h-[22%] w-[72%] -translate-x-1/2 rounded-[100%] border border-[rgba(46,230,255,0.18)] bg-[radial-gradient(ellipse_at_center,rgba(0,209,255,0.14),transparent_70%)] blur-[0.2px]" />
              <div aria-hidden="true" className="absolute bottom-[20%] left-1/2 h-[8%] w-[46%] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(46,230,255,0.18),transparent_70%)]" />

              <div className="relative z-[1] w-full max-w-[22rem] rounded-2xl border border-[var(--border-subtle)] bg-[rgba(11,15,20,0.72)] p-5 text-center backdrop-blur-md sm:p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary-bright/95 sm:text-[11px]">
                  YAMAHA MT-07 / VISUAL STAGE
                </p>
                <p className="mt-3 text-sm font-medium text-foreground/95 sm:text-base">
                  {currentLocale === "tr" ? "Gerçek hero görseli için hazır alan" : "Ready for the final hero image"}
                </p>
                <p className="mt-2 text-xs leading-6 text-[var(--text-secondary)] sm:text-sm">
                  {currentLocale === "tr"
                    ? "Görsel eklendiğinde bu placeholder otomatik olarak MT-07 kompozisyonuyla değişir."
                    : "When the image is added, this placeholder will be replaced by the MT-07 composition automatically."}
                </p>
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  public/images/hero
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}