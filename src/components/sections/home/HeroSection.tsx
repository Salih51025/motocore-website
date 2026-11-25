import { PageContainer } from "@/components/layout/PageContainer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GridOverlay } from "@/components/effects/GridOverlay";
import { GlowBackdrop } from "@/components/effects/GlowBackdrop";
import { HeroVisual } from "@/components/sections/home/HeroVisual";
import type { Dictionary } from "@/content/i18n";

export function HeroSection({ dict }: { dict: Dictionary }) {
  const { hero } = dict.home;

  return (
    <section
      id="hero"
      className="future-surface relative isolate overflow-hidden border-b border-[var(--border-subtle)] [background:var(--gradient-hero)]"
    >
      <div className="hero-reveal hero-reveal-1 pointer-events-none absolute inset-0">
        <GlowBackdrop />
        <div className="aurora-orb aurora-orb-a" aria-hidden="true" />
        <div className="aurora-orb aurora-orb-b" aria-hidden="true" />
        <GridOverlay className="opacity-[0.08] [mask-image:radial-gradient(ellipse_at_center,black,transparent_85%)]" />
        <div className="scanline-overlay" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[rgba(5,7,11,0.88)] to-transparent" />
      </div>

      <PageContainer className="relative pb-14 pt-14 sm:pb-18 sm:pt-20 lg:min-h-[calc(100svh-var(--nav-height))] lg:pb-20 lg:pt-24">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 xl:gap-20">
          <div className="relative z-10 mx-auto w-full max-w-2xl lg:mx-0">
            <div className="hero-reveal hero-reveal-2 flex flex-wrap items-center gap-2.5">
              <Badge>{hero.eyebrow}</Badge>
              <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(46,230,255,0.22)] bg-[rgba(5,7,11,0.55)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-secondary)] backdrop-blur-sm">
                <span className="status-dot" aria-hidden="true" />
                {hero.status}
              </span>
            </div>

            <div className="hero-reveal hero-reveal-3 mt-6 space-y-4">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary-bright/90 sm:text-sm">
                {hero.title}
              </p>
              <h1 className="text-balance text-[2rem] font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-[4.25rem]">
                <span className="block [text-shadow:0_0_40px_rgba(0,209,255,0.12)]">{hero.sloganPrimary}</span>
                {hero.sloganSecondary ? (
                  <span className="mt-3 block text-lg font-medium leading-snug tracking-normal text-primary-bright/95 sm:text-xl lg:text-2xl">
                    {hero.sloganSecondary}
                  </span>
                ) : null}
              </h1>
            </div>

            <p className="hero-reveal hero-reveal-4 mt-6 max-w-xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg sm:leading-8">
              {hero.description}
            </p>

            <ul
              aria-label={dict.locale === "tr" ? "MotoCore ne sunar" : "What MotoCore offers"}
              className="hero-reveal hero-reveal-5 mt-6 grid gap-2.5 sm:grid-cols-3"
            >
              {hero.clarityPoints.map((point) => (
                <li
                  key={point}
                  className="future-card flex items-start gap-2.5 rounded-xl border border-[var(--border-subtle)] bg-[rgba(11,15,20,0.55)] px-3.5 py-3 backdrop-blur-md"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-primary-bright shadow-[0_0_12px_rgba(46,230,255,0.7)]"
                  />
                  <span className="text-sm font-medium leading-5 text-foreground/95">{point}</span>
                </li>
              ))}
            </ul>

            <div className="hero-reveal hero-reveal-6 mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                href="#intro"
                size="md"
                variant="primary"
                className="w-full sm:w-auto sm:min-w-[12rem]"
              >
                {hero.primaryCta}
              </Button>
              <Button
                href="#gallery"
                size="md"
                variant="secondary"
                className="w-full sm:w-auto sm:min-w-[12rem]"
              >
                {hero.secondaryCta}
              </Button>
            </div>

            <div className="hero-reveal hero-reveal-6 mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              <a href="#video" className="inline-flex items-center gap-1.5 text-[var(--text-secondary)] transition-colors hover:text-primary-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] rounded-sm">
                <span aria-hidden="true" className="text-primary-bright/80">▶</span>
                {dict.locale === "tr" ? "Tanıtım videosunu izle" : "Watch promo video"}
              </a>
              <a href="#app-screenshots" className="inline-flex items-center gap-1.5 text-[var(--text-secondary)] transition-colors hover:text-primary-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] rounded-sm">
                <span aria-hidden="true" className="text-primary-bright/80">▢</span>
                {dict.locale === "tr" ? "Uygulama ekranlarını gör" : "See app screens"}
              </a>
            </div>

            <div aria-hidden="true" className="hero-reveal hero-reveal-6 mt-8 hidden items-center gap-4 sm:flex">
              <span className="h-px w-16 bg-[linear-gradient(90deg,rgba(46,230,255,0.55),transparent)]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--text-muted)]">
                MT-07 Digital Garage / Cinematic Interface
              </span>
            </div>
          </div>

          <div className="relative z-10 mx-auto w-full max-w-[34rem] lg:mx-0 lg:max-w-none lg:justify-self-end">
            <HeroVisual dict={dict} locale={dict.locale} />
          </div>
        </div>
      </PageContainer>
    </section>
  );
}