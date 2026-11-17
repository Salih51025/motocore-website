import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HudPanel } from "@/components/ui/HudPanel";
import type { Dictionary } from "@/content/i18n";

export function IntroSection({ dict }: { dict: Dictionary }) {
  const { intro } = dict.home;

  return (
    <section id="intro" className="scroll-mt-24 py-20 sm:py-24 lg:py-28">
      <PageContainer className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <SectionHeading
          eyebrow={intro.eyebrow}
          title={intro.title}
          description={intro.description}
          className="max-w-3xl"
        />
        <HudPanel showCorners={false} className="lg:mt-10 border-[var(--border-subtle)]/80">
          <div className="space-y-4">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary-bright">
              {intro.panelEyebrow}
            </p>
            <p className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
              {intro.panelTitle}
            </p>
            <p className="text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
              {intro.panelDescription}
            </p>
            <ul className="space-y-2">
              {intro.panelHighlights.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-primary-bright/80" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </HudPanel>
      </PageContainer>
    </section>
  );
}