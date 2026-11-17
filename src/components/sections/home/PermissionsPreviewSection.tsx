import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HudPanel } from "@/components/ui/HudPanel";
import { Button } from "@/components/ui/Button";
import type { Locale } from "@/types/i18n";
import type { Dictionary } from "@/content/i18n";

export function PermissionsPreviewSection({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const { permissionsPreview } = dict.home;
  return (
    <section id="permissions-preview" className="scroll-mt-24 border-y border-[var(--border-subtle)] bg-surface/30 py-20 sm:py-24 lg:py-28">
      <PageContainer className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-start">
        <SectionHeading
          eyebrow={permissionsPreview.eyebrow}
          title={permissionsPreview.title}
          description={permissionsPreview.description}
          actions={<Button href={`/${locale}/permissions`} variant="secondary">{permissionsPreview.cta}</Button>}
        />
        <HudPanel showCorners={false}>
          <p className="text-sm leading-6 text-[var(--text-secondary)]">{permissionsPreview.note}</p>
          <p className="mt-4 text-sm">
            <Link href={`/${locale}/privacy-policy`} className="text-primary-bright hover:underline">
              {dict.nav.privacy}
            </Link>
          </p>
        </HudPanel>
      </PageContainer>
    </section>
  );
}