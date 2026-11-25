"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteMedia } from "@/content/media";
import type { Dictionary, Locale } from "@/content/i18n";

/**
 * Uygulama ekran görüntüleri vitrini (gerçek medya odaklı).
 * siteMedia.appScreenshots + home.appScreenshots i18n kullanır.
 * src tanımsızsa sahte UI/mockup üretmeden premium placeholder gösterir.
 */
export function AppScreenshotsGallery({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const gallery = dict.home.appScreenshots;
  const screenshots = siteMedia.appScreenshots;
  const [selected, setSelected] = useState<{ src: string; alt: string; label: string } | null>(null);

  useEffect(() => {
    if (!selected) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selected]);

  const closeLabel = locale === "tr" ? "Kapat" : "Close";
  const expandLabel = locale === "tr" ? "Görseli büyüt" : "Expand image";

  return (
    <section id="app-screenshots" className="scroll-mt-24 py-20 sm:py-24 lg:py-28">
      <PageContainer className="space-y-10 lg:space-y-12">
        <div className="max-w-3xl">
          <SectionHeading
            eyebrow={gallery.eyebrow}
            title={gallery.title}
            description={gallery.description}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-4">
          {screenshots.map((item, index) => {
            const i18nCategory = gallery.categories.find((c) => c.id === item.id);
            const label = i18nCategory?.label ?? item.label[locale];
            const caption = i18nCategory?.caption ?? item.caption?.[locale] ?? "";
            const hasImage = Boolean(item.src);
            const alt = `${gallery.imageAltPrefix}: ${label}`;

            return (
              <article
                key={item.id}
                className="group flex h-full flex-col rounded-2xl border border-[var(--border-subtle)] bg-[linear-gradient(180deg,rgba(18,24,33,0.72),rgba(11,15,20,0.92))] p-3 sm:p-4 transition-colors duration-300 hover:border-[rgba(46,230,255,0.28)]"
              >
                <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[1.25rem] border border-[var(--border-subtle)] bg-[rgba(5,7,11,0.72)]">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_60%_at_50%_0%,rgba(0,209,255,0.08),transparent_60%)]"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-5 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(46,230,255,0.35),transparent)]"
                  />

                  {hasImage && item.src ? (
                    <button
                      type="button"
                      className="relative block h-full w-full cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
                      onClick={() => setSelected({ src: item.src!, alt, label })}
                      aria-label={`${expandLabel}: ${label}`}
                    >
                      <Image
                        src={item.src}
                        alt={alt}
                        fill
                        sizes="(min-width: 1280px) 18vw, (min-width: 1024px) 28vw, (min-width: 640px) 45vw, 92vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute bottom-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(46,230,255,0.28)] bg-[rgba(5,7,11,0.62)] text-primary-bright opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                        </svg>
                      </span>
                    </button>
                  ) : (
                    <div className="relative flex h-full flex-col justify-between p-4 text-left sm:p-5">
                      <div className="flex items-start justify-between gap-3">
                        <span className="inline-flex max-w-[78%] rounded-full border border-[rgba(46,230,255,0.18)] bg-[rgba(11,15,20,0.55)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-primary-bright/90">
                          {gallery.statusLabel}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <div
                          aria-hidden="true"
                          className="h-20 w-full rounded-xl border border-dashed border-[var(--border-subtle)] bg-[rgba(11,15,20,0.35)]"
                        />
                        <p className="text-xs leading-6 text-[var(--text-secondary)] sm:text-sm">
                          {gallery.statusDetail}
                        </p>
                      </div>

                      <div aria-hidden="true" className="space-y-1.5">
                        <div className="h-px w-full bg-[linear-gradient(90deg,rgba(46,230,255,0.22),transparent)]" />
                        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                          /images/app · 9:16
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4 space-y-1.5 px-0.5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary-bright/90">
                    {label}
                  </p>
                  <p className="text-sm leading-6 text-[var(--text-secondary)]">{caption}</p>
                </div>
              </article>
            );
          })}
        </div>
      </PageContainer>

      {selected ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(5,7,11,0.88)] p-4 backdrop-blur-sm sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={selected.label}
          onClick={() => setSelected(null)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 z-[101] inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[rgba(11,15,20,0.72)] text-foreground hover:border-[var(--border-strong)] hover:bg-[rgba(18,24,33,0.9)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
            onClick={() => setSelected(null)}
            aria-label={closeLabel}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
          <div
            className="relative h-full max-h-[88vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-full w-full overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[rgba(11,15,20,0.55)]">
              <Image
                src={selected.src}
                alt={selected.alt}
                fill
                sizes="100vw"
                className="object-contain p-2 sm:p-4"
                priority
              />
            </div>
            <p className="mt-3 text-center font-mono text-xs uppercase tracking-[0.18em] text-primary-bright/90">
              {selected.label}
            </p>
          </div>
        </div>
      ) : null}
    </section>
  );
}
