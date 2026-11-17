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
      className="relative isolate overflow-hidden border-b border-[var(--border-subtle)] [background:var(--gradient-hero)]"
    >
      <div className="hero-reveal hero-reveal-1 pointer-events-none absolute inset-0">
        <GlowBackdrop />
        <GridOverlay className="opacity-[0.06] [mask-image:radial-gradient(ellipse_at_center,black,transparent_88%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[rgba(5,7,11,0.75)] to-transparent" />
      </div>

      <PageContainer className="relative pb-14 pt-16 sm:pb-18 sm:pt-20 lg:min-h-[calc(100svh-var(--nav-height))] lg:pb-20 lg:pt-24">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 xl:gap-20">
          <div className="relative z-10 mx-auto w-full max-w-2xl lg:mx-0">
            <div className="hero-reveal hero-reveal-2">
              <Badge>{hero.eyebrow}</Badge>
            </div>

            <div className="hero-reveal hero-reveal-3 mt-6 space-y-4">
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary-bright/90 sm:text-sm">
                {hero.title}
              </p>
              <h1 className="text-balance text-[2rem] font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-[4.25rem]">
                <span className="block">{hero.sloganPrimary}</span>
                {hero.sloganSecondary ? (
                  <span className="mt-3 block text-lg font-medium leading-snug tracking-normal text-primary-bright/95 sm:text-xl lg:text-2xl">
                    {hero.sloganSecondary}
                  </span>
                ) : null}
              </h1>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-muted)] sm:text-[11px]">
                Yamaha MT-07 concept showcase
              </p>
            </div>

            <p className="hero-reveal hero-reveal-4 mt-6 max-w-xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg sm:leading-8">
              {hero.description}
            </p>

            <div className="hero-reveal hero-reveal-5 mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="#intro" size="md" className="w-full sm:w-auto sm:min-w-[11.5rem]">
                {hero.primaryCta}
              </Button>
              <Button href="#features" size="md" variant="secondary" className="w-full sm:w-auto sm:min-w-[11.5rem]">
                {hero.secondaryCta}
              </Button>
            </div>

            <div aria-hidden="true" className="hero-reveal hero-reveal-6 mt-10 hidden items-center gap-4 sm:flex">
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