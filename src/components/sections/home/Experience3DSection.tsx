import Image from "next/image";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HudPanel } from "@/components/ui/HudPanel";
import { GridOverlay } from "@/components/effects/GridOverlay";
import { siteMedia } from "@/content/media";
import type { Dictionary } from "@/content/i18n";

export function Experience3DSection({ dict }: { dict: Dictionary }) {
  const { experience } = dict.home;
  const locale = dict.locale;
  const showcase = siteMedia.experience.showcase;
  const hasShowcase = Boolean(showcase.src);
  const hudLabels = experience.tags;

  return (
    <section id="experience" className="scroll-mt-24 py-20 sm:py-24 lg:py-28">
      <PageContainer className="space-y-10 lg:space-y-12">
        <div className="max-w-4xl">
          <SectionHeading
            eyebrow={experience.eyebrow}
            title={experience.title}
            description={experience.description}
          />
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[linear-gradient(180deg,rgba(11,15,20,0.96),rgba(5,7,11,0.92))] shadow-[var(--shadow-panel)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_38%,rgba(0,209,255,0.1),transparent_68%),linear-gradient(180deg,rgba(18,24,33,0.12),rgba(5,7,11,0.3))]"
          />
          <GridOverlay className="opacity-[0.03] [mask-image:radial-gradient(ellipse_at_center,black,transparent_90%)]" />

          <div className="relative p-4 sm:p-6 lg:p-8">
            <div className="relative aspect-[16/10] min-h-[20rem] overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[rgba(5,7,11,0.58)] sm:min-h-[26rem] lg:min-h-[34rem]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_45%_at_50%_55%,rgba(0,209,255,0.09),transparent_72%),linear-gradient(180deg,rgba(46,230,255,0.03),transparent_30%,rgba(5,7,11,0.28))]"
              />

              <div className="absolute left-4 top-4 z-[3] sm:left-6 sm:top-6">
                <div className="rounded-md border border-[var(--border-subtle)] bg-[rgba(5,7,11,0.68)] px-3 py-2 backdrop-blur-sm">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary-bright sm:text-[11px]">
                    {experience.showcaseLabel}
                  </p>
                </div>
              </div>

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-4 bottom-4 z-[3] hidden flex-wrap gap-2 sm:inset-x-6 sm:bottom-6 sm:flex"
              >
                {hudLabels.slice(0, 3).map((label) => (
                  <div
                    key={label}
                    className="rounded-md border border-[var(--border-subtle)]/80 bg-[rgba(5,7,11,0.56)] px-2.5 py-1.5 backdrop-blur-sm"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-secondary)]">
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="absolute inset-0 p-6 sm:p-10 lg:p-12">
                <div className="relative h-full w-full">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-[10%] bottom-[10%] h-px bg-[linear-gradient(90deg,transparent,rgba(46,230,255,0.35),transparent)]"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-[12%] left-1/2 h-[18%] w-[70%] -translate-x-1/2 rounded-[100%] border border-[rgba(46,230,255,0.14)] bg-[radial-gradient(ellipse_at_center,rgba(0,209,255,0.12),transparent_72%)]"
                  />

                  {hasShowcase && showcase.src ? (
                    <div className="relative z-[2] h-full w-full">
                      <Image
                        src={showcase.src}
                        alt={showcase.alt[locale]}
                        fill
                        priority={false}
                        sizes="(min-width: 1280px) 1100px, (min-width: 1024px) 90vw, 95vw"
                        className="object-contain drop-shadow-[0_0_40px_rgba(0,209,255,0.16)]"
                      />
                    </div>
                  ) : (
                    <div className="relative z-[2] flex h-full w-full items-center justify-center">
                      <div className="w-full max-w-xl rounded-2xl border border-[var(--border-subtle)] bg-[rgba(11,15,20,0.72)] p-5 text-center backdrop-blur-md sm:p-7">
                        <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-primary-bright/95 sm:text-[11px]">
                          MT-07 EXPERIENCE / MEDIA READY
                        </p>
                        <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
                          {experience.showcaseNote}
                        </p>
                        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                          public/images/experience
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <HudPanel showCorners={false} className="h-full">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary-bright">
              {experience.panelTitle}
            </p>
            <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
              {locale === "tr"
                ? "Aşağıdaki başlıklar, gerçek ürün özelliklerini kesin olarak vaat etmek yerine deneyim vizyonunu ve odak alanlarını anlatır."
                : "The items below describe the experience vision and focus areas, without presenting unfinished capabilities as ready-to-use features."}
            </p>
          </HudPanel>

          <div className="grid gap-4 sm:grid-cols-2">
            {experience.panelItems.map((item) => (
              <HudPanel key={item.label} showCorners={false} className="h-full">
                <h3 className="text-base font-semibold tracking-tight text-foreground sm:text-lg">{item.label}</h3>
                <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">{item.value}</p>
              </HudPanel>
            ))}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
