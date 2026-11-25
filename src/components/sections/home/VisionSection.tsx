import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/content/i18n";

export function VisionSection({ dict }: { dict: Dictionary }) {
  const { vision } = dict.home;

  return (
    <section id="vision" className="scroll-mt-24 py-20 sm:py-24 lg:py-28">
      <PageContainer>
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[linear-gradient(160deg,rgba(18,24,33,0.72),rgba(11,15,20,0.88))] p-8 sm:p-10 lg:p-14">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_50%_at_50%_0%,rgba(0,209,255,0.12),transparent_65%)]" />
          <div className="relative">
            <SectionHeading
              eyebrow={vision.eyebrow}
              title={vision.title}
              description={vision.description}
              align="center"
            />
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
