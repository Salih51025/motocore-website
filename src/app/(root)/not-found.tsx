import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-16">
      <div className="w-full max-w-xl rounded-2xl border border-[var(--border-subtle)] bg-surface p-8 text-center">
        <p className="font-mono text-xs tracking-[0.24em] text-primary-bright">404</p>
        <h1 className="mt-3 text-2xl font-semibold text-foreground">Sayfa bulunamadı / Page not found</h1>
        <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
          İstenen sayfa bulunamadı. Varsayılan dile dönebilirsiniz.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/tr" className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-[#041015] hover:bg-primary-bright">TR Ana Sayfa</Link>
          <Link href="/en" className="rounded-md border border-[var(--border-strong)] px-4 py-2 text-sm font-medium text-foreground hover:bg-[rgba(0,209,255,0.08)]">EN Home</Link>
        </div>
      </div>
    </main>
  );
}