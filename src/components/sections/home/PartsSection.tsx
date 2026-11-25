import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HudPanel } from "@/components/ui/HudPanel";
import type { Dictionary } from "@/content/i18n";

export function PartsSection({ dict }: { dict: Dictionary }) {
  const { parts } = dict.home;

  return (
    <section id="parts" className="scroll-mt-24 border-y border-[var(--border-subtle)] bg-surface/20 py-20 sm:py-24 lg:py-28">
      <PageContainer className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-start">
        <SectionHeading
          eyebrow={parts.eyebrow}
          title={parts.title}
          description={parts.description}
          className="max-w-3xl"
        />
        <HudPanel showCorners={false} className="lg:mt-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary-bright">
            {dict.locale === "tr" ? "Desteklenen modellerde" : "On supported models"}
          </p>
          <ul className="mt-4 space-y-3">
            {parts.highlights.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
                <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-primary-bright/80 shadow-[0_0_10px_rgba(46,230,255,0.45)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </HudPanel>
      </PageContainer>
    </section>
  );
}
