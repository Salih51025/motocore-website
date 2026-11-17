import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/content/i18n";

function FeatureIcon({ id }: { id: string }) {
  const common = "h-11 w-11 rounded-xl border border-[var(--border-subtle)] bg-[rgba(5,7,11,0.65)] p-2.5";
  const stroke = "rgba(46,230,255,0.9)";
  const accent = "rgba(255,122,26,0.85)";

  if (id === "garage") {
    return (
      <div aria-hidden="true" className={common}>
        <svg viewBox="0 0 24 24" className="h-full w-full" fill="none">
          <path d="M4 10.5 12 5l8 5.5V19H4v-8.5Z" stroke={stroke} strokeWidth="1.5" />
          <path d="M9 19v-5h6v5" stroke={stroke} strokeWidth="1.5" />
          <path d="M3 11h18" stroke={accent} strokeWidth="1.2" opacity="0.8" />
        </svg>
      </div>
    );
  }
  if (id === "customization") {
    return (
      <div aria-hidden="true" className={common}>
        <svg viewBox="0 0 24 24" className="h-full w-full" fill="none">
          <path d="M12 4v4m0 8v4M4 12h4m8 0h4" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="12" cy="12" r="3.5" stroke={accent} strokeWidth="1.5" />
          <path d="M7 7l2 2m6 6 2 2m0-10-2 2M9 15l-2 2" stroke={stroke} strokeWidth="1.2" opacity="0.8" />
        </svg>
      </div>
    );
  }
  if (id === "maintenance") {
    return (
      <div aria-hidden="true" className={common}>
        <svg viewBox="0 0 24 24" className="h-full w-full" fill="none">
          <rect x="5" y="4" width="14" height="16" rx="2" stroke={stroke} strokeWidth="1.5" />
          <path d="M8 8h8M8 12h8M8 16h5" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="17" cy="16" r="1.2" fill={accent} />
        </svg>
      </div>
    );
  }
  if (id === "digital-garage") {
    return (
      <div aria-hidden="true" className={common}>
        <svg viewBox="0 0 24 24" className="h-full w-full" fill="none">
          <path d="M4 7.5 12 4l8 3.5v9L12 20l-8-3.5v-9Z" stroke={stroke} strokeWidth="1.5" />
          <path d="M12 4v16M4 7.5l8 3.5 8-3.5" stroke={stroke} strokeWidth="1.2" opacity="0.9" />
          <path d="M7.5 14.5 12 16.5l4.5-2" stroke={accent} strokeWidth="1.2" />
        </svg>
      </div>
    );
  }
  return (
    <div aria-hidden="true" className={common}>
      <svg viewBox="0 0 24 24" className="h-full w-full" fill="none">
        <path d="M12 4v6m0 0 4 4m-4-4-4 4" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="17" r="3" stroke={accent} strokeWidth="1.5" />
        <path d="M6 17h3m6 0h3" stroke={stroke} strokeWidth="1.2" opacity="0.8" />
      </svg>
    </div>
  );
}

export function FeaturesSection({ dict }: { dict: Dictionary }) {
  const { features } = dict.home;

  return (
    <section id="features" className="scroll-mt-24 border-y border-[var(--border-subtle)] bg-surface/30 py-20 sm:py-24 lg:py-28">
      <PageContainer className="space-y-12">
        <SectionHeading eyebrow={features.eyebrow} title={features.title} description={features.description} />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-12">
          {features.items.map((item, index) => {
            const layoutClass =
              index === 0
                ? "md:col-span-2 xl:col-span-7"
                : index === 1
                  ? "xl:col-span-5"
                  : index === 4
                    ? "md:col-span-2 xl:col-span-6"
                    : "xl:col-span-3 md:col-span-1";

            return (
              <article
                key={item.id}
                className={`${layoutClass} group relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[linear-gradient(180deg,rgba(18,24,33,0.78),rgba(11,15,20,0.9))] p-5 transition-colors duration-300 hover:border-[var(--border-strong)] sm:p-6`}
              >
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 [@media(hover:hover)]:group-hover:opacity-100 [background:radial-gradient(80%_60%_at_100%_0%,rgba(0,209,255,0.08),transparent_60%)]" />

                <div className="relative z-[1] flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <FeatureIcon id={item.id} />
                    <span className="min-w-0 text-right font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)] sm:text-[11px] sm:tracking-[0.18em]">
                      {item.kicker}
                    </span>
                  </div>

                  <h3 className="mt-5 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
                    {item.description}
                  </p>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {item.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="rounded-full border border-[var(--border-subtle)] bg-[rgba(5,7,11,0.45)] px-3 py-1 text-xs text-[var(--text-secondary)]"
                      >
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </PageContainer>
    </section>
  );
}