import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/content/i18n";

export function AudienceSection({ dict }: { dict: Dictionary }) {
  const { audience } = dict.home;

  return (
    <section id="audience" className="scroll-mt-24 border-y border-[var(--border-subtle)] bg-surface/20 py-20 sm:py-24 lg:py-28">
      <PageContainer>
        <div className="mx-auto max-w-4xl text-center">
          <SectionHeading
            eyebrow={audience.eyebrow}
            title={audience.title}
            description={audience.description}
            align="center"
          />
        </div>
      </PageContainer>
    </section>
  );
}
