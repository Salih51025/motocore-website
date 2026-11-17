import Image from "next/image";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteMedia } from "@/content/media";
import type { Dictionary, Locale } from "@/content/i18n";

export function ScreenshotsGallery({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const { gallery } = dict.home;
  const items = siteMedia.motorcycleDetailGallery;

  return (
    <section id="gallery" className="scroll-mt-24 py-20 sm:py-24 lg:py-28">
      <PageContainer className="space-y-10 lg:space-y-12">
        <div className="max-w-3xl">
          <SectionHeading
            eyebrow={gallery.eyebrow}
            title={gallery.title}
            description={gallery.description}
          />
        </div>

        <div className="grid gap-4 sm:gap-5 lg:grid-cols-12 lg:gap-6">
          {items.map((item, index) => {
            const i18nCategory = gallery.categories.find((c) => c.id === item.id);
            const label = i18nCategory?.label ?? item.label[locale];
            const caption = i18nCategory?.caption ?? item.caption?.[locale] ?? "";
            const hasImage = Boolean(item.src);
            const alt = item.alt?.[locale] || `${gallery.imageAltPrefix}: ${label}`;
            const layoutClass =
              index === 0
                ? "lg:col-span-7 lg:row-span-2"
                : index === 1
                  ? "lg:col-span-5"
                  : index === 2
                    ? "lg:col-span-5"
                    : "lg:col-span-12";
            const aspectClass =
              index === 0
                ? "aspect-[4/5] sm:aspect-[5/4] lg:aspect-auto lg:min-h-[38rem]"
                : index === 3
                  ? "aspect-[16/10] sm:aspect-[16/9] lg:min-h-[18rem]"
                  : "aspect-[4/5] sm:aspect-[4/3] lg:min-h-[18rem]";

            return (
              <figure
                key={item.id}
                className={`${layoutClass} group relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[linear-gradient(180deg,rgba(18,24,33,0.55),rgba(11,15,20,0.9))]`}
              >
                <div className={`relative w-full ${aspectClass}`}>
                  {hasImage && item.src ? (
                    <>
                      <Image
                        src={item.src}
                        alt={alt}
                        fill
                        sizes={
                          index === 0
                            ? "(min-width: 1024px) 58vw, 100vw"
                            : index === 3
                              ? "(min-width: 1024px) 92vw, 100vw"
                              : "(min-width: 1024px) 38vw, 100vw"
                        }
                        className="object-cover transition-transform duration-700 ease-out motion-reduce:transition-none group-hover:scale-[1.02]"
                      />
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(5,7,11,0.82)] via-[rgba(5,7,11,0.18)] to-transparent"
                      />
                    </>
                  ) : (
                    <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6">
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_35%,rgba(0,209,255,0.1),transparent_70%),linear-gradient(180deg,rgba(18,24,33,0.2),rgba(5,7,11,0.35))]"
                      />
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-6 bottom-6 h-px bg-[linear-gradient(90deg,transparent,rgba(46,230,255,0.28),transparent)]"
                      />
                      <div className="relative z-[1] flex items-center justify-between">
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                          {gallery.placeholderLabel}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary-bright/70">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <div className="relative z-[1] max-w-md">
                        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary-bright/90">
                          Yamaha MT-07 / Detail
                        </p>
                        <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
                          {gallery.placeholderDetail}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <figcaption className="relative z-[2] border-t border-[var(--border-subtle)] bg-[rgba(11,15,20,0.72)] px-5 py-4 backdrop-blur-sm sm:px-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary-bright/90">
                    {label}
                  </p>
                  <p className="mt-1.5 text-sm leading-6 text-[var(--text-secondary)]">{caption}</p>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </PageContainer>
    </section>
  );
}
