import { PageContainer } from "@/components/layout/PageContainer";
import { HudPanel } from "@/components/ui/HudPanel";
import type { Dictionary } from "@/content/i18n";

export function TermsContent({ dict }: { dict: Dictionary }) {
  const data = dict.legal.terms;

  return (
    <PageContainer className="py-16 sm:py-20 lg:py-24">
      <div className="max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-primary-bright">MotoCore</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{data.title}</h1>
        <p className="mt-4 text-base leading-7 text-[var(--text-secondary)]">{data.intro}</p>
      </div>

      <div className="mt-10 space-y-4 lg:space-y-5">
        {data.sections.map((section) => (
          <HudPanel key={section.id} className="p-5 sm:p-6">
            <h2 className="text-lg font-semibold text-foreground">{section.title}</h2>
            {section.paragraphs?.map((p, i) => (
              <p key={i} className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                {p}
              </p>
            ))}
            {section.bullets && section.bullets.length > 0 ? (
              <ul className="mt-3 space-y-2 text-sm leading-7 text-[var(--text-secondary)]">
                {section.bullets.map((b, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-primary-bright" aria-hidden="true" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            ) : null}
            {section.note ? (
              <p className="mt-4 rounded-lg border border-[var(--border-subtle)] bg-[rgba(18,24,33,0.45)] p-3 text-sm leading-6 text-[var(--text-muted)]">
                {section.note}
              </p>
            ) : null}
          </HudPanel>
        ))}
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        <HudPanel className="p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-foreground">{dict.legal.reviewNoticeTitle}</h2>
          <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{dict.legal.reviewNoticeBody}</p>
          <p className="mt-4 text-xs text-[var(--text-muted)]">
            {dict.legal.lastUpdatedLabel}: {dict.legal.lastUpdatedValue}
          </p>
        </HudPanel>
        <HudPanel className="p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-foreground">{data.checklistTitle}</h2>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-[var(--text-secondary)]">
            {data.checklistItems.map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[var(--text-muted)]" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </HudPanel>
      </div>
    </PageContainer>
  );
}
