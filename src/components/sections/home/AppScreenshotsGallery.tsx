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
                    <Image
                      src={item.src}
                      alt={alt}
                      fill
                      sizes="(min-width: 1280px) 18vw, (min-width: 1024px) 28vw, (min-width: 640px) 45vw, 92vw"
                      className="object-cover"
                    />
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
    </section>
  );
}
