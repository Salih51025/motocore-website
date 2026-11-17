import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";

import { siteMedia } from "@/content/media";
import type { Dictionary } from "@/content/i18n";

export function PromoVideoSection({ dict }: { dict: Dictionary }) {
  const { video } = dict.home;
  const locale = dict.locale;
  const media = siteMedia.promoVideo;
  const hasVideo = Boolean(media.src);

  return (
    <section
      id="video"
      className="scroll-mt-24 border-y border-[var(--border-subtle)] bg-surface/20 py-20 sm:py-24 lg:py-28"
    >
      <PageContainer className="space-y-10 lg:space-y-12">
        <SectionHeading
          eyebrow={video.eyebrow}
          title={video.title}
          description={video.description}
          align="center"
        />

        <div className="mx-auto w-full max-w-6xl">
          <div className="relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[linear-gradient(160deg,rgba(11,15,20,0.92),rgba(5,7,11,0.9))] p-3 shadow-[var(--shadow-panel)] sm:p-4">
            <div className="relative">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2 px-1 sm:px-2">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary-bright">
                  {video.frameLabel}
                </p>
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-primary-bright/70" />
                  <span>{video.statusLabel}</span>
                </div>
              </div>

              <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[rgba(5,7,11,0.7)]">
                <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(46,230,255,0.35),transparent)]" />

                {hasVideo && media.src ? (
                  <video
                    className="relative z-[1] h-full w-full object-cover"
                    controls
                    playsInline
                    preload="metadata"
                    poster={media.poster}
                    aria-label={media.label[locale] || video.title}
                  >
                    <source src={media.src} />
                    {media.captionsSrc ? (
                      <track
                        kind="captions"
                        src={media.captionsSrc}
                        srcLang={media.captionsLang ?? locale}
                        label={(media.captionsLang ?? locale) === "tr" ? "Türkçe" : "English"}
                      />
                    ) : null}
                  </video>
                ) : (
                  <div className="relative z-[1] flex h-full w-full flex-col items-center justify-center p-6 text-center sm:p-10">
                    <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_45%_at_50%_45%,rgba(0,209,255,0.12),transparent_70%)]" />

                    <div className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[rgba(11,15,20,0.75)] shadow-[var(--glow-primary-soft)] sm:h-20 sm:w-20">
                      <span
                        aria-hidden="true"
                        className="ml-1 inline-block border-y-[8px] border-y-transparent border-l-[14px] border-l-primary-bright/70 sm:border-y-[10px] sm:border-l-[16px]"
                      />
                      <span className="sr-only">{video.playLabel}</span>
                    </div>

                    <div className="relative max-w-xl rounded-xl border border-[var(--border-subtle)] bg-[rgba(11,15,20,0.7)] px-4 py-4 backdrop-blur-sm sm:px-6">
                      <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary-bright">
                        {video.posterLabel}
                      </p>
                      <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
                        {video.statusDetail}
                      </p>
                      <p className="mt-3 text-xs leading-6 text-[var(--text-muted)]">{video.playHint}</p>
                    </div>

                    <button
                      type="button"
                      disabled
                      aria-disabled="true"
                      className="mt-5 inline-flex cursor-not-allowed items-center gap-2 rounded-md border border-[var(--border-subtle)] bg-[rgba(5,7,11,0.55)] px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] text-[var(--text-muted)] sm:text-sm"
                    >
                      <span aria-hidden="true" className="inline-block border-y-[5px] border-y-transparent border-l-[8px] border-l-[var(--text-muted)]" />
                      {video.playLabel}
                    </button>

                    <div aria-hidden="true" className="pointer-events-none absolute bottom-4 left-4 hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)] sm:flex">
                      <span className="h-px w-8 bg-[linear-gradient(90deg,rgba(46,230,255,0.5),transparent)]" />
                      <span>REC / 16:9 / CINEMATIC</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}