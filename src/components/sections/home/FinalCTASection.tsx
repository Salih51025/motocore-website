import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/Button";
import type { Dictionary } from "@/content/i18n";

export function FinalCTASection({ dict }: { dict: Dictionary }) {
  const { finalCta } = dict.home;
  return (
    <section id="final-cta" className="relative overflow-hidden py-20 sm:py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_110%,rgba(0,209,255,0.22),transparent_60%),linear-gradient(180deg,rgba(5,7,11,0.2),rgba(5,7,11,0.95))]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(0,209,255,0.45)] to-transparent" aria-hidden="true" />
      <PageContainer className="relative">
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[linear-gradient(135deg,rgba(18,24,33,0.92),rgba(11,15,20,0.85))] p-8 shadow-[var(--shadow-panel)] sm:p-12 lg:p-16">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[rgba(0,209,255,0.12)] blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-[rgba(0,209,255,0.08)] blur-3xl" aria-hidden="true" />
          <div className="relative text-center">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-primary-bright">{finalCta.eyebrow}</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {finalCta.title}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg">
              {finalCta.description}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href={finalCta.primaryCtaHref ?? "#features"} variant="primary" size="md">
                {finalCta.primaryCta}
              </Button>
              {finalCta.secondaryCta && finalCta.secondaryCtaHref ? (
                <Button href={finalCta.secondaryCtaHref} variant="secondary" size="md">
                  {finalCta.secondaryCta}
                </Button>
              ) : null}
            </div>
            {finalCta.note ? (
              <p className="mx-auto mt-6 max-w-2xl text-sm leading-6 text-[var(--text-muted)]">{finalCta.note}</p>
            ) : null}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
