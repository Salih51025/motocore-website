"use client";

import { useEffect, useRef, useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";

import { siteMedia } from "@/content/media";
import type { Dictionary } from "@/content/i18n";

export function PromoVideoSection({ dict }: { dict: Dictionary }) {
  const { video } = dict.home;
  const locale = dict.locale;
  const media = siteMedia.promoVideo;
  const hasVideo = Boolean(media.src);
  const [open, setOpen] = useState(false);
  const inlineVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!open) return;
    inlineVideoRef.current?.pause();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const closeLabel = locale === "tr" ? "Kapat" : "Close";
  const expandLabel = locale === "tr" ? "Videoyu büyüt" : "Expand video";

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
                <div className="flex items-center gap-2">
                  {hasVideo ? (
                    <button
                      type="button"
                      onClick={() => setOpen(true)}
                      className="inline-flex items-center gap-2 rounded-md border border-[var(--border-subtle)] bg-[rgba(11,15,20,0.55)] px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
                      aria-label={expandLabel}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                      </svg>
                      {expandLabel}
                    </button>
                  ) : null}
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-primary-bright/70" />
                    <span>{video.statusLabel}</span>
                  </div>
                </div>
              </div>

              <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[rgba(5,7,11,0.7)]">
                <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(46,230,255,0.35),transparent)]" />

                {hasVideo && media.src ? (
                  <video
                    ref={inlineVideoRef}
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
                      className="mt-5 inline-flex min-h-11 cursor-not-allowed items-center gap-2 rounded-lg border border-[rgba(184,196,214,0.22)] bg-[rgba(18,24,33,0.72)] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-secondary)] sm:text-sm"
                    >
                      <span aria-hidden="true" className="inline-block border-y-[5px] border-y-transparent border-l-[8px] border-l-[var(--text-secondary)]" />
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

      {open && hasVideo && media.src ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(5,7,11,0.88)] p-4 backdrop-blur-sm sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={media.label[locale] || video.title}
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 z-[101] inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[rgba(11,15,20,0.72)] text-foreground hover:border-[var(--border-strong)] hover:bg-[rgba(18,24,33,0.9)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
            onClick={() => setOpen(false)}
            aria-label={closeLabel}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
          <div
            className="w-full max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[rgba(11,15,20,0.72)] shadow-[var(--shadow-panel)]">
              <video
                className="aspect-video w-full bg-black"
                controls
                autoPlay
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
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
