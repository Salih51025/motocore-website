import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HudPanel } from "@/components/ui/HudPanel";
import type { Dictionary } from "@/content/i18n";

export function MaintenanceSection({ dict }: { dict: Dictionary }) {
  const { maintenance } = dict.home;

  return (
    <section id="maintenance" className="scroll-mt-24 py-20 sm:py-24 lg:py-28">
      <PageContainer className="grid gap-10 lg:grid-cols-[0.95fr_1fr] lg:items-start">
        <HudPanel showCorners={false} className="order-2 lg:order-1 lg:mt-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary-bright">
            {dict.locale === "tr" ? "Yol haritası odağı" : "Roadmap focus"}
          </p>
          <ul className="mt-4 space-y-3">
            {maintenance.highlights.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
                <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-primary-bright/80 shadow-[0_0_10px_rgba(46,230,255,0.45)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          {maintenance.note ? (
            <p className="mt-5 rounded-lg border border-[var(--border-subtle)] bg-[rgba(5,7,11,0.35)] p-3 text-xs leading-6 text-[var(--text-muted)] sm:text-sm">
              {maintenance.note}
            </p>
          ) : null}
        </HudPanel>
        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow={maintenance.eyebrow}
            title={maintenance.title}
            description={maintenance.description}
            className="max-w-3xl"
          />
        </div>
      </PageContainer>
    </section>
  );
}
