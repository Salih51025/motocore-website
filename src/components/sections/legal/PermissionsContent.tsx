import { PageContainer } from "@/components/layout/PageContainer";
import { HudPanel } from "@/components/ui/HudPanel";
import type { Dictionary } from "@/content/i18n";

export function PermissionsContent({ dict }: { dict: Dictionary }) {
  const data = dict.legal.permissions;

  return (
    <PageContainer className="py-16 sm:py-20 lg:py-24">
      <div className="max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-primary-bright">MotoCore</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{data.title}</h1>
        <p className="mt-4 text-base leading-7 text-[var(--text-secondary)]">{data.intro}</p>
      </div>

      <div className="mt-10 grid gap-4 lg:gap-5">
        {data.items.map((item) => (
          <HudPanel key={item.id} className="p-5 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <h2 className="text-lg font-semibold text-foreground">{item.name}</h2>
              <span className="inline-flex w-fit rounded-md border border-[var(--border-strong)] bg-[rgba(0,209,255,0.08)] px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-primary-bright">
                {item.status}
              </span>
            </div>
            <dl className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">Amaç / Purpose</dt>
                <dd className="mt-1.5 text-sm leading-7 text-[var(--text-secondary)]">{item.purpose}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">Kullanıcı kontrolü / User control</dt>
                <dd className="mt-1.5 text-sm leading-7 text-[var(--text-secondary)]">{item.userControl}</dd>
              </div>
            </dl>
          </HudPanel>
        ))}
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        <HudPanel className="p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-foreground">{data.notRequestedTitle}</h2>
          <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{data.notRequestedBody}</p>
        </HudPanel>
        <HudPanel className="p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-foreground">{data.uncertainTitle}</h2>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-[var(--text-secondary)]">
            {data.uncertainItems.map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-primary-bright" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </HudPanel>
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
